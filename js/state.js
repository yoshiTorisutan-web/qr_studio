// ═══════════════════════════════════════════════════
// QR Studio — State & Tab Switching
// ═══════════════════════════════════════════════════
'use strict';

// ── Global State ──────────────────────────────────

let currentTab = 'url';
let history = [];
let logoDataURL = null;

// ── Tab Switching ─────────────────────────────────

const CONTENT_TABS = ['url', 'text', 'wifi', 'vcard'];

function switchTab(tab) {
  currentTab = tab;

  // Update tab button styles
  document.querySelectorAll('.tab').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === tab);
  });

  // Show/hide content panels
  CONTENT_TABS.forEach(t => {
    const el = document.getElementById('tab-' + t);
    if (el) el.style.display = t === tab ? '' : 'none';
  });
  document.getElementById('tab-history').style.display = tab === 'history' ? '' : 'none';

  // Show/hide options + generate button
  const isHistory = tab === 'history';
  document.getElementById('options-panel').style.display = isHistory ? 'none' : '';
  document.getElementById('gen-btn').style.display = isHistory ? 'none' : '';
  document.getElementById('qr-result').style.display = 'none';

  if (isHistory) renderHistory();
}

function bindTabs() {
  document.querySelectorAll('.tab').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });
}
