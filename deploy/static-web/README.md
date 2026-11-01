# Website tĩnh — sdh.vlu.edu.vn

Gói này chứa HTML/CSS/JavaScript, ảnh, font và tài liệu để Nginx phục vụ trực tiếp. Không chạy Node.js, `server.js`, npm hoặc service frontend trên máy chủ để hiển thị website.

## Phạm vi nội dung

- Hai đường dẫn ngôn ngữ `/vi/` và `/en/`, các trang giới thiệu, tuyển sinh, chương trình đào tạo, nghiên cứu, tin tức, tài nguyên, hành trình người học.
- Chỉ sử dụng nội dung có sẵn trong mã nguồn theo yêu cầu. Không nhập database từ ZIP cũ và không đọc dữ liệu CMS đang chạy.
- Tin tức dùng các thẻ bài mẫu trong `frontend/src/features/news/demo-posts.ts`; liên kết dẫn đến bài gốc trên website VLU. Tài nguyên dùng danh mục mẫu và các PDF có sẵn trong mã nguồn. Không coi đây là bản sao dữ liệu CMS production.
- Bản tiếng Anh dùng bản dịch có sẵn; nội dung chưa được dịch trong mã nguồn vẫn giữ nguyên.
- Ảnh đã dùng URL bên ngoài vẫn được tải từ các URL đó; đây là website tĩnh, không phải bản xem hoàn toàn offline.
- Các bộ lọc chương trình, tin tức và tài nguyên chạy trong trình duyệt. Tài liệu PDF mở trực tiếp, không qua API Next.js.

## Cấu trúc ZIP

```text
web/                     # Copy nội dung vào document root Nginx
  vi/index.html
  en/index.html
  vi/programmes/...
  en/programmes/...
  _next/static/...
  images/ fonts/ documents/...
nginx/
  sdh.vlu.edu.vn.conf
  sdh-static-routes.conf
README.md
VERIFICATION.json
```

Không có `.next/server`, `node_modules`, database hoặc thông tin đăng nhập trong gói web.

## Triển khai với cấu hình IT hiện tại

1. Sao lưu thư mục web và cấu hình Nginx đang chạy.
2. Đặt **nội dung bên trong `web/`** vào `/var/www/sdh.vlu.edu.vn/`. Ví dụ đường dẫn trang chủ tiếng Việt phải là `/var/www/sdh.vlu.edu.vn/vi/index.html`.
3. Đặt `nginx/sdh-static-routes.conf` vào `/etc/nginx/snippets/sdh-static-routes.conf` và dùng file site đi kèm sau khi đối chiếu cấu hình riêng của IT.
4. Giữ chứng chỉ đang có tại `/var/ssl/fullchain.pem`, `/var/ssl/private.key`. Chạy `sudo nginx -t`, sau đó `sudo systemctl reload nginx` khi kiểm tra đạt.
5. Kiểm tra trang chủ, một trang ngành, đổi ngôn ngữ, lọc tin tức và mở PDF. Chỉ sau khi website tĩnh hoạt động đúng mới dừng/vô hiệu hóa `vgg-frontend.service` cũ; Nginx mới không dùng cổng 3000.

## CMS và backend

Gói này **chỉ thay frontend website**. CMS `/cms` và backend `/gateway` vẫn dùng các service riêng từ gói native đã bàn giao nếu cần tiếp tục sử dụng.

Nginx đi kèm chuyển tiếp:

| URL | Upstream |
|---|---|
| `/cms`, `/cms/*` | `127.0.0.1:3001`, giữ nguyên prefix |
| `/gateway/health` | `127.0.0.1:4000/health` |
| `/gateway/api/public/*` | `127.0.0.1:4000/api/public/*` |
| `/api/consultations` | `127.0.0.1:4000/api/public/consultations` |
| `/api/analytics/visit` | `127.0.0.1:4000/api/public/visits` |

Nếu không chạy backend, website vẫn hiển thị nội dung tĩnh nhưng form tư vấn không lưu đăng ký và không ghi nhận thống kê. Không hiển thị thông báo gửi thành công giả. Việc sửa nội dung trong CMS **không tự cập nhật** gói tĩnh này; phải cập nhật nguồn nội dung và build/triển khai lại.

Các đường dẫn chuyên mục cũ được Nginx chuyển đến trang hoặc anchor tương ứng. URL không tồn tại trả 404; không chuyển mọi URL về trang chủ.

## Build lại

Từ thư mục gốc dự án, trên máy phát triển có Docker Linux:

```sh
docker build --platform linux/amd64 -f deploy/static-web/Dockerfile --target export --output type=local,dest=outputs/static-web .
```

Chuyển đổi được thực hiện trong container tạm: loại API/server proxy khỏi frontend, tạo trang hai ngôn ngữ, tắt tối ưu ảnh phía server và xuất HTML. Mã nguồn frontend chạy Node.js ban đầu được giữ nguyên.

Xem `VERIFICATION.json` để biết các kiểm tra thực tế đã chạy và giới hạn. Gói chưa được triển khai lên server IT.
