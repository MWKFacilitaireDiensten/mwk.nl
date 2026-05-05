/* MWK Facilitaire Diensten – main.js */

(function () {
  'use strict';

  // ── Hero title: karakter-voor-karakter animatie ─────────────
  function splitHeroTitle() {
    var title = document.querySelector('.hero__title');
    if (!title) return;

    var nodes = Array.from(title.childNodes);
    title.innerHTML = '';
    var charIndex = 0;

    nodes.forEach(function (node) {
      if (node.nodeType === Node.TEXT_NODE) {
        var words = node.textContent.split(' ');
        words.forEach(function (word, wi) {
          if (wi > 0) {
            title.appendChild(document.createTextNode(' '));
          }
          if (!word) return;
          var wordSpan = document.createElement('span');
          wordSpan.className = 'hero__word';
          word.split('').forEach(function (char) {
            var wrap = document.createElement('span');
            wrap.className = 'hero__char-wrap';
            var inner = document.createElement('span');
            inner.className = 'hero__char';
            inner.style.setProperty('--i', charIndex);
            inner.textContent = char;
            wrap.appendChild(inner);
            wordSpan.appendChild(wrap);
            charIndex++;
          });
          title.appendChild(wordSpan);
        });
      } else if (node.nodeName === 'BR') {
        title.appendChild(document.createElement('br'));
      }
    });
  }

  splitHeroTitle();

  // ── Jaar in footer ──────────────────────────────────────────
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Sticky header ───────────────────────────────────────────
  const header = document.getElementById('header');
  function updateHeader() {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // ── Mobile hamburger ────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  function closeNav() {
    nav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Menu openen');
  }

  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Menu sluiten' : 'Menu openen');
  });

  // Close nav on link click
  nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // Close nav on outside click
  document.addEventListener('click', e => {
    if (!header.contains(e.target)) closeNav();
  });

  // ── Active nav link on scroll ────────────────────────────────
  const sections = document.querySelectorAll('main [id]');
  const navLinks = document.querySelectorAll('.nav__link[href^="#"]');

  function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) {
        current = section.id;
      }
    });
    navLinks.forEach(link => {
      const href = link.getAttribute('href').slice(1);
      link.classList.toggle('active', href === current);
    });
  }
  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  // ── Scroll-to-top button ─────────────────────────────────────
  const scrollTopBtn = document.getElementById('scroll-top');
  function updateScrollTop() {
    const show = window.scrollY > 500;
    scrollTopBtn.hidden = !show;
  }
  window.addEventListener('scroll', updateScrollTop, { passive: true });
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  updateScrollTop();

  // ── Fade-up on scroll ────────────────────────────────────────
  function addFadeUp() {
    const targets = [
      '.service-card',
      '.testimonial-card',
      '.faq__item',
      '.over-ons__content',
      '.over-ons__visual',
      '.contact__info',
      '.contact__form-wrap',
      '.usp-strip__item',
      '.section-header',
    ];
    targets.forEach(sel => {
      document.querySelectorAll(sel).forEach((el, i) => {
        el.classList.add('fade-up');
        el.style.transitionDelay = `${i * 0.08}s`;
      });
    });
  }

  addFadeUp();

  const fadeObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

  // ── Contact form ─────────────────────────────────────────────
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const formSuccess = document.getElementById('form-success');

  function validate(form) {
    let valid = true;

    function setError(inputId, errorId, msg) {
      const input = document.getElementById(inputId);
      const errorEl = document.getElementById(errorId);
      if (!input) return;
      if (msg) {
        input.classList.add('error');
        if (errorEl) errorEl.textContent = msg;
        valid = false;
      } else {
        input.classList.remove('error');
        if (errorEl) errorEl.textContent = '';
      }
    }

    const naam = form.naam.value.trim();
    setError('naam', 'naam-error', naam.length < 2 ? 'Vul uw naam in.' : '');

    const email = form.email.value.trim();
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setError('email', 'email-error', !emailRe.test(email) ? 'Vul een geldig e-mailadres in.' : '');

    const bericht = form.bericht.value.trim();
    setError('bericht', 'bericht-error', bericht.length < 10 ? 'Vul een bericht in (minimaal 10 tekens).' : '');

    return valid;
  }

  // Live validation on blur
  ['naam', 'email', 'bericht'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('blur', () => validate(form));
  });

  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (!validate(form)) return;

      submitBtn.classList.add('btn--loading');
      submitBtn.disabled = true;

      try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          form.reset();
          formSuccess.hidden = false;
          formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          setTimeout(() => { formSuccess.hidden = true; }, 7000);
        } else {
          alert('Er is een fout opgetreden. Probeer het later opnieuw.');
        }
      } catch (error) {
        console.error('Formulierfout:', error);
        alert('Er is een fout opgetreden. Probeer het later opnieuw.');
      } finally {
        submitBtn.classList.remove('btn--loading');
        submitBtn.disabled = false;
      }
    });
  }

})();
