import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';

/** OpenRouter model slug (was wrongly `claude-haiku-4-5`; correct id uses dot: `4.5`). */
const DEFAULT_OPENROUTER_MODEL = 'anthropic/claude-haiku-4.5';

async function readOpenRouterResponseBody(res) {
  if (typeof res.text === 'function') {
    return res.text();
  }
  if (typeof res.json === 'function') {
    const data = await res.json();
    return JSON.stringify(data);
  }
  return '';
}

/** Some models wrap JSON in ```json fences despite response_format json_object. */
function stripMarkdownJsonFence(content) {
  const s = String(content).trim();
  const m = s.match(/^```(?:json)?\s*\r?\n?([\s\S]*?)\r?\n?```\s*$/i);
  if (m) return m[1].trim();
  return s;
}

// ---------------------------------------------------------------------------
// Rate limiter — 3 requests per 15 minutes per IP
// ---------------------------------------------------------------------------
const questionnaireLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Previše pokušaja. Pokušajte za nekoliko minuta.' },
});

// ---------------------------------------------------------------------------
// Scoring tables
// Per questionnaire-copy.md Section 3 — scores are NOT uniform a=0,b=1,c=2
// ---------------------------------------------------------------------------
const SCORE_MAP = {
  q1: { a: 2, b: 1, c: 0 },
  q2: { a: 0, b: 1, c: 2 },
  q3: { a: 0, b: 1, c: 2 },
  q4: { a: 0, b: 1, c: 2 },
  q5: { a: 0, b: 1, c: 2 },
};

// ---------------------------------------------------------------------------
// Answer text tables (used to build the user message for the LLM)
// ---------------------------------------------------------------------------
const ANSWER_TEXT = {
  hr: {
    q1: {
      a: 'Svakodnevno — i puno vremena odlazi na to',
      b: 'Povremeno, ali znamo koji su problematični',
      c: 'Rijetko — naši procesi su uglavnom automatizirani',
    },
    q2: {
      a: 'Neformalni — rade u glavama ljudi',
      b: 'Djelomično dokumentirani, ali nedosljedno',
      c: 'Jasno definirani i dokumentirani',
    },
    q3: {
      a: 'Uglavnom Excel i email',
      b: 'Nekoliko SaaS alata (npr. CRM, računovodstvo)',
      c: 'Međusobno povezani alati s API-jima',
    },
    q4: {
      a: 'Ne, tek istražujemo mogućnosti',
      b: 'Imamo ideje, ali nismo sigurni prioriteta',
      c: 'Da, točno znamo što želimo automatizirati',
    },
    q5: {
      a: 'Tek istražujem, bez konkretnih planova',
      b: 'U idućih 3–6 mjeseci, ako vidimo smisao',
      c: 'Odmah ili u idućih nekoliko tjedana',
    },
  },
  en: {
    q1: {
      a: 'Daily — and it takes up significant time',
      b: 'Sometimes — we know which tasks are the problem',
      c: 'Rarely — most of our processes are already automated',
    },
    q2: {
      a: "Informal — they live in people's heads",
      b: 'Partly documented, but inconsistently',
      c: 'Clearly defined and documented',
    },
    q3: {
      a: 'Mainly spreadsheets and email',
      b: 'Several SaaS tools (e.g. CRM, accounting)',
      c: 'Connected tools with APIs',
    },
    q4: {
      a: "No — we're still exploring the possibilities",
      b: "We have ideas but haven't prioritised them",
      c: 'Yes — we know exactly what we want to automate',
    },
    q5: {
      a: 'Just exploring for now — no concrete plans',
      b: "In the next 3–6 months, if it makes sense",
      c: 'Right away or within the next few weeks',
    },
  },
};

// ---------------------------------------------------------------------------
// Tier derivation from raw score
// ---------------------------------------------------------------------------
function deriveTier(rawScore, locale) {
  if (rawScore <= 3) return locale === 'en' ? 'Explorer' : 'Istraživač';
  if (rawScore <= 7) return locale === 'en' ? 'Builder' : 'Graditelj';
  return locale === 'en' ? 'Ready to Act' : 'Spreman za akciju';
}

// ---------------------------------------------------------------------------
// Score computation
// ---------------------------------------------------------------------------
function computeScore(answers) {
  return answers.reduce((sum, { questionId, value }) => {
    return sum + (SCORE_MAP[questionId]?.[value] ?? 0);
  }, 0);
}

// ---------------------------------------------------------------------------
// Prompt builders (system-prompt + user-message)
// ---------------------------------------------------------------------------
const SYSTEM_PROMPT = {
  hr: `Ti si konzultant za poslovnu automatizaciju i AI. Tvoj zadatak je napisati personaliziranu procjenu AI spremnosti za vlasnika tvrtke na temelju njegovih odgovora na 5 pitanja.

Pravila:
- Odgovori isključivo JSON objektom ovog oblika: {"tier": "<string>", "score": <integer>, "assessment": "<string>"}
- "tier" je jedna od: "Istraživač", "Graditelj", "Spreman za akciju"
- "score" je cijeli broj od 0 do 10 (zbroj bodova iz odgovora)
- "assessment" je 150 do 250 riječi, pisan u drugom licu (Vi/vaše), na hrvatskom jeziku
- Procjena mora biti konkretna i osobna — referenciraj što je korisnik odgovorio
- Ne izmišljaj detalje koji nisu u odgovorima
- Ne koristi korporativni žargon; piši kao iskusan savjetnik koji izravno govori vlasniku tvrtke
- Završi procjenu s jednim konkretnim sljedećim korakom koji korisnik može poduzeti
- Ton: profesionalan, direktan, poticajan — ne prodavački`,

  en: `You are a business automation and AI consultant. Your task is to write a personalised AI readiness assessment for a business owner based on their answers to 5 questions.

Rules:
- Respond only with a JSON object in this exact shape: {"tier": "<string>", "score": <integer>, "assessment": "<string>"}
- "tier" must be one of: "Explorer", "Builder", "Ready to Act"
- "score" is an integer from 0 to 10 (sum of answer scores)
- "assessment" is 150 to 250 words, written in second person (you/your), in English
- The assessment must be specific and personal — reference what the user actually answered
- Do not invent details that are not present in the answers
- Avoid corporate jargon; write as an experienced advisor speaking directly to a business owner
- End the assessment with one concrete next step the user can take
- Tone: professional, direct, encouraging — not salesy`,
};

function buildUserMessage(answers, locale, totalScore) {
  const texts = ANSWER_TEXT[locale];
  const answerMap = Object.fromEntries(answers.map((a) => [a.questionId, a.value]));

  if (locale === 'hr') {
    return [
      'Odgovori korisnika:',
      '',
      `1. Ponavljajući zadaci — ${answerMap.q1}: ${texts.q1[answerMap.q1]}`,
      `2. Dokumentiranost procesa — ${answerMap.q2}: ${texts.q2[answerMap.q2]}`,
      `3. Korišteni alati — ${answerMap.q3}: ${texts.q3[answerMap.q3]}`,
      `4. Poznatost problema — ${answerMap.q4}: ${texts.q4[answerMap.q4]}`,
      `5. Vremenski okvir — ${answerMap.q5}: ${texts.q5[answerMap.q5]}`,
      '',
      `Ukupan zbroj bodova: ${totalScore}/10`,
    ].join('\n');
  }

  return [
    'User answers:',
    '',
    `1. Repetitive tasks — ${answerMap.q1}: ${texts.q1[answerMap.q1]}`,
    `2. Process documentation — ${answerMap.q2}: ${texts.q2[answerMap.q2]}`,
    `3. Tools in use — ${answerMap.q3}: ${texts.q3[answerMap.q3]}`,
    `4. Problem awareness — ${answerMap.q4}: ${texts.q4[answerMap.q4]}`,
    `5. Timeline — ${answerMap.q5}: ${texts.q5[answerMap.q5]}`,
    '',
    `Total score: ${totalScore}/10`,
  ].join('\n');
}

// ---------------------------------------------------------------------------
// Validation middleware
// ---------------------------------------------------------------------------
const questionnaireValidators = [
  body('answers')
    .isArray({ min: 5, max: 5 })
    .withMessage('Odgovori moraju sadržavati točno 5 stavki.'),
  body('answers.*.questionId')
    .isIn(['q1', 'q2', 'q3', 'q4', 'q5'])
    .withMessage('Nevažeći identifikator pitanja.'),
  body('answers.*.value')
    .isIn(['a', 'b', 'c'])
    .withMessage('Odgovor mora biti a, b ili c.'),
  body('locale').isIn(['hr', 'en']).withMessage("Jezik mora biti 'hr' ili 'en'."),
];

function handleQuestionnaireValidation(req, res, next) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(422).json({
      errors: result.array().map((e) => ({
        field: e.path,
        message: e.msg,
      })),
    });
  }
  next();
}

// ---------------------------------------------------------------------------
// Error messages by locale
// ---------------------------------------------------------------------------
const ERROR_MESSAGES = {
  timeout: {
    hr: 'Procjena traje predugo. Pokušajte ponovo.',
    en: 'Assessment is taking too long. Please try again.',
  },
  server: {
    hr: 'Greška pri generiranju procjene. Pokušajte ponovo.',
    en: 'Error generating assessment. Please try again.',
  },
};

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------
const router = Router();

router.post(
  '/questionnaire',
  questionnaireLimiter,
  questionnaireValidators,
  handleQuestionnaireValidation,
  async (req, res) => {
    const { answers, locale } = req.body;

    const rawScore = computeScore(answers);
    const tier = deriveTier(rawScore, locale);
    const userMessage = buildUserMessage(answers, locale, rawScore);

    // In test environment, skip the real OpenRouter call
    if (process.env.NODE_ENV === 'test') {
      return res.status(200).json({
        tier,
        score: rawScore,
        assessment:
          locale === 'hr'
            ? 'Ovo je testna procjena. Vaša tvrtka je dobra za automatizaciju.'
            : 'This is a test assessment. Your business is ready for automation.',
      });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: ERROR_MESSAGES.server[locale] });
    }

    const model = process.env.OPENROUTER_MODEL || DEFAULT_OPENROUTER_MODEL;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10_000);

    try {
      const openRouterRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://kontekst.hr',
          'X-Title': 'Kontekst.hr Questionnaire',
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT[locale] },
            { role: 'user', content: userMessage },
          ],
          response_format: { type: 'json_object' },
          max_tokens: 800,
          temperature: 0.7,
        }),
      });

      clearTimeout(timeoutId);

      const responseText = await readOpenRouterResponseBody(openRouterRes);

      if (!openRouterRes.ok) {
        return res.status(500).json({ error: ERROR_MESSAGES.server[locale] });
      }

      let openRouterData;
      try {
        openRouterData = JSON.parse(responseText);
      } catch {
        return res.status(500).json({ error: ERROR_MESSAGES.server[locale] });
      }

      const rawContent = openRouterData?.choices?.[0]?.message?.content;

      if (!rawContent) {
        return res.status(500).json({ error: ERROR_MESSAGES.server[locale] });
      }

      let parsed;
      try {
        parsed = JSON.parse(stripMarkdownJsonFence(rawContent));
      } catch {
        return res.status(500).json({ error: ERROR_MESSAGES.server[locale] });
      }

      if (
        typeof parsed.assessment !== 'string' ||
        parsed.assessment.length === 0
      ) {
        return res.status(500).json({ error: ERROR_MESSAGES.server[locale] });
      }

      // Use backend-computed tier and score as source of truth;
      // only the assessment text comes from the model
      return res.status(200).json({
        tier,
        score: rawScore,
        assessment: parsed.assessment,
      });
    } catch (err) {
      clearTimeout(timeoutId);

      if (err.name === 'AbortError') {
        return res.status(504).json({ error: ERROR_MESSAGES.timeout[locale] });
      }

      return res.status(500).json({ error: ERROR_MESSAGES.server[locale] });
    }
  },
);

export default router;
