# Design System: Gems and Metal

Sterling silver jewelry and watch studio (Karachi, est. 1997). Editorial,
restrained, premium. No gradients, no pill buttons, no stock-photo gloss.

## 1. Visual Theme & Atmosphere

Quiet, high-end jewelry editorial. A warm ivory canvas carries thin hairline
borders, generous negative space, and a single deep plum accent sampled
directly from the brand's own logo mark, used sparingly as a signal (price,
links, active states), never as a fill or gradient. Visual drama comes from
rhythm, not ornament: one full-bleed charcoal section breaks the ivory base
for contrast, offset hairline frames sit behind photography for depth, and a
slow horizontal marquee of plain-text facts adds motion without noise.

## 2. Color Palette & Roles

### Primary Foundation
- **Paper (`#f7f5f1`)**: Primary canvas background, warm ivory, not pure white.
- **Paper Raised (`#ffffff`)**: Card and alternating-section surface, sits a
  half-step lighter than Paper.
- **Charcoal (`#1c1e22`)**: Full-bleed dark section background (the one
  deliberate high-contrast break in the page rhythm).

### Accent & Interactive
- **Plum 700 (`#4b1a5c`)**: Primary accent, sampled from the brand logo.
  Prices, active nav underline, hover states, pull-quote rules, offset
  frames. Never a background fill on a button.
- **Plum 300 (`#b06fc4`)**: Lighter plum for accents placed on dark
  (Charcoal) surfaces where Plum 700 would lack contrast.
- **Plum 50 / 100**: Reserved for faint tints only (unused as of this
  writing; available for subtle badge backgrounds).

### Typography & Text Hierarchy
- **Ink (`#17181c`)**: Primary text on light surfaces, headings and body.
- **Ink Soft (`#4a4d53`)**: Secondary copy, descriptions, captions, nav links
  in their resting (non-active) state.
- **Paper / Paper at 80% / 60% / 50%**: Text hierarchy on the Charcoal
  section (full opacity for headings, stepped-down opacity for body and
  labels instead of a second dark-mode palette).

### Structural Neutrals
- **Line (`#e3e0d8`) / Line Strong (`#cfcbc0`)**: 1px hairline borders
  between sections and around framed images. Line Strong is used where the
  border needs to read slightly firmer (image frames).
- **Silver 100 (`#f1f1ef`)**: Placeholder/empty image background.
- **Silver 500 (`#9a9ea3`)**: Muted labels inside placeholder states
  ("No image yet").

### Functional States
- No status-color system (success/error/warning) is in use. The one
  product-state distinction, "In Stock" vs. "Made to Order," is communicated
  as plain text, not a colored badge.

## 3. Typography Rules

- **Bodoni Moda** (display serif, `--font-display-serif`): All headings
  (`h1`–`h3`), pull-quotes, and the logo-adjacent wordmark moments. High-contrast
  Didone character, deliberately chosen over the Fraunces/Playfair pairing
  that reads as an AI-template default. Weights 400/500/600, italic used for
  pull-quotes specifically (e.g. `"Silver is what we know, and it's all we
  use."`). Hero `h1` sits at `text-4xl` mobile up to `text-[3.5rem]` desktop,
  `leading-[1.08]`, `tracking-tight`. Section `h2` at `text-3xl`.
- **Inter** (body, `--font-inter`): All body copy, nav, buttons, labels.
  Weights 400/500 only. Body copy sits at `text-sm` to `text-base`,
  `leading-relaxed`. Uppercase kicker labels and nav use `text-xs`,
  `tracking-[0.15em]` to `tracking-[0.25em]`.

## 4. Component Stylings

- **Buttons** (`components/Button.tsx`): Rectangular, no radius, ever.
  Primary: solid Ink fill, Paper text, hover shifts fill to Plum 700
  (not a darker neutral). Secondary: 1px Ink border, hover border and text
  shift to Plum 700. Every button carries a small inline arrow glyph
  (custom SVG, not an icon font) that slides `translate-x-1` on hover.
  Padding `px-7 py-3`, label `text-xs uppercase tracking-[0.18em]`.
- **Product Card** (`components/ProductCard.tsx`): `aspect-[4/5]` image over
  Silver 100 placeholder. On hover: image scales to `1.06`, a 1px Plum 700
  underline draws in from the left across the image's top edge, and a
  "View Piece" tab rises from the bottom on a translucent Ink scrim. Name in
  Bodoni Moda, category as an uppercase Ink Soft label, price in Plum 700.
- **Accordion** (`components/ui/accordion.tsx`, Radix UI primitive): No
  cards, no shadows. Each item is a full-width row separated by a 1px Line
  border (last item borderless). Trigger text is Bodoni Moda, shifts to
  Plum 700 on hover; chevron rotates 180° on open.
- **Marquee** (`components/ui/marquee.tsx`): Plain CSS keyframe loop (no
  canvas/WebGL), duplicated track for seamless repeat, pauses on hover.
  Used once, as a dark strip of short facts separated by a small plum
  diamond (`&#9671;`) glyph.
- **Framed images**: A photo or illustration box sits in front of a second,
  identical box offset `-bottom-4`/`-start-4` or `-end-4`, outlined in
  `border-plum-700/30` to `/40`, creating layered depth without a shadow.
- **Nav / Header**: Sticky, `bg-paper/90 backdrop-blur`, 1px Line bottom
  border. Active link gets a 1px full-width Ink underline positioned
  `-bottom-1.5`.

## 5. Layout Principles

- **Container**: `max-w-6xl` for standard sections, `max-w-3xl`/`max-w-4xl`
  for text-dense or centered content (Policies, legal pages, pull-quotes).
- **Side padding**: `px-6` mobile, `md:px-10` desktop.
- **Section rhythm**: `py-20` to `py-24` vertical padding per section; 1px
  Line borders (`border-y` or `border-b`) mark section boundaries instead of
  shadows or background-color changes alone.
- **Grid**: 2-column `md:grid-cols-2` for image+text pairings; product grids
  run `grid-cols-2` mobile up to `md:grid-cols-4`.
- **Spacing unit**: Base 4px Tailwind scale, no custom spacing tokens.
- **Responsive**: Two breakpoints matter in practice, `md:` (desktop layout
  switch) and `lg:` (used only for a few font-size bumps). No `xl`/`2xl`
  overrides in use.

## 6. Design System Notes for Stitch Generation

- **Atmosphere keywords**: Quiet luxury, editorial jewelry catalog, warm
  ivory paper, single deep plum accent, hairline borders, one dark
  full-bleed contrast section, offset frame depth, no gradients, no pill
  shapes, no drop shadows.
- **Canonical colors**: Paper `#f7f5f1`, Ink `#17181c`, Plum 700 `#4b1a5c`,
  Charcoal `#1c1e22`, Line `#e3e0d8`.
- **Component prompts**:
  - "A rectangular primary button, solid charcoal-ink fill with cream text,
    uppercase letter-spaced label, small arrow glyph that slides right on
    hover, hover fill shifts to deep plum, no border radius."
  - "A product card: 4:5 image, on hover the image scales up slightly and a
    thin plum line draws across the top edge while a cream 'View Piece' tab
    rises from the bottom; serif product name, uppercase category label,
    plum price."
  - "A photo in a thin-bordered square frame with a second plum-outlined
    square offset behind it bottom-left, on a warm ivory background."
