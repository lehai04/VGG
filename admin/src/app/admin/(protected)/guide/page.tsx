import { requireAdmin } from "@/lib/auth/authorization";
import Image from "next/image";
export const metadata = { title: "Hướng dẫn sử dụng CMS" };
export default async function Guide() {
  await requireAdmin();
  const steps = [
    [
      "Chọn trang và ngôn ngữ",
      "Mở Nội dung website, chọn trang cần sửa và Tiếng Việt hoặc English. Bản nháp của hai ngôn ngữ được lưu riêng.",
    ],
    [
      "Chỉnh sửa trực quan",
      "Click vào đoạn chữ trên bản xem trước. Nếu một cụm chữ xuất hiện nhiều lần, chọn đúng đường dẫn trong Khối nội dung để tránh sửa nhầm. Nhập nội dung ở bảng bên phải; bản xem trước sẽ tải lại sau khi bạn dừng gõ.",
    ],
    [
      "Lưu hoặc hủy theo nhóm",
      "Lưu nhóm này chỉ lưu các trường thuộc nhóm đang chọn. Hủy thay đổi nhóm đưa riêng nhóm đó về bản đã lưu; các nhóm khác vẫn giữ nội dung đang sửa.",
    ],
    [
      "Thay hình ảnh",
      "Chọn trường ảnh, mở thư viện hoặc tải ảnh từ máy. Hỗ trợ JPG, PNG, WebP, AVIF tối đa 8 MB. Hệ thống tối ưu ảnh; hãy kiểm tra tỉ lệ và vị trí ảnh trong bản xem trước.",
    ],
    [
      "Xuất bản",
      "Lưu tất cả nhóm đã sửa trước khi bấm Xuất bản. Quyền xuất bản được cấp riêng với quyền chỉnh sửa. Các bản nháp và bản xem trước không tự xuất hiện trên website chính.",
    ],
    [
      "Xử lý khi có người cùng sửa",
      "Nếu xuất hiện thông báo bản nháp đã thay đổi, ghi lại phần đang sửa và tải lại trang để nhận phiên bản mới. Hệ thống chặn việc ghi đè nội dung của người khác.",
    ],
    [
      "Giữ đúng bố cục",
      "Chỉnh sửa chữ và ảnh chỉ thay dữ liệu của trường đã chọn. Giữ văn bản vừa với vị trí hiển thị; nội dung dài hơn vẫn có thể làm khối cao hơn hoặc xuống dòng tự nhiên.",
    ],
    [
      "Quản lý danh sách và lãnh đạo",
      "Mở Quản lý danh sách trong bảng bên phải. Thêm họ tên, chức danh và chọn ảnh. Dùng Lên/Xuống để sắp xếp; Lưu danh sách hoặc Hủy danh sách độc lập với các nhóm chữ khác.",
    ],
    [
      "Thay đổi thứ tự section",
      "Mở Thứ tự và cấu trúc section. Lên/Xuống đổi thứ tự; Ẩn section có thể khôi phục. Thêm section văn bản tạo một khối theo mẫu có sẵn. Lưu cấu trúc rồi kiểm tra bản xem trước trước khi xuất bản.",
    ],
    [
      "Tạo ngành học",
      "Mở Quản lý chuyên ngành trong menu Admin, chọn Thêm ngành học và điền thông tin chung, mã ngành, ảnh và nội dung giới thiệu. Sau khi tạo, hoàn thiện các khối trong bản nháp. Chọn Chỉnh sửa & xem trước trên thẻ ngành để tiếp tục quản lý. Danh mục, số đếm, trang chi tiết, sitemap và form tư vấn nhận ngành mới khi xuất bản. Các khung học phần chưa cung cấp sẽ hiển thị đang cập nhật.",
    ],
    [
      "Import Excel",
      "Trong Lịch tư vấn, mở Import Excel và tải file mẫu. Xóa dòng minh họa trước khi nhập dữ liệu thật. Điền điện thoại ở định dạng văn bản để giữ số 0 đầu; tải lại file để kiểm tra. Sửa toàn bộ dòng báo lỗi trước khi bấm Xác nhận nhập. Hệ thống bỏ qua bản ghi trùng, giữ nguyên trạng thái xử lý của dữ liệu cũ. Chức năng này cần quyền consultations.import.",
    ],
    [
      "Học phần, gỡ công khai và khôi phục ngành",
      "Trong editor chuyên ngành, mở Quản lý danh sách: Bảng học phần để thêm, sửa, sắp xếp các dòng; lưu bảng sẽ thay khung học phần của riêng ngành đó. Mục tiêu, tổng quan có định dạng, hồ sơ và chính sách hỗ trợ có nhóm riêng. Từ danh sách chuyên ngành, người có quyền xuất bản có thể Gỡ công khai hoặc Chuyển vào thùng rác. Thùng rác giữ nội dung để Khôi phục; ngành chưa từng xuất bản vẫn là nháp sau khi khôi phục. Các thao tác này không xóa nội dung ngành khác.",
    ],
    [
      "Các mục quản trị khác",
      "Tin tức, sự kiện, tài nguyên, nhân sự, lịch tư vấn và tài khoản tiếp tục dùng các mục tương ứng trên menu. Super Admin quản lý quyền của từng tài khoản.",
    ],
    [
      "Chỉnh sửa trên điện thoại và tablet",
      "Trên khung hẹp, dùng Chỉnh sửa nội dung / Xem trước website để chuyển nhanh giữa hai phần. Trong Xem trước, chọn Vừa khung, Desktop, Tablet hoặc Điện thoại. Các kích thước mô phỏng tự thu vừa khung; dữ liệu đang sửa được giữ khi chuyển chế độ.",
    ],
    [
      "Thiết lập SEO",
      "Chọn đúng trang và ngôn ngữ, rồi mở SEO & chia sẻ mạng xã hội. Điền tiêu đề, mô tả, URL chuẩn và nội dung chia sẻ. Lưu nháp SEO giữ nguyên metadata công khai; Áp dụng SEO là thao tác xuất bản riêng và cần quyền xuất bản. Bản minh họa kết quả tìm kiếm không bảo đảm cách Google thực tế hiển thị.",
    ],
  ];
  return (
    <div className="admin-page">
      <header className="admin-page__head">
        <h1>Hướng dẫn sử dụng</h1>
        <p>Quy trình chỉnh sửa nội dung, kiểm tra bản nháp và xuất bản.</p>
      </header>
      <figure className="admin-card" style={{ padding: 20, marginBottom: 24 }}>
        <Image
          src="/images/cms-guide/visual-editor.png"
          alt="Giao diện chỉnh sửa trực quan: chọn trang, chọn Section, sửa nội dung và xem trước website"
          width={1265}
          height={712}
          style={{ width: "100%", maxWidth: 960, height: "auto" }}
        />
        <figcaption>
          Minh họa giao diện từ môi trường kiểm thử riêng.
        </figcaption>
      </figure>
      {steps.map(([title, text], index) => (
        <section
          className="admin-card"
          key={title}
          style={{ padding: 24, marginBottom: 16 }}
        >
          <h2 style={{ fontSize: 22 }}>
            {index + 1}. {title}
          </h2>
          <p>{text}</p>
        </section>
      ))}
    </div>
  );
}
