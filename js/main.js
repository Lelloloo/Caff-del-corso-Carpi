/**
 * Cosmo - JavaScript Vanilla
 * Gestione menu mobile accessibile, IntersectionObserver per comparsa elementi,
 * feedback form e scroll morbido.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Intersection Observer per animazioni di comparsa (.reveal)
  initScrollReveal();

  // 2. Menu mobile accessibile
  initMobileMenu();

  // 3. Modulo contatti interattivo
  initContactForm();

  // 4. Header dinamico allo scroll
  initHeaderScroll();
});

/**
 * Comparsa elementi allo scroll come specificato in web-design-animazioni
 */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  
  if (!('IntersectionObserver' in window)) {
    // Fallback per browser datati
    reveals.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  reveals.forEach(el => revealObserver.observe(el));
}

/**
 * Menu mobile con gestione accessibilità ARIA e tastiera
 */
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (!menuToggle || !navMenu) return;

  const toggleMenu = (shouldOpen) => {
    const isOpen = typeof shouldOpen === 'boolean' 
      ? shouldOpen 
      : menuToggle.getAttribute('aria-expanded') !== 'true';

    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Chiudi menu di navigazione' : 'Apri menu di navigazione');
    navMenu.classList.toggle('is-open', isOpen);
  };

  menuToggle.addEventListener('click', () => toggleMenu());

  // Chiudi quando si clicca su un link del menu
  navMenu.querySelectorAll('.nav-link, .btn').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 1024) {
        toggleMenu(false);
      }
    });
  });

  // Chiudi quando si preme ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      toggleMenu(false);
      menuToggle.focus();
    }
  });

  // Chiudi se si clicca all'esterno del menu
  document.addEventListener('click', (e) => {
    if (
      navMenu.classList.contains('is-open') &&
      !navMenu.contains(e.target) &&
      !menuToggle.contains(e.target)
    ) {
      toggleMenu(false);
    }
  });
}

/**
 * Gestione invio modulo contatti con validazione e messaggio accessibile
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (!form || !statusEl || !submitBtn) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.elements['name']?.value.trim();
    const contact = form.elements['contact']?.value.trim();
    const message = form.elements['message']?.value.trim();
    const privacy = form.elements['privacy']?.checked;

    // Reset status
    statusEl.className = 'form-status';
    statusEl.textContent = '';

    if (!name || !contact || !message) {
      statusEl.className = 'form-status is-error';
      statusEl.textContent = 'Per favore compila tutti i campi obbligatori contrassegnati da *.';
      return;
    }

    if (!privacy) {
      statusEl.className = 'form-status is-error';
      statusEl.textContent = 'È necessario acconsentire al trattamento dei dati per inviare la richiesta.';
      return;
    }

    // Feedback visivo invio
    submitBtn.disabled = true;
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Invio in corso...</span>';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;

      statusEl.className = 'form-status is-success';
      statusEl.textContent = 'Grazie! Ho ricevuto il tuo messaggio. Ti ricontatterò entro 24 ore lavorative.';
      form.reset();
    }, 600);
  });
}

/**
 * Rifinitura visiva header allo scorrimento
 */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 30) {
          header.style.backgroundColor = 'rgba(7, 9, 14, 0.95)';
          header.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.5)';
        } else {
          header.style.backgroundColor = 'rgba(7, 9, 14, 0.85)';
          header.style.boxShadow = 'none';
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}
