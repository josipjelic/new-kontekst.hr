import { useState } from 'react';

const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '');
const CONTACT_URL = `${API_BASE}/api/contact`;

function validateFields(name, email, message) {
  const errors = { name: '', email: '', message: '' };
  const trimmedName = name.trim();
  if (trimmedName.length < 2) {
    errors.name = 'Ime mora imati najmanje 2 znaka.';
  }
  const emailTrim = email.trim();
  if (!emailTrim) {
    errors.email = 'E-mail je obavezan.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrim)) {
    errors.email = 'Unesite valjanu e-mail adresu.';
  }
  const msgTrim = message.trim();
  if (msgTrim.length < 10) {
    errors.message = 'Poruka mora imati najmanje 10 znakova.';
  }
  return errors;
}

export default function Kontakt() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    const errors = validateFields(name, email, message);
    setFieldErrors(errors);
    if (errors.name || errors.email || errors.message) {
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(CONTACT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      if (res.status === 201) {
        setFormSuccess('Hvala! Javit ćemo vam se uskoro.');
        setName('');
        setEmail('');
        setMessage('');
        setFieldErrors({ name: '', email: '', message: '' });
        return;
      }

      if (res.status === 429) {
        setFormError('Previše pokušaja. Pričekajte nekoliko minuta.');
        return;
      }

      setFormError('Greška pri slanju. Pokušajte ponovo ili nam pišite direktno.');
    } catch {
      setFormError('Greška pri slanju. Pokušajte ponovo ili nam pišite direktno.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="kontakt" className="contact-section py-24 lg:py-32" aria-labelledby="kontakt-heading">
      <div className="contact-glow" aria-hidden="true" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="contact-card reveal text-left">
          <div className="flex justify-center mb-8" aria-hidden="true">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[var(--color-accent-subtle)] border border-[rgba(0,212,170,0.2)]">
              <svg
                className="w-7 h-7 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </div>
          </div>

          <p className="section-label justify-center text-center">Kontakt</p>

          <h2
            id="kontakt-heading"
            className="font-display text-3xl sm:text-4xl font-bold mt-3 mb-4 text-center tracking-[-0.02em]"
          >
            Pokrenimo razgovor o automatizaciji
          </h2>

          <p className="text-base lg:text-lg leading-relaxed mb-8 mx-auto max-w-[440px] text-center text-[color:var(--color-text-secondary)]">
            Imate ideju, pitanje ili konkretan projekt? Opišite nam izazov — bez obveza. Odgovaramo unutar jednog radnog
            dana.
          </p>

          <form
            data-testid="kontakt-form"
            className="space-y-5 mb-8 text-left max-w-md mx-auto"
            onSubmit={handleSubmit}
            noValidate
          >
            <div>
              <label htmlFor="kontakt-name" className="block text-sm font-medium mb-1.5 text-[color:var(--color-text-secondary)]">
                Ime i prezime
              </label>
              <input
                id="kontakt-name"
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                className="w-full rounded-lg border border-[var(--color-surface-border)] bg-[var(--color-surface-raised)] px-4 py-3 text-sm text-[color:var(--color-text-primary)] placeholder:text-[color:var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-0"
                placeholder="Vaše ime"
                aria-invalid={Boolean(fieldErrors.name)}
                aria-describedby={fieldErrors.name ? 'kontakt-name-error' : undefined}
              />
              {fieldErrors.name ? (
                <p id="kontakt-name-error" className="mt-1.5 text-sm text-red-400" role="alert">
                  {fieldErrors.name}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="kontakt-email" className="block text-sm font-medium mb-1.5 text-[color:var(--color-text-secondary)]">
                E-mail
              </label>
              <input
                id="kontakt-email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                className="w-full rounded-lg border border-[var(--color-surface-border)] bg-[var(--color-surface-raised)] px-4 py-3 text-sm text-[color:var(--color-text-primary)] placeholder:text-[color:var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-0"
                placeholder="vas@tvrtka.hr"
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? 'kontakt-email-error' : undefined}
              />
              {fieldErrors.email ? (
                <p id="kontakt-email-error" className="mt-1.5 text-sm text-red-400" role="alert">
                  {fieldErrors.email}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="kontakt-message" className="block text-sm font-medium mb-1.5 text-[color:var(--color-text-secondary)]">
                Poruka
              </label>
              <textarea
                id="kontakt-message"
                name="message"
                rows={5}
                value={message}
                onChange={(ev) => setMessage(ev.target.value)}
                className="w-full rounded-lg border border-[var(--color-surface-border)] bg-[var(--color-surface-raised)] px-4 py-3 text-sm text-[color:var(--color-text-primary)] placeholder:text-[color:var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-0 resize-y min-h-[120px]"
                placeholder="Ukratko opišite što želite postići…"
                aria-invalid={Boolean(fieldErrors.message)}
                aria-describedby={fieldErrors.message ? 'kontakt-message-error' : undefined}
              />
              {fieldErrors.message ? (
                <p id="kontakt-message-error" className="mt-1.5 text-sm text-red-400" role="alert">
                  {fieldErrors.message}
                </p>
              ) : null}
            </div>

            {formError ? (
              <p role="alert" className="text-sm text-red-400">
                {formError}
              </p>
            ) : null}
            {formSuccess ? (
              <p role="alert" className="text-sm text-accent">
                {formSuccess}
              </p>
            ) : null}

            <div className="flex justify-center pt-2">
              <button type="submit" className="btn-primary disabled:opacity-60 disabled:pointer-events-none" disabled={submitting}>
                {submitting ? 'Slanje...' : 'Pošalji upit'}
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-[color:var(--color-text-secondary)] mb-4">
            Ili nas kontaktirajte izravno:
          </p>

          <div className="flex justify-center">
            <a
              href="mailto:info@kontekst.hr"
              className="contact-email-link"
              aria-label="Pošaljite e-mail na info@kontekst.hr — kontakt za automatizaciju poslovanja"
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              info@kontekst.hr
            </a>
          </div>

          <p className="mt-6 text-sm text-center text-[color:var(--color-text-muted)]">
            Bez automatiziranih odgovora. Svaki upit čita i na njega odgovara čovjek.
          </p>
        </div>
      </div>
    </section>
  );
}
