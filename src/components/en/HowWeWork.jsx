export default function HowWeWork() {
  return (
    <section id="kako-radimo" className="process-section py-24 lg:py-32" aria-labelledby="kako-radimo-heading">
      <div className="process-section-bg" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 lg:mb-20">
          <p className="section-label reveal">How We Work</p>
          <h2
            id="kako-radimo-heading"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold reveal reveal-delay-1 max-w-[480px] leading-[1.1] tracking-[-0.02em]"
          >
            From conversation to results
          </h2>
          <p className="mt-4 text-base lg:text-lg reveal reveal-delay-2 max-w-[440px] leading-[1.7] text-[color:var(--color-text-secondary)]">
            A structured process that eliminates surprises and delivers measurable business outcomes from the very first
            week.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <ol className="list-none p-0 m-0" aria-label="Collaboration steps">
            <li className="process-step reveal" data-testid="process-step-en-1">
              <div>
                <div className="process-step-number" aria-hidden="true">
                  01
                </div>
                <div className="process-step-connector" aria-hidden="true" />
              </div>
              <div className="process-step-content">
                <h3 className="process-step-title">Analysis &amp; Discovery</h3>
                <p className="process-step-body">
                  We discuss your processes and identify where automation delivers the most value. No technical jargon —
                  we understand your business before proposing a solution.
                </p>
              </div>
            </li>

            <li className="process-step reveal reveal-delay-1" data-testid="process-step-en-2">
              <div>
                <div className="process-step-number" aria-hidden="true">
                  02
                </div>
                <div className="process-step-connector" aria-hidden="true" />
              </div>
              <div className="process-step-content">
                <h3 className="process-step-title">Concrete Proposal</h3>
                <p className="process-step-body">
                  We prepare a plan with precise estimates of time and cost savings. No vague quotes — you get a clear
                  picture of what, how, and for how much — before we start.
                </p>
              </div>
            </li>

            <li className="process-step reveal reveal-delay-2" data-testid="process-step-en-3">
              <div>
                <div className="process-step-number" aria-hidden="true">
                  03
                </div>
                <div className="process-step-connector" aria-hidden="true" />
              </div>
              <div className="process-step-content">
                <h3 className="process-step-title">Development &amp; Implementation</h3>
                <p className="process-step-body">
                  We implement the solution with regular check-ins. Transparent process — you see progress at every step,
                  no black boxes.
                </p>
              </div>
            </li>

            <li className="process-step reveal reveal-delay-3" data-testid="process-step-en-4">
              <div>
                <div className="process-step-number" aria-hidden="true">
                  04
                </div>
                <div className="process-step-connector" aria-hidden="true" />
              </div>
              <div className="process-step-content">
                <h3 className="process-step-title">Testing with Real Data</h3>
                <p className="process-step-body">
                  Every workflow is tested with your actual data before going live. We catch the errors — you receive a
                  reliable, proven solution.
                </p>
              </div>
            </li>

            <li className="process-step reveal reveal-delay-3" data-testid="process-step-en-5">
              <div>
                <div className="process-step-number" aria-hidden="true">
                  05
                </div>
              </div>
              <div className="process-step-content">
                <h3 className="process-step-title">Long-term Support</h3>
                <p className="process-step-body">
                  We monitor solution performance and adapt it as your business grows. We don&apos;t disappear after
                  delivery — we remain your long-term technology partner.
                </p>
              </div>
            </li>
          </ol>

          <div className="lg:sticky lg:top-32 reveal reveal-delay-2">
            <div className="relative rounded-2xl overflow-hidden bg-[var(--color-surface-overlay)] border border-[var(--color-surface-border)] p-8">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[var(--color-surface-border)]">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56]" aria-hidden="true" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" aria-hidden="true" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F]" aria-hidden="true" />
                <span className="ml-3 text-xs font-mono text-[color:var(--color-text-muted)]">workflow.json</span>
              </div>
              <div className="space-y-3 font-mono text-xs" aria-label="Illustration of an automated workflow">
                <div className="text-[color:var(--color-accent)]">⬢ Trigger: New inquiry received</div>
                <div className="pl-4 text-[color:var(--color-text-muted)]">→ Reading data from CRM</div>
                <div className="pl-4 text-[color:var(--color-text-muted)]">→ AI analysis of inquiry</div>
                <div className="pl-4 text-[color:var(--color-accent)] opacity-70">
                  → Priority: <span className="text-accent">HIGH</span>
                </div>
                <div className="pl-4 text-[color:var(--color-text-muted)]">→ Sending notification to sales team</div>
                <div className="pl-4 text-[color:var(--color-text-muted)]">→ Automatic reply to client</div>
                <div className="pl-4 text-[color:var(--color-text-muted)]">→ Creating task in Asana</div>
                <div className="mt-4 pt-4 border-t border-[var(--color-surface-border)] text-[color:var(--color-accent)]">
                  ✓ Workflow executed:{' '}
                  <span className="text-[color:var(--color-text-secondary)]">1.4s</span>
                </div>
                <div className="text-xs text-[color:var(--color-text-muted)]">
                  Manual work saved:{' '}
                  <span className="text-[color:var(--color-text-secondary)]">~12 min/inquiry</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
