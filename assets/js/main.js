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

  // --- English contact form (en/index.html) — mirrors React Contact.jsx + /api/contact ---
  const contactForm = document.getElementById('en-contact-form');
  if (contactForm) {
    const nameInput = document.getElementById('en-kontakt-name');
    const emailInput = document.getElementById('en-kontakt-email');
    const messageInput = document.getElementById('en-kontakt-message');
    const submitBtn = document.getElementById('en-contact-submit');
    const errName = document.getElementById('en-kontakt-name-error');
    const errEmail = document.getElementById('en-kontakt-email-error');
    const errMessage = document.getElementById('en-kontakt-message-error');
    const formError = document.getElementById('en-contact-form-error');
    const formSuccess = document.getElementById('en-contact-form-success');

    const CONTACT_URL = '/api/contact';
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function setFieldError(el, input, msg) {
      if (!el || !input) return;
      if (msg) {
        el.textContent = msg;
        el.classList.remove('hidden');
        input.setAttribute('aria-invalid', 'true');
        input.setAttribute('aria-describedby', el.id);
      } else {
        el.textContent = '';
        el.classList.add('hidden');
        input.setAttribute('aria-invalid', 'false');
        input.removeAttribute('aria-describedby');
      }
    }

    function validateFields() {
      const errors = { name: '', email: '', message: '' };
      const trimmedName = nameInput.value.trim();
      if (trimmedName.length < 2) {
        errors.name = 'Name must be at least 2 characters.';
      }
      const emailTrim = emailInput.value.trim();
      if (!emailTrim) {
        errors.email = 'Email is required.';
      } else if (!emailRe.test(emailTrim)) {
        errors.email = 'Please enter a valid email address.';
      }
      const msgTrim = messageInput.value.trim();
      if (msgTrim.length < 10) {
        errors.message = 'Message must be at least 10 characters.';
      }
      return errors;
    }

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      formError.classList.add('hidden');
      formError.textContent = '';
      formSuccess.classList.add('hidden');
      formSuccess.textContent = '';

      const errors = validateFields();
      setFieldError(errName, nameInput, errors.name);
      setFieldError(errEmail, emailInput, errors.email);
      setFieldError(errMessage, messageInput, errors.message);
      if (errors.name || errors.email || errors.message) {
        return;
      }

      submitBtn.disabled = true;
      var prevLabel = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';

      fetch(CONTACT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          message: messageInput.value.trim(),
        }),
      })
        .then(function (res) {
          if (res.status === 201) {
            formSuccess.textContent = "Thank you! We'll get back to you soon.";
            formSuccess.classList.remove('hidden');
            nameInput.value = '';
            emailInput.value = '';
            messageInput.value = '';
            setFieldError(errName, nameInput, '');
            setFieldError(errEmail, emailInput, '');
            setFieldError(errMessage, messageInput, '');
            return;
          }
          if (res.status === 429) {
            formError.textContent = 'Too many attempts. Please wait a few minutes.';
            formError.classList.remove('hidden');
            return;
          }
          formError.textContent =
            'Something went wrong. Please try again or email us directly.';
          formError.classList.remove('hidden');
        })
        .catch(function () {
          formError.textContent =
            'Something went wrong. Please try again or email us directly.';
          formError.classList.remove('hidden');
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = prevLabel;
        });
    });
  }
})();
