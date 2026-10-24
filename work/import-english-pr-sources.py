from pathlib import Path
from bs4 import BeautifulSoup
import json,base64,re
for slug,prefix,title,english,field,code in [('ngon-ngu-anh','ngonNguAnh','Ngôn ngữ Anh','Master of English Language','Luật, Nhân văn & Truyền thông','8220201'),('quan-he-cong-chung','quanHeCongChung','Quan hệ Công chúng','Master of Public Relations','Luật, Nhân văn & Truyền thông','8320108')]:
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
 language=slug=='ngon-ngu-anh';finance=True;aud=sec('doi-tuong');ap=ps(aud.select_one('.admission-box'));curr=sec('chuong-trinh');tracks=[]
 for panel in curr.select('.panel'):
  research=panel['id']=='panel-nc';orientation='Nghiên cứu' if research else 'Ứng dụng';rows=[]
  for tr in panel.select('tbody tr'):
   c=tr.select('td');rows.append({'code':tx(c[0]),'name':tx(c[1]),'credits':int(tx(c[2]))})
  final_count=1 if language or research else 0
  summary=tx(panel.select_one('.programme-summary p'))
  completion={'heading':'Luận văn tốt nghiệp' if research else 'Thực tập và đề án tốt nghiệp','items':[r['name']+' · '+str(r['credits'])+' tín chỉ' for r in (rows[-final_count:] if final_count else [])]}
  if not final_count:completion['items']=['Thực tập 1: Trải nghiệm quốc tế truyền thông · 2 tín chỉ','Thực tập 2: Thực tập tại doanh nghiệp · 4 tín chỉ','Đề án tốt nghiệp · 9 tín chỉ (theo mô tả chương trình)']
  description=['Danh mục dưới đây gồm học phần và các lựa chọn theo cơ cấu chương trình; không phải tất cả học phần trong danh mục đều bắt buộc. Quy tắc lựa chọn theo phần tóm tắt chương trình.']
  groups=[{'title':'Danh mục học phần và lựa chọn','totalCreditsLabel':'Theo cơ cấu chương trình','description':description,'courses':rows[:-final_count] if final_count else rows},{'title':completion['heading'],'totalCreditsLabel':str(sum(r['credits'] for r in rows[-final_count:]))+' tín chỉ','courses':rows[-final_count:]}] if final_count else [{'title':'Danh mục học phần và lựa chọn','totalCreditsLabel':'Theo cơ cấu chương trình','description':description,'courses':rows}]
  tracks.append({'number':'05','title':'Định hướng '+orientation.lower(),'orientation':orientation,'subtitle':'18–24 tháng · '+('61' if not language and research else '60')+' tín chỉ','graduationProject':('Luận văn tốt nghiệp · '+('12' if language else '13')+' tín chỉ') if research else 'Đề án tốt nghiệp · 9 tín chỉ','intro':summary,'notes':[tx(curr.h2),tx(panel.select_one('.route'))],'generalFacts':[{'label':'Thời gian đào tạo','value':'18–24 tháng'},{'label':'Hình thức · Ngôn ngữ','value':'Chính quy · Tiếng Việt'}],'groups':groups,'completion':completion})
 track=tracks[0];summary=track['intro'];completion=track['completion']
 requirements=[{'title':'Ngành tốt nghiệp có phù hợp?','paragraphs':ap[:2]},{'title':'Yêu cầu ngoại ngữ đầu vào','paragraphs':[ap[4]]},{'title':'Điều kiện định hướng nghiên cứu','paragraphs':[ap[3]]},{'title':'Bổ sung kiến thức đầu vào','paragraphs':[ap[5]],'groups':[{'title':'01. Ngành phù hợp','paragraphs':[ap[0]]},{'title':'02. Đối chiếu hồ sơ và danh mục bổ sung','paragraphs':ap[1:3]}]}]
 fees=sec('hoc-phi');consult=sec('consultation');faqs=[{'question':tx(d.summary),'answer':tx(d.p)} for d in sec('faq').select('.faq-list details')];
 faqs[1 if language else 2]['answer']=ap[0]
 for faq in faqs:faq['answer']=faq['answer'].replace('&amp;','&')
 data={'hero':{'heroLead':tx(s.select_one('.hero-lead')),'heroSlogan':'FUTURE','heroImage':images[0],'imageAlt':s.select_one('.hero img')['alt']},'facts':{'quickFactsDetailed':[{'label':tx(e.small),'value':tx(e.strong)} for e in s.select('.facts .fact')]},'section01':{'sectionNumber':'01','overviewTitle':'Tổng quan chương trình','headline':tx(sec('tong-quan').h2),'overview':ps(sec('tong-quan').select_one('.overview-copy')),'overviewImage':images[1],'imageCredit':{'text':tx(sec('tong-quan').figcaption)},'tags':[]},'section02':{'sectionNumber':'02','highlights':[{'title':tx(e.h3),'text':tx(e.p)} for e in sec('diem-noi-bat').select('.highlight-grid article')],'outcomesHeading':tx(s.select_one('.outcomes summary')),'learningOutcomes':{'intro':'','items':[{'code':tx(e.b),'title':'','text':' '.join(str(t).strip() for t in e.find_all(string=True,recursive=False) if str(t).strip())} for e in s.select('.outcome')]}},'section03':{'sectionNumber':'03','audienceHeading':'Chương trình phù hợp với ai?','headline':tx(aud.h2),'intro':ps(aud.select_one('.admission > div')),'audience':[],'requirements':requirements},'section04':{'sectionNumber':'04','careerHeading':'Cơ hội nghề nghiệp và phát triển','headline':tx(sec('nghe-nghiep').h2),'careerImage':images[0],'careers':[{'title':tx(e.h3),'sub':tx(e.p)} for e in sec('nghe-nghiep').select('.career-grid article')]},'section05':{'sectionNumber':'05','curriculumIntro':[summary],'trackLabels':[t['title'] for t in tracks],'graduationProjects':[t['graduationProject'] for t in tracks],'studyMode':'Chính quy tập trung','notes':track['notes'],'generalFacts':track['generalFacts'],'completion':completion},'consultation':{'ctaHeading':['Sẵn sàng cho bước học tiếp theo?'],'ctaBody':tx(consult.p),'formIntro':{'eyebrow':tx(consult.select_one('.eyebrow')),'titleLines':[tx(consult.h2)],'body':tx(consult.p),'benefits':[],'formTitle':tx(consult.h3)}},'faq':{'faqs':faqs},'fees':{'heading':tx(fees.h2),'intro':[tx(fees.select_one('.fees-grid > div > p'))],'intake':tx(fees.select_one('.eyebrow')),'language':'Tiếng Việt','total':tx(fees.select_one('.fee-total')),'installments':[{'label':tx(tr.th),'amount':tx(tr.td)} for tr in fees.select('.payment-table tr')],'additionalFees':[{'title':tx(li).split(':',1)[0],'amount':tx(li).split(':',1)[1].strip(),'note':''} for li in fees.select('.extra-fees li')],'notes':[tx(fees.select_one('.fee-note'))]}}
 programme={'id':slug,'code':code,'title':title,'englishTitle':english,'degree':'Thạc sĩ','field':field,'orientation':'Ứng dụng và nghiên cứu' if finance else 'Nghiên cứu','credits':60,'duration':'18–24 tháng','studyMode':'Chính quy · Tiếng Việt','summary':data['hero']['heroLead'],'tuition':'85.000.000 VNĐ' if language else '110.000.000 VNĐ','intake':'Tuyển sinh thạc sĩ 2027'}
 programme['orientations']=['Ứng dụng','Nghiên cứu']
 data['section05']['trackCredits']=['60 tín chỉ','60 tín chỉ' if language else '61 tín chỉ']
 if not language:
  programme['creditsLabel']='60–61'
  data['section03']['requirements'].insert(1,{'title':'Phương thức tuyển sinh','paragraphs':['Tuyển sinh bằng xét tuyển kết hợp phỏng vấn.']})
  data['section03']['requirements'][3]['paragraphs']=[ap[3].split(' Tuyển sinh bằng')[0]]
 shared={'hero':'hero','facts':'facts','section01':'overview','section02':'highlights','section05':'curriculum','consultation':'consultation','faq':'faq'}
 parts=[]
 for key,value in data.items():
  encoded=json.dumps(value,ensure_ascii=False,indent=2);parts.append('  '+key+': {\n'+('    ...programmeSharedContent.'+shared[key]+',\n' if key in shared else '')+'\n'.join('  '+line for line in encoded.splitlines()[1:-1])+'\n  },')
 path=Path('frontend/src/data/programmes')/(slug+'.ts')
 if not (out/'before.ts').exists():(out/'before.ts').write_bytes(path.read_bytes())
 result='// Nguồn: '+source.name+' do người dùng cung cấp.\nimport { programmeSharedContent } from "./shared-content";\nimport type { Programme, ProgrammePageContent } from "../programmes";\nimport type { CurriculumTrack } from "../curricula";\nexport const '+prefix+'PageContent: ProgrammePageContent = {\n'+'\n'.join(parts)+'\n};\nexport const '+prefix+'Programme: Programme = '+json.dumps(programme,ensure_ascii=False,indent=2)+';\nexport function get'+prefix[0].upper()+prefix[1:]+'Curricula(): CurriculumTrack[] { return '+json.dumps(tracks,ensure_ascii=False,indent=2)+'; }\n'
 path.write_text(result,encoding='utf-8');print(slug,[(t['orientation'],sum(len(g['courses']) for g in t['groups'])) for t in tracks])
