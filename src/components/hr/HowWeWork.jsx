export default function HowWeWork() {
  return (
    <section id="kako-radimo" className="process-section py-24 lg:py-32" aria-labelledby="kako-radimo-heading">
      <div className="process-section-bg" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 lg:mb-20">
          <p className="section-label reveal">Kako radimo</p>
          <h2
            id="kako-radimo-heading"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold reveal reveal-delay-1 max-w-[480px] leading-[1.1] tracking-[-0.02em]"
          >
            Od razgovora do rezultata
          </h2>
          <p className="mt-4 text-base lg:text-lg reveal reveal-delay-2 max-w-[440px] leading-[1.7] text-[color:var(--color-text-secondary)]">
            Strukturirani proces koji eliminira iznenađenja i osigurava mjerljive poslovne rezultate već od prvog tjedna.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <ol className="list-none p-0 m-0" aria-label="Koraci suradnje">
            <li className="process-step reveal" data-testid="process-step-1">
              <div>
                <div className="process-step-number" aria-hidden="true">
                  01
                </div>
                <div className="process-step-connector" aria-hidden="true" />
              </div>
              <div className="process-step-content">
                <h3 className="process-step-title">Analiza i otkrivanje</h3>
                <p className="process-step-body">
                  Razgovaramo o vašim procesima i identificiramo gdje automatizacija donosi najveću vrijednost. Bez
                  tehničkog žargona — razumijemo vaše poslovanje prije nego predložimo rješenje.
                </p>
              </div>
            </li>

            <li className="process-step reveal reveal-delay-1" data-testid="process-step-2">
              <div>
                <div className="process-step-number" aria-hidden="true">
                  02
                </div>
                <div className="process-step-connector" aria-hidden="true" />
              </div>
              <div className="process-step-content">
                <h3 className="process-step-title">Konkretan prijedlog</h3>
                <p className="process-step-body">
                  Izrađujemo plan s preciznom procjenom uštede vremena i troškova. Bez paušalnih ponuda — dobivate jasnu
                  sliku što, kako i za koliko — još prije nego krenemo.
                </p>
              </div>
            </li>

            <li className="process-step reveal reveal-delay-2" data-testid="process-step-3">
              <div>
                <div className="process-step-number" aria-hidden="true">
                  03
                </div>
                <div className="process-step-connector" aria-hidden="true" />
              </div>
              <div className="process-step-content">
                <h3 className="process-step-title">Razvoj i implementacija</h3>
                <p className="process-step-body">
                  Implementiramo rješenje uz redovite provjere s vama. Transparentan proces — vidite napredak u svakom
                  koraku, bez crnih kutija.
                </p>
              </div>
            </li>

            <li className="process-step reveal reveal-delay-3" data-testid="process-step-4">
              <div>
                <div className="process-step-number" aria-hidden="true">
                  04
                </div>
                <div className="process-step-connector" aria-hidden="true" />
              </div>
              <div className="process-step-content">
                <h3 className="process-step-title">Testiranje s realnim podacima</h3>
                <p className="process-step-body">
                  Svaki workflow testiramo s vašim stvarnim podacima prije puštanja u produkciju. Greške hvatamo mi — vi
                  dobivate pouzdano, provjereno rješenje gotovo.
                </p>
              </div>
            </li>

            <li className="process-step reveal reveal-delay-3" data-testid="process-step-5">
              <div>
                <div className="process-step-number" aria-hidden="true">
                  05
                </div>
              </div>
              <div className="process-step-content">
                <h3 className="process-step-title">Dugoročna podrška</h3>
                <p className="process-step-body">
                  Pratimo performanse rješenja i prilagođavamo ga kako vaše poslovanje raste. Ne nestajemo nakon isporuke
                  — ostajemo vaš dugoročni tehnološki partner.
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
              <div className="space-y-3 font-mono text-xs" aria-label="Ilustracija automatiziranog workflowa">
                <div className="text-[color:var(--color-accent)]">⬢ Trigger: Novi upit primljen</div>
                <div className="pl-4 text-[color:var(--color-text-muted)]">→ Čitanje podataka iz CRM-a</div>
                <div className="pl-4 text-[color:var(--color-text-muted)]">→ AI analiza upita</div>
                <div className="pl-4 text-[color:var(--color-accent)] opacity-70">
                  → Prioritizacija: <span className="text-accent">VISOK</span>
                </div>
                <div className="pl-4 text-[color:var(--color-text-muted)]">→ Slanje obavijesti prodajnom timu</div>
                <div className="pl-4 text-[color:var(--color-text-muted)]">→ Automatski odgovor klijentu</div>
                <div className="pl-4 text-[color:var(--color-text-muted)]">→ Kreiranje zadatka u Asana</div>
                <div className="mt-4 pt-4 border-t border-[var(--color-surface-border)] text-[color:var(--color-accent)]">
                  ✓ Workflow izvršen:{' '}
                  <span className="text-[color:var(--color-text-secondary)]">1.4s</span>
                </div>
                <div className="text-xs text-[color:var(--color-text-muted)]">
                  Ušteđeno ručnog rada:{' '}
                  <span className="text-[color:var(--color-text-secondary)]">~12 min/upitu</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
