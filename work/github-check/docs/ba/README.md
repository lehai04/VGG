# Hồ sơ BA — VGG Platform

**Phiên bản hiện hành:** v0.1 — **Trạng thái:** Draft — **Ngày:** 2026-09-04

## Danh mục

- `01-business/VGG_BRD_v0.1_2026-09-04.docx` / `.pdf`: Bối cảnh, mục tiêu, phạm vi, stakeholder, rủi ro và quyết định.
- `02-requirements/VGG_SRS_v0.1_2026-09-04.docx` / `.pdf`: Role, quy trình, yêu cầu, rules, dữ liệu, NFR và use case.
- `02-requirements/VGG_REQ-WORKBOOK_v0.1_2026-09-04.xlsx`: Nguồn quản lý yêu cầu và traceability.
- `03-diagrams/*.mmd`: Nguồn Mermaid có thể chỉnh sửa cho use case, activity và ERD.
- `04-uat/VGG_UAT-HANDOVER_v0.1_2026-09-04.docx` / `.pdf`: Kế hoạch UAT, kịch bản và checklist bàn giao.
- `05-reports/VGG_STAKEHOLDER-REPORT_v0.1_2026-09-04.docx` / `.pdf`: Báo cáo điều hành 2–4 trang.
- `archive/`: Chỉ lưu phiên bản lỗi thời; không dùng làm baseline hiện hành.

## Cách sử dụng và cập nhật

1. Workbook là nguồn quản lý Requirement/Rule/Traceability/Open Question; SRS tham chiếu ID thay vì sao chép toàn bộ.
2. Mọi thay đổi phải thêm Change Log, cập nhật version và trạng thái. Không ghi đè bản cũ; chuyển bản superseded vào `archive/`.
3. Chỉ chuyển `Draft → Reviewed → Approved` khi có người có thẩm quyền và bằng chứng.
4. Các nhãn nguồn: **Đã xác nhận trong tài liệu**, **Quan sát từ code/giao diện**, **Đề xuất BA**, **Cần xác nhận**. Tính năng có trong code không mặc nhiên là yêu cầu đã duyệt.
5. Không lưu mật khẩu, token, khóa API hoặc dữ liệu cá nhân thực trong hồ sơ BA/UAT.

## Nguồn khảo sát

- **SRC-01 — Tài liệu:** `README.md` — Tổng quan, cấu trúc, vai trò và hướng dẫn chạy
- **SRC-02 — Tài liệu:** `PROJECT_CONTEXT.md` — Kiến trúc, route, module và mô hình dữ liệu
- **SRC-03 — Tài liệu:** `docs/handover/*` — Triển khai, bảo mật, sao lưu, vận hành; các tuyên bố nghiệm thu chưa có minh chứng được đánh dấu cần xác nhận
- **SRC-04 — Mã nguồn:** `backend/prisma/schema.prisma` — Mô hình dữ liệu và enum quan sát được
- **SRC-05 — Mã nguồn:** `backend/src/modules/*` — API, validation, RBAC và luồng xử lý quan sát được
- **SRC-06 — Mã nguồn:** `admin/src/app và admin/src/components` — Màn hình quản trị, trình soạn thảo, upload, phân quyền quan sát được
- **SRC-07 — Mã nguồn/Giao diện:** `frontend/src/app và frontend/src/features` — Trang công khai, biểu mẫu, song ngữ và điều hướng quan sát được
- **SRC-08 — Cấu hình công khai:** `package.json, compose.yaml, *.env.example` — Phụ thuộc kỹ thuật; không đọc giá trị bí mật trong .env

## Kiểm soát chất lượng

Bản v0.1 phải được kiểm tra ID trùng, AC trống, mapping quyền, liên kết Requirement–Use Case–Test Case và hiển thị Word/PDF/Excel trước bàn giao.
