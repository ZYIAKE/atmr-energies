// GA4 event helper (no-op si consent pas donné)
function trackEvent(name, params) {
  try { if (window.gtag) window.gtag('event', name, params || {}); } catch (e) {}
}

// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  // Track phone clicks
  document.querySelectorAll('a[href^="tel:"]').forEach(function (a) {
    a.addEventListener('click', function () {
      trackEvent('phone_click', { phone: a.getAttribute('href').replace('tel:', '') });
    });
  });
  // Track CTA clicks
  document.querySelectorAll('.btn-primary, .nav-cta').forEach(function (btn) {
    btn.addEventListener('click', function () {
      trackEvent('cta_click', { label: (btn.textContent || '').trim().slice(0, 40), href: btn.getAttribute('href') || '' });
    });
  });
  // Scroll depth (25/50/75/100)
  var marks = [25, 50, 75, 100];
  var fired = {};
  window.addEventListener('scroll', function () {
    var pct = Math.round((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100);
    marks.forEach(function (m) {
      if (!fired[m] && pct >= m) { fired[m] = true; trackEvent('scroll_depth', { depth: m }); }
    });
  }, { passive: true });
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

      var raw = Object.fromEntries(new FormData(form).entries());
      var formName = form.dataset.form || 'contact';
      var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsY2tzZnFic2JjbXZxdXBiaG94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2OTk1NTksImV4cCI6MjA4ODI3NTU1OX0.Uv3yUk7s1ASmvwra0bYjZDLXTB8LRDNU9qeDfuuyk4I';
      var payload = {
        site_domain: 'atmr-energies.fr',
        partner_name: 'ATMR ÉNERGIES',
        partner_email: 'contact@atmr-energies.fr',
        visitor_name: raw.nom || '',
        visitor_phone: raw.telephone || '',
        visitor_email: raw.email || '',
        visitor_city: raw.ville || '',
        service_type: raw.prestation || '',
        message: raw.message || '',
        honeypot: raw.website || '',
        page_url: window.location.pathname,
        source: formName,
        fbp: (document.cookie.match(/_fbp=([^;]+)/) || [])[1] || null,
        fbc: (document.cookie.match(/_fbc=([^;]+)/) || [])[1] || null,
      };

      try {
        var res = await fetch('https://slcksfqbsbcmvqupbhox.supabase.co/functions/v1/site-form-submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
          },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          trackEvent('form_submit', { form_name: formName, service_type: payload.service_type });
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
