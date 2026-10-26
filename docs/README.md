# VGG documentation hub

Tài liệu ở đây là nguồn tham chiếu khi tạo hoặc sửa page/component. Đọc theo thứ tự:

1. [Architecture](./architecture.md) — nơi đặt code và boundary giữa các ứng dụng.
2. [Page map](./page-map.md) — route, layout, component và dữ liệu liên quan.
3. [Design system](./design-system.md) — token, typography, spacing và component rule.

## Chọn đúng nhóm tài liệu

- [Cây frontend hiện hành](../frontend/README.md): URL → component và nguồn dữ liệu.
- `handover/`: triển khai, vận hành, sao lưu và bàn giao.
- `ba/`, `testing/`: yêu cầu nghiệp vụ và hồ sơ kiểm thử.
- `cms/`, `CMS_PROGRAMME_WORKFLOW.md`, `CMS_VISUAL_EDITOR.md`: vận hành và biên tập CMS.
- Các file `*_UPDATE.md`, `*_REPORT.md`, `*_MAPPING.md`: lịch sử thay đổi và bằng chứng; không phải danh sách file hiện hành. Chúng có thể nhắc tới importer, template cũ hoặc log đã được dọn.
- [Công cụ bảo trì](../scripts/README.md), [bằng chứng kiểm tra](../outputs/README.md), [tư liệu đối chiếu](../work/README.md).

## Prompt gợi ý cho AI

`Reference docs/page-map.md and docs/design-system.md. Extend the existing [route] without changing unrelated sections. Reuse existing components/tokens first.`
