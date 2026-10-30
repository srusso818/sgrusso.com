# SGRusso.com — Architectural Portfolio & Executive Dossier

Personal portfolio and print-ready executive résumé website for **Stephen G. Russo** (*Senior Systems Engineer, Infrastructure Leader & Enterprise AI Architect*), engineered for zero-dependency deployment on **GitHub Pages** at `https://sgrusso.com`.

---

## Why Zero-Build Native Architecture?
For a Systems Engineer & Architect deploying to GitHub Pages, a zero-build semantic **HTML5 + OKLCH Modern CSS + Vanilla ES6** architecture outclasses heavy SPA frameworks:
- **Zero Supply-Chain Drift:** No `node_modules`, broken CI actions, or framework deprecations years later. Commit to `main` and go live in seconds.
- **Instant Telemetry & Sub-50ms Interactive Paint:** Zero client hydration overhead, clean JSON-LD structured data, and full keyboard accessibility (`⌘K` / `Ctrl+K` command palette).
- **Publication-Grade Print Engine (`resume.html`):** Built-in `@media print` stylesheet turns `resume.html` into an ATS-clean PDF via **Print → Save as PDF** with one-click switching between *Comprehensive* and *Concise 2-Page* views.

---

## Design Lineage
- **`DESIGN.md` (`VoltAgent/awesome-design-md`):** Root-level design system documenting OKLCH tokens, 3-voice typography (`IBM Plex Sans` + `Newsreader` + `IBM Plex Mono`), and spatial rails.
- **`pbakaus/impeccable` Compliance:** Tinted OKLCH slate/stone neutrals (never `#000000` or harsh `#ffffff`), zero purple-to-blue gradients, zero nested rounded-card soup, and single intentional copper/amber semantic accent.
- **`nutlope/hallmark` Macrostructure (`asymmetric-technical-dossier`):** Asymmetric 7:5 blueprint hero anchored to a tabular specification ledger, interactive H100 AI system topology inspector, and hairline-ruled dossier rows.
- **`rmvoss.com` Narrative Clarity:** Outcome-driven enterprise case studies, sovereign GPU/AI specialization, scannable domain matrix, and direct contact dispatch.

---

## Repository Structure
```text
├── index.html          # Main architectural portfolio & interactive dossier
├── resume.html         # Screen + Print/PDF executive résumé (Concise & Comprehensive modes)
├── DESIGN.md           # Design system specification
├── CNAME               # GitHub Pages custom domain (sgrusso.com)
├── .nojekyll           # Bypasses Jekyll processing on GitHub Pages
├── .gitignore          # Excludes 'ref assets/' so private street addresses stay local
├── css/
│   ├── tokens.css      # OKLCH Slate Dark & Warm Paper Light design tokens
│   ├── styles.css      # Structural layout, AI topology, case ledger, ⌘K modal
│   └── resume.css      # Executive résumé & @media print rules
├── js/
│   ├── data.js         # Centralized editorialized content (AI layers, cases, skills, career)
│   └── main.js         # Theme toggle, topology inspector, filters, copy & ⌘K controller
└── assets/
    └── favicon.svg     # Adaptive dark/light SGR monogram
```

---

## Deploying to GitHub Pages (`SGRusso.com`)

1. Initialize and push to your GitHub repository:
   ```powershell
   git init
   git add .
   git commit -m "Initial architectural portfolio release for SGRusso.com"
   git branch -M main
   git remote add origin https://github.com/srusso818/sgrusso.com.git
   git push -u origin main
   ```
2. In GitHub: **Settings → Pages → Build and deployment**:
   - **Source:** `Deploy from a branch`
   - **Branch:** `main` / `/ (root)`
   - **Custom domain:** `sgrusso.com` (already pre-configured via `CNAME`) and check **Enforce HTTPS**.
3. At your DNS provider for `sgrusso.com`:
   - `A` records (`@`): `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `AAAA` records (`@`): `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - `CNAME` record (`www`): `srusso818.github.io`

### Optional: Silent Background Contact Form POST
Out of the box, the dispatch form formats your visitor's inquiry, copies a backup to the clipboard, and opens their mail client addressed to `stephen@sgrusso.com`. If you prefer silent background form submissions without a mail client, paste a free [Formspree](https://formspree.io) endpoint URL into `data-endpoint=""` on `#dispatch-form` in `index.html`.

