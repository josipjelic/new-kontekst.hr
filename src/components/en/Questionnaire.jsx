import { useEffect, useRef, useState } from 'react';

const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '');
const QUESTIONNAIRE_URL = `${API_BASE}/api/questionnaire`;

const QUESTIONS = [
  {
    id: 'q1',
    category: 'Team & Operations',
    text: 'How often does your team repeat the same manual tasks?',
    options: [
      { value: 'a', label: 'Daily — and it takes up significant time' },
      { value: 'b', label: 'Sometimes — we know which tasks are the problem' },
      { value: 'c', label: 'Rarely — most of our processes are already automated' },
    ],
  },
  {
    id: 'q2',
    category: 'Processes & Data',
    text: 'How would you describe your business processes?',
    options: [
      { value: 'a', label: "Informal — they live in people's heads" },
      { value: 'b', label: 'Partly documented, but inconsistently' },
      { value: 'c', label: 'Clearly defined and documented' },
    ],
  },
  {
    id: 'q3',
    category: 'Tools & Technology',
    text: 'Which tools does your business use day-to-day?',
    options: [
      { value: 'a', label: 'Mainly spreadsheets and email' },
      { value: 'b', label: 'Several SaaS tools (e.g. CRM, accounting)' },
      { value: 'c', label: 'Connected tools with APIs' },
    ],
  },
  {
    id: 'q4',
    category: 'Pain Awareness',
    text: 'Do you know which business process is holding you back most?',
    options: [
      { value: 'a', label: "No — we're still exploring the possibilities" },
      { value: 'b', label: "We have ideas but haven't prioritised them" },
      { value: 'c', label: 'Yes — we know exactly what we want to automate' },
    ],
  },
  {
    id: 'q5',
    category: 'Readiness & Timeline',
    text: 'When would you be ready to start your first project?',
    options: [
      { value: 'a', label: 'Just exploring for now — no concrete plans' },
      { value: 'b', label: 'In the next 3–6 months, if it makes sense' },
      { value: 'c', label: 'Right away or within the next few weeks' },
    ],
  },
];

const TIER_COPY = {
  'Explorer': {
    headline: 'A solid starting point — now you know where you stand.',
    supporting:
      "Your business is in the exploration phase. That's perfectly normal — and exactly the right time to lay the right foundations.",
    primaryCta: "Let's talk about your options",
    primaryCtaHref: '/en/#contact',
    primaryCtaSubtext: 'Free introductory call — no commitment required.',
    secondaryCta: 'See our services',
    secondaryCtaHref: '/en/#services',
    badgeClass: 'tier-badge-explorer',
  },
  'Builder': {
    headline: "You're on the right path — and closer than you think.",
    supporting:
      'You have the foundations for automation. With the right plan and a partner who understands your processes, first results can arrive within weeks.',
    primaryCta: 'Book a free conversation',
    primaryCtaHref: '/en/#contact',
    primaryCtaSubtext: 'A concrete assessment for your specific situation.',
    secondaryCta: 'How we work',
    secondaryCtaHref: '/en/#how-we-work',
    badgeClass: 'tier-badge-builder',
  },
  'Ready to Act': {
    headline: 'Your business is ready — make the most of that advantage.',
    supporting:
      "Your results show you're well positioned for automation. Now is the time to move — every week of delay means more hours lost to manual work.",
    primaryCta: "Let's start your first project",
    primaryCtaHref: '/en/#contact',
    primaryCtaSubtext: "Let's talk this week — availability is limited.",
    secondaryCta: 'See what our projects look like',
    secondaryCtaHref: '/en/#services',
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

  // Animate progress bar on mount
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
        body: JSON.stringify({ answers: answersPayload, locale: 'en' }),
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
          <p className="section-label">Assessment</p>
          <h1 id="questionnaire-heading">How ready is your business for AI?</h1>
          <p>
            Find out in 2 minutes where you stand — and what to do next. Answer 5 short questions
            and get a personalised assessment based on your specific situation.
          </p>
        </div>

        {/* Progress indicator */}
        {showProgress && (
          <div
            role="progressbar"
            aria-valuenow={step <= 5 ? step : 5}
            aria-valuemin={1}
            aria-valuemax={5}
            aria-label="Questionnaire progress"
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
                Question {step} of 5
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
              aria-label={`Question ${step}: ${currentQuestion.text}`}
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
                        aria-label={`Answer ${opt.value}: ${opt.label}`}
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
                  Please select an answer to continue.
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
            aria-label="Loading results"
            className="loading-card"
          >
            <div className="assessment-spinner" aria-hidden="true" />
            <p className="loading-text">Analysing your answers…</p>
          </div>
        )}

        {/* Result */}
        {step === 7 && result && tierCopy && (
          <div className={`question-card-wrapper direction-${direction}`}>
            <section aria-label="Your results" aria-live="polite">
              <div className="result-card">
                <h2
                  ref={resultHeadingRef}
                  tabIndex={-1}
                  className="score-display"
                >
                  {result.score}<span className="score-denom">/10</span>
                </h2>
                <div className={`tier-badge ${tierCopy.badgeClass}`}>
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
                    Restart the questionnaire
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
                <p className="error-heading">Too many attempts.</p>
                <p className="error-body">Please wait 15 minutes before trying again.</p>
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
                <p className="error-heading">Something went wrong.</p>
                <p className="error-body">
                  Something went wrong. Please try again or contact us at info@kontekst.hr.
                </p>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleRetry}
                  data-testid="retry-button"
                >
                  Try again
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
                Back
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
                    Analysing…
                  </span>
                ) : (
                  'Show my results'
                )
              ) : (
                'Next'
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
