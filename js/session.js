(() => {
  const button = document.querySelector('#logout');
  button.addEventListener('click', async () => {
    button.disabled = true;
    document.querySelector('#logout-status').textContent = '';
    try {
      const result = await fetch('/api/logout',{method:'POST',credentials:'same-origin'});
      if (!result.ok) throw Error();
      location.replace('/login');
    } catch {
      document.querySelector('#logout-status').textContent = 'Не вдалося вийти. Спробуйте ще раз.';
      button.disabled = false;
    }
  });
  // A restored back/forward cache must recheck the session with the server.
  window.addEventListener('pageshow', event => { if (event.persisted) location.reload(); });
})();
