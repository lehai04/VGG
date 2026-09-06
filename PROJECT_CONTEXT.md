# Project Context: VGG Platform (Van Lang Global Graduate)

## 1. Overview
- **Project Name:** VGG Platform (`vgg-platform`)
- **Institution:** Viện Sau Đại học – Trường Đại học Văn Lang (Van Lang Global Graduate / Van Lang Institute of Postgraduate Education)
- **Monorepo Architecture:** npm workspaces consisting of 3 applications:
  1. `frontend/`: Public-facing Next.js application (port 3000)
  2. `admin/`: Independent Next.js CMS & Admin Portal (port 3001)
  3. `backend/`: Framework-agnostic Node.js + Fastify API service (port 4000)
- **Primary Domain:** Postgraduate academic portal, admissions, programmes, research, student success, resource directory, and consultation CRM.

---

## 2. Tech Stack
### Frontend (`frontend/`)
- **Framework:** Next.js 16.3.1 (App Router + Turbopack)
- **Core:** React 19.2.8, TypeScript 5.9.3
- **CSS Strategy:** Pure CSS & CSS Modules (no Tailwind CSS, custom design tokens in `globals.css` & `home.css`)
- **Icons:** `lucide-react` (v1.33.0)
- **Image Optimization:** `next/image` with `sharp` (v0.35.3); CMS media được phục vụ qua proxy nội bộ `/api/media/*`
- **State & Form Management:** React standard hooks (`useState`, `useMemo`, `useRef`), Native `FormData`
- **I18n:** Custom locale middleware rewrite (`/vi`, `/en`), `LocaleProvider`, `LocalizedLink`

### Admin Portal (`admin/`)
- **Framework:** Next.js 16.3.1 (App Router, Node.js runtime for API endpoints)
- **Core:** React 19.2.8, TypeScript 5.9.3
- **ORM / DB Access:** Prisma Client 7.9.1 with `@prisma/adapter-pg` (PostgreSQL)
- **Auth Engine:** Argon2id password hashing, opaque session token in HTTP-only `vgg_admin_session` cookie
- **CMS Document & Asset Processing:** `mammoth` (Word .docx parser), `sanitize-html`, MinIO SDK (`minio`)

### Backend API Service (`backend/`)
- **Runtime:** Node.js (>=22.13.0)
- **Framework:** Fastify 5.12.1 with `@fastify/cors`, `@fastify/helmet`, `@fastify/cookie`, `@fastify/rate-limit`
- **Database ORM:** Prisma 7.9.1 (`@prisma/client`, `@prisma/adapter-pg`, `pg`)
- **Validation:** Zod (v4.4.3)
- **Security:** Argon2id, HTML sanitization (`sanitize-html`), IP/User-Agent audit logging

### Database & Infrastructure (`compose.yaml`)
- **RDBMS:** PostgreSQL 17 (Alpine)
- **Cache / Queue:** Redis 7 (Alpine)
- **Object Storage:** MinIO S3-compatible storage (Console port 9001, API port 9000)

---

## 3. Architecture
```text
┌──────────────────────────────────────────────────────────┐
│                      Clients / Browsers                  │
└──────────────┬────────────────────────────┬──────────────┘
               │ (Port 3000)                │ (Port 3001)
               ▼                            ▼
┌──────────────────────────────┐ ┌──────────────────────────┐
│      frontend (Next.js)      │ │     admin (Next.js)      │
│  - Public routes: / (public) │ │  - Route: /admin/*       │
│  - Localized: /vi, /en       │ │  - Direct Prisma Auth/DB │
│  - API proxies: /api/*       │ │  - Proxy /api/cms/*      │
└──────────────┬───────────────┘ └──────────┬───────────────┘
               │ (Internal HTTP)            │ (Internal HTTP)
               └──────────────┬─────────────┘
                              ▼
               ┌──────────────────────────────┐
               │    backend (Fastify API)     │
               │  - Auth / RBAC Guards        │
               │  - CMS / News / Resources    │
               │  - Consultations / Visits    │
               │  - Audit Logs                │
               └──────────────┬───────────────┘
                              ▼
               ┌──────────────────────────────┐
               │    PostgreSQL 17 Database    │
               └──────────────────────────────┘
```

---

## 4. Folder Structure
```text
vgg-demo-vercel/
├── package.json              # Monorepo root scripts (dev, check, typecheck, test, build)
├── compose.yaml              # Local dev services (PostgreSQL 17, Redis 7, MinIO)
├── docs/                     # Architecture, UI Design System, Page Map documentation
│   ├── UI_DESIGN_SYSTEM.md
│   ├── design-system.md
│   ├── page-map.md
│   └── architecture/
├── frontend/                 # Public Next.js Web App (Port 3000)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (public)/     # Public route groups (/discover, /programmes, /admissions, etc.)
│   │   │   ├── api/          # Public API proxies (/api/consultations, /api/analytics, /api/resources)
│   │   │   ├── globals.css   # Global design tokens, resets, shared subpage layout
│   │   │   ├── home.css      # Homepage-specific styles (.home-page scope)
│   │   │   └── layout.tsx    # Root layout with font, metadata, StickyActions, LocaleProvider
│   │   ├── data/             # Static content & catalogues (site.ts, programmes.ts, research.ts)
│   │   ├── features/         # Feature components (home, discover, admissions, programmes, research, news, resources, content)
│   │   ├── i18n/             # I18n provider & LocalizedLink
│   │   ├── lib/              # i18n utilities & serverLocale helper
│   │   ├── messages/         # Localization files (vi.json, en.json)
│   │   ├── proxy.ts          # Next.js URL rewrite middleware for /vi and /en
│   │   └── shared/           # Shared components (layout, ui, analytics)
│   └── public/               # Static assets (images, video, logo, favicon)
├── admin/                    # Admin Portal Next.js App (Port 3001)
│   ├── src/
│   │   ├── app/
│   │   │   ├── admin/        # /admin/login, /admin/change-password, /admin/(protected)/*
│   │   │   └── api/          # /api/admin/auth/*, /api/admin/users/*, /api/cms/*, /api/cms/upload-*
│   │   ├── components/       # Admin UI modules (cms, users, consultations, dashboard, layout)
│   │   └── lib/              # Auth, session, RBAC, DB client, MinIO storage helpers
│   └── prisma/               # Admin Prisma schema and config
├── backend/                  # Fastify Backend API Service (Port 4000)
│   ├── src/
│   │   ├── config/           # Environment validation (Zod)
│   │   ├── modules/          # auth, cms, consultations routes & services
│   │   ├── shared/           # Prisma singleton, response helpers
│   │   ├── app.ts            # Fastify application setup & plugins
│   │   └── server.ts         # Fastify server entrypoint
│   └── prisma/
│       ├── schema.prisma     # Master database schema
│       └── bootstrap-admin.ts# Initial Super Admin seed script
```

---

## 5. Routes
### Public Frontend Routes
| Route | Primary File | Description | Data Source |
|---|---|---|---|
| `/` | `frontend/src/app/(public)/page.tsx` | Main Homepage | Features in `home/*`, `data/site.ts` |
| `/discover` | `frontend/src/app/(public)/discover/page.tsx` | About / Discover Editorial Landing | `data/site.ts`, `WhyChooseSection` |
| `/discover/[slug]` | `frontend/src/app/(public)/discover/[slug]/page.tsx` | Dynamic Subpages (`gioi-thieu`, `tam-nhin-su-menh`, `lanh-dao`, `xep-hang-thanh-tuu`, `lien-he`) | `pages` dictionary in page + feature components |
| `/programmes` | `frontend/src/app/(public)/programmes/page.tsx` | Programme Search & Catalogue | `data/programmes.ts`, `ProgrammeDirectory` |
| `/programmes/[slug]` | `frontend/src/app/(public)/programmes/[slug]/page.tsx` | Programme anchor redirect | Redirects to `/programmes#${slug}` |
| `/admissions` | `frontend/src/app/(public)/admissions/page.tsx` | Admissions Landing | `data/site.ts`, `UnifiedSectionContent` |
| `/admissions/[slug]` | `frontend/src/app/(public)/admissions/[slug]/page.tsx` | Admissions anchor redirect | Redirects to `/admissions#${slug}` |
| `/research` | `frontend/src/app/(public)/research/page.tsx` | Research & Innovation Landing | `data/research.ts`, `ResearchLanding` |
| `/research/[slug]` | `frontend/src/app/(public)/research/[slug]/page.tsx` | Research anchor redirect | Redirects to `/research#${slug}` |
| `/global` & `/[slug]` | `frontend/src/app/(public)/global/page.tsx` | Global cooperation redirect | Redirects to `/research#trao-doi` |
| `/student-success` | `frontend/src/app/(public)/student-success/page.tsx` | Student Experience & Support | Static feature layout & images |
| `/student-success/[slug]` | `frontend/src/app/(public)/student-success/[slug]/page.tsx` | Anchor redirect | Redirects to `/student-success#${slug}` |
| `/news` | `frontend/src/app/(public)/news/page.tsx` | News list & category filtering | Backend API `/api/public/news` via `BACKEND_INTERNAL_URL` |
| `/news/[slug]` | `frontend/src/app/(public)/news/[slug]/page.tsx` | News detail article | Backend API `/api/public/news/:slug` |
| `/resources` | `frontend/src/app/(public)/resources/page.tsx` | Resource document directory | Backend API `/api/public/resources` |
| `/resources/[slug]` | `frontend/src/app/(public)/resources/[slug]/page.tsx` | Anchor redirect | Redirects to `/resources#${slug}` |

### Public Frontend API Routes
- `POST /api/consultations`: Proxy forwards consultation form submissions to backend `/api/public/consultations`.
- `POST /api/analytics/visit`: Proxy forwards page visit logs to backend `/api/public/visits` (safely degrades on error).
- `GET /api/resources/file`: Secure file proxy to download or stream tài liệu từ MinIO nội bộ.

### Admin Portal Routes (`admin/`)
- `/admin/login`: Admin authentication page.
- `/admin/change-password`: Force password reset for new accounts.
- `/admin/dashboard`: Metrics & chart analytics (active staff, visits, consultations, applications).
- `/admin/users`: User management & RBAC (create staff, lock/unlock, reset password, change roles).
- `/admin/news`: News article CMS (Rich text editor, Word docx import, cover image upload, publish/draft/archive).
- `/admin/resources`: Resource document CMS (upload PDF/DOC/XLS vào MinIO nội bộ, category management).
- `/admin/consultations`: Consultation CRM (view leads, update status NEW / CONTACTING / COMPLETED, assign staff).
- `/admin/applications`: Student application overview.
- `/admin/website`: Site content key-value JSON CMS.
- `/admin/profile/security`: Admin password change & profile settings.

---

## 6. Shared Components
| Component | Location | Usage | Notes |
|---|---|---|---|
| `SiteHeader` | `frontend/src/shared/components/layout/SiteHeader.tsx` | All subpages (supports `compact={true}` to render `Header` in route mode) | Mega menu, brand logo, utility bar, language switch |
| `Header` | `frontend/src/features/home/components/Header.tsx` | Homepage & `SiteHeader` | Main navigation, responsive mobile drawer, mega-menu |
| `SiteFooter` | `frontend/src/shared/components/layout/SiteFooter.tsx` | All subpages & Homepage (via `Footer.tsx` re-export) | Modular footer columns, contact info, locations, social links |
| `StickyActions` | `frontend/src/shared/components/layout/SiteFooter.tsx` | Root `layout.tsx` (all pages) | Floating Facebook, Zalo, and Apply Now CTA buttons |
| `ResourcesConsultation` | `frontend/src/features/home/components/ResourcesConsultation.tsx` | Homepage & subpages | Consultation lead form with honeypot validation |
| `LanguageToggle` | `frontend/src/shared/components/layout/LanguageToggle.tsx` | `SiteHeader`, `Header` | Toggles between `/vi` and `/en` routes |
| `LocalizedLink` | `frontend/src/i18n/components/LocalizedLink.tsx` | Used across entire frontend | Automatically prefixes links with current active locale |
| `RevealOnScroll` | `frontend/src/shared/components/layout/RevealOnScroll.tsx` | Subpages | IntersectionObserver triggers `data-reveal` class transitions |
| `NextStepCTA` | `frontend/src/features/content/components/NextStepCTA.tsx` | Discover, Admissions, Student Success | Standard bottom-page call to action |

---

## 7. Design System
- **Colors:**
  - Brand Red (Primary CTA / active underline): `--vlu-red` (`#D72134`), Dark Red: `--vlu-red-dark` (`#A91528`)
  - Institutional Blue (Headings / dark surfaces): `--vlu-blue` / `--ink` (`#1F2251` or `#171D45`)
  - Paper Background: `--vlu-pale` / `--color-paper` (`#F6F3F1` or `#F4F1EB`)
  - Body Text: `--color-text` (`#24243C`), Muted: `--color-text-muted` (`#666978`)
  - Line / Border: `--color-line` (`#D7D5D1`)
- **Typography:**
  - Variable font: `Inter` loaded locally (`frontend/src/app/fonts/Inter-Variable.ttf`), Maison Neue fallback
  - Base body copy: 15px–17px, line-height 1.6–1.75
  - Dynamic fluid headings using `clamp()` (e.g. `clamp(2rem, 5vw, 4rem)`)
- **Container & Spacing:**
  - Max width: `--container-max-width: 1546px`
  - Desktop section padding / gutter: `var(--page-gutter)` (desktop `60px`, laptop `48px`, tablet `32px`, mobile `20px`)
  - 8px base spacing grid: 8, 16, 24, 32, 48, 64, 96, 128px
- **Interactive Rules:**
  - Navigation active state: Red bottom indicator line (`--vlu-red`)
  - Buttons: `.button.coral` (`#D72134`), `.button.dark` (`#1F2251`)
  - Motion: `cubic-bezier(0.2, 0.7, 0.2, 1)`, 250ms–650ms duration; disabled under `prefers-reduced-motion`

---

## 8. Responsive Rules
- **Breakpoints:**
  - Desktop Large: `> 1200px`
  - Laptop / Compact Desktop: `900px – 1200px`
  - Tablet: `600px – 899px`
  - Mobile: `< 600px` (Small mobile: `< 380px`)
- **Mobile Strategy:**
  - Header collapses to hamburger menu with slide-in drawer and body lock (`overflow: hidden`)
  - Mega menus collapse to simple route clicks on mobile/tablet (`<= 1100px`)
  - Grid structures collapse from 12/6 columns into single column
  - Minimum touch target: 44px–48px

---

## 9. Backend Architecture
- **Framework:** Fastify application instantiated in `backend/src/app.ts`
- **Modules (`backend/src/modules/`):**
  1. `auth/`: Authentication route handlers (`/api/admin/auth/*`) and session verifier
  2. `cms/`: News, Resources, Resource Categories, Site Content, Page Visits, Application endpoints
  3. `consultations/`: Public lead capture (`POST /api/public/consultations`) and admin review/status updates
- **Error Handling:** Centralized Fastify error handler; returns `{ success: false, message: string, code: string }`
- **Security:** Rate limiting per IP on login and consultation endpoints; CORS restricted to `PUBLIC_APP_URL` and `ADMIN_APP_URL`

---

## 10. API Inventory
| Method | Path | Auth Required | Role / Permission | Purpose | Source File |
|---|---|---|---|---|---|
| `GET` | `/health` | No | Public | Health check | `backend/src/app.ts` |
| `GET` | `/ready` | No | Public | Database readiness check | `backend/src/app.ts` |
| `POST` | `/api/public/consultations` | No (Rate limit 5/10m) | Public | Receive consultation form | `consultations.routes.ts` |
| `POST` | `/api/public/visits` | No | Public | Analytics page visit logging | `cms.routes.ts` |
| `GET` | `/api/public/news` | No | Public | Paginated published news articles | `cms.routes.ts` |
| `GET` | `/api/public/news/:slug` | No | Public | Single published news article | `cms.routes.ts` |
| `GET` | `/api/public/resources` | No | Public | List published resources & categories | `cms.routes.ts` |
| `GET` | `/api/public/site-content` | No | Public | Published key-value site content | `cms.routes.ts` |
| `POST` | `/api/admin/auth/login` | No (Rate limit 20/15m)| Public | Admin login | `auth.routes.ts` / `admin/.../login/route.ts` |
| `GET` | `/api/admin/auth/me` | Cookie Session | Authenticated Admin | Get current admin info & permissions | `auth.routes.ts` |
| `POST` | `/api/admin/auth/logout` | Cookie Session | Authenticated Admin | Logout and revoke session | `auth.routes.ts` |
| `GET` | `/api/admin/dashboard` | Cookie Session | `dashboard.view` | Metric statistics & time series | `cms.routes.ts` |
| `GET` | `/api/admin/news` | Cookie Session | `news.view` | List all news posts (draft + published)| `cms.routes.ts` |
| `POST` | `/api/admin/news` | Cookie Session | `news.create` | Create news post | `cms.routes.ts` |
| `PUT` | `/api/admin/news/:id` | Cookie Session | `news.update` | Update news post | `cms.routes.ts` |
| `DELETE`| `/api/admin/news/:id` | Cookie Session | `news.delete` | Archive news post | `cms.routes.ts` |
| `GET` | `/api/admin/resources` | Cookie Session | `resources.view` | List all resources | `cms.routes.ts` |
| `POST` | `/api/admin/resources` | Cookie Session | `resources.create` | Create new resource | `cms.routes.ts` |
| `PUT` | `/api/admin/resources/:id` | Cookie Session | `resources.update` | Update resource | `cms.routes.ts` |
| `DELETE`| `/api/admin/resources/:id` | Cookie Session | `resources.delete` | Delete resource | `cms.routes.ts` |
| `GET` | `/api/admin/consultations` | Cookie Session | `consultations.view` | List consultations | `consultations.routes.ts` |
| `PATCH`| `/api/admin/consultations/:id/status`| Cookie Session | `consultations.update`| Update consultation status | `consultations.routes.ts` |
| `GET` | `/api/admin/users` | Cookie Session | `admins.view` | List admin users | `admin/.../users/route.ts` |
| `POST` | `/api/admin/users` | Cookie Session | `admins.create` | Create admin user | `admin/.../users/route.ts` |

---

## 11. Database Schema
Defined in `backend/prisma/schema.prisma` with models:
1. `Admin`: Admin accounts, Argon2 password hashes, role association, status (`ACTIVE`, `INACTIVE`, `LOCKED`), failed login tracking.
2. `Role`: Hierarchical roles (`SUPER_ADMIN` [Level 1], `ADMIN_LEVEL_2` [Level 2], `ADMIN_LEVEL_3` [Level 3]).
3. `Permission`: Fine-grained permission codes.
4. `RolePermission`: Many-to-many relationship linking `Role` and `Permission`.
5. `Session`: Opaque session tokens (SHA-256 hashed), expiration, IP address, User-Agent.
6. `Consultation`: Candidate consultation requests, preferred times, contact methods, assignment, and status (`NEW`, `RECEIVED`, `CONTACTING`, `CONSULTED`, `COMPLETED`, `UNREACHABLE`, `CANCELLED`).
7. `ConsultationNote`: Internal notes per consultation lead.
8. `ConsultationHistory`: Status transition audit trail per consultation lead.
9. `NewsPost`: Articles with localized content, status (`DRAFT`, `PUBLISHED`, `ARCHIVED`), categories, and sanitized HTML.
10. `ResourceFile`: Digital documents with metadata (issue date, issuing organization, document number), internal media URL, file type, file size.
11. `ResourceCategory`: Categories grouping resources.
12. `SiteContent`: Key-value JSON CMS store for localized page blocks.
13. `PageVisit`: Best-effort page view analytics tracking path, locale, visitor ID, timestamp.
14. `Application`: Student registration applications.
15. `AuditLog`: System security & mutation audit trail.

---

## 12. Authentication & Authorization
- **Authentication Scheme:**
  - Password hashed using Argon2id (`memoryCost: 65536, timeCost: 3, parallelism: 1`).
  - Session creates a random 32-byte opaque base64url token; SHA-256 hash stored in DB `Session` table.
  - Stored in browser via HTTP-only, `SameSite=Strict`, `Secure` (in production) cookie named `vgg_admin_session`.
  - Account lock after 5 consecutive failed attempts for 15 minutes.
  - Initial Super Admin account created with `mustChangePassword = true`.
- **Authorization / RBAC:**
  - Role Level hierarchy (Super Admin level 1 cannot be disabled/deleted by lower admins).
  - Explicit permission checking via `guard(request, reply, permission)` in backend and `requirePermission(code)` in admin.

---

## 13. Data Flow
### A. Public Consultation Lead Form
`User fills Form` ➔ `Client POST /api/consultations` (Honeypot + Validation) ➔ `Frontend Next.js Route` ➔ `Internal Fetch POST http://localhost:4000/api/public/consultations` ➔ `Zod Validation` ➔ `Prisma Database Transaction (Consultation + ConsultationHistory + AuditLog)` ➔ `Success Response (201)` ➔ `UI Success State displayed`.

### B. Admin News / Resource Publishing
`Admin Author in Admin UI` ➔ `Word .docx Upload or Manual RichText Form` ➔ `Mammoth .docx parse & MinIO image upload` ➔ `HTML Sanitization (sanitize-html)` ➔ `Admin POST /api/cms/news` ➔ `Backend /api/admin/news` (Session cookie auth + `news.create` check) ➔ `Prisma NewsPost created` ➔ `Available to Public via Next.js ISR/SSR on /news`.

---

## 14. Asset System
- **Public Assets Location:** `frontend/public/`
  - Logos: `frontend/public/images/logo/logo-vgg.png`
  - Hero & Section Imagery: Structured per route in `frontend/public/images/pages/<feature>/content/` and `hero/`
  - Banner Video: `frontend/public/video/video-banner.webm`
- **Cloud-hosted Assets:**
  - Media CMS: đường dẫn nội bộ `/api/media/*`, proxy an toàn tới bucket MinIO private.
  - Unsplash allowed in remotePatterns.

---

## 15. Localization (VI / EN)
- **Mechanism:** `frontend/src/proxy.ts` (Next.js middleware) intercepts requests.
- **Rules:**
  - If URL lacks a valid locale prefix (`/vi` or `/en`), it redirects to `/${defaultLocale}${pathname}` (default: `vi`).
  - It rewrites the internal Next.js request to the route without the locale prefix while adding `x-vgg-locale` and `x-vgg-pathname` request headers.
- **Client Links:** `LocalizedLink` uses `useLocale()` context to automatically prefix destination URLs with the active locale.
- **Translations:** Static text dictionaries in `frontend/src/messages/vi.json` and `en.json`. Dynamic content (News / Resources / SiteContent) supports `locale` column in PostgreSQL.

---

## 16. Deployment Architecture
- **Public Frontend:** Deployable on Vercel or Node.js server.
  - Requirement: Root Directory must be repository root so npm workspaces can resolve `@vgg/backend`.
  - Build command: `npm run build`
  - Start command: `npm run dev` or `npm start`
- **Admin Portal:** Deployable independently or alongside backend on Node.js server / Docker.
  - Build command: `npm run build:admin`
  - Port: 3001
- **Backend Service:** Standalone Fastify server.
  - Build command: `npm run build:backend`
  - Start command: `npm run dev:backend` or `npm start --workspace=backend`
  - Port: 4000

---

## 17. Environment Variables Reference
| Variable | Purpose | Used By |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | `backend`, `admin` |
| `NODE_ENV` | Runtime environment (`development`, `production`, `test`) | All packages |
| `BACKEND_HOST` | Host binding IP (default `0.0.0.0`) | `backend` |
| `BACKEND_PORT` | Fastify listening port (default `4000`) | `backend` |
| `PUBLIC_APP_URL` | Frontend origin for CORS and canonical URLs | `backend`, `frontend` |
| `ADMIN_APP_URL` | Admin origin for CORS | `backend`, `admin` |
| `BACKEND_INTERNAL_URL` | Internal backend URL for Next.js server-side fetches | `frontend`, `admin` |
| `ALLOWED_ORIGINS` | Comma-separated list of allowed origins | `frontend` |
| `STORAGE_*` | Endpoint, bucket và credential MinIO nội bộ | `admin`, `backend` |
| `INITIAL_ADMIN_USERNAME` | Bootstrap Super Admin username | `backend/prisma/bootstrap-admin.ts` |
| `INITIAL_ADMIN_PASSWORD` | Bootstrap Super Admin password | `backend/prisma/bootstrap-admin.ts` |
| `INITIAL_ADMIN_NAME` | Bootstrap Super Admin display name | `backend/prisma/bootstrap-admin.ts` |

---

## 18. Coding Conventions
1. **No Tailwind CSS:** Always use Vanilla CSS or CSS Modules following the CSS variables in `globals.css`.
2. **Path Aliasing:** Use `@/*` pointing to `frontend/src/*` in frontend, and `@/*` pointing to `admin/src/*` in admin.
3. **Component Boundaries:**
   - Single-feature UI belongs in `frontend/src/features/<feature>/components`.
   - Multi-feature shared UI belongs in `frontend/src/shared/components`.
   - Route composition stays thin in `frontend/src/app/(public)/<route>/page.tsx`.
4. **Links:** Always use `Link` from `@/i18n/components/LocalizedLink` in the frontend instead of `next/link` directly.
5. **Backend Decoupling:** `backend/` must remain framework-agnostic (never import Next.js or React in backend).

---

## 19. High-Impact Files
- `frontend/src/app/globals.css`: Global design tokens, layout resets, and shared styles. Any inadvertent change affects the entire public website.
- `frontend/src/app/layout.tsx`: Root layout, global fonts, analytics tracker, sticky CTAs, and metadata defaults.
- `frontend/src/proxy.ts`: Next.js middleware handling all locale routing and URL rewrites.
- `frontend/src/data/site.ts`: Primary navigation menu definitions, subpage metadata, and consultation programme dropdown lists.
- `frontend/src/shared/components/layout/SiteHeader.tsx` & `Header.tsx`: Navigation header used across every single page.
- `frontend/src/shared/components/layout/SiteFooter.tsx`: Universal footer and sticky buttons.
- `backend/prisma/schema.prisma`: Master database schema for admin, consultations, news, and resources.
- `backend/src/app.ts`: Fastify master plugin registration, CORS, error handling, and routing.

---

## 20. Important Notes Before Editing
1. Always verify if a component is shared before editing (`SiteHeader`, `SiteFooter`, `StickyActions`, `ResourcesConsultation`, `SectionPages`).
2. Do not hardcode Vietnamese slugs or bypass the locale prefix; ensure `LocalizedLink` is preserved.
3. Do not modify backend validation rules in `backend/src/consultation.ts` without checking frontend form schema compatibility.
4. Always test with `npm run typecheck`, `npm run lint`, and `npm run test` across all workspaces.
