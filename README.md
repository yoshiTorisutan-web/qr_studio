# 🔲 QR Studio

> Créateur de QR codes moderne, entièrement en HTML/CSS/JS vanilla. Aucune dépendance back-end, aucune installation — ouvrez simplement `index.html` dans un navigateur.

---

## ✨ Fonctionnalités

| Fonctionnalité | Détail |
|---|---|
| 🔗 **URL** | Encodez n'importe quelle adresse web |
| 📝 **Texte libre** | Messages, adresses, numéros de téléphone… |
| 📶 **Wi-Fi** | Connexion automatique au scan (WPA/WEP/ouvert) |
| 👤 **Contact (vCard)** | Prénom, nom, téléphone, email, organisation, site |
| 🎨 **Palettes prédéfinies** | 8 thèmes en un clic |
| 🖌️ **Couleurs libres** | Sélecteurs couleur pour QR et fond |
| 🖼️ **Logo central** | Incrustez votre logo au centre du QR code |
| 📐 **Taille ajustable** | De 128 px à 400 px via slider |
| 🛡️ **Correction d'erreur** | Niveaux L / M / Q / H |
| ⬇️ **Export PNG / JPG / SVG** | Avec logo composité |
| 📋 **Copier le contenu** | Copie le texte encodé dans le presse-papier |
| 🕐 **Historique** | 10 derniers QR codes avec miniature et rechargement |

---

## 🚀 Utilisation

```bash
# Aucune installation requise
# Clonez ou téléchargez le dossier, puis :
open index.html
# ou double-cliquez simplement sur le fichier
```

> ✅ Compatible avec tous les navigateurs modernes (Chrome, Firefox, Safari, Edge).

---

## 🗂️ Structure du projet

```
qr-studio/
├── index.html   ← Application complète (HTML + CSS + JS)
└── README.md    ← Ce fichier
```

L'application tient dans **un seul fichier** `index.html`. La seule dépendance externe est la bibliothèque [qrcode.js](https://github.com/davidshimjs/qrcodejs), chargée via CDN :

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
```

---

## 🧩 Architecture du code

```
index.html
├── <style>           → Design system (variables CSS, composants)
├── HTML structure
│   ├── .tabs         → Sélecteur d'onglets (URL / Texte / Wi-Fi / Contact / Historique)
│   ├── #tab-*        → Panneaux de formulaire par type
│   ├── #options-panel → Taille, correction d'erreur, couleurs, logo
│   └── #qr-result    → Affichage du QR généré + boutons export
└── <script>
    ├── Tab switching  → Gestion des onglets
    ├── buildContent() → Construit la chaîne encodée selon le type actif
    ├── generate()     → Appelle QRCode.js et affiche le résultat
    ├── overlayLogo()  → Composite le logo sur le canvas
    ├── getFinalCanvas() → Fusionne QR + logo pour l'export
    ├── dl-png/jpg/svg → Téléchargement dans les 3 formats
    └── renderHistory() → Affiche l'historique avec miniatures
```

---

## 📦 Formats d'export

| Format | Usage recommandé |
|---|---|
| **PNG** | Web, réseaux sociaux, impression numérique |
| **JPG** | Partage rapide, email |
| **SVG** | Impression haute qualité, mise à l'échelle infinie |

---

## 🔧 Personnalisation

### Changer la taille maximale
Dans `index.html`, modifiez l'attribut `max` du slider :
```html
<input type="range" id="qr-size" min="128" max="600" step="8" value="220" />
```

### Ajouter une couleur prédéfinie
Ajoutez un élément dans la section `.presets` :
```html
<div class="preset" style="background:#your-color;"
     data-fg="#your-fg" data-bg="#your-bg" title="Mon thème"></div>
```

### Augmenter la capacité de l'historique
Dans le script, changez la limite :
```javascript
if (history.length > 20) history.pop(); // au lieu de 10
```

---

## 📋 Formats QR générés

### Wi-Fi
```
WIFI:T:WPA;S:NomDuReseau;P:MotDePasse;;
```

### vCard
```
BEGIN:VCARD
VERSION:3.0
N:Dupont;Jean
FN:Jean Dupont
TEL:+33 6 00 00 00 00
EMAIL:jean@exemple.com
ORG:Ma Société
URL:https://exemple.com
END:VCARD
```

---

## 🛠️ Technologies

- **HTML5** — Structure et sémantique
- **CSS3** — Variables CSS, Grid, Flexbox, transitions
- **JavaScript ES6+** — Modules, async/await, Canvas API, Clipboard API
- **[qrcode.js](https://github.com/davidshimjs/qrcodejs)** — Génération QR (via CDN)

---

## 📄 Licence

MIT — libre d'utilisation, modification et distribution.

---

> 💡 **Astuce** : Utilisez `Ctrl+Entrée` dans les champs URL et Texte pour générer rapidement sans cliquer sur le bouton.
