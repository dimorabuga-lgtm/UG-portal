(() => {
  if (!window.isSecureContext || location.protocol === 'file:') return;
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(() => {});
  const standalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  const mobile = () => matchMedia('(max-width: 1000px)').matches &&
    (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || navigator.maxTouchPoints > 1);
  if (standalone() || !mobile()) return;
  try { if (sessionStorage.getItem('ug.install.dismissed')) return; } catch {}
  let promptEvent;
  const ios = /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const panel = document.createElement('aside');
  panel.className = 'install-panel';
  panel.setAttribute('aria-label', 'Установлення порталу');
  panel.innerHTML = '<div><strong>UG Портал на телефоні</strong><p id="install-help"></p></div><button class="install-action" type="button">Встановити</button><button class="install-dismiss" type="button" aria-label="Закрити пропозицію встановлення">×</button>';
  const help = panel.querySelector('p');
  const action = panel.querySelector('.install-action');
  const show = () => { if (!standalone() && !panel.isConnected) document.querySelector('.header').after(panel); };
  panel.querySelector('.install-dismiss').addEventListener('click', () => {
    panel.remove();
    try { sessionStorage.setItem('ug.install.dismissed', '1'); } catch {}
  });
  action.addEventListener('click', async () => {
    if (!promptEvent) return;
    const current = promptEvent;
    promptEvent = null;
    action.disabled = true;
    try {
      await current.prompt();
      const choice = await current.userChoice;
      if (choice.outcome === 'accepted') panel.remove();
      else { action.hidden = true; help.textContent = 'Можна встановити пізніше через меню браузера → «Встановити застосунок» або «Додати на головний екран».'; }
    } catch { action.hidden = true; help.textContent = 'Відкрийте меню браузера → «Встановити застосунок» або «Додати на головний екран».'; }
  });
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    promptEvent = event;
    help.textContent = 'Додайте іконку на головний екран і відкривайте портал як застосунок.';
    action.hidden = false;
    action.disabled = false;
    show();
  });
  window.addEventListener('appinstalled', () => { promptEvent = null; panel.remove(); });
  action.hidden = true;
  help.textContent = ios
    ? 'У Safari відкрийте меню «Поділитися» → «Додати на початковий екран» → «Додати». Якщо є перемикач «Відкривати як вебзастосунок», увімкніть його.'
    : 'У меню браузера виберіть «Встановити застосунок» або «Додати на головний екран».';
  show();
})();
