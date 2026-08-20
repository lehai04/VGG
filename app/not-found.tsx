import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found" id="main-content">
      <p className="eyebrow">404 · KHÔNG TÌM THẤY</p>
      <h1>Trang bạn tìm kiếm không tồn tại.</h1>
      <p>Đường dẫn có thể đã thay đổi hoặc nội dung chưa được xuất bản.</p>
      <Link className="button coral" href="/">
        Về trang chủ →
      </Link>
    </main>
  );
}
