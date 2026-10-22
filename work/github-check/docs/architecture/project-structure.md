# Cấu trúc project VGG

Project giữ ba workspace độc lập để frontend public, CMS admin và backend có thể build/deploy riêng mà không làm thay đổi URL hay giao diện hiện tại.

```text
vgg-platform/
├── frontend/
│   ├── public/                     # ảnh, logo và static assets
│   ├── src/
│   │   ├── app/
│   │   │   ├── (public)/           # toàn bộ route website; route group không xuất hiện trên URL
│   │   │   │   ├── admissions/
│   │   │   │   ├── discover/
│   │   │   │   ├── global/
│   │   │   │   ├── news/
│   │   │   │   ├── programmes/
│   │   │   │   ├── research/
│   │   │   │   ├── resources/
│   │   │   │   └── student-success/
│   │   │   ├── api/                # proxy API dành cho public frontend
│   │   │   ├── layout.tsx
│   │   │   ├── globals.css
│   │   │   └── home.css
│   │   ├── features/               # component thuộc đúng một chuyên mục
│   │   │   ├── home/components/
│   │   │   ├── discover/components/
│   │   │   ├── admissions/components/
│   │   │   ├── programmes/components/
│   │   │   ├── research/components/
│   │   │   └── content/components/
│   │   ├── shared/                 # thành phần được dùng bởi nhiều chuyên mục
│   │   │   ├── components/layout/
│   │   │   ├── components/ui/
│   │   │   └── analytics/components/
│   │   ├── i18n/components/
│   │   ├── data/
│   │   ├── lib/
│   │   ├── messages/               # vi.json và en.json
│   │   └── proxy.ts                # giữ URL /vi và /en
│   └── tests/
├── admin/
│   ├── src/
│   │   ├── app/                    # /admin và API admin
│   │   ├── components/             # auth, dashboard, CMS, user, layout
│   │   ├── lib/                    # session, RBAC, database, backend client
│   │   └── generated/prisma/
│   ├── prisma/
│   ├── scripts/
│   └── tests/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── modules/                # auth, CMS, consultations
│   │   ├── shared/                 # database và HTTP helpers
│   │   ├── app.ts
│   │   └── server.ts
│   ├── prisma/
│   └── tests/
└── docs/
    └── architecture/
```

## Quy tắc đặt file

1. Component chỉ dùng trong một chuyên mục đặt tại `frontend/src/features/<feature>/components`.
2. CSS Module nằm cạnh component mà nó định dạng.
3. Component được dùng bởi nhiều chuyên mục đặt trong `frontend/src/shared`.
4. Route public nằm trong `(public)` nên không có `/public` hoặc `/user` trên URL.
5. `frontend`, `admin` và `backend` không import UI trực tiếp của nhau; chúng giao tiếp qua API và shared database contract.
6. Không đổi slug tiếng Việt hiện tại. `proxy.ts` tiếp tục xử lý tiền tố `/vi` và `/en`.
7. CMS admin và Prisma giữ riêng trong workspace admin; backend public giữ riêng trong workspace backend.

## Thêm trang mới

- Tạo route trong chuyên mục tương ứng dưới `frontend/src/app/(public)`.
- Đặt component và CSS riêng trong `frontend/src/features/<feature>/components`.
- Chỉ chuyển component sang `shared` khi có ít nhất hai chuyên mục sử dụng.
- Nội dung có khả năng quản trị về sau cần đi qua data/service hoặc CMS API, không sao chép cứng sang nhiều component.
