const PASSWORD = 'valentine'; // change as needed

function dispatchUnlocked() {
  window.dispatchEvent(new CustomEvent('pageUnlocked'));
}

function unlockOverlay(overlay) {
  if (!overlay) return;
  overlay.remove();
  sessionStorage.setItem('page_unlocked', '1');
  dispatchUnlocked();
}

function fail(elt, msg) { if (elt) elt.textContent = msg || 'Incorrect password'; }

function initPasswordGate() {
  const overlay = document.getElementById('pw-overlay');
  const input = document.getElementById('pw-input');
  const submit = document.getElementById('pw-submit');
  const errorEl = document.getElementById('pw-error');

  if (sessionStorage.getItem('page_unlocked') === '1') {
    // already unlocked this session
    if (overlay) overlay.remove();
    dispatchUnlocked();
    return;
  }

  if (!overlay || !input || !submit) return;

  submit.addEventListener('click', () => {
    const v = (input.value || '').trim();
    if (v === PASSWORD) unlockOverlay(overlay); else fail(errorEl);
  });

  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit.click(); });

  // support quick URL access ?pw= (note: exposes pw in URL)
  try {
    const qp = new URLSearchParams(location.search).get('pw');
    if (qp) {
      if (qp === PASSWORD) unlockOverlay(overlay); else fail(errorEl, 'Invalid URL password');
    }
  } catch (e) { /* ignore */ }
}

// initialize immediately when module is loaded
initPasswordGate();

export { initPasswordGate };
