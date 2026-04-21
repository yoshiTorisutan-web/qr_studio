// ═══════════════════════════════════════════════════
// QR Studio — Content Builder
// Builds the QR string for each tab type
// ═══════════════════════════════════════════════════

function buildContent() {
  switch (currentTab) {

    case 'url':
      return document.getElementById('in-url').value.trim();

    case 'text':
      return document.getElementById('in-text').value.trim();

    case 'wifi': {
      const ssid = document.getElementById('in-ssid').value.trim();
      if (!ssid) return '';
      const pass = document.getElementById('in-wpass').value;
      const enc  = document.getElementById('in-wenc').value;
      return `WIFI:T:${enc};S:${ssid};P:${pass};;`;
    }

    case 'vcard': {
      const fn = document.getElementById('in-vfn').value.trim();
      const ln = document.getElementById('in-vln').value.trim();
      if (!fn && !ln) return '';
      const tel   = document.getElementById('in-vtel').value.trim();
      const email = document.getElementById('in-vemail').value.trim();
      const org   = document.getElementById('in-vorg').value.trim();
      const web   = document.getElementById('in-vweb').value.trim();
      return [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${ln};${fn}`,
        `FN:${fn} ${ln}`,
        tel   ? `TEL:${tel}`     : '',
        email ? `EMAIL:${email}` : '',
        org   ? `ORG:${org}`     : '',
        web   ? `URL:${web}`     : '',
        'END:VCARD',
      ].filter(Boolean).join('\n');
    }

    default:
      return '';
  }
}
