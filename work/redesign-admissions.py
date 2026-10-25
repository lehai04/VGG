import json,re
from pathlib import Path
from admissions_html import Node,parse
path=Path('frontend/src/features/admissions/reference-content.json')
backup=Path('work/admissions-before-redesign.json')
if not backup.exists():backup.write_text(path.read_text(encoding='utf-8'),encoding='utf-8')
source=json.loads(backup.read_text(encoding='utf-8'))
root=parse(source['html']);main=root.find('main')
ids={n.attrs['id']:n for n in root.walk() if 'id' in n.attrs}
def fragment(html):return parse(html).children[:]
def addhtml(node,html):
    for child in fragment(html):node.append(child)
def text(node,value):node.children=[];node.append(Node(text=value))
def step(num,id,title):
    node=Node('section',{'id':id,'class':'admission-step admission-step-'+num,'aria-labelledby':id+'-heading','data-step':num})
    addhtml(node,f'<div class="wrap admission-step-heading"><span class="admission-step-number">{num}</span><h2 id="{id}-heading">{title}</h2></div>')
    return node
def move(id,parent):
    node=ids[id];node.tag='div';parent.append(node)
    if id.startswith('ts-'):node.attrs['hidden']=''
    for child in node.walk():
        if child.tag=='h2':child.tag='h3'
    return node
hero=next(n for n in main.children if n.tag=='section' and n.attrs.get('class')=='hero')
hero.attrs.update({'data-step':'01','class':'hero admission-step admission-step-01'})
addhtml(hero,'<img class="admissions-hero-photo" src="/images/pages/discover/content/campus.jpg" alt="Khuôn viên Trường Đại học Văn Lang" loading="eager" fetchpriority="high">')
text(ids['hero-title'],'');addhtml(ids['hero-title'],'<span class="eyebrow hero-title-label">Tuyển sinh năm 2027</span>')
actions=next(n for n in hero.walk() if n.attrs.get('class')=='hero-actions')
second=next(n for n in actions.children if n.tag=='a');second.attrs['href']='/programmes';text(second,'Khám phá chương trình')
notice=step('02','thong-bao-lich-tuyen-sinh','Thông báo và lịch tuyển sinh')
addhtml(notice,'<div class="wrap admission-context"><label for="admissions-degree">Bậc đào tạo đang xem</label><select id="admissions-degree"><option value="master">Thạc sĩ · dữ liệu tuyển sinh 2027</option><option value="doctor">Tiến sĩ · thông báo hiện có năm 2026</option></select><p>Tiêu đề năm 2027 là định hướng của trang. Thông tin từng bậc áp dụng theo tài liệu được nêu bên dưới.</p></div>')
move('thong-tin',notice)
addhtml(notice,'<div class="wrap notice-documents"><article><span class="document-kind">THẠC SĨ 2027</span><h3>Thông tin tuyển sinh từ tài liệu hiện có</h3><p>Kế hoạch và các mốc bên dưới được kế thừa từ dữ liệu tuyển sinh đã cung cấp cho dự án. Chưa có tệp PDF thông báo Thạc sĩ 2027 trong thư viện hiện tại.</p><button class="btn secondary" data-notice data-notice-context="master">Xem nội dung thông báo</button></article><article><span class="document-kind">TIẾN SĨ 2026 · PDF</span><h3>Thông báo tuyển sinh tiến sĩ</h3><p>Tài liệu hiện có dành cho chương trình Khoa học Môi trường, năm 2026; không phải thông báo tuyển sinh năm 2027.</p><a class="btn secondary" href="/admissions/thong-bao-tuyen-sinh-tien-si-2026.pdf" target="_blank" rel="noopener">Xem PDF</a><a class="text-link" href="/admissions/thong-bao-tuyen-sinh-tien-si-2026.pdf" download>Tải thông báo</a></article></div>')
move('lich-tuyen-sinh',notice);move('ts-lich-tuyen-sinh',notice)
conditions=step('03','dieu-kien-phuong-thuc','Điều kiện và phương thức tuyển sinh')
tabs=ids['degree-master'].parent;conditions.append(tabs)
panel=Node('div',{'id':'degree-content','role':'tabpanel','aria-labelledby':'degree-master'})
conditions.append(panel)
for id in ['dieu-kien','ts-dieu-kien']:move(id,panel)
fees=step('04','hoc-phi-hoc-bong','Học phí và chính sách học bổng')
for id in ['hoc-phi','ts-hoc-phi']:move(id,fees)
docs=step('05','ho-so-du-tuyen','Hồ sơ dự tuyển')
for id in ['ho-so','ts-ho-so']:move(id,docs)
process=step('06','quy-trinh-tuyen-sinh','Quy trình tuyển sinh')
for id in ['huong-dan','ts-huong-dan','ket-qua','ts-ket-qua']:move(id,process)
faq=step('07','cau-hoi-thuong-gap','Câu hỏi thường gặp (FAQ)')
for id in ['cau-hoi','ts-cau-hoi']:move(id,faq)
consult=ids['tu-van'];consult.attrs.update({'data-step':'08','class':consult.attrs.get('class','')+' admission-step admission-step-08'})
addhtml(consult,'<span id="consultation" class="consultation-anchor" aria-hidden="true"></span>')
text(ids['consult-title'],'Đăng ký dự tuyển / Nhận tư vấn')
form=ids['consultation-form'];form.attrs['method']='post'
for node in consult.walk():
    for child in node.children:
        if not child.tag:
            child.text=child.text.replace('Tư vấn qua email','Nhận tư vấn tuyển sinh').replace('Điền thông tin để soạn email gửi Viện Sau đại học.','Điền thông tin để Viện Sau đại học liên hệ và hỗ trợ bạn.')
formGrid=next(n for n in form.walk() if n.attrs.get('class')=='form-grid')
addhtml(formGrid,'<div class="field full"><label for="contact-degree">Bậc đào tạo quan tâm</label><select id="contact-degree" name="degree"><option value="master">Thạc sĩ</option><option value="doctor">Tiến sĩ</option></select></div><div class="field full consent-field"><label><input id="contact-consent" type="checkbox" name="consent" required> Tôi đồng ý để Viện liên hệ và sử dụng thông tin trên nhằm hỗ trợ tư vấn tuyển sinh.</label></div><div class="admissions-honeypot" aria-hidden="true"><label for="contact-website">Website</label><input id="contact-website" name="website" tabindex="-1" autocomplete="off"></div>')
text(ids['contact-name'],'') if False else None
ids['contact-name'].attrs.update({'autocomplete':'name','minlength':'2','maxlength':'120'})
ids['contact-email'].attrs['autocomplete']='email';ids['contact-phone'].attrs['autocomplete']='tel'
submit=next(n for n in form.walk() if n.tag=='button' and n.attrs.get('type')=='submit');text(submit,'Gửi yêu cầu tư vấn')
note=next(n for n in form.walk() if n.attrs.get('class')=='form-help-note');text(note,'Thông tin được gửi tới hệ thống tiếp nhận tư vấn của Viện. Bạn sẽ nhận thông báo khi hệ thống tiếp nhận thành công hoặc khi có lỗi.')
addhtml(form,'<div id="form-error" class="form-error" role="alert" hidden></div>')
nav=next(n for n in root.walk() if n.attrs.get('class')=='section-nav')
nav.children=[]
for id,label in [('thong-bao-lich-tuyen-sinh','Thông báo & lịch'),('dieu-kien-phuong-thuc','Điều kiện'),('hoc-phi-hoc-bong','Học phí & học bổng'),('ho-so-du-tuyen','Hồ sơ'),('quy-trinh-tuyen-sinh','Quy trình'),('cau-hoi-thuong-gap','FAQ'),('tu-van','Nhận tư vấn')]:addhtml(nav,f'<a href="#{id}">{label}</a>')
for child in main.children:child.parent=None
main.children=[]
navShell=Node('div',{'class':'section-nav-shell'});navShell.append(nav)
for node in [hero,navShell,notice,conditions,fees,docs,process,faq,consult]:node.parent=None;main.append(node)
for node in root.walk():
    if node.attrs.get('class')=='section-number':
        for child in node.children:
            if not child.tag:child.text=re.sub(r'^\s*\d+\s*/\s*','',child.text)
    if node.attrs.get('href')=='#chuong-trinh':node.attrs['href']='/programmes'
    if node.attrs.get('class')=='hero-title-label':node.attrs['class']='hero-title-label'
result=root.html().replace('Tiêu đề năm 2027 là định hướng của trang. Thông tin từng bậc áp dụng theo tài liệu được nêu bên dưới.','Thạc sĩ: thông tin tuyển sinh 2027. Tiến sĩ: thông báo PDF hiện có áp dụng năm 2026. Vui lòng chọn đúng bậc đào tạo để xem điều kiện và lịch tương ứng.').replace('Kế hoạch và các mốc bên dưới được kế thừa từ dữ liệu tuyển sinh đã cung cấp cho dự án. Chưa có tệp PDF thông báo Thạc sĩ 2027 trong thư viện hiện tại.','Tham khảo kế hoạch tuyển sinh và các mốc nhận hồ sơ bên dưới. Chưa có bản PDF thông báo Thạc sĩ 2027 để tải xuống tại đây; vui lòng liên hệ Viện để nhận văn bản chính thức.')
path.write_text(json.dumps({'html':result},ensure_ascii=False)+'\n',encoding='utf-8')


