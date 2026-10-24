from pathlib import Path
from bs4 import BeautifulSoup
import json,base64,re
for slug,prefix,title,english,field,code in [('quan-tri-khach-san','quanTriKhachSan','Quản trị Khách sạn','Master of Hospitality Management','Du lịch & Khách sạn','8810201'),('quan-tri-kinh-doanh','quanTriKinhDoanh','Quản trị Kinh doanh','Master of Business Administration','Kinh doanh & Quản lý','8340101')]:
 source=Path('C:/Users/lepha/Downloads/thac-si-'+slug+'.html');s=BeautifulSoup(source.read_text(encoding='utf-8'),'html.parser');out=Path('outputs')/(slug+'-update');out.mkdir(exist_ok=True)
 def tx(e):return e.get_text(' ',strip=True) if e else ''
 def ps(e):return [tx(p) for p in e.select(':scope > p')]
 def sec(id):return s.select_one('#'+id)
 images=[]
 for i,img in enumerate(s.select('main img')):
  src=img['src']
  if src.startswith('data:'):
   ext={'image/webp':'webp','image/jpeg':'jpg','image/png':'png'}[src[5:].split(';')[0]];name=('programme-hero' if i==0 else 'programme-overview')+'.'+ext;p=Path('frontend/public/images/pages/programmes')/slug/name;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(base64.b64decode(src.split(',',1)[1]));src='/images/pages/programmes/'+slug+'/'+name
  images.append(src)
 hotel=slug=='quan-tri-khach-san';aud=sec('doi-tuong');ap=ps(aud.select_one('.admission-box'));curr=sec('chuong-trinh');rows=[]
 for tr in curr.select('tbody tr'):
  c=tr.select('td');rows.append({'code':tx(c[0]),'name':tx(c[1]),'credits':int(tx(c[2]))})
 boundaries=[(0,1,'I. Kiến thức chung',4),(1,6,'II. Kiến thức cơ sở',18),(6,11,'III. Chuyên ngành bắt buộc',17),(11,15,'IV. Chuyên ngành tự chọn',6),(15,17,'V. Thực tập và đề án',15)] if hotel else [(0,1,'I. Kiến thức chung',4),(1,4,'II. Kiến thức cơ sở',9),(4,10,'III. Chuyên ngành bắt buộc',19),(10,18,'IV. Chuyên ngành tự chọn',13),(18,21,'V. Thực tập và đề án',15)]
 groups=[]
 for a,b,label,credits in boundaries:
  courses=rows[a:b]
  if a==11 and hotel or a==10 and not hotel:
   for c in courses:c['elective']=True
  groups.append({'title':label,'totalCreditsLabel':str(credits)+' tín chỉ','courses':courses,**({'description':['Chọn 2/4 học phần tự chọn (6 tín chỉ).' if hotel else 'Chọn 13 tín chỉ trong nhóm tự chọn.']} if 'tự chọn' in label else {})})
 completion={'heading':'Thực tập và đề án tốt nghiệp','items':[tx(tr.select('td')[1])+' · '+tx(tr.select('td')[2])+' tín chỉ' for tr in curr.select('tbody tr')[-2 if hotel else -3:]]}
 summary=tx(curr.select_one('.programme-summary p'))
 if hotel:summary=summary.replace('16 tín chỉ chuyên ngành bắt buộc','17 tín chỉ chuyên ngành bắt buộc')
 track={'number':'05','title':'Định hướng ứng dụng','orientation':'Ứng dụng','subtitle':'18–24 tháng · 60 tín chỉ','graduationProject':'Đề án tốt nghiệp · 9 tín chỉ','intro':summary,'notes':[tx(curr.h2),tx(curr.select_one('.route'))],'generalFacts':[{'label':'Thời gian đào tạo','value':'18–24 tháng'},{'label':'Hình thức · Ngôn ngữ','value':'Chính quy · Tiếng Việt'}],'groups':groups,'completion':completion}
 requirements=[{'title':'Ngành tốt nghiệp có phù hợp?','paragraphs':ap[:2]},{'title':'Yêu cầu ngoại ngữ đầu vào','paragraphs':[ap[3]]},{'title':'Bổ sung kiến thức đầu vào','paragraphs':[ap[4]],'groups':[{'title':'01. Nhóm không cần bổ sung kiến thức','paragraphs':[ap[0]]},{'title':'02. Các hồ sơ cần bổ sung kiến thức','paragraphs':ap[1:3]}]}]
 fees=sec('hoc-phi');consult=sec('consultation');faqs=[{'question':tx(d.summary),'answer':tx(d.p)} for d in sec('faq').select('.faq-list details')];faqs[1]['answer']=ap[0]
 data={'hero':{'heroLead':tx(s.select_one('.hero-lead')),'heroSlogan':'FUTURE','heroImage':images[0],'imageAlt':s.select_one('.hero img')['alt']},'facts':{'quickFactsDetailed':[{'label':tx(e.small),'value':tx(e.strong)} for e in s.select('.facts .fact')]},'section01':{'sectionNumber':'01','overviewTitle':'Tổng quan chương trình','headline':tx(sec('tong-quan').h2),'overview':ps(sec('tong-quan').select_one('.overview-copy')),'overviewImage':images[1],'imageCredit':{'text':tx(sec('tong-quan').figcaption)},'tags':[]},'section02':{'sectionNumber':'02','highlights':[{'title':tx(e.h3),'text':tx(e.p)} for e in sec('diem-noi-bat').select('.highlight-grid article')],'outcomesHeading':tx(s.select_one('.outcomes summary')),'learningOutcomes':{'intro':'','items':[{'code':tx(e.b),'title':'','text':' '.join(str(t).strip() for t in e.find_all(string=True,recursive=False) if str(t).strip())} for e in s.select('.outcome')]}},'section03':{'sectionNumber':'03','audienceHeading':'Chương trình phù hợp với ai?','headline':tx(aud.h2),'intro':ps(aud.select_one('.admission > div')),'audience':[],'requirements':requirements},'section04':{'sectionNumber':'04','careerHeading':'Cơ hội nghề nghiệp và phát triển','headline':tx(sec('nghe-nghiep').h2),'careerImage':images[0],'careers':[{'title':tx(e.h3),'sub':tx(e.p)} for e in sec('nghe-nghiep').select('.career-grid article')]},'section05':{'sectionNumber':'05','curriculumIntro':[summary],'trackLabels':['Định hướng ứng dụng'],'graduationProjects':['Đề án tốt nghiệp · 9 tín chỉ'],'studyMode':'Chính quy tập trung','notes':track['notes'],'generalFacts':track['generalFacts'],'completion':completion},'consultation':{'ctaHeading':['Sẵn sàng cho bước học tiếp theo?'],'ctaBody':tx(consult.p),'formIntro':{'eyebrow':tx(consult.select_one('.eyebrow')),'titleLines':[tx(consult.h2)],'body':tx(consult.p),'benefits':[],'formTitle':tx(consult.h3)}},'faq':{'faqs':faqs},'fees':{'heading':tx(fees.h2),'intro':[tx(fees.select_one('.fees-grid > div > p'))],'intake':tx(fees.select_one('.eyebrow')),'language':'Tiếng Việt','total':tx(fees.select_one('.fee-total')),'installments':[{'label':tx(tr.th),'amount':tx(tr.td)} for tr in fees.select('.payment-table tr')],'additionalFees':[{'title':tx(li).split(':',1)[0],'amount':tx(li).split(':',1)[1].strip(),'note':''} for li in fees.select('.extra-fees li')],'notes':[tx(fees.select_one('.fee-note'))]}}
 programme={'id':slug,'code':code,'title':title,'englishTitle':english,'degree':'Thạc sĩ','field':field,'orientation':'Ứng dụng','credits':60,'duration':'18–24 tháng','studyMode':'Chính quy · Tiếng Việt','summary':data['hero']['heroLead'],'tuition':'85.000.000 VNĐ','intake':'Tuyển sinh thạc sĩ 2027'}
 shared={'hero':'hero','facts':'facts','section01':'overview','section02':'highlights','section05':'curriculum','consultation':'consultation','faq':'faq'}
 parts=[]
 for key,value in data.items():
  encoded=json.dumps(value,ensure_ascii=False,indent=2);parts.append('  '+key+': {\n'+('    ...programmeSharedContent.'+shared[key]+',\n' if key in shared else '')+'\n'.join('  '+line for line in encoded.splitlines()[1:-1])+'\n  },')
 path=Path('frontend/src/data/programmes')/(slug+'.ts')
 if not (out/'before.ts').exists():(out/'before.ts').write_bytes(path.read_bytes())
 result='// Nguồn: '+source.name+' do người dùng cung cấp.\nimport { programmeSharedContent } from "./shared-content";\nimport type { Programme, ProgrammePageContent } from "../programmes";\nimport type { CurriculumTrack } from "../curricula";\nexport const '+prefix+'PageContent: ProgrammePageContent = {\n'+'\n'.join(parts)+'\n};\nexport const '+prefix+'Programme: Programme = '+json.dumps(programme,ensure_ascii=False,indent=2)+';\nexport function get'+prefix[0].upper()+prefix[1:]+'Curricula(): CurriculumTrack[] { return '+json.dumps([track],ensure_ascii=False,indent=2)+'; }\n'
 path.write_text(result,encoding='utf-8');print(slug,len(rows),'courses',sum(c['credits'] for c in rows if not c.get('elective')),'mandatory')
