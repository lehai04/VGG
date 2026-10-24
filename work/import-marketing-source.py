from pathlib import Path
from bs4 import BeautifulSoup
import json, base64

source=Path('C:/Users/lepha/Downloads/thac-si-marketing.html')
soup=BeautifulSoup(source.read_text(encoding='utf-8'),'html.parser')
out=Path('outputs/vgg-content-audit')
def text(e): return ' '.join(e.stripped_strings) if e else ''
def own_text(e): return ' '.join(str(t).strip() for t in e.find_all(string=True,recursive=False) if str(t).strip())
def paragraphs(e): return [text(p) for p in e.select(':scope > p')]
def credit(e): return {'text':text(e),'href':e['href']} if e else None
def courses(table):
 result=[]
 for tr in table.select('tbody tr'):
  cells=tr.select('td');name=cells[0];english=name.select_one('small')
  result.append({'name':own_text(name),'englishName':text(english),'credits':int(text(cells[1]))})
 return result
def table_groups(container):
 result=[]
 for table in container.select('table'):
  scroll=table.parent;previous=scroll.find_previous_sibling('p',class_='course-subgroup-heading')
  title=text(previous) or table.get('aria-label','Học phần')
  rows=courses(table)
  for row in rows:
   if 'tự chọn' in title.lower(): row['elective']=True
  result.append({'title':title,'totalCreditsLabel':title if 'tự chọn' in title.lower() else str(sum(c['credits'] for c in rows))+' tín chỉ','courses':rows})
 return result

images=soup.select('main img')
image_names=['seminar-omnichannel.webp','seminar-trade-marketing.webp']
image_paths=[]
for image,name in zip(images,image_names):
 p=Path('frontend/public/images/pages/programmes/marketing')/name;p.parent.mkdir(parents=True,exist_ok=True)
 p.write_bytes(base64.b64decode(image['src'].split(',',1)[1]));image_paths.append('/images/pages/programmes/marketing/'+name)

hero=soup.select_one('.programme-hero');overview=soup.select_one('#tong-quan');high=soup.select_one('#diem-noi-bat');aud=soup.select_one('#doi-tuong');career=soup.select_one('#nghe-nghiep');curr=soup.select_one('#chuong-trinh');fees=soup.select_one('#hoc-phi');faq=soup.select_one('#faq');consult=soup.select_one('#consultation')

requirements=[]
req=aud.select_one('.research-requirement')
requirements.append({'title':text(req.strong),'paragraphs':[' '.join(str(t).strip() for t in req.find_all(string=True,recursive=False) if str(t).strip())]})
e=aud.select_one('.eligibility-summary');requirements.append({'title':text(e.h3),'paragraphs':paragraphs(e)})
for e in aud.select('.entry-condition'): requirements.append({'title':text(e.h3),'paragraphs':paragraphs(e)})
e=aud.select_one('.language-evidence');requirements.append({'title':text(e.summary),'paragraphs':paragraphs(e.select_one('.eligibility-content')),'points':[text(li) for li in e.select('li')]})
e=aud.select_one('.bsk-panel');bridge={'title':text(e.h3),'paragraphs':paragraphs(e)+[text(e.select_one('.bsk-purpose'))]+paragraphs(e.select_one('.bsk-footer')),'groups':[]}
for detail in e.select('details'):
 inner=detail.select_one('.eligibility-content');groups=[];current=None
 for child in inner.find_all(recursive=False):
  if child.name=='h4':
   current={'title':text(child),'paragraphs':[],'points':[]};groups.append(current)
  elif child.name=='ul':current['points'] += [text(li) for li in child.find_all('li',recursive=False)]
  else:current['paragraphs'].append(text(child))
 bridge['groups'].append({'title':text(detail.summary),'groups':groups})
requirements.append(bridge)

groups=[]
for detail in curr.select('.it-main > details.course-block'):
 title=text(detail.select_one('.course-summary-title'));label=text(detail.select_one('.credits-pill'));body=detail.select_one('.course-block-content')
 if len(body.select('table'))==1:
  groups.append({'title':title,'totalCreditsLabel':label,'description':paragraphs(body),'courses':courses(body.table)})
 else:
  for n,g in enumerate(table_groups(body)):
   g['title']=title+' · '+g['title']
   g['totalCreditsLabel']='18 tín chỉ bắt buộc' if n==0 else ['','Chọn 1 trong 2 học phần','Chọn 2 trong 3 học phần','Chọn 1 trong 2 học phần'][n]
   if n==0:g['description']=[text(p) for p in body.select(':scope > p') if '15 tín chỉ' in text(p) or p.get('class')==['elective-note']]+['Tổng kiến thức nghiên cứu và chuyên ngành: '+label]
   groups.append(g)
semesters=[]
for e in curr.select('.semester'):
 semesters.append({'title':text(e.h4),'subtitle':text(e.select_one('.semester-header strong')),'groups':table_groups(e.select_one('.semester-content'))})

data={
 'hero':{'heroLead':text(hero.select_one('p')),'heroImage':image_paths[0],'heroSlogan':'FUTURE','imageCredit':credit(hero.select_one('a[href*="/news/"]'))},
 'facts':{'quickFactsDetailed':[{'label':text(e.small),'value':own_text(e.strong),'detail':text(e.select_one('strong span'))} for e in soup.select('.facts-wrap .fact')]},
 'section01':{'sectionNumber':'01','overviewTitle':'Tổng quan chương trình','headline':text(overview.h2),'overview':paragraphs(overview.select_one('.overview-copy')),'overviewImage':image_paths[1],'imageAlt':images[1]['alt'],'imageCredit':credit(overview.select_one('a[href*="/news/"]')),'focusAreas':[text(e) for e in overview.select('.focus-tags li,.focus-tags span')],'ribbonTitle':text(overview.h3),'tags':[text(e) for e in overview.select('.ribbon-item,.overview-stat')]},
 'section02':{'sectionNumber':'02','highlights':[{'title':text(e.h3),'text':text(e.p)} for e in high.select('.highlight-card')],'learningOutcomes':{'intro':text(high.select_one('.outcomes-intro')),'items':[{'code':text(e.select_one('.plo-code')),'title':text(e.h3),'text':text(e.p)} for e in high.select('.outcome-card')]}},
 'section03':{'sectionNumber':'03','audienceHeading':'Chương trình phù hợp với ai?','headline':text(aud.h2),'intro':paragraphs(aud.select_one('.audience-top')),'audience':[{'title':text(e.h3),'text':text(e.p)} for e in aud.select('.audience-profile')],'requirements':requirements},
 'section04':{'sectionNumber':'04','careerHeading':'Cơ hội nghề nghiệp và phát triển','headline':text(career.h2),'intro':text(career.select_one('.career-intro')),'note':text(career.select_one('.career-note')),'careerImage':image_paths[0],'careers':[]},
 'section05':{'sectionNumber':'05','curriculumIntro':[text(curr.select_one('.track-overview'))],'trackLabels':['Định hướng nghiên cứu'],'graduationProjects':['Luận văn tốt nghiệp'],'studyMode':'Chính quy tập trung','generalFacts':[{'label':text(e.dt),'value':text(e.dd)} for e in curr.select('.curriculum-facts dl > div')],'notes':[text(curr.select_one('.credits-breakdown'))],'semesters':{'heading':text(curr.select_one('.study-plan > summary')),'intro':text(curr.select_one('.study-plan-intro')),'items':semesters},'completion':{'heading':text(curr.select_one('.graduation-box h3')),'items':[text(e) for e in curr.select('.graduation-box li')]}},
 'consultation':{'ctaHeading':[text(soup.select_one('.callout-banner h2'))],'ctaBody':text(soup.select_one('.callout-banner p'))},
 'faq':{'faqs':[{'question':text(e.summary),'answer':text(e.select_one('.faq-answer'))} for e in faq.select('.faq-list > details')]},
 'fees':{'heading':text(fees.h2),'intro':paragraphs(fees.select_one('.fees-intro')),'intake':text(fees.select_one('.fee-single-label')),'language':text(fees.select_one('#fee-language')),'total':text(fees.select_one('.fee-total')),'installments':[{'label':text(e.th),'amount':text(e.td)} for e in fees.select('.payment-table tr')],'additionalFees':[{'title':text(e.strong),'amount':text(e.select_one('span')),'note':text(e.p)} for e in fees.select('.additional-fees li')],'notes':[text(fees.select_one('.fee-detail-note')),text(fees.select_one('.fee-note'))]}
}
# The source includes supplementary facts outside <section> and nested curriculum tables.
data['section01']['focusAreas']=[text(e) for e in overview.select('.it-keywords span')]
data['hero']['imageAlt']=images[0]['alt']
data['section01']['tags']=[text(e) for e in overview.select('.orientation-summary li')]
data['section01']['link']={'text':'Khám phá khung chương trình','href':'#chuong-trinh','ariaLabel':'Khám phá khung chương trình Marketing'}
data['section02']['learningOutcomes']['items']=[{'code':text(e.select_one('.outcome-code')),'title':text(e.h3),'text':text(e.p)} for e in high.select('.outcome')]
data['section04']['intro']=text(career.select_one('.career-heading > p'))
data['section04']['note']=text(career.select_one('.career-footnote'))
data['section05']['completion']={'heading':text(curr.select_one('.graduation-summary h4')),'items':[text(e) for e in curr.select('.graduation-summary li')]}
intro=consult.select_one('.consult-intro')
data['consultation']['formIntro']={'eyebrow':text(intro.select_one('.eyebrow')),'titleLines':['Bắt đầu từ','mục tiêu của bạn.'],'body':text(intro.p),'benefits':[own_text(e) for e in intro.select('li')]}
data['consultation']['formIntro']['formTitle']=text(consult.select_one('.consultation-contact h3'))
data['consultation']['contactActions']=[{'text':text(e),'href':e['href'].replace('https://vgg-vgg4.vercel.app/vi','')} for e in consult.select('.consult-direct-actions a,.consultation-contact > .text-link')]
for e in career.select('.career-group'):
 for role in e.select('li, .career-role'):
  if role.h4:data['section04']['careers'].append({'group':text(e.h3),'title':text(role.h4),'sub':text(role.p)})

(out/'marketing-import-preview.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
(out/'marketing-curriculum-preview.json').write_text(json.dumps(groups,ensure_ascii=False,indent=2),encoding='utf-8')
assert len(data['facts']['quickFactsDetailed'])==6 and all(f['value'] for f in data['facts']['quickFactsDetailed'])
assert len(data['section02']['learningOutcomes']['items'])==6
assert len(data['section04']['careers'])==6 and len(data['section05']['completion']['items'])==4
assert sum(len(g['courses']) for g in groups)==15 and len(semesters)==4
path=Path('frontend/src/data/programmes/marketing.ts');backup=out/'before-source/data/programmes/marketing.ts';backup.parent.mkdir(parents=True,exist_ok=True)
if not backup.exists():backup.write_bytes(path.read_bytes())
shared={'hero':'hero','facts':'facts','section01':'overview','section02':'highlights','section05':'curriculum','consultation':'consultation','faq':'faq'}
fields=[]
for key,value in data.items():
 encoded=json.dumps(value,ensure_ascii=False,indent=2)
 fields.append(f'  {key}: {{\n'+(f'    ...programmeSharedContent.{shared[key]},\n' if key in shared else '')+'\n'.join('  '+line for line in encoded.splitlines()[1:-1])+'\n  },')
programme={'id':'marketing','code':'340115','title':'Marketing','englishTitle':'Master of Marketing','degree':'Thạc sĩ','field':'Kinh doanh & Quản lý','orientation':'Nghiên cứu','credits':60,'duration':'24 tháng','studyMode':'Chính quy tập trung, tiếng Việt','intake':'Tuyển sinh thạc sĩ 2027','summary':data['hero']['heroLead'],'schedule':'Buổi tối các ngày trong tuần và/hoặc thứ Bảy, Chủ nhật; thời khóa biểu theo từng học kỳ.','tuition':'90.000.000 VNĐ'}
specialized=groups[2:6]
specialized[0]['title']='Học phần bắt buộc · 18 tín chỉ'
for group in specialized[1:]: group['title']=group['title'].split(' · ',1)[1]
specialized[1]['description']=specialized[0].pop('description')[:2]
structured_groups=groups[:2]+[{'title':'III. Kiến thức nghiên cứu và chuyên ngành','totalCreditsLabel':'33 tín chỉ','courses':[],'subgroups':specialized}]+groups[6:]
track={'number':'05','title':'Định hướng nghiên cứu','subtitle':text(curr.select_one('.single-track-heading p')),'orientation':'Nghiên cứu','graduationProject':'Luận văn tốt nghiệp · 15 tín chỉ','groups':structured_groups}
path.write_text('''// Nguồn nội dung: thac-si-marketing.html do người dùng cung cấp ngày 24/10/2026.
// Giữ nguyên dữ liệu nguồn; không dùng các môn tự chọn để cộng tổng tín chỉ đăng ký.
import { programmeSharedContent } from "./shared-content";
import type { Programme, ProgrammePageContent } from "../programmes";
import type { CurriculumTrack } from "../curricula";

export const marketingPageContent: ProgrammePageContent = {
'''+ '\n'.join(fields)+'\n};\n\nexport const marketingProgramme: Programme = '+json.dumps(programme,ensure_ascii=False,indent=2)+';\n\nexport function getMarketingCurricula(): CurriculumTrack[] {\n  return '+json.dumps([track],ensure_ascii=False,indent=2)+';\n}\n',encoding='utf-8')
print(json.dumps({'facts':6,'highlights':4,'outcomes':6,'audience':3,'careers':6,'courses':15,'semesters':4,'completion':4,'fees':6,'faq':6},ensure_ascii=False))
