# VGG UI Design System

Reusable direction: **Văn Lang identity, international academic/editorial quality**. VLU is the brand authority; Stanford informs hierarchy, whitespace, composition, and content rhythm. NUS is a secondary reference for structured postgraduate information. Never reproduce a reference layout or asset verbatim.

## 1. Foundations

### Color tokens

Use the verified project values; do not replace them with Stanford colors.

```css
:root {
  --color-brand-red: #d72134;
  --color-brand-red-dark: #a91528;
  --color-brand-blue: #1f2251;
  --color-ink-deep: #171d45;
  --color-text: #24243c;
  --color-text-muted: #666978;
  --color-paper: #f6f3f1;
  --color-surface-subtle: #f4f1eb;
  --color-line: #d7d5d1;
  --color-white: #ffffff;
}
```

- Red: primary action, active underline, editorial accent; never large areas repeatedly.
- Blue/deep ink: institutional authority, dark sections, footer, image overlays.
- Paper/white: default reading surfaces. Alternate white, paper, image, and dark sections for rhythm.
- Body text must meet WCAG AA contrast; do not use low-opacity text below readable contrast.

### Typography

- Display: `Rifton VGG` with Maison Neue fallback; use for large `h1/h2` only.
- Body/UI: Maison Neue; use for navigation, labels, paragraphs, forms, buttons, and compact headings.
- Eyebrow: 11–12px, 700, uppercase, `letter-spacing: .16–.20em`.
- Body: 16–18px desktop, 15–17px mobile; line-height 1.6–1.75; readable width 55–72ch.
- Avoid synthetic novelty styles. Italic emphasis is limited to one short phrase per major heading.

```css
--type-hero: clamp(4rem, 8vw, 7.5rem);    /* 64–120 */
--type-h1: clamp(3.5rem, 7vw, 6.5rem);    /* 56–104 */
--type-h2: clamp(2.75rem, 5vw, 4.75rem);  /* 44–76 */
--type-h3: clamp(1.5rem, 2.2vw, 2.25rem); /* 24–36 */
--type-body-lg: clamp(1.125rem, 1.5vw, 1.375rem);
```

Display line-height: `.88–1.0`; body: `1.6–1.75`. Let Vietnamese headings wrap intentionally; test real glyph metrics at every breakpoint.

## 2. Layout

### Containers and grid

- Page gutter: `clamp(24px, 7vw, 112px)`; editorial wide gutter may reach `9vw`.
- Content max-width: 1440–1500px; reading column: 680–760px.
- Desktop: 12-column grid; common splits `4/8`, `5/7`, `7/5`.
- Tablet: 6 columns; mobile: 1 column. Collapse asymmetric compositions deliberately, not by shrinking.
- Keep alignment anchors consistent across consecutive sections even when backgrounds change.

### Spacing

Use an 8px base: `8, 16, 24, 32, 48, 64, 80, 96, 128, 160, 192`.

- Section vertical padding: 96–160px desktop, 72–112px tablet, 56–88px mobile.
- Heading-to-copy: 24–40px. Section heading-to-content: 56–96px.
- Stanford-inspired rhythm: fewer sections, larger pauses, clear chapter transitions.

## 3. Composition patterns

### Hero

- One strong statement, one short supporting paragraph, optional eyebrow/signature, one primary next action.
- Prefer full-bleed image with restrained ink overlay, or asymmetric image/text split.
- Height: `max(680px, calc(100svh - header))`; never let content clip inside `overflow: hidden`.
- Display heading occupies at most 2–3 lines desktop and 3–5 mobile. Validate Vietnamese wrapping.
- Image must support the message; do not use decorative stock imagery or strong gradients.

### Sections

Alternate patterns to avoid stacked sameness:

1. Editorial intro: eyebrow + full-width statement + offset reading column.
2. Image/text split: one large image and one focused narrative.
3. Editorial list: numbered rows and dividers; hover shifts text 4–6px.
4. Feature story: one dominant item, then smaller supporting items; asymmetric grid.
5. Statistics: large typography separated by rules, not dashboard cards.
6. Dark impact chapter: one strong statement and restrained copy.
7. CTA chapter: high contrast, one primary decision, maximum two links.

### Editorial lists and accordions

- Full row is clickable; minimum target 48px, preferred 72–104px.
- Structure: small index / title / arrow or plus. Use a single-pixel divider.
- Accordion opens one item per group; content max-width 620px.
- Provide `aria-expanded`, `aria-controls`, keyboard focus, and semantic buttons.
- Open transition: grid-row/height + opacity, 250–400ms. Never hide focus outlines.

### Cards

- Use cards only when items are genuinely discrete objects.
- Default: square or 4–8px radius; avoid repeated large rounded rectangles.
- Prefer image, category, title, metadata, and link over decorative icons.
- Shadows are rare and soft. Separation should come from whitespace, surface, and rules.

### Images

- Standard ratios: hero 16:9/full bleed; editorial feature 4:3 or 3:2; portrait 4:5.
- Use `object-fit: cover`, meaningful focal positioning, descriptive alt text.
- Image hover scale: maximum `1.02–1.04` over 400–700ms.
- Overlays: deep ink at 35–75% only when needed for text contrast.

## 4. Interaction

### Buttons and links

- Primary: brand red, white text; secondary: deep ink; tertiary: text + animated underline/arrow.
- Button height 48–56px; horizontal padding 20–28px; radius 4–8px or intentional pill.
- One primary action per region. Avoid flashing, shaking, or infinite attention animation in core UI.
- Inline links retain clear affordance. Underline expands left-to-right in 200–300ms.
- Arrow moves 3–5px diagonally on hover; do not animate continuously.

### Navigation

- Compact, predictable, and brand-led. Hover only changes underline/color.
- Mega menus open by click; click again, outside click, and `Escape` close them.
- Active route uses red underline, not filled nav pills. Preserve visible keyboard focus.

### Dividers and hover

- Divider: `1px solid var(--color-line)` or 25–35% white on dark surfaces.
- Active rows may use a subtle paper tint or ink inversion.
- Transitions: 220–350ms, `ease` or `cubic-bezier(.2,.7,.2,1)`.

### Scroll/image reveal

- Default reveal: opacity 0→1 and translateY 18–28px→0, 500–700ms.
- Stagger list items by 50–90ms; never delay essential content excessively.
- Image reveal may use opacity + scale 1.02→1; no heavy parallax.
- All motion must be disabled or simplified under `prefers-reduced-motion: reduce`.

## 5. Responsive and accessibility

- Breakpoints: mobile `<600px`, compact/tablet `600–899px`, desktop `≥900px`; add 1200px only when composition needs it.
- Mobile: one-column reading order, 24px gutters, 44px minimum targets, no nested scrolling, no horizontal overflow.
- Tablet: preserve hierarchy and intentional whitespace; do not prematurely stack every split.
- Use semantic landmarks/headings in logical order; one `h1` per page.
- Every interactive element must work with keyboard and have visible focus.
- Provide useful alt text, form labels, status announcements, and sufficient contrast.
- Never rely on color, hover, or motion alone to communicate state.

## 6. Avoid

- Stanford colors, logos, assets, copied layouts, or source code.
- SaaS-dashboard composition, generic startup gradients, glassmorphism.
- Card grids for every section; excessive pills, borders, shadows, icons, and radii.
- Fake statistics/content; low-contrast text; long full-width paragraphs.
- Multiple competing CTAs, clipped display type, nested scroll areas, autoplay motion without controls.
- Strong parallax, bounce, infinite animation, or transitions longer than 700ms.

## Reference scope

Analyzed once, without crawling: Stanford Research; Stanford Admissions & Aid; NUS Graduate Scholarships; VLU About Us; VLU Research; VLU Research Projects Search. These references inform principles only; project tokens and Văn Lang identity remain authoritative.
