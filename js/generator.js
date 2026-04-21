// ═══════════════════════════════════════════════════
// QR Studio — Generator
// generate() · overlayLogo() · getFinalCanvas()
// ═══════════════════════════════════════════════════

// ── Logo upload ───────────────────────────────────

function bindLogoInput() {
  document.getElementById('logo-input').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (!file) { logoDataURL = null; return; }
    const reader = new FileReader();
    reader.onload = ev => {
      logoDataURL = ev.target.result;
      // Force high error correction when a logo is present
      document.getElementById('qr-ec').value = 'H';
    };
    reader.readAsDataURL(file);
  });
}

// ── Core generation ───────────────────────────────

function generate() {
  const text = buildContent();
  if (!text) {
    // Focus first input of the active tab
    const inputs = document.getElementById('tab-' + currentTab)
      ?.querySelectorAll('input, textarea');
    if (inputs?.length) inputs[0].focus();
    return;
  }

  const size = parseInt(document.getElementById('qr-size').value);
  const ec   = document.getElementById('qr-ec').value;
  const fg   = document.getElementById('qr-fg').value;
  const bg   = document.getElementById('qr-bg').value;

  // Clear previous QR
  const frame = document.getElementById('qr-frame');
  frame.innerHTML = '';
  frame.style.background = bg;

  new QRCode(frame, {
    text,
    width: size,
    height: size,
    colorDark: fg,
    colorLight: bg,
    correctLevel: QRCode.CorrectLevel[ec],
  });

  // Overlay logo after QR renders
  if (logoDataURL) {
    setTimeout(() => overlayLogo(frame, size, bg), 100);
  }

  // Show result panel
  const result = document.getElementById('qr-result');
  result.style.display = 'flex';
  document.getElementById('qr-preview-text').textContent =
    text.length > 80 ? text.slice(0, 80) + '…' : text;

  // Save to history
  history.unshift({ text, size, ec, fg, bg, logo: logoDataURL, time: new Date() });
  if (history.length > 10) history.pop();
}

// ── Logo overlay (DOM layer) ──────────────────────

function overlayLogo(frame, size, bg) {
  const existing = frame.querySelector('.qr-logo');
  if (existing) existing.remove();

  const ls = Math.round(size * 0.2);
  const wrap = document.createElement('div');
  wrap.className = 'qr-logo';
  wrap.style.cssText = `
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: ${ls}px; height: ${ls}px;
    border-radius: 7px; overflow: hidden;
    background: ${bg}; padding: 3px;
  `;
  const img = document.createElement('img');
  img.src = logoDataURL;
  img.style.cssText = 'width:100%;height:100%;object-fit:contain;border-radius:5px;';
  wrap.appendChild(img);
  frame.appendChild(wrap);
}

// ── Canvas composition (for download) ────────────

function getFinalCanvas(cb) {
  const canvas = document.getElementById('qr-frame').querySelector('canvas');
  if (!canvas) { cb(null); return; }
  if (!logoDataURL) { cb(canvas); return; }

  const size = canvas.width;
  const out  = document.createElement('canvas');
  out.width  = size;
  out.height = size;
  const ctx  = out.getContext('2d');
  ctx.drawImage(canvas, 0, 0);

  const img = new Image();
  img.onload = () => {
    const ls  = Math.round(size * 0.2);
    const x   = (size - ls) / 2;
    const y   = (size - ls) / 2;
    const bg  = document.getElementById('qr-bg').value;
    const pad = 4;

    ctx.fillStyle = bg;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(x - pad, y - pad, ls + pad * 2, ls + pad * 2, 6);
    } else {
      ctx.rect(x - pad, y - pad, ls + pad * 2, ls + pad * 2);
    }
    ctx.fill();
    ctx.drawImage(img, x, y, ls, ls);
    cb(out);
  };
  img.src = logoDataURL;
}

// ── Bind generate button & keyboard shortcut ─────

function bindGenerator() {
  document.getElementById('gen-btn').addEventListener('click', generate);

  ['in-url', 'in-text'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('keydown', e => {
        if (e.key === 'Enter' && e.ctrlKey) generate();
      });
    }
  });
}
