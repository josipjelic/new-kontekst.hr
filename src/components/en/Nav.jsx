import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LOGO_LIGHT_URL } from '../../constants/assets.js';

const SCROLL_THRESHOLD_PX = 50;

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD_PX);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => document.body.classList.remove('menu-open');
  }, [mobileOpen]);

  return (
    <header
      id="header"
      className={`fixed top-0 left-0 right-0 z-50${scrolled ? ' scrolled' : ''}`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#hero" className="flex-shrink-0" aria-label="Kontekst.hr — top of page">
            <img src={LOGO_LIGHT_URL} alt="Kontekst.hr logo" className="h-7 lg:h-8 w-auto" />
          </a>

          <ul className="hidden md:flex items-center gap-8" role="list">
            <li>
              <a href="#usluge" className="nav-link text-sm font-medium">
                Services
              </a>
            </li>
            <li>
              <a href="#kako-radimo" className="nav-link text-sm font-medium">
                How We Work
              </a>
            </li>
            <li>
              <a href="#o-nama" className="nav-link text-sm font-medium">
                About
              </a>
            </li>
            <li>
              <Link
                to="/"
                className="text-xs font-medium transition-opacity opacity-60 hover:opacity-100"
                style={{ color: 'var(--color-text-secondary)' }}
                aria-label="Switch to Croatian version"
              >
                HR
              </Link>
            </li>
            <li>
              <a href="#kontakt" className="nav-cta">
                Let&apos;s Talk
              </a>
            </li>
          </ul>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md transition-colors duration-200"
            style={{ color: 'var(--color-text-secondary)' }}
            aria-controls="mobile-menu-en"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span className="sr-only">{mobileOpen ? 'Close menu' : 'Open menu'}</span>
            <svg
              className={`h-6 w-6${mobileOpen ? ' hidden' : ' block'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
              className={`h-6 w-6${mobileOpen ? ' block' : ' hidden'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div
          id="mobile-menu-en"
          className={`${mobileOpen ? '' : 'hidden '}md:hidden mobile-menu-panel`}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <ul className="py-4 space-y-1 px-2" role="list">
            <li>
              <a
                href="#usluge"
                className="mobile-nav-link block px-4 py-3 text-base font-medium rounded-lg"
                onClick={closeMobileMenu}
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#kako-radimo"
                className="mobile-nav-link block px-4 py-3 text-base font-medium rounded-lg"
                onClick={closeMobileMenu}
              >
                How We Work
              </a>
            </li>
            <li>
              <a
                href="#o-nama"
                className="mobile-nav-link block px-4 py-3 text-base font-medium rounded-lg"
                onClick={closeMobileMenu}
              >
                About
              </a>
            </li>
            <li>
              <Link
                to="/"
                className="mobile-nav-link block px-4 py-3 text-base font-medium rounded-lg opacity-60"
                aria-label="Switch to Croatian version"
                onClick={closeMobileMenu}
              >
                HR — Hrvatski
              </Link>
            </li>
            <li>
              <a
                href="#kontakt"
                className="block mx-4 mt-2 mb-2 py-3 text-center rounded-lg font-semibold text-sm"
                style={{ background: 'var(--color-accent)', color: '#07090D' }}
                onClick={closeMobileMenu}
              >
                Let&apos;s Talk
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
