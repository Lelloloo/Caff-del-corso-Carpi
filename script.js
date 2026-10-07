/**
 * CAFFÈ DEL CORSO — CARPI (MO)
 * Senior Frontend Interaction & Performance Script
 * - Page Loader (~1.2s fade-out)
 * - Intersection Observer Scroll Animations
 * - Interactive Digital Menu Tabs & Smooth Deep Linking
 * - Mobile Navigation Toggle
 * - Sticky Header Scroll Effects
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ══════════════════════════════════════════════════════════════════════
     1. PAGE LOADER (Iniziale ~1.2s su sfondo chiaro)
     ══════════════════════════════════════════════════════════════════════ */
  const pageLoader = document.getElementById('page-loader');

  const dismissLoader = () => {
    if (pageLoader && !pageLoader.classList.contains('loaded')) {
      pageLoader.classList.add('loaded');
      setTimeout(() => {
        pageLoader.style.display = 'none';
      }, 550);
    }
  };

  // Scomparsa morbida a 1.1s - 1.2s per un'esperienza fluida ed elegante
  setTimeout(dismissLoader, 1150);

  // Fallback di sicurezza su window load
  window.addEventListener('load', () => {
    setTimeout(dismissLoader, 400);
  });


  /* ══════════════════════════════════════════════════════════════════════
     2. NAVBAR STICKY & ELEVAZIONE ALLO SCROLL
     ══════════════════════════════════════════════════════════════════════ */
  const header = document.getElementById('header');

  const handleHeaderScroll = () => {
    if (!header) return;
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();


  /* ══════════════════════════════════════════════════════════════════════
     3. MENU MOBILE (HAMBURGER TOGGLE)
     ══════════════════════════════════════════════════════════════════════ */
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-item');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.classList.toggle('active', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Chiudi il menu al click su un link di navigazione
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Chiudi cliccando fuori dal menu
    document.addEventListener('click', (e) => {
      if (!mainNav.contains(e.target) && !navToggle.contains(e.target) && mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }


  /* ══════════════════════════════════════════════════════════════════════
     4. MENU DIGITALE INTERATTIVO (Filtri a Tab senza ricaricare)
     ══════════════════════════════════════════════════════════════════════ */
  const tabButtons = document.querySelectorAll('.menu-tab-btn');
  const panels = document.querySelectorAll('.menu-panel');

  const switchTab = (targetCategory) => {
    // Aggiorna stato bottoni
    tabButtons.forEach(btn => {
      const match = btn.getAttribute('data-category') === targetCategory;
      btn.classList.toggle('active', match);
      btn.setAttribute('aria-selected', String(match));
    });

    // Aggiorna pannelli
    panels.forEach(panel => {
      const panelId = panel.id.replace('panel-', '');
      const match = panelId === targetCategory;
      if (match) {
        panel.hidden = false;
        panel.classList.add('active');
      } else {
        panel.hidden = true;
        panel.classList.remove('active');
      }
    });
  };

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');
      switchTab(category);
    });
  });

  // Collegamento dai pulsanti "I Tre Momenti" alle categorie corrispondenti del Menu
  const cardActionButtons = document.querySelectorAll('[data-filter]');
  cardActionButtons.forEach(cardBtn => {
    cardBtn.addEventListener('click', () => {
      const filter = cardBtn.getAttribute('data-filter');
      switchTab(filter);

      const menuSection = document.getElementById('menu');
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  /* ══════════════════════════════════════════════════════════════════════
     5. SCROLL-DRIVEN ANIMATIONS (Intersection Observer)
     ══════════════════════════════════════════════════════════════════════ */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback per browser senza IntersectionObserver
    revealElements.forEach(el => el.classList.add('revealed'));
  }


  /* ══════════════════════════════════════════════════════════════════════
     6. FOOTER ANNO DINAMICO
     ══════════════════════════════════════════════════════════════════════ */
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
