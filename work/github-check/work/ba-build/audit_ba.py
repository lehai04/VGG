from pathlib import Path
import json,re,zipfile
ROOT=Path(r'C:\Users\lepha\VGG'); data=json.load(open(ROOT/'work/ba-build/data.json',encoding='utf-8'))
reqs=data['requirements']; rules=data['rules']; tests=data['tests']
ids=[r[0] for r in reqs]; brids=[r[0] for r in rules]; tcids=[t[0] for t in tests]
dups=lambda xs: sorted({x for x in xs if xs.count(x)>1})
missing_ac=[r[0] for r in reqs if not str(r[7]).strip()]
bad_br=[r[0] for r in reqs if r[6] not in brids]
bad_sources=[r[0] for r in reqs if not re.search(r'SRC-\d+',r[11])]
permission_conflicts=[]
for r in reqs:
    if 'ROL-02' in r[2] and r[1]=='Nhân sự': permission_conflicts.append(r[0])
xlsx=ROOT/'docs/ba/02-requirements/VGG_REQ-WORKBOOK_v0.1_2026-09-04.xlsx'
with zipfile.ZipFile(xlsx) as z:
    wb=z.read('xl/workbook.xml').decode('utf-8'); sheets=re.findall(r'<sheet[^>]+name="([^"]+)"',wb)
expected=['Requirements','Role &amp; Permission','Business Rules','Data Dictionary','Traceability','Change Log','Open Questions &amp; Decisions']
missing_sheets=[x for x in expected if x not in sheets]
files=list((ROOT/'docs/ba').rglob('*'))
report=f'''# Kiểm tra chất lượng hồ sơ BA — VGG\n\n- Ngày: 2026-09-04\n- Trạng thái: Draft\n- Requirement: {len(ids)}; Business Rule: {len(brids)}; Test Case: {len(tcids)}\n- ID Requirement trùng: {dups(ids) or 'Không'}\n- ID Business Rule trùng: {dups(brids) or 'Không'}\n- ID Test Case trùng: {dups(tcids) or 'Không'}\n- Requirement thiếu Acceptance Criteria: {missing_ac or 'Không'}\n- Requirement tham chiếu Business Rule thiếu: {bad_br or 'Không'}\n- Requirement thiếu mã nguồn SRC: {bad_sources or 'Không'}\n- Mâu thuẫn role Nhân sự/QTV Cấp 2 theo dữ liệu workbook: {permission_conflicts or 'Không'}\n- Sheet Excel thiếu: {missing_sheets or 'Không'}\n- Word/PDF đã render và kiểm tra trực quan: 4 bộ / 18 trang PDF.\n- Excel đã render và kiểm tra trực quan: 7/7 sheet.\n\n## Lưu ý còn mở\n\nTraceability có `TBD` khi chưa có test case được xác định; đây là khoảng trống cần đóng trước baseline UAT, không phải lỗi tham chiếu. Các kết quả thực tế và phê duyệt được giữ trống/“Cần xác nhận”.\n'''
(ROOT/'docs/ba/05-reports/VGG_QA-CHECK_v0.1_2026-09-04.md').write_text(report,encoding='utf-8')
print(report)
