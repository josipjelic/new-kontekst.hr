export default function AboutUs() {
  return (
    <section id="o-nama" className="about-section py-24 lg:py-32" aria-labelledby="o-nama-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <p className="section-label reveal">About</p>
          <h2
            id="o-nama-heading"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold reveal reveal-delay-1 max-w-[600px] leading-[1.1] tracking-[-0.02em]"
          >
            Automation that understands your context
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="space-y-6 reveal">
            <p className="text-base lg:text-lg leading-relaxed text-[color:var(--color-text-secondary)]">
              Kontekst.hr was founded on the belief that every company deserves access to tools that were once only
              available to large corporations. With automation and AI, we democratise efficiency.
            </p>
            <p className="text-base leading-relaxed text-[color:var(--color-text-secondary)]">
              Our approach always starts with understanding your business — not with technology. Only once we understand
              your processes and goals do we choose the right solution.
            </p>

            <div className="about-quote mt-8" role="blockquote">
              <p className="text-base leading-relaxed text-[color:var(--color-text-secondary)]">
                &ldquo;Every company deserves the efficiency that was once the privilege of the few. We&apos;re here to
                change that.&rdquo;
              </p>
            </div>

            <div className="flex items-center gap-8 pt-4" aria-label="Key statistics">
              <div className="stat-item">
                <span className="stat-number text-gradient-accent">20+</span>
                <span className="stat-label">clients</span>
              </div>
              <div className="stat-divider" aria-hidden="true" />
              <div className="stat-item">
                <span className="stat-number text-gradient-accent">50+</span>
                <span className="stat-label">automated processes</span>
              </div>
              <div className="stat-divider" aria-hidden="true" />
              <div className="stat-item">
                <span className="stat-number text-gradient-accent">1000+</span>
                <span className="stat-label">hours saved per week</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="about-highlight-card reveal">
              <div className="about-highlight-icon" aria-hidden="true">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
                  />
                </svg>
              </div>
              <h3 className="text-sm font-semibold mb-2 font-display text-[color:var(--color-text-primary)]">
                n8n Specialisation
              </h3>
              <p className="text-sm leading-relaxed text-[color:var(--color-text-muted)]">
                Deep technical expertise in the leading open-source automation tool — not surface-level familiarity.
              </p>
            </div>

            <div className="about-highlight-card reveal reveal-delay-1">
              <div className="about-highlight-icon" aria-hidden="true">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </div>
              <h3 className="text-sm font-semibold mb-2 font-display text-[color:var(--color-text-primary)]">
                Hands-on approach
              </h3>
              <p className="text-sm leading-relaxed text-[color:var(--color-text-muted)]">
                We work directly with your team. We don&apos;t deliver documentation — we deliver solutions that work.
              </p>
            </div>

            <div className="about-highlight-card reveal reveal-delay-2">
              <div className="about-highlight-icon" aria-hidden="true">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                  />
                </svg>
              </div>
              <h3 className="text-sm font-semibold mb-2 font-display text-[color:var(--color-text-primary)]">
                Measurable results
              </h3>
              <p className="text-sm leading-relaxed text-[color:var(--color-text-muted)]">
                Every project defines concrete KPIs upfront. You know what you&apos;re getting — and how to measure
                success.
              </p>
            </div>

            <div className="about-highlight-card reveal reveal-delay-3">
              <div className="about-highlight-icon" aria-hidden="true">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
              </div>
              <h3 className="text-sm font-semibold mb-2 font-display text-[color:var(--color-text-primary)]">
                Post-implementation support
              </h3>
              <p className="text-sm leading-relaxed text-[color:var(--color-text-muted)]">
                We don&apos;t disappear after go-live. We&apos;re here when something needs adjusting, extending, or
                fixing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
