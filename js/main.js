// ============================================================
//  main.js — Confession Website Logic
//  Depends on: config.js (loaded as module in index.html)
// ============================================================

import { CONFIG } from './config.js';

// ── DOM Helpers ────────────────────────────────────────────
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// ── State ──────────────────────────────────────────────────
let currentStory = 0;
let audioEl = null;
let ytPlayer = null;
let isYouTube = false;
let ytReady = false;
let isPlaying = false;
let openTime = Date.now();

// ── Screen Manager ─────────────────────────────────────────
function showScreen(id) {
  $$('.screen').forEach(s => s.classList.remove('active'));
  const next = $(`#${id}`);
  if (next) {
    next.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ── ❶ Opening ─────────────────────────────────────────────
function initOpening() {
  $('#opening-title').textContent  = CONFIG.openingTitle;
  $('#opening-subtitle').textContent = CONFIG.openingSubtitle;
  $('#btn-start').textContent       = CONFIG.startButtonLabel;

  // Floating petals
  spawnPetals();

  $('#btn-start').addEventListener('click', () => {
    trackEvent('opened');
    if (CONFIG.music?.autoPlayOnStart && !isPlaying) {
      playMusic();
    }
    currentStory = 0;
    renderStory();
    showScreen('screen-story');
  });
}

// ── ❷ Story ───────────────────────────────────────────────
function renderStory() {
  const items = CONFIG.story;
  const s = items[currentStory];
  if (!s) return;

  $('#story-emoji').textContent       = s.emoji;
  $('#story-title').textContent       = s.title;
  $('#story-text').textContent        = s.text;
  $('#story-counter').textContent     = `${currentStory + 1} / ${items.length}`;

  // Dots
  renderDots('story-dots', items.length, currentStory);

  // Button states
  $('#btn-story-prev').disabled = currentStory === 0;
  $('#btn-story-next').textContent =
    currentStory === items.length - 1 ? 'Lanjut ✦' : 'Berikutnya →';
}

function initStory() {
  $('#btn-story-prev').addEventListener('click', () => {
    if (currentStory > 0) { currentStory--; renderStory(); }
    else showScreen('screen-opening');
  });

  $('#btn-story-next').addEventListener('click', () => {
    if (currentStory < CONFIG.story.length - 1) {
      currentStory++;
      renderStory();
    } else {
      renderReasons();
      showScreen('screen-reasons');
    }
  });
}

// ── ❸ Reasons ─────────────────────────────────────────────
function renderReasons() {
  const list = $('#reasons-list');
  list.innerHTML = '';
  CONFIG.reasons.forEach((r, i) => {
    const li = document.createElement('li');
    li.className = 'reason-item';
    li.style.transitionDelay = `${i * 0.1}s`;
    li.innerHTML = `<span class="reason-icon" aria-hidden="true">${r.icon}</span>
                    <span class="reason-text">${r.text}</span>`;
    list.appendChild(li);
  });

  // Intersection observer for scroll-reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.2 });

  $$('.reason-item').forEach(el => observer.observe(el));
}

function initReasons() {
  $('#btn-reasons-back').addEventListener('click', () => {
    currentStory = CONFIG.story.length - 1;
    renderStory();
    showScreen('screen-story');
  });

  $('#btn-reasons-next').addEventListener('click', () => {
    if (CONFIG.photos && CONFIG.photos.length > 0) {
      renderGallery();
      showScreen('screen-gallery');
    } else {
      showScreen('screen-question');
    }
  });
}

// ── ❹ Gallery ─────────────────────────────────────────────
function renderGallery() {
  const grid = $('#gallery-grid');
  grid.innerHTML = '';
  CONFIG.photos.forEach((p, i) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.setAttribute('aria-label', p.caption || `Foto ${i + 1}`);
    item.innerHTML = `<img src="${p.src}" alt="${p.caption || `Kenangan ${i+1}`}" loading="lazy">
                      <div class="gallery-caption">${p.caption || ''}</div>`;
    item.addEventListener('click', () => openLightbox(p.src, p.caption));
    item.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openLightbox(p.src, p.caption); });
    grid.appendChild(item);
  });
}

function openLightbox(src, caption) {
  const lb = $('#lightbox');
  $('#lightbox-img').src = src;
  $('#lightbox-img').alt = caption || '';
  lb.classList.add('open');
  lb.focus();
}

function initGallery() {
  $('#btn-gallery-back').addEventListener('click', () => showScreen('screen-reasons'));
  $('#btn-gallery-next').addEventListener('click', () => showScreen('screen-question'));

  const lb = $('#lightbox');
  $('#lightbox-close').addEventListener('click', () => lb.classList.remove('open'));
  lb.addEventListener('click', e => { if (e.target === lb) lb.classList.remove('open'); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') lb.classList.remove('open'); });
}

// ── ❺ Question ─────────────────────────────────────────────
function initQuestion() {
  $('#question-text').textContent       = CONFIG.question;
  $('#btn-answer-yes').textContent      = CONFIG.answers.yes.label;
  $('#btn-answer-wait').textContent     = CONFIG.answers.wait.label;
  $('#btn-answer-no').textContent       = CONFIG.answers.no.label;

  $('#btn-q-back').addEventListener('click', () => {
    if (CONFIG.photos && CONFIG.photos.length > 0) showScreen('screen-gallery');
    else showScreen('screen-reasons');
  });

  $('#btn-answer-yes').addEventListener('click', () => showResponse('yes'));
  $('#btn-answer-wait').addEventListener('click', () => showResponse('wait'));
  $('#btn-answer-no').addEventListener('click', () => showResponse('no'));
}

// ── ❻ Responses ───────────────────────────────────────────
const RESPONSE_EMOJIS = { yes: '🎉', wait: '🌸', no: '🌿' };

function showResponse(type) {
  const a = CONFIG.answers[type];
  const screenId = `screen-${type}`;

  $(`#${type}-emoji`).textContent   = RESPONSE_EMOJIS[type];
  $(`#${type}-title`).textContent   = a.title;
  $(`#${type}-message`).textContent = a.message;

  // WhatsApp link
  const waLink = $(`#${type}-wa`);
  if (waLink && CONFIG.senderWhatsApp) {
    const text = encodeURIComponent(a.whatsappText || '');
    waLink.href = `https://wa.me/${CONFIG.senderWhatsApp}?text=${text}`;
    waLink.style.display = 'inline-flex';
  }

  trackEvent('answered', type);
  showScreen(screenId);

  if (type === 'yes') launchConfetti();
}

function initResponses() {
  ['yes', 'wait', 'no'].forEach(type => {
    const waLink = $(`#${type}-wa`);
    if (waLink && !CONFIG.senderWhatsApp) waLink.style.display = 'none';
  });
}

// ── Confetti ───────────────────────────────────────────────
async function launchConfetti() {
  // Minimal hand-rolled confetti — no external dependency needed
  const canvas = $('#confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * -canvas.height,
    r: Math.random() * 8 + 4,
    color: ['#F4A6B7','#8C2F39','#FDDDE6','#D6728A','#fff','#FFD700'][Math.floor(Math.random()*6)],
    speed: Math.random() * 3 + 2,
    spin:  Math.random() * 6 - 3,
    angle: 0,
  }));

  let frame;
  let elapsed = 0;

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    elapsed++;
    pieces.forEach(p => {
      p.y += p.speed;
      p.angle += p.spin * 0.05;
      if (p.y > canvas.height + 20) { p.y = -20; p.x = Math.random() * canvas.width; }
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.r, p.r / 2.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
    if (elapsed < 220) frame = requestAnimationFrame(tick);
    else { ctx.clearRect(0, 0, canvas.width, canvas.height); }
  }
  tick();
}

// ── Progress Dots ──────────────────────────────────────────
function renderDots(containerId, total, active) {
  const container = $(`#${containerId}`);
  if (!container) return;
  container.innerHTML = '';
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === active ? ' active' : '');
    dot.setAttribute('aria-hidden', 'true');
    container.appendChild(dot);
  }
}

// ── Floating Petals ────────────────────────────────────────
function spawnPetals() {
  const container = $('#petals-container');
  if (!container) return;
  const symbols = ['🌸', '🌷', '💮', '🌺', '💗'];
  for (let i = 0; i < 12; i++) {
    const p = document.createElement('span');
    p.className = 'petal';
    p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    p.style.left            = `${Math.random() * 100}%`;
    p.style.animationDuration = `${Math.random() * 8 + 6}s`;
    p.style.animationDelay  = `${Math.random() * 8}s`;
    p.style.fontSize         = `${Math.random() * 1 + 0.8}rem`;
    container.appendChild(p);
  }
}

// ── Music & YouTube Audio ──────────────────────────────────
function getYouTubeId(urlOrId) {
  if (!urlOrId || typeof urlOrId !== 'string') return null;
  const str = urlOrId.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(str)) return str;
  const match = str.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([a-zA-Z0-9_-]{11})/i);
  return match ? match[1] : null;
}

function loadYouTubeAPI() {
  return new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      return resolve(window.YT);
    }
    const existing = document.getElementById('youtube-iframe-api');
    if (!existing) {
      const tag = document.createElement('script');
      tag.id = 'youtube-iframe-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
    }
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof prev === 'function') prev();
      resolve(window.YT);
    };
  });
}

function playMusic() {
  const btn = $('#music-toggle');
  if (isYouTube) {
    if (ytPlayer && ytReady && typeof ytPlayer.playVideo === 'function') {
      try {
        ytPlayer.playVideo();
      } catch (e) {
        console.warn('YouTube playVideo error:', e);
      }
    }
  } else if (audioEl) {
    audioEl.play().then(() => {
      isPlaying = true;
      if (btn) {
        btn.textContent = '⏸';
        btn.classList.add('playing');
        btn.setAttribute('aria-label', 'Jeda musik');
      }
    }).catch(() => {});
  }
}

function pauseMusic() {
  const btn = $('#music-toggle');
  if (isYouTube) {
    if (ytPlayer && typeof ytPlayer.pauseVideo === 'function') {
      try {
        ytPlayer.pauseVideo();
      } catch (e) {}
    }
  } else if (audioEl) {
    audioEl.pause();
    isPlaying = false;
    if (btn) {
      btn.textContent = '🎵';
      btn.classList.remove('playing');
      btn.setAttribute('aria-label', 'Putar musik');
    }
  }
}

function toggleMusic() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}

function initMusic() {
  const cfg = CONFIG.music;
  const btn = $('#music-toggle');
  const widget = $('#music-widget');
  const widgetClose = $('#music-widget-close');
  const widgetTitle = $('#music-widget-title');

  if (!cfg || !cfg.enabled || !cfg.src) return;

  const ytId = getYouTubeId(cfg.src);

  btn.classList.add('visible');
  btn.setAttribute('aria-label', 'Putar musik');
  btn.setAttribute('title', cfg.label || 'Musik latar');
  btn.textContent = '🎵';

  if (widgetTitle) {
    widgetTitle.textContent = cfg.label || 'Musik Latar 🎵';
  }

  if (widgetClose && widget) {
    widgetClose.addEventListener('click', () => {
      widget.classList.remove('open');
    });
  }

  if (ytId) {
    isYouTube = true;
    loadYouTubeAPI().then((YT) => {
      ytPlayer = new YT.Player('yt-player', {
        height: '100%',
        width: '100%',
        videoId: ytId,
        playerVars: {
          autoplay: 0,
          controls: 1,
          disablekb: 0,
          fs: 1,
          loop: 1,
          playlist: ytId,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: (event) => {
            ytReady = true;
            const vol = cfg.volume !== undefined ? cfg.volume : 50;
            try { event.target.setVolume(vol); } catch (e) {}
          },
          onStateChange: (event) => {
            // YT.PlayerState: PLAYING = 1, PAUSED = 2, ENDED = 0
            if (event.data === 1) {
              isPlaying = true;
              btn.textContent = '⏸';
              btn.classList.add('playing');
              btn.setAttribute('aria-label', 'Jeda musik');
            } else if (event.data === 2) {
              isPlaying = false;
              btn.textContent = '🎵';
              btn.classList.remove('playing');
              btn.setAttribute('aria-label', 'Putar musik');
            } else if (event.data === 0) {
              // loop fallback
              try { event.target.playVideo(); } catch (e) {}
            }
          },
          onError: (err) => {
            console.warn('YouTube Player notice (code):', err.data);
          }
        }
      });
    });

    btn.addEventListener('click', () => {
      if (widget) {
        // Toggle widget open/close
        widget.classList.toggle('open');
      }
      toggleMusic();
    });
  } else {
    // HTML5 Audio fallback for local MP3 files
    if (widget) widget.style.display = 'none';
    audioEl = new Audio(cfg.src);
    audioEl.loop = true;
    audioEl.volume = ((cfg.volume !== undefined ? cfg.volume : 50) / 100);

    btn.addEventListener('click', toggleMusic);
  }
}

// ── Notification / Tracking ────────────────────────────────
async function trackEvent(event, answer = null) {
  const cfg = CONFIG.emailjs;
  if (!cfg || !cfg.enabled) return;

  try {
    // Lazy-load EmailJS SDK
    if (!window.emailjs) {
      await loadScript('https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js');
      window.emailjs.init({ publicKey: cfg.publicKey });
    }
    const params = {
      event,
      answer: answer || '—',
      recipient: CONFIG.recipientName,
      time: new Date().toLocaleString('id-ID'),
      duration: Math.round((Date.now() - openTime) / 1000) + ' detik',
    };
    await window.emailjs.send(cfg.serviceId, cfg.templateId, params);
  } catch (err) {
    console.warn('Notifikasi gagal:', err);
    // Silent fail — penerima tetap melihat layar respons
  }
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload  = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

// ── Swipe support (mobile) ─────────────────────────────────
function initSwipe(el, onLeft, onRight) {
  let startX = 0;
  el.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  el.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) { if (dx < 0) onLeft(); else onRight(); }
  }, { passive: true });
}

// ── Keyboard navigation ────────────────────────────────────
document.addEventListener('keydown', e => {
  const storyScreen = $('#screen-story');
  if (storyScreen && storyScreen.classList.contains('active')) {
    if (e.key === 'ArrowRight') $('#btn-story-next').click();
    if (e.key === 'ArrowLeft')  $('#btn-story-prev').click();
  }
});

// ── Init ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Canvas resize
  const canvas = $('#confetti-canvas');
  window.addEventListener('resize', () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  initOpening();
  initStory();
  initReasons();
  initGallery();
  initQuestion();
  initResponses();
  initMusic();

  // Swipe on story
  initSwipe(
    $('#screen-story'),
    () => $('#btn-story-next').click(),
    () => { if (!$('#btn-story-prev').disabled) $('#btn-story-prev').click(); }
  );

  showScreen('screen-opening');
});
