(() => {
  const assetUrl = document.currentScript.src;
  const privacyUrl = new URL('../legal/privacy.html', assetUrl).href;
  const key = 't2k-cookie-consent';
  const lifetime = 180 * 24 * 60 * 60 * 1000;
  let choice = null;
  try {
    const stored = JSON.parse(localStorage.getItem(key));
    if (stored?.version === 1 && typeof stored.analytics === 'boolean' &&
        Number.isFinite(stored.savedAt) && stored.savedAt <= Date.now() &&
        Date.now() - stored.savedAt < lifetime) choice = stored;
  } catch { /* Without storage, keep optional cookies off and ask each visit. */ }

  const measurementId = 'G-EYN889R8YK';
  let analyticsLoaded = false;
  window['ga-disable-' + measurementId] = true;

  function removeAnalyticsCookies() {
    const names = document.cookie.split(';').map(cookie => cookie.split('=')[0].trim())
      .filter(name => /^(_ga|_gid|_gat)(_|$)/.test(name));
    const host = location.hostname.split('.');
    const domains = ['', ...host.map((_, i) => host.slice(i).join('.'))];
    const parts = location.pathname.split('/');
    const paths = ['/', ...parts.map((_, i) => parts.slice(0, i + 1).join('/')).filter(Boolean)];
    for (const name of names) for (const domain of domains) for (const path of paths) {
      document.cookie = `${name}=; Max-Age=0; path=${path}` + (domain ? `; domain=${domain}` : '');
    }
  }

  function apply() {
    const allowed = choice?.analytics === true;
    window['ga-disable-' + measurementId] = !allowed;
    if (allowed && !analyticsLoaded) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
      window.gtag('consent', 'default', {
        analytics_storage: 'granted', ad_storage: 'denied',
        ad_user_data: 'denied', ad_personalization: 'denied'
      });
      window.gtag('js', new Date());
      window.gtag('config', measurementId, {
        allow_google_signals: false, allow_ad_personalization_signals: false
      });
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
      document.head.append(script);
      analyticsLoaded = true;
    } else if (analyticsLoaded) {
      window.gtag('consent', 'update', { analytics_storage: allowed ? 'granted' : 'denied' });
    }
    if (!allowed) removeAnalyticsCookies();
    window.dispatchEvent(new CustomEvent('t2k:consent', { detail: { necessary: true, analytics: allowed } }));
  }

  function init() {
    const banner = document.createElement('section');
    banner.className = 'consent-banner';
    banner.setAttribute('aria-labelledby', 'consent-title');
    banner.innerHTML = `<div class="consent-copy"><h2 id="consent-title">Your cookie choices</h2>
      <p>We use essential storage to remember your choices and security tools to protect our contact form. Optional analytics stay off unless you accept them. <a href="${privacyUrl}">Privacy policy</a></p></div>
      <div class="consent-actions"><button type="button" data-choice="accept">Accept all</button><button type="button" data-choice="reject">Reject optional</button><button type="button" data-choice="settings">Preferences</button></div>`;
    banner.hidden = Boolean(choice);
    document.body.append(banner);

    const dialog = document.createElement('dialog');
    dialog.className = 'consent-dialog';
    dialog.setAttribute('aria-labelledby', 'consent-preferences-title');
    dialog.innerHTML = `<form method="dialog"><header><h2 id="consent-preferences-title">Cookie preferences</h2><button type="submit" value="close" class="consent-close" aria-label="Close cookie preferences">Close</button></header>
      <p>Choose whether to allow optional cookies. You can change your choice at any time using the cookie settings button in the bottom-right corner.</p>
      <div class="consent-category"><h3>Essential <span>Always active</span></h3><p>Remembers your consent choice and supports contact-form security. These are needed for the site to work.</p></div>
      <div class="consent-category"><label><input type="checkbox" name="analytics"> Allow analytics</label><p>Allows optional tools that measure how the website is used. Google Analytics measures visits and page usage to help us improve the website. It loads only if you opt in.</p></div>
      <p><a href="${privacyUrl}">Read our privacy policy</a></p>
      <div class="consent-actions"><button type="button" data-choice="save">Save preferences</button><button type="button" data-choice="reject">Reject optional</button><button type="button" data-choice="accept">Accept all</button></div></form>`;
    document.body.append(dialog);
    let opener;
    function openSettings(event) {
      opener = event.currentTarget;
      dialog.querySelector('input').checked = choice?.analytics === true;
      dialog.showModal();
    }
    banner.querySelector('[data-choice="settings"]').addEventListener('click', openSettings);
    const settings = document.createElement('button');
    settings.type = 'button';
    settings.className = 'consent-settings';
    settings.setAttribute('aria-label', 'Cookie settings');
    settings.setAttribute('aria-haspopup', 'dialog');
    settings.title = 'Cookie settings';
    settings.innerHTML = '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-9-9 4 4 0 0 0 5 5 4 4 0 0 0 4 4Z"/><circle cx="8" cy="9" r=".8" fill="currentColor"/><circle cx="8" cy="15" r=".8" fill="currentColor"/><circle cx="13" cy="12" r=".8" fill="currentColor"/><circle cx="15" cy="17" r=".8" fill="currentColor"/></svg>';
    settings.addEventListener('click', openSettings);
    document.body.append(settings);

    function save(analytics, source) {
      choice = { version: 1, analytics, savedAt: Date.now() };
      try { localStorage.setItem(key, JSON.stringify(choice)); } catch { /* Choice still applies for this page. */ }
      banner.hidden = true;
      if (dialog.open) {
        dialog.close();
        settings.focus({ preventScroll: true });
      }
      // Move focus away from controls that have just been hidden.
      if (banner.contains(source)) settings.focus({ preventScroll: true });
      apply();
    }
    [banner, dialog].forEach((surface) => surface.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-choice]');
      if (!button || button.dataset.choice === 'settings') return;
      const analytics = button.dataset.choice === 'accept' ||
        (button.dataset.choice === 'save' && dialog.querySelector('input').checked);
      save(analytics, button);
    }));
    dialog.addEventListener('close', () => {
      if (opener && !opener.closest('[hidden]')) opener.focus({ preventScroll: true });
      else settings.focus({ preventScroll: true });
    });
    window.addEventListener('storage', (event) => {
      if (event.key !== key) return;
      try {
        const stored = JSON.parse(event.newValue);
        choice = stored?.version === 1 && typeof stored.analytics === 'boolean' &&
          Number.isFinite(stored.savedAt) && stored.savedAt <= Date.now() &&
          Date.now() - stored.savedAt < lifetime ? stored : null;
      } catch { choice = null; }
      banner.hidden = Boolean(choice);
      apply();
    });
    apply();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
