const canvas = document.getElementById('canvas');
const ctx = canvas ? canvas.getContext('2d') : null;

let width, height;
let hearts = [];
let droplets = [];
let rafId = null;

function resize() {
  if (!canvas) return;
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

class Heart {
  constructor() { this.reset(true); }

  reset(initial = false) {
    this.x = Math.random() * width;
    this.y = initial ? Math.random() * height : -20;
    this.size = 6 + Math.random() * 8;
    this.speed = 0.5 + Math.random() * 0.6;
    this.opacity = 0.3 + Math.random() * 0.4;
    this.wobble = Math.random() * 1000;
  }

  update(time) {
    this.y += this.speed;
    this.x += Math.sin(time * 0.001 + this.wobble) * 0.2;

    if (this.y > height * 0.95) {
      createSplash(this.x, height * 0.95);
      this.reset();
    }
  }

  draw() {
    if (!ctx) return;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(this.size / 20, this.size / 20);
    ctx.globalAlpha = this.opacity;

    const gradient = ctx.createRadialGradient(0, 0, 2, 0, 0, 20);
    gradient.addColorStop(0, 'rgba(255,120,160,0.9)');
    gradient.addColorStop(1, 'rgba(255,60,120,0.6)');
    ctx.fillStyle = gradient;

    ctx.beginPath();
    ctx.moveTo(0, 6);
    ctx.bezierCurveTo(0, -4, -10, -4, -10, 6);
    ctx.bezierCurveTo(-10, 14, 0, 18, 0, 22);
    ctx.bezierCurveTo(0, 18, 10, 14, 10, 6);
    ctx.bezierCurveTo(10, -4, 0, -4, 0, 6);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }
}

class Droplet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 1 + Math.random() * 2;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = -Math.random() * 2;
    this.life = 1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.05;
    this.life -= 0.03;
  }

  draw() {
    if (!ctx) return;
    ctx.save();
    ctx.globalAlpha = this.life;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,120,160,0.8)';
    ctx.fill();
    ctx.restore();
  }
}

function createSplash(x, y) {
  for (let i = 0; i < 4; i++) droplets.push(new Droplet(x, y));
}

function initHearts() {
  if (!canvas || !ctx) return;
  resize();
  window.addEventListener('resize', resize);

  hearts = [];
  droplets = [];
  for (let i = 0; i < 70; i++) hearts.push(new Heart());

  function animate(time) {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    hearts.forEach(h => { h.update(time); h.draw(); });

    for (let i = droplets.length - 1; i >= 0; i--) {
      const d = droplets[i];
      d.update(); d.draw();
      if (d.life <= 0) droplets.splice(i, 1);
    }

    rafId = requestAnimationFrame(animate);
  }

  rafId = requestAnimationFrame(animate);
}

// Initialize only after unlock
if (sessionStorage.getItem('page_unlocked') === '1') {
  initHearts();
} else {
  window.addEventListener('pageUnlocked', () => initHearts(), { once: true });
}

export { initHearts };
