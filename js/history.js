// ═══════════════════════════════════════════════════
// QR Studio — History
// Render list · Click to reload · Thumbnail gen
// ═══════════════════════════════════════════════════

function renderHistory() {
  const list = document.getElementById('history-list');

  if (!history.length) {
    list.innerHTML = '<p class="history-empty">Aucun QR code généré pour l\'instant.</p>';
    return;
  }

  list.innerHTML = '';

  history.forEach(item => {
    const el = document.createElement('div');
    el.className = 'history-item';

    // Relative time label
    const mins = Math.round((Date.now() - item.time) / 60000);
    const timeStr = mins < 1 ? 'à l\'instant' : `il y a ${mins} min`;

    // Thumbnail canvas
    const thumb = document.createElement('canvas');
    thumb.width = 38;
    thumb.height = 38;
    thumb.className = 'history-thumb';

    const labelEl = document.createElement('span');
    labelEl.className = 'history-label';
    labelEl.textContent = item.text.length > 55 ? item.text.slice(0, 55) + '…' : item.text;

    const metaEl = document.createElement('span');
    metaEl.className = 'history-meta';
    metaEl.textContent = timeStr;

    el.appendChild(thumb);
    el.appendChild(labelEl);
    el.appendChild(metaEl);

    // Click: restore item and regenerate
    el.addEventListener('click', () => {
      switchTab('url');
      document.getElementById('in-url').value = item.text;
      document.getElementById('qr-size').value = item.size;
      document.getElementById('size-out').textContent = item.size;
      document.getElementById('qr-ec').value = item.ec;
      document.getElementById('qr-fg').value = item.fg;
      document.getElementById('qr-bg').value = item.bg;
      logoDataURL = item.logo || null;
      generate();
    });

    list.appendChild(el);

    // Render thumbnail offscreen
    const tmpDiv = document.createElement('div');
    tmpDiv.style.cssText = 'position:absolute;visibility:hidden;pointer-events:none;top:-9999px;';
    document.body.appendChild(tmpDiv);

    new QRCode(tmpDiv, {
      text: item.text,
      width: 38,
      height: 38,
      colorDark: item.fg,
      colorLight: item.bg,
      correctLevel: QRCode.CorrectLevel.L,
    });

    setTimeout(() => {
      const c = tmpDiv.querySelector('canvas');
      if (c) {
        const ctx = thumb.getContext('2d');
        ctx.drawImage(c, 0, 0, 38, 38);
      }
      document.body.removeChild(tmpDiv);
    }, 60);
  });
}
