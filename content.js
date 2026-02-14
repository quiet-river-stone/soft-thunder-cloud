// EDIT THIS MESSAGE: change the text below to update the single box message
const MESSAGE = `Dear Lumi,

Wishing you a day full of soft clouds and warm smiles.

Love, Me`;

function renderBoxes(data) {
  const container = document.getElementById('content');
  if (!container) return;
  container.innerHTML = '';

  // Create a single box only
  const box = document.createElement('div');
  box.className = 'box';
  const text = document.createElement('p');
  text.textContent = data.message;
  box.appendChild(text);
  container.appendChild(box);
}

function createEnvelope(container) {
  const wrap = document.createElement('div');
  wrap.className = 'envelope-wrap';

  const env = document.createElement('div');
  env.className = 'envelope';
  env.setAttribute('role','button');
  env.setAttribute('aria-label','Open letter');

  const flap = document.createElement('div');
  flap.className = 'flap';
  env.appendChild(flap);

  wrap.appendChild(env);
  document.body.appendChild(wrap);

  return { wrap, env };
}

function showTitle(text) {
  const existing = document.querySelector('.page-title');
  if (existing) return;
  const title = document.createElement('div');
  title.className = 'page-title';
  title.textContent = text;
  const container = document.getElementById('content');
  if (container) container.parentNode.insertBefore(title, container);
}

function initContent() {
  const contentData = { message: MESSAGE };

  const container = document.getElementById('content');
  if (!container) return;

  // render content but keep it hidden until envelope is opened
  renderBoxes(contentData);
  container.classList.add('hidden');

  const { wrap, env } = createEnvelope(container);

  env.addEventListener('click', () => {
    // animate open
    env.classList.add('open');
    setTimeout(() => {
      wrap.remove();
      container.classList.remove('hidden');
      showTitle('Happy Valentines day Lumi');
    }, 420);
  }, { once: true });
}

// Only initialize after the page is unlocked (or if already unlocked)
if (sessionStorage.getItem('page_unlocked') === '1') {
  initContent();
} else {
  window.addEventListener('pageUnlocked', () => initContent(), { once: true });
}

export { initContent, renderBoxes };
