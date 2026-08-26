/**
 * PRINGPEN 2026 - Subtle Glowing Embers Particle System (Lightweight & Smooth)
 * Rising warm glowing embers in background (z-index: -1) with zero lag.
 */

export function initEmbers() {
  const canvas = document.getElementById('ember-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let animationId = null;

  // Subtle low count to keep it elegant and performant
  const PARTICLE_COUNT = 16;

  // Pre-render cached glow textures (fastest GPU drawing, no per-frame shadowBlur)
  const glowCache = {};
  const COLORS = ['#ff4500', '#ff8c00', '#ffa500', '#ffd700'];

  function createGlowTexture(color, size) {
    const key = `${color}-${Math.round(size)}`;
    if (glowCache[key]) return glowCache[key];

    const glowSize = Math.max(16, Math.ceil(size * 6));
    const offscreen = document.createElement('canvas');
    offscreen.width = glowSize;
    offscreen.height = glowSize;
    const offCtx = offscreen.getContext('2d');

    const cx = glowSize / 2;
    const cy = glowSize / 2;

    const grad = offCtx.createRadialGradient(cx, cy, 0, cx, cy, glowSize / 2);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.2, color);
    grad.addColorStop(0.5, color + '88');
    grad.addColorStop(1, 'transparent');

    offCtx.fillStyle = grad;
    offCtx.fillRect(0, 0, glowSize, glowSize);

    glowCache[key] = offscreen;
    return offscreen;
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  window.addEventListener('resize', resize);
  resize();

  class Ember {
    constructor(initScatter = true) {
      this.reset(initScatter);
    }

    reset(initScatter = false) {
      this.x = Math.random() * width;
      this.y = initScatter ? Math.random() * height : height + Math.random() * 40;
      this.size = Math.random() * 2 + 1; // 1px - 3px
      this.speedY = -(Math.random() * 0.8 + 0.4); // Gentle upward rise
      this.speedX = (Math.random() - 0.5) * 0.6;
      this.life = initScatter ? Math.random() * 0.8 + 0.2 : 1.0;
      this.decay = Math.random() * 0.003 + 0.0015;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.glowTexture = createGlowTexture(this.color, this.size);
      this.wobbleSpeed = Math.random() * 0.02 + 0.01;
      this.wobbleOffset = Math.random() * Math.PI * 2;
    }

    update() {
      this.x += this.speedX + Math.sin(this.y * 0.015 + this.wobbleOffset) * 0.35;
      this.y += this.speedY;
      this.life -= this.decay;

      if (this.life <= 0 || this.y < -20) {
        this.reset(false);
      }
    }

    draw() {
      ctx.globalAlpha = Math.max(0, Math.min(1, this.life * 0.85));
      const texSize = this.glowTexture.width;
      ctx.drawImage(this.glowTexture, this.x - texSize / 2, this.y - texSize / 2);
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Ember(true));
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    ctx.globalAlpha = 1.0;
    animationId = requestAnimationFrame(animate);
  }

  animate();
}
