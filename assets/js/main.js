(function () {
  'use strict';

  // --- Sticky header ---
  const header = document.getElementById('header');

  function onScroll() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load

  // --- Hamburger menu toggle ---
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('icon-open');
  const iconClose = document.getElementById('icon-close');

  function openMenu() {
    mobileMenu.classList.remove('hidden');
    iconOpen.classList.add('hidden');
    iconClose.classList.remove('hidden');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
  }

  function closeMenu() {
    mobileMenu.classList.add('hidden');
    iconOpen.classList.remove('hidden');
    iconClose.classList.add('hidden');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }

  hamburger.addEventListener('click', function () {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close mobile menu when a link is clicked
  document.querySelectorAll('.mobile-nav-link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // --- Footer year ---
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
