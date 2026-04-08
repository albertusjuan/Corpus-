# Corpus Project — Portfolio Website

## What this is
A single-page portfolio/agency website for **Corpus Project** — a web architecture studio. Built with **Next.js 16** (App Router), **React 19**, **Framer Motion 12**, and **Lucide React**. No Tailwind; all styling is done via CSS custom properties in `globals.css` and inline `style` props.

## Design Language: Kinetic Brutalism
The site uses a **Kinetic Brutalism** aesthetic on a pure black background:
- **Monochrome base**: `#000000` bg, `#ffffff` text, `#111111` surface, `#1a1a1a` surface-alt
- **Accent**: `--color-brutal: #DFFF00` — used sparingly on hover/active states, card borders (featured), button fills, and the mobile progress bar
- **Sharp corners**: `border-radius: 0px` on everything (intentional — do not change)
- **Typography**: **Space Grotesk** (`--font-display`) for headings; **Inter** (`--font-body`) for body; **JetBrains Mono** (`--font-mono`) for labels, tags, and mono UI
- **Layout**: Fixed 60px left sidebar (`GuidingElement`) offsets the main content on desktop; hidden on mobile

## Architecture: Single-Page (SPA)
The website is a unified single-page experience. There is **no Header component** — navigation is handled via smooth-scroll buttons inside the Hero. Sections are anchored with `id` attributes (`#about`, `#services`, `#work`, `#pricing`, `#contact`).

## Motion Rules
- All scroll-driven entrance animations use `whileInView` with `once: true`
- Hero uses `animate` (not `whileInView`) + scroll-linked `useTransform` for opacity/scale fade-out
- Shared animation presets: `fadeUp` (opacity + y) and `staggerContainer` (stagger children by 0.1s)
- Smooth scroll behavior is enabled via CSS (`scroll-behavior: smooth`)
- `@media (prefers-reduced-motion: reduce)` disables marquee and collapses transitions

## File Map
```
app/
  globals.css       ← All CSS: tokens, reset, layout, components, utilities, responsive
  layout.tsx        ← Fonts (Space Grotesk + Inter + JetBrains Mono), metadata, Footer
  page.tsx          ← Single-page content: Hero → Marquee → About → Services → Work → Stats → Pricing → Contact
components/
  Footer.tsx        ← Minimal centered footer with social links
  GuidingElement.tsx← Fixed left sidebar (desktop) / top progress bar (mobile) — scroll progress indicator
  RotatingGlobe.tsx ← 3D CSS globe rendered in the hero right column
lib/
  data.ts           ← Static data: products[] (3 pricing tiers) and portfolio[] (4 work items)
```

## Page Sections (in order)
1. **Hero** — Full-height grid: headline copy left, RotatingGlobe right. Scroll-fade on scroll.
2. **Marquee strip** — Auto-scrolling ticker of capabilities (`aria-hidden`)
3. **About** — Centered statement block on `--color-surface` bg
4. **Services** — 3-column card grid with ghost index numbers (`grid-3`)
5. **Work** — 2-column portfolio grid with hover overlay (`grid-2`)
6. **Stats strip** — 4-column grid of key numbers (2×2 on mobile)
7. **Pricing** — 3 tiers. **Desktop**: `grid-3`. **Mobile**: horizontal card swiper with prev/next buttons and dot indicators
8. **Contact** — 2-column layout: info left, form right

## Key CSS Classes
- `.section` — Vertical padding (`var(--space-10)` desktop, `var(--space-6)` mobile) + border-top/bottom
- `.container` / `.container--narrow` — Max-width wrappers (1400px / 800px)
- `.btn` / `.btn--primary` — Brutalist buttons with `#DFFF00` fill-sweep on hover
- `.card` — Surface cards with `#DFFF00` top-border sweep and lift on hover
- `.grid-2` / `.grid-3` — 2 and 3-column grids; collapse to 1-column at ≤1024px
- `.hero-grid` — Two-column hero layout; stacks to single column at ≤1024px
- `.stats-grid` — 4-column; becomes 2×2 at ≤1024px
- `.contact-grid` — 2-column; stacks at ≤1024px
- `.pricing-desktop` — Shown on desktop (≥1024px), hidden on mobile
- `.pricing-swiper` — Hidden on desktop, shown on mobile (horizontal scroll-snap carousel)
- `.ghost-num` — Outlined decorative index number on service cards
- `.mono-tag` — Monospace bordered tag used on portfolio items
- `.marquee-track` / `.marquee-inner` — CSS-animated horizontal ticker

## Pricing Swiper (Mobile)
The pricing section renders two layouts controlled by CSS:
- `pricing-desktop` (`.grid-3`) — visible only on desktop
- `pricing-swiper` — visible only on mobile (≤1024px)

The swiper uses CSS `scroll-snap-type: x mandatory` with `flex: 0 0 100%` cards. Prev/Next buttons call `scrollToCard(index)` which uses `scrollTo({ behavior: 'smooth' })`. An `onScroll` handler syncs the active dot indicator. State lives in `pricingIndex` (useState) and `pricingRef` (useRef) in `page.tsx`.

## Responsive Breakpoints
- `≤1024px` — Removes sidebar offset, hides `GuidingElement`, shows mobile progress bar, stacks all grids to 1-column, enables pricing swiper
- `≤768px` — Tighter card/form padding, smaller globe, reduced section vertical rhythm, smaller type scale overrides

## Do Not
- Do not add border-radius — zero radius is intentional everywhere
- Do not add Tailwind — this project uses CSS custom properties exclusively
- Do not create separate page files for sections already present on the homepage
- Do not use `Link` for internal section anchors; use standard `<a>` tags with `href="#section-id"` or `scrollIntoView`
- Do not add a Header component — there is intentionally no top navigation
