(() => {
  // Only the protected portal includes this script. This flag is UI state, never authorization.
  const dialog = document.querySelector('#welcome-dialog');
  const key = 'ug.portal.welcome.dismissed.v1';
  let dismissed = false;
  try {
    const previous = new URL(document.referrer || location.href);
    const navigation = performance.getEntriesByType('navigation')[0];
    // A fresh arrival from login also covers reauthentication after session expiry.
    if (previous.origin === location.origin && /^\/login\/?$/.test(previous.pathname) && navigation?.type === 'navigate') {
      sessionStorage.removeItem(key);
    }
    dismissed = sessionStorage.getItem(key) === 'true';
  } catch {}

  document.querySelector('#welcome-continue').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    document.body.classList.remove('welcome-open');
    try { sessionStorage.setItem(key, 'true'); } catch {}
  });
  // Reset only the greeting preference; session.js remains responsible for the actual logout.
  document.querySelector('#logout').addEventListener('click', () => {
    try { sessionStorage.removeItem(key); } catch {}
  });

  if (!dismissed) {
    dialog.showModal();
    document.body.classList.add('welcome-open');
  }
})();
