# Architecture & Flow Maps: VGG Platform

This document outlines the visual system architecture, authentication mechanisms, data flows, and routing behavior of the VGG Platform.

---

## 1. System Architecture Map

```mermaid
flowchart TD
    Client["Client Browser (Desktop / Mobile)"]

    subgraph FE ["Frontend App (Next.js - Port 3000)"]
        Proxy["Proxy Middleware (proxy.ts)\nLocale Rewrite: /vi, /en"]
        PublicApp["Public Routes: (public)/*\n(Discover, Programmes, Admissions,\nResearch, Student Success, News, Resources)"]
        FeApi["Public API Proxy\n(/api/consultations, /api/analytics, /api/resources)"]
    end

    subgraph AD ["Admin Portal (Next.js - Port 3001)"]
        AdminUI["Admin UI: /admin/*\n(Dashboard, News, Resources,\nConsultations, Users, Website)"]
        AdminAuthApi["Admin Auth Route Handlers\n(/api/admin/auth/*, /api/admin/users/*)"]
        AdminCmsProxy["Admin CMS Proxy\n(/api/cms/[...path])"]
        WordUpload["Word Import & File Upload\n(Mammoth + Cloudinary SDK)"]
    end

    subgraph BE ["Backend Service (Fastify - Port 4000)"]
        FastifyApp["Fastify HTTP Server (app.ts)"]
        AuthMod["Auth Module & Session Guard"]
        CmsMod["CMS Module (News, Resources, Site Content)"]
        ConsultMod["Consultations & Lead Module"]
    end

    subgraph DB ["Data & Storage Layer"]
        PG[("PostgreSQL 17 Database\n(Prisma ORM)")]
        Redis[("Redis 7 (Cache/Queue)")]
        Cloudinary[("Cloudinary Media Cloud\n(Images / PDF / Documents)")]
    end

    Client -->|HTTP 3000| Proxy
    Proxy --> PublicApp
    PublicApp -->|Client/Server API call| FeApi
    FeApi -->|Internal HTTP| FastifyApp

    Client -->|HTTP 3001| AdminUI
    AdminUI --> AdminAuthApi
    AdminUI --> AdminCmsProxy
    AdminUI --> WordUpload

    AdminAuthApi -->|Direct Prisma Query| PG
    WordUpload -->|Upload Files| Cloudinary
    AdminCmsProxy -->|Internal HTTP with Cookie| FastifyApp

    FastifyApp --> AuthMod
    FastifyApp --> CmsMod
    FastifyApp --> ConsultMod

    AuthMod --> PG
    CmsMod --> PG
    ConsultMod --> PG
```

---

## 2. Authentication & Protected Route Flow

```mermaid
sequenceDiagram
    autonumber
    actor Admin as Admin User
    participant AdminUI as Admin Browser (/admin/login)
    participant AdminServer as Admin Next.js Server (/api/admin/auth/login)
    participant DB as PostgreSQL (Prisma)
    participant Backend as Fastify Backend API

    Admin->>AdminUI: Enters Username & Password
    AdminUI->>AdminServer: POST /api/admin/auth/login
    AdminServer->>DB: Query Admin by username
    AdminServer->>AdminServer: Verify Argon2id Password Hash
    alt Invalid Password or Account Locked
        AdminServer->>DB: Record Failed Attempt & Audit Log
        AdminServer-->>AdminUI: 401 Unauthorized / 423 Locked
    else Valid Credentials
        AdminServer->>AdminServer: Generate 32-byte opaque token
        AdminServer->>DB: Save SHA-256(token) in Session table
        AdminServer->>DB: Write AuditLog (LOGIN_SUCCESS)
        AdminServer-->>AdminUI: 200 OK + Set-Cookie: vgg_admin_session (HttpOnly, SameSite=Strict)
        AdminUI->>AdminUI: Redirect to /admin/dashboard
    end

    opt API Request to CMS via Backend
        AdminUI->>AdminServer: GET /api/cms/news (with Cookie)
        AdminServer->>Backend: Forward GET /api/admin/news (Forward Cookie)
        Backend->>DB: Query Session & Validate Permissions (news.view)
        Backend-->>AdminServer: 200 OK (News list)
        AdminServer-->>AdminUI: 200 OK (Render News Manager)
    end
```

---

## 3. Public Consultation Form Data Flow

```mermaid
sequenceDiagram
    autonumber
    actor Candidate as Student / Candidate
    participant Form as ResourcesConsultation Form
    participant FeProxy as Frontend API (/api/consultations)
    participant BeApi as Backend API (/api/public/consultations)
    participant DB as PostgreSQL (Prisma)

    Candidate->>Form: Fills Name, Phone, Email, Programme, Consent
    Form->>Form: Verify honeypot field (website is empty)
    Form->>FeProxy: POST /api/consultations (JSON payload)
    FeProxy->>BeApi: Forward POST http://localhost:4000/api/public/consultations
    BeApi->>BeApi: Validate with Zod schema (createSchema)
    alt Validation Failure
        BeApi-->>FeProxy: 400 Bad Request (Validation message)
        FeProxy-->>Form: 400 Bad Request
        Form-->>Candidate: Display validation error
    else Validation Success
        BeApi->>DB: prisma.consultation.create (with ConsultationHistory & AuditLog)
        DB-->>BeApi: Saved Record ID
        BeApi-->>FeProxy: 201 Created ("Cảm ơn bạn. Đội ngũ VGG sẽ liên hệ...")
        FeProxy-->>Form: 200/201 OK
        Form->>Form: Reset form fields
        Form-->>Candidate: Show success message in UI
    end
```

---

## 4. News & Resource Document Lifecycle

```mermaid
flowchart TD
    subgraph AdminAction ["Admin CMS Publishing"]
        A1["Admin writes article or uploads .docx"] --> A2["Mammoth extracts HTML & Cloudinary uploads embedded images"]
        A2 --> A3["Sanitize HTML (sanitize-html)"]
        A3 --> A4["Admin submits POST /api/admin/news (Status: PUBLISHED / DRAFT)"]
        A4 --> A5["Fastify Backend validates with Zod & generates unique slug"]
        A5 --> A6["Prisma saves to news_posts table"]
    end

    subgraph ResourcePublishing ["Resource Document Upload"]
        R1["Admin uploads PDF/DOC/XLS"] --> R2["Validate file signature & size <= 10MB"]
        R2 --> R3["Upload to Cloudinary (raw file type)"]
        R3 --> R4["Post metadata to /api/admin/resources"]
        R4 --> R5["Prisma saves to resource_files table"]
    end

    subgraph PublicConsumption ["Public Web Consumption"]
        P1["User visits /vi/news"] --> P2["Next.js Server fetches /api/public/news with ISR (revalidate: 60s)"]
        P2 --> P3["User views News Article at /vi/news/[slug]"]

        PR1["User visits /vi/resources"] --> PR2["Next.js Server fetches /api/public/resources"]
        PR2 --> PR3["User downloads document via /api/resources/file?url=..."]
    end

    A6 -.-> P2
    R5 -.-> PR2
```

---

## 5. Localization & Routing Flow

```mermaid
flowchart TD
    Req["Incoming Request (e.g. /admissions or /vi/admissions)"] --> MW{"Next.js Proxy Middleware (proxy.ts)"}

    MW -->|Has locale prefix /vi or /en| CheckValid["x-vgg-locale header set to locale\nx-vgg-pathname set to full path"]
    MW -->|No locale prefix| RedirectDefault["307 Redirect to /vi + pathname"]

    CheckValid --> InternalRewrite["Internal Rewrite to underlying Next.js route: /(public)/admissions"]

    InternalRewrite --> Layout["RootLayout (layout.tsx)"]
    Layout --> ReadHeader["Reads x-vgg-locale header"]
    ReadHeader --> LocaleCtx["LocaleProvider passes dictionary (vi.json or en.json)"]
    LocaleCtx --> RenderPage["Renders AdmissionsPage with LocalizedLink & localized text"]
```
