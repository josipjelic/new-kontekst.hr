export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer py-10" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <img src="/logo-light.svg" alt="Kontekst.hr logo" className="h-6 w-auto opacity-60" />
            <p className="text-xs text-[color:var(--color-text-muted)]">
              © {year} Kontekst.hr — All rights reserved.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-6 justify-center md:justify-end" role="list">
              <li>
                <a href="#usluge" className="footer-link">
                  Services
                </a>
              </li>
              <li>
                <a href="#kako-radimo" className="footer-link">
                  How We Work
                </a>
              </li>
              <li>
                <a href="#o-nama" className="footer-link">
                  About
                </a>
              </li>
              <li>
                <a href="#kontakt" className="footer-link">
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@kontekst.hr"
                  className="footer-link flex items-center gap-1.5"
                  aria-label="Email info@kontekst.hr"
                >
                  <span className="footer-accent-dot" aria-hidden="true" />
                  info@kontekst.hr
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
