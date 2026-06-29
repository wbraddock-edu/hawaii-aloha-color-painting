

// Dark mode
const html = document.documentElement;
const themeBtn = document.querySelector('.theme-btn');
const stored = window._themeState || 'light' || 'light';
html.setAttribute('data-theme', stored);
if (themeBtn) {
  themeBtn.textContent = stored === 'dark' ? '☀️' : '🌙';
  themeBtn.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    window._themeState = next;
    themeBtn.textContent = next === 'dark' ? '☀️' : '🌙';
  });
}

// Sticky header
const header = document.querySelector('.header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
}

// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Back to top
const btt = document.querySelector('.back-to-top');
if (btt) {
  window.addEventListener('scroll', () => {
    btt.classList.toggle('visible', window.scrollY > 400);
  });
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// Gallery lightbox (simple)
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const src = item.querySelector('img').src;
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.9);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:zoom-out';
    const img = document.createElement('img');
    img.src = src;
    img.style.cssText = 'max-width:90vw;max-height:90vh;border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,0.5)';
    overlay.appendChild(img);
    overlay.addEventListener('click', () => overlay.remove());
    document.body.appendChild(overlay);
  });
});

// Multi-step booking form
const steps = document.querySelectorAll('.form-step');
const stepIndicators = document.querySelectorAll('.step-indicator');
let currentStep = 0;

function showStep(n) {
  steps.forEach((s, i) => s.classList.toggle('active', i === n));
  stepIndicators.forEach((s, i) => {
    s.classList.toggle('active', i === n);
    s.classList.toggle('done', i < n);
  });
  currentStep = n;
}

document.querySelectorAll('.btn-step-next').forEach(btn => {
  btn.addEventListener('click', () => {
    if (currentStep < steps.length - 1) showStep(currentStep + 1);
  });
});
document.querySelectorAll('.btn-step-back').forEach(btn => {
  btn.addEventListener('click', () => {
    if (currentStep > 0) showStep(currentStep - 1);
  });
});

document.querySelectorAll('.service-option').forEach(opt => {
  opt.addEventListener('click', () => {
    document.querySelectorAll('.service-option').forEach(o => o.classList.remove('selected'));
    opt.classList.add('selected');
  });
});

if (steps.length > 0) showStep(0);

// Admin login
const lockForm = document.getElementById('lockForm');
if (lockForm) {
  lockForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const pw = document.getElementById('adminPw').value;
    if (pw === 'admin123') {
      document.getElementById('adminLock').style.display = 'none';
      document.getElementById('adminPanel').style.display = 'block';
    } else {
      document.getElementById('lockError').style.display = 'block';
    }
  });
}
