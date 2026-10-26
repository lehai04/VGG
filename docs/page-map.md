# Page map and layout reference

## Public layouts

| Scope | Layout / components | Reference when |
| --- | --- | --- |
| Whole site | `frontend/src/app/layout.tsx` | adding global font, metadata or persistent UI |
| Homepage `/` | `frontend/src/features/home/components/*` | adding/reordering homepage sections |
| Shared page chrome | `frontend/src/shared/components/layout/SiteHeader.tsx`, `SiteFooter.tsx` | changing shared header/footer; use the active feature component for page content |
| Programmes `/programmes` | `frontend/src/features/programmes/components/*` | changing catalogue/search behavior |
| Discover `/discover` | `frontend/src/features/discover/components/DiscoverIntroduction.tsx` | changing the single institute page; sections use anchors |

## Navigation contract

- Main navigation is rendered by `frontend/src/features/home/components/Header.tsx` and is shared by the homepage plus all subpages through `SiteHeader`.
- Each main item always goes to its own route: `/discover`, `/programmes`, `/admissions`, `/research`, `/global`, `/student-success`, `/news`, or `/resources`.
- Discover is a single page with section anchors; there is no `discover/[slug]` route. `/global` redirects to the research partners section. Admissions/research/student-success/resource legacy child routes redirect to current landing content; programme and news detail routes render real detail pages.

## Routes

| Route | Primary file | Content/source |
| --- | --- | --- |
| `/` | `frontend/src/app/(public)/page.tsx` | `frontend/src/features/home/components/*` |
| `/discover` | `frontend/src/app/(public)/discover/page.tsx` | `discover-introduction.json`, `discover-media.ts`, `discover-leadership.ts` plus CMS overrides |
| `/programmes` | `frontend/src/app/(public)/programmes/page.tsx` | `frontend/src/features/programmes/components/*` |
| `/admissions`, `/research`, `/global`, `/student-success`, `/news`, `/resources` | matching `frontend/src/app/(public)/<route>/page.tsx` | matching feature + `frontend/src/data/site.ts` |
| `POST /api/consultations` | `frontend/src/app/api/consultations/route.ts` | `backend/src/modules/consultations` |

## Adding a module to an existing page

See [the frontend directory guide](../frontend/README.md) for the full URL-to-component table. Old alternative page components have been removed; do not recreate them from historical reports.

1. Locate the route above; keep it thin and add a focused component in its existing feature folder.
2. Put reusable content/configuration in `frontend/src/data`, not hard-coded across components.
3. Reuse a layout and tokens from `design-system.md`; add CSS to `globals.css` only when it is shared, otherwise use the page feature stylesheet.
4. Update this map if the module adds a route, layout, or shared component.
