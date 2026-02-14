// Particle trail effect
function initParticleTrail() {
  const canvas = document.getElementById('canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const particles = [];
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
  
  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.life = 1;
      this.vx = (Math.random() - 0.5) * 1.5;
      this.vy = (Math.random() - 0.5) * 1.5;
      this.size = Math.random() * 1.5 + 0.5;
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life -= 0.02;
      this.vy += 0.05; // slight gravity
    }
    
    draw(ctx) {
      ctx.save();
      ctx.globalAlpha = this.life * 0.3;
      ctx.fillStyle = '#ff6b9d';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }
  
  let lastX = 0;
  let lastY = 0;
  let isPageUnlocked = false;
  
  window.addEventListener('pageUnlocked', () => {
    isPageUnlocked = true;
  });
  
  document.addEventListener('mousemove', (e) => {
    if (!isPageUnlocked) return;
    
    if (Math.random() > 0.5) {
      particles.push(new Particle(e.clientX, e.clientY));
    }
    lastX = e.clientX;
    lastY = e.clientY;
  });
  
  function animate() {
    // Don't clear canvas - let the hearts.js canvas handle the background
    particles.forEach((p, i) => {
      p.update();
      if (p.life <= 0) particles.splice(i, 1);
    });
    
    particles.forEach(p => p.draw(ctx));
    
    if (particles.length > 0 || isPageUnlocked) {
      requestAnimationFrame(animate);
    }
  }
  
  // Start animation on unlock
  window.addEventListener('pageUnlocked', () => {
    animate();
  });
}

// Gentle confetti on unlock
function initConfetti() {
  window.addEventListener('pageUnlocked', () => {
    const confetti = [];
    const canvas = document.getElementById('canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    class Confetti {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.vx = (Math.random() - 0.5) * 3;
        this.vy = Math.random() * 2 + 2;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.2;
        this.size = Math.random() * 6 + 3;
        this.opacity = 1;
        this.colors = ['#ff6b9d', '#ff8fa3', '#ffb3c6', '#ffd6e6', '#ff5a87'];
        this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;
        this.vy += 0.1; // gravity
        this.opacity -= 0.008;
      }
      
      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
      }
    }
    
    // Create initial burst
    for (let i = 0; i < 40; i++) {
      confetti.push(new Confetti());
    }
    
    function animateConfetti() {
      confetti.forEach((c, i) => {
        c.update();
        if (c.opacity <= 0) confetti.splice(i, 1);
      });
      
      confetti.forEach(c => c.draw(ctx));
      
      if (confetti.length > 0) {
        requestAnimationFrame(animateConfetti);
      }
    }
    
    animateConfetti();
  });
}

// Initialize all effects
initParticleTrail();
initConfetti();

export { initParticleTrail, initConfetti };
