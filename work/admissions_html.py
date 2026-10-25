from html.parser import HTMLParser
from html import escape
VOID={'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}
class Node:
    def __init__(self,tag='',attrs=None,text=''):
        self.tag=tag; self.attrs=dict(attrs or []); self.text=text; self.children=[]; self.parent=None
    def append(self,node):
        if node.parent: node.parent.children.remove(node)
        node.parent=self; self.children.append(node); return node
    def walk(self):
        yield self
        for child in self.children: yield from child.walk()
    def find(self,id): return next(n for n in self.walk() if n.attrs.get('id')==id)
    def html(self):
        if not self.tag:return self.text+''.join(c.html() for c in self.children)
        attrs=''.join(' '+k+('="'+escape(v,quote=True)+'"' if v is not None else '') for k,v in self.attrs.items())
        return '<'+self.tag+attrs+'>'+('' if self.tag in VOID else ''.join(c.html() for c in self.children)+'</'+self.tag+'>')
class Parser(HTMLParser):
    def __init__(self): super().__init__(convert_charrefs=False);self.root=Node();self.stack=[self.root]
    def handle_starttag(self,tag,attrs):
        node=self.stack[-1].append(Node(tag,attrs))
        if tag not in VOID:self.stack.append(node)
    def handle_startendtag(self,tag,attrs): self.handle_starttag(tag,attrs); self.handle_endtag(tag)
    def handle_endtag(self,tag):
        for i in range(len(self.stack)-1,0,-1):
            if self.stack[i].tag==tag:self.stack=self.stack[:i];break
    def handle_data(self,data):self.stack[-1].append(Node(text=data))
    def handle_entityref(self,name):self.handle_data('&'+name+';')
    def handle_charref(self,name):self.handle_data('&#'+name+';')
    def handle_comment(self,text):self.handle_data('<!--'+text+'-->')
def parse(html):
    p=Parser();p.feed(html);return p.root
