/* ==========================================================================
   Navigation — Hamburger Toggle + Sticky Header
   ========================================================================== */
(function () {
  'use strict';

  var header = document.getElementById('header');
  var hamburger = document.getElementById('hamburger');
  var nav = document.getElementById('nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      hamburger.classList.toggle('is-active');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close on link click (mobile)
    nav.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        hamburger.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !hamburger.contains(e.target) && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        hamburger.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Dropdown toggle (mobile: tap to open; desktop: handled by CSS hover)
  document.querySelectorAll('.nav__dropdown-toggle').forEach(function (toggle) {
    toggle.addEventListener('click', function (e) {
      if (window.innerWidth < 1024) {
        e.preventDefault();
        var parent = toggle.closest('.nav__item--has-dropdown');
        // Close other dropdowns
        document.querySelectorAll('.nav__item--has-dropdown').forEach(function (item) {
          if (item !== parent) item.classList.remove('is-dropdown-open');
        });
        parent.classList.toggle('is-dropdown-open');
      }
    });
  });

  // Sticky header
  if (header) {
    var lastScroll = 0;
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
      lastScroll = window.scrollY;
    }, { passive: true });
  }
})();
