// ── Theme toggle ─────────────────────────────────────────────────────────────
(function () {
  const saved = localStorage.getItem('theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
  // if no saved preference, the data-theme="dark" on <html> is used as default
})();

function toggleTheme() {
  const html = document.documentElement;
  const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}

// ── Scroll to section ────────────────────────────────────────────────────────
function scrollToSection(name) {
  document.getElementById('page-' + name).scrollIntoView({ behavior: 'smooth' });
}

// ── Project renderer ─────────────────────────────────────────────────────────
(function renderProjects() {
  const grid = document.getElementById('projGrid');
  grid.innerHTML = PROJECTS.map(p => `
    <a class="proj-card" href="${p.url}" target="_blank">
      <div class="proj-header"><span class="proj-name">${p.name}</span></div>
      <div class="proj-desc">${p.desc}</div>
      <div class="proj-tags">${p.tags.map(t => `<span class="proj-tag ${t.cat}">${t.label}</span>`).join('')}</div>
    </a>`).join('');
})();

// ── Project layout toggle ─────────────────────────────────────────────────────
function toggleProjectLayout() {
  const grid = document.getElementById('projGrid');
  const btn  = document.getElementById('layoutToggle');
  const is3  = grid.classList.toggle('cols-3');
  btn.textContent = is3 ? '⊟ 2 cols' : '⊞ 3 cols';
}

// ── Active nav highlight (scroll-spy) ────────────────────────────────────────
const navBtns = document.querySelectorAll('.nav-btn');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const name = entry.target.id.replace('page-', '');
      navBtns.forEach(b => b.classList.remove('active'));
      navBtns.forEach(b => {
        if (b.getAttribute('onclick').includes(`'${name}'`)) {
          b.classList.add('active');
        }
      });
    }
  });
}, { rootMargin: '-10% 0px -85% 0px' });

document.querySelectorAll('.page').forEach(s => observer.observe(s));

// ── Contact form ──────────────────────────────────────────────────────────────
// TODO: replace the stub below with a real service:
//   Formspree → fetch('https://formspree.io/f/YOUR_ID', { method: 'POST', body: new FormData(e.target) })
//   EmailJS   → emailjs.sendForm('SERVICE_ID', 'TEMPLATE_ID', e.target)
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.form-btn');
  btn.textContent = 'message_sent ✓';
  btn.style.background = 'var(--accent2)';
  btn.disabled = true;
}
