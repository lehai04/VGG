from pathlib import Path
from bs4 import BeautifulSoup
import json,base64

out=Path('outputs/biotech-update');out.mkdir(parents=True,exist_ok=True)
source=Path('C:/Users/lepha/Downloads/thac-si-cong-nghe-sinh-hoc.html')
soup=BeautifulSoup(source.read_text(encoding='utf-8'),'html.parser')
def text(e): return ' '.join(e.stripped_strings) if e else ''
def own(e): return ' '.join(str(t).strip() for t in e.find_all(string=True,recursive=False) if str(t).strip())
def paragraphs(e): return [text(p) for p in e.select(':scope > p')]
def credit(e): return {'text':text(e),'href':e['href']} if e else None
def courses(table,elective=False):
 result=[]
 for row in table.select('tbody tr'):
  cells=row.select('td');item={'name':own(cells[0]),'englishName':text(cells[0].small),'credits':int(text(cells[-1]))}
  if elective:item['elective']=True
  result.append(item)
 return result
def blocks(container,title):
 result={'title':title,'paragraphs':[],'groups':[]};current=result
 for child in container.find_all(recursive=False):
  if child.name=='h4':
   current={'title':text(child),'paragraphs':[],'points':[]};result['groups'].append(current)
  elif child.name=='ul':current.setdefault('points',[]).extend(text(li) for li in child.find_all('li',recursive=False))
  elif child.name=='p':current['paragraphs'].append(text(child))
 return result

images=soup.select('main img');paths=[]
for image,name in zip(images,['laboratory-microscope.webp','laboratory-equipment.webp']):
 mime=image['src'].split(';')[0]
 assert mime=='data:image/webp',mime
 p=Path('frontend/public/images/pages/programmes/cong-nghe-sinh-hoc')/name;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(base64.b64decode(image['src'].split(',',1)[1]));paths.append('/images/pages/programmes/cong-nghe-sinh-hoc/'+name)
hero=soup.select_one('.programme-hero');overview=soup.select_one('#tong-quan');high=soup.select_one('#diem-noi-bat');aud=soup.select_one('#doi-tuong');career=soup.select_one('#nghe-nghiep');curr=soup.select_one('#chuong-trinh');fees=soup.select_one('#hoc-phi');faq=soup.select_one('#faq');consult=soup.select_one('#consultation')
requirements=[]
for e in aud.select('.eligibility-summary,.entry-condition'):
 requirements.append({'title':text(e.h3),'paragraphs':paragraphs(e)})
e=aud.select_one('.language-evidence');requirements.append({'title':text(e.summary),'paragraphs':paragraphs(e.select_one('.eligibility-content')),'points':[text(li) for li in e.select('li')]})
e=aud.select_one('.bsk-panel');requirements.append({'title':text(e.h3),'paragraphs':paragraphs(e)+[text(e.select_one('.bsk-purpose'))]+paragraphs(e.select_one('.bsk-footer')),'groups':[blocks(d.select_one('.eligibility-content'),text(d.summary)) for d in e.select('details')]})
groups=[]
for d in curr.select('.it-main > details.course-block'):
 body=d.select_one('.course-block-content');elective='tự chọn' in text(d.summary).lower()
 g={'title':text(d.select_one('.course-summary-title')),'totalCreditsLabel':text(d.select_one('.credits-pill')),'description':paragraphs(body),'courses':[]}
 tables=body.select('table')
 if len(tables)==1:g['courses']=courses(tables[0],elective)
 else:
  g['subgroups']=[]
  for table in tables:
   heading=table.parent.find_previous_sibling('p',class_='course-subgroup-heading')
   g['subgroups'].append({'title':text(heading),'totalCreditsLabel':text(heading).split(' · ')[-1],'courses':courses(table)})
 groups.append(g)
semesters=[]
for e in curr.select('.semester'):
 body=e.select_one('.semester-content');title=text(e.h4)
 semesters.append({'title':title,'subtitle':text(e.select_one('.semester-header strong')),'groups':[{'title':title+' · Học phần','description':paragraphs(body),'courses':[c for t in body.select('table') for c in courses(t)]}]})
intro=consult.select_one('.consult-intro')
highlights=[{'title':text(e.h3),'text':text(e.p)} for e in high.select('.highlight-card,.research-support')]
data={
 'hero':{'heroLead':text(hero.select_one('.hero-lead')),'heroSlogan':'FUTURE','heroImage':paths[0],'imageAlt':images[0]['alt'],'imageCredit':credit(hero.select_one('.hero-footnote a'))},
 'facts':{'quickFactsDetailed':[{'label':text(e.small),'value':own(e.strong),'detail':text(e.select_one('strong span'))} for e in soup.select('.facts-wrap .fact')]},
 'section01':{'sectionNumber':'01','overviewTitle':'Tổng quan chương trình','headline':text(overview.h2),'overview':paragraphs(overview.select_one('.overview-copy')),'overviewImage':paths[1],'imageAlt':images[1]['alt'],'imageCredit':credit(overview.select_one('figcaption a')),'focusAreas':[text(e) for e in overview.select('.it-keywords span')],'ribbonTitle':text(overview.h3),'tags':[text(e) for e in overview.select('.orientation-summary li')],'link':{'text':'Khám phá khung chương trình','href':'#chuong-trinh','ariaLabel':'Khám phá khung chương trình Công nghệ sinh học'}},
 'section02':{'sectionNumber':'02','highlights':highlights,'learningOutcomes':{'intro':text(high.select_one('.outcomes-intro')),'items':[{'code':text(e.select_one('.outcome-code')),'title':text(e.h3),'text':text(e.p)} for e in high.select('.outcome')]}},
 'section03':{'sectionNumber':'03','audienceHeading':'Chương trình phù hợp với ai?','headline':text(aud.h2),'intro':paragraphs(aud.select_one('.audience-top')),'audience':[{'title':text(e.h3),'text':text(e.p)} for e in aud.select('.audience-profile')],'requirements':requirements},
 'section04':{'sectionNumber':'04','careerHeading':'Cơ hội nghề nghiệp và phát triển','headline':text(career.h2),'intro':text(career.select_one('.career-heading > p')),'note':text(career.select_one('.career-footnote')),'careerImage':paths[0],'careers':[{'group':text(e.h3),'title':text(role.h4),'sub':text(role.p)} for e in career.select('.career-group') for role in e.select('.career-role')]},
 'section05':{'sectionNumber':'05','curriculumIntro':[text(curr.select_one('.track-overview'))],'trackLabels':['Định hướng nghiên cứu'],'graduationProjects':['Luận văn · 15 tín chỉ'],'studyMode':'Chính quy tập trung','generalFacts':[{'label':text(e.dt),'value':text(e.dd)} for e in curr.select('.curriculum-facts dl > div')],'notes':[text(curr.select_one('.credits-breakdown'))],'semesters':{'heading':text(curr.select_one('.study-plan > summary')),'intro':text(curr.select_one('.study-plan-intro')),'items':semesters},'completion':{'heading':text(curr.select_one('.graduation-summary h4')),'items':[text(e) for e in curr.select('.graduation-summary li')]}},
 'consultation':{'ctaHeading':[text(soup.select_one('.callout-banner h2'))],'ctaBody':text(soup.select_one('.callout-banner p')),'formIntro':{'eyebrow':text(intro.select_one('.eyebrow')),'titleLines':['Bắt đầu từ','mục tiêu của bạn.'],'body':text(intro.p),'benefits':[own(e) for e in intro.select('li')],'formTitle':text(consult.select_one('.consultation-contact h3'))},'contactActions':[{'text':text(e),'href':e['href'].replace('https://vgg-vgg4.vercel.app/vi','')} for e in consult.select('.consult-direct-actions a,.consultation-contact > .text-link')]},
 'faq':{'faqs':[{'question':text(e.summary),'answer':text(e.select_one('.faq-answer'))} for e in faq.select('.faq-list > details')]},
 'fees':{'heading':text(fees.h2),'intro':paragraphs(fees.select_one('.fees-intro')),'intake':text(fees.select_one('.fee-single-label')),'language':text(fees.select_one('#fee-language')),'total':text(fees.select_one('.fee-total')),'installments':[{'label':text(e.th),'amount':text(e.td)} for e in fees.select('.payment-table tr')],'additionalFees':[{'title':text(e.strong),'amount':text(e.select_one('span')),'note':text(e.p)} for e in fees.select('.additional-fees li')],'notes':[text(fees.select_one('.fee-detail-note')),text(fees.select_one('.fee-note'))]}
}
programme={'id':'cong-nghe-sinh-hoc','code':'420201','title':'Công nghệ Sinh học','englishTitle':'Master of Engineering in Biotechnology','degree':'Thạc sĩ','field':'Kỹ thuật, Môi trường & Công nghệ','orientation':'Nghiên cứu','credits':60,'duration':'24 tháng','studyMode':'Chính quy tập trung, tiếng Việt','intake':'Tuyển sinh thạc sĩ 2027','summary':data['hero']['heroLead'],'schedule':'Buổi tối các ngày trong tuần và/hoặc thứ Bảy, Chủ nhật; thời khóa biểu theo từng học kỳ.','tuition':'85.000.000 VNĐ'}
track={'number':'05','title':'Định hướng nghiên cứu','subtitle':'60 tín chỉ · 24 tháng · 6 học kỳ','orientation':'Nghiên cứu','graduationProject':'Luận văn · 15 tín chỉ','groups':groups}
shared={'hero':'hero','facts':'facts','section01':'overview','section02':'highlights','section05':'curriculum','consultation':'consultation','faq':'faq'}
fields=[]
for key,value in data.items():
 encoded=json.dumps(value,ensure_ascii=False,indent=2)
 fields.append(f'  {key}: {{\n'+(f'    ...programmeSharedContent.{shared[key]},\n' if key in shared else '')+'\n'.join('  '+line for line in encoded.splitlines()[1:-1])+'\n  },')
path=Path('frontend/src/data/programmes/cong-nghe-sinh-hoc.ts');backup=out/'before.ts'
if not backup.exists():backup.write_bytes(path.read_bytes())
path.write_text('// Nguồn: thac-si-cong-nghe-sinh-hoc.html do người dùng cung cấp ngày 24/10/2026.\nimport { programmeSharedContent } from "./shared-content";\nimport type { Programme, ProgrammePageContent } from "../programmes";\nimport type { CurriculumTrack } from "../curricula";\n\nexport const congNgheSinhHocPageContent: ProgrammePageContent = {\n'+'\n'.join(fields)+'\n};\n\nexport const congNgheSinhHocProgramme: Programme = '+json.dumps(programme,ensure_ascii=False,indent=2)+';\n\nexport function getCongNgheSinhHocCurricula(): CurriculumTrack[] {\n  return '+json.dumps([track],ensure_ascii=False,indent=2)+';\n}\n',encoding='utf-8')
(out/'import.json').write_text(json.dumps({'content':data,'tracks':[track]},ensure_ascii=False,indent=2),encoding='utf-8')
assert len(data['section02']['learningOutcomes']['items'])==6
assert len(data['section04']['careers'])==9
print('Imported biotechnology source')
