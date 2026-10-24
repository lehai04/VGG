from pathlib import Path
import json,csv
out=Path('outputs/vgg-content-audit')
rows=json.loads((out/'route-content-inventory.json').read_text(encoding='utf-8'))
inventory=json.loads((out/'repository-audit.json').read_text(encoding='utf-8'))
programme_ids={p['id'] for p in inventory['programmes']}
table=[]
for r in rows:
 route=r['route']
 if route in ['/sitemap.xml','/robots.txt','/missing-page-audit']: continue
 if route=='/programmes/marketing':
  status='Đã hoàn thành theo nguồn HTML'; note='204/204 đơn vị nội dung; cần xác minh mâu thuẫn tín chỉ tự chọn trong nguồn.'
 elif route.startswith('/programmes/') and route.split('/')[-1] in programme_ids:
  status='Đã đồng bộ cấu trúc; cần xác minh nội dung'; note='Giữ dữ liệu chuyên môn và số liệu cũ; chưa được cung cấp nguồn riêng mới.'
 elif len(r.get('chain',[]))>1:
  status='Đã sửa/kiểm tra điều hướng'; note='Đi tới nội dung hiện có; chuyên trang riêng cần nguồn nếu muốn triển khai thêm.'
 else:
  status='Đã kiểm tra giao diện/route; cần xác minh nội dung'; note='Giữ dữ liệu repository; chưa có nguồn mới cho nội dung nghiệp vụ.'
 table.append([route,' / '.join(r.get('h1',[])),r.get('status'),status,note])
with (out/'page-status.csv').open('w',encoding='utf-8-sig',newline='') as f:
 writer=csv.writer(f);writer.writerow(['Route','H1','HTTP','Trạng thái','Giới hạn']);writer.writerows(table)
report='''# Báo cáo audit nội dung website VGG — 24/10/2026

## Phạm vi và nguồn

Đã kiểm kê toàn bộ 79 URL public trong repository (gồm alias), 21 ngành, 19 file page/layout/not-found frontend, cùng cấu trúc admin/backend. Nguồn mới được chỉ định là `C:/Users/lepha/Downloads/thac-si-marketing.html`; script trong HTML không được thực thi. Bản đồ nguồn → trang → component → thiếu sót nằm ở `docs/VGG_CONTENT_AUDIT_MAPPING.md`.

Chỉ Marketing đủ nguồn mới để hoàn thiện nội dung chuyên môn. Những trang khác đã được rà soát, đồng bộ cấu trúc và sửa lỗi có thể chứng minh từ mã nguồn; nội dung chuyên môn/thu phí/quy định cũ được giữ lại và đánh dấu cần xác minh. Không coi kiểm tra HTTP thành công là xác minh tính chính xác của chính sách tuyển sinh.

## Nội dung đã hoàn thiện

- Marketing: tổng quan, 4 điểm nổi bật, 6 chuẩn đầu ra, 3 nhóm đối tượng, điều kiện dự tuyển/ngoại ngữ/bổ sung kiến thức, 6 hướng phát triển, 15 học phần song ngữ, 4 học kỳ, điều kiện tốt nghiệp, học phí 2027 và 3 đợt thanh toán, 6 khoản thu riêng, 6 FAQ và CTA/form tư vấn. Hai ảnh WebP được lấy nguyên từ nguồn, có alt và ghi công.
- Template 21 ngành: số tab khớp track thực tế, phân biệt nghiên cứu/ứng dụng, hiện EnglishName và dữ liệu tốt nghiệp, khối học phí dùng số liệu riêng từng ngành, anchor điều hướng và liên hệ thống nhất. Các mục chỉ có nguồn Marketing không lan sang ngành khác.
- 18 ngành: thay tiêu đề biên tập mẫu bằng nhãn đúng chức năng; nội dung năng lực không còn bị gọi sai là nhóm đối tượng. Giữ nguyên nội dung chuyên môn và số liệu.
- Form chung: đủ 21 lựa chọn đúng tên registry, chọn sẵn đúng ngành; giữ API contract. Backend nhận programme dạng chuỗi, không có whitelist 18 ngành ở route hiện hành.
- Sửa link/alias nghiên cứu, hợp tác quốc tế, người học, tài nguyên, 6 danh mục tin cũ; bảo toàn bài CMS thực nếu có, bài không tồn tại vẫn 404. Sửa URL bài nghiên cứu ngoài bị ghép sai; các anchor dẫn tới khối thực có trên trang.
- Sửa trùng ID học phí Tuyển sinh, bổ sung sitemap cho 21 ngành, bỏ nhãn tải PDF sai khi đích chỉ là form tư vấn.

## Các file chính

`frontend/src/data/programmes/marketing.ts`, `programmes.ts`, `curricula.ts`, `site.ts`, `programmes/shared-content.ts`; `ProgrammeDetailPage.tsx/.module.css`, `ProgrammeCurriculumGroups.tsx`, `ProgrammeSupplementaryContent.tsx/.module.css`; `ResourcesConsultation.tsx`; các page redirect và link helper của news/research; `SectionPages.tsx`, trang admissions, sitemap; tests frontend. Danh sách 18 file biên tập nằm trong `outputs/vgg-content-audit/editorial-label-changes.json`. Hướng dẫn cập nhật: `docs/PROGRAMME_CONTENT_GUIDE.md`.

Các thay đổi admin/backend/SEO có sẵn trong working tree được giữ nguyên. Không chạy migration, không đổi quyền hay đăng nhập, không publish.

## Kiểm chứng

- 82 GET local: 79 URL public, sitemap, robots, URL âm tính. Tất cả URL dự kiến hoạt động trả 200 sau redirect; chỉ URL âm tính trả 404.
- Phân tích HTML đã render: không còn duplicate ID, anchor nội bộ lỗi, ảnh local đang dùng bị thiếu hoặc các nhãn mẫu đã nhắm sửa. Phạm vi này không bao gồm mọi liên kết ngoài mạng.
- Đối chiếu Marketing: 204/204 đơn vị nội dung ngữ nghĩa của HTML có trong DOM main. Tất cả 39 accordion đã được mở kiểm tra mobile; bảng học phí/nhóm học phần không tràn ngang.
- Trình duyệt: 21 trang ngành desktop có một H1, track đúng số lượng, chọn đúng form và anchor hợp lệ. 9 trang tổng hợp desktop, 8 trang tổng hợp mobile và 2 ngành đại diện mobile được kiểm tra. Marketing kiểm tra desktop/mobile; không tuyên bố mọi breakpoint của mọi trang đã so ảnh pixel.
- Tìm Marketing trả 1 kết quả; lọc tiến sĩ trả 1 chương trình Khoa học Môi trường.
- Chi tiết lệnh kiểm tra được bổ sung ở phần kết quả cuối cùng bên dưới; log và ảnh nằm trong `outputs/vgg-content-audit`.

## Giới hạn cần xử lý bằng nguồn hoặc môi trường

1. HTML Marketing ghi nhóm tự chọn 1 chọn môn 3 hoặc 4 tín chỉ, nhưng tổng tự chọn ghi 15 tín chỉ. Đã giữ nguyên; cần đơn vị chuyên môn xác nhận trước khi thay số.
2. 20 ngành còn lại cần văn bản/HTML riêng để xác minh mã ngành, học phí, thời lượng, tín chỉ, điều kiện đầu vào/đầu ra và FAQ. Không nhân chính sách Marketing sang các ngành này.
3. Tin CMS, chuyên trang các chủ đề nghiên cứu/sự kiện/media và tài liệu chỉ được giữ theo dữ liệu hiện có. Alias hợp lệ không thay cho nội dung riêng chưa được cung cấp.
4. API tư vấn trong môi trường kiểm tra trả 502 khi backend không sẵn sàng; chưa xác minh gửi và lưu yêu cầu thành công. Không tạo dữ liệu đăng ký thật. Admin cần môi trường DB/tài khoản để kiểm tra UI được bảo vệ đầy đủ.
5. Ba asset thiếu chỉ được tham chiếu trong component cũ không hoạt động; không có ảnh local thiếu trên route đã render. Không kích hoạt lại component chứa số liệu demo để lấp nội dung.

## Kiểm kê từng URL public

CSV: `outputs/vgg-content-audit/page-status.csv`. URL động `/news/[slug]` phụ thuộc CMS và bài chưa có trả 404 đúng; không thể liệt kê toàn bộ bài backend từ nguồn HTML Marketing.

| Route | H1/đích hiển thị | HTTP | Trạng thái | Ghi chú |
|---|---|---|---|---|
'''
report+='\n'.join('| '+' | '.join(str(v).replace('|','/').replace('\n',' ') for v in r)+' |' for r in table)
Path('docs/VGG_WEBSITE_AUDIT_REPORT.md').write_text(report+'\n',encoding='utf-8')
print(f'Wrote {len(table)} page statuses and report')
