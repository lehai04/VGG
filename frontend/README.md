# Website VGG

Next.js phục vụ trang VI/EN, thông tin chương trình, tuyển sinh, nghiên cứu, tin tức và tài liệu.
Các API `/api/consultations`, `/api/analytics/visit`, `/api/media` chuyển tiếp tới backend nội bộ.

`src/lib/website-content.ts` đọc nội dung public. `src/data` giữ nội dung nguồn và dữ liệu
dự phòng. Các component `ContentPageSections` và `ContentRichText` chỉ render nội dung.

Xem [hướng dẫn triển khai](../HANDOVER.md).
