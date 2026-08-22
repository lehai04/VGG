# VGG Design System

Use this as the compact source of truth before creating UI. Prefer the existing CSS variables in `frontend/app/globals.css`; do not invent near-duplicate colours.

## Foundation tokens

| Token | Value | Use |
| --- | --- | --- |
| `--vlu-red` / `--coral` | `#D72134` | primary CTA, highlights, active states |
| `--vlu-red-dark` | `#A91528` | pressed/strong red state |
| `--vlu-blue` / `--ink` | `#1F2251` | primary text, dark surfaces |
| `--vlu-pale` / `--cream` | `#F6F3F1` | soft page background |
| white | `#FFFFFF` | cards and inverse text |

Typography uses Maison Neue through `--font-body` and `--font-display`. Use body copy at 15px/1.6. Headings use `clamp()` and tight tracking already established in page styles; follow the closest existing section rather than adding a new type scale.

## Layout and responsive rules

- Desktop section padding: `110px 7vw`; do not introduce a competing global container.
- Navigation is 88px high and sticky.
- Use CSS grid for editorial two-column blocks; collapse to one column at the existing responsive breakpoint in the relevant stylesheet.
- Preserve visible keyboard focus, semantic heading order, `aria-live` for async feedback, and the skip link in the root layout.

## Reusable patterns

| Need | Reuse first |
| --- | --- |
| Primary action | `.button.coral` |
| Dark action | `.button.dark` |
| Inline editorial link | `.underline-link` or `.text-link` |
| Standard section | `.section`, `.section-heading` |
| Standard page chrome | `SiteHeader` + `SiteFooter` |
| Homepage animation | `ScrollReveal`, `CountUp` |

## Creation checklist

- Is there an existing component/pattern that already solves this?
- Use `--coral` only for a clear primary action or key emphasis.
- Use `--ink` for readability; check contrast before placing text on image/colour fields.
- Avoid global CSS for one-off modules; avoid a new CSS file if existing local styles can be extended cleanly.
- Document a new shared token or component here and in `page-map.md`.
