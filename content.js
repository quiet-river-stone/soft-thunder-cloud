// EDIT THIS MESSAGE: change the text below to update the single box message
const MESSAGE = `Happy Valentines day beb! 

I just wanted to say I appreciate you so, so much. I love your sense of humour, your creativity, and the way you care for those who are close with you. 

You always know how to brighten my day, and I feel so lucky to have you in my life.

Even though it's only been a few months, I hope as a couple we'll help each other become the best versions of ourselves. 

I love you - Anthony`;

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
      // add photos around the box
      try {
        const photos = ['pic1.png','pic2.png','pic3.png','pic4.png'];
        const positions = ['pos-tl','pos-tr','pos-bl','pos-br'];
        photos.forEach((src,i) => {
          const img = document.createElement('img');
          img.src = src;
          img.className = 'photo ' + positions[i%positions.length];
          img.alt = `photo ${i+1}`;
          container.appendChild(img);
        });
      } catch(e) { /* ignore if images missing */ }
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
