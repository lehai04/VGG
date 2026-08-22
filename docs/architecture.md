# Architecture

```text
vgg-platform/
├── frontend/   Public Next.js site (routes, UI, static content)
├── backend/    Framework-agnostic validation/domain logic, reusable by API and admin
├── admin/      Separate Next.js admin shell (port 3001)
├── docs/       Product, page and design references
└── package.json  npm workspace scripts
```

## Boundaries

- `frontend/app/api/**` owns HTTP concerns: request parsing, origin/rate limit and responses.
- `backend/src/**` must not import Next.js, React, or frontend data. Pass required data in as arguments.
- `admin` may consume `backend`, but is intentionally isolated from public UI components.
- Static public content belongs in `frontend/data`; visual UI belongs in `frontend/components`; route composition stays in `frontend/app`.

## Commands

- `npm run dev` — public site on port 3000.
- `npm run dev:admin` — admin shell on port 3001.
- `npm run check` — lint, types, tests and production builds for both apps.
