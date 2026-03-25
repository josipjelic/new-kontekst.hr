export default function Hero() {
  return (
    <section
      id="hero"
      className="hero-section min-h-screen flex items-center justify-center relative"
      style={{ paddingTop: '80px' }}
      aria-labelledby="hero-heading"
    >
      <div className="hero-dot-grid hero-dot-grid-parallax" aria-hidden="true" />
      <div className="hero-spotlight" aria-hidden="true" />
      <div className="hero-orb-wrap hero-orb-wrap-1" aria-hidden="true">
        <div className="hero-orb-1" />
      </div>
      <div className="hero-orb-wrap hero-orb-wrap-2" aria-hidden="true">
        <div className="hero-orb-2" />
      </div>
      <div className="hero-orb-wrap hero-orb-wrap-3" aria-hidden="true">
        <div className="hero-orb-3" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
        <div className="hero-animate hero-animate-delay-1 flex justify-center reveal">
          <span className="hero-badge" aria-label="Status: Accepting new projects">
            <span className="hero-badge-dot" aria-hidden="true" />
            Accepting new projects
          </span>
        </div>

        <h1
          id="hero-heading"
          className="hero-animate hero-animate-delay-2 font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 reveal"
          style={{ letterSpacing: '-0.02em', fontFamily: "'Syne', sans-serif" }}
        >
          Business automation
          <br />
          that <span className="text-gradient">actually works</span>
        </h1>

        <p
          className="hero-animate hero-animate-delay-3 text-lg sm:text-xl leading-relaxed mx-auto mb-10 reveal"
          style={{ color: 'var(--color-text-secondary)', maxWidth: '580px' }}
        >
          We replace manual, repetitive tasks with intelligent n8n workflows and AI solutions. Your team focuses on
          what drives growth — leave the rest to us.
        </p>

        <div className="hero-animate hero-animate-delay-4 flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 reveal">
          <a href="#kontakt" className="btn-primary">
            Free intro call
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a href="#usluge" className="btn-ghost">
            See our services
          </a>
        </div>

        <div
          className="hero-animate hero-animate-delay-4 flex items-center justify-center gap-8 sm:gap-12 flex-wrap reveal"
          style={{ opacity: 0.7 }}
          aria-label="Key advantages"
        >
          <div className="stat-item">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Automations running</span>
          </div>
          <div className="stat-divider" aria-hidden="true" />
          <div className="stat-item">
            <span className="stat-number">n8n</span>
            <span className="stat-label">n8n experts</span>
          </div>
          <div className="stat-divider" aria-hidden="true" />
          <div className="stat-item">
            <span className="stat-number">AI</span>
            <span className="stat-label">Custom AI solutions</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2" aria-hidden="true">
        <span className="text-xs font-medium tracking-widest uppercase" style={{ color: 'var(--color-text-muted)' }}>
          Scroll
        </span>
        <div
          className="w-px h-10"
          style={{ background: 'linear-gradient(180deg, var(--color-accent), transparent)' }}
        />
      </div>
    </section>
  );
}
