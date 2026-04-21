// ═══════════════════════════════════════════════════
// QR Studio — Options Panel
// Size slider · Error correction · Color presets
// ═══════════════════════════════════════════════════

function bindOptions() {

  // ── Size slider ──────────────────────────────────
  document.getElementById('qr-size').addEventListener('input', function () {
    document.getElementById('size-out').textContent = this.value;
  });

  // ── Color presets ────────────────────────────────
  document.querySelectorAll('.preset').forEach(dot => {
    dot.addEventListener('click', function () {
      document.querySelectorAll('.preset').forEach(d => d.classList.remove('selected'));
      this.classList.add('selected');
      document.getElementById('qr-fg').value = this.dataset.fg;
      document.getElementById('qr-bg').value = this.dataset.bg;
    });
  });
}
