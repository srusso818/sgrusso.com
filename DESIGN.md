# DESIGN.md — SGRusso.com Design System

/* Hallmark · macrostructure: asymmetric-technical-dossier */
/* Impeccable · anti-slop compliant: OKLCH tinted neutrals, multi-voice typography, zero nested cards */

## 1. Brand & Product Positioning
- **Subject:** Stephen G. Russo — Senior Systems Engineer, Infrastructure Leader & Enterprise AI Architect
- **Domain:** `https://sgrusso.com`
- **Audience:** CIOs, Infrastructure Directors, VP of Engineering, Enterprise Hiring Managers, and Principal Systems Architects
- **Design Archetype:** *Precision Technical Editorial* — Part datacenter architecture blueprint, part Stripe Press / Linear engineering monograph. Built to signal 20+ years of operational rigor across $1T+ AUM institutional finance and sovereign public-sector infrastructure.

---

## 2. Anti-Pattern Guardrails (`pbakaus/impeccable` & `nutlope/hallmark`)
1. **No Default/Overused Fonts:** Never use `Inter`, `Roboto`, `Arial`, or single-font sans monotony.
2. **No Purple-to-Blue Gradients or Neon Glows:** Zero synthetic SaaS gradients, glowing cyan blobs, or decorative blurred orbs.
3. **No Pure `#000000` or Raw Gray Neutrals:** Every surface, border, and ink token is derived in **OKLCH** with subtle slate chroma (dark mode) or warm archival stone chroma (light mode).
4. **No Centered Hero Cliché:** Avoid centered pill eyebrow + giant gradient title + twin pill buttons. Use an asymmetric two-column blueprint header anchored to a structural specification ledger.
5. **No Cards-Inside-Cards or Icon-Tile Grids:** Separate content via 1px architectural hairlines, tabular index numbers (`01`–`08`), and typographic hierarchy rather than recursively nested rounded boxes or decorative icon tiles.
6. **Single Semantic Accent Rule:** Reserve the primary copper/amber accent strictly for interactive triggers, active states, and architectural callouts; reserve telemetry emerald strictly for operational status indicators.

---

## 3. Typography System
Three intentional voices with distinct structural roles:

| Role | Family | Weights | Usage |
| :--- | :--- | :--- | :--- |
| **Structural UI & Headings** | `IBM Plex Sans` | 400, 500, 600 | Primary body prose, section headers, architectural labels, case study titles |
| **Editorial Display Accent** | `Newsreader` | 400, 400i, 500 | Hero thesis statement contrast, executive pull-phrases, print résumé masthead |
| **Technical Telemetry & Specs** | `IBM Plex Mono` | 400, 500 | Coordinates, index numbers, stack tags, dates, metrics (`tabular-nums`), CLI/shortcut hints |

### Type Scale (Desktop Baseline)
- `--text-xs`: `0.75rem` (12px) — Monospace metadata, ledger keys, shortcut badges (`letter-spacing: 0.06em`)
- `--text-sm`: `0.875rem` (14px) — Secondary descriptions, table cells, navigation items
- `--text-base`: `1rem` (16px) — Primary editorial prose (`line-height: 1.65`, max measure `66ch`)
- `--text-lg`: `1.1875rem` (19px) — Lead paragraphs, role titles
- `--text-xl`: `1.5rem` (24px) — Case study titles, subsystem headings
- `--text-2xl`: `2.125rem` (34px) — Section titles (`letter-spacing: -0.02em`)
- `--text-display`: `clamp(2.5rem, 4.4vw, 3.85rem)` — Hero headline (`line-height: 1.06`, `letter-spacing: -0.03em`)

---

## 4. Color Tokens (OKLCH Tinted Neutrals)

### Dark Theme (Default — *Datacenter Slate*)
- `--bg-canvas`: `oklch(0.155 0.012 250)` — Deep slate-obsidian base
- `--bg-surface`: `oklch(0.188 0.014 250)` — Elevated dossier surface
- `--bg-recessed`: `oklch(0.135 0.011 250)` — Diagram canvas & code/telemetry wells
- `--bg-hover`: `oklch(0.222 0.016 250)` — Interactive row hover
- `--border-subtle`: `oklch(0.255 0.015 250)` — Architectural grid hairlines
- `--border-strong`: `oklch(0.340 0.018 250)` — Active frame borders
- `--ink-primary`: `oklch(0.955 0.006 250)` — Primary readable ink
- `--ink-secondary`: `oklch(0.750 0.012 250)` — Supporting prose ink
- `--ink-muted`: `oklch(0.585 0.014 250)` — Timestamps, indices, muted captions
- `--accent-primary`: `oklch(0.760 0.135 65)` — Burnished Signal Amber/Copper
- `--accent-subtle`: `oklch(0.760 0.135 65 / 0.12)` — Active node tint
- `--status-ok`: `oklch(0.730 0.145 155)` — Operational telemetry emerald

### Light Theme (*Warm Archival Vellum*)
- `--bg-canvas`: `oklch(0.972 0.007 85)` — Warm stone paper
- `--bg-surface`: `oklch(0.990 0.004 85)` — Crisp elevated sheet
- `--bg-recessed`: `oklch(0.945 0.009 85)` — Diagram well
- `--bg-hover`: `oklch(0.935 0.010 85)` — Row hover
- `--border-subtle`: `oklch(0.865 0.010 85)` — Structural hairlines
- `--border-strong`: `oklch(0.740 0.014 85)` — Active borders
- `--ink-primary`: `oklch(0.185 0.015 250)` — Deep charcoal-slate ink
- `--ink-secondary`: `oklch(0.375 0.015 250)` — Supporting prose ink
- `--ink-muted`: `oklch(0.515 0.014 250)` — Metadata & indices
- `--accent-primary`: `oklch(0.500 0.140 52)` — Architectural Copper
- `--accent-subtle`: `oklch(0.500 0.140 52 / 0.10)` — Active tint
- `--status-ok`: `oklch(0.490 0.125 155)` — Forest telemetry

---

## 5. Spatial Architecture & Macrostructure
- **Container Max Width:** `1240px` bounded by continuous vertical 1px structural rails on desktop viewports (`>= 1024px`), evoking an engineering specification sheet.
- **Baseline Rhythm:** Strict `4px` / `8px` multiples (`8, 12, 16, 24, 32, 48, 64, 96px`).
- **Section Cadence:**
  - `00 // HEADER & HERO` — Asymmetric 7:5 split (Editorial thesis left; Specification Ledger right).
  - `01 // FLAGSHIP ARCHITECTURE` — GEORGE On-Premises Enterprise AI Platform with interactive 4-layer SVG system topology inspector.
  - `02 // SELECTED CASE STUDIES` — Filterable architectural ledger (`01`–`08`) with expandable engineering deep-dives (Context → Architecture → Operational Outcome).
  - `03 // CAPABILITY MATRIX` — 6-pillar hairline-divided domain specification table.
  - `04 // CAREER LEDGER` — Left-anchored chronological index spanning 2004–Present across Northwest Arkansas & NYC/Greenwich institutional finance, followed by credentials.
  - `05 // DIRECT DISPATCH` — Clean two-column contact & printable executive résumé gateway.

