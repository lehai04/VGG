from pathlib import Path
from docx import Document
from docx.document import Document as DocType
from docx.table import Table as DocxTable
from docx.text.paragraph import Paragraph
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph as RP, Spacer, Table, TableStyle, PageBreak, KeepTogether
from xml.sax.saxutils import escape

ROOT=Path(r'C:\Users\lepha\VGG')
font=Path(r'C:\Windows\Fonts\arial.ttf'); bold=Path(r'C:\Windows\Fonts\arialbd.ttf')
pdfmetrics.registerFont(TTFont('Arial',str(font))); pdfmetrics.registerFont(TTFont('Arial-Bold',str(bold)))
styles=getSampleStyleSheet()
body=ParagraphStyle('Body',fontName='Arial',fontSize=9,leading=12,spaceAfter=5,textColor=colors.HexColor('#1F2937'))
h1=ParagraphStyle('H1',parent=body,fontName='Arial-Bold',fontSize=15,leading=18,textColor=colors.HexColor('#2E74B5'),spaceBefore=12,spaceAfter=6,keepWithNext=True)
h2=ParagraphStyle('H2',parent=h1,fontSize=12,leading=15,spaceBefore=9,spaceAfter=4)
h3=ParagraphStyle('H3',parent=h2,fontSize=10.5,leading=13)
title=ParagraphStyle('Title',parent=h1,fontSize=20,leading=24,alignment=TA_CENTER,spaceAfter=12)
cell=ParagraphStyle('Cell',parent=body,fontSize=7.3,leading=9,spaceAfter=0)
cellhead=ParagraphStyle('CellHead',parent=cell,fontName='Arial-Bold',textColor=colors.white)

def blocks(parent):
    for child in parent.element.body.iterchildren():
        if child.tag.endswith('}p'): yield Paragraph(child,parent)
        elif child.tag.endswith('}tbl'): yield DocxTable(child,parent)

def footer(canvas,doc):
    canvas.saveState(); canvas.setFont('Arial',8); canvas.setFillColor(colors.HexColor('#6B7280'))
    canvas.drawString(inch,0.5*inch,'VGG Platform — Draft v0.1 — 2026-09-04')
    canvas.drawRightString(7.5*inch,0.5*inch,f'Trang {doc.page}'); canvas.restoreState()

def convert(src,dst):
    doc=Document(src); story=[]
    for b in blocks(doc):
        if isinstance(b,Paragraph):
            txt=b.text.strip()
            if not txt: continue
            s=b.style.name if b.style else ''
            if s=='Title': st=title
            elif s.startswith('Heading 1'): st=h1
            elif s.startswith('Heading 2'): st=h2
            elif s.startswith('Heading 3'): st=h3
            else: st=body
            prefix='• ' if 'List Bullet' in s else ''
            story.append(RP(escape(prefix+txt),st))
        else:
            rows=[]
            for ri,row in enumerate(b.rows):
                rows.append([RP(escape(c.text.strip()).replace('\n','<br/>'),cellhead if ri==0 and len(b.rows)>1 else cell) for c in row.cells])
            n=len(rows[0]); widths=[6.45*inch/n]*n
            t=Table(rows,colWidths=widths,repeatRows=1,hAlign='CENTER')
            ts=[('GRID',(0,0),(-1,-1),0.35,colors.HexColor('#CBD5E1')),('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),4),('RIGHTPADDING',(0,0),(-1,-1),4),('TOPPADDING',(0,0),(-1,-1),3),('BOTTOMPADDING',(0,0),(-1,-1),3)]
            if len(b.rows)>1: ts += [('BACKGROUND',(0,0),(-1,0),colors.HexColor('#1F4D78'))]
            t.setStyle(TableStyle(ts)); story += [t,Spacer(1,6)]
    pdf=SimpleDocTemplate(str(dst),pagesize=letter,leftMargin=inch,rightMargin=inch,topMargin=.75*inch,bottomMargin=.75*inch,title=src.stem,author='VGG BA Draft')
    pdf.build(story,onFirstPage=footer,onLaterPages=footer)
    print('PDF_CREATED',dst)

pairs=[
 ('docs/ba/01-business/VGG_BRD_v0.1_2026-09-04.docx','docs/ba/01-business/VGG_BRD_v0.1_2026-09-04.pdf'),
 ('docs/ba/02-requirements/VGG_SRS_v0.1_2026-09-04.docx','docs/ba/02-requirements/VGG_SRS_v0.1_2026-09-04.pdf'),
 ('docs/ba/04-uat/VGG_UAT-HANDOVER_v0.1_2026-09-04.docx','docs/ba/04-uat/VGG_UAT-HANDOVER_v0.1_2026-09-04.pdf'),
 ('docs/ba/05-reports/VGG_STAKEHOLDER-REPORT_v0.1_2026-09-04.docx','docs/ba/05-reports/VGG_STAKEHOLDER-REPORT_v0.1_2026-09-04.pdf')]
for a,b in pairs: convert(ROOT/a,ROOT/b)
