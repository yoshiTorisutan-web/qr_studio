// ═══════════════════════════════════════════════════
// QR Studio — Downloads & Clipboard
// PNG · JPG · SVG · Copy content
// ═══════════════════════════════════════════════════

function bindDownloads() {

  // ── PNG ──────────────────────────────────────────
  document.getElementById('dl-png').addEventListener('click', () => {
    getFinalCanvas(c => {
      if (!c) return;
      const a = document.createElement('a');
      a.download = 'qrcode.png';
      a.href = c.toDataURL('image/png');
      a.click();
    });
  });

  // ── JPG ──────────────────────────────────────────
  document.getElementById('dl-jpg').addEventListener('click', () => {
    getFinalCanvas(c => {
      if (!c) return;
      const a = document.createElement('a');
      a.download = 'qrcode.jpg';
      a.href = c.toDataURL('image/jpeg', 0.95);
      a.click();
    });
  });

  // ── SVG (wraps canvas as embedded image) ─────────
  document.getElementById('dl-svg').addEventListener('click', () => {
    getFinalCanvas(c => {
      if (!c) return;
      const size = c.width;
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
  <image href="${c.toDataURL()}" width="${size}" height="${size}"/>
</svg>`;
      const a = document.createElement('a');
      a.download = 'qrcode.svg';
      a.href = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
      a.click();
    });
  });

  // ── Copy content to clipboard ────────────────────
  document.getElementById('copy-content').addEventListener('click', function () {
    const text = buildContent();
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      this.textContent = '✓ Copié !';
      setTimeout(() => { this.textContent = 'Copier le contenu'; }, 1800);
    });
  });
}
