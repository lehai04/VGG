import fs from 'node:fs/promises';
import { Workbook, SpreadsheetFile } from '@oai/artifact-tool';

const root='C:/Users/lepha/VGG';
const data=JSON.parse(await fs.readFile(`${root}/work/ba-build/data.json`,'utf8'));
const out=`${root}/docs/ba/02-requirements/VGG_REQ-WORKBOOK_v0.1_2026-09-04.xlsx`;
const previewDir=`${root}/work/ba-build/workbook-preview`;
await fs.mkdir(previewDir,{recursive:true});
const wb=Workbook.create();
const defs=[];
function add(name, headers, rows, widths){
  const s=wb.worksheets.add(name); s.showGridLines=false; s.freezePanes.freezeRows(1);
  const matrix=[headers,...rows]; const endCol=String.fromCharCode(64+headers.length);
  s.getRange(`A1:${endCol}${matrix.length}`).values=matrix;
  const all=s.getRange(`A1:${endCol}${matrix.length}`);
  all.format={font:{name:'Calibri',size:10,color:'#1F2937'},verticalAlignment:'top',wrapText:true,borders:{preset:'all',style:'thin',color:'#D1D5DB'}};
  s.getRange(`A1:${endCol}1`).format={fill:'#1F4D78',font:{name:'Calibri',size:10,bold:true,color:'#FFFFFF'},verticalAlignment:'center',wrapText:true,borders:{preset:'all',style:'thin',color:'#FFFFFF'},rowHeight:34};
  widths.forEach((w,i)=>s.getRangeByIndexes(0,i,matrix.length,1).format.columnWidth=w);
  if(matrix.length>1) s.getRange(`A2:${endCol}${matrix.length}`).format.rowHeight=48;
  const table=s.tables.add(`A1:${endCol}${matrix.length}`,true,`${name.replace(/[^A-Za-z0-9]/g,'')}Table`); table.style='TableStyleMedium2'; table.showFilterButton=true;
  defs.push({s,name}); return s;
}
const reqRows=data.requirements.map((r,i)=>[i+1,r[1],r[2],r[0],r[3],r[4],r[5],r[6],r[7],r[8],r[9],r[10],r[11],r[12]]);
const req=add('Requirements',['STT','Module','Role','Requirement ID','Tên chức năng','User Story','Functional Requirement','Business Rule ID','Acceptance Criteria','Priority','Complexity','Trạng thái','Nguồn','Ghi chú'],reqRows,[6,16,14,14,22,36,42,15,50,10,11,16,18,28]);
req.getRange(`J2:J${reqRows.length+1}`).dataValidation={rule:{type:'list',values:['Must','Should','Could','Won\'t']}};
req.getRange(`L2:L${reqRows.length+1}`).dataValidation={rule:{type:'list',values:['Đã xác nhận','Quan sát','Quan sát/Cần xác nhận','Quan sát một phần','Đề xuất BA','Cần xác nhận']}};

const permRows=[
 ['ROL-01','Khách truy cập','Không','Xem','Không','Chỉ tin công bố','Chỉ tài nguyên công bố','Tạo yêu cầu','Không','Không'],
 ['ROL-02','QTV Cấp 2','ADMIN_LEVEL_2','Xem','Có','CRUD theo permission','CRUD theo permission','Xem/Cập nhật','Không','Theo permission/TBD'],
 ['ROL-03','QTV Cấp 1','SUPER_ADMIN','Xem','Có','CRUD','CRUD','Xem/Cập nhật','Toàn quyền','Toàn quyền']
];
add('Role & Permission',['Role ID','Tên role','Mã hệ thống','Public','Dashboard','Tin tức','Tài nguyên','Tư vấn','Nhân sự','Application/Site/Audit'],permRows,[12,20,20,12,14,22,22,20,18,26]);
add('Business Rules',['Business Rule ID','Tên','Mô tả','Trạng thái/Nguồn'],data.rules.map(x=>[x[0],x[1],x[2],x[2].includes('TBD')||x[2].includes('cần xác nhận')?'Cần xác nhận':'Quan sát/Đề xuất — xem SRS']),[18,24,60,24]);
const dd=[
 ['Admin','username','Tên đăng nhập','varchar(50)','Có','Duy nhất','Người quản trị'],['Admin','fullName','Họ tên cán bộ','varchar(120)','Có','Tối đa 120 ký tự','Người quản trị'],['Admin','email','Email','varchar(190)','Không','Định dạng email','Người quản trị'],['Admin','status','Trạng thái tài khoản','enum','Có','ACTIVE/INACTIVE/LOCKED','Hệ thống'],['NewsPost','slug','Đường dẫn tin','varchar(190)','Có','Duy nhất','Biên tập viên/Hệ thống'],['NewsPost','locale','Ngôn ngữ','varchar(5)','Có','Quan sát vi/en','Biên tập viên'],['NewsPost','content','HTML nội dung','text','Có','Sanitize allowlist','Biên tập viên'],['NewsPost','status','Trạng thái','enum','Có','DRAFT/PUBLISHED/ARCHIVED','Biên tập viên'],['ResourceFile','categoryId','Danh mục','cuid/FK','Có','Tồn tại; restrict delete','Biên tập viên'],['ResourceFile','fileUrl','URL nội bộ','varchar(1000)','Có','URL an toàn/proxy','MinIO'],['ResourceFile','fileSize','Kích thước byte','int','Có','25/50 MB cần thống nhất','Upload'],['Consultation','fullName','Họ tên người liên hệ','varchar(120)','Có','Tối đa 120','Khách'],['Consultation','email','Email liên hệ','varchar(190)','Có','Định dạng email','Khách'],['Consultation','phone','Số điện thoại','varchar(30)','Có','Quy tắc quốc gia TBD','Khách'],['Consultation','status','Trạng thái xử lý','enum','Có','7 giá trị; transition TBD','Hệ thống/Cán bộ'],['Application','metadata','Dữ liệu mở rộng','json','Không','Schema nghiệp vụ TBD','Nguồn tích hợp TBD'],['PageVisit','visitorId','Định danh visitor','varchar(100)','Không','Retention/consent TBD','Frontend']
];
add('Data Dictionary',['Entity','Trường dữ liệu','Ý nghĩa','Kiểu','Bắt buộc','Validation','Nguồn'],dd,[18,20,28,16,12,32,22]);
const tcByReq={}; for(const t of data.tests){for(const id of t[1].split(',')){tcByReq[id.trim()]=(tcByReq[id.trim()]||[]).concat(t[0]);}}
const ucMap={'AUTH-001':'UC-01','AUTH-002':'UC-04','NEWS-001':'UC-01','NEWS-002':'UC-01','NEWS-003':'UC-01','NEWS-004':'UC-01','NEWS-005':'UC-01','RES-001':'UC-03','RES-002':'UC-03','RES-003':'UC-03','CON-001':'UC-02','CON-002':'UC-02','CON-003':'UC-02','USR-001':'UC-04'};
const tr=data.requirements.map(r=>[r[0].startsWith('NFR')?'OBJ-04/05':r[0].startsWith('CON')?'OBJ-03':r[0].startsWith('PUB')?'OBJ-01':'OBJ-02',r[0],ucMap[r[0]]||'N/A',r[7],(tcByReq[r[0]]||[]).join(', ')||'TBD','']);
add('Traceability',['Mục tiêu nghiệp vụ','Requirement ID','Use Case','Acceptance Criteria','Test Case','Minh chứng'],tr,[22,16,14,55,18,26]);
add('Change Log',['Phiên bản','Ngày','Tác giả','Thay đổi','Trạng thái','Phê duyệt'],[['v0.1','2026-09-04','BA Draft','Khởi tạo hồ sơ từ tài liệu và hành vi quan sát được','Draft','Cần xác nhận']],[14,14,18,52,16,20]);
add('Open Questions & Decisions',['ID','Nhóm','Câu hỏi/Quyết định','Ưu tiên','Trạng thái','Owner','Hạn','Quyết định/Minh chứng'],data.openQuestions.map(q=>[q[0],q[1],q[2],q[3],q[4],'Cần xác nhận','','']),[14,18,58,12,18,18,14,34]);

for(const {s,name} of defs){
  const png=await wb.render({sheetName:name,autoCrop:'all',scale:0.8,format:'png'});
  await fs.writeFile(`${previewDir}/${name.replace(/[^A-Za-z0-9&]+/g,'_')}.png`,new Uint8Array(await png.arrayBuffer()));
}
const check=await wb.inspect({kind:'sheet,table',maxChars:5000,tableMaxRows:3,tableMaxCols:6});
await fs.writeFile(`${root}/work/ba-build/workbook-inspect.txt`,check.ndjson||String(check));
const x=await SpreadsheetFile.exportXlsx(wb); await x.save(out);
console.log('WORKBOOK_CREATED',out);
