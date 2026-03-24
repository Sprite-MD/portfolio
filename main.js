// ── Page navigation ──────────────────────────────────────────────────────────
function showPage(name, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  btn.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

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
