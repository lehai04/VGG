"use client";

import { useEffect, useState } from "react";
import styles from "./CmsPrototype.module.css";

type Entry = { id: string; title: string; path: string };
type Screen = "overview" | "website" | "programmes" | "news" | "consultations";
type Draft = { title: string; summary: string; body: string };
const navigation: { id: Screen; label: string; icon: string }[] = [
  { id: "overview", label: "Tổng quan", icon: "◫" },
  { id: "website", label: "Nội dung website", icon: "▤" },
  { id: "programmes", label: "Chương trình đào tạo", icon: "▦" },
  { id: "news", label: "Tin tức", icon: "▧" },
  { id: "consultations", label: "Yêu cầu tư vấn", icon: "◎" },
];
const homeSections = ["Banner đầu trang", "Tìm chương trình", "Giới thiệu VGG", "Nghiên cứu", "Nhóm chương trình", "Tin tức", "Đăng ký tư vấn"];
const programmeSections = ["Thông tin ngành", "Banner", "Thông tin tóm tắt", "Tổng quan", "Điểm nổi bật", "Đối tượng và đầu vào", "Hướng phát triển", "Chương trình học", "Học phí", "Hồ sơ và hỗ trợ", "Lời mời đăng ký", "FAQ và liên hệ", "Form tư vấn"];
const blank: Draft = { title: "", summary: "", body: "" };

export function CmsPrototype({ programmes, sourcePages, homeTitle }: { programmes: Entry[]; sourcePages: Entry[]; homeTitle: string }) {
  const [screen, setScreen] = useState<Screen>("overview");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Entry | null>(null);
  const [section, setSection] = useState(0);
  const [draft, setDraft] = useState<Draft>(blank);
  const [saved, setSaved] = useState<Draft>(blank);
  const [message, setMessage] = useState("");
  const [review, setReview] = useState(false);
  const [preview, setPreview] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notes, setNotes] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const dirty = JSON.stringify(draft) !== JSON.stringify(saved);
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ""; };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
  function open(next: Screen, entry: Entry | null = null) {
    if (dirty && !window.confirm("Bỏ thay đổi chưa lưu trong bản thử?")) return;
    const initial = { ...blank, title: entry?.title ?? "" };
    setScreen(next); setSelected(entry); setSection(0); setQuery(""); setMessage("");
    setDraft(initial); setSaved(initial); setReview(false); setPreview(false); setMobileOpen(false);
  }
  function edit(field: keyof Draft, value: string) { setDraft((current) => ({ ...current, [field]: value })); setReview(false); }
  function save() { setSaved({ ...draft }); setMessage("Đã giữ bản nháp trong phiên thử này. Tải lại trang sẽ xóa thay đổi thử."); }
  function submit() {
    if (!draft.title.trim() || !draft.body.trim()) { setMessage("Điền tiêu đề và nội dung trước khi thử gửi duyệt. Lưu nháp vẫn được phép."); return; }
    setSaved({ ...draft }); setReview(true); setMessage("Đã mô phỏng chuyển sang Chờ duyệt. Không gửi dữ liệu hoặc thông báo thật.");
  }
  const currentLabel = navigation.find((item) => item.id === screen)?.label;
  const entries = screen === "programmes" ? programmes : sourcePages;
  const filtered = entries.filter((entry) => `${entry.title} ${entry.path}`.toLocaleLowerCase("vi").includes(query.toLocaleLowerCase("vi")));
  const composing = screen === "news" && selected !== null;
  const editing = selected !== null && (screen === "website" || screen === "programmes" || composing);

  return <div className={styles.app}>
    <a className={styles.skip} href="#cms-main">Đến nội dung chính</a>
    <aside className={`${styles.sidebar} ${mobileOpen ? styles.open : ""}`} aria-label="Điều hướng CMS">
      <div className={styles.brand}><span>V</span><div><strong>VGG</strong><small>CONTENT WORKSPACE</small></div></div>
      <p className={styles.navCaption}>KHÔNG GIAN LÀM VIỆC</p>
      <nav>{navigation.map((item) => <button type="button" key={item.id} aria-current={screen === item.id ? "page" : undefined} onClick={() => open(item.id)}><span aria-hidden="true">{item.icon}</span>{item.label}</button>)}</nav>
      <div className={styles.sidebarNote}><strong>Thiết kế theo website VGG</strong><p>Nội dung đúng vị trí.<br />Bố cục được giữ cố định.</p></div>
      <div className={styles.profile}><span>VG</span><div><strong>Phiên duyệt thiết kế</strong><small>Không kết nối dữ liệu thật</small></div></div>
    </aside>
    <div className={styles.workspace}>
      <header className={styles.topbar}><button className={styles.menu} aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>☰ <span>Menu</span></button><span>VGG <span className={styles.muted}>/ {currentLabel}</span></span><span className={styles.previewPill}>BẢN THỬ GIAO DIỆN</span></header>
      <div className={styles.notice}>Bản duyệt UX · Chỉ thao tác trong bộ nhớ trình duyệt · Không lưu hoặc xuất bản lên website. <a href="/admin/content">Mở CMS kết nối backend →</a></div>
      <main id="cms-main" className={styles.main}>
        <header className={styles.pageHead}><div><span className={styles.eyebrow}>QUẢN TRỊ NỘI DUNG VGG</span><h1>{editing ? (selected?.id === "new" ? "Tạo nội dung mới" : selected?.title) : currentLabel}</h1><p>{editing ? "Biên tập đúng vị trí. Cấu trúc và giao diện website được giữ nguyên." : "Một nơi quản lý nội dung, chương trình và công việc của bạn."}</p></div>
          {screen === "programmes" && !selected && <button className={styles.primary} onClick={() => open("programmes", { id: "new", title: "", path: "/programmes/[slug-moi]" })}>＋ Thêm ngành mới</button>}
          {screen === "news" && !selected && <button className={styles.primary} onClick={() => open("news", { id: "new", title: "", path: "/news/[slug]" })}>＋ Soạn bài</button>}
        </header>
        {message && <p role="status" className={styles.message}>{message}</p>}
        {screen === "overview" && <>
          <section className={styles.welcome}><div><span className={styles.eyebrow}>NỘI DUNG NHẤT QUÁN, QUẢN TRỊ RÕ RÀNG</span><h2>Bắt đầu từ công việc của bạn.</h2><p>Chọn trang cần cập nhật hoặc mở hồ sơ chuyên ngành. Mọi thay đổi được chuẩn bị trong bản nháp trước khi công khai.</p><button className={styles.primary} onClick={() => open("website")}>Quản lý nội dung website →</button></div><div className={styles.welcomeMark} aria-hidden="true">VGG<span>EDITORIAL<br />WORKSPACE</span></div></section>
          <div className={styles.cards}><article><small>DANH MỤC NGUỒN</small><strong>{programmes.length}</strong><p>Chuyên ngành trong mã nguồn</p><button onClick={() => open("programmes")}>Mở danh mục →</button></article><article><small>CẤU TRÚC NỘI DUNG</small><strong>{sourcePages.length}</strong><p>Trang và nhóm nội dung dùng chung</p><button onClick={() => open("website")}>Xem nội dung →</button></article><article><small>CÔNG VIỆC CẦN XỬ LÝ</small><strong>—</strong><p>Sẽ hiển thị sau khi kết nối dữ liệu và quyền thực tế.</p></article></div>
          <section className={styles.panel}><h2>Luồng biên tập thống nhất</h2><div className={styles.steps}>{["01 · Soạn bản nháp", "02 · Xem trước", "03 · Gửi duyệt", "04 · Xuất bản"].map((step) => <span key={step}>{step}</span>)}</div><p className={styles.muted}>Thử luồng soạn tin để kiểm tra biểu mẫu, lưu nháp và trạng thái chờ duyệt.</p><button className={styles.secondary} onClick={() => open("news", { id: "new", title: "", path: "/news/[slug]" })}>Thử soạn tin</button></section>
        </>}
        {(screen === "website" || screen === "programmes") && !selected && <section className={styles.panel}><div className={styles.listHead}><label>Tìm {screen === "programmes" ? "chuyên ngành" : "trang"}<input type="search" placeholder="Nhập tên hoặc đường dẫn…" value={query} onChange={(event) => setQuery(event.target.value)} /></label><span>{filtered.length} mục từ dữ liệu nguồn</span></div><div className={styles.tableWrap}><table><thead><tr><th>Nội dung</th><th>Nguồn</th><th>Cấu trúc</th><th><span className={styles.srOnly}>Thao tác</span></th></tr></thead><tbody>{filtered.map((entry) => <tr key={entry.id}><td><strong>{entry.title}</strong><small>{entry.path}</small></td><td><span className={styles.badge}>Mã nguồn hiện có</span></td><td><span className={styles.lock}>Cố định theo website</span></td><td><button className={styles.textButton} onClick={() => open(screen, entry)}>Mở biểu mẫu →</button></td></tr>)}</tbody></table></div>{filtered.length === 0 && <div className={styles.empty}>Không có nội dung phù hợp. Thử một từ khóa khác.</div>}</section>}
        {editing && <>
          <div className={styles.toolbar}><button className={styles.textButton} onClick={() => open(screen)}>← Danh sách</button><div><span className={styles.badge}>{review ? "Chờ duyệt · mô phỏng" : dirty ? "Có thay đổi chưa lưu" : "Bản nháp · phiên thử"}</span><button className={styles.secondary} onClick={save}>Lưu nháp thử</button><button className={styles.secondary} onClick={() => setPreview(!preview)}>{preview ? "Đóng tóm tắt" : "Xem tóm tắt"}</button><button className={styles.primary} onClick={submit}>Thử gửi duyệt</button></div></div>
          <div className={styles.editor}>
            {!composing && <aside className={styles.sectionNav}><strong>CÁC MỤC TRÊN TRANG</strong><p>Thứ tự cố định · mẫu biểu mẫu</p>{(screen === "programmes" ? programmeSections : homeSections).map((label, index) => <button key={label} aria-pressed={section === index} onClick={() => setSection(index)}><span>{String(index + 1).padStart(2, "0")}</span>{label}</button>)}<small>{screen === "website" && selected?.id !== "home" ? "Đang minh họa cách tổ chức mục bằng mẫu Trang chủ; chưa phải ánh xạ của trang được chọn." : "Các mục tùy chọn sẽ theo đúng dữ liệu và mẫu trang đã duyệt."}</small></aside>}
            <section className={styles.panel}><div className={styles.formHeading}><span className={styles.eyebrow}>{composing ? "BIÊN TẬP BÀI VIẾT" : `MỤC ${String(section + 1).padStart(2, "0")}`}</span><h2>{composing ? "Nội dung bài viết" : (screen === "programmes" ? programmeSections : homeSections)[section]}</h2><p>Biểu mẫu minh họa thao tác; các trường chi tiết sẽ được nối theo bảng ánh xạ đã duyệt.</p></div>
              <label className={styles.field}>{screen === "programmes" && section === 0 ? "Tên chuyên ngành" : "Tiêu đề"}<input value={draft.title} onChange={(event) => edit("title", event.target.value)} placeholder={screen === "website" ? homeTitle : "Nhập tiêu đề…"} /><small>Nội dung nhập thử không thay đổi website.</small></label>
              {screen === "programmes" && section === 0 && <div className={styles.template}><strong>Mẫu ngành hiện hữu · ProgrammeDetailPage</strong><p>Kế thừa bố cục và responsive. Nội dung ngành mới được nhập riêng, không sao chép học phí hoặc thông tin chuyên môn của ngành khác.</p></div>}
              <label className={styles.field}>Mô tả ngắn<textarea rows={3} value={draft.summary} onChange={(event) => edit("summary", event.target.value)} placeholder="Nhập mô tả…" /></label>
              <label className={styles.field}>Nội dung<textarea rows={9} value={draft.body} onChange={(event) => edit("body", event.target.value)} placeholder="Nội dung của mục đang biên tập…" /></label>
              <details className={styles.details}><summary>Đường dẫn và SEO</summary><p>Đường dẫn hiện tại: <code>{selected?.path}</code></p><p>URL hiện hữu được giữ nguyên. Biểu mẫu SEO chi tiết được triển khai sau khi duyệt UX.</p></details>
            </section>
            {preview && <aside className={styles.panel}><span className={styles.eyebrow}>TÓM TẮT DỮ LIỆU NHẬP THỬ</span><h2>{draft.title || "Chưa nhập tiêu đề"}</h2><p>{draft.summary}</p><p className={styles.bodyPreview}>{draft.body}</p><small>Đây không phải bản xem trước layout website. Preview thật sẽ sử dụng renderer hiện hữu khi kết nối backend.</small></aside>}
          </div>
        </>}
        {screen === "news" && !selected && <section className={styles.panel}><div className={styles.empty}><span className={styles.emptyIcon}>▧</span><h2>Không đọc dữ liệu tin tức thật trong bản thử</h2><p>Thử soạn một bài, lưu khi chưa hoàn thành và gửi duyệt để đánh giá luồng làm việc.</p><button className={styles.primary} onClick={() => open("news", { id: "new", title: "", path: "/news/[slug]" })}>Soạn bài thử</button></div></section>}
        {screen === "consultations" && <div className={styles.consultation}><section className={styles.panel}><span className={styles.eyebrow}>HỒ SƠ MINH HỌA · KHÔNG CÓ DỮ LIỆU CÁ NHÂN</span><h2>Chi tiết yêu cầu tư vấn</h2><p className={styles.muted}>Mẫu bố cục để duyệt cách phân công và ghi lại quá trình chăm sóc.</p><div className={styles.formGrid}><label className={styles.field}>Trạng thái xử lý<select><option>Chưa xử lý</option><option>Đang xử lý</option><option>Hoàn tất</option></select></label><label className={styles.field}>Kết quả tư vấn<select><option>Chưa có kết quả</option><option>Đã tư vấn</option><option>Chưa liên hệ được</option><option>Không còn nhu cầu</option></select></label><label className={styles.field}>Người phụ trách<select disabled><option>Kết nối danh sách nhân sự sau</option></select></label><label className={styles.field}>Lần liên hệ tiếp theo<input type="datetime-local" /></label></div><div className={styles.template}>Các lựa chọn trên chỉ tồn tại trong giao diện thử; chưa lưu vào hồ sơ thật.</div></section><section className={styles.panel}><h2>Nhật ký trao đổi</h2><label className={styles.field}>Ghi chú thử<textarea value={note} onChange={(event) => setNote(event.target.value)} rows={4} placeholder="Nội dung trao đổi, việc cần làm tiếp…" /></label><button className={styles.primary} disabled={!note.trim()} onClick={() => { setNotes((current) => [...current, note.trim()]); setNote(""); }}>Thêm ghi chú thử</button><ol className={styles.timeline}>{notes.map((item, index) => <li key={index}><small>Ghi chú trong phiên thử</small><p>{item}</p></li>)}</ol>{notes.length === 0 && <p className={styles.muted}>Chưa có ghi chú trong phiên thử.</p>}</section></div>}
        <footer className={styles.footer}>VGG CMS · Bản duyệt giai đoạn 2 <span>Website công khai và admin hiện tại được giữ nguyên.</span></footer>
      </main>
    </div>
  </div>;
}
