// Widget Google Reviews — fetch depuis atlinker API, rendu dans #google-reviews
(function () {
  const ENDPOINT = 'https://slcksfqbsbcmvqupbhox.supabase.co/functions/v1/site-google-reviews';
  const DOMAIN = 'atmr-energies.fr';
  const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsY2tzZnFic2JjbXZxdXBiaG94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2OTk1NTksImV4cCI6MjA4ODI3NTU1OX0.Uv3yUk7s1ASmvwra0bYjZDLXTB8LRDNU9qeDfuuyk4I';
  const GBP_URL = 'https://search.google.com/local/reviews?placeid=ChIJatmr_energies_montussan';

  function fixMojibake(s) {
    if (!s) return '';
    try { return decodeURIComponent(escape(s)); } catch { return s; }
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function stars(n) {
    const full = Math.round(n);
    return '★'.repeat(full) + '☆'.repeat(5 - full);
  }

  async function fetchReviews() {
    const res = await fetch(`${ENDPOINT}?domain=${DOMAIN}`, {
      headers: { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` },
    });
    if (!res.ok) throw new Error('http_' + res.status);
    return res.json();
  }

  function render(target, data) {
    const reviews = (data.reviews || []).slice(0, 6);
    const rating = data.rating || 0;
    const total = data.total || 0;

    target.innerHTML = `
      <div class="greviews">
        <div class="greviews-header">
          <div class="greviews-brand">
            <svg viewBox="0 0 48 48" width="32" height="32" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3a12 12 0 1 1-3.4-13l5.7-5.7A20 20 0 1 0 44 24c0-1.3-.1-2.7-.4-3.9z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8A12 12 0 0 1 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7A20 20 0 0 0 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3A12 12 0 0 1 12.7 28.4l-6.5 5A20 20 0 0 0 24 44z"/><path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3a12 12 0 0 1-4.1 5.5l6.3 5.3C41.4 35.6 44 30.2 44 24c0-1.3-.1-2.7-.4-3.9z"/></svg>
            <div>
              <div class="greviews-title">Avis Google</div>
              <div class="greviews-sub">${total} avis vérifiés</div>
            </div>
          </div>
          <div class="greviews-score">
            <div class="greviews-stars">${stars(rating)}</div>
            <div class="greviews-rating"><strong>${rating.toFixed(1)}</strong>/5</div>
          </div>
        </div>
        <div class="greviews-grid">
          ${reviews.map((r) => {
            const name = fixMojibake(r.reviewer_name || r.author || 'Client Google');
            const text = fixMojibake(r.comment || r.text || '');
            const when = r.relativeTime ? fixMojibake(r.relativeTime) : '';
            return `<div class="greview-card">
              <div class="greview-head">
                <div class="greview-avatar greview-avatar-init">${esc(name.charAt(0).toUpperCase())}</div>
                <div>
                  <div class="greview-name">${esc(name)}</div>
                  <div class="greview-meta"><span class="greview-stars">${stars(r.star_rating || r.rating || 5)}</span>${when ? ` · <span class="greview-when">${esc(when)}</span>` : ''}</div>
                </div>
              </div>
              <p class="greview-text">${esc(text)}</p>
            </div>`;
          }).join('')}
        </div>
      </div>
    `;
  }

  function renderError(target) {
    target.innerHTML = `<div class="greviews-fallback">Consultez nos avis directement sur Google : <a href="https://www.google.com/search?q=ATMR+\u00c9NERGIES+Montussan" target="_blank" rel="noopener">Voir nos avis Google</a></div>`;
  }

  document.addEventListener('DOMContentLoaded', async () => {
    const target = document.getElementById('google-reviews');
    if (!target) return;
    try {
      const data = await fetchReviews();
      render(target, data);
    } catch (err) {
      console.warn('[reviews] fetch failed', err);
      renderError(target);
    }
  });
})();
