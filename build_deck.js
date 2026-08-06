const pptxgen = require('pptxgenjs');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const pptx = new pptxgen();
pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'Solivate Studio';
pptx.company = 'Solivate Studio';
pptx.subject = 'Internal Pricing & Product Catalogue';
pptx.title = 'Solivate Studio — Pricing Master Final 2026';
pptx.lang = 'id-ID';
pptx.theme = {
  headFontFace: 'Aptos Display', bodyFontFace: 'Aptos', lang: 'id-ID'
};
pptx.defineLayout({ name: 'SOLIVATE_WIDE', width: 13.333, height: 7.5 });
pptx.layout = 'SOLIVATE_WIDE';

const C = {
  navy:'0B1220', navy2:'111B2E', white:'F7F8FA', pure:'FFFFFF', ink:'121826', muted:'667085',
  line:'DDE2EA', lime:'D9FF43', blue:'5D8CFF', blue2:'174A93', emerald:'63D6A3', amber:'F4B860',
  coral:'FF766D', panel:'EEF1F6', softBlue:'EAF0FF', softLime:'F2FFD0', softAmber:'FFF3DE', softRed:'FFE9E7'
};
const FONT = 'Aptos';
const FONT_DISPLAY = 'Aptos Display';
const OUT = path.join(__dirname, 'Solivate_Studio_Pricing_Master_Final_2026.pptx');
const LOGO = path.join(__dirname, 'solivate_logo.png');
const LOGO_TRANSPARENT = path.join(__dirname, 'solivate_logo_transparent.png');
const iconsDir = path.join(__dirname, 'node_modules', 'lucide-static', 'icons');

const chapters = [
  {n:'01',label:'SYSTEM',from:1,to:11}, {n:'02',label:'PRESENCE',from:12,to:18},
  {n:'03',label:'BUSINESS',from:19,to:35}, {n:'04',label:'OPERATIONS',from:36,to:46},
  {n:'05',label:'PUBLIC',from:47,to:55}, {n:'06',label:'PLATFORMS',from:56,to:62},
  {n:'07',label:'SALES',from:63,to:66}, {n:'08',label:'GOVERNANCE',from:67,to:83}
];
let slideNo = 0;

function iconData(name, color=C.ink) {
  const p = path.join(iconsDir, `${name}.svg`);
  if (!fs.existsSync(p)) return null;
  let s = fs.readFileSync(p, 'utf8');
  s = s.replace(/stroke="currentColor"/g, `stroke="#${color}"`).replace(/stroke="black"/g, `stroke="#${color}"`);
  return 'data:image/svg+xml;base64,' + Buffer.from(s).toString('base64');
}
function addIcon(slide, name, x, y, size=0.28, color=C.ink) {
  const data = iconData(name,color);
  if (data) slide.addImage({data,x,y,w:size,h:size});
}
function txt(slide, text, x,y,w,h, opts={}) {
  slide.addText(text,{x,y,w,h,fontFace:opts.fontFace||FONT,fontSize:opts.fontSize||14,color:opts.color||C.ink,
    bold:opts.bold||false,align:opts.align||'left',valign:opts.valign||'mid',margin:opts.margin===undefined?0:opts.margin,
    breakLine:opts.breakLine,fit:'shrink',charSpacing:opts.charSpacing||0,italic:opts.italic||false,
    isTextBox:true,paraSpaceAfterPt:opts.paraSpaceAfterPt||0,bullet:opts.bullet});
}
function box(slide,x,y,w,h,fill=C.pure,line=C.line,r=0.14,shadow=false){
  slide.addShape(pptx.ShapeType.roundRect,{x,y,w,h,rectRadius:r,fill:{color:fill},line:{color:line,width:0.8},
    shadow:shadow?{type:'outer',color:'000000',blur:1.5,offset:1,angle:45,opacity:0.08}:undefined});
}
function pill(slide,text,x,y,w,fill=C.softBlue,color=C.blue2){
  slide.addShape(pptx.ShapeType.roundRect,{x,y,w,h:0.32,rectRadius:0.16,fill:{color:fill},line:{color:fill}});
  txt(slide,text,x,y,w,0.32,{fontSize:9,bold:true,color,align:'center',charSpacing:0.5});
}
function chapterFor(n){return chapters.find(c=>n>=c.from&&n<=c.to)||chapters[7];}
function footer(slide,dark=false){
  const ch=chapterFor(slideNo), y=7.12;
  slide.addShape(pptx.ShapeType.line,{x:0.55,y:y-0.12,w:12.22,h:0,line:{color:dark?'26324A':C.line,width:0.6}});
  chapters.forEach((c,i)=>{
    const active=c.n===ch.n;
    txt(slide,`${c.n} ${c.label}`,0.58+i*1.27,y,1.18,0.18,{fontSize:7.7,bold:active,color:active?C.lime:(dark?'7F8CA5':'98A2B3')});
  });
  txt(slide,`${String(slideNo).padStart(2,'0')} / 83`,11.86,y,0.88,0.18,{fontSize:8.5,bold:true,color:dark?C.white:C.ink,align:'right'});
}
function newSlide(bg=C.white, withFooter=true){
  slideNo++; const s=pptx.addSlide(); s.background={color:bg}; if(withFooter) footer(s,bg===C.navy||bg===C.navy2); return s;
}
function title(slide,kicker,heading,sub=''){
  txt(slide,kicker.toUpperCase(),0.62,0.34,6,0.24,{fontSize:10,bold:true,color:C.blue,charSpacing:1.4});
  txt(slide,heading,0.62,0.66,12.05,0.54,{fontFace:FONT_DISPLAY,fontSize:29,bold:true});
  if(sub) txt(slide,sub,0.62,1.22,11.8,0.34,{fontSize:12.5,color:C.muted});
}
function darkTitle(slide,kicker,heading,sub=''){
  txt(slide,kicker.toUpperCase(),0.65,0.42,6,0.26,{fontSize:10,bold:true,color:C.lime,charSpacing:1.5});
  txt(slide,heading,0.65,0.82,12,0.95,{fontFace:FONT_DISPLAY,fontSize:42,bold:true,color:C.white});
  if(sub) txt(slide,sub,0.68,1.8,11,0.4,{fontSize:15,color:'AAB4C8'});
}
function sectionDivider(chapter,heading,sub,badge=''){
  const s=newSlide(C.navy,true);
  txt(s,`CHAPTER ${chapter}`,0.68,0.62,3,0.28,{fontSize:11,bold:true,color:C.lime,charSpacing:1.8});
  txt(s,heading,0.68,1.28,11.8,1.75,{fontFace:FONT_DISPLAY,fontSize:56,bold:true,color:C.white});
  txt(s,sub,0.72,3.26,9.8,0.5,{fontSize:18,color:'AAB4C8'});
  if(badge) pill(s,badge,0.72,4.05,2.5,C.lime,C.navy);
  // abstract capability bars
  [0,1,2,3,4].forEach(i=>s.addShape(pptx.ShapeType.roundRect,{x:8.0+i*0.84,y:5.25-i*0.42,w:0.58,h:0.65+i*0.42,rectRadius:0.12,fill:{color:i===4?C.lime:C.blue,transparency:i===4?0:25+i*9},line:{color:i===4?C.lime:C.blue,transparency:100}}));
  return s;
}
function packageCard(slide,p,x,y,w,h,accent=C.blue,detail=false){
  box(slide,x,y,w,h,C.pure,C.line,0.16,true);
  slide.addShape(pptx.ShapeType.roundRect,{x:x+0.18,y:y+0.18,w:0.38,h:0.38,rectRadius:0.1,fill:{color:accent},line:{color:accent}});
  addIcon(slide,p.icon||'package',x+0.26,y+0.26,0.22,accent===C.lime?C.navy:C.pure);
  txt(slide,(p.category||'PACKAGE').toUpperCase(),x+0.65,y+0.17,w-0.85,0.22,{fontSize:8.4,bold:true,color:C.muted,charSpacing:0.7});
  txt(slide,p.name,x+0.2,y+0.62,w-0.4,0.42,{fontSize:detail?20:16,bold:true});
  txt(slide,p.price,x+0.2,y+1.06,w-0.4,0.42,{fontSize:detail?24:19,bold:true,color:accent===C.lime?C.ink:accent});
  txt(slide,p.outcome||'',x+0.2,y+1.50,w-0.4,detail?0.58:0.48,{fontSize:detail?11.5:10.3,color:C.muted,valign:'top'});
  const feats=(p.features||[]).slice(0,detail?7:4);
  let fy=y+(detail?2.18:2.08);
  feats.forEach((f,i)=>{addIcon(slide,'check',x+0.22,fy+i*0.31,0.15,accent===C.lime?C.blue2:accent);txt(slide,f,x+0.44,fy-0.02+i*0.31,w-0.65,0.24,{fontSize:detail?10.3:9.3});});
  if(p.ideal){pill(slide,'IDEAL FOR',x+0.2,y+h-0.68,0.82,C.panel,C.muted);txt(slide,p.ideal,x+1.08,y+h-0.69,w-1.3,0.3,{fontSize:9.2,color:C.ink,bold:true});}
  if(p.demo){txt(slide,`↗ ${p.demo}`,x+0.2,y+h-0.34,w-0.4,0.2,{fontSize:8.8,bold:true,color:C.blue2});}
}
function flow(slide,steps,x,y,w,accent=C.blue,opts={}){
  const n=steps.length, gap=0.12, bw=(w-gap*(n-1))/n;
  steps.forEach((st,i)=>{
    box(slide,x+i*(bw+gap),y,bw,opts.h||0.72,i===n-1&&opts.highlight?C.softLime:C.pure,i===n-1&&opts.highlight?C.lime:C.line,0.12,false);
    txt(slide,String(i+1).padStart(2,'0'),x+i*(bw+gap)+0.11,y+0.09,0.28,0.18,{fontSize:8,bold:true,color:accent});
    txt(slide,st,x+i*(bw+gap)+0.1,y+0.28,bw-0.2,(opts.h||0.72)-0.34,{fontSize:opts.fontSize||9.5,bold:true,align:'center'});
    if(i<n-1) addIcon(slide,'chevron-right',x+i*(bw+gap)+bw-0.01,y+0.26,0.18,accent);
  });
}
function lineBetween(slide,x1,y1,x2,y2,color=C.blue,width=1.2,arrow=false){
  const x=Math.min(x1,x2), y=Math.min(y1,y2), w=Math.abs(x2-x1), h=Math.abs(y2-y1);
  const flipH=x2<x1, flipV=y2<y1;
  slide.addShape(pptx.ShapeType.line,{x,y,w,h,flipH,flipV,line:{color,transparency:45,width,endArrowType:arrow?'triangle':'none'}});
}
function browserMock(slide,name,x,y,w,h,kind='dashboard',accent=C.blue){
  box(slide,x,y,w,h,C.pure,'CBD3E1',0.14,true);
  slide.addShape(pptx.ShapeType.rect,{x,y,w,h:0.43,fill:{color:C.navy2},line:{color:C.navy2}});
  ['FF766D','F4B860','63D6A3'].forEach((c,i)=>slide.addShape(pptx.ShapeType.ellipse,{x:x+0.16+i*0.18,y:y+0.14,w:0.09,h:0.09,fill:{color:c},line:{color:c}}));
  txt(slide,name,x+0.68,y+0.1,w-0.9,0.18,{fontSize:8.5,bold:true,color:C.white});
  if(kind==='website'){
    slide.addShape(pptx.ShapeType.rect,{x:x+0.18,y:y+0.62,w:w-0.36,h:h*0.38,fill:{color:C.navy},line:{color:C.navy}});
    txt(slide,name.toUpperCase(),x+0.42,y+0.78,w*0.52,h*0.18,{fontSize:20,bold:true,color:C.white});
    pill(slide,'EXPLORE',x+0.42,y+1.48,0.86,accent,C.navy);
    [0,1,2].forEach(i=>{box(slide,x+0.18+i*(w-0.42)/3,y+h*0.55,(w-0.54)/3,h*0.27,C.panel,C.panel,0.08,false);});
  } else {
    slide.addShape(pptx.ShapeType.rect,{x:x+0.14,y:y+0.55,w:1.05,h:h-0.7,fill:{color:C.navy},line:{color:C.navy}});
    const compact = h < 2.8;
    const sideCount = compact ? 3 : 5;
    for(let i=0;i<sideCount;i++){slide.addShape(pptx.ShapeType.roundRect,{x:x+0.31,y:y+0.83+i*0.43,w:0.7,h:0.15,rectRadius:0.05,fill:{color:i===0?accent:'41506B',transparency:i===0?0:15},line:{color:i===0?accent:'41506B'}});}
    for(let i=0;i<3;i++){box(slide,x+1.42+i*(w-1.72)/3,y+0.72,(w-1.92)/3,0.68,i===0?C.softBlue:C.panel,i===0?accent:C.panel,0.08,false);txt(slide,['TOTAL','ACTIVE','PENDING'][i],x+1.56+i*(w-1.72)/3,y+0.85,(w-2.15)/3,0.16,{fontSize:7.5,bold:true,color:C.muted});txt(slide,['1,284','86','24'][i],x+1.56+i*(w-1.72)/3,y+1.08,(w-2.15)/3,0.22,{fontSize:14,bold:true,color:C.ink});}
    box(slide,x+1.42,y+1.62,w-1.68,h-1.88,C.pure,C.line,0.08,false);
    const rowCount = compact ? 2 : 5;
    const rowStep = compact ? 0.22 : 0.38;
    const rowBase = compact ? 1.73 : 1.82;
    for(let i=0;i<rowCount;i++){slide.addShape(pptx.ShapeType.line,{x:x+1.63,y:y+rowBase+0.15+i*rowStep,w:w-2.12,h:0,line:{color:C.line,width:0.7}});slide.addShape(pptx.ShapeType.roundRect,{x:x+1.65,y:y+rowBase+i*rowStep,w:0.45+((i*7)%8)/10,h:0.12,rectRadius:0.04,fill:{color:i%2?C.blue:C.emerald},line:{color:i%2?C.blue:C.emerald}});}
  }
}
function overviewCards(slide,items,y=1.82,accent=C.blue){
  const gap=0.16,w=(12.1-gap*(items.length-1))/items.length;
  items.forEach((p,i)=>packageCard(slide,p,0.62+i*(w+gap),y,w,4.78, i===items.length-1?C.lime:accent,false));
}
function detailSlide(kicker,p,flowSteps,accent=C.blue,kind='dashboard',note=''){
  const s=newSlide(); title(s,kicker,p.name,p.outcome);
  packageCard(s,p,0.62,1.76,4.0,4.98,accent,true);
  browserMock(s,p.demo||p.name,4.88,1.76,7.82,3.45,kind,accent);
  if(flowSteps?.length) flow(s,flowSteps,4.88,5.45,7.82,accent,{highlight:true,h:0.85,fontSize:8.8});
  if(note) txt(s,note,4.88,6.44,7.82,0.28,{fontSize:11,bold:true,color:C.ink,align:'center'});
  return s;
}

// Data
const personal=[
 {category:'PERSONAL',name:'Personal Basic',price:'Rp299K',outcome:'Professional one-page presence.',features:['1 landing page','Responsive + CTA','Basic SEO','1 month warranty'],ideal:'CV & portfolio',demo:'Nara Dev Portfolio',icon:'user'},
 {category:'PERSONAL',name:'Personal Standard',price:'Rp499K',outcome:'Credible multipage personal brand.',features:['Up to 5 pages','Analytics + Search Console','General domain 1 year','4 revisions'],ideal:'Freelancer & creator',demo:'Raka Creative',icon:'layers'},
 {category:'CMS',name:'Premium + CMS',price:'Rp799K',outcome:'Self-service portfolio and content.',features:['8–10 pages','Admin dashboard','3–4 content types','Media + SEO fields'],ideal:'Active personal brand',demo:'Aster Professional CMS',icon:'layout-dashboard'},
 {category:'PUBLISHING',name:'Blog Pro',price:'Rp999K+',outcome:'Serious editorial publishing workflow.',features:['Draft / publish','Category + tags','Search + related posts','Per-article SEO'],ideal:'Creator & thought leader',demo:'Insight Journal',icon:'newspaper'}
];
const umkmPresence=[
 {category:'UMKM',name:'UMKM Basic',price:'Rp499K',outcome:'Be found and convert via WhatsApp.',features:['Landing page','Gallery + maps','Basic SEO','No dashboard'],ideal:'Micro business',demo:'Kopi Rona',icon:'store'},
 {category:'UMKM',name:'UMKM Standard',price:'Rp749K',outcome:'A proper multipage business profile.',features:['5–7 pages','Services / products','Portfolio + trust','Analytics'],ideal:'Growing UMKM',demo:'Arunika Interior',icon:'panels-top-left'},
 {category:'CMS',name:'UMKM Premium + CMS',price:'Rp999K',outcome:'Manage products and content in-house.',features:['8–10 pages','Admin dashboard','Product + promo CMS','SEO fields'],ideal:'Frequently updated content',demo:'Kopi Rona CMS',icon:'layout-dashboard'}
];
const business=[
 {category:'BUSINESS',name:'Business Lite',price:'Rp2,25JT+',outcome:'Turn inbound forms into manageable lead data.',features:['Lead database','Source + notes','Status pipeline','Search / export'],ideal:'Service businesses',demo:'Arunika LeadDesk',icon:'database'},
 {category:'BUSINESS',name:'Business',price:'Rp2,99JT+',outcome:'Manage customer and order lifecycle.',features:['Customer database','Orders / requests','Invoice / quotation','Status workflow'],ideal:'Active order process',demo:'CleanFlow Laundry',icon:'workflow'},
 {category:'BUSINESS',name:'Business Pro',price:'Rp3,99JT+',outcome:'Coordinate a multi-staff workflow.',features:['Multi-admin / staff','Notifications','Documents','Expanded reports'],ideal:'Growing teams',demo:'TravelOps Lite',icon:'users'},
 {category:'OPERATIONS',name:'Operational',price:'Rp4,99JT+',outcome:'Run daily business operations in one system.',features:['Staff + customer','Transactions','Role + documents','Operational reports'],ideal:'System as daily tool',demo:'NexaOps Small Business',icon:'network'}
];
const eventPkgs=[
 {category:'EVENT',name:'Event Landing',price:'Rp749K+',outcome:'Campaign and event information.',features:['Agenda + speaker','Venue + sponsor','Countdown + FAQ'],demo:'Tech Summit',icon:'megaphone'},
 {category:'CMS',name:'Event + CMS',price:'Rp999K+',outcome:'Committee-managed event content.',features:['Agenda CMS','Speaker CMS','Announcement'],demo:'Tech Summit Admin',icon:'layout-dashboard'},
 {category:'REGISTRATION',name:'Event Registration',price:'Rp1,499JT+',outcome:'Participant database and confirmation.',features:['Custom form','Search / export','Email confirmation'],demo:'EventReg',icon:'clipboard-list'},
 {category:'CHECK-IN',name:'Registration + QR',price:'Rp2,499JT+',outcome:'Digital identity and venue attendance.',features:['Unique QR','Web scanner','Attendance dashboard'],demo:'EventGate',icon:'qr-code'},
 {category:'COMMERCE',name:'Ticketing + QRIS',price:'Rp3,499JT+',outcome:'Paid ticket lifecycle end-to-end.',features:['Ticket types','QRIS payment','QR ticket + reports'],demo:'Event Ticketing',icon:'ticket'}
];
const commerce=[
 {category:'COMMERCE',name:'Starter',price:'Rp2,499JT+',outcome:'Storefront to admin-managed orders.',features:['Product CMS','Cart + checkout','Manual payment','Order dashboard'],demo:'Lunara Store',icon:'shopping-bag'},
 {category:'COMMERCE',name:'Payment',price:'Rp3,499JT+',outcome:'Automated payment lifecycle.',features:['Everything in Starter','QRIS gateway','Webhook status','Invoice / receipt'],demo:'Lunara Pay',icon:'credit-card'},
 {category:'OPERATIONS',name:'Business',price:'Rp4,999JT+',outcome:'Commerce operations beyond checkout.',features:['Voucher','Inventory','Customer + shipping','Sales reports'],demo:'Lunara Commerce',icon:'package-open'},
 {category:'ADVANCED',name:'Advanced',price:'Rp7,5JT+',outcome:'Advanced retail roles and workflows.',features:['Stock movement','Promotion rules','Return / refund','External integration'],demo:'CommerceOps',icon:'boxes'}
];
const corporate=[
 {category:'CORPORATE',name:'Corporate Website',price:'Rp2,5JT+',outcome:'Credible corporate presence with CMS.',features:['Services + projects','Team + news','Lead form','SEO foundation'],demo:'Nexa Prima Consulting',icon:'building-2'},
 {category:'CORPORATE',name:'Professional',price:'Rp3,5JT+',outcome:'Deeper content and employer presence.',features:['Careers','Newsroom','Case studies','ESG documents'],demo:'Nexa Group',icon:'briefcase-business'},
 {category:'BUSINESS',name:'Corporate Business',price:'Rp5JT+',outcome:'Website connected to business requests.',features:['Lead / request DB','Documents','Quotation flow','Status dashboard'],demo:'Nexa Client Portal Lite',icon:'workflow'}
];
const government=[
 {category:'GOVERNMENT',name:'Website + CMS',price:'Rp5JT+',outcome:'Structured public information portal.',features:['Profile + org','News + agenda','Documents + gallery','Admin CMS'],demo:'Portal Desa Sukamaju',icon:'landmark'},
 {category:'GOVERNANCE',name:'Professional',price:'Rp7,5JT+',outcome:'Content governance and public interaction.',features:['PPID','Complaint / form','Multi-admin','Document search'],demo:'PublicInfo Portal',icon:'file-search'},
 {category:'SERVICE',name:'Digital Public Service',price:'Rp10JT+',outcome:'Citizen submission and staff workflow.',features:['Upload + tracking','Verification','Approval','Reports'],demo:'e-Layanan',icon:'badge-check'},
 {category:'INTEGRATED',name:'Government Integrated',price:'Rp15JT+',outcome:'Cross-unit workflow, audit and integrations.',features:['Multi-role / unit','Approval chain','External API','Audit + reports'],demo:'GovFlow',icon:'network'},
 {category:'ENTERPRISE',name:'Government Enterprise',price:'CUSTOM',outcome:'Strategic public-sector platform.',features:['Security review','SLA','Infrastructure policy'],demo:'Discovery prototype',icon:'shield-check'}
];
const enterprise=[
 {category:'CUSTOM',name:'Custom Business Software',price:'Rp5JT+',outcome:'A focused custom workflow application.',features:['Custom database','Dashboard','Basic roles','Reporting'],demo:'ServiceDesk Custom',icon:'wrench'},
 {category:'ERP',name:'ERP Lite',price:'Rp10JT+',outcome:'Integrate 3–5 internal modules.',features:['Master data','Roles','Basic approval','Import / export'],demo:'NexaERP Lite',icon:'boxes'},
 {category:'ERP',name:'ERP Business',price:'Rp15JT+',outcome:'Cross-module, cross-department process.',features:['5+ modules','Expanded approval','Ops / finance records','Audit activity'],demo:'NexaERP Business',icon:'blocks'},
 {category:'SAAS',name:'SaaS Platform',price:'Rp12,5JT+',outcome:'Multi-customer digital product foundation.',features:['Tenant separation','Subscription','User + super admin','Usage reporting'],demo:'Flowdesk',icon:'cloud'},
 {category:'MARKETPLACE',name:'Marketplace',price:'Rp15JT+',outcome:'Buyer–vendor transaction platform.',features:['Vendor onboarding','Listings + search','Commission / payment','Moderation'],demo:'ServiceHub',icon:'store'},
 {category:'ENTERPRISE',name:'Enterprise Platform',price:'Rp25JT+ / CUSTOM',outcome:'Mission-critical architecture and governance.',features:['Multi-branch','Complex permission','Audit + API','Security + SLA'],demo:'Case-specific prototype',icon:'network'}
];

// 01 Cover
{
 const s=newSlide(C.navy,false);
 s.addShape(pptx.ShapeType.ellipse,{x:8.2,y:-1.8,w:6.3,h:6.3,fill:{color:C.blue,transparency:82},line:{color:C.blue,transparency:100}});
 s.addShape(pptx.ShapeType.ellipse,{x:10.1,y:2.8,w:3.9,h:3.9,fill:{color:C.lime,transparency:88},line:{color:C.lime,transparency:100}});
 s.addImage({path:LOGO_TRANSPARENT,x:0.72,y:0.62,w:2.72,h:0.82,transparency:0});
 pill(s,'FINAL INTERNAL MASTER',0.76,1.75,1.95,C.lime,C.navy);
 txt(s,'PRICING MASTER\nFINAL 2026',0.72,2.22,8.6,2.0,{fontFace:FONT_DISPLAY,fontSize:46,bold:true,color:C.white});
 txt(s,'Service Catalogue  •  Pricing Benchmark  •  Scope  •  Demo  •  Quotation Framework',0.78,4.58,10.7,0.45,{fontSize:15,color:'B8C2D6'});
 txt(s,'SOLIVATE STUDIO — DIGITAL PRODUCT & TECHNOLOGY STUDIO',0.78,6.74,8.8,0.24,{fontSize:9.5,bold:true,color:C.blue,charSpacing:1});
 txt(s,'01 / 83',12.02,6.74,0.72,0.24,{fontSize:9,bold:true,color:C.white,align:'right'});
}
// 02
{
 const s=newSlide(); title(s,'THE PRICING SYSTEM','More Than a Pricelist.','A single system for product positioning, scope control, demos, and quotation.');
 box(s,0.62,1.75,4.25,4.55,C.panel,C.panel,0.18,false); pill(s,'OLD',0.9,2.02,0.7,C.ink,C.white);
 ['Pricelist','Price','Feature count'].forEach((v,i)=>{txt(s,v,1.0,2.72+i*0.83,3.46,0.38,{fontSize:19,bold:i===0,color:i===0?C.ink:C.muted});if(i<2)addIcon(s,'arrow-down',2.47,3.18+i*0.83,0.25,C.muted)});
 box(s,5.12,1.75,7.58,4.55,C.navy,C.navy,0.18,true);pill(s,'2026 SYSTEM',5.45,2.02,1.25,C.lime,C.navy);
 const sys=['Product Catalogue','Pricing Benchmark','Scope Framework','Demo Library','Quotation System'];
 sys.forEach((v,i)=>{addIcon(s,['package','badge-dollar-sign','scan-text','gallery-horizontal-end','file-check'][i],5.48+(i%3)*2.25,2.78+Math.floor(i/3)*1.16,0.34,C.lime);txt(s,v,5.94+(i%3)*2.25,2.7+Math.floor(i/3)*1.16,1.72,0.55,{fontSize:14,bold:true,color:C.white});});
 pill(s,'BENCHMARK ≠ FINAL QUOTATION',8.6,5.66,3.48,C.blue,C.white);
}
// 03 issues
{
 const s=newSlide(); title(s,'WHY IT CHANGED','Six problems the 2026 system fixes.');
 const items=[['Tier Difference','Packages felt too similar.','layers'],['Scope Creep','Cheap tiers carried too much system scope.','expand'],['Business Positioning','Business and corporate needed a higher class.','briefcase-business'],['Government Positioning','Public sector starts at a Rp5JT floor.','landmark'],['Enterprise Positioning','ERP / SaaS / Marketplace are products.','network'],['Sales Enablement','Every tier needs a representative demo.','presentation']];
 items.forEach((a,i)=>{const x=0.62+(i%3)*4.07,y=1.72+Math.floor(i/3)*2.23;box(s,x,y,3.82,1.9,C.pure,C.line,0.16,true);pill(s,String(i+1).padStart(2,'0'),x+0.2,y+0.18,0.48,i===4?C.softRed:C.softBlue,i===4?C.coral:C.blue2);addIcon(s,a[2],x+3.18,y+0.2,0.34,i===4?C.coral:C.blue);txt(s,a[0],x+0.2,y+0.64,3.3,0.36,{fontSize:17,bold:true});txt(s,a[1],x+0.2,y+1.08,3.3,0.55,{fontSize:11,color:C.muted,valign:'top'});});
}
// 04 principles
{
 const s=newSlide();title(s,'GUARDRAILS','Pricing principles','Capability and workload—not client size—drive the adjustment.');
 const ps=[['Outcome First','target'],['Capability Upgrade','trending-up'],['Benchmark, Not Fixed','badge-dollar-sign'],['Project-Specific','fingerprint'],['Third-Party Separate','plug'],['Discovery First','search'],['Workload-Based','gauge'],['Scope Protection','shield-check']];
 ps.forEach((p,i)=>{const x=0.62+(i%4)*3.05,y=1.72+Math.floor(i/4)*1.78;box(s,x,y,2.82,1.47,i===1?C.softLime:C.pure,i===1?C.lime:C.line,0.14,false);addIcon(s,p[1],x+0.2,y+0.2,0.36,i===1?C.ink:C.blue);txt(s,p[0],x+0.2,y+0.73,2.42,0.46,{fontSize:14,bold:true});});
 box(s,0.62,5.53,12.08,0.82,C.navy,C.navy,0.14,false);txt(s,'Adjustment must be justified by workload, risk, stakeholder load, SLA, compliance, or operational impact.',0.92,5.72,11.45,0.35,{fontSize:15,bold:true,color:C.white,align:'center'});
}
// 05 ladder
{
 const s=newSlide(C.navy);darkTitle(s,'CORE MESSAGE','Pricing is based on capability.','What changes is the kind of business problem the product can solve.');
 const levels=[['WEBSITE','Information','Rp299K+','globe'],['CMS','Manage Content','Rp799K+','layout-dashboard'],['BUSINESS','Manage Data','Rp2,25JT+','database'],['OPERATIONAL','Manage Operations','Rp4,99JT+','workflow'],['ENTERPRISE','Manage Scale','Rp10JT+','network']];
 levels.forEach((l,i)=>{const x=0.72+i*2.48,y=4.65-i*0.25,h=1.5+i*0.25;box(s,x,y,2.18,h,i===4?C.lime:'17243B',i===4?C.lime:'293954',0.15,false);addIcon(s,l[3],x+0.18,y+0.18,0.3,i===4?C.navy:C.blue);txt(s,l[0],x+0.18,y+0.55,1.82,0.27,{fontSize:12,bold:true,color:i===4?C.navy:C.white});txt(s,l[1],x+0.18,y+0.86,1.82,0.24,{fontSize:9.5,color:i===4?C.navy:'AAB4C8'});txt(s,l[2],x+0.18,y+h-0.38,1.82,0.24,{fontSize:12,bold:true,color:i===4?C.navy:C.lime});if(i<4)addIcon(s,'arrow-up-right',x+2.24,y+0.18,0.22,C.lime);});
}
// 06 definitions
{
 const s=newSlide();title(s,'PRICE LANGUAGE','Benchmark is not quotation.');
 txt(s,'BENCHMARK',0.62,1.54,5.3,0.78,{fontSize:37,bold:true,align:'right'});txt(s,'≠',6.08,1.54,1.1,0.78,{fontSize:42,bold:true,color:C.coral,align:'center'});txt(s,'FINAL QUOTE',7.3,1.54,5.4,0.78,{fontSize:37,bold:true,color:C.blue2});
 const defs=[['Benchmark Price','Representative reference scope.'],['Category Floor','Internal pricing guardrail.'],['Scope Adjustment','Workload-based variance.'],['Add-on','Additional capability.'],['Final Quotation','Price after discovery.'],['Change Request','Requirement after scope freeze.']];
 defs.forEach((d,i)=>{const x=0.62+(i%3)*4.08,y=2.82+Math.floor(i/3)*1.43;box(s,x,y,3.82,1.18,i===4?C.softLime:C.pure,i===4?C.lime:C.line,0.14,false);txt(s,d[0],x+0.18,y+0.16,3.46,0.3,{fontSize:14,bold:true});txt(s,d[1],x+0.18,y+0.54,3.46,0.34,{fontSize:10.5,color:C.muted});});
}
// 07 pricing engine
{
 const s=newSlide();title(s,'ESTIMATION LOGIC','The pricing engine.','A structured estimation aid—not an automatic calculator.');
 const steps=['Package\nbenchmark','Scope','Feature /\nadd-on','Complexity','Integration','Urgency','Support / SLA'];
 flow(s,steps,0.62,2.28,10.45,C.blue,{h:1.15,fontSize:9});
 txt(s,'=',11.24,2.39,0.42,0.8,{fontSize:32,bold:true,color:C.muted,align:'center'});
 box(s,11.78,2.14,0.92,1.43,C.lime,C.lime,0.14,false);txt(s,'FINAL\nQUOTE',11.87,2.41,0.74,0.75,{fontSize:14,bold:true,color:C.navy,align:'center'});
 ['±','×','×','×','×','×'].forEach((op,i)=>txt(s,op,2.02+i*1.48,3.65,0.35,0.35,{fontSize:18,bold:true,color:C.blue,align:'center'}));
 box(s,2.58,5.08,8.18,0.9,C.navy,C.navy,0.14,false);addIcon(s,'info',2.9,5.35,0.24,C.lime);txt(s,'Final price may be below, at, or above benchmark when actual scope justifies it.',3.32,5.2,7.0,0.52,{fontSize:13,bold:true,color:C.white,align:'center'});
}
// 08 workflow
{
 const s=newSlide();title(s,'FIELD WORKFLOW','Quotation in nine controlled steps.');
 const steps=['Discovery','Package Anchor','Baseline Scope','Complexity & Scale','Gap & Add-ons','Commercial Risk','Floor & Margin','Quotation','Scope Freeze'];
 flow(s,steps,0.62,2.3,12.08,C.blue,{h:1.12,fontSize:9});
 const bands=[['UNDERSTAND','1–3'],['ESTIMATE','4–6'],['COMMIT','7–9']];
 bands.forEach((b,i)=>{const x=0.62+i*4.08;box(s,x,4.35,3.82,1.17,i===2?C.softLime:C.softBlue,i===2?C.lime:C.softBlue,0.13,false);txt(s,b[0],x+0.2,4.55,3.42,0.25,{fontSize:12,bold:true,color:i===2?C.ink:C.blue2,align:'center'});txt(s,b[1],x+0.2,4.9,3.42,0.2,{fontSize:10,color:C.muted,align:'center'});});
}
// 09 scale
{
 const s=newSlide();title(s,'SCALE GUIDE','Client scale informs workload—not automatic markup.');
 const tiers=[['S1','PERSONAL / MICRO','Base'],['S2','SMALL BUSINESS','Base + 0–10%'],['S3','MID MARKET','+10–25%'],['S4','LARGE BUSINESS','+25–50%'],['S5','ENTERPRISE','Custom']];
 tiers.forEach((t,i)=>{const x=0.62+i*2.42,y=4.55-i*0.35,h=1.55+i*0.35;box(s,x,y,2.18,h,i===4?C.navy:C.pure,i===4?C.navy:C.line,0.14,true);pill(s,t[0],x+0.18,y+0.18,0.52,i===4?C.lime:C.softBlue,i===4?C.navy:C.blue2);txt(s,t[1],x+0.18,y+0.64,1.82,0.38,{fontSize:11.5,bold:true,color:i===4?C.white:C.ink});txt(s,t[2],x+0.18,y+h-0.44,1.82,0.24,{fontSize:10.5,bold:true,color:i===4?C.lime:C.blue2});});
 txt(s,'Use only when scale increases actual QA, stakeholder, support, load, risk, or operational impact.',0.8,6.42,11.8,0.32,{fontSize:12,bold:true,color:C.muted,align:'center'});
}
// 10 complexity
{
 const s=newSlide();title(s,'COMPLEXITY','Four tiers of implementation complexity.');
 const levels=[['A — SIMPLE',['1 role','1 workflow','No external integration'],'mouse-pointer-click'],['B — STANDARD',['2–3 roles','Reports + notification','Search / filter'],'sliders-horizontal'],['C — ADVANCED',['Multi-role','Approval + payment/API','Automation'],'workflow'],['D — ENTERPRISE',['Multi-branch','Audit + security + SLA','High availability'],'shield-check']];
 levels.forEach((l,i)=>{const x=0.62+i*3.05,y=4.1-i*0.5,h=2.05+i*0.5;box(s,x,y,2.82,h,i===3?C.navy:C.pure,i===3?C.navy:C.line,0.15,true);addIcon(s,l[2],x+0.22,y+0.2,0.34,i===3?C.lime:C.blue);txt(s,l[0],x+0.22,y+0.67,2.36,0.38,{fontSize:15,bold:true,color:i===3?C.white:C.ink});l[1].forEach((v,j)=>txt(s,v,x+0.22,y+1.17+j*0.32,2.36,0.24,{fontSize:9.7,color:i===3?'B8C2D6':C.muted}));});
}
// 11 discovery
{
 const s=newSlide(C.navy);darkTitle(s,'DISCOVERY CHECKLIST','No discovery. No final price.','Nine questions determine the real scope.');
 const q=[['Users & Roles','users'],['Workflow','workflow'],['Modules','blocks'],['Data','database'],['Integration','plug'],['Security','shield'],['Deadline','clock'],['Support','life-buoy'],['Stakeholders','user-check']];
 q.forEach((v,i)=>{const x=0.72+(i%5)*2.48,y=2.65+Math.floor(i/5)*1.26;box(s,x,y,2.18,0.98,i===8?C.lime:'17243B',i===8?C.lime:'293954',0.13,false);addIcon(s,v[1],x+0.18,y+0.29,0.3,i===8?C.navy:C.blue);txt(s,v[0],x+0.62,y+0.2,1.38,0.48,{fontSize:12,bold:true,color:i===8?C.navy:C.white});});
 txt(s,'Also confirm sensitive data, deployment model, source handover, reviewers, and approval authority.',0.75,5.54,11.8,0.44,{fontSize:13,color:'AAB4C8',align:'center'});
}

sectionDivider('02','DIGITAL\nPRESENCE','Personal • Wedding • Institution','FROM ONLINE → MANAGED CONTENT'); //12
//13 personal overview
{const s=newSlide();title(s,'PERSONAL / NON-PROFIT','A clear upgrade path from presence to publishing.');flow(s,['Landing','Multipage','CMS','Publishing'],0.62,1.45,12.08,C.blue,{h:0.62});overviewCards(s,personal,2.28,C.blue);}
//14 personal basic/standard detail
{
 const s=newSlide();title(s,'PERSONAL','Basic vs Standard','The price increase buys structure, credibility, and ownership—not CMS.');
 packageCard(s,personal[0],0.62,1.58,5.88,4.95,C.blue,true);packageCard(s,personal[1],6.82,1.58,5.88,4.95,C.blue,true);
 pill(s,'LANDING → MULTIPAGE',5.08,6.42,3.12,C.lime,C.navy);
}
//15 premium/blog
{
 const s=newSlide();title(s,'PERSONAL','CMS vs Publication workflow');packageCard(s,personal[2],0.62,1.58,5.88,4.15,C.blue,true);packageCard(s,personal[3],6.82,1.58,5.88,4.15,C.lime,true);
 flow(s,['Personal Website','Content Management','Publication Workflow'],2.25,5.95,8.84,C.blue,{h:0.48,fontSize:8.5,highlight:true});
}
//16 wedding
{
 const s=newSlide();title(s,'WEDDING SOLUTIONS','From invitation experience to guest operations.');
 const names=[['Wedding Basic','Rp149–249K','Invitation'],['Wedding Premium','Rp349–499K','Interactive'],['Wedding RSVP','Rp699K+','Guest database'],['QR Management','Rp999K+','QR check-in'],['Wedding Pro','Rp1,499JT+','Guest operations']];
 names.forEach((a,i)=>packageCard(s,{category:'WEDDING',name:a[0],price:a[1],outcome:a[2],features:[['Info + maps','Gallery + music','No database'],['Guest name','RSVP / gift / video','Interactive UX'],['RSVP stored','Guest management','Admin dashboard'],['Unique QR','Scanner','Attendance dashboard'],['Category + pax','Bulk import','Multi-scanner']][i],demo:i<2?'Alya & Fikri':'Alya & Fikri Guest Desk',icon:i<2?'heart':'qr-code'},0.62+i*2.44,1.64,2.18,4.9,i===4?C.lime:C.blue,false));
}
//17 institution
{
 const s=newSlide();title(s,'INSTITUTIONAL / NON-GOVERNMENT','A structured path for foundations, communities, and social institutions.');
 const arr=[['Landing','Rp499K','Campaign page','1 landing page'],['Profile','Rp749K','Institution profile','5–7 pages'],['Institutional CMS','Rp999K','Routine updates','News + program + gallery'],['Institutional Pro','Rp1,499JT+','Active institution','Event + documents + forms']];
 arr.forEach((a,i)=>packageCard(s,{category:'INSTITUTION',name:a[0],price:a[1],outcome:a[2],features:[a[3],'Responsive + SEO',i>1?'Admin dashboard':'Developer-managed',i===3?'Search / filter':'Clear content structure'],demo:'Yayasan Al-Falah',icon:'school'},0.62+i*3.05,1.7,2.82,4.88,i===3?C.lime:C.blue,false));
}
//18 terms
{
 const s=newSlide();title(s,'SCOPE FOUNDATION','Terms that protect low-tier pricing.','Reference-level details remain visible without overwhelming package comparisons.');
 const rules=[['Under Rp400K','Solivate subdomain unless agreed otherwise.','link'],['From Rp400K','General domain 1 year, subject to availability.','globe'],['Hosting & SSL','Included by package; special infrastructure separate.','server'],['Warranty','Bug fixes in approved scope only.','bug'],['Third-party cost','Gateway, WhatsApp, SMS, maps, AI API separate.','plug'],['Revisions','Requirement changes become change requests.','refresh-cw']];
 rules.forEach((r,i)=>{const x=0.62+(i%3)*4.08,y=1.66+Math.floor(i/3)*2.13;box(s,x,y,3.82,1.82,C.pure,C.line,0.15,true);addIcon(s,r[2],x+0.22,y+0.24,0.36,C.blue);txt(s,r[0],x+0.75,y+0.19,2.84,0.36,{fontSize:15,bold:true});txt(s,r[1],x+0.22,y+0.78,3.36,0.7,{fontSize:11,color:C.muted,valign:'top'});});
}

sectionDivider('03','BUSINESS\nSYSTEMS','From digital presence to actual operations.','DATA → TRANSACTION → WORKFLOW'); //19
//20 UMKM presence
{const s=newSlide();title(s,'UMKM — DIGITAL PRESENCE','Presence before process.');flow(s,['Landing','Multipage','Self-Service CMS'],1.45,1.46,10.4,C.blue,{h:0.64,highlight:true});const gap=0.22,w=3.88;umkmPresence.forEach((p,i)=>packageCard(s,p,0.62+i*(w+gap),2.28,w,4.3,i===2?C.lime:C.blue,false));}
//21 business overview
{const s=newSlide();title(s,'UMKM — BUSINESS SYSTEM','What changes when the client pays more?');flow(s,['Lead','Order','Multi-Staff Workflow','Internal Operations'],0.62,1.43,12.08,C.blue,{h:0.66,highlight:true});overviewCards(s,business,2.25,C.blue);}
detailSlide('UMKM BUSINESS LITE',business[0],['Consultation form','Lead database','New','Contacted','Qualified','Closed'],C.blue,'dashboard','WHAT CHANGED?  CMS → CUSTOMER DATA'); //22
detailSlide('UMKM BUSINESS',business[1],['Customer','Order','Processing','Ready','Completed','Invoice'],C.blue,'dashboard','LEAD MANAGEMENT → TRANSACTION LIFECYCLE'); //23
detailSlide('UMKM BUSINESS PRO',business[2],['Booking','Verification','Invoice','Payment status','Document','Completion'],C.blue,'dashboard','UPGRADE: MULTI-STAFF • NOTIFICATION • DOCUMENTS • REPORTING'); //24
//25 operational orbit
{
 const s=newSlide(C.navy);darkTitle(s,'UMKM OPERATIONAL','NexaOps Small Business','This is no longer a website with extra features. It is operational software.');
 const centerX=6.66,centerY=4.38; s.addShape(pptx.ShapeType.ellipse,{x:centerX-1.05,y:centerY-1.05,w:2.1,h:2.1,fill:{color:C.lime},line:{color:C.lime}});txt(s,'OPS\nCORE',centerX-0.82,centerY-0.45,1.64,0.9,{fontSize:23,bold:true,color:C.navy,align:'center'});
 const nodes=[['Staff','users'],['Customer','contact'],['Transaction','receipt-text'],['Documents','files'],['Workflow','workflow'],['Reports','chart-no-axes-combined']];
 nodes.forEach((n,i)=>{const ang=(-90+i*60)*Math.PI/180,x=centerX+3.25*Math.cos(ang)-0.9,y=centerY+1.75*Math.sin(ang)-0.48;lineBetween(s,centerX,centerY,x+0.9,y+0.46,C.blue,1.2,true);box(s,x,y,1.8,0.92,'17243B','33415C',0.13,false);addIcon(s,n[1],x+0.18,y+0.28,0.28,C.blue);txt(s,n[0],x+0.58,y+0.22,1.02,0.45,{fontSize:12,bold:true,color:C.white});});
}
sectionDivider('03','EVENT','Experience → Operations','CAMPAIGN → CONTENT → COMMERCE'); //26
//27 event overview
{const s=newSlide();title(s,'EVENT PACKAGE LANDSCAPE','Every tier adds a new operational capability.');flow(s,['Campaign','Content','Participants','Check-in','Commerce'],0.62,1.42,12.08,C.blue,{h:0.62,highlight:true});eventPkgs.forEach((p,i)=>packageCard(s,p,0.62+i*2.44,2.2,2.18,4.58,i===4?C.lime:C.blue,false));}
detailSlide('EVENT REGISTRATION',eventPkgs[2],['Registration','Confirmation','Participant database'],C.blue,'dashboard','PARTICIPANT DATA LIVES IN THE SYSTEM'); //28
detailSlide('EVENT REGISTRATION + QR',eventPkgs[3],['Register','QR pass','Scan','Attendance'],C.blue,'dashboard','DIGITAL IDENTITY + ON-SITE OPERATIONS'); //29
detailSlide('EVENT TICKETING + QRIS',eventPkgs[4],['Choose ticket','Checkout','QRIS','Paid','QR ticket','Scan','Sales & attendance'],C.lime,'dashboard','PROVIDER / PAYMENT GATEWAY FEES REMAIN SEPARATE'); //30
//31 institutional ops
{
 const s=newSlide();title(s,'INSTITUTIONAL OPERATIONS','Modules replace pages. Workflows replace content updates.');
 const ps=[{name:'Operational Lite',price:'Rp1,999JT+',outcome:'One operational module.',features:['Database + dashboard','Status tracking','Basic reports'],demo:'EduAdmin Lite',icon:'database'},{name:'Operational Standard',price:'Rp2,999JT+',outcome:'Two to three integrated modules.',features:['Integrated data','Documents','Expanded reports'],demo:'EduAdmin Lite',icon:'blocks'},{name:'Operational Pro',price:'Rp4,499JT+',outcome:'Complex institutional workflow.',features:['Multi-role','Approval / QR / payment','Advanced reporting'],demo:'Masjid Program Manager',icon:'workflow'}];
 ps.forEach((p,i)=>packageCard(s,{...p,category:'INSTITUTION'},0.62+i*4.08,1.65,3.82,4.95,i===2?C.lime:C.blue,true));
}
//32 commerce overview
{const s=newSlide();title(s,'E-COMMERCE','From storefront to advanced retail operations.');flow(s,['Storefront','Payment','Commerce Operations','Advanced Retail'],0.62,1.42,12.08,C.blue,{h:0.62,highlight:true});overviewCards(s,commerce,2.2,C.blue);}
detailSlide('E-COMMERCE STARTER',commerce[0],['Storefront','Cart','Checkout','Admin order'],C.blue,'website','COMMERCE FOUNDATION • MANUAL PAYMENT'); //33
detailSlide('E-COMMERCE PAYMENT',commerce[1],['Checkout','QRIS','Paid','Invoice','Admin order'],C.blue,'dashboard','AUTOMATIC PAYMENT LIFECYCLE'); //34
//35 business advanced comparison
{
 const s=newSlide();title(s,'E-COMMERCE','Business vs Advanced','Advanced is for retail operations that exceed the UMKM template.');
 packageCard(s,commerce[2],0.62,1.56,5.88,5.02,C.blue,true);packageCard(s,commerce[3],6.82,1.56,5.88,5.02,C.lime,true);
 pill(s,'SINGLE MERCHANT ONLY — MULTI-VENDOR MOVES TO MARKETPLACE',3.56,6.48,6.24,C.navy,C.white);
}

sectionDivider('04','OPERATIONAL\nPRODUCTS','POS • Booking • CRM','TOOLS USED EVERY DAY'); //36
//37 POS cards
{
 const s=newSlide();title(s,'POINT OF SALE','From a cashier screen to retail operations.');
 const ps=[{name:'POS Lite',price:'Rp2,25JT+',outcome:'One-outlet cashier foundation.',features:['Cashier','Product','Basic stock','Transactions'],icon:'monitor'},{name:'POS Business',price:'Rp3,5JT+',outcome:'Active retail / F&B operations.',features:['Inventory','Supplier + purchase','Expense','Customer'],icon:'shopping-cart'},{name:'POS Pro',price:'Rp5JT+',outcome:'Advanced store operations.',features:['Multi-cashier','Permission','Stock movement','QRIS + reports'],icon:'scan-line'}];
 ps.forEach((p,i)=>packageCard(s,{...p,category:'POS',demo:'Rasa Raya Cafe'},0.62+i*4.08,1.65,3.82,4.98,i===2?C.lime:C.blue,true));
}
//38 POS mock
{
 const s=newSlide();title(s,'POS CAPABILITY','Rasa Raya Cafe — capability coverage by tier.');browserMock(s,'Rasa Raya Cafe — Cashier',0.62,1.55,7.45,4.98,'dashboard',C.blue);
 const caps=['Product','Stock','Transaction','Supplier','Purchase','Expense','Customer','Multi Cashier','QRIS','Reports'];
 caps.forEach((c,i)=>{const tier=i<3?'LITE':i<7?'BUSINESS':'PRO';const color=tier==='LITE'?C.blue:tier==='BUSINESS'?C.emerald:C.lime;const cx=8.36+(i%2)*2.18, cy=1.55+Math.floor(i/2)*0.94, tagW=tier==='BUSINESS'?0.86:0.62;box(s,cx,cy,1.95,0.72,tier==='PRO'?C.softLime:C.pure,tier==='PRO'?C.lime:C.line,0.11,false);pill(s,tier,cx+0.14,cy+0.13,tagW,color,tier==='PRO'?C.navy:C.white);txt(s,c,cx+0.26+tagW,cy+0.11,1.5-tagW,0.34,{fontSize:9.7,bold:true});});
}
//39 booking
{
 const s=newSlide();title(s,'BOOKING','UrbanCut Barbershop — from time slot to resource allocation.');
 const ps=[{name:'Booking Basic',price:'Rp1,5JT+',outcome:'Simple reservations.',features:['Booking form','Basic availability','Status'],icon:'calendar'},{name:'Booking Business',price:'Rp2,5JT+',outcome:'Capacity, notification, and payment.',features:['Time slot','Customer database','Notification','Payment optional'],icon:'calendar-check'},{name:'Booking Pro',price:'Rp4JT+',outcome:'Multi-resource scheduling.',features:['Staff / room / resource','Allocation rules','Advanced reports'],icon:'calendar-range'}];ps.forEach((p,i)=>packageCard(s,{...p,category:'BOOKING',demo:'UrbanCut Barbershop'},0.62+i*4.08,1.55,3.82,4.25,i===2?C.lime:C.blue,false));flow(s,['Service','Barber','Date','Time','Customer','Status'],0.62,6.02,12.08,C.blue,{h:0.68,highlight:true});
}
//40 CRM
{
 const s=newSlide();title(s,'CRM','Nexa Sales CRM — from pipeline visibility to automation.');
 const ps=[{name:'CRM Lite',price:'Rp2,5JT+',outcome:'Simple lead pipeline.',features:['Lead + customer','Status + notes','Dashboard'],icon:'users'},{name:'CRM Business',price:'Rp4JT+',outcome:'A working sales team system.',features:['Assignment','Follow-up','Quotation','Activity reports'],icon:'contact-round'},{name:'CRM Pro',price:'Rp6JT+',outcome:'Custom sales workflow.',features:['Automation','Approval','Integration','Advanced reporting'],icon:'workflow'}];ps.forEach((p,i)=>packageCard(s,{...p,category:'CRM',demo:'Nexa Sales CRM'},0.62+i*4.08,1.55,3.82,4.25,i===2?C.lime:C.blue,false));flow(s,['Lead','Qualification','Assignment','Follow-up','Quotation','Won / Lost'],0.62,6.02,12.08,C.blue,{h:0.68,highlight:true});
}
sectionDivider('05','CORPORATE\nSYSTEMS','Corporate Presence → Business Function → Operations'); //41
//42 corporate cards
{const s=newSlide();title(s,'CORPORATE WEBSITE','Corporate capability—not merely more pages.');corporate.forEach((p,i)=>packageCard(s,p,0.62+i*4.08,1.55,3.82,5.08,i===2?C.lime:C.blue,true));}
detailSlide('CORPORATE WEBSITE',corporate[0],['Services','Projects','Team','Testimonials','News','Lead'],C.blue,'website','CORPORATE UX + CMS + REVIEW STANDARD'); //43
detailSlide('CORPORATE PROFESSIONAL',corporate[1],['Careers','Newsroom','Case studies','ESG documents','Multi-content CMS'],C.blue,'website','DEEPER INFORMATION ARCHITECTURE'); //44
detailSlide('CORPORATE BUSINESS',corporate[2],['Inquiry','Qualification','Quotation / request','Documents','Status'],C.lime,'dashboard','CONTENT → BUSINESS FUNCTION'); //45
//46 corp ops
{
 const s=newSlide();title(s,'CORPORATE OPERATIONAL SYSTEMS','Workflows become integrated operating infrastructure.');
 const ps=[['Operational Lite','Rp5JT+','1–2 workflows',['Dashboard + DB','Roles + tracking','Reports']],['Operational Standard','Rp7,5JT+','3–5 modules',['Staff + customer','Transactions + documents','Workflow']],['Operational Pro','Rp10JT+','Cross-process',['Approval','Finance records','Audit log']],['Enterprise Operational','Rp15JT+ / CUSTOM','Multi-branch / division',['SLA','Integration + security','Scale']]];
 ps.forEach((p,i)=>packageCard(s,{category:'OPERATIONS',name:p[0],price:p[1],outcome:p[2],features:p[3],demo:'ProcureFlow',icon:'workflow'},0.62+i*3.05,1.62,2.82,4.95,i===3?C.lime:C.blue,false));
}
//47 ProcureFlow
detailSlide('OPERATIONAL SHOWCASE',{category:'PROCUREMENT',name:'ProcureFlow',price:'Rp5JT+ → CUSTOM',outcome:'A true operational system across request, approval, procurement, vendor, and finance.',features:['Role-aware dashboard','Approval history','Vendor records','Finance status','Operational reporting'],ideal:'Corporate operations',demo:'ProcureFlow',icon:'workflow'},['Purchase request','Manager approval','Procurement','Vendor','Finance','Completed','Reports'],C.lime,'dashboard','THE VISUAL DIVIDER: BUSINESS WEBSITE → OPERATIONAL SYSTEM');

sectionDivider('05','GOVERNMENT\n& PUBLIC SERVICE','Public information → service delivery → integrated government','CATEGORY FLOOR ≥ RP5JT'); //48
//49 landscape
{const s=newSlide();title(s,'GOVERNMENT LANDSCAPE','Requirement, stakeholder, governance, and risk create a distinct category.');government.forEach((p,i)=>packageCard(s,p,0.62+i*2.44,1.62,2.18,5.05,i>=3?C.lime:C.blue,false));}
detailSlide('GOVERNMENT WEBSITE',government[0],['Profile','Organization','News','Agenda','Documents','Gallery','CMS'],C.blue,'website','GOVERNMENT FLOOR APPLIES EVEN WHEN FEATURES RESEMBLE CORPORATE CMS'); //50
detailSlide('GOVERNMENT PROFESSIONAL',government[1],['PPID','Documents','Complaint','Multi-admin','Reports'],C.blue,'dashboard','PUBLIC INFORMATION → CONTENT GOVERNANCE + INTERACTION'); //51
//52 public service split
{
 const s=newSlide();title(s,'DIGITAL PUBLIC SERVICE','e-Layanan','A citizen-facing service application—not an information website.');
 box(s,0.62,1.54,5.8,4.82,C.pure,C.line,0.16,true);pill(s,'CITIZEN',0.9,1.82,0.9,C.softBlue,C.blue2);flow(s,['Submit','Upload','Reference no.','Tracking'],0.9,2.54,5.22,C.blue,{h:0.86,fontSize:8.8,highlight:true});browserMock(s,'e-Layanan — Citizen',0.9,3.68,5.22,2.3,'website',C.blue);
 box(s,6.72,1.54,5.98,4.82,C.navy,C.navy,0.16,true);pill(s,'STAFF',7.0,1.82,0.76,C.lime,C.navy);flow(s,['Verification','Approval','Result'],7.0,2.54,5.42,C.lime,{h:0.86,fontSize:8.8,highlight:true});browserMock(s,'e-Layanan — Staff',7.0,3.68,5.42,2.3,'dashboard',C.lime);
}
detailSlide('GOVERNMENT INTEGRATED',government[3],['Citizen','Government units','Approval chain','External API','Audit & reporting'],C.lime,'dashboard','CROSS-UNIT WORKFLOW + OPERATIONAL IMPACT'); //53
//54 healthcare
{
 const s=newSlide();title(s,'HEALTHCARE','Capability grows alongside data sensitivity and operational risk.');
 const ps=[['Clinic Website + CMS','Rp2,5JT+','Profile + doctors + content'],['Clinic + Booking','Rp3,5JT+','Appointment + contact database'],['Clinic Management Lite','Rp7,5JT+','Patient + visit + billing + stock'],['Healthcare System','Rp15JT+','Multi-workflow + integration'],['Hospital / Enterprise','CUSTOM','Multi-department + SLA']];
 ps.forEach((p,i)=>packageCard(s,{category:'HEALTHCARE',name:p[0],price:p[1],outcome:p[2],features:i<2?['Doctors + services','Schedule / booking','CMS']:['Role + workflow','Reports','Security review'],demo:i<2?'Klinik Sehat Sentosa':'ClinicOps',icon:'heart-pulse'},0.62+i*2.44,1.63,2.18,5.04,i>=3?C.coral:C.blue,false));
}
//55 health risk
{
 const s=newSlide(C.navy);darkTitle(s,'HEALTHCARE RISK','Higher data sensitivity.','Sensitive data and regulated integrations change the delivery model.');
 const risks=[['Security Review','shield-check'],['Sensitive Data','database-zap'],['External Integration','plug-zap'],['Audit','file-clock'],['Custom Discovery','search-check']];risks.forEach((r,i)=>{const x=0.72+i*2.48;box(s,x,2.75,2.18,1.25,i===0?C.softRed:'17243B',i===0?C.coral:'33415C',0.14,false);addIcon(s,r[1],x+0.2,3.03,0.34,i===0?C.coral:C.blue);txt(s,r[0],x+0.68,2.92,1.28,0.53,{fontSize:12,bold:true,color:i===0?C.ink:C.white});});
 box(s,1.5,4.72,10.33,1.05,C.softRed,C.coral,0.14,false);txt(s,'SATUSEHAT / BPJS • advanced pharmacy / lab • large-scale sensitive records',1.82,4.91,9.7,0.3,{fontSize:15,bold:true,color:C.ink,align:'center'});txt(s,'MANDATORY: DISCOVERY + SECURITY REVIEW + CUSTOM QUOTATION',1.82,5.35,9.7,0.26,{fontSize:11,bold:true,color:C.coral,align:'center'});
}

sectionDivider('06','PRODUCT\nPLATFORMS','ERP • SaaS • Marketplace • Enterprise','ARCHITECTURE MATTERS'); //56
//57 enterprise landscape
{
 const s=newSlide();title(s,'ENTERPRISE PRODUCT LANDSCAPE','Architecture, tenancy, governance, and maintainability set the class.');
 enterprise.forEach((p,i)=>{const row=Math.floor(i/3),col=i%3;packageCard(s,{...p,features:[p.features[0]],demo:''},0.62+col*4.08,1.52+row*2.65,3.82,2.45,i===5?C.lime:C.blue,false);});
}
detailSlide('CUSTOM BUSINESS SOFTWARE',enterprise[0],['Request','Ticket','Workflow','Report'],C.blue,'dashboard','ONE CLEAR PROBLEM • CUSTOM SCOPE'); //58
//59 ERP comparison
{
 const s=newSlide();title(s,'ERP','Integrated modules—not a bundle of independent features.');packageCard(s,enterprise[1],0.62,1.54,5.88,4.15,C.blue,true);packageCard(s,enterprise[2],6.82,1.54,5.88,4.15,C.lime,true);flow(s,['Procurement','Inventory','Sales','Finance'],3.14,5.95,7.05,C.blue,{h:0.48,fontSize:8.5,highlight:true});
}
detailSlide('SAAS PLATFORM',enterprise[3],['Organization signup','Workspace','Users','Core product','Subscription','Super admin'],C.lime,'dashboard','MULTI-CUSTOMER PRODUCT • TENANT LIFECYCLE'); //60
//61 marketplace
{
 const s=newSlide();title(s,'MARKETPLACE','ServiceHub','A two-sided system is structurally different from single-merchant e-commerce.');
 box(s,0.62,1.55,3.3,4.85,C.softBlue,C.blue,0.16,true);addIcon(s,'user-round',1.92,2.05,0.62,C.blue2);txt(s,'BUYER',0.92,2.83,2.7,0.42,{fontSize:24,bold:true,align:'center'});txt(s,'Account • Search • Order • Payment',0.92,3.42,2.7,0.55,{fontSize:12,color:C.muted,align:'center'});
 box(s,5.02,1.2,3.3,5.55,C.navy,C.navy,0.18,true);addIcon(s,'store',6.34,1.74,0.62,C.lime);txt(s,'MARKETPLACE\nCORE',5.42,2.56,2.5,0.9,{fontSize:25,bold:true,color:C.white,align:'center'});['Onboarding','Listing','Commission','Moderation'].forEach((v,i)=>pill(s,v,5.44+(i%2)*1.28,4.08+Math.floor(i/2)*0.55,1.08,'27344D',C.white));
 box(s,9.4,1.55,3.3,4.85,C.softLime,C.lime,0.16,true);addIcon(s,'briefcase-business',10.7,2.05,0.62,C.navy);txt(s,'VENDOR',9.7,2.83,2.7,0.42,{fontSize:24,bold:true,align:'center'});txt(s,'Onboarding • Listing • Fulfilment • Payout',9.7,3.42,2.7,0.55,{fontSize:12,color:C.muted,align:'center'});
 ['arrow-right-left','arrow-right-left'].forEach((ic,i)=>addIcon(s,ic,4.28+i*4.46,3.38,0.42,C.blue));
}
//62 enterprise dark
{
 const s=newSlide(C.navy);darkTitle(s,'ENTERPRISE PLATFORM','Rp25JT+ / Custom','Mission-critical products are designed through discovery—not selected from a checklist.');
 const caps=['Multi Branch','Role & Permission','Approval','Audit','API','Security','Infrastructure','SLA'];caps.forEach((v,i)=>{const x=0.72+(i%4)*3.06,y=2.48+Math.floor(i/4)*1.12;box(s,x,y,2.76,0.88,'17243B','33415C',0.12,false);addIcon(s,['git-branch','key-round','badge-check','scan-eye','plug','shield-check','server','life-buoy'][i],x+0.2,y+0.27,0.3,C.blue);txt(s,v,x+0.65,y+0.18,1.9,0.52,{fontSize:12,bold:true,color:C.white});});
 box(s,2.48,5.22,8.38,0.92,C.lime,C.lime,0.15,false);txt(s,'DISCOVERY IS MANDATORY',2.8,5.43,7.75,0.38,{fontSize:21,bold:true,color:C.navy,align:'center'});
}

//63 add-ons
{
 const s=newSlide();title(s,'ADD-ON MARKETPLACE','Guidance ranges for initial estimation—not public fixed prices.');
 const a=[['Additional Page','Rp100–250K','file-plus-2'],['CMS Content Type','Rp250–500K','database'],['Role / Permission','Rp300–750K','key-round'],['Approval Workflow','Rp500K–1,5JT','workflow'],['Payment Gateway','Rp750K–1,5JT','credit-card'],['WhatsApp / API','Rp500K–1,5JT+','message-circle'],['Shipping','Rp750K–1,5JT+','truck'],['QR + Scanner','Rp500K–1JT','qr-code'],['Advanced Report','Rp300K–1JT+','chart-no-axes-combined'],['Multi-branch','Rp1JT+','git-branch'],['External API','Rp500K+','plug'],['Data Migration','Rp500K+','database-backup'],['Urgent Delivery','+20–50%','clock-alert']];
 a.forEach((v,i)=>{const col=i%4,row=Math.floor(i/4),x=0.62+col*3.05,y=1.49+row*1.35;box(s,x,y,2.82,1.09,i===12?C.softAmber:C.pure,i===12?C.amber:C.line,0.12,false);addIcon(s,v[2],x+0.18,y+0.25,0.32,i===12?C.amber:C.blue);txt(s,v[0],x+0.63,y+0.16,1.94,0.3,{fontSize:11.2,bold:true});txt(s,v[1],x+0.63,y+0.54,1.94,0.28,{fontSize:10.5,bold:true,color:i===12?C.ink:C.blue2});});
}
//64 upgrade rule
{
 const s=newSlide();title(s,'PACKAGE DISCIPLINE','When add-ons become an upgrade.');
 flow(s,['Base package','Add-on','Add-on','Add-on','Wrong package?'],0.62,1.62,12.08,C.coral,{h:0.92,highlight:true});
 const rules=[['Upgrade Package','Capability now matches the next tier.','arrow-up-circle'],['Re-Scope','Roles, workflow, or integration change architecture.','scan-search'],['Move Category','Multi-vendor, multi-tenant, multi-branch, regulated, or mission-critical.','shuffle']];
 rules.forEach((r,i)=>{const x=0.62+i*4.08;box(s,x,3.24,3.82,2.18,i===2?C.navy:C.pure,i===2?C.navy:C.line,0.16,true);addIcon(s,r[2],x+0.22,3.52,0.42,i===2?C.lime:C.blue);txt(s,r[0],x+0.22,4.08,3.38,0.38,{fontSize:18,bold:true,color:i===2?C.white:C.ink});txt(s,r[1],x+0.22,4.57,3.38,0.62,{fontSize:11,color:i===2?'B8C2D6':C.muted,valign:'top'});});
 txt(s,'Do not hide a large project inside a cheap base package plus many add-ons.',1.8,5.95,9.75,0.42,{fontSize:15,bold:true,color:C.coral,align:'center'});
}
//65 sales map
{
 const s=newSlide(C.navy);darkTitle(s,'SALES DECISION MAP','What does the client actually need?');
 const map=[['Online presence?','Website','globe'],['Manage content?','CMS','layout-dashboard'],['Lead / customer / order?','Business','database'],['Daily internal operations?','Operational','workflow'],['Payment / commerce?','Event / E-Commerce','credit-card'],['Cashier / stock?','POS','monitor'],['Scheduling?','Booking','calendar'],['Sales pipeline?','CRM','users'],['Integrated modules?','ERP','boxes'],['Multiple customer orgs?','SaaS','cloud'],['Buyer + vendor?','Marketplace','store'],['Government?','Government Framework','landmark'],["Doesn't fit?",'Discovery + Custom Quote','search']];
 map.forEach((m,i)=>{const x=0.72+(i%4)*3.05,y=1.88+Math.floor(i/4)*1.25,w=i===12?12.0:2.78;box(s,x,y,w,0.98,i===12?C.lime:'17243B',i===12?C.lime:'33415C',0.12,false);addIcon(s,m[2],x+0.18,y+0.31,0.3,i===12?C.navy:C.blue);txt(s,m[0],x+0.6,y+0.12,i===12?4.5:1.95,0.3,{fontSize:9.5,color:i===12?C.navy:'AAB4C8'});txt(s,`→ ${m[1]}`,x+0.6,y+0.47,i===12?10.9:1.95,0.3,{fontSize:10.7,bold:true,color:i===12?C.navy:C.white});});
}
//66 scripts
{
 const s=newSlide();title(s,'SALES LANGUAGE','Three scripts to protect positioning and trust.');
 const scripts=[['WHY THIS TIER?','Paket lebih rendah fokus pada informasi/konten. Paket ini sudah masuk database dan workflow operasional—bukan sekadar jumlah halaman.'],['PRICE BEFORE SCOPE?','Kebutuhan seperti ini mengacu ke paket sekitar RpX. Angka final mengikuti role, workflow, integration, data, timeline, dan scale.'],['WHY DIFFERENT FROM BENCHMARK?','Pricelist adalah referensi kelas kebutuhan. Final quote mengikuti scope aktual agar client tidak overpay dan delivery tidak under-scoped.']];
 scripts.forEach((a,i)=>{const x=0.62+i*4.08;box(s,x,1.65,3.82,4.75,i===0?C.softLime:C.pure,i===0?C.lime:C.line,0.17,true);pill(s,String(i+1).padStart(2,'0'),x+0.24,1.94,0.48,i===0?C.lime:C.softBlue,i===0?C.navy:C.blue2);txt(s,a[0],x+0.24,2.58,3.34,0.5,{fontSize:16,bold:true});txt(s,'“',x+0.24,3.16,0.5,0.55,{fontSize:35,bold:true,color:i===0?C.lime:C.blue});txt(s,a[1],x+0.68,3.22,2.86,2.25,{fontSize:13,color:C.ink,valign:'top',italic:true});});
}

//67 demo library
{
 const s=newSlide();title(s,'DEMO LIBRARY','P0 — build first for the most common needs and price tiers.');
 const demos=[['P01','Personal Portfolio','Personal Basic','user'],['U01','Kopi Rona','UMKM Basic','coffee'],['U04','LeadDesk','Business Lite','database'],['E01','Tech Summit','Event Landing','ticket'],['E04','Event Ticketing','Ticketing + QRIS','qr-code'],['C02','Lunara Pay','E-Commerce Payment','credit-card'],['CRM01','Nexa Sales CRM','CRM','users'],['COR01','Nexa Corporate','Corporate Website','building-2'],['OPS01','ProcureFlow','Operational System','workflow']];
 demos.forEach((d,i)=>{const x=0.62+(i%3)*4.08,y=1.46+Math.floor(i/3)*1.72;box(s,x,y,3.82,1.47,i===8?C.softLime:C.pure,i===8?C.lime:C.line,0.14,true);pill(s,d[0],x+0.18,y+0.18,0.68,C.navy,C.white);addIcon(s,d[3],x+3.22,y+0.18,0.34,i===8?C.ink:C.blue);txt(s,d[1],x+0.18,y+0.62,3.3,0.34,{fontSize:14,bold:true});txt(s,d[2],x+0.18,y+1.03,3.3,0.22,{fontSize:9.5,color:C.muted});});
}
//68 roadmap
{
 const s=newSlide();title(s,'DEMO ROADMAP','Build sequence follows sales frequency—not category prestige.');
 const cols=[['P0','BUILD FIRST',['P01 Personal','U01 Kopi Rona','U04 LeadDesk','E01 Tech Summit','E04 Ticketing','C02 Lunara Pay','CRM01 CRM','COR01 Corporate','OPS01 ProcureFlow']],['P1','BUILD NEXT',['P03 Personal CMS','U05 Laundry','POS01 Rasa Raya','B01 UrbanCut','GOV01 Portal Desa','GOV03 e-Layanan','ERP01 NexaERP','SAAS01 Flowdesk']],['P2','PIPELINE ACTIVE',['W02 Wedding QR','HC01 Clinic Booking','MKT01 ServiceHub']]];
 cols.forEach((c,i)=>{const x=0.62+i*4.08;box(s,x,1.48,3.82,5.12,i===0?C.navy:C.pure,i===0?C.navy:C.line,0.16,true);pill(s,c[0],x+0.22,1.76,0.65,i===0?C.lime:C.softBlue,i===0?C.navy:C.blue2);txt(s,c[1],x+1.0,1.73,2.35,0.32,{fontSize:13,bold:true,color:i===0?C.white:C.ink});c[2].forEach((v,j)=>{addIcon(s,'circle-check',x+0.24,2.46+j*0.39,0.16,i===0?C.lime:C.blue);txt(s,v,x+0.53,2.39+j*0.39,2.95,0.28,{fontSize:10.2,color:i===0?'D7DEEB':C.ink});});});
}
//69 public internal
{
 const s=newSlide();title(s,'VISIBILITY RULES','Public clarity. Internal control.');
 box(s,0.62,1.48,5.88,5.15,C.softBlue,C.blue,0.17,true);pill(s,'CLIENT SEES',0.92,1.78,1.23,C.blue,C.white);const pub=['Package name + “Mulai dari”','Suitable for + outcome','Core features in business language','Tier difference + demo','Pricing disclaimer','Third-party costs'];pub.forEach((v,i)=>{addIcon(s,'eye',0.94,2.54+i*0.54,0.22,C.blue);txt(s,v,1.35,2.47+i*0.54,4.65,0.34,{fontSize:12,bold:true});});
 box(s,6.82,1.48,5.88,5.15,C.navy,C.navy,0.17,true);pill(s,'SOLIVATE SEES',7.12,1.78,1.48,C.lime,C.navy);const ins=['Benchmark + category floor','Scale + complexity','Add-ons + integration','Negotiation + workload','Risk + urgency','Demo recommendation'];ins.forEach((v,i)=>{addIcon(s,'lock-keyhole',7.14,2.54+i*0.54,0.22,C.lime);txt(s,v,7.55,2.47+i*0.54,4.65,0.34,{fontSize:12,bold:true,color:C.white});});
}
//70 changes
{
 const s=newSlide();title(s,'WHAT CHANGED','Price revisions reflect capability and positioning.');
 const a=[['Personal CMS','Rp499K','Rp799K','Capability upgrade'],['UMKM Business','Rp1,499JT','Rp2,99JT','Business capability'],['Corporate CMS','Rp1,299JT','Rp2,5JT','Corporate review'],['Government CMS','Rp1,999JT','Rp5JT','Government requirement'],['Public Service','Rp3,999JT','Rp10JT','Service workflow'],['ERP Lite','Rp5,999JT','Rp10JT','Integrated architecture'],['SaaS','Rp7,999JT','Rp12,5JT','Tenant lifecycle'],['Enterprise','Custom','Rp25JT+ / Custom','Enterprise positioning']];
 a.forEach((v,i)=>{const x=0.62+(i%4)*3.05,y=1.5+Math.floor(i/4)*2.34;box(s,x,y,2.82,2.03,C.pure,C.line,0.14,true);txt(s,v[0],x+0.18,y+0.17,2.42,0.32,{fontSize:12.5,bold:true});txt(s,v[1],x+0.18,y+0.67,0.98,0.3,{fontSize:10,color:C.muted});addIcon(s,'arrow-right',x+1.15,y+0.72,0.2,C.blue);txt(s,v[2],x+1.45,y+0.64,1.17,0.38,{fontSize:12.5,bold:true,color:C.blue2});pill(s,'WHY?',x+0.18,y+1.2,0.62,C.softLime,C.ink);txt(s,v[3],x+0.92,y+1.17,1.68,0.4,{fontSize:9.5,bold:true});});
}
//71 matrix 1
{
 const s=newSlide();title(s,'MASTER BENCHMARK MATRIX','01 — Presence, business, event, and commerce.');
 const rows=[['PERSONAL',[['Basic','299K'],['Standard','499K'],['CMS','799K'],['Blog Pro','999K+']]],['WEDDING',[['Basic','149–249K'],['Premium','349–499K'],['RSVP','699K+'],['QR','999K+'],['Pro','1,499JT+']]],['UMKM',[['Basic','499K'],['Standard','749K'],['CMS','999K'],['Business Lite','2,25JT+'],['Business','2,99JT+'],['Pro','3,99JT+'],['Operational','4,99JT+']]],['EVENT',[['Landing','749K+'],['CMS','999K+'],['Registration','1,499JT+'],['QR','2,499JT+'],['Ticketing','3,499JT+']]],['COMMERCE',[['Starter','2,499JT+'],['Payment','3,499JT+'],['Business','4,999JT+'],['Advanced','7,5JT+']]]];
 rows.forEach((r,i)=>{const y=1.42+i*1.07;txt(s,r[0],0.62,y,1.32,0.32,{fontSize:10,bold:true,color:C.blue2,charSpacing:0.7});let x=1.92;r[1].forEach((p,j)=>{const w= Math.min(1.75,10.55/r[1].length);box(s,x,y-0.05,w-0.1,0.68,j===r[1].length-1?C.softLime:C.pure,j===r[1].length-1?C.lime:C.line,0.1,false);txt(s,p[0],x+0.1,y+0.02,w-0.3,0.22,{fontSize:8.4,bold:true});txt(s,`Rp${p[1]}`,x+0.1,y+0.31,w-0.3,0.2,{fontSize:8.8,bold:true,color:C.blue2});x+=w;});});
}
//72 matrix 2
{
 const s=newSlide();title(s,'MASTER BENCHMARK MATRIX','02 — Operations, corporate, public sector, healthcare, and platforms.');
 const rows=[['OPERATIONS',[['POS Lite','2,25JT+'],['POS Business','3,5JT+'],['POS Pro','5JT+'],['Booking','1,5JT+'],['CRM Lite','2,5JT+'],['CRM Pro','6JT+']]],['CORPORATE',[['Website','2,5JT+'],['Professional','3,5JT+'],['Business','5JT+'],['Ops Lite','5JT+'],['Ops Pro','10JT+']]],['GOVERNMENT',[['Website','5JT+'],['Professional','7,5JT+'],['Public Service','10JT+'],['Integrated','15JT+']]],['HEALTHCARE',[['Website','2,5JT+'],['Booking','3,5JT+'],['Clinic Mgmt','7,5JT+'],['System','15JT+']]],['PLATFORMS',[['Custom SW','5JT+'],['ERP Lite','10JT+'],['SaaS','12,5JT+'],['ERP Business','15JT+'],['Marketplace','15JT+'],['Enterprise','25JT+']]]];
 rows.forEach((r,i)=>{const y=1.42+i*1.07;txt(s,r[0],0.62,y,1.32,0.32,{fontSize:10,bold:true,color:C.blue2,charSpacing:0.7});let x=1.92;r[1].forEach((p,j)=>{const w=10.55/r[1].length;box(s,x,y-0.05,w-0.1,0.68,j===r[1].length-1?C.softLime:C.pure,j===r[1].length-1?C.lime:C.line,0.1,false);txt(s,p[0],x+0.1,y+0.02,w-0.3,0.22,{fontSize:8.4,bold:true});txt(s,`Rp${p[1]}`,x+0.1,y+0.31,w-0.3,0.2,{fontSize:8.8,bold:true,color:C.blue2});x+=w;});});
}
//73 governance
{
 const s=newSlide();title(s,'GOVERNANCE BEFORE PUBLIC RELEASE','Internal framework is ready; public promises still need locks.');
 const g=[['Public wording','Lock “Mulai dari” / range.','quote'],['Pricing authority','Category floor + negotiation authority.','badge-dollar-sign'],['Delivery','Revision + warranty.','package-check'],['Infrastructure','Domain + hosting policy.','server-cog'],['Add-ons','Add-on floor.','blocks'],['Support','Maintenance + SLA.','life-buoy'],['Demo','Ensure P0 demos exist.','gallery-horizontal-end']];
 g.forEach((v,i)=>{const x=0.62+(i%4)*3.05,y=1.5+Math.floor(i/4)*1.77;box(s,x,y,2.82,1.45,i===6?C.softLime:C.pure,i===6?C.lime:C.line,0.13,true);addIcon(s,v[2],x+0.18,y+0.22,0.32,i===6?C.ink:C.blue);txt(s,v[0],x+0.62,y+0.17,1.98,0.3,{fontSize:12.5,bold:true});txt(s,v[1],x+0.18,y+0.73,2.42,0.44,{fontSize:10.2,color:C.muted,valign:'top'});});
 box(s,9.77,5.06,2.93,1.02,C.navy,C.navy,0.13,false);txt(s,'NO SCOPE REVIEW\nNO FINAL QUOTE',9.98,5.25,2.5,0.55,{fontSize:14,bold:true,color:C.lime,align:'center'});
}
//74 detail levels
{
 const s=newSlide();title(s,'CONTENT DEPTH','Detail is not removed. Competition for attention is.');
 const lv=[['LEVEL 1 — SCAN','Name • Price • Outcome • Difference','eye','0–5 sec'],['LEVEL 2 — UNDERSTAND','Suitable for • Capability • Demo • Upgrade path','scan-text','Meeting'],['LEVEL 3 — REFERENCE','Scope • Revision • Warranty • Domain • Risk • Notes','book-open-check','After meeting']];
 lv.forEach((v,i)=>{const x=0.62+i*4.08,y=1.6+i*0.37;box(s,x,y,3.82,4.45-i*0.37,i===2?C.navy:C.pure,i===2?C.navy:C.line,0.17,true);pill(s,v[3],x+0.22,y+0.22,1.03,i===2?C.lime:C.softBlue,i===2?C.navy:C.blue2);addIcon(s,v[2],x+3.18,y+0.22,0.36,i===2?C.lime:C.blue);txt(s,v[0],x+0.22,y+0.85,3.3,0.5,{fontSize:17,bold:true,color:i===2?C.white:C.ink});txt(s,v[1],x+0.22,y+1.62,3.3,1.05,{fontSize:13,color:i===2?'B8C2D6':C.muted,valign:'top'});});
}
//75 comparison behavior
{
 const s=newSlide();title(s,'COMPARISON BEHAVIOR','Always answer: what changes when I pay more?');
 const ladder=[['Basic','Information'],['Standard','Multipage'],['Premium','Self-Service CMS'],['Business Lite','Lead Database'],['Business','Order Lifecycle'],['Business Pro','Multi-Staff Workflow'],['Operational','Daily Operations']];
 ladder.forEach((l,i)=>{const x=0.62+i*1.73,y=5.45-i*0.47,h=0.9+i*0.47;box(s,x,y,1.52,h,i===6?C.lime:(i>2?C.softBlue:C.pure),i===6?C.lime:(i>2?C.blue:C.line),0.12,false);txt(s,l[0].toUpperCase(),x+0.13,y+0.18,1.26,0.24,{fontSize:8.5,bold:true,color:i===6?C.navy:C.blue2,align:'center'});txt(s,l[1],x+0.13,y+0.55,1.26,0.52,{fontSize:10.5,bold:true,color:i===6?C.navy:C.ink,align:'center'});if(i<6)addIcon(s,'arrow-up-right',x+1.5,y+0.12,0.2,C.blue);});
}
//76 demo strategy
{
 const s=newSlide();title(s,'VISUAL DEMO STRATEGY','Show the product—not merely its name.');browserMock(s,'CleanFlow Laundry',0.62,1.52,7.6,4.92,'dashboard',C.blue);
 box(s,8.52,1.52,4.18,4.92,C.navy,C.navy,0.17,true);pill(s,'DEMO FOR UMKM BUSINESS',8.82,1.83,2.2,C.lime,C.navy);txt(s,'CLEANFLOW\nLAUNDRY',8.82,2.43,3.4,0.98,{fontSize:28,bold:true,color:C.white});flow(s,['Customer','Order','Processing','Ready','Completed'],8.82,3.72,3.58,C.lime,{h:1.55,fontSize:7.5,highlight:true});txt(s,'A concrete reference gives sales something visible to point to.',8.82,5.58,3.42,0.48,{fontSize:11,color:'B8C2D6'});
}
//77 icon system
{
 const s=newSlide();title(s,'ICON SYSTEM','One consistent Lucide vocabulary across the catalogue.');
 const ii=[['Website','globe'],['CMS','layout-dashboard'],['Business','database'],['Operations','workflow'],['Event','ticket'],['Commerce','shopping-bag'],['POS','monitor'],['Booking','calendar'],['CRM','users'],['Corporate','building-2'],['Government','landmark'],['Healthcare','heart-pulse'],['ERP','boxes'],['SaaS','cloud'],['Marketplace','store'],['Enterprise','network']];
 ii.forEach((v,i)=>{const x=0.62+(i%8)*1.52,y=1.55+Math.floor(i/8)*2.25;box(s,x,y,1.3,1.86,i===15?C.softLime:C.pure,i===15?C.lime:C.line,0.13,false);addIcon(s,v[1],x+0.42,y+0.35,0.48,i===15?C.ink:C.blue);txt(s,v[0],x+0.12,y+1.12,1.06,0.38,{fontSize:10.5,bold:true,align:'center'});});
}
//78 animation
{
 const s=newSlide();title(s,'MOTION SYSTEM','Restrained motion supports hierarchy.');
 const m=[['DEFAULT','Fade + translate','200–350ms','move-up'],['LADDER','Progressive reveal','Step-by-step','list-collapse'],['WORKFLOW','Line / step reveal','Sequential','route'],['CARDS','Small stagger','Grouped','layout-grid'],['PRICING','Number emphasis','Purposeful','badge-dollar-sign']];m.forEach((v,i)=>{const x=0.62+i*2.44;box(s,x,1.62,2.18,3.8,i===0?C.softLime:C.pure,i===0?C.lime:C.line,0.15,true);addIcon(s,v[3],x+0.72,2.04,0.72,i===0?C.ink:C.blue);txt(s,v[0],x+0.2,3.02,1.78,0.25,{fontSize:9.5,bold:true,color:C.muted,align:'center'});txt(s,v[1],x+0.2,3.48,1.78,0.62,{fontSize:15,bold:true,align:'center'});txt(s,v[2],x+0.2,4.37,1.78,0.32,{fontSize:11,color:C.blue2,align:'center'});});pill(s,'NO BOUNCE • NO SPIN • NO 3D FLIP • NO RANDOM ZOOM',3.98,5.85,5.38,C.navy,C.white);
}
//79 web presentation
{
 const s=newSlide();title(s,'BROWSER PRESENTATION','The same catalogue can become a searchable presentation app.');browserMock(s,'Solivate Pricing /presentation',0.62,1.48,8.1,5.15,'dashboard',C.blue);
 const fsx=[['Keyboard nav','arrow-left-right'],['Slide navigator','panel-left'],['Chapter jump','list-tree'],['Fullscreen','maximize'],['Progress bar','chart-no-axes-gantt'],['Search & jump','search']];fsx.forEach((v,i)=>{const x=9.03+(i%2)*1.83,y=1.48+Math.floor(i/2)*1.65;box(s,x,y,1.59,1.37,i===5?C.softLime:C.pure,i===5?C.lime:C.line,0.12,false);addIcon(s,v[1],x+0.18,y+0.2,0.32,i===5?C.ink:C.blue);txt(s,v[0],x+0.18,y+0.7,1.23,0.42,{fontSize:10.5,bold:true});});
}
//80 package interaction
{
 const s=newSlide();title(s,'PACKAGE INTERACTION','Clean comparison. Complete detail on demand.');
 packageCard(s,business[1],0.62,1.55,4.22,4.92,C.lime,true);addIcon(s,'mouse-pointer-click',5.3,3.55,0.55,C.blue);addIcon(s,'arrow-right',5.98,3.6,0.4,C.blue);
 box(s,6.72,1.28,5.98,5.5,C.pure,C.line,0.18,true);pill(s,'EXPANDED DRAWER',7.03,1.58,1.48,C.navy,C.white);txt(s,'UMKM Business',7.03,2.12,4.95,0.48,{fontSize:24,bold:true});const d=['Suitable For','Outcome','Included','Demo','Differentiator','Internal Notes'];d.forEach((v,i)=>{addIcon(s,['target','sparkles','list-checks','monitor-play','git-compare-arrows','lock-keyhole'][i],7.04,2.9+i*0.53,0.23,C.blue);txt(s,v,7.44,2.84+i*0.53,2.05,0.3,{fontSize:11,bold:true});txt(s,['Active order process','Customer → order lifecycle','DB, invoice, workflow','CleanFlow Laundry','Lead → transaction','Benchmark + risk'][i],9.44,2.84+i*0.53,2.76,0.3,{fontSize:10.5,color:C.muted});});
}
//81 modes / deep links
{
 const s=newSlide();title(s,'TWO MODES, ONE SYSTEM','Presentation for the room. Catalogue for the work.');
 box(s,0.62,1.52,5.88,4.36,C.navy,C.navy,0.18,true);pill(s,'PRESENTATION MODE',0.92,1.84,1.76,C.lime,C.navy);txt(s,'Big, clean, speaking-first.',0.92,2.55,4.9,0.48,{fontSize:23,bold:true,color:C.white});['Keyboard navigation','Chapter progression','Focused slide content','Fullscreen'].forEach((v,i)=>{addIcon(s,'check',0.94,3.32+i*0.5,0.2,C.lime);txt(s,v,1.3,3.25+i*0.5,4.45,0.32,{fontSize:12,color:'D7DEEB'});});
 box(s,6.82,1.52,5.88,4.36,C.pure,C.line,0.18,true);pill(s,'CATALOGUE MODE',7.12,1.84,1.58,C.softBlue,C.blue2);txt(s,'Search, filter, compare.',7.12,2.55,4.9,0.48,{fontSize:23,bold:true});['Personal • UMKM • Event','POS • Booking • CRM','Government • Healthcare','ERP • SaaS • Marketplace'].forEach((v,i)=>{addIcon(s,'search',7.14,3.32+i*0.5,0.2,C.blue);txt(s,v,7.5,3.25+i*0.5,4.45,0.32,{fontSize:12,color:C.muted});});
 pill(s,'/pricing/umkm/business  •  /pricing/event/ticketing  •  /pricing/erp/lite',2.42,6.21,8.5,C.softLime,C.ink);
}
//82 identity
{
 const s=newSlide();title(s,'FINAL PRESENTATION IDENTITY','The deck behaves like a business system, not a document.');
 const ids=[['A Product Catalogue','Not random services.','package'],['A Pricing Architecture','Not pricing by feeling.','landmark'],['A Sales System','Not package guessing.','route'],['A Demo Strategy','Not promises alone.','monitor-play'],['A Quotation Framework','Not copy-paste pricing.','file-check'],['An Upgrade Path','Rp299K → Rp25JT+','trending-up']];ids.forEach((v,i)=>{const x=0.62+(i%3)*4.08,y=1.52+Math.floor(i/3)*2.25;box(s,x,y,3.82,1.92,i===5?C.softLime:C.pure,i===5?C.lime:C.line,0.16,true);addIcon(s,v[2],x+0.22,y+0.26,0.42,i===5?C.ink:C.blue);txt(s,v[0],x+0.22,y+0.89,3.35,0.38,{fontSize:17,bold:true});txt(s,v[1],x+0.22,y+1.38,3.35,0.3,{fontSize:11,color:C.muted});});
}
//83 closing
{
 const s=newSlide(C.navy,false);s.addImage({path:LOGO_TRANSPARENT,x:0.72,y:0.58,w:2.35,h:0.71});txt(s,'SOLIVATE STUDIO  •  PRICING MASTER 2026',0.75,1.56,6,0.28,{fontSize:10,bold:true,color:C.blue,charSpacing:1.2});
 txt(s,'Packages define\nthe starting point.',0.72,2.08,6.1,1.55,{fontSize:38,bold:true,color:C.white});txt(s,'Discovery defines\nthe final quotation.',6.95,2.08,5.68,1.55,{fontSize:38,bold:true,color:C.lime});
 s.addShape(pptx.ShapeType.line,{x:6.55,y:1.98,w:0,h:2.08,line:{color:'32415E',width:1}});
 pill(s,'RIGHT SCOPE',2.34,5.24,1.44,'17243B',C.white);pill(s,'RIGHT CAPABILITY',5.64,5.24,1.76,C.blue,C.white);pill(s,'RIGHT PRICE',9.32,5.24,1.4,C.lime,C.navy);
 txt(s,'Solivate transforms client needs into the right product level, capability, scope, and quotation.',1.48,6.24,10.4,0.45,{fontSize:14,color:'B8C2D6',align:'center'});txt(s,'83 / 83',12.02,6.84,0.72,0.22,{fontSize:9,bold:true,color:C.white,align:'right'});
}

async function main(){
  // Convert near-black pixels to transparent while preserving the supplied blue identity.
  await sharp(LOGO).ensureAlpha().trim().raw().toBuffer({resolveWithObject:true}).then(async ({data,info})=>{
    for(let i=0;i<data.length;i+=4){if(data[i]<18&&data[i+1]<18&&data[i+2]<18)data[i+3]=0;}
    await sharp(data,{raw:info}).png().toFile(LOGO_TRANSPARENT);
  });
  if(slideNo!==83) throw new Error(`Expected 83 slides, got ${slideNo}`);
  await pptx.writeFile({fileName:OUT});
  console.log(`Wrote ${OUT} (${slideNo} slides)`);
}
main().catch(e=>{console.error(e);process.exit(1)});
