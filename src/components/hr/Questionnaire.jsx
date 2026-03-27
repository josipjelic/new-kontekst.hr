import { useEffect, useRef, useState } from 'react';

import { apiUrl } from '../../utils/apiBase.js';

const QUESTIONNAIRE_URL = apiUrl('/api/questionnaire');

const QUESTIONS = [
  {
    id: 'q1',
    category: 'Tim i operacije',
    text: 'Koliko često vaš tim radi iste zadatke iznova?',
    options: [
      { value: 'a', label: 'Svakodnevno — i puno vremena odlazi na to' },
      { value: 'b', label: 'Povremeno, ali znamo koji su problematični' },
      { value: 'c', label: 'Rijetko — naši procesi su uglavnom automatizirani' },
    ],
  },
  {
    id: 'q2',
    category: 'Procesi i podaci',
    text: 'Kako biste opisali vaše poslovne procese?',
    options: [
      { value: 'a', label: 'Neformalni — rade u glavama ljudi' },
      { value: 'b', label: 'Djelomično dokumentirani, ali nedosljedno' },
      { value: 'c', label: 'Jasno definirani i dokumentirani' },
    ],
  },
  {
    id: 'q3',
    category: 'Alati i tehnologija',
    text: 'Koje alate vaša tvrtka svakodnevno koristi?',
    options: [
      { value: 'a', label: 'Uglavnom Excel i email' },
      { value: 'b', label: 'Nekoliko SaaS alata (npr. CRM, računovodstvo)' },
      { value: 'c', label: 'Međusobno povezani alati s API-jima' },
    ],
  },
  {
    id: 'q4',
    category: 'Svjesnost problema',
    text: 'Znate li koji poslovni proces vas najviše koči?',
    options: [
      { value: 'a', label: 'Ne, tek istražujemo mogućnosti' },
      { value: 'b', label: 'Imamo ideje, ali nismo sigurni prioriteta' },
      { value: 'c', label: 'Da, točno znamo što želimo automatizirati' },
    ],
  },
  {
    id: 'q5',
    category: 'Spremnost i rok',
    text: 'Kada biste bili spremni za prvi projekt?',
    options: [
      { value: 'a', label: 'Tek istražujem, bez konkretnih planova' },
      { value: 'b', label: 'U idućih 3–6 mjeseci, ako vidimo smisao' },
      { value: 'c', label: 'Odmah ili u idućih nekoliko tjedana' },
    ],
  },
];

const TIER_COPY = {
  'Istraživač': {
    headline: 'Dobar početak — sada znate gdje stojite.',
    supporting: 'Vaše poslovanje je u fazi istraživanja. To je normalno — i pravo je vrijeme da postavite prave temelje.',
    primaryCta: 'Razgovarajmo o vašim mogućnostima',
    primaryCtaHref: '/#kontakt',
    primaryCtaSubtext: 'Besplatni uvodni razgovor — bez obveza.',
    secondaryCta: 'Pogledajte naše usluge',
    secondaryCtaHref: '/#usluge',
    badgeClass: 'tier-badge-explorer',
  },
  'Graditelj': {
    headline: 'Na pravom ste putu — i bliže ste nego mislite.',
    supporting: 'Imate temelje za automatizaciju. Uz pravi plan i partnera koji poznaje vaše procese, prvi rezultati mogu doći za tjednima.',
    primaryCta: 'Dogovorite besplatni razgovor',
    primaryCtaHref: '/#kontakt',
    primaryCtaSubtext: 'Konkretna procjena za vaš specifičan slučaj.',
    secondaryCta: 'Kako radimo',
    secondaryCtaHref: '/#kako-radimo',
    badgeClass: 'tier-badge-builder',
  },
  'Spreman za akciju': {
    headline: 'Vaše poslovanje je spremno — iskoristite tu prednost.',
    supporting: 'Rezultati pokazuju da ste dobro pozicionirani za automatizaciju. Pravo je vrijeme da krenete — svaki tjedan kašnjenja znači sate izgubljenog rada.',
    primaryCta: 'Pokrenimo prvi projekt',
    primaryCtaHref: '/#kontakt',
    primaryCtaSubtext: 'Razgovarajmo ovaj tjedan — slobodnih mjesta ima ograničen broj.',
    secondaryCta: 'Pogledajte kako izgledaju naši projekti',
    secondaryCtaHref: '/#usluge',
    badgeClass: 'tier-badge-ready',
  },
};

const STEP_PROGRESS = { 1: '20%', 2: '40%', 3: '60%', 4: '80%', 5: '100%' };

// step: 1–5 = questions, 6 = loading, 7 = result, 8 = error
export default function Questionnaire() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [direction, setDirection] = useState('forward');
  const [submitting, setSubmitting] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const [progressPct, setProgressPct] = useState('0%');

  const questionHeadingRef = useRef(null);
  const resultHeadingRef = useRef(null);
  const errorRef = useRef(null);

  const currentQuestion = step >= 1 && step <= 5 ? QUESTIONS[step - 1] : null;
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : null;
  const isLastQuestion = step === 5;
  const showProgress = step >= 1 && step <= 7;

  // Animate progress bar on mount (step 1: 0% → 20%)
  useEffect(() => {
    if (step >= 1 && step <= 5) {
      const frame = requestAnimationFrame(() => {
        setProgressPct(STEP_PROGRESS[step]);
      });
      return () => cancelAnimationFrame(frame);
    }
    if (step === 6 || step === 7) {
      setProgressPct('100%');
    }
  }, [step]);

  // Focus management on step change
  useEffect(() => {
    if (step >= 1 && step <= 5) {
      const frame = requestAnimationFrame(() => {
        questionHeadingRef.current?.focus();
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [step]);

  // Focus management on result
  useEffect(() => {
    if (step === 7) {
      const frame = requestAnimationFrame(() => {
        resultHeadingRef.current?.focus();
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [step]);

  // Focus management on error
  useEffect(() => {
    if (step === 8) {
      const frame = requestAnimationFrame(() => {
        errorRef.current?.focus();
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [step]);

  function handleSelectAnswer(questionId, value) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setValidationError(false);
  }

  function handleNext() {
    if (!currentAnswer) {
      setValidationError(true);
      return;
    }
    if (isLastQuestion) {
      handleSubmit();
      return;
    }
    setDirection('forward');
    setStep((s) => s + 1);
    setValidationError(false);
  }

  function handleBack() {
    if (step <= 1) return;
    setDirection('backward');
    setStep((s) => s - 1);
    setValidationError(false);
  }

  async function handleSubmit() {
    setDirection('forward');
    setStep(6);
    setSubmitting(true);
    setError(null);

    const answersPayload = Object.entries(answers).map(([questionId, value]) => ({
      questionId,
      value,
    }));

    try {
      const res = await fetch(QUESTIONNAIRE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: answersPayload, locale: 'hr' }),
      });

      if (res.status === 429) {
        setError({ type: 'rate_limit' });
        setStep(8);
        return;
      }
      if (res.status === 504) {
        setError({ type: 'timeout' });
        setStep(8);
        return;
      }
      if (!res.ok) {
        setError({ type: 'generic' });
        setStep(8);
        return;
      }

      const data = await res.json();
      setResult(data);
      setDirection('forward');
      setStep(7);
    } catch {
      setError({ type: 'generic' });
      setStep(8);
    } finally {
      setSubmitting(false);
    }
  }

  function handleRetry() {
    setError(null);
    setDirection('backward');
    setStep(5);
  }

  function handleReset() {
    setAnswers({});
    setResult(null);
    setError(null);
    setDirection('forward');
    setStep(1);
    setValidationError(false);
    setProgressPct('0%');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const tierCopy = result?.tier ? TIER_COPY[result.tier] : null;

  return (
    <section
      className="questionnaire-page"
      aria-labelledby="questionnaire-heading"
      data-pointer-motion="off"
    >
      <div className="questionnaire-column">
        {/* Page hero — always visible */}
        <div className="questionnaire-hero reveal">
          <p className="section-label">Procjena</p>
          <h1 id="questionnaire-heading">Koliko je vaše poslovanje spremno za AI?</h1>
          <p>
            Za 2 minute saznajte gdje stojite — i što napraviti kao sljedeći korak. Odgovorite na 5
            kratkih pitanja i dobijte personaliziranu procjenu temeljenu na vašoj situaciji.
          </p>
        </div>

        {/* Progress indicator */}
        {showProgress && (
          <div
            role="progressbar"
            aria-valuenow={step <= 5 ? step : 5}
            aria-valuemin={1}
            aria-valuemax={5}
            aria-label="Napredak upitnika"
            aria-live="polite"
            className="progress-indicator"
          >
            <div className="progress-bar-track">
              <div
                className="progress-bar-fill"
                style={{ '--progress-pct': progressPct }}
              />
            </div>
            {step >= 1 && step <= 5 && (
              <span className="progress-counter" aria-hidden="true">
                Pitanje {step} od 5
              </span>
            )}
          </div>
        )}

        {/* Question steps */}
        {step >= 1 && step <= 5 && currentQuestion && (
          <div className={`question-card-wrapper direction-${direction}`}>
            <div
              className="question-card"
              key={step}
              aria-label={`Pitanje ${step}: ${currentQuestion.text}`}
            >
              <div
                ref={questionHeadingRef}
                tabIndex={-1}
                className="question-heading-anchor"
              >
                <p className="section-label">{currentQuestion.category.toUpperCase()}</p>
              </div>
              <p className="question-text" data-testid="question-text">{currentQuestion.text}</p>

              <fieldset>
                <legend className="sr-only">{currentQuestion.text}</legend>
                <div className="answer-options">
                  {currentQuestion.options.map((opt) => (
                    <div className="answer-option" key={opt.value}>
                      <input
                        type="radio"
                        name={currentQuestion.id}
                        id={`${currentQuestion.id}-${opt.value}`}
                        value={opt.value}
                        checked={currentAnswer === opt.value}
                        onChange={() => handleSelectAnswer(currentQuestion.id, opt.value)}
                        data-testid={`answer-${currentQuestion.id}-${opt.value}`}
                      />
                      <label
                        htmlFor={`${currentQuestion.id}-${opt.value}`}
                        aria-label={`Odgovor ${opt.value}: ${opt.label}`}
                      >
                        <span className="answer-dot" aria-hidden="true" />
                        <span className="answer-text">{opt.label}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>

              {validationError && (
                <p className="answer-validation-error" role="alert">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                    style={{ flexShrink: 0 }}
                  >
                    <path
                      d="M8 1.5L1 14.5H15L8 1.5Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <path d="M8 6V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="8" cy="11.5" r="0.75" fill="currentColor" />
                  </svg>
                  Odaberite jedan odgovor za nastavak.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Loading state */}
        {step === 6 && (
          <div
            role="status"
            aria-live="polite"
            aria-label="Učitavanje rezultata"
            className="loading-card"
          >
            <div className="assessment-spinner" aria-hidden="true" />
            <p className="loading-text">Analiziramo vaše odgovore…</p>
          </div>
        )}

        {/* Result */}
        {step === 7 && result && tierCopy && (
          <div className={`question-card-wrapper direction-${direction}`}>
            <section aria-label="Vaši rezultati" aria-live="polite">
              <div className="result-card">
                <h2
                  ref={resultHeadingRef}
                  tabIndex={-1}
                  className="score-display"
                >
                  {result.score}<span className="score-denom">/10</span>
                </h2>
                <div
                  className={`tier-badge ${tierCopy.badgeClass}`}
                >
                  {result.tier}
                </div>
                <p className="tier-headline">{tierCopy.headline}</p>
                <p className="tier-supporting">{tierCopy.supporting}</p>

                {result.assessment && (
                  <>
                    <div className="result-divider" aria-hidden="true" />
                    <p className="assessment-text">{result.assessment}</p>
                  </>
                )}

                <div className="result-divider" aria-hidden="true" />

                <div className="result-cta-block">
                  <a href={tierCopy.primaryCtaHref} className="btn-primary">
                    {tierCopy.primaryCta}
                  </a>
                  <p className="result-cta-subtext">{tierCopy.primaryCtaSubtext}</p>
                  <a href={tierCopy.secondaryCtaHref} className="btn-ghost">
                    {tierCopy.secondaryCta}
                  </a>
                  <button
                    type="button"
                    className="result-reset-link"
                    onClick={handleReset}
                    data-testid="reset-button"
                  >
                    Pokrenite upitnik iznova
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Error states */}
        {step === 8 && error && (
          <div
            ref={errorRef}
            role="alert"
            tabIndex={-1}
            className={`error-card${error.type === 'rate_limit' ? ' error-card-rate-limit' : ''}`}
            data-testid="error-card"
          >
            {error.type === 'rate_limit' ? (
              <>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                  className="error-icon-muted"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <p className="error-heading">Previše pokušaja.</p>
                <p className="error-body">Pričekajte 15 minuta prije sljedećeg pokušaja.</p>
              </>
            ) : (
              <>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className="error-icon"
                >
                  <path
                    d="M8 1.5L1 14.5H15L8 1.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path d="M8 6V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="8" cy="11.5" r="0.75" fill="currentColor" />
                </svg>
                <p className="error-heading">Nešto je pošlo po krivu.</p>
                <p className="error-body">
                  Nešto je pošlo po krivu. Pokušajte ponovo ili nas kontaktirajte na info@kontekst.hr.
                </p>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleRetry}
                  data-testid="retry-button"
                >
                  Pokušaj ponovo
                </button>
              </>
            )}
          </div>
        )}

        {/* Step navigation */}
        {step >= 1 && step <= 5 && (
          <div
            className={`step-navigation${step === 1 ? ' single-action' : ''}`}
          >
            {step > 1 && (
              <button
                type="button"
                className="btn-ghost"
                onClick={handleBack}
                data-testid="back-button"
              >
                Natrag
              </button>
            )}
            <button
              type="button"
              className="btn-primary"
              onClick={handleNext}
              disabled={!currentAnswer || submitting}
              data-testid="next-button"
            >
              {isLastQuestion ? (
                submitting ? (
                  <span
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <span className="spinner-inline" aria-hidden="true" />
                    Analiziramo…
                  </span>
                ) : (
                  'Prikaži moje rezultate'
                )
              ) : (
                'Sljedeće'
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
