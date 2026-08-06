const $ = (q) => document.querySelector(q);

const chapterDefs = [
  { id: '01', label: 'SYSTEM', from: 1, to: 11 },
  { id: '02', label: 'PRESENCE', from: 12, to: 18 },
  { id: '03', label: 'BUSINESS', from: 19, to: 35 },
  { id: '04', label: 'OPERATIONS', from: 36, to: 47 },
  { id: '05', label: 'PUBLIC', from: 48, to: 55 },
  { id: '06', label: 'PLATFORMS', from: 56, to: 62 },
  { id: '07', label: 'SALES', from: 63, to: 66 },
  { id: '08', label: 'GOVERNANCE', from: 67, to: 83 },
];

const personal = [
  ['PERSONAL','Personal Basic','Rp299K','Professional one-page presence.',['1 landing page','Responsive + CTA','Basic SEO','1 month warranty'],'Nara Dev Portfolio'],
  ['PERSONAL','Personal Standard','Rp499K','Credible multipage personal brand.',['Up to 5 pages','Analytics + Search Console','General domain 1 year','4 revisions'],'Raka Creative'],
  ['CMS','Premium + CMS','Rp799K','Self-service portfolio and content.',['8–10 pages','Admin dashboard','3–4 content types','Media + SEO fields'],'Aster Professional CMS'],
  ['PUBLISHING','Blog Pro','Rp999K+','Serious editorial publishing workflow.',['Draft / publish','Category + tags','Search + related posts','Per-article SEO'],'Insight Journal'],
];

const umkmPresence = [
  ['UMKM','UMKM Basic','Rp499K','Be found and convert via WhatsApp.',['Landing page','Gallery + maps','Basic SEO','No dashboard'],'Kopi Rona'],
  ['UMKM','UMKM Standard','Rp749K','A proper multipage business profile.',['5–7 pages','Services / products','Portfolio + trust','Analytics'],'Arunika Interior'],
  ['CMS','UMKM Premium + CMS','Rp999K','Manage products and content in-house.',['8–10 pages','Admin dashboard','Product + promo CMS','SEO fields'],'Kopi Rona CMS'],
];

const business = [
  ['BUSINESS','Business Lite','Rp2,25JT+','Turn inbound forms into manageable lead data.',['Lead database','Source + notes','Status pipeline','Search / export'],'Arunika LeadDesk'],
  ['BUSINESS','Business','Rp2,99JT+','Manage customer and order lifecycle.',['Customer database','Orders / requests','Invoice / quotation','Status workflow'],'CleanFlow Laundry'],
  ['BUSINESS','Business Pro','Rp3,99JT+','Coordinate a multi-staff workflow.',['Multi-admin / staff','Notifications','Documents','Expanded reports'],'TravelOps Lite'],
  ['OPERATIONS','Operational','Rp4,99JT+','Run daily business operations in one system.',['Staff + customer','Transactions','Role + documents','Operational reports'],'NexaOps Small Business'],
];

const eventPackages = [
  ['EVENT','Event Landing','Rp749K+','Campaign and event information.',['Agenda + speaker','Venue + sponsor','Countdown + FAQ'],'Tech Summit'],
  ['CMS','Event + CMS','Rp999K+','Committee-managed event content.',['Agenda CMS','Speaker CMS','Announcement'],'Tech Summit Admin'],
  ['REGISTRATION','Event Registration','Rp1,499JT+','Participant database and confirmation.',['Custom form','Search / export','Email confirmation'],'EventReg'],
  ['CHECK-IN','Registration + QR','Rp2,499JT+','Digital identity and venue attendance.',['Unique QR','Web scanner','Attendance dashboard'],'EventGate'],
  ['COMMERCE','Ticketing + QRIS','Rp3,499JT+','Paid ticket lifecycle end-to-end.',['Ticket types','QRIS payment','QR ticket + reports'],'Event Ticketing'],
];

const commerce = [
  ['COMMERCE','Starter','Rp2,499JT+','Storefront to admin-managed orders.',['Product CMS','Cart + checkout','Manual payment','Order dashboard'],'Lunara Store'],
  ['COMMERCE','Payment','Rp3,499JT+','Automated payment lifecycle.',['Everything in Starter','QRIS gateway','Webhook status','Invoice / receipt'],'Lunara Pay'],
  ['OPERATIONS','Business','Rp4,999JT+','Commerce operations beyond checkout.',['Voucher','Inventory','Customer + shipping','Sales reports'],'Lunara Commerce'],
  ['ADVANCED','Advanced','Rp7,5JT+','Advanced retail roles and workflows.',['Stock movement','Promotion rules','Return / refund','External integration'],'CommerceOps'],
];

const corporate = [
  ['CORPORATE','Corporate Website','Rp2,5JT+','Credible corporate presence with CMS.',['Services + projects','Team + news','Lead form','SEO foundation'],'Nexa Prima Consulting'],
  ['CORPORATE','Professional','Rp3,5JT+','Deeper content and employer presence.',['Careers','Newsroom','Case studies','ESG documents'],'Nexa Group'],
  ['BUSINESS','Corporate Business','Rp5JT+','Website connected to business requests.',['Lead / request DB','Documents','Quotation flow','Status dashboard'],'Nexa Client Portal Lite'],
];

const government = [
  ['GOVERNMENT','Website + CMS','Rp5JT+','Structured public information portal.',['Profile + organization','News + agenda','Documents + gallery','Admin CMS'],'Portal Desa Sukamaju'],
  ['GOVERNANCE','Professional','Rp7,5JT+','Content governance and public interaction.',['PPID','Complaint / form','Multi-admin','Document search'],'PublicInfo Portal'],
  ['SERVICE','Digital Public Service','Rp10JT+','Citizen submission and staff workflow.',['Upload + tracking','Verification','Approval','Reports'],'e-Layanan'],
  ['INTEGRATED','Government Integrated','Rp15JT+','Cross-unit workflow, audit and integrations.',['Multi-role / unit','Approval chain','External API','Audit + reports'],'GovFlow'],
  ['ENTERPRISE','Government Enterprise','CUSTOM','Strategic public-sector platform.',['Security review','SLA','Infrastructure policy'],'Discovery prototype'],
];

const enterprise = [
  ['CUSTOM','Custom Business Software','Rp5JT+','A focused custom workflow application.',['Custom database','Dashboard','Basic roles','Reporting'],'ServiceDesk Custom'],
  ['ERP','ERP Lite','Rp10JT+','Integrate 3–5 internal modules.',['Master data','Roles','Basic approval','Import / export'],'NexaERP Lite'],
  ['ERP','ERP Business','Rp15JT+','Cross-module, cross-department process.',['5+ modules','Expanded approval','Ops / finance records','Audit activity'],'NexaERP Business'],
  ['SAAS','SaaS Platform','Rp12,5JT+','Multi-customer digital product foundation.',['Tenant separation','Subscription','User + super admin','Usage reporting'],'Flowdesk'],
  ['MARKETPLACE','Marketplace','Rp15JT+','Buyer–vendor transaction platform.',['Vendor onboarding','Listings + search','Commission / payment','Moderation'],'ServiceHub'],
  ['ENTERPRISE','Enterprise Platform','Rp25JT+ / CUSTOM','Mission-critical architecture and governance.',['Multi-branch','Complex permission','Audit + API','Security + SLA'],'Case-specific prototype'],
];

const flowHTML = (steps) => `<div class="capability-flow" style="--count:${steps.length}">${steps.map((s,i)=>`<div class="cap-step"><small>${String(i+1).padStart(2,'0')}</small>${s}</div>`).join('')}</div>`;

const packageCard = (p, selected=false) => `
  <article class="card ${selected?'selected':''}">
    <div class="card-inner">
      <div class="card-kicker">${p[0]}</div>
      <h3>${p[1]}</h3>
      <div class="price">${p[2]}</div>
      <p class="outcome">${p[3]}</p>
      <ul class="feature-list">${p[4].map(x=>`<li>${x}</li>`).join('')}</ul>
      <div class="card-foot"><span>DEMO</span><span>↗ ${p[5]}</span></div>
    </div>
  </article>`;

const packageGrid = (items, cls='') => `<div class="grid package-grid ${cls} cols-${items.length}">${items.map((p,i)=>packageCard(p,i===items.length-1)).join('')}</div>`;

const mockup = (name) => `
  <div class="mockup">
    <div class="browser-bar"><i></i><i></i><i></i><span>${name}</span></div>
    <div class="mock-body"><aside class="side-rail"><span></span><span></span><span></span><span></span><span></span></aside>
    <div class="dash"><div class="stat-row"><div class="stat">TOTAL<b>1,284</b></div><div class="stat">ACTIVE<b>86</b></div><div class="stat">PENDING<b>24</b></div></div><div class="chart"><i></i><i></i><i></i><i></i></div></div></div>
  </div>`;

const base = (eyebrow, title, sub='', body='', dark=false, extra='') => ({
  dark,
  html: `<p class="eyebrow">${eyebrow}</p><h1 class="headline ${extra}">${title}</h1>${sub?`<p class="subhead">${sub}</p>`:''}${body}`
});

const packagesSlide = (eyebrow,title,sub,items,flow=[],cls='') => base(eyebrow,title,sub,`${flow.length?flowHTML(flow):''}${packageGrid(items,cls)}`);
const showcase = (eyebrow,p,steps,note='') => base(eyebrow,p[1],p[3],`<div class="split"><div>${packageCard(p,true)}</div><div>${mockup(p[5])}${flowHTML(steps)}${note?`<p class="card-kicker" style="text-align:center;margin-top:12px">${note}</p>`:''}</div></div>`);
const divider = (chapter,title,sub,badge) => ({dark:true,html:`<div class="divider-layout"><div><p class="eyebrow">CHAPTER ${chapter}</p><h1 class="headline">${title}</h1><p class="subhead">${sub}</p><span class="label-chip lime">${badge}</span></div><div class="divider-bars"><i style="height:15%"></i><i style="height:29%"></i><i style="height:46%"></i><i style="height:66%"></i><i style="height:90%"></i></div></div>`});

const slides = [
  {dark:true,html:`<div class="cover-content"><div class="cover"><span class="label-chip lime">FINAL INTERNAL MASTER</span><h1 class="headline">PRICING MASTER<br>FINAL 2026</h1><p class="subhead">Service Catalogue • Pricing Benchmark • Scope • Demo • Quotation Framework</p></div><div class="orbital"><div class="core">SOLIVATE<br>2026</div><b></b><b></b><b></b><b></b></div></div>`},
  base('THE PRICING SYSTEM','More Than a Pricelist.','A single system for product positioning, scope control, demos, and quotation.',`<div class="split equal"><article class="card"><div class="card-inner"><span class="label-chip">OLD</span><h3 style="font-size:32px;margin-top:38px">Pricelist</h3><p class="subhead">Price → feature count.</p></div></article><article class="card dark-card"><div class="card-inner"><span class="label-chip lime">2026 SYSTEM</span><div class="grid cols-2" style="margin-top:32px">${['Product Catalogue','Pricing Benchmark','Scope Framework','Demo Library','Quotation System'].map(x=>`<div><h3>${x}</h3></div>`).join('')}</div></div></article></div>`),
  base('WHY IT CHANGED','Six problems the 2026 system fixes.','',`<div class="grid cols-3">${[['Tier Difference','Packages felt too similar.'],['Scope Creep','Cheap tiers carried too much system scope.'],['Business Positioning','Business and corporate needed a higher class.'],['Government Positioning','Public sector starts at a Rp5JT floor.'],['Enterprise Positioning','ERP / SaaS / Marketplace are products.'],['Sales Enablement','Every tier needs a representative demo.']].map((x,i)=>`<article class="card issue-card ${i===4?'selected':''}"><div class="card-inner"><span class="issue-no">0${i+1}</span><h3>${x[0]}</h3><p class="outcome">${x[1]}</p></div></article>`).join('')}</div>`),
  base('GUARDRAILS','Pricing principles','Capability and workload—not client size—drive the adjustment.',`<div class="grid cols-4">${['Outcome First','Capability Upgrade','Benchmark, Not Fixed','Project-Specific','Third-Party Separate','Discovery First','Workload-Based','Scope Protection'].map((x,i)=>`<article class="card ${i===1?'selected':''}"><div class="card-inner"><span class="issue-no">0${i+1}</span><h3>${x}</h3></div></article>`).join('')}</div>`),
  {dark:true,html:`<p class="eyebrow">CORE MESSAGE</p><h1 class="headline">Pricing is based on capability.</h1><p class="subhead">What changes is the kind of business problem the product can solve.</p><div class="ladder">${[['WEBSITE','Information','Rp299K+'],['CMS','Manage Content','Rp799K+'],['BUSINESS','Manage Data','Rp2,25JT+'],['OPERATIONAL','Manage Operations','Rp4,99JT+'],['ENTERPRISE','Manage Scale','Rp10JT+']].map((x,i)=>`<div class="ladder-item" style="height:${34+i*9}%"><h3>${x[0]}</h3><p>${x[1]}</p><b>${x[2]}</b></div>`).join('')}</div>`},
  base('PRICE LANGUAGE','Benchmark is not quotation.','',`<div class="big-equation"><strong>BENCHMARK</strong><span>≠</span><strong>FINAL QUOTE</strong></div><div class="grid cols-3" style="margin-top:55px">${[['Benchmark Price','Representative reference scope.'],['Category Floor','Internal pricing guardrail.'],['Scope Adjustment','Workload-based variance.'],['Add-on','Additional capability.'],['Final Quotation','Price after discovery.'],['Change Request','Requirement after scope freeze.']].map((x,i)=>`<article class="card ${i===4?'selected':''}"><div class="card-inner"><h3>${x[0]}</h3><p class="outcome">${x[1]}</p></div></article>`).join('')}</div>`),
  base('ESTIMATION LOGIC','The pricing engine.','A structured estimation aid—not an automatic calculator.',`${flowHTML(['Package benchmark','Scope','Feature / add-on','Complexity','Integration','Urgency','Support / SLA','FINAL QUOTE'])}`),
  base('FIELD WORKFLOW','Quotation in nine controlled steps.','',`${flowHTML(['Discovery','Package Anchor','Baseline Scope','Complexity & Scale','Gap & Add-ons','Commercial Risk','Floor & Margin','Quotation','Scope Freeze'])}<div class="grid cols-3" style="margin-top:42px">${[['UNDERSTAND','Steps 1–3'],['ESTIMATE','Steps 4–6'],['COMMIT','Steps 7–9']].map((x,i)=>`<article class="card ${i===2?'selected':''}"><div class="card-inner"><h3>${x[0]}</h3><p>${x[1]}</p></div></article>`).join('')}</div>`),
  base('SCALE GUIDE','Client scale informs workload—not automatic markup.','',`<div class="staircase">${[['S1','PERSONAL / MICRO','Base'],['S2','SMALL BUSINESS','Base + 0–10%'],['S3','MID MARKET','+10–25%'],['S4','LARGE BUSINESS','+25–50%'],['S5','ENTERPRISE','Custom']].map((x,i)=>`<article class="stair" style="height:${32+i*11}%"><span class="mini-chip ${i===4?'lime':''}">${x[0]}</span><h3>${x[1]}</h3><p>${x[2]}</p></article>`).join('')}</div>`),
  base('COMPLEXITY','Four tiers of implementation complexity.','',`<div class="staircase">${[['A — SIMPLE',['1 role','1 workflow','No external integration']],['B — STANDARD',['2–3 roles','Reports + notification','Search / filter']],['C — ADVANCED',['Multi-role','Approval + payment/API','Automation']],['D — ENTERPRISE',['Multi-branch','Audit + security + SLA','High availability']]].map((x,i)=>`<article class="stair" style="height:${39+i*13}%"><h3>${x[0]}</h3>${x[1].map(v=>`<p>${v}</p>`).join('')}</article>`).join('')}</div>`),
  {dark:true,html:`<p class="eyebrow">DISCOVERY CHECKLIST</p><h1 class="headline">No discovery. No final price.</h1><p class="subhead">Nine questions determine the real scope.</p><div class="grid cols-5">${['Users & Roles','Workflow','Modules','Data','Integration','Security','Deadline','Support','Stakeholders'].map((x,i)=>`<article class="card dark-card ${i===8?'selected':''}"><div class="card-inner"><span class="issue-no">0${i+1}</span><h3>${x}</h3></div></article>`).join('')}</div>`},
  divider('02','DIGITAL<br>PRESENCE','Personal • Wedding • Institution','FROM ONLINE → MANAGED CONTENT'),
  packagesSlide('PERSONAL / NON-PROFIT','A clear upgrade path from presence to publishing.','',personal,['Landing','Multipage','CMS','Publishing']),
  packagesSlide('PERSONAL','Basic vs Standard','The price increase buys structure, credibility, and ownership—not CMS.',personal.slice(0,2),[],'cols-2'),
  packagesSlide('PERSONAL','CMS vs Publication workflow','',personal.slice(2),['Personal Website','Content Management','Publication Workflow'],'cols-2'),
  packagesSlide('WEDDING SOLUTIONS','From invitation experience to guest operations.','',[
    ['WEDDING','Wedding Basic','Rp149–249K','Invitation experience.',['Info + maps','Gallery + music','No database'],'Alya & Fikri'],
    ['WEDDING','Wedding Premium','Rp349–499K','Interactive invitation.',['Guest name','RSVP / gift / video','Interactive UX'],'Alya & Fikri'],
    ['WEDDING','Wedding RSVP','Rp699K+','Guest database.',['RSVP stored','Guest management','Admin dashboard'],'Guest Desk'],
    ['WEDDING','QR Management','Rp999K+','QR check-in.',['Unique QR','Scanner','Attendance dashboard'],'Guest Desk'],
    ['WEDDING','Wedding Pro','Rp1,499JT+','Guest operations.',['Category + pax','Bulk import','Multi-scanner'],'Guest Desk'],
  ],[], 'dense'),
  packagesSlide('INSTITUTIONAL','A structured path for foundations, communities, and social institutions.','',[
    ['INSTITUTION','Landing','Rp499K','Campaign page.',['1 landing page','Responsive + SEO','Developer-managed'],'Yayasan Al-Falah'],
    ['INSTITUTION','Profile','Rp749K','Institution profile.',['5–7 pages','Responsive + SEO','Clear content structure'],'Yayasan Al-Falah'],
    ['CMS','Institutional CMS','Rp999K','Routine updates.',['News + program + gallery','Admin dashboard','Content management'],'Yayasan Al-Falah'],
    ['OPERATIONS','Institutional Pro','Rp1,499JT+','Active institution.',['Event + documents','Forms','Search / filter'],'Yayasan Al-Falah'],
  ]),
  base('SCOPE FOUNDATION','Terms that protect low-tier pricing.','Reference details remain visible without overwhelming package comparisons.',`<div class="grid cols-3">${[['Under Rp400K','Solivate subdomain unless agreed otherwise.'],['From Rp400K','General domain 1 year, subject to availability.'],['Hosting & SSL','Included by package; special infrastructure separate.'],['Warranty','Bug fixes in approved scope only.'],['Third-party cost','Gateway, WhatsApp, SMS, maps, AI API separate.'],['Revisions','Requirement changes become change requests.']].map(x=>`<article class="card"><div class="card-inner"><h3>${x[0]}</h3><p class="outcome">${x[1]}</p></div></article>`).join('')}</div>`),
  divider('03','BUSINESS<br>SYSTEMS','From digital presence to actual operations.','DATA → TRANSACTION → WORKFLOW'),
  packagesSlide('UMKM — DIGITAL PRESENCE','Presence before process.','',umkmPresence,['Landing','Multipage','Self-Service CMS']),
  packagesSlide('UMKM — BUSINESS SYSTEM','What changes when the client pays more?','',business,['Lead','Order','Multi-Staff Workflow','Internal Operations']),
  showcase('UMKM BUSINESS LITE',business[0],['Consultation form','Lead database','New','Contacted','Qualified','Closed'],'CMS → CUSTOMER DATA'),
  showcase('UMKM BUSINESS',business[1],['Customer','Order','Processing','Ready','Completed','Invoice'],'LEAD → TRANSACTION LIFECYCLE'),
  showcase('UMKM BUSINESS PRO',business[2],['Booking','Verification','Invoice','Payment status','Document','Completion'],'MULTI-STAFF • NOTIFICATION • REPORTING'),
  {dark:true,html:`<p class="eyebrow">UMKM OPERATIONAL</p><h1 class="headline medium">NexaOps Small Business</h1><p class="subhead">This is no longer a website with extra features. It is operational software.</p><div class="orbit-system"><div class="orbit-core">OPERATIONS<br>CORE</div>${['Staff','Customer','Transaction','Documents','Workflow','Reports'].map(x=>`<div class="orbit-node">${x}</div>`).join('')}</div>`},
  divider('03','EVENT','Experience → Operations','CAMPAIGN → CONTENT → COMMERCE'),
  packagesSlide('EVENT PACKAGE LANDSCAPE','Every tier adds a new operational capability.','',eventPackages,['Campaign','Content','Participants','Check-in','Commerce'],'dense'),
  showcase('EVENT REGISTRATION',eventPackages[2],['Registration','Confirmation','Participant database'],'PARTICIPANT DATA LIVES IN THE SYSTEM'),
  showcase('EVENT REGISTRATION + QR',eventPackages[3],['Register','QR pass','Scan','Attendance'],'DIGITAL IDENTITY + ON-SITE OPERATIONS'),
  showcase('EVENT TICKETING + QRIS',eventPackages[4],['Choose ticket','Checkout','QRIS','Paid','QR ticket','Scan','Reports'],'PROVIDER FEES REMAIN SEPARATE'),
  packagesSlide('INSTITUTIONAL OPERATIONS','Modules replace pages. Workflows replace content updates.','',[
    ['INSTITUTION','Operational Lite','Rp1,999JT+','One operational module.',['Database + dashboard','Status tracking','Basic reports'],'EduAdmin Lite'],
    ['INSTITUTION','Operational Standard','Rp2,999JT+','Two to three integrated modules.',['Integrated data','Documents','Expanded reports'],'EduAdmin Lite'],
    ['INSTITUTION','Operational Pro','Rp4,499JT+','Complex institutional workflow.',['Multi-role','Approval / QR / payment','Advanced reporting'],'Program Manager'],
  ]),
  packagesSlide('E-COMMERCE','From storefront to advanced retail operations.','',commerce,['Storefront','Payment','Commerce Operations','Advanced Retail']),
  showcase('E-COMMERCE STARTER',commerce[0],['Storefront','Cart','Checkout','Admin order'],'COMMERCE FOUNDATION • MANUAL PAYMENT'),
  showcase('E-COMMERCE PAYMENT',commerce[1],['Checkout','QRIS','Paid','Invoice','Admin order'],'AUTOMATIC PAYMENT LIFECYCLE'),
  packagesSlide('E-COMMERCE','Business vs Advanced','Advanced is for retail operations that exceed the UMKM template.',commerce.slice(2),[],'cols-2'),
  divider('04','OPERATIONAL<br>PRODUCTS','POS • Booking • CRM','TOOLS USED EVERY DAY'),
  packagesSlide('POINT OF SALE','From a cashier screen to retail operations.','',[
    ['POS','POS Lite','Rp2,25JT+','One-outlet cashier foundation.',['Cashier','Product','Basic stock','Transactions'],'Rasa Raya Cafe'],
    ['POS','POS Business','Rp3,5JT+','Active retail / F&B operations.',['Inventory','Supplier + purchase','Expense','Customer'],'Rasa Raya Cafe'],
    ['POS','POS Pro','Rp5JT+','Advanced store operations.',['Multi-cashier','Permission','Stock movement','QRIS + reports'],'Rasa Raya Cafe'],
  ]),
  base('POS CAPABILITY','Rasa Raya Cafe — capability coverage by tier.','',`<div class="split"><div>${mockup('Rasa Raya Cafe — Cashier')}</div><div class="grid cols-2">${[['LITE','Product'],['LITE','Stock'],['LITE','Transaction'],['BUSINESS','Supplier'],['BUSINESS','Purchase'],['BUSINESS','Expense'],['BUSINESS','Customer'],['PRO','Multi Cashier'],['PRO','QRIS'],['PRO','Reports']].map((x,i)=>`<article class="card ${i>6?'selected':''}"><div class="card-inner"><span class="mini-chip ${i>6?'lime':''}">${x[0]}</span><h3>${x[1]}</h3></div></article>`).join('')}</div></div>`),
  packagesSlide('BOOKING','UrbanCut Barbershop — from time slot to resource allocation.','',[
    ['BOOKING','Booking Basic','Rp1,5JT+','Simple reservations.',['Booking form','Basic availability','Status'],'UrbanCut'],
    ['BOOKING','Booking Business','Rp2,5JT+','Capacity, notification, and payment.',['Time slot','Customer database','Notification','Payment optional'],'UrbanCut'],
    ['BOOKING','Booking Pro','Rp4JT+','Multi-resource scheduling.',['Staff / room / resource','Allocation rules','Advanced reports'],'UrbanCut'],
  ],['Service','Barber','Date','Time','Customer','Status']),
  packagesSlide('CRM','Nexa Sales CRM — from pipeline visibility to automation.','',[
    ['CRM','CRM Lite','Rp2,5JT+','Simple lead pipeline.',['Lead + customer','Status + notes','Dashboard'],'Nexa Sales CRM'],
    ['CRM','CRM Business','Rp4JT+','A working sales team system.',['Assignment','Follow-up','Quotation','Activity reports'],'Nexa Sales CRM'],
    ['CRM','CRM Pro','Rp6JT+','Custom sales workflow.',['Automation','Approval','Integration','Advanced reporting'],'Nexa Sales CRM'],
  ],['Lead','Qualification','Assignment','Follow-up','Quotation','Won / Lost']),
  divider('05','CORPORATE<br>SYSTEMS','Corporate Presence → Business Function → Operations','CONTENT → FUNCTION → OPERATIONS'),
  packagesSlide('CORPORATE WEBSITE','Corporate capability—not merely more pages.','',corporate),
  showcase('CORPORATE WEBSITE',corporate[0],['Services','Projects','Team','Testimonials','News','Lead'],'CORPORATE UX + CMS + REVIEW STANDARD'),
  showcase('CORPORATE PROFESSIONAL',corporate[1],['Careers','Newsroom','Case studies','ESG documents','CMS'],'DEEPER INFORMATION ARCHITECTURE'),
  showcase('CORPORATE BUSINESS',corporate[2],['Inquiry','Qualification','Quotation / request','Documents','Status'],'CONTENT → BUSINESS FUNCTION'),
  packagesSlide('CORPORATE OPERATIONAL SYSTEMS','Workflows become integrated operating infrastructure.','',[
    ['OPERATIONS','Operational Lite','Rp5JT+','One to two workflows.',['Dashboard + DB','Roles + tracking','Reports'],'ProcureFlow'],
    ['OPERATIONS','Operational Standard','Rp7,5JT+','Three to five modules.',['Staff + customer','Transactions + documents','Workflow'],'ProcureFlow'],
    ['OPERATIONS','Operational Pro','Rp10JT+','Cross-process operations.',['Approval','Finance records','Audit log'],'ProcureFlow'],
    ['ENTERPRISE','Enterprise Operational','Rp15JT+ / CUSTOM','Multi-branch or division.',['SLA','Integration + security','Scale'],'ProcureFlow'],
  ]),
  showcase('OPERATIONAL SHOWCASE',['PROCUREMENT','ProcureFlow','Rp5JT+ → CUSTOM','A true operational system across request, approval, procurement, vendor, and finance.',['Role-aware dashboard','Approval history','Vendor records','Finance status'],'ProcureFlow'],['Purchase request','Manager approval','Procurement','Vendor','Finance','Completed','Reports'],'BUSINESS WEBSITE → OPERATIONAL SYSTEM'),
  divider('05','GOVERNMENT<br>& PUBLIC SERVICE','Public information → service delivery → integrated government','CATEGORY FLOOR ≥ RP5JT'),
  packagesSlide('GOVERNMENT LANDSCAPE','Requirement, stakeholder, governance, and risk create a distinct category.','',government,[],'dense'),
  showcase('GOVERNMENT WEBSITE',government[0],['Profile','Organization','News','Agenda','Documents','Gallery','CMS'],'GOVERNMENT FLOOR APPLIES'),
  showcase('GOVERNMENT PROFESSIONAL',government[1],['PPID','Documents','Complaint','Multi-admin','Reports'],'PUBLIC INFORMATION → GOVERNANCE'),
  base('DIGITAL PUBLIC SERVICE','e-Layanan','A citizen-facing service application—not an information website.',`<div class="split equal"><article class="card"><div class="card-inner"><span class="label-chip">CITIZEN</span>${flowHTML(['Submit','Upload','Reference no.','Tracking'])}${mockup('e-Layanan — Citizen')}</div></article><article class="card dark-card"><div class="card-inner"><span class="label-chip lime">STAFF</span>${flowHTML(['Verification','Approval','Result'])}${mockup('e-Layanan — Staff')}</div></article></div>`),
  showcase('GOVERNMENT INTEGRATED',government[3],['Citizen','Government units','Approval chain','External API','Audit & reporting'],'CROSS-UNIT WORKFLOW + OPERATIONAL IMPACT'),
  packagesSlide('HEALTHCARE','Capability grows alongside data sensitivity and operational risk.','',[
    ['HEALTHCARE','Clinic Website + CMS','Rp2,5JT+','Profile, doctors and content.',['Doctors + services','Schedule','CMS'],'Klinik Sehat'],
    ['HEALTHCARE','Clinic + Booking','Rp3,5JT+','Appointment + contact database.',['Doctor schedule','Booking','Contact DB'],'Klinik Sehat'],
    ['HEALTHCARE','Clinic Management Lite','Rp7,5JT+','Patient + visit + billing + stock.',['Role + workflow','Reports','Security review'],'ClinicOps'],
    ['HEALTHCARE','Healthcare System','Rp15JT+','Multi-workflow + integration.',['Advanced role','Integration','Security review'],'ClinicOps'],
    ['ENTERPRISE','Hospital / Enterprise','CUSTOM','Multi-department + SLA.',['Audit','Integration','Security'],'Discovery'],
  ],[],'dense'),
  {dark:true,html:`<p class="eyebrow">HEALTHCARE RISK</p><h1 class="headline">Higher data sensitivity.</h1><p class="subhead">Sensitive data and regulated integrations change the delivery model.</p><div class="grid cols-5">${['Security Review','Sensitive Data','External Integration','Audit','Custom Discovery'].map((x,i)=>`<article class="card dark-card ${i===0?'selected':''}"><div class="card-inner"><h3>${x}</h3></div></article>`).join('')}</div><article class="card" style="margin:42px auto 0;max-width:900px;background:#ffe9e7;border-color:#ff9e97"><div class="card-inner" style="text-align:center"><h3>SATUSEHAT / BPJS • pharmacy / lab • large sensitive records</h3><p>MANDATORY: DISCOVERY + SECURITY REVIEW + CUSTOM QUOTATION</p></div></article>`},
  divider('06','PRODUCT<br>PLATFORMS','ERP • SaaS • Marketplace • Enterprise','ARCHITECTURE MATTERS'),
  packagesSlide('ENTERPRISE PRODUCT LANDSCAPE','Architecture, tenancy, governance, and maintainability set the class.','',enterprise,[],'dense'),
  showcase('CUSTOM BUSINESS SOFTWARE',enterprise[0],['Request','Ticket','Workflow','Report'],'ONE CLEAR PROBLEM • CUSTOM SCOPE'),
  packagesSlide('ERP','Integrated modules—not a bundle of independent features.','',enterprise.slice(1,3),['Procurement','Inventory','Sales','Finance'],'cols-2'),
  showcase('SAAS PLATFORM',enterprise[3],['Organization signup','Workspace','Users','Core product','Subscription','Super admin'],'MULTI-CUSTOMER PRODUCT • TENANT LIFECYCLE'),
  base('MARKETPLACE','ServiceHub','A two-sided system is structurally different from single-merchant e-commerce.',`<div class="grid cols-3"><article class="card" style="background:#eaf0ff"><div class="card-inner" style="text-align:center"><span class="label-chip">SIDE A</span><h3 style="font-size:34px;margin-top:50px">BUYER</h3><p>Account • Search • Order • Payment</p></div></article><article class="card dark-card"><div class="card-inner" style="text-align:center"><span class="label-chip lime">CORE</span><h3 style="font-size:34px;margin-top:50px">MARKETPLACE</h3><p>Onboarding • Listing • Commission • Moderation</p></div></article><article class="card selected"><div class="card-inner" style="text-align:center"><span class="label-chip lime">SIDE B</span><h3 style="font-size:34px;margin-top:50px">VENDOR</h3><p>Onboarding • Listing • Fulfilment • Payout</p></div></article></div>`),
  {dark:true,html:`<p class="eyebrow">ENTERPRISE PLATFORM</p><h1 class="headline">Rp25JT+ / Custom</h1><p class="subhead">Mission-critical products are designed through discovery—not selected from a checklist.</p><div class="grid cols-4">${['Multi Branch','Role & Permission','Approval','Audit','API','Security','Infrastructure','SLA'].map(x=>`<article class="card dark-card"><div class="card-inner"><h3>${x}</h3></div></article>`).join('')}</div><div class="label-chip lime" style="display:flex;max-width:700px;margin:40px auto 0;height:55px;font-size:13px">DISCOVERY IS MANDATORY</div>`},
  base('ADD-ON MARKETPLACE','Guidance ranges for initial estimation—not public fixed prices.','',`<div class="grid cols-4">${[['Additional Page','Rp100–250K'],['CMS Content Type','Rp250–500K'],['Role / Permission','Rp300–750K'],['Approval Workflow','Rp500K–1,5JT'],['Payment Gateway','Rp750K–1,5JT'],['WhatsApp / API','Rp500K–1,5JT+'],['Shipping','Rp750K–1,5JT+'],['QR + Scanner','Rp500K–1JT'],['Advanced Report','Rp300K–1JT+'],['Multi-branch','Rp1JT+'],['External API','Rp500K+'],['Data Migration','Rp500K+'],['Urgent Delivery','+20–50%']].map((x,i)=>`<article class="card ${i===12?'selected':''}"><div class="card-inner"><h3>${x[0]}</h3><div class="price" style="font-size:16px">${x[1]}</div></div></article>`).join('')}</div>`),
  base('PACKAGE DISCIPLINE','When add-ons become an upgrade.','',`${flowHTML(['Base package','Add-on','Add-on','Add-on','Wrong package?'])}<div class="grid cols-3" style="margin-top:45px">${[['Upgrade Package','Capability now matches the next tier.'],['Re-Scope','Roles, workflow, or integration change architecture.'],['Move Category','Multi-vendor, multi-tenant, multi-branch, regulated, or mission-critical.']].map((x,i)=>`<article class="card ${i===2?'dark-card':''}"><div class="card-inner"><h3>${x[0]}</h3><p class="outcome">${x[1]}</p></div></article>`).join('')}</div>`),
  {dark:true,html:`<p class="eyebrow">SALES DECISION MAP</p><h1 class="headline medium">What does the client actually need?</h1><div class="decision-grid">${[['Online presence?','Website'],['Manage content?','CMS'],['Lead / customer / order?','Business'],['Daily internal operations?','Operational'],['Payment / commerce?','Event / E-Commerce'],['Cashier / stock?','POS'],['Scheduling?','Booking'],['Sales pipeline?','CRM'],['Integrated modules?','ERP'],['Multiple customer orgs?','SaaS'],['Buyer + vendor?','Marketplace'],['Government?','Government Framework']].map(x=>`<div class="decision-item">${x[0]}<b>→ ${x[1]}</b></div>`).join('')}<div class="decision-item final">Doesn't fit?<b>→ Discovery + Custom Quote</b></div></div>`},
  base('SALES LANGUAGE','Three scripts to protect positioning and trust.','',`<div class="grid cols-3">${[['WHY THIS TIER?','Paket lebih rendah fokus pada informasi/konten. Paket ini sudah masuk database dan workflow operasional—bukan sekadar jumlah halaman.'],['PRICE BEFORE SCOPE?','Kebutuhan seperti ini mengacu ke paket sekitar RpX. Angka final mengikuti role, workflow, integration, data, timeline, dan scale.'],['WHY DIFFERENT FROM BENCHMARK?','Pricelist adalah referensi kelas kebutuhan. Final quote mengikuti scope aktual agar client tidak overpay dan delivery tidak under-scoped.']].map((x,i)=>`<article class="card quote-card ${i===0?'selected':''}"><div class="card-inner"><span class="mini-chip">0${i+1}</span><h3>${x[0]}</h3><blockquote>${x[1]}</blockquote></div></article>`).join('')}</div>`),
  base('DEMO LIBRARY','P0 — build first for the most common needs and price tiers.','',`<div class="grid cols-3">${[['P01','Personal Portfolio','Personal Basic'],['U01','Kopi Rona','UMKM Basic'],['U04','LeadDesk','Business Lite'],['E01','Tech Summit','Event Landing'],['E04','Event Ticketing','Ticketing + QRIS'],['C02','Lunara Pay','E-Commerce Payment'],['CRM01','Nexa Sales CRM','CRM'],['COR01','Nexa Corporate','Corporate Website'],['OPS01','ProcureFlow','Operational System']].map((x,i)=>`<article class="card ${i===8?'selected':''}"><div class="card-inner"><span class="mini-chip">${x[0]}</span><h3>${x[1]}</h3><p class="outcome">${x[2]}</p></div></article>`).join('')}</div>`),
  base('DEMO ROADMAP','Build sequence follows sales frequency—not category prestige.','',`<div class="grid cols-3">${[['P0 — BUILD FIRST',['P01 Personal','U01 Kopi Rona','U04 LeadDesk','E01 Tech Summit','E04 Ticketing','C02 Lunara Pay','CRM01 CRM','COR01 Corporate','OPS01 ProcureFlow']],['P1 — BUILD NEXT',['P03 Personal CMS','U05 Laundry','POS01 Rasa Raya','B01 UrbanCut','GOV01 Portal Desa','GOV03 e-Layanan','ERP01 NexaERP','SAAS01 Flowdesk']],['P2 — PIPELINE ACTIVE',['W02 Wedding QR','HC01 Clinic Booking','MKT01 ServiceHub']]].map((x,i)=>`<article class="card ${i===0?'dark-card':''}"><div class="card-inner"><span class="label-chip ${i===0?'lime':''}">${x[0]}</span><ul class="feature-list" style="margin-top:28px">${x[1].map(v=>`<li>${v}</li>`).join('')}</ul></div></article>`).join('')}</div>`),
  base('VISIBILITY RULES','Public clarity. Internal control.','',`<div class="split equal"><article class="card" style="background:#eaf0ff"><div class="card-inner"><span class="label-chip">CLIENT SEES</span><ul class="feature-list" style="margin-top:32px">${['Package name + “Mulai dari”','Suitable for + outcome','Core features in business language','Tier difference + demo','Pricing disclaimer','Third-party costs'].map(x=>`<li>${x}</li>`).join('')}</ul></div></article><article class="card dark-card"><div class="card-inner"><span class="label-chip lime">SOLIVATE SEES</span><ul class="feature-list" style="margin-top:32px">${['Benchmark + category floor','Scale + complexity','Add-ons + integration','Negotiation + workload','Risk + urgency','Demo recommendation'].map(x=>`<li>${x}</li>`).join('')}</ul></div></article></div>`),
  base('WHAT CHANGED','Price revisions reflect capability and positioning.','',`<div class="grid cols-4">${[['Personal CMS','Rp499K','Rp799K','Capability upgrade'],['UMKM Business','Rp1,499JT','Rp2,99JT','Business capability'],['Corporate CMS','Rp1,299JT','Rp2,5JT','Corporate review'],['Government CMS','Rp1,999JT','Rp5JT','Government requirement'],['Public Service','Rp3,999JT','Rp10JT','Service workflow'],['ERP Lite','Rp5,999JT','Rp10JT','Integrated architecture'],['SaaS','Rp7,999JT','Rp12,5JT','Tenant lifecycle'],['Enterprise','Custom','Rp25JT+ / Custom','Enterprise positioning']].map(x=>`<article class="card"><div class="card-inner"><h3>${x[0]}</h3><p><span style="color:var(--muted)">${x[1]}</span>　→　<b style="color:var(--blue-deep)">${x[2]}</b></p><span class="mini-chip lime">WHY?</span><p style="font-size:11px;font-weight:700">${x[3]}</p></div></article>`).join('')}</div>`),
  base('MASTER BENCHMARK MATRIX','01 — Presence, business, event, and commerce.','',`<div class="matrix">${[
    ['PERSONAL',[['Basic','Rp299K'],['Standard','Rp499K'],['CMS','Rp799K'],['Blog Pro','Rp999K+']]],
    ['WEDDING',[['Basic','Rp149–249K'],['Premium','Rp349–499K'],['RSVP','Rp699K+'],['QR','Rp999K+'],['Pro','Rp1,499JT+']]],
    ['UMKM',[['Basic','Rp499K'],['Standard','Rp749K'],['CMS','Rp999K'],['Business Lite','Rp2,25JT+'],['Business','Rp2,99JT+'],['Pro','Rp3,99JT+'],['Operational','Rp4,99JT+']]],
    ['EVENT',[['Landing','Rp749K+'],['CMS','Rp999K+'],['Registration','Rp1,499JT+'],['QR','Rp2,499JT+'],['Ticketing','Rp3,499JT+']]],
    ['COMMERCE',[['Starter','Rp2,499JT+'],['Payment','Rp3,499JT+'],['Business','Rp4,999JT+'],['Advanced','Rp7,5JT+']]],
  ].map(r=>`<div class="matrix-row"><div class="matrix-label">${r[0]}</div><div class="matrix-chips">${r[1].map(x=>`<div class="matrix-chip">${x[0]}<b>${x[1]}</b></div>`).join('')}</div></div>`).join('')}</div>`),
  base('MASTER BENCHMARK MATRIX','02 — Operations, corporate, public sector, healthcare, and platforms.','',`<div class="matrix">${[
    ['OPERATIONS',[['POS Lite','Rp2,25JT+'],['POS Business','Rp3,5JT+'],['POS Pro','Rp5JT+'],['Booking','Rp1,5JT+'],['CRM Lite','Rp2,5JT+'],['CRM Pro','Rp6JT+']]],
    ['CORPORATE',[['Website','Rp2,5JT+'],['Professional','Rp3,5JT+'],['Business','Rp5JT+'],['Ops Lite','Rp5JT+'],['Ops Pro','Rp10JT+']]],
    ['GOVERNMENT',[['Website','Rp5JT+'],['Professional','Rp7,5JT+'],['Public Service','Rp10JT+'],['Integrated','Rp15JT+']]],
    ['HEALTHCARE',[['Website','Rp2,5JT+'],['Booking','Rp3,5JT+'],['Clinic Mgmt','Rp7,5JT+'],['System','Rp15JT+']]],
    ['PLATFORMS',[['Custom SW','Rp5JT+'],['ERP Lite','Rp10JT+'],['SaaS','Rp12,5JT+'],['ERP Business','Rp15JT+'],['Marketplace','Rp15JT+'],['Enterprise','Rp25JT+']]],
  ].map(r=>`<div class="matrix-row"><div class="matrix-label">${r[0]}</div><div class="matrix-chips">${r[1].map(x=>`<div class="matrix-chip">${x[0]}<b>${x[1]}</b></div>`).join('')}</div></div>`).join('')}</div>`),
  base('GOVERNANCE BEFORE PUBLIC RELEASE','Internal framework is ready; public promises still need locks.','',`<div class="grid cols-4">${[['Public wording','Lock “Mulai dari” / range.'],['Pricing authority','Category floor + negotiation authority.'],['Delivery','Revision + warranty.'],['Infrastructure','Domain + hosting policy.'],['Add-ons','Add-on floor.'],['Support','Maintenance + SLA.'],['Demo','Ensure P0 demos exist.']].map((x,i)=>`<article class="card ${i===6?'selected':''}"><div class="card-inner"><h3>${x[0]}</h3><p class="outcome">${x[1]}</p></div></article>`).join('')}</div>`),
  base('CONTENT DEPTH','Detail is not removed. Competition for attention is.','',`<div class="grid cols-3">${[['LEVEL 1 — SCAN','Name • Price • Outcome • Difference','0–5 sec'],['LEVEL 2 — UNDERSTAND','Suitable for • Capability • Demo • Upgrade path','Meeting'],['LEVEL 3 — REFERENCE','Scope • Revision • Warranty • Domain • Risk • Notes','After meeting']].map((x,i)=>`<article class="card ${i===2?'dark-card':''}"><div class="card-inner"><span class="label-chip ${i===2?'lime':''}">${x[2]}</span><h3 style="font-size:28px;margin-top:40px">${x[0]}</h3><p class="outcome">${x[1]}</p></div></article>`).join('')}</div>`),
  base('COMPARISON BEHAVIOR','Always answer: what changes when I pay more?','',`<div class="ladder" style="min-height:55vh">${[['Basic','Information'],['Standard','Multipage'],['Premium','Self-Service CMS'],['Business Lite','Lead Database'],['Business','Order Lifecycle'],['Business Pro','Multi-Staff Workflow'],['Operational','Daily Operations']].map((x,i)=>`<div class="ladder-item" style="height:${25+i*10}%"><h3>${x[0]}</h3><p>${x[1]}</p></div>`).join('')}</div>`),
  base('VISUAL DEMO STRATEGY','Show the product—not merely its name.','',`<div class="split"><div>${mockup('CleanFlow Laundry')}</div><article class="card dark-card"><div class="card-inner"><span class="label-chip lime">DEMO FOR UMKM BUSINESS</span><h3 style="font-size:42px;margin-top:48px">CLEANFLOW<br>LAUNDRY</h3>${flowHTML(['Customer','Order','Processing','Ready','Completed'])}<p class="outcome">A concrete reference gives sales something visible to point to.</p></div></article></div>`),
  base('ICON SYSTEM','One consistent product vocabulary across the catalogue.','',`<div class="grid cols-6">${['Website','CMS','Business','Operations','Event','Commerce','POS','Booking','CRM','Corporate','Government','Healthcare','ERP','SaaS','Marketplace','Enterprise'].map((x,i)=>`<article class="card ${i===15?'selected':''}"><div class="card-inner" style="text-align:center"><span class="issue-no">${String(i+1).padStart(2,'0')}</span><h3>${x}</h3></div></article>`).join('')}</div>`),
  base('MOTION SYSTEM','Restrained motion supports hierarchy.','',`<div class="grid cols-5">${[['DEFAULT','Fade + translate','200–350ms'],['LADDER','Progressive reveal','Step-by-step'],['WORKFLOW','Line / step reveal','Sequential'],['CARDS','Small stagger','Grouped'],['PRICING','Number emphasis','Purposeful']].map((x,i)=>`<article class="card ${i===0?'selected':''}"><div class="card-inner" style="text-align:center"><span class="mini-chip">${x[0]}</span><h3 style="margin-top:55px">${x[1]}</h3><p>${x[2]}</p></div></article>`).join('')}</div>`),
  base('BROWSER PRESENTATION','The same catalogue becomes a searchable presentation app.','',`<div class="split"><div>${mockup('Solivate Pricing /presentation')}</div><div class="grid cols-2">${['Keyboard nav','Slide navigator','Chapter jump','Fullscreen','Progress bar','Search & jump'].map((x,i)=>`<article class="card ${i===5?'selected':''}"><div class="card-inner"><span class="issue-no">0${i+1}</span><h3>${x}</h3></div></article>`).join('')}</div></div>`),
  base('PACKAGE INTERACTION','Clean comparison. Complete detail on demand.','',`<div class="split equal"><div>${packageCard(business[1],true)}</div><article class="card"><div class="card-inner"><span class="label-chip">EXPANDED DRAWER</span><h3 style="font-size:34px">UMKM Business</h3><div class="matrix">${[['Suitable For','Active order process'],['Outcome','Customer → order lifecycle'],['Included','DB, invoice, workflow'],['Demo','CleanFlow Laundry'],['Differentiator','Lead → transaction'],['Internal Notes','Benchmark + risk']].map(x=>`<div class="matrix-row"><b>${x[0]}</b><span>${x[1]}</span></div>`).join('')}</div></div></article></div>`),
  base('TWO MODES, ONE SYSTEM','Presentation for the room. Catalogue for the work.','',`<div class="split equal"><article class="card dark-card"><div class="card-inner"><span class="label-chip lime">PRESENTATION MODE</span><h3 style="font-size:34px;margin-top:45px">Big, clean, speaking-first.</h3><ul class="feature-list">${['Mouse + keyboard navigation','Chapter progression','Focused slide content','Fullscreen'].map(x=>`<li>${x}</li>`).join('')}</ul></div></article><article class="card"><div class="card-inner"><span class="label-chip">CATALOGUE MODE</span><h3 style="font-size:34px;margin-top:45px">Search, filter, compare.</h3><ul class="feature-list">${['Personal • UMKM • Event','POS • Booking • CRM','Government • Healthcare','ERP • SaaS • Marketplace'].map(x=>`<li>${x}</li>`).join('')}</ul></div></article></div>`),
  base('FINAL PRESENTATION IDENTITY','The deck behaves like a business system, not a document.','',`<div class="grid cols-3">${[['A Product Catalogue','Not random services.'],['A Pricing Architecture','Not pricing by feeling.'],['A Sales System','Not package guessing.'],['A Demo Strategy','Not promises alone.'],['A Quotation Framework','Not copy-paste pricing.'],['An Upgrade Path','Rp299K → Rp25JT+']].map((x,i)=>`<article class="card ${i===5?'selected':''}"><div class="card-inner"><span class="issue-no">0${i+1}</span><h3>${x[0]}</h3><p class="outcome">${x[1]}</p></div></article>`).join('')}</div>`),
  {dark:true,html:`<div class="closing"><div><p class="eyebrow">SOLIVATE STUDIO • PRICING MASTER 2026</p><h2>Packages define<br>the starting point.</h2></div><div><h2>Discovery defines<br>the final quotation.</h2><p class="subhead">Right Scope. Right Capability. Right Price.</p></div></div>`},
];

if (slides.length !== 83) console.warn(`Expected 83 slides, got ${slides.length}`);

let current = Math.max(0, Math.min(slides.length - 1, Number(location.hash.replace('#slide-','')) - 1 || 0));
let hintTimer;
let toastTimer;

function chapterAt(index) {
  const n = index + 1;
  return chapterDefs.find(c => n >= c.from && n <= c.to) || chapterDefs.at(-1);
}

function render() {
  const s = slides[current];
  const el = $('#slide');
  el.className = `slide ${s.dark ? 'dark' : ''}`;
  el.innerHTML = s.html;
  document.body.classList.toggle('is-dark', !!s.dark);
  $('#counter').textContent = `${String(current + 1).padStart(2,'0')} / ${slides.length}`;
  $('#progress').style.width = `${((current + 1) / slides.length) * 100}%`;
  const chapter = chapterAt(current);
  $('#chapter').textContent = `${chapter.id} / ${chapter.label}`;
  [...$('#chapters').children].forEach((node, i) => node.classList.toggle('active', chapterDefs[i].id === chapter.id));
  history.replaceState(null, '', `#slide-${String(current + 1).padStart(2,'0')}`);
  requestAnimationFrame(() => {
    el.classList.add('entering');
    setTimeout(() => el.classList.remove('entering'), 620);
  });
}

function showToast(text) {
  const el = $('#toast');
  el.textContent = text;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 900);
}

function next() {
  if (current < slides.length - 1) { current++; render(); }
  else showToast('END OF PRESENTATION');
}

function prev() {
  if (current > 0) { current--; render(); }
  else showToast('START OF PRESENTATION');
}

chapterDefs.forEach(c => {
  const node = document.createElement('span');
  node.textContent = `${c.id} ${c.label}`;
  $('#chapters').appendChild(node);
});

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  next();
});

document.addEventListener('mousedown', (e) => {
  if (e.target.closest('button')) return;
  if (e.button === 0) prev();
});

document.addEventListener('keydown', (e) => {
  if (['ArrowRight','PageDown',' ','Enter'].includes(e.key)) { e.preventDefault(); next(); }
  if (['ArrowLeft','PageUp','Backspace'].includes(e.key)) { e.preventDefault(); prev(); }
  if (e.key.toLowerCase() === 'f') $('#fullscreen').click();
  if (e.key === 'Home') { current = 0; render(); }
  if (e.key === 'End') { current = slides.length - 1; render(); }
});

$('#fullscreen').addEventListener('mousedown', e => e.stopPropagation());
$('#fullscreen').addEventListener('click', async (e) => {
  e.stopPropagation();
  if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
  else await document.exitFullscreen();
});

hintTimer = setTimeout(() => $('#gestureHint').classList.add('hidden'), 5200);
render();
