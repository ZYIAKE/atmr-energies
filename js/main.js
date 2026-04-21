// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  var hamburger = document.querySelector('.hamburger');
  var navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      if (item) item.classList.toggle('open');
    });
  });

  // Form submission (to atlinker API)
  document.querySelectorAll('form[data-form]').forEach(function (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var originalText = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Envoi en cours...'; }

      // Honeypot check
      var hp = form.querySelector('input[name="website"]');
      if (hp && hp.value) return;

      var data = Object.fromEntries(new FormData(form).entries());
      data.source = form.dataset.form || 'contact';
      data.site_domain = 'atmr-energies.fr';

      try {
        var res = await fetch('https://slcksfqbsbcmvqupbhox.supabase.co/functions/v1/site-form-submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (res.ok) {
          window.location.href = '/merci.html';
        } else {
          throw new Error('http_' + res.status);
        }
      } catch (err) {
        if (btn) { btn.disabled = false; btn.textContent = originalText; }
        alert('Une erreur est survenue. Merci d\'appeler directement au 05 18 23 22 74.');
      }
    });
  });
});

// Cookie consent
(function () {
  var KEY = 'atmr_cookie_consent';
  var banner = null;

  function show() {
    if (localStorage.getItem(KEY)) {
      loadTracking();
      return;
    }
    banner = document.createElement('div');
    banner.className = 'cookie-banner visible';
    banner.innerHTML =
      '<div class="cookie-inner">' +
      '<div class="cookie-text">Nous utilisons des cookies pour mesurer l\'audience et améliorer votre expérience. ' +
      '<a href="/politique-confidentialite.html">En savoir plus</a></div>' +
      '<div class="cookie-actions">' +
      '<button class="btn btn-secondary" data-action="refuse">Refuser</button>' +
      '<button class="btn btn-primary" data-action="accept">Accepter</button>' +
      '</div></div>';
    document.body.appendChild(banner);
    banner.querySelector('[data-action="accept"]').addEventListener('click', function () {
      localStorage.setItem(KEY, 'accepted');
      banner.remove();
      loadTracking();
    });
    banner.querySelector('[data-action="refuse"]').addEventListener('click', function () {
      localStorage.setItem(KEY, 'refused');
      banner.remove();
    });
  }

  function loadTracking() {
    if (window.__loadGA4) window.__loadGA4();
    if (window.__loadClarity) window.__loadClarity();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', show);
  } else {
    show();
  }
})();
