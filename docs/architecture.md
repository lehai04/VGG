# Architecture

```text
vgg-platform/
├── frontend/   Public Next.js site (routes, UI, static content)
├── backend/    Fastify API, authentication, CMS, database and domain validation
├── admin/      Separate Next.js admin shell (port 3001)
├── docs/       Product, page and design references
├── shared/     Shared typography stylesheet
├── scripts/    Maintenance, CMS export and QA tools
├── outputs/    QA evidence and generated reports, not application source
├── work/       Historical working files; not a deployed workspace
└── package.json  npm workspace scripts
```

## Boundaries

- `frontend/src/app/api/**` proxies public requests; backend Fastify routes own backend HTTP, authorization and database operations.
- `backend/src/**` must not import Next.js, React, or frontend data. Pass required data in as arguments.
- `admin` may consume `backend`, but is intentionally isolated from public UI components.
- Static public content belongs in `frontend/src/data`; feature UI belongs in `frontend/src/features`; cross-feature UI belongs in `frontend/src/shared`; route composition stays in `frontend/src/app`.

## Commands

- `npm run dev` — public site on port 3000.
- `npm run dev:admin` — admin shell on port 3001.
- `npm run check` — lint, types, tests and production builds for both apps.
