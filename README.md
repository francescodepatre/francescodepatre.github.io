# Francesco De Patre — Terminal Portfolio

> A retro hacker-terminal personal portfolio. Phosphor green on black, CRT scanlines, VT323 type, amber accents.

---

## Preview

```
╔══════════════════════════════════════════════════╗
║  BIOS v2.4.1 — UNIPR SYSTEMS                     ║
║  CPU: ARM Cortex-M7 @ 480MHz ... OK              ║
║  RAM: 512MB ECC ... OK                           ║
║  CAN Bus interface ... READY                     ║
║  ████████████████████████ 100%                   ║
║  Welcome, operator. Type help to begin.          ║
╚══════════════════════════════════════════════════╝
```

---

## Structure

```
portfolio/
├── index.html              # Markup — semantic HTML5
├── css/
│   └── styles.css          # All styles, CRT effects, layout, responsive
├── js/
│   └── main.js             # Boot sequence, clock, uptime, nav behaviour
├── favicon.ico             # Multi-size ICO (16×16 + 32×32)
├── favicon.svg             # Vector favicon (modern browsers)
├── favicon-16x16.png       # PNG favicon 16×16
├── favicon-32x32.png       # PNG favicon 32×32
├── apple-touch-icon.png    # iOS home screen icon (160×160)
└── site.webmanifest        # PWA manifest
```

---

## Features

| Feature | Detail |
|---|---|
| **CRT scanlines** | `repeating-linear-gradient` overlay at 3 px pitch |
| **Screen vignette** | Radial gradient simulating monitor curvature |
| **Flicker** | Subtle opacity animation on an 8 s irregular cycle |
| **Film grain** | SVG `feTurbulence` noise at 2.5 % opacity |
| **Boot sequence** | Staggered BIOS-style lines on page load |
| **Live clock** | Real-time HH:MM:SS in the status bar |
| **Session uptime** | Elapsed time counter since first load |
| **Cursor blink** | `█` and `_` variants via CSS `::after` + keyframes |
| **Hover FX** | Glow, `translateX`, top-edge scan sweep on cards |
| **Active nav** | Scroll-spy highlights current section link |
| **Responsive** | Single-column below 768 px, hamburger menu |

---

## Design tokens

```css
--green:         #00ff41   /* phosphor green — primary */
--green-dim:     #00cc33   /* body text, secondary elements */
--green-dark:    #004d14   /* status bar background */
--amber:         #ffb000   /* accents, dates, prompt symbols */
--bg:            #030a06   /* page background */
--bg2:           #060f08   /* terminal window background */
--bg3:           #0a160c   /* titlebar, deepest surface */
```

---

## Typography

| Role | Font | Source |
|---|---|---|
| Display / headings | **VT323** | Google Fonts |
| Body / code | **Fira Code** (300–500) | Google Fonts |
| Fallback | Share Tech Mono → monospace | System |

---

## Deploy

The project is a **zero-dependency static site** — no build step, no bundler.

### GitHub Pages

```bash
git init
git add .
git commit -m "init: terminal portfolio"
gh repo create francescodepatre.github.io --public --source=. --push
# Enable Pages → Settings → Pages → Branch: main / root
```

### Netlify (drag & drop)

Drop the `portfolio/` folder on [netlify.com/drop](https://app.netlify.com/drop) — live in seconds.

### Vercel

```bash
npx vercel --prod
# Select "Other" framework, root directory = portfolio/
```

---

## Customisation

**Add a project card** — copy one `<a class="work-card">` block in `index.html` and update the number, category, title, description and `href`.

**Change accent colour** — edit `--amber` in `:root` inside `styles.css`. Everything that uses amber (dates, prompts, cursor line) updates automatically.

**Disable boot screen** — remove the `#boot-screen` block from `index.html` and delete the `initBoot()` IIFE in `main.js`.

**Reduce scanline intensity** — lower the `rgba(0,0,0,0.18)` alpha values inside `body::before` in `styles.css`.

---

## Browser support

Chrome 90+, Firefox 90+, Safari 14+, Edge 90+. Degrades gracefully on older browsers (scanlines and glow simply absent).

---

## License

MIT — free to use, adapt, and redistribute. Attribution appreciated but not required.

---

*Built with 0 frameworks, 0 dependencies, and a lot of phosphor.*
