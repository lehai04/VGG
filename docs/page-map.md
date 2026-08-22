# Page map and layout reference

## Public layouts

| Scope | Layout / components | Reference when |
| --- | --- | --- |
| Whole site | `frontend/app/layout.tsx` | adding global font, metadata or persistent UI |
| Homepage `/` | `frontend/components/home/*` | adding/reordering homepage sections |
| Standard content pages | `frontend/components/layout/SiteHeader.tsx`, `SiteFooter.tsx`, `sections/SectionPages.tsx` | adding a landing page consistent with existing sections |
| Programmes `/programmes` | `sections/ProgrammesPage.tsx`, `ProgrammeDirectory.tsx` | changing catalogue/search behavior |
| Discover `/discover/[slug]` | `frontend/app/discover/[slug]/page.tsx` | adding a Discover subpage |

## Navigation contract

- Main navigation is rendered by `frontend/components/home/Header.tsx` and is shared by the homepage plus all subpages through `SiteHeader`.
- Each main item always goes to its own route: `/discover`, `/programmes`, `/admissions`, `/research`, `/global`, `/student-success`, `/news`, or `/resources`.
- Only the child items of **Về VGG** have their own routes: `/discover/<slug>` from `discoverSections` in `frontend/data/site.ts`. Other mega-menu child items correctly return to their parent landing page until dedicated routes exist.

## Routes

| Route | Primary file | Content/source |
| --- | --- | --- |
| `/` | `frontend/app/page.tsx` | `components/home/*` |
| `/discover` and `/discover/[slug]` | `app/discover/**` | `data/site.ts` + route-local content |
| `/programmes` | `app/programmes/page.tsx` | `sections/ProgrammesPage.tsx`, `data/programmes.ts` |
| `/admissions`, `/research`, `/global`, `/student-success`, `/news`, `/resources` | matching `app/<route>/page.tsx` | `SectionLanding`, `data/site.ts` |
| `POST /api/consultations` | `app/api/consultations/route.ts` | `backend/src/consultation.ts` |

## Adding a module to an existing page

1. Locate the route above; keep it thin and add a focused component in its existing feature folder.
2. Put reusable content/configuration in `frontend/data`, not hard-coded across components.
3. Reuse a layout and tokens from `design-system.md`; add CSS to `globals.css` only when it is shared, otherwise use the page feature stylesheet.
4. Update this map if the module adds a route, layout, or shared component.
