/* ═══════════════════════════════════════
   CUSTOM CURSOR
═══════════════════════════════════════ */
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let mx = 0, my = 0, cx = 0, cy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursorDot.style.left = mx + 'px';
  cursorDot.style.top  = my + 'px';
});

function animateCursor() {
  cx += (mx - cx) * 0.12;
  cy += (my - cy) * 0.12;
  cursor.style.left = cx + 'px';
  cursor.style.top  = cy + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .bento-card, .magnetic').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});
document.addEventListener('mousedown', () => cursor.classList.add('click'));
document.addEventListener('mouseup',   () => cursor.classList.remove('click'));

/* ═══════════════════════════════════════
   SCROLL PROGRESS
═══════════════════════════════════════ */
const prog = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  prog.style.width = pct + '%';
}, { passive: true });

/* ═══════════════════════════════════════
   NAV SCROLL + ACTIVE
═══════════════════════════════════════ */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('[data-nav]');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id);
      });
    }
  });
}, { rootMargin: '-40% 0px -40% 0px' });
sections.forEach(s => io.observe(s));

/* ═══════════════════════════════════════
   HAMBURGER
═══════════════════════════════════════ */
const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');
burger.addEventListener('click', () => mobileNav.classList.toggle('open'));
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));

/* ═══════════════════════════════════════
   HERO TYPING — role text
═══════════════════════════════════════ */
const roles = ['ML Engineer.', 'LLM Developer.', 'RAG Architect.', 'AI Systems Builder.', 'Data Scientist.'];
let ri = 0, ci = 0, del = false;
const roleEl = document.getElementById('roleText');

function typeRole() {
  const word = roles[ri];
  if (!del) {
    roleEl.textContent = word.slice(0, ++ci);
    if (ci === word.length) { del = true; setTimeout(typeRole, 1800); return; }
  } else {
    roleEl.textContent = word.slice(0, --ci);
    if (ci === 0) { del = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(typeRole, del ? 35 : 65);
}
setTimeout(typeRole, 1200);

/* ═══════════════════════════════════════
   HERO TERMINAL ANIMATION
═══════════════════════════════════════ */
const termCmd = document.getElementById('termCmd');
const termOutput = document.getElementById('termOutput');
const terminalLines = [
  { cmd: 'python profile.py', output: [
    '<span class="tc-key">name</span>    = <span class="tc-val">"Aryan Singh"</span>',
    '<span class="tc-key">role</span>    = <span class="tc-val">"System Engineer @ TCS"</span>',
    '<span class="tc-key">cgpa</span>    = <span class="tc-str">8.2</span>',
    '<span class="tc-key">theatre</span> = <span class="tc-val">"Indian National Theatre"</span>',
    '<span class="tc-key">status</span>  = <span class="tc-val" style="color:var(--green)">ready_to_build</span>',
  ]},
  { cmd: 'ls projects/', output: [
    '<span class="tc-val">multi-agent-research/</span>',
    '<span class="tc-val">rag-document-intelligence/</span>',
    '<span class="tc-val">stock-forecast-engine/</span>',
    '<span class="tc-val">ml-model-monitor/</span>',
    '<span class="tc-val">automl-pipeline/</span>',
  ]},
  { cmd: 'git log --oneline -3', output: [
    '<span class="tc-str">a3f91c2</span> <span class="tc-val">feat: LSTM maintenance predictor</span>',
    '<span class="tc-str">b7d23e1</span> <span class="tc-val">feat: multi-agent orchestrator</span>',
    '<span class="tc-str">c91f4a0</span> <span class="tc-val">feat: FAISS vector store</span>',
  ]},
];
let termIdx = 0;

async function runTerminal() {
  while (true) {
    const { cmd, output } = terminalLines[termIdx % terminalLines.length];
    termOutput.innerHTML = '';
    termCmd.textContent = '';

    // type command
    for (const ch of cmd) {
      termCmd.textContent += ch;
      await sleep(45);
    }
    await sleep(400);

    // show output lines
    for (const line of output) {
      const d = document.createElement('div');
      d.innerHTML = line;
      d.style.opacity = '0';
      termOutput.appendChild(d);
      await sleep(80);
      d.style.transition = 'opacity 0.3s';
      d.style.opacity = '1';
    }

    await sleep(2800);
    termIdx++;
  }
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
setTimeout(runTerminal, 1000);

/* ═══════════════════════════════════════
   COUNTER ANIMATION
═══════════════════════════════════════ */
function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const isDecimal = target % 1 !== 0;
  const dur = 1500;
  const start = performance.now();
  function tick(now) {
    const t = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    const val = target * ease;
    el.textContent = isDecimal ? val.toFixed(1) : Math.floor(val);
    if (t < 1) requestAnimationFrame(tick);
    else el.textContent = isDecimal ? target.toFixed(1) : target;
  }
  requestAnimationFrame(tick);
}

const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCount(e.target);
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => counterObs.observe(el));

/* ═══════════════════════════════════════
   REVEAL ON SCROLL
═══════════════════════════════════════ */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ═══════════════════════════════════════
   BENTO CARD CLICK
═══════════════════════════════════════ */
document.querySelectorAll('.bento-card[data-href]').forEach(card => {
  card.addEventListener('click', () => window.open(card.dataset.href, '_blank'));
});

/* ═══════════════════════════════════════
   MAGNETIC BUTTONS
═══════════════════════════════════════ */
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width  / 2);
    const dy = e.clientY - (r.top  + r.height / 2);
    btn.style.transform = `translate(${dx * 0.22}px, ${dy * 0.22}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});
