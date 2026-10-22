# 06. HƯỚNG DẪN BUILD VÀ CHẠY ỨNG DỤNG (BUILD & RUN GUIDE)

Toàn bộ các lệnh dưới đây được lấy chính xác từ `package.json` của monorepo.

---

## 1. Cài Đặt Thư Viện (Installation)

```bash
# Cài đặt toàn bộ dependencies cho tất cả các workspace (Root, Frontend, Backend, Admin)
npm install

# Hoặc cài đặt chính xác trên môi trường CI / Production
npm ci
```

---

## 2. Kiểm Tra Chất Lượng Mã Nguồn (Lint, Typecheck, Test)

```bash
# 1. Kiểm tra cú pháp và quy tắc mã nguồn (ESLint)
npm run lint

# 2. Kiểm tra chặt chẽ kiểu dữ liệu TypeScript (tsc --noEmit)
npm run typecheck

# 3. Chạy toàn bộ bài kiểm thử tự động (Unit & Integration Tests)
npm run test

# 4. Lệnh kiểm tra toàn diện TẤT CẢ trong 1 bước (Khuyến nghị chạy trước khi deploy)
npm run check
```

---

## 3. Biên Dịch Ứng Dụng (Production Build)

```bash
# 1. Build Cổng thông tin Công khai (Frontend Next.js)
npm run build

# 2. Build Cổng Quản trị (Admin Next.js)
npm run build:admin

# 3. Biên dịch Backend API (Fastify TypeScript -> dist)
npm run build:backend

# 4. Build toàn bộ cả 3 phân hệ cùng lúc
npm run build && npm run build:admin && npm run build:backend
```

---

## 4. Khởi Chạy Môi Trường Production (Production Start)

### Phương án 1: Khởi chạy trực tiếp qua npm
```bash
# Terminal 1: Chạy Backend API (Port 4000)
npm run start --workspace=backend

# Terminal 2: Chạy Frontend Public (Port 3000)
npm run start --workspace=frontend

# Terminal 3: Chạy Admin Portal (Port 3001)
npm run start --workspace=admin
```

### Phương án 2: Khởi chạy qua PM2 Process Manager (Khuyến nghị cho Production)
```bash
pm2 start "npm run start --workspace=backend" --name "vgg-backend"
pm2 start "npm run start --workspace=frontend" --name "vgg-frontend"
pm2 start "npm run start --workspace=admin" --name "vgg-admin"
pm2 save
```

---

## 5. Môi Trường Phát Triển Cục Bộ (Local Development)

```bash
# Khởi động cơ sở dữ liệu Docker cục bộ
docker compose up -d

# Khởi động Backend API dev server (Port 4000)
npm run dev:backend

# Khởi động Admin Portal dev server (Port 3001)
npm run dev:admin

# Khởi động Frontend Public dev server (Port 3000)
npm run dev
```
