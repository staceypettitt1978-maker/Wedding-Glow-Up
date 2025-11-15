// === Tab Switching ===
document.querySelectorAll('.main-nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.main-nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const tabName = btn.getAttribute('data-tab-name');
    document.querySelectorAll('.tab-content-panel').forEach(panel => panel.classList.remove('active'));
    document.getElementById(`${tabName}-panel`).classList.add('active');
  });
});

// === Subtab Switching ===
document.querySelectorAll('.sub-nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.sub-nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const subtab = btn.getAttribute('data-subtab');
    document.querySelectorAll('.sub-tab-content').forEach(panel => panel.classList.remove('active'));
    document.getElementById(`${subtab}-subtab`).classList.add('active');
  });
});

// === Countdown ===
function updateCountdown(id, targetDate) {
  const now = new Date();
  const weddingDate = new Date(targetDate);
  const days = Math.max(0, Math.ceil((weddingDate - now) / (1000 * 60 * 60 * 24)));
  const el = document.getElementById(id);
  if (el) el.textContent = days;
}
updateCountdown('countdown-days', '2028-04-05');
updateCountdown('countdown-days-plan', '2028-04-05');
updateCountdown('parents-departure-countdown', '2028-03-31');

// === Checklist Persistence ===
document.querySelectorAll('input[data-persist-id]').forEach(input => {
  const key = input.getAttribute('data-persist-id');
  input.checked = localStorage.getItem(key) === 'true';
  input.addEventListener('change', () => {
    localStorage.setItem(key, input.checked);
  });
});

// === Reset Buttons ===
document.getElementById('reset-wedding-progress')?.addEventListener('click', () => {
  document.querySelectorAll('#checklists-subtab input[data-persist-id]').forEach(input => {
    localStorage.removeItem(input.getAttribute('data-persist-id'));
    input.checked = false;
  });
});
document.getElementById('reset-glowup-progress')?.addEventListener('click', () => {
  document.querySelectorAll('#daily-accountability-section input[data-persist-id]').forEach(input => {
    localStorage.removeItem(input.getAttribute('data-persist-id'));
    input.checked = false;
  });
});
document.getElementById('reset-packing-progress')?.addEventListener('click', () => {
  document.querySelectorAll('#packing-subtab input[data-persist-id]').forEach(input => {
    localStorage.removeItem(input.getAttribute('data-persist-id'));
    input.checked = false;
  });
});

// === Budget Progress Bars ===
function updateBudgetProgress(totalId, paidId, progressId, textId) {
  const total = parseFloat(document.getElementById(totalId)?.textContent.replace('$', '') || '0');
  const paid = parseFloat(document.getElementById(paidId)?.textContent.replace('$', '') || '0');
  const percent = total > 0 ? Math.round((paid / total) * 100) : 0;
  const bar = document.getElementById(progressId);
  const text = document.getElementById(textId);
  if (bar) bar.style.width = `${percent}%`;
  if (text) text.textContent = `${percent}% paid`;
  const innerText = document.getElementById(`${progressId}-text-inner`);
  if (innerText) innerText.textContent = `${percent}%`;
}
updateBudgetProgress('budget-total', 'budget-paid', 'budget-progress', 'budget-progress-text');
updateBudgetProgress('parents-budget-total', 'parents-budget-paid', 'parents-packing-progress', 'parents-packing-progress-text');

// === Accordion Logic ===
document.querySelectorAll('[data-accordion-item]').forEach(item => {
  const trigger = item.querySelector('.accordion-trigger');
  trigger?.addEventListener('click', () => {
    item.classList.toggle('accordion-open');
  });
});
document.getElementById('expand-all-itinerary')?.addEventListener('click', () => {
  document.querySelectorAll('[data-accordion-item]').forEach(item => item.classList.add('accordion-open'));
});
document.getElementById('collapse-all-itinerary')?.addEventListener('click', () => {
  document.querySelectorAll('[data-accordion-item]').forEach(item => item.classList.remove('accordion-open'));
});
