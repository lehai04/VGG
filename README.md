# VGG – Viện Sau đại học Văn Lang

Website thông tin chương trình sau đại học, tuyển sinh, nghiên cứu và dịch vụ học viên của VGG. Dự án sử dụng Next.js App Router, React và TypeScript.

## Cấu trúc dự án

```text
vgg-demo-vercel/
├── app/                    # Route, layout, metadata và API của Next.js
│   ├── api/consultations/  # Endpoint nhận yêu cầu tư vấn
│   ├── fonts/              # Font nhận diện Maison Neue
│   ├── [section]/          # Các trang nội dung và trang chi tiết
│   ├── globals.css         # Style nền tảng dùng chung
│   └── home.css            # Style riêng của trang chủ
├── components/
│   ├── home/               # Các section cấu thành trang chủ
│   ├── forms/              # Biểu mẫu và trạng thái nhập liệu
│   ├── layout/             # Header, footer và thành phần bố cục
│   └── sections/           # Khung trang nội dung và trang chi tiết
├── data/                   # Dữ liệu menu, chương trình và nội dung tĩnh
├── lib/                    # Validation và nghiệp vụ không phụ thuộc giao diện
├── public/                 # Logo, hình ảnh và favicon
├── tests/                  # Kiểm thử cấu trúc và chức năng trọng yếu
└── package.json            # Scripts và dependency của dự án
```

## Cấu trúc trang

Mỗi nhóm nội dung có route riêng để có thể chỉnh sửa độc lập:

```text
app/discover/          Về VGG
app/programmes/        Chương trình đào tạo
app/admissions/        Tuyển sinh
app/research/          Nghiên cứu
app/global/            Cơ hội quốc tế
app/student-success/   Hành trình học viên
app/news/              Tin tức và sự kiện
app/resources/         Tài nguyên
```

Mỗi nhóm hiện chỉ có một `page.tsx` tổng quan để chỉnh sửa độc lập; dự án không tạo route trang con. Giao diện khung nằm tại `components/sections/SectionPages.tsx`; menu và nội dung điều hướng nằm tại `data/site.ts`.

## Font nhận diện

Website tự lưu trữ bộ font Maison Neue trong `app/fonts` và nạp bằng `next/font/local`:

- Maison Neue Book/Medium/Demi/Bold cho nội dung, biểu mẫu và giao diện.
- Maison Neue Extended Bold/Black cho tiêu đề, số liệu và điểm nhấn thương hiệu.

Các biến CSS `--font-body` và `--font-display` được khai báo trong `app/globals.css`. Không tải font từ CDN bên ngoài.

## Yêu cầu

- Node.js 22.13 trở lên
- npm 10 trở lên

## Chạy local

```bash
npm ci
copy .env.example .env.local
npm run dev
```

Mở `http://localhost:3000`.

## Kiểm tra chất lượng

```bash
npm run check
```

Lệnh này lần lượt chạy ESLint, TypeScript, test và production build.

## Form tư vấn

API `POST /api/consultations` kiểm tra dữ liệu, origin, honeypot và giới hạn tần suất. Đặt `CONSULTATION_WEBHOOK_URL` trong `.env.local` để chuyển tiếp yêu cầu sang CRM hoặc workflow nội bộ. Nếu không cấu hình webhook, API vẫn xác nhận dữ liệu hợp lệ nhưng không lưu lâu dài.

## Triển khai Vercel

Import repository vào Vercel, khai báo các biến môi trường theo `.env.example` và dùng cấu hình Next.js mặc định. Build command là `npm run build`.
