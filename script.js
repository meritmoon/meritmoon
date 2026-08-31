/* ═══════════════════════════════════════════════════════════════════════
   MERITMOON — SCRIPT.JS
   Forest canvas · Fireflies · Carousels · Scroll reveals · Counters
   ═══════════════════════════════════════════════════════════════════════ */

'use strict';

/* ── COLOR MIRRORS (matches CSS vars — edit in CSS, mirror here for canvas) */
const C = {
  silver: '#C8D8C0',
  emerald: '#2E8B57',
  ruby: '#C24B5A',
  gold: '#D4A853',
  silverBright: '#F4FAF0',
  emeraldBright: '#4DBF82',
  goldBright: '#F0C870',
  silverDim: '#8FA78C',
  emeraldDim: '#1A5235',
  bgDeep: '#020A05',
};

/* ══════════════════════════════════════════════════════════════════════
   1. FOREST + STARS CANVAS
   Layered: deep night sky gradient → stars → faint star clusters →
   distant treeline silhouette painted on canvas bottom
   ══════════════════════════════════════════════════════════════════════ */
(function initForestCanvas() {
  const canvas = document.getElementById('forest-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, stars = [], driftClouds = [];
  let frame = 0, raf;

  function rand(a, b) { return Math.random() * (b - a) + a; }
  function hex2rgb(hex) {
    return {
      r: parseInt(hex.slice(1, 3), 16),
      g: parseInt(hex.slice(3, 5), 16),
      b: parseInt(hex.slice(5, 7), 16),
    };
  }
  function rgba(hex, a) {
    const { r, g, b } = hex2rgb(hex);
    return `rgba(${r},${g},${b},${a})`;
  }

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  /* Stars */
  function buildStars() {
    stars = [];
    const n = Math.floor(W * H / 2800);
    for (let i = 0; i < n; i++) {
      const t = Math.random();
      let sz, base, speed;
      if (t < 0.6) { sz = rand(0.25, 0.65); base = rand(0.08, 0.25); speed = rand(0.002, 0.005); }
      else if (t < 0.88) { sz = rand(0.65, 1.1); base = rand(0.2, 0.5); speed = rand(0.004, 0.008); }
      else { sz = rand(1.1, 1.8); base = rand(0.45, 0.85); speed = rand(0.007, 0.013); }
      stars.push({
        x: rand(0, W), y: rand(0, H * 0.72),
        sz, base, speed,
        phase: rand(0, Math.PI * 2),
        tint: Math.random() < 0.09
          ? (Math.random() < 0.6 ? C.silver : C.emeraldDim)
          : '#FFFFFF',
      });
    }
  }

  /* Wispy drift clouds (very faint nebula smears) */
  function buildClouds() {
    driftClouds = [];
    for (let i = 0; i < 4; i++) {
      driftClouds.push({
        x: rand(W * 0.05, W * 0.95),
        y: rand(H * 0.05, H * 0.55),
        rx: rand(W * 0.12, W * 0.22),
        ry: rand(H * 0.06, H * 0.14),
        angle: rand(-0.3, 0.3),
        color: i % 2 === 0 ? C.emerald : C.silver,
        alpha: rand(0.012, 0.026),
      });
    }
  }



  /* Paint sky gradient */
  function drawSky() {
    const g = ctx.createRadialGradient(W * 0.5, H * 0.28, 0, W * 0.5, H * 0.5, Math.max(W, H) * 0.9);
    g.addColorStop(0, 'rgba(8,20,12,0.97)');
    g.addColorStop(0.3, 'rgba(5,14,8,0.99)');
    g.addColorStop(0.7, 'rgba(3,9,5,1)');
    g.addColorStop(1, 'rgba(2,6,3,1)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }

  /* Paint nebula smears */
  function drawClouds() {
    driftClouds.forEach(c => {
      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate(c.angle);
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(c.rx, c.ry));
      g.addColorStop(0, rgba(c.color, c.alpha));
      g.addColorStop(0.5, rgba(c.color, c.alpha * 0.4));
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(0, 0, c.rx, c.ry, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  /* Paint stars */
  function drawStars() {
    frame++;
    stars.forEach(s => {
      const op = s.base + Math.sin(frame * s.speed + s.phase) * s.base * 0.5;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.sz, 0, Math.PI * 2);
      ctx.fillStyle = s.tint === '#FFFFFF'
        ? `rgba(255,255,255,${op})`
        : rgba(s.tint, op);
      ctx.fill();

      if (s.sz > 1.3 && op > 0.55) {
        const arm = s.sz * 2.8;
        ctx.strokeStyle = `rgba(255,255,255,${op * 0.28})`;
        ctx.lineWidth = 0.4;
        ctx.beginPath();
        ctx.moveTo(s.x - arm, s.y); ctx.lineTo(s.x + arm, s.y);
        ctx.moveTo(s.x, s.y - arm); ctx.lineTo(s.x, s.y + arm);
        ctx.stroke();
      }
    });
  }

  /* Shooting stars (streaking from top-right down to bottom-left across the open moon sky) */
  let shooters = [];
  let nextShooterTime = performance.now() + rand(2500, 6000);

  function spawnShooter() {
    // Angle pointing from top-right down towards bottom-left (~124° to ~148°)
    const angle = rand(Math.PI * 0.68, Math.PI * 0.82);
    const spd = rand(7, 13);
    shooters.push({
      // Spawn in the open upper-right sky around the moon region
      x: rand(W * 0.52, W * 0.96),
      y: rand(H * 0.02, H * 0.36),
      vx: Math.cos(angle) * spd,
      vy: Math.sin(angle) * spd,
      len: rand(70, 140),
      op: 0.95,
      decay: rand(0.010, 0.017),
    });
    nextShooterTime = performance.now() + rand(6000, 16000);
  }

  function drawShooters() {
    if (performance.now() >= nextShooterTime) {
      spawnShooter();
    }
    shooters = shooters.filter(s => s.op > 0);
    shooters.forEach(s => {
      const tx = s.x - s.vx * (s.len / 12);
      const ty = s.y - s.vy * (s.len / 12);
      const g = ctx.createLinearGradient(tx, ty, s.x, s.y);
      g.addColorStop(0, 'rgba(200, 216, 192, 0)');
      g.addColorStop(0.7, `rgba(200, 216, 192, ${s.op * 0.5})`);
      g.addColorStop(1, `rgba(255, 255, 255, ${s.op})`);
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(s.x, s.y);
      ctx.strokeStyle = g;
      ctx.lineWidth = s.op * 1.3;
      ctx.stroke();

      // Soft sparkling head
      ctx.beginPath();
      ctx.arc(s.x, s.y, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${s.op})`;
      ctx.fill();

      s.x += s.vx;
      s.y += s.vy;
      s.op -= s.decay;
    });
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    drawSky();
    drawClouds();
    drawStars();
    drawShooters();
    raf = requestAnimationFrame(animate);
  }

  resize();
  buildStars();
  buildClouds();
  animate();

  let rt;
  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(() => {
      cancelAnimationFrame(raf);
      resize(); buildStars(); buildClouds(); animate();
    }, 200);
  });
})();


/* ══════════════════════════════════════════════════════════════════════
   2. FIREFLIES
   ══════════════════════════════════════════════════════════════════════ */
(function initFireflies() {
  const container = document.getElementById('fireflies');
  if (!container) return;
  const count = window.innerWidth < 768 ? 16 : 34;

  for (let i = 0; i < count; i++) {
    const ff = document.createElement('div');
    ff.className = 'firefly';
    const x = Math.random() * 100;
    const y = 5 + Math.random() * 90;
    const dur = 7 + Math.random() * 12;
    const del = Math.random() * 10;
    const dx = (Math.random() - 0.5) * 90;
    const dy = -(20 + Math.random() * 90);
    const dx2 = (Math.random() - 0.5) * 70;
    const dy2 = -(40 + Math.random() * 110);
    // Occasionally emerald or silver-tinted firefly
    const randType = Math.random();
    if (randType < 0.28) {
      ff.style.background = '#4DBF82';
      ff.style.boxShadow = '0 0 10px 3px rgba(77, 191, 130, 0.95), 0 0 25px 8px rgba(46, 139, 87, 0.5)';
    } else if (randType < 0.42) {
      ff.style.background = '#E8F0E0';
      ff.style.boxShadow = '0 0 10px 3px rgba(232, 240, 228, 0.95), 0 0 25px 8px rgba(200, 216, 192, 0.45)';
    }
    ff.style.cssText += `
      left: ${x}%; top: ${y}%;
      --ff-dur: ${dur}s;
      --ff-delay: ${del}s;
      --ff-dx: ${dx}px;
      --ff-dy: ${dy}px;
      --ff-dx2: ${dx2}px;
      --ff-dy2: ${dy2}px;
      animation-delay: ${del}s;
      animation-duration: ${dur}s;
    `;
    container.appendChild(ff);
  }
})();


/* ══════════════════════════════════════════════════════════════════════
   2B. FALLING LEAVES (One or two mindful leaves drifting on the night breeze)
   ══════════════════════════════════════════════════════════════════════ */
(function initFallingLeaves() {
  const container = document.getElementById('falling-leaves');
  if (!container) return;

  const leafSvg = `
    <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.5 12C2.5 12 6.5 4 15.5 3C17.5 7 17 14 12 18C7 22 2.5 12 2.5 12Z" fill="currentColor" fill-opacity="0.72"/>
      <path d="M2.5 12C6.5 12.5 11 10.5 15.5 3" stroke="rgba(255,255,255,0.4)" stroke-width="0.75" stroke-linecap="round"/>
      <path d="M7 11.5L9.5 9" stroke="rgba(255,255,255,0.3)" stroke-width="0.6"/>
      <path d="M10 13.5L13 10.5" stroke="rgba(255,255,255,0.3)" stroke-width="0.6"/>
    </svg>
  `;

  const leafColors = ['#4DBF82', '#7ABD90', '#C8D8C0', '#D4A853'];
  const count = 3; // Keep minimal: only 2-3 leaves active at once

  function spawnLeaf(i) {
    const leaf = document.createElement('div');
    leaf.className = 'falling-leaf';
    leaf.innerHTML = leafSvg;

    const size = 16 + Math.random() * 10;
    const color = leafColors[Math.floor(Math.random() * leafColors.length)];
    leaf.style.width = size + 'px';
    leaf.style.height = size + 'px';
    leaf.style.color = color;

    container.appendChild(leaf);

    const startX = Math.random() * (window.innerWidth * 0.7);
    const startY = -40 - Math.random() * 40;
    const endX = startX + (Math.random() * 160 + 60);
    const endY = window.innerHeight + 50;
    const duration = 14000 + Math.random() * 8000;
    const startTime = performance.now() + (i * 4500) + Math.random() * 2000;
    const swayAmp = 30 + Math.random() * 25;
    const swayFreq = 0.0015 + Math.random() * 0.001;
    const rotSpeedZ = (Math.random() - 0.5) * 0.003;
    const rotSpeedY = 0.002 + Math.random() * 0.002;

    function step(now) {
      if (now < startTime) {
        requestAnimationFrame(step);
        return;
      }
      const elapsed = now - startTime;
      const progress = elapsed / duration;

      if (progress >= 1) {
        leaf.remove();
        spawnLeaf(0);
        return;
      }

      const currentY = startY + progress * (endY - startY);
      const currentX = startX + progress * (endX - startX) + Math.sin(now * swayFreq) * swayAmp;
      const rotZ = now * rotSpeedZ * 180;
      const rotY = Math.sin(now * rotSpeedY) * 65;
      const opacity = progress < 0.1 ? progress / 0.1 : (progress > 0.85 ? (1 - progress) / 0.15 : 0.75);

      leaf.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) rotateZ(${rotZ}deg) rotateY(${rotY}deg)`;
      leaf.style.opacity = opacity;

      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  for (let i = 0; i < count; i++) {
    spawnLeaf(i);
  }
})();


/* ══════════════════════════════════════════════════════════════════════
   3. CUSTOM CURSOR
   ══════════════════════════════════════════════════════════════════════ */
(function initCursor() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const el = document.createElement('div');
  el.id = 'cursor';
  el.setAttribute('aria-hidden', 'true');
  document.body.appendChild(el);
  document.body.style.cursor = 'none';

  let cx = -100, cy = -100, tx = -100, ty = -100;

  document.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });

  function lerp(a, b, t) { return a + (b - a) * t; }
  function tick() {
    cx = lerp(cx, tx, 0.16);
    cy = lerp(cy, ty, 0.16);
    el.style.left = cx + 'px';
    el.style.top = cy + 'px';
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  document.querySelectorAll('a,button,[role="button"]').forEach(node => {
    node.style.cursor = 'none';
    node.addEventListener('mouseenter', () => el.classList.add('hover'));
    node.addEventListener('mouseleave', () => el.classList.remove('hover'));
  });

  // Hide custom cursor when hovering over any moon icon or mascot so face is never obscured
  document.querySelectorAll('.moon-mascot, .hero-moon, .about__big-moon, #three-moon-mount').forEach(node => {
    node.addEventListener('mouseenter', () => el.classList.add('hidden'));
    node.addEventListener('mouseleave', () => el.classList.remove('hidden'));
  });
})();


/* ══════════════════════════════════════════════════════════════════════
   4. NAVIGATION
   ══════════════════════════════════════════════════════════════════════ */
(function initNav() {
  const nav = document.getElementById('nav');
  const ham = document.getElementById('hamburger');
  const links = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    links.classList.toggle('open');
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      ham.classList.remove('open');
      links.classList.remove('open');
    });
  });
})();


/* ══════════════════════════════════════════════════════════════════════
   5. HERO ENTRY ANIMATION
   ══════════════════════════════════════════════════════════════════════ */
(function initHero() {
  // Kicker
  const kicker = document.querySelector('.hero__kicker');
  if (kicker) setTimeout(() => {
    kicker.style.opacity = '1';
    kicker.style.animation = 'fade-up 0.8s var(--ease-forest) forwards';
  }, 300);

  // Headline lines
  document.querySelectorAll('.hero__hl-line').forEach(line => {
    const d = parseInt(line.dataset.d || 0);
    setTimeout(() => line.classList.add('vis'), 500 + d);
  });

  // Body + CTA
  document.querySelectorAll('.reveal-fade[data-d]').forEach(el => {
    if (!el.closest('.hero')) return;
    const d = parseInt(el.dataset.d || 0);
    setTimeout(() => el.classList.add('vis'), 500 + d);
  });
})();


/* ══════════════════════════════════════════════════════════════════════
   6. INTERSECTION OBSERVER — scroll reveals + counters
   ══════════════════════════════════════════════════════════════════════ */
(function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('vis');
      obs.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });

  // Tag everything that should reveal (excluding hero, which has its own timing)
  document.querySelectorAll('.reveal-fade, .reveal-card').forEach(el => {
    if (el.closest('.hero')) return;
    // Delay based on data-d if present
    const d = parseInt(el.dataset.d || 0);
    if (d) el.style.transitionDelay = (d / 1000) + 's';
    obs.observe(el);
  });

  // Tag other elements
  [
    '.pcard', '.how__step', '.mtile', '.tcard',
    '.about__words > *', '.about__pillars',
    '.fcol', '.footer__brand',
  ].forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      if (!el.classList.contains('reveal-fade') && !el.classList.contains('reveal-card')) {
        el.classList.add('reveal-fade');
        el.style.transitionDelay = (i * 0.08) + 's';
        if (!el.closest('.hero')) obs.observe(el);
      }
    });
  });
})();


/* ══════════════════════════════════════════════════════════════════════
   7. ANIMATED COUNTERS
   ══════════════════════════════════════════════════════════════════════ */
(function initCounters() {
  function easeOut(t) { return 1 - Math.pow(1 - t, 4); }

  function animateNum(el, target, dur = 2200) {
    const start = performance.now();
    (function step(now) {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.floor(easeOut(p) * target).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString();
    })(start);
  }

  const cObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const t = parseInt(e.target.dataset.target, 10);
      if (!isNaN(t)) animateNum(e.target, t);
      cObs.unobserve(e.target);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-target]').forEach(el => cObs.observe(el));
})();


/* ══════════════════════════════════════════════════════════════════════
   8. CAROUSEL FACTORY
   ══════════════════════════════════════════════════════════════════════ */
function makeCarousel({ trackId, prevId, nextId, dotsId, cardSel, perView, gapPx, autoplay }) {
  const track = document.getElementById(trackId);
  const prev = document.getElementById(prevId);
  const next = document.getElementById(nextId);
  const dotsEl = document.getElementById(dotsId);
  if (!track || !prev || !next || !dotsEl) return;

  const cards = [...track.querySelectorAll(cardSel)];
  if (!cards.length) return;

  const maxIdx = Math.max(0, cards.length - perView);
  let cur = 0;

  // Build dots
  for (let i = 0; i <= maxIdx; i++) {
    const d = document.createElement('div');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => go(i));
    dotsEl.appendChild(d);
  }

  function cardW() {
    return cards[0].offsetWidth + gapPx;
  }

  function go(idx) {
    cur = Math.max(0, Math.min(idx, maxIdx));
    track.style.transform = `translateX(-${cur * cardW()}px)`;
    dotsEl.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === cur));
  }

  prev.addEventListener('click', () => go(cur - 1));
  next.addEventListener('click', () => go(cur + 1));

  // Touch swipe
  let tx0 = 0;
  track.parentElement.addEventListener('touchstart', e => { tx0 = e.changedTouches[0].clientX; }, { passive: true });
  track.parentElement.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - tx0;
    if (Math.abs(dx) > 44) go(dx < 0 ? cur + 1 : cur - 1);
  }, { passive: true });

  if (autoplay) {
    setInterval(() => go(cur < maxIdx ? cur + 1 : 0), autoplay);
  }
}

// Courses
makeCarousel({
  trackId: 'courses-track', prevId: 'c-prev', nextId: 'c-next', dotsId: 'c-dots',
  cardSel: '.ccard', perView: Math.max(1, Math.floor(window.innerWidth / 348)),
  gapPx: 24, autoplay: 5500,
});

// Testimonials
makeCarousel({
  trackId: 'testi-track', prevId: 't-prev', nextId: 't-next', dotsId: 't-dots',
  cardSel: '.tcard', perView: Math.max(1, Math.floor(window.innerWidth / 588)),
  gapPx: 24, autoplay: 0,
});


/* ══════════════════════════════════════════════════════════════════════
   9. MOON PARALLAX + EYE TRACKING
   ══════════════════════════════════════════════════════════════════════ */
(function initMoonInteractions() {
  const moonWrap = document.querySelector('.hero-moon-wrap');

  // Parallax on wrap — keeps moon-float animation on .hero-moon
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking || !moonWrap) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        moonWrap.style.setProperty('--moon-shift', `${y * 0.06}px`);
      }
      ticking = false;
    });
  }, { passive: true });

  // Eye follow (2D fallback only)
  document.addEventListener('mousemove', e => {
    const heroMoon = document.getElementById('hero-moon');
    if (heroMoon && heroMoon.classList.contains('has-three')) return;

    document.querySelectorAll('.mm-face').forEach(face => {
      const r = face.getBoundingClientRect();
      const fcx = r.left + r.width / 2;
      const fcy = r.top + r.height / 2;
      const dx = e.clientX - fcx;
      const dy = e.clientY - fcy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const max = 1.4;
      const mx = dist > 0 ? (dx / dist) * Math.min(dist * 0.025, max) : 0;
      const my = dist > 0 ? (dy / dist) * Math.min(dist * 0.025, max) : 0;
      face.querySelectorAll('.mm-eye').forEach(eye => {
        eye.style.transform = `translate(${mx}px,${my}px)`;
      });
    });
  });
})();


/* ══════════════════════════════════════════════════════════════════════
   10. MOON BLINK (2D Fallback)
   ══════════════════════════════════════════════════════════════════════ */
(function initBlink() {
  function blink(face) {
    const heroMoon = document.getElementById('hero-moon');
    if (heroMoon && heroMoon.classList.contains('has-three')) return;

    face.querySelectorAll('.mm-eye').forEach(e => {
      const base = e.style.transform || '';
      e.style.transform = base + ' scaleY(0.08)';
      setTimeout(() => { e.style.transform = base; }, 110);
    });
  }
  function scheduleBlink(face) {
    setTimeout(() => { blink(face); scheduleBlink(face); }, 3000 + Math.random() * 4500);
  }
  document.querySelectorAll('.mm-face').forEach(face => scheduleBlink(face));
})();


/* ══════════════════════════════════════════════════════════════════════
   10B. THREE.JS 3D INTERACTIVE MINDFUL MOON MASCOT
   - 3D Sphere geometry with custom dynamic canvas texture
   - Smooth 3D head-tracking (turns towards cursor across screen)
   - Organic micro-blinking (Poisson-spaced natural blink)
   - Cursor hover / proximity interaction:
     * Smoothly morphs into super-cute, peaceful, calming, blissful meditating expression
     * Sweet curved joy eyes (⌒ ⌒), blooming warm rosy-ruby blushes, serene peaceful smile
   - Fallback protection: if WebGL or Three.js is unavailable, CSS moon remains active
   ══════════════════════════════════════════════════════════════════════ */
(function initThreeMindfulMoon() {
  const mount = document.getElementById('three-moon-mount');
  const heroMoon = document.getElementById('hero-moon');
  if (!mount || !heroMoon || typeof THREE === 'undefined') return;

  // Scene setup
  const scene = new THREE.Scene();
  const width = mount.clientWidth || 360;
  const height = mount.clientHeight || 360;

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.z = 6.2;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  mount.appendChild(renderer.domElement);

  // Mark parent container to switch to Three.js mode
  heroMoon.classList.add('has-three');

  // 1. Group for 3D Head Turning
  const moonGroup = new THREE.Group();
  scene.add(moonGroup);

  // Read design tokens from CSS custom properties
  const rootStyles = getComputedStyle(document.documentElement);
  const cssVar = (name) => rootStyles.getPropertyValue(name).trim();

  // 2. Base Sphere — distinct 3D crescent shadow on bottom-right and radiant zenith highlight on top-left
  const sphereMat = new THREE.MeshStandardMaterial({
    color: 0xF4FAF2,
    roughness: 0.55,
    metalness: 0.02,
  });
  const moonSphere = new THREE.Mesh(new THREE.SphereGeometry(2.1, 64, 64), sphereMat);
  moonGroup.add(moonSphere);

  // 3D Scene Lighting:
  // - Ambient base light: calibrated so the bottom-right crescent shadow is clearly visible
  const ambLight = new THREE.AmbientLight(0x82A080, 0.48);
  scene.add(ambLight);

  // - Main Key Light from Top-Left (Zenith Light): casts distinct 3D crescent shadow on bottom-right
  const keyLight = new THREE.DirectionalLight(0xFFFFFF, 1.45);
  keyLight.position.set(-3.6, 3.6, 4.2);
  scene.add(keyLight);

  // - Subtle fill light to keep shadow luminous
  const fillLight = new THREE.DirectionalLight(0x9AB896, 0.28);
  fillLight.position.set(2.0, -3.0, 1.8);
  scene.add(fillLight);

  // 3. Face Planar Decal (Attached to front of moonGroup at z = 2.08 - ZERO DISTORTION)
  const faceCanvas = document.createElement('canvas');
  faceCanvas.width = 512;
  faceCanvas.height = 512;
  const fCtx = faceCanvas.getContext('2d');

  const faceTex = new THREE.CanvasTexture(faceCanvas);
  const faceMat = new THREE.MeshBasicMaterial({
    map: faceTex,
    transparent: true,
    depthWrite: false,
  });
  const facePlane = new THREE.Mesh(new THREE.PlaneGeometry(2.9, 2.9), faceMat);
  facePlane.position.z = 2.08;
  moonGroup.add(facePlane);

  // State Management
  let mouseX = 0, mouseY = 0;
  let targetRotX = 0, targetRotY = 0;
  let isHovered = false;
  let hoverProgress = 0; // 0 = alert/welcoming, 1 = super cute blissful meditating
  let blinkProgress = 0; // 0 = open, 1 = closed
  let isBlinking = false;
  let lookOffsetX = 0, lookOffsetY = 0;

  // Face colors from design tokens
  const eyeColor = cssVar('--bg-deep') || '#020A05';
  const cursorEl = document.getElementById('cursor');

  // Render Crisp Face on 2D Planar Canvas (Proportional, open, expressive vertical spread)
  function drawMoonTexture() {
    fCtx.clearRect(0, 0, 512, 512);

    // Center of canvas
    const cx = 256, cy = 256;

    // 1. Rosy-Ruby Glowing Blushes — ONLY appear on hover (cursor on face)
    if (hoverProgress > 0.05) {
      const blushAlpha = hoverProgress * 0.58;
      const blushRx = 34 + hoverProgress * 10;
      const blushRy = 20 + hoverProgress * 6;

      // Left Blush — positioned below and outside the eyes
      const bLx = cx - 100, bLy = cy + 16;
      const bGradL = fCtx.createRadialGradient(bLx, bLy, 2, bLx, bLy, blushRx);
      bGradL.addColorStop(0, `rgba(225, 95, 115, ${blushAlpha})`);
      bGradL.addColorStop(1, 'rgba(225, 95, 115, 0)');
      fCtx.fillStyle = bGradL;
      fCtx.beginPath();
      fCtx.ellipse(bLx, bLy, blushRx, blushRy, 0, 0, Math.PI * 2);
      fCtx.fill();

      // Right Blush
      const bRx = cx + 100, bRy = cy + 16;
      const bGradR = fCtx.createRadialGradient(bRx, bRy, 2, bRx, bRy, blushRx);
      bGradR.addColorStop(0, `rgba(225, 95, 115, ${blushAlpha})`);
      bGradR.addColorStop(1, 'rgba(225, 95, 115, 0)');
      fCtx.fillStyle = bGradR;
      fCtx.beginPath();
      fCtx.ellipse(bRx, bRy, blushRx, blushRy, 0, 0, Math.PI * 2);
      fCtx.fill();
    }

    // 2. Eyes — Soulful open eyes by default, morphing to closed joy arches (⌒ ⌒) on hover
    const eyeSpacing = 72;
    const eyeBaseLX = cx - eyeSpacing;
    const eyeBaseRX = cx + eyeSpacing;
    const eyeBaseY = cy - 54;
    const eyeLX = eyeBaseLX + lookOffsetX * (1 - hoverProgress);
    const eyeRX = eyeBaseRX + lookOffsetX * (1 - hoverProgress);
    const eyeY = eyeBaseY + lookOffsetY * (1 - hoverProgress);

    fCtx.strokeStyle = eyeColor;
    fCtx.fillStyle = eyeColor;
    fCtx.lineCap = 'round';

    if (hoverProgress > 0.4) {
      // Blissful Meditating Joy Arches (⌒ ⌒) — closed eyes on hover
      const archW = 32;
      const archH = 15 + (hoverProgress - 0.4) * 8;
      fCtx.lineWidth = 6.5;

      // Left Bliss Arch
      fCtx.beginPath();
      fCtx.moveTo(eyeLX - archW, eyeY + 4);
      fCtx.quadraticCurveTo(eyeLX, eyeY - archH, eyeLX + archW, eyeY + 4);
      fCtx.stroke();

      // Right Bliss Arch
      fCtx.beginPath();
      fCtx.moveTo(eyeRX - archW, eyeY + 4);
      fCtx.quadraticCurveTo(eyeRX, eyeY - archH, eyeRX + archW, eyeY + 4);
      fCtx.stroke();
    } else {
      // Soulful Open Eyes with Organic Blink and Specular Catchlights (Default Idle)
      const eyeRadius = 24;
      const scaleY = isBlinking ? (1 - blinkProgress * 0.92) : 1.0;

      // Left Eye
      fCtx.save();
      fCtx.translate(eyeLX, eyeY);
      fCtx.scale(1, scaleY);
      fCtx.beginPath();
      fCtx.arc(0, 0, eyeRadius, 0, Math.PI * 2);
      fCtx.fill();
      if (scaleY > 0.4) {
        fCtx.fillStyle = '#FFFFFF';
        fCtx.beginPath();
        fCtx.arc(-7, -7, 7.5, 0, Math.PI * 2);
        fCtx.fill();
        fCtx.fillStyle = 'rgba(255, 255, 255, 0.75)';
        fCtx.beginPath();
        fCtx.arc(6, 6, 3.5, 0, Math.PI * 2);
        fCtx.fill();
      }
      fCtx.restore();

      // Right Eye
      fCtx.save();
      fCtx.translate(eyeRX, eyeY);
      fCtx.scale(1, scaleY);
      fCtx.fillStyle = eyeColor;
      fCtx.beginPath();
      fCtx.arc(0, 0, eyeRadius, 0, Math.PI * 2);
      fCtx.fill();
      if (scaleY > 0.4) {
        fCtx.fillStyle = '#FFFFFF';
        fCtx.beginPath();
        fCtx.arc(-7, -7, 7.5, 0, Math.PI * 2);
        fCtx.fill();
        fCtx.fillStyle = 'rgba(255, 255, 255, 0.75)';
        fCtx.beginPath();
        fCtx.arc(6, 6, 3.5, 0, Math.PI * 2);
        fCtx.fill();
      }
      fCtx.restore();
    }

    // 3. Standout Sweet, Joyful Smile ◡ — Lowered for spacious vertical separation
    const mouthY = cy + 62 + hoverProgress * 4;
    const mouthW = 54 + hoverProgress * 8;
    const mouthDepth = 26 + hoverProgress * 8;

    fCtx.strokeStyle = eyeColor;
    fCtx.lineWidth = 7.0 + hoverProgress * 1.5;
    fCtx.beginPath();
    fCtx.moveTo(cx - mouthW, mouthY);
    fCtx.quadraticCurveTo(cx, mouthY + mouthDepth, cx + mouthW, mouthY);
    fCtx.stroke();

    // 4. Golden Sparkles on Hover (Pīti Aura)
    if (hoverProgress > 0.3) {
      const spAlpha = (hoverProgress - 0.3) / 0.7;
      fCtx.fillStyle = `rgba(240, 200, 112, ${spAlpha * 0.9})`;

      function drawSparkle(sx, sy, sz) {
        fCtx.beginPath();
        fCtx.moveTo(sx - sz, sy);
        fCtx.quadraticCurveTo(sx, sy, sx, sy - sz);
        fCtx.quadraticCurveTo(sx, sy, sx + sz, sy);
        fCtx.quadraticCurveTo(sx, sy, sx, sy + sz);
        fCtx.quadraticCurveTo(sx, sy, sx - sz, sy);
        fCtx.fill();
      }

      drawSparkle(cx - 120, cy - 85, 11);
      drawSparkle(cx + 125, cy - 95, 10);
      drawSparkle(cx - 125, cy + 80, 9);
      drawSparkle(cx + 125, cy + 75, 10);
    }

    faceTex.needsUpdate = true;
  }

  // Blinking Engine
  function triggerBlink() {
    if (hoverProgress > 0.5) {
      scheduleNextBlink();
      return;
    }
    isBlinking = true;
    const startTime = performance.now();
    const duration = 130;

    function stepBlink(now) {
      const elapsed = now - startTime;
      if (elapsed < duration / 2) {
        blinkProgress = elapsed / (duration / 2);
      } else if (elapsed < duration) {
        blinkProgress = 1 - (elapsed - duration / 2) / (duration / 2);
      } else {
        blinkProgress = 0;
        isBlinking = false;
        scheduleNextBlink();
        return;
      }
      requestAnimationFrame(stepBlink);
    }
    requestAnimationFrame(stepBlink);
  }

  function scheduleNextBlink() {
    const delay = 3200 + Math.random() * 4500;
    setTimeout(triggerBlink, delay);
  }
  scheduleNextBlink();

  // Mouse & Hover Listeners
  const raycaster = new THREE.Raycaster();
  const mouse2D = new THREE.Vector2();

  function onPointerMove(e) {
    const rect = renderer.domElement.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    // Normalized screen position for subtle 3D head turning
    mouseX = (e.clientX - cx) / (window.innerWidth * 0.5);
    mouseY = (e.clientY - cy) / (window.innerHeight * 0.5);

    // Subtle Eye pupil shift
    lookOffsetX = Math.max(-5, Math.min(5, mouseX * 5));
    lookOffsetY = Math.max(-5, Math.min(5, mouseY * 5));

    // Target 3D Rotation on moonGroup — gentle, natural, face stays centered
    targetRotY = Math.max(-0.14, Math.min(0.14, mouseX * 0.12));
    targetRotX = Math.max(-0.10, Math.min(0.10, mouseY * 0.09));

    // Raycast for Hover on 3D Moon
    mouse2D.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse2D.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse2D, camera);
    const intersects = raycaster.intersectObjects([moonSphere, facePlane]);
    isHovered = intersects.length > 0;

    // Hide custom cursor when hovering over 3D moon so no white orb covers face
    if (cursorEl) {
      if (isHovered) {
        cursorEl.classList.add('hidden');
      } else {
        cursorEl.classList.remove('hidden');
      }
    }
  }

  window.addEventListener('mousemove', onPointerMove, { passive: true });
  renderer.domElement.addEventListener('mouseenter', () => {
    isHovered = true;
    if (cursorEl) cursorEl.classList.add('hidden');
  });
  renderer.domElement.addEventListener('mouseleave', () => {
    isHovered = false;
    if (cursorEl) cursorEl.classList.remove('hidden');
  });

  // Touch Support
  window.addEventListener('touchmove', e => {
    if (e.touches.length > 0) {
      onPointerMove(e.touches[0]);
    }
  }, { passive: true });

  // Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    // Smooth 3D Rotation Lerp on moonGroup
    moonGroup.rotation.y += (targetRotY - moonGroup.rotation.y) * 0.055;
    moonGroup.rotation.x += (targetRotX - moonGroup.rotation.x) * 0.055;

    // Gentle Floating Motion
    moonGroup.position.y = Math.sin(elapsed * 0.8) * 0.08;

    // Smooth Hover Transition
    const targetHover = isHovered ? 1.0 : 0.0;
    hoverProgress += (targetHover - hoverProgress) * 0.08;

    // Scale on Hover
    const targetScale = 1.0 + hoverProgress * 0.05;
    moonGroup.scale.set(targetScale, targetScale, targetScale);

    // Update Face Canvas Texture
    drawMoonTexture();

    renderer.render(scene, camera);
  }

  // Handle Resize
  window.addEventListener('resize', () => {
    const nw = mount.clientWidth || 360;
    const nh = mount.clientHeight || 360;
    camera.aspect = nw / nh;
    camera.updateProjectionMatrix();
    renderer.setSize(nw, nh);
  });

  animate();
})();


/* ══════════════════════════════════════════════════════════════════════
   11. CARD AMBIENT GLOW (mouse-tracked radial)
   ══════════════════════════════════════════════════════════════════════ */
(function initCardGlow() {
  const selector = '.ccard, .pcard, .tcard, .mcard, .mtile, .dana-block, .forest-stats';
  document.querySelectorAll(selector).forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      card.style.background = `
        radial-gradient(circle at ${x}% ${y}%, rgba(77, 191, 130, 0.08) 0%, transparent 55%),
        var(--bg-glass-card-hover)
      `;
    });
    card.addEventListener('mouseleave', () => { card.style.background = ''; });
  });
})();


/* ══════════════════════════════════════════════════════════════════════
   12. MINDFUL CTA BUTTON FIREFLY SWARM
   - Fireflies enter slowly when cursor enters the button
   - Wander and hover gently around the button perimeter
   - Float away slowly into the night when cursor leaves (same gentle speed)
   ══════════════════════════════════════════════════════════════════════ */
(function initButtonFireflies() {
  const buttons = document.querySelectorAll('.btn--forest, .nav__pill, .store-btn');
  if (!buttons.length) return;

  buttons.forEach(btn => {
    // Ensure parent button is positioned
    if (getComputedStyle(btn).position === 'static') {
      btn.style.position = 'relative';
    }

    const swarmWrap = document.createElement('div');
    swarmWrap.className = 'btn-firefly-swarm';
    swarmWrap.setAttribute('aria-hidden', 'true');
    btn.appendChild(swarmWrap);

    const fireflyCount = 5;
    const flies = [];

    for (let i = 0; i < fireflyCount; i++) {
      const fly = document.createElement('div');
      fly.className = 'btn-firefly';
      const isEmerald = i % 2 === 0;
      fly.classList.add(isEmerald ? 'btn-firefly--emerald' : 'btn-firefly--gold');
      swarmWrap.appendChild(fly);

      flies.push({
        el: fly,
        angle: (i / fireflyCount) * Math.PI * 2,
        speed: 0.0016 + Math.random() * 0.0012,
        radiusX: 24 + Math.random() * 28,
        radiusY: 12 + Math.random() * 18,
        orbitCenterX: (Math.random() - 0.5) * 45,
        orbitCenterY: (Math.random() - 0.5) * 16,
        wobbleSpeed: 0.0025 + Math.random() * 0.002,
        wobblePhase: Math.random() * Math.PI * 2,
        driftOutX: (Math.random() - 0.5) * 80,
        driftOutY: -(25 + Math.random() * 55),
        fadeProgress: 0,
      });
    }

    let isHovering = false;
    let animId = null;

    function renderSwarm(time) {
      let anyVisible = false;

      flies.forEach((f, idx) => {
        // Smooth entering and gentle dispersal transition
        const targetFade = isHovering ? 1.0 : 0.0;
        const fadeSpeed = isHovering ? 0.04 : 0.022; // Gentle, natural speed
        f.fadeProgress += (targetFade - f.fadeProgress) * fadeSpeed;

        if (f.fadeProgress > 0.01) {
          anyVisible = true;
          f.el.style.opacity = Math.min(1, f.fadeProgress * 1.05).toFixed(3);

          // Harmonic wandering orbit around the button perimeter
          const currentAngle = time * f.speed + f.angle;
          const wobble = Math.sin(time * f.wobbleSpeed + f.wobblePhase) * 9;

          // When cursor leaves, gently drift outward into the night sky
          const disperseDist = 1 - f.fadeProgress;
          const posX = Math.cos(currentAngle) * (f.radiusX + wobble) + f.orbitCenterX + (f.driftOutX * disperseDist);
          const posY = Math.sin(currentAngle * 1.4) * (f.radiusY + wobble) + f.orbitCenterY + (f.driftOutY * disperseDist);

          // Soft organic breathing pulse
          const pulse = 0.85 + Math.sin(time * 0.0035 + idx * 1.3) * 0.35;

          f.el.style.transform = `translate3d(calc(-50% + ${posX.toFixed(1)}px), calc(-50% + ${posY.toFixed(1)}px), 0) scale(${pulse.toFixed(2)})`;
        } else {
          f.el.style.opacity = '0';
        }
      });

      if (anyVisible || isHovering) {
        animId = requestAnimationFrame(renderSwarm);
      } else {
        animId = null;
      }
    }

    btn.addEventListener('mouseenter', () => {
      isHovering = true;
      if (!animId) animId = requestAnimationFrame(renderSwarm);
    });

    btn.addEventListener('mouseleave', () => {
      isHovering = false;
    });
  });
})();


/* ══════════════════════════════════════════════════════════════════════
   13. ACTIVE NAV HIGHLIGHT
   ══════════════════════════════════════════════════════════════════════ */
(function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navAs = document.querySelectorAll('.nav__links a[href^="#"]');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navAs.forEach(a => {
          a.style.color = a.getAttribute('href') === '#' + e.target.id
            ? C.silverBright : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => obs.observe(s));
})();


/* ══════════════════════════════════════════════════════════════════════
   14. MOONLIGHT WASH SCROLL RESPONSE
   ══════════════════════════════════════════════════════════════════════ */
(function initWashParallax() {
  const wash = document.querySelector('.moonlight-wash');
  if (!wash) return;
  window.addEventListener('scroll', () => {
    const ratio = Math.min(window.scrollY / (document.body.scrollHeight * 0.25), 1);
    wash.style.opacity = 0.5 + ratio * 0.4;
  }, { passive: true });
})();


/* ══════════════════════════════════════════════════════════════════════
   15. DYNAMIC COPYRIGHT YEAR
   ══════════════════════════════════════════════════════════════════════ */
(function initCopyrightYear() {
  const yr = document.getElementById('current-year');
  if (yr) yr.textContent = new Date().getFullYear();
})();


/* ══════════════════════════════════════════════════════════════════════
   16. SMOOTH FADE-IN ON LOAD
   ══════════════════════════════════════════════════════════════════════ */
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.9s ease';
  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  }));
});