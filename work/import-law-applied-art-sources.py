from pathlib import Path
from bs4 import BeautifulSoup
import json,base64

import sys,re
slug=sys.argv[1]
source_file={'luat-kinh-te':'thac-si-luat-kinh-te.html','my-thuat-ung-dung':'thac-si-my-thuat-ung-dung (1).html'}[slug]
cfg={'luat-kinh-te':('luatKinhTe','LuatKinhTe','Luật Kinh tế','Master of Laws in Economic Law','380107','Ứng dụng','','Đề án tốt nghiệp · 9 tín chỉ','Luật, Nhân văn & Truyền thông'),'my-thuat-ung-dung':('myThuatUngDung','MyThuatUngDung','Mỹ thuật Ứng dụng','Master of Applied Arts','210410','Ứng dụng','','Đề án tốt nghiệp · 9 tín chỉ','Thiết kế & Mỹ thuật Ứng dụng')}[slug]
out=Path('outputs')/(slug+'-update');out.mkdir(parents=True,exist_ok=True)
source=Path('C:/Users/lepha/Downloads')/source_file
soup=BeautifulSoup(source.read_text(encoding='utf-8'),'html.parser')
# Normalize source markup into the shared extraction vocabulary without executing it.
def addclass(e,name):e['class']=e.get('class',[])+[name]
def fragment(markup):return BeautifulSoup(markup,'html.parser')
if slug=='luat-kinh-te':
 bad=soup.select_one('.facts-wrap')
 if bad:bad.decompose() # Accounting facts accidentally duplicated in the supplied Law HTML.
 addclass(soup.select_one('.programme-facts'),'facts-wrap')
 addclass(soup.select_one('.programme-hero p'),'hero-lead')
 audience=soup.select_one('.eligibility-grid > div');addclass(audience,'audience-top')
 for e in soup.select('.eligibility-list article'):
  addclass(e,'audience-profile')
  if e.strong:e.p.append(' '+e.strong.get_text(' ',strip=True))
 card=soup.select_one('.eligibility-card');headings=card.select('h3');paras=card.select('p')
 entry=soup.new_tag('div',attrs={'class':'entry-condition'});entry.append(headings[-1].extract());entry.append(paras[-1].extract());soup.select_one('#doi-tuong .wrap').append(entry)
 summary=fragment('<div class="eligibility-summary"><h3>Ngành tốt nghiệp có phù hợp?</h3><p>'+soup.select_one('.eligibility-list').get_text(' ',strip=True)+'</p></div>').div;soup.select_one('#doi-tuong .wrap').append(summary)
 bridge=soup.new_tag('div',attrs={'class':'bsk-panel'});bridge.append(fragment('<h3>Bổ sung kiến thức đầu vào</h3>').h3)
 detail=fragment('<details><summary>Danh mục tối đa 19 tín chỉ</summary><div class="eligibility-content"></div></details>').details
 detail.div.append(card.ul.extract());detail.div.append(paras[0].extract());bridge.append(detail);soup.select_one('#doi-tuong .wrap').append(bridge)
 addclass(soup.select_one('.career-head'),'career-heading')
 for e in soup.select('.career-grid article'):
  addclass(e,'career-group');role=soup.new_tag('div',attrs={'class':'career-role'});e.h3.name='h4';role.append(e.h4.extract());role.append(e.p.extract());e.append(role)
 curr=soup.select_one('#chuong-trinh .wrap');panel=fragment('<div class="curriculum-panel it-panel" data-track="application"><aside class="curriculum-facts"><dl><div><dt>Thời gian đào tạo</dt><dd>18 tháng</dd></div><div><dt>Định hướng</dt><dd>Ứng dụng</dd></div><div><dt>Hình thức</dt><dd>Chính quy tập trung</dd></div><div><dt>Ngôn ngữ</dt><dd>Tiếng Việt</dd></div><div><dt>Thực tập</dt><dd>8 tín chỉ</dd></div><div><dt>Đề án tốt nghiệp</dt><dd>9 tín chỉ</dd></div></dl></aside><div class="it-main"></div></div>').div
 intro=curr.select_one('.curriculum-head > p');addclass(intro,'track-overview');panel.select_one('.it-main').append(intro.extract())
 for e in list(curr.select(':scope > .course-block,:scope > .study-plan')):panel.select_one('.it-main').append(e.extract())
 panel.select_one('.it-main').append(fragment('<div class="graduation-summary"><h4>Thực tập và đề án tốt nghiệp</h4><ul><li>Thực tập tối thiểu 09 tuần tại cơ quan, tổ chức hoặc doanh nghiệp. Đề án tốt nghiệp được thực hiện trong ít nhất 03 tháng và bảo vệ trước hội đồng theo quy định.</li></ul></div>').div)
 panel.select_one('.it-main').append(fragment('<p class="learning-schedule-note">'+curr.select_one('.curriculum-head h2').get_text(' ',strip=True)+'</p>').p);curr.append(panel)
if slug=='my-thuat-ung-dung':
 panel=soup.select_one('.curriculum-panel');plan=next(d for d in panel.select('.course-block') if not d.select_one('table'))
 title=plan.select_one('.course-summary-title').get_text(' ',strip=True);plan['class']=['study-plan'];plan.summary.clear();plan.summary.append(title)
 container=plan.select_one('.course-block-content');p=container.p;addclass(p,'study-plan-intro');plan.append(p.extract())
 for li in list(container.select('li')):
  title=li.strong.get_text(' ',strip=True).rstrip(':');li.strong.decompose();body=li.get_text(' ',strip=True)
  item=fragment('<article class="semester"><div class="semester-header"><h4>'+title+'</h4><strong></strong></div><div class="semester-content"><p>'+body+'</p></div></article>').article;plan.append(item)
 container.decompose()
 panel.select_one('.it-main').append(fragment('<div class="graduation-summary"><h4>Thực tập và đề án tốt nghiệp</h4><ul><li>Thực tập tốt nghiệp · 6 tín chỉ</li><li>Đề án tốt nghiệp · 9 tín chỉ</li></ul></div>').div)
def text(e): return ' '.join(e.stripped_strings) if e else ''
def own(e): return ' '.join(str(t).strip() for t in e.find_all(string=True,recursive=False) if str(t).strip())
def paragraphs(e): return [text(p) for p in e.select(':scope > p')] if e else []
def credit(e): return {'text':text(e),**({'href':e['href']} if e.get('href') else {})} if e else None
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
for image,name in zip(images,['programme-hero.webp','programme-overview.webp']):
 if image['src'].startswith('https://'):
  paths.append(image['src']);continue
 mime=image['src'].split(';')[0]
 assert mime in ['data:image/webp','data:image/jpeg','data:image/png'],mime
 name=Path(name).stem+{'data:image/webp':'.webp','data:image/jpeg':'.jpg','data:image/png':'.png'}[mime]
 p=Path('frontend/public/images/pages/programmes')/slug/name;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(base64.b64decode(image['src'].split(',',1)[1]));paths.append('/images/pages/programmes/'+slug+'/'+name)
hero=soup.select_one('.programme-hero');overview=soup.select_one('#tong-quan');high=soup.select_one('#diem-noi-bat');aud=soup.select_one('#doi-tuong');career=soup.select_one('#nghe-nghiep');curr=soup.select_one('#chuong-trinh');fees=soup.select_one('#hoc-phi');faq=soup.select_one('#faq');consult=soup.select_one('#consultation')
requirements=[]
for e in aud.select('.eligibility-summary,.entry-condition,.research-entry'):
 requirements.append({'title':text(e.h3),'paragraphs':paragraphs(e)})
e=aud.select_one('.language-evidence')
if e:requirements.append(blocks(e.select_one('.eligibility-content'),text(e.summary)))
e=aud.select_one('.bsk-panel');requirements.append({'title':text(e.h3),'paragraphs':paragraphs(e)+[text(e.select_one('.bsk-purpose'))]+paragraphs(e.select_one('.bsk-footer')),'groups':[blocks(d.select_one('.eligibility-content'),text(d.summary)) for d in e.select('details')]})
def table_groups(body,force_elective=False):
 result=[]
 for table in body.select('table'):
  previous=[]
  for e in table.parent.previous_siblings:
   if getattr(e,'name',None)=='div' and e.select_one('table'):break
   if getattr(e,'name',None)=='p':previous.insert(0,e)
  heading=next((e for e in reversed(previous) if 'course-subgroup-heading' in e.get('class',[])),None)
  title=text(heading) or table.get('aria-label','Học phần')
  notes=[text(e) for e in previous if e is not heading]
  elective=force_elective or 'tự chọn' in (title+' '+table.get('aria-label','')).lower() or any('Chọn ' in n or 'Lựa chọn ' in n for n in notes)
  rows=courses(table,elective)
  matches=re.findall(r'(\d+) tín chỉ',title+' '+' '.join(notes))
  label=(matches[-1]+' tín chỉ') if matches else ('Theo cơ cấu tự chọn' if elective else str(sum(c['credits'] for c in rows))+' tín chỉ')
  result.append({'title':title,'totalCreditsLabel':label,'description':notes,'courses':rows})
 return result

def parse_track(panel,index):
 orientation='Nghiên cứu' if panel.get('data-track')=='research' else 'Ứng dụng'
 groups=[]
 for d in panel.select('.it-main > details.course-block'):
  body=d.select_one('.course-block-content');elective='tự chọn' in text(d.summary).lower()
  tables=body.select('table')
  g={'title':text(d.select_one('.course-summary-title')),'totalCreditsLabel':text(d.select_one('.credits-pill')),'courses':[]}
  if len(tables)==1:
   g['courses']=courses(tables[0],elective or any('tự chọn' in text(p).lower() for p in body.select('.course-subgroup-heading')));g['description']=[text(p) for p in body.select('p')]
  else:
   g['subgroups']=table_groups(body,elective)
   g['description']=[text(p) for p in body.select(':scope > .selection-guide')]
  groups.append(g)
 semesters=[]
 for e in panel.select('.semester'):
  body=e.select_one('.semester-content')
  semesters.append({'title':text(e.h4),'subtitle':text(e.select_one('.semester-header strong')),'groups':table_groups(body) or [{'title':text(e.h4),'description':paragraphs(body),'courses':[]}]})
 plan=panel.select_one('.study-plan')
 return {'number':'05','title':'Định hướng '+orientation.lower(),'orientation':orientation,'subtitle':text(panel.select_one('.curriculum-facts dd'))+' · 60 tín chỉ','graduationProject':'Luận văn tốt nghiệp · 15 tín chỉ' if orientation=='Nghiên cứu' else cfg[7],'intro':text(panel.select_one('.track-overview')),'generalFacts':[{'label':text(e.dt),'value':text(e.dd)} for e in panel.select('.curriculum-facts dl > div')],'notes':[text(panel.select_one('.credits-breakdown'))]+[text(p) for p in panel.select('.learning-schedule-note')],'groups':groups,'semesters':{'heading':text(plan.summary),'intro':' '.join(paragraphs(plan)),'items':semesters} if plan else None,'completion':{'heading':text(panel.select_one('.graduation-summary h4')),'items':[text(e) for e in panel.select('.graduation-summary li')]}}
for note in aud.select('.wrap > .requirement-guidance'):
 next(block for block in requirements if block['title']=='Phương thức tuyển sinh')['paragraphs'].append(text(note))
tracks=[parse_track(p,i) for i,p in enumerate(curr.select('.curriculum-panel'))]
for t in tracks:
 t['notes']=[text(p) for p in curr.select('.track-intro')]+t['notes']
 if t['semesters'] is None:del t['semesters']
if len(tracks)==1:tracks[0]['subtitle']=text(curr.select_one('.single-track-heading p')) or tracks[0]['subtitle']
groups=tracks[0]['groups'];semesters=tracks[0].get('semesters',{}).get('items',[])
for outside in aud.select('.outside-majors'):
 requirements[-1]['groups'].append({'title':text(outside.find(['h3','h4','strong'])),'paragraphs':paragraphs(outside)})
intro=consult.select_one('.consult-intro')
highlights=[{'title':text(e.h3),'text':text(e.p)} for e in high.select('.highlight-card,.application-support')]
data={
 'hero':{'heroLead':text(hero.select_one('.hero-lead')),'heroSlogan':'FUTURE','heroImage':paths[0],'imageAlt':images[0]['alt'],'imageCredit':credit(hero.select_one('.hero-footnote a'))},
 'facts':{'quickFactsDetailed':[{'label':text(e.small),'value':own(e.strong),'detail':text(e.select_one('strong span'))} for e in soup.select('.facts-wrap .fact')]},
 'section01':{'sectionNumber':'01','overviewTitle':'Tổng quan chương trình','headline':text(overview.h2),'overview':paragraphs(overview.select_one('.overview-copy')),'overviewImage':paths[1],'imageAlt':images[1]['alt'],'imageCredit':credit(overview.select_one('figcaption a')),'focusAreas':[text(e) for e in overview.select('.it-keywords span')],'ribbonTitle':text(overview.h3),'tags':[text(e) for e in overview.select('.orientation-summary li')],'link':{'text':'Khám phá khung chương trình','href':'#chuong-trinh','ariaLabel':'Khám phá khung chương trình Kinh doanh thương mại'}},
 'section02':{'sectionNumber':'02','highlights':highlights,'learningOutcomes':{'intro':text(high.select_one('.outcomes-intro')),'items':[{'code':text(e.select_one('.outcome-code')),'title':text(e.h3),'text':text(e.p)} for e in high.select('.outcome')]}},
 'section03':{'sectionNumber':'03','audienceHeading':'Chương trình phù hợp với ai?','headline':text(aud.h2),'intro':paragraphs(aud.select_one('.audience-top')),'audience':[{'title':text(e.h3),'text':text(e.p)} for e in aud.select('.audience-profile')],'requirements':requirements},
 'section04':{'sectionNumber':'04','careerHeading':'Cơ hội nghề nghiệp và phát triển','headline':text(career.h2),'intro':text(career.select_one('.career-heading > p')),'note':text(career.select_one('.career-footnote')),'careerImage':paths[0],'careers':[{'group':text(e.h3),'title':text(role.h4),'sub':text(role.p)} for e in career.select('.career-group') for role in e.select('.career-role')]},
 'section05':{'sectionNumber':'05','curriculumIntro':[text(curr.select_one('.track-overview'))],'trackLabels':['Định hướng ứng dụng'],'graduationProjects':['Đề án tốt nghiệp · 9 tín chỉ'],'studyMode':'Chính quy tập trung','generalFacts':[{'label':text(e.dt),'value':text(e.dd)} for e in curr.select('.curriculum-facts dl > div')],'notes':[text(curr.select_one('.credits-breakdown'))],'semesters':{'heading':text(curr.select_one('.study-plan > summary')),'intro':text(curr.select_one('.study-plan-intro')),'items':semesters},'completion':{'heading':text(curr.select_one('.graduation-summary h4')),'items':[text(e) for e in curr.select('.graduation-summary li')]}},
 'consultation':{'ctaHeading':[text(soup.select_one('.callout-banner h2'))],'ctaBody':text(soup.select_one('.callout-banner p')),'formIntro':{'eyebrow':text(intro.select_one('.eyebrow')),'titleLines':['Bắt đầu từ','mục tiêu của bạn.'],'body':text(intro.p),'benefits':[own(e) for e in intro.select('li')],'formTitle':text(consult.select_one('.consultation-contact h3'))},'contactActions':[{'text':text(e),'href':e['href'].replace('https://vgg-vgg4.vercel.app/vi','')} for e in consult.select('.consult-direct-actions a,.consultation-contact > .text-link')]},
 'faq':{'faqs':[{'question':text(e.summary),'answer':text(e.select_one('.faq-answer') or e.select_one(':scope > div'))} for e in faq.select('.faq-list > details')]},
 'fees':{'heading':text(fees.h2),'intro':paragraphs(fees.select_one('.fees-intro')),'intake':text(fees.select_one('.fee-single-label')),'language':text(fees.select_one('#fee-language')) or 'Tiếng Việt','total':text(fees.select_one('.fee-total')),'installments':[{'label':text(e.th),'amount':text(e.td)} for e in fees.select('.payment-table tr')],'additionalFees':[{'title':text(e.strong),'amount':text(e.select_one('span')),'note':text(e.p)} for e in fees.select('.additional-fees li')],'notes':[text(fees.select_one('.fee-detail-note')),text(fees.select_one('.fee-note'))]}
}
data['consultation']['formIntro']['titleLines']=[text(intro.h2)]
data['hero']['imageCredit']=credit(hero.select_one('.hero-footnote a') or hero.select_one('.hero-footnote') or hero.select_one('.hero-credit'))
data['section01']['imageCredit']=credit(overview.select_one('figcaption a') or overview.select_one('figcaption'))
data['section01']['tags']=[]
data['section01']['link']={'text':text(overview.select_one('.overview-copy > .text-link')).rstrip(' ↓'),'href':'#chuong-trinh','ariaLabel':'Khám phá khung chương trình '+cfg[2]}
data['section02']['learningOutcomes']['items']=[{'code':text(e.select_one('.outcome-code') or e.select_one('.capability-label')),'title':text(e.h3)+(' · '+text(e.select_one('.track-badge')) if e.select_one('.track-badge') else ''),'text':text(e.p)} for e in high.select('.outcome')]
data['section02']['outcomesHeading']=text(high.select_one('.outcomes > summary'))
data['section05']={'sectionNumber':'05','curriculumIntro':[t['intro'] for t in tracks],'trackLabels':[t['title'] for t in tracks],'graduationProjects':[t['graduationProject'] for t in tracks],'studyMode':'Chính quy tập trung'}
if len(tracks)==1:
 for key in ['generalFacts','notes','semesters','completion']:
  if key in tracks[0]:data['section05'][key]=tracks[0][key]
programme={'id':slug,'code':cfg[4],'title':cfg[2],'englishTitle':cfg[3],'degree':'Thạc sĩ','field':cfg[8],'orientation':cfg[5],'credits':60,'duration':'18–24 tháng' if slug=='my-thuat-ung-dung' else '18 tháng','studyMode':'Chính quy tập trung, tiếng Việt','intake':'Tuyển sinh thạc sĩ 2027','summary':data['hero']['heroLead'],'schedule':'Buổi tối các ngày trong tuần và/hoặc thứ Bảy, Chủ nhật; thời khóa biểu theo từng học kỳ.','tuition':'85.000.000 VNĐ'}
if slug=='ly-luan-lich-su-my-thuat':programme['duration']='24 tháng'
if slug=='logistics':programme['studyMode']='Chính quy tập trung, tiếng Việt hoặc tiếng Anh'
if len(tracks)>1:programme['orientations']=['Ứng dụng','Nghiên cứu']
# Read the embedded JSON value as data only; never execute source JavaScript.
programme_script=next((e.get_text() for e in soup.select('script') if 'const PROGRAMME=' in e.get_text()),'')
source_data=json.JSONDecoder().raw_decode(programme_script.split('const PROGRAMME=',1)[1])[0]
def money(n):return f'{n:,}'.replace(',','.')+' đồng'
fee_variants=[{'language':v['language'],'total':money(v['total_vnd']),'installments':[{'label':f'Đợt {i+1} · {pct}%','amount':money(amount)} for i,(pct,amount) in enumerate(zip(v['installment_percent'],v['installments_vnd']))]} for v in source_data['tuition_variants']]
programme['tuition']=fee_variants[0]['total'].replace(' đồng',' VNĐ')
if len(fee_variants)>1:
 data['fees']['intro'][1:1]=[text(p) for p in fees.select('.fee-language-summary p')]
 data['fees']['variants']=fee_variants
 programme['tuition']='Từ '+programme['tuition']
shared={'hero':'hero','facts':'facts','section01':'overview','section02':'highlights','section05':'curriculum','consultation':'consultation','faq':'faq'}
fields=[]
for key,value in data.items():
 encoded=json.dumps(value,ensure_ascii=False,indent=2)
 fields.append(f'  {key}: {{\n'+(f'    ...programmeSharedContent.{shared[key]},\n' if key in shared else '')+'\n'.join('  '+line for line in encoded.splitlines()[1:-1])+'\n  },')
path=Path('frontend/src/data/programmes')/(slug+'.ts');backup=out/'before.ts'
if not backup.exists():backup.write_bytes(path.read_bytes())
output=('// Nguồn: thac-si-kinh-doanh-thuong-mai.html do người dùng cung cấp ngày 24/10/2026.\nimport { programmeSharedContent } from "./shared-content";\nimport type { Programme, ProgrammePageContent } from "../programmes";\nimport type { CurriculumTrack } from "../curricula";\n\nexport const PLACEHOLDERPageContent: ProgrammePageContent = {\n'+'\n'.join(fields)+'\n};\n\nexport const PLACEHOLDERProgramme: Programme = '+json.dumps(programme,ensure_ascii=False,indent=2)+';\n\nexport function getFUNCTIONCurricula(): CurriculumTrack[] {\n  return '+json.dumps(tracks,ensure_ascii=False,indent=2)+';\n}\n')
path.write_text(output.replace('PLACEHOLDER',cfg[0]).replace('getFUNCTION','get'+cfg[1]).replace('thac-si-kinh-doanh-thuong-mai.html',source.name),encoding='utf-8')
(out/'import.json').write_text(json.dumps({'content':data,'tracks':tracks},ensure_ascii=False,indent=2),encoding='utf-8')
print(slug, 'tracks',len(tracks),'PLO',len(data['section02']['learningOutcomes']['items']))

