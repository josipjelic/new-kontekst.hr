import { useServiceCardTilt } from '../../hooks/useServiceCardTilt.js';

export default function Services() {
  const cardTilt = useServiceCardTilt();

  return (
    <section id="usluge" className="services-section py-24 lg:py-32" aria-labelledby="usluge-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 lg:mb-20">
          <p className="section-label reveal">Usluge</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              id="usluge-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold reveal reveal-delay-1 max-w-[520px] leading-[1.1] tracking-[-0.02em]"
            >
              Tri načina kako vaše poslovanje ubrzati
            </h2>
            <p className="text-base lg:text-lg reveal reveal-delay-2 max-w-[380px] leading-[1.7] text-[color:var(--color-text-secondary)]">
              Od prvog n8n workflowa do složenih AI aplikacija — gradimo poslovne automatizacije koje se skaliraju s
              vašim rastom.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <article className="service-card reveal" {...cardTilt}>
            <div className="service-icon" aria-hidden="true">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                />
              </svg>
            </div>
            <h3 className="service-card-title">n8n Workflow Automatizacije</h3>
            <p className="service-card-body">
              Povežite sve svoje poslovne alate bez pisanja koda. n8n workflowovi automatiziraju zadatke 24/7 — CRM,
              računovodstvo, e-mail, projektni alati i stotine integracija.
            </p>
            <a
              href="#kontakt"
              className="service-card-link"
              aria-label="Saznajte više o n8n workflow automatizacijama za Hrvatsku"
            >
              Saznajte više
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </article>

          <article className="service-card reveal reveal-delay-1" {...cardTilt}>
            <div className="service-icon" aria-hidden="true">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                />
              </svg>
            </div>
            <h3 className="service-card-title">Automatizacija poslovnih procesa</h3>
            <p className="service-card-body">
              Mapiramo gdje vaš tim gubi sate na ručni rad i zamjenjujemo to pametnim automatizacama. Manje grešaka, brži
              procesi, a vaši ljudi rade ono što im je zaista vrijedno.
            </p>
            <a
              href="#kontakt"
              className="service-card-link"
              aria-label="Saznajte više o automatizaciji poslovnih procesa u Hrvatskoj"
            >
              Saznajte više
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </article>

          <article className="service-card reveal reveal-delay-2" {...cardTilt}>
            <div className="service-icon" aria-hidden="true">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z"
                />
              </svg>
            </div>
            <h3 className="service-card-title">AI Aplikacije po mjeri</h3>
            <p className="service-card-body">
              Gradimo AI aplikacije prilagođene vašim procesima — chatbotovi za korisničku podršku, alati za analizu
              podataka, automatiziranje odluka. Konkretna korist, ne tehnološki eksperiment.
            </p>
            <a
              href="#kontakt"
              className="service-card-link"
              aria-label="Saznajte više o AI aplikacijama za poslovanje po mjeri"
            >
              Saznajte više
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
