"use client";
type Row = Record<string, string>;
export function CurriculumEditor({ items, onChange, disabled }: { items: Row[]; onChange: (items: Row[]) => void; disabled: boolean }) {
  const update = (index: number, key: string, value: string) => onChange(items.map((row, i) => i === index ? { ...row, [key]: value } : row));
  const move = (index: number, offset: number) => {
    const next = [...items];
    [next[index], next[index + offset]] = [next[index + offset], next[index]];
    onChange(next);
  };
  return <fieldset disabled={disabled}>
    <legend>Bảng học phần</legend>
    <p>Lưu bảng này thay toàn bộ khung học phần của riêng ngành đang sửa. Nhập đúng dữ liệu đã được phê duyệt; tổng tín chỉ chương trình được quản lý riêng trong Thông tin định danh.</p>
    <div style={{ overflowX: "auto", maxWidth: "100%" }} tabIndex={0} role="region" aria-label="Bảng học phần, cuộn ngang trên màn hình nhỏ">
      <table style={{ width: "100%", minWidth: 720, borderCollapse: "collapse" }}><caption>Học phần theo thứ tự hiển thị</caption><thead><tr>{["Tên học phần", "Tín chỉ", "Nhóm / Học kỳ", "Định hướng", "Ghi chú", "Thao tác"].map((label) => <th scope="col" key={label} style={{ textAlign: "left", padding: 8 }}>{label}</th>)}</tr></thead><tbody>
        {items.map((row,index) => <tr key={index}>
          {["name", "credits", "group", "track", "note"].map((key) => <td key={key} style={{ padding: 6, verticalAlign: "top" }}>{key === "track" ? <select aria-label={`Định hướng học phần ${index+1}`} value={row[key] ?? "Ứng dụng"} onChange={(event) => update(index,key,event.target.value)}><option>Ứng dụng</option><option>Nghiên cứu</option></select> : <input aria-label={`${({name:"Tên",credits:"Tín chỉ",group:"Nhóm",note:"Ghi chú"} as Record<string,string>)[key]} học phần ${index+1}`} type={key === "credits" ? "number" : "text"} min={key === "credits" ? 0 : undefined} max={key === "credits" ? 50 : undefined} step={key === "credits" ? .5 : undefined} value={row[key] ?? ""} onChange={(event) => update(index,key,event.target.value)} />}</td>)}
          <td><button type="button" aria-label={`Chuyển học phần ${index+1} lên`} disabled={index===0} onClick={() => move(index,-1)}>↑</button><button type="button" aria-label={`Chuyển học phần ${index+1} xuống`} disabled={index===items.length-1} onClick={() => move(index,1)}>↓</button><button type="button" aria-label={`Xóa học phần ${index+1}`} onClick={() => onChange(items.filter((_,i) => i !== index))}>Xóa</button></td>
        </tr>)}
      </tbody></table>
    </div>
    <p>{items.length} học phần · Tổng các dòng đã nhập: {items.reduce((total,row) => total + (Number.isFinite(Number(row.credits)) ? Number(row.credits) : 0),0)} tín chỉ. Không tự cộng thành tín chỉ tốt nghiệp khi có nhiều định hướng hoặc học phần tự chọn.</p>
    <button type="button" disabled={items.length >= 200} onClick={() => onChange([...items,{name:"",credits:"0",group:"",track:"Ứng dụng",note:""}])}>Thêm học phần</button>
  </fieldset>;
}
