from pathlib import Path
import zipfile, xml.etree.ElementTree as ET, json
from PIL import Image, ImageDraw, ImageFont
from io import BytesIO

source=Path(r'C:\Users\lepha\Downloads\EDIT 1_WEBSITE.pptx')
out=Path('outputs/website-edit-reference');out.mkdir(parents=True,exist_ok=True)
ns={'p':'http://schemas.openxmlformats.org/presentationml/2006/main','a':'http://schemas.openxmlformats.org/drawingml/2006/main','r':'http://schemas.openxmlformats.org/officeDocument/2006/relationships'}
slides=[]
with zipfile.ZipFile(source) as z:
 pres=ET.fromstring(z.read('ppt/presentation.xml'));sz=pres.find('p:sldSz',ns);sw,sh=int(sz.get('cx')),int(sz.get('cy'))
 for i in range(1,21):
  name=f'ppt/slides/slide{i}.xml';root=ET.fromstring(z.read(name));rels=ET.fromstring(z.read(f'ppt/slides/_rels/slide{i}.xml.rels'))
  targets={r.get('Id'):r.get('Target') for r in rels};canvas=Image.new('RGB',(1440,round(1440*sh/sw)),'white');draw=ImageDraw.Draw(canvas)
  shapes=[]
  for shape in root.find('p:cSld/p:spTree',ns):
   xf=shape.find('.//a:xfrm',ns);bounds=None
   if xf is not None:
    off,ext=xf.find('a:off',ns),xf.find('a:ext',ns)
    if off is not None and ext is not None:bounds=[int(off.get('x')),int(off.get('y')),int(ext.get('cx')),int(ext.get('cy'))]
   text='\n'.join(''.join(t.itertext()) for t in shape.findall('.//a:t',ns))
   blip=shape.find('.//a:blip',ns)
   image=None
   if blip is not None:
    target=targets.get(blip.get('{'+ns['r']+'}embed'))
    if target:
     asset='ppt/'+target.replace('../','');image=Image.open(BytesIO(z.read(asset))).convert('RGB')
     dest=out/f'slide-{i:02d}-image-{len(shapes)}.png';image.save(dest)
     if bounds:
      x,y,w,h=[round(v*1440/sw) for v in bounds];canvas.paste(image.resize((w,h)),(x,y))
   shapes.append({'text':text,'bounds':bounds,'image':str(dest) if image else None})
  # Render the existing annotation geometry, retaining the marked scope.
  for shape in root.find('p:cSld/p:spTree',ns):
   xf=shape.find('.//a:xfrm',ns)
   if xf is None:continue
   off,ext=xf.find('a:off',ns),xf.find('a:ext',ns)
   if off is None or ext is None:continue
   x,y,w,h=[round(int(v)*1440/sw) for v in [off.get('x'),off.get('y'),ext.get('cx'),ext.get('cy')]]
   if shape.tag.endswith('cxnSp'):
    a=(x+w if xf.get('flipH')=='1' else x,y+h if xf.get('flipV')=='1' else y)
    b=(x if xf.get('flipH')=='1' else x+w,y if xf.get('flipV')=='1' else y+h)
    draw.line([a,b],fill='red',width=3)
   elif shape.tag.endswith('sp') and not shape.findall('.//a:t',ns):draw.rectangle([x,y,x+w,y+h],outline='red',width=2)
  # Overlay the source's authored text boxes at their original locations.
  for shape in shapes:
   if shape['text'] and shape['bounds']:
    x,y,w,h=[round(v*1440/sw) for v in shape['bounds']]
    font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',22)
    draw.multiline_text((x,y),shape['text'],font=font,fill='#dc2036',spacing=2,stroke_width=0)
  canvas.save(out/f'slide-{i:02d}.png')
  note_path=f'ppt/notesSlides/notesSlide{i}.xml';notes=''
  if note_path in z.namelist():notes='\n'.join(t.text or '' for t in ET.fromstring(z.read(note_path)).findall('.//a:t',ns))
  slides.append({'slide':i,'shapes':shapes,'notes':notes})
(out/'slides.json').write_text(json.dumps(slides,ensure_ascii=False,indent=2),encoding='utf8')
for start in (1,6,11,16):
 sheet=Image.new('RGB',(1440,5*(round(1440*sh/sw)+30)),'#ddd');d=ImageDraw.Draw(sheet)
 thumb_h=round(720*sh/sw)
 for row,i in enumerate(range(start,start+5)):
  thumb=Image.open(out/f'slide-{i:02d}.png');thumb.thumbnail((1440,thumb_h*2));sheet.paste(thumb,(0,row*(thumb_h*2+30)));d.text((5,row*(thumb_h*2+30)),f'SLIDE {i}',fill='black')
 sheet.save(out/f'contact-{start:02d}-{start+4:02d}.jpg')
print('Inspected 20 slides; saved source images, annotation positions and reference previews.')
