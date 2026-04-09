# Corpus Project - Portfolio Website

## What this is
A single-page portfolio and agency website for **Corpus Project**, a web architecture studio. The app is built with **Next.js 16** using the **App Router**, **React 19**, **Framer Motion 12**, **Lucide React**, and plain CSS via `app/globals.css`. There is no Tailwind in this project.

The current homepage is both a marketing page and a lightweight lead-capture flow. Users can browse services and pricing, choose a package, and submit their project details through the Contact section. The submitted request is then sent directly to Corpus Project by server-side email delivery.

## Core design language
The site uses a **Kinetic Brutalism** visual direction:
- Background is pure black: `#000000`
- Primary text is white: `#ffffff`
- Surfaces are dark monochrome blocks: `#111111` and `#1a1a1a`
- Accent color is `--color-brutal: #DFFF00`
- Border radius is intentionally `0px` everywhere
- Headings use **Space Grotesk**
- Body copy uses **Inter**
- Labels, UI meta text, and tags use **JetBrains Mono**

This zero-radius brutalist direction is intentional and should not be softened unless explicitly requested.

## Architecture
This is a **single-page SPA-style homepage** inside `app/page.tsx`.

There is no separate header/navigation component. Navigation is handled with smooth-scroll buttons and section anchors:
- `#about`
- `#services`
- `#work`
- `#pricing`
- `#contact`

The page remains a client component because it manages:
- pricing swiper state on mobile
- pricing package selection state
- controlled contact form state
- async contact form submission state
- scroll-linked hero transforms

## Major behavior changes now implemented

### 1. Contact form is no longer a mailto draft
The old behavior opened the visitor's own email client through a `mailto:` link. That is no longer the flow.

The current behavior is:
- users complete the form directly on the site
- the frontend sends a `POST` request to `/api/contact`
- the server route sends the email to `the.corpus.projects@gmail.com`
- the visitor stays on the website and receives inline success or error feedback

This means the form now behaves like an assistant handoff rather than asking the user to open Gmail or another mail app.

### 2. Pricing cards now feed the Contact form
The pricing section now does more than display tiers.

When a user clicks a pricing CTA:
- the selected package name is copied into the Contact form's `Package Type` field
- the page smooth-scrolls to the Contact section

This works for:
- desktop pricing cards
- mobile swiper pricing cards

The selected value currently comes from the product `name`:
- `Essential`
- `Advance`
- `Custom`

### 3. Contact form captures a fuller order request
The Contact section now includes a more complete request form.

Current fields:
- `Name` (required)
- `Email` (required)
- `Company / Brand` (optional)
- `Phone / WhatsApp` (optional)
- `Package Type` (required, can be auto-filled from Pricing)
- `Project Brief` (required)

The form is controlled in React state inside `app/page.tsx`.

### 4. Server-side email delivery is now part of the project
The project now includes a backend email route:
- `app/api/contact/route.ts`

This route:
- accepts JSON from the contact form
- validates required fields
- checks required environment variables
- sends an email through Gmail SMTP using `nodemailer`
- returns JSON success or error messages for the frontend

## Current file map
```txt
app/
  api/
    contact/
      route.ts        <- Server route that sends contact submissions by email
  globals.css         <- All CSS tokens, layout, components, forms, responsive rules
  layout.tsx          <- Fonts, metadata, footer wrapper
  page.tsx            <- Entire single-page experience and client-side form logic
components/
  Footer.tsx          <- Minimal footer with social links
  GuidingElement.tsx  <- Fixed left sidebar on desktop / mobile progress indicator
  RotatingGlobe.tsx   <- Hero globe visual
lib/
  data.ts             <- Static `products[]` pricing data and `portfolio[]`
.env.example          <- Required mail environment variables for local/dev setup
CLAUDE.md             <- This project brief
```

## Homepage section order
1. **Hero**
2. **Marquee strip**
3. **About**
4. **Services**
5. **Work**
6. **Stats strip**
7. **Pricing**
8. **Contact**

## Pricing section details
The pricing section still has two render paths:

- Desktop: `pricing-desktop` using `.grid-3`
- Mobile: `pricing-swiper` using a horizontal scroll-snap carousel

### Mobile pricing swiper
The mobile pricing UI uses:
- `pricingRef` with `useRef`
- `pricingIndex` with `useState`
- `scrollToCard(index)` for prev/next and dot navigation
- `handlePricingScroll()` to keep the active dot in sync with horizontal scroll

### Pricing CTA behavior
All pricing CTA buttons are now actionable lead-capture triggers.

Each CTA:
- calls the local package selection handler
- writes the selected package into contact form state
- scrolls the user to `#contact`

## Contact section details

### Layout
The Contact section is still a 2-column layout on desktop and stacked on mobile:
- left column: contact information and intro copy
- right column: controlled request form

### Controlled form state
`app/page.tsx` now contains a structured contact form state object that tracks:
- `name`
- `email`
- `company`
- `phone`
- `packageType`
- `projectBrief`

Additional UI state also exists for:
- `isSubmitting`
- submission status and feedback message

### Submission flow
On submit:
1. the form prevents default browser submission
2. the client sends a JSON `POST` request to `/api/contact`
3. the route validates the payload
4. Gmail SMTP sends the email to `the.corpus.projects@gmail.com`
5. the UI displays a success or error message inline
6. on success, the form fields reset

### Email subject and email body
The sent email uses the subject:
- `Order #1`

The body includes:
- name
- email
- company / brand
- phone / WhatsApp
- package type
- project brief

The route sends both:
- plain text content
- HTML content

`replyTo` is set to the user's email address so replies can go back to the person who submitted the form.

## API route details
`app/api/contact/route.ts` is the active server mail endpoint.

### What it validates
Required fields:
- `name`
- `email`
- `packageType`
- `projectBrief`

If required fields are missing, the route returns `400`.

If server mail credentials are missing, the route returns `500` with a configuration error message.

If SMTP send fails for any other reason, the route returns `500` with a generic failure response.

### Transport
Mail delivery currently uses:
- `nodemailer`
- Gmail service transport

Auth comes from environment variables:
- `GMAIL_USER`
- `GMAIL_APP_PASSWORD`

## Environment configuration
The project now expects mail credentials through environment variables.

`.env.example` documents the required values:
```env
GMAIL_USER=the.corpus.projects@gmail.com
GMAIL_APP_PASSWORD=your-gmail-app-password
```

For real usage, these should be placed in `.env.local` or deployment environment settings, not committed secrets.

### Important Gmail requirement
This setup expects a **Gmail App Password**, not a normal Gmail password. In practice this usually means:
- the Gmail account must have 2-Step Verification enabled
- an App Password must be generated for SMTP use

## Dependencies
The project now includes email delivery support:
- `nodemailer`
- `@types/nodemailer`

## Motion rules
- Scroll-reveal animations use `whileInView` with `once: true`
- Hero uses `animate` plus `useScroll` and `useTransform`
- Shared presets are still `fadeUp` and `staggerContainer`
- Reduced-motion CSS still disables marquee animation and compresses transitions

## Important CSS and layout classes
- `.section` - vertical section spacing and borders
- `.container` / `.container--narrow` - width wrappers
- `.btn` / `.btn--primary` - brutalist CTA buttons
- `.card` - pricing, service, and content card shell
- `.grid-2` / `.grid-3` - content grids
- `.hero-grid` - two-column hero layout
- `.stats-grid` - four-cell metrics strip
- `.contact-grid` - two-column contact layout
- `.contact-form` - right-column form container
- `.form-input` / `.form-textarea` / `.form-label` - form styling primitives
- `.pricing-desktop` - desktop-only pricing layout
- `.pricing-swiper` - mobile-only pricing layout
- `.pricing-swiper-track` - horizontal snap container
- `.pricing-controls` / `.pricing-dot` - mobile pricing navigation UI

## Responsive behavior

### At `<= 1024px`
- left sidebar offset is removed
- desktop guiding element is hidden
- mobile progress bar is shown
- major grids collapse to one column
- pricing switches from 3-column cards to mobile swiper
- contact section stacks vertically

### At `<= 768px`
- contact form padding becomes tighter
- cards reduce internal padding
- hero globe becomes smaller
- section spacing is reduced
- type scale is reduced for large headings

## Known repo issues not introduced by the new contact flow
Current linting still reports existing unrelated issues elsewhere in the repo:
- `components/RotatingGlobe.tsx` uses `Math.random()` during render, which violates the React purity lint rule
- `components/Footer.tsx` has an unused `Link` import warning

These issues are pre-existing and separate from the pricing/contact/email changes.

## Do not
- Do not add Tailwind
- Do not add rounded corners
- Do not introduce a Header component unless explicitly requested
- Do not split existing homepage sections into separate pages unless explicitly requested
- Do not replace in-page section navigation with `Link` for internal anchors
- Do not revert the server-side contact email flow back to `mailto:`
- Do not expose Gmail secrets to the client with `NEXT_PUBLIC_` variables

## Current implementation summary
The homepage now functions as:
- a portfolio site
- a pricing explainer
- a guided package-selection flow
- a direct inquiry intake form
- a server-assisted email forwarding system to `the.corpus.projects@gmail.com`

That server-assisted contact flow is now part of the actual product scope and should be preserved unless intentionally redesigned.
