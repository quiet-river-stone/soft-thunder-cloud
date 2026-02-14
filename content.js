function renderBoxes(data) {
  const container = document.getElementById('content');
  if (!container) return;
  container.innerHTML = '';

  data.forEach(item => {
    const box = document.createElement('div');
    box.className = 'box';

    if (item.image) {
      const img = document.createElement('img');
      img.src = item.image;
      box.appendChild(img);
    }

    if (item.title) {
      const title = document.createElement('h2');
      title.textContent = item.title;
      box.appendChild(title);
    }

    if (item.text) {
      const text = document.createElement('p');
      text.textContent = item.text;
      box.appendChild(text);
    }

    container.appendChild(box);
  });
}

function initContent() {
  const contentData = [
    { title: 'First Box', text: "Edit this text directly in the contentData array. Add as many boxes as you want." },
    { title: 'Second Box', text: "You can swap this text for an image by using the 'image' property instead." },
    { title: 'Third Box', text: 'The layout auto-renders based on this configuration.' }
  ];

  renderBoxes(contentData);
}

// Only initialize after the page is unlocked (or if already unlocked)
if (sessionStorage.getItem('page_unlocked') === '1') {
  initContent();
} else {
  window.addEventListener('pageUnlocked', () => initContent(), { once: true });
}

export { initContent, renderBoxes };
