"""Import every guide from the authored Markdown without inventing missing values."""
import json,re
from pathlib import Path
root=Path(__file__).resolve().parents[1]
source=(root/'docs/guides/build-guides.md').read_text(encoding='utf-8')
old=json.loads((root/'apps/web/src/server/warframe-guides.json').read_text(encoding='utf-8'))
previous={ (g['frame'],tuple(m['name'] for m in g['mods'])):g for g in old }
out=[];used=set();aliases={}
for category,body in re.findall(r'^## ([^\n]+)\n(.*?)(?=^## |\Z)',source,re.M|re.S):
 if category=='Reading the build lists':continue
 for part in re.split(r'^### ',body,flags=re.M)[1:]:
  title,_,text=part.partition('\n');intro=re.search(r'^\*\*(.*?)\*\*',text,re.M|re.S)
  if not intro:raise ValueError(title)
  frame,_,subtitle=intro[1].partition('. ')
  sections=[]
  for m in re.finditer(r'^\*\*([^*]+)\*\*',text,re.M):
   if m.start()==0:continue
   sections.append((m.start(),m.end(),m[1].rstrip('.')))
  sec=[{'title':h,'text':text[end:sections[n+1][0] if n+1<len(sections) else len(text)].strip().rstrip('-').strip()} for n,(start,end,h) in enumerate(sections)]
  build=next((s['text'] for s in sec if s['title'].startswith('The build')),'')
  mods=[]
  for line in build.splitlines():
   m=re.match(r'- (.*?), rank (\d+), (.*)',line)
   if m:
    split=re.split(r'(?<=polarity)\. |(?<=unpolarised)\. | â€” ',m[3],maxsplit=1)
    mods.append({'name':m[1],'rank':int(m[2]),'polarity':split[0].replace(' polarity',''),'note':split[1] if len(split)>1 else ''})
  def extra(label):
   m=re.search(r'^- '+label+r': (.*)$',build,re.M);return m[1] if m else ''
  statline=re.search(r'(?:Arsenal|Weapon|Companion) figures.*?(?:\n\n|$)',build,re.S)
  stattext=' '.join(statline[0].split()) if statline else ''
  stats={k:float(v) for v,k in re.findall(r'([\d.]+)%\s*(Strength|Duration|Range|Efficiency)',stattext)}
  pools={k:float(v.replace(',','')) for v,k in re.findall(r'([\d,.]+)\s+(shield|health|armor|energy)',stattext)}
  slug=re.sub('[^a-z0-9]+','-',title.lower()).strip('-')
  if (category,slug) in used:slug+='-'+re.sub('[^a-z0-9]+','-',frame.lower()).strip('-')
  if (category,slug) in used:raise ValueError('Duplicate '+slug)
  used.add((category,slug))
  g={'category':category,'slug':slug,'title':title,'frame':frame,'subtitle':subtitle.rstrip('.'),'summary':' '.join(re.findall(r'^> ?(.*)',text,re.M)),'meta':dict(re.findall(r'^\| ([^|]+?) \| ([^|]+?) \|',text,re.M)),'mods':mods,'auras':re.findall(r'^- Aura(?: \d+)?: (.*)$',build,re.M),'aura':extra('Aura'),'exilus':extra('Exilus'),'stance':extra('Stance'),'arcanes':(extra('Arcanes') or extra('Arcane')).split(', '),'stats':stats,'pools':pools,'statText':stattext,'buildText':build,'sections':[s for s in sec if s['title']!='The build'],'shardSlots':[None]*5}
  seed=(next((g for g in old if g['slug']==slug),None) or previous.get((frame,tuple(m['name'] for m in mods)))) if category=='Warframes' else None
  if seed:
   g['shardSlots']=seed['shardSlots']
   if seed['slug']!=slug:aliases[seed['slug']]=slug
  out.append(g)
assert len(out)==394, f'Expected 394 builds, found {len(out)}'
wf=[g for g in out if g['category']=='Warframes'];other=[g for g in out if g['category']!='Warframes']
server=root/'apps/web/src/server'
for filename,data in [('warframe-guides.json',wf),('equipment-guides.json',other)]:
 (server/filename).write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
p=server/'guide-aliases.json';existing=json.loads(p.read_text()) if p.exists() else {};existing.update(aliases);existing={k:v for k,v in existing.items() if k not in {g['slug'] for g in wf}};p.write_text(json.dumps(existing,indent=2)+'\n',encoding='utf-8')
from collections import Counter
print(dict(Counter(g['category'] for g in out)));print('Aliases',len(existing),'Total',len(out));print('WF incomplete stats',[(g['frame'],g['title'],g['stats']) for g in wf if len(g['stats'])!=4]);print('Mod slots',dict(Counter((g['category'],len(g['mods'])) for g in out)))
