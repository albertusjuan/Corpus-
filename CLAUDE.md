# Corpus Project — Portfolio Website

## What this is
A single-page portfolio/agency website for **Corpus Project** — a web architecture studio. Built with **Next.js 16** (App Router), **React 19**, **Framer Motion 12**, and **Lucide React**. No Tailwind; all styling is done via CSS custom properties in `globals.css` and inline `style` props.

## Design Language: Monochrome Sophistication
The site uses a **Sophisticated Monochrome** aesthetic on a pure black background:
- **Monochrome base**: `#000000` bg, `#ffffff` text, `#0a0a0a` surface, `#141414` surface-alt
- **Sharp corners**: `border-radius: 0px` (intentional)
- **Typography**: **Space Grotesk** (`--font-display`) for headings; **Inter** (`--font-body`) for body
- **Layout**: Fixed 60px left sidebar (`GuidingElement`) offsets the main content.

## Architecture: Single-Page (SPA)
The website is a unified single-page experience. Navigation links in the `Header` use anchor tags (`#work`, `#services`, etc.) to scroll to respective sections on the homepage. Redundant separate page files and unused components have been removed to maintain a lean codebase.

## Motion Rules
- All scroll-driven entrance animations use `whileInView` with `once: true`
- Hero uses `animate` (not `whileInView`) + scroll-linked `useTransform` for opacity/scale
- Smooth scroll behavior is enabled via CSS (`scroll-behavior: smooth`)

## File Map
```
app/
  globals.css       ← All CSS: tokens, layout, section padding, utilities
  layout.tsx        ← Fonts (Space Grotesk + Inter), metadata, global layout with Header/Footer
  page.tsx          ← Single-page content: Hero → About → Services → Work → Pricing → Contact
components/
  Header.tsx        ← Fixed nav with anchor links, left offset 60px
  Footer.tsx        ← Minimal footer
  GuidingElement.tsx← Fixed left sidebar with scroll progress indicator
  RotatingGlobe.tsx ← 3D CSS globe in hero
lib/
  data.ts           ← Static data: products[] and portfolio[]
```

## Key CSS Classes
- `.section` — Optimized vertical padding (`var(--space-10)` desktop, `var(--space-8)` mobile)
- `.container` / `.container--narrow` — Max-width wrappers
- `.btn` / `.btn--primary` — Sophisticated monochrome buttons
- `.card` — Surface cards with hover effects

## Do Not
- Do not add border-radius — zero radius is intentional
- Do not add Tailwind — this project uses CSS custom properties exclusively
- Do not create separate page files for sections already present on the homepage
- Do not use `Link` for internal section anchors; use standard `<a>` tags with `href="#section-id"`
