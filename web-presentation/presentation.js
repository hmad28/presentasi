const $ = (selector) => document.querySelector(selector);
const catalogue = window.SOLIVATE_CATALOGUE || [];
const groups = window.SOLIVATE_GROUPS || [];
const liveExamples = window.SOLIVATE_LIVE_EXAMPLES || {};
const byId = Object.fromEntries(catalogue.map((item) => [item.id, item]));

const esc = (value = '') => String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);
const list = (items, limit = items.length) => items.slice(0, limit).map((item) => `<li>${esc(item)}</li>`).join('');
const groupFor = (id) => groups.find((group) => group.id === id);

function packageSlide(item, index, total) {
  const group = groupFor(item.group);
  const live = liveExamples[item.id];
  const preview = live
    ? `<a class="project-preview" href="${live.url}" target="_blank" rel="noopener">
        <img src="${live.image}" alt="Screenshot ${esc(live.title)}" />
        <span>CONTOH NYATA</span><strong>${esc(live.title)}</strong><small>BUKA WEBSITE ↗</small>
      </a>`
    : `<div class="project-preview empty-preview">
        <span>CONTOH IMPLEMENTASI</span><strong>${esc(item.useCase)}</strong><small>DEMO KHUSUS BELUM TERSEDIA</small>
      </div>`;

  return {
    type: 'package', group: item.group, packageId: item.id,
    html: `<div class="package-page ${item.name.length > 17 ? 'compact-package' : ''}" style="--accent:${group.accent}">
      <header class="package-kicker">
        <span>${group.number} · ${esc(item.subcategory).toUpperCase()}</span>
        <small>PAKET ${String(index).padStart(2, '0')} / ${String(total).padStart(2, '0')}</small>
      </header>
      <section class="package-copy">
        <h1>${esc(item.name)}</h1>
        <div class="price-label">MULAI DARI</div>
        <strong class="hero-price ${item.price.length > 16 ? 'long' : ''}">${esc(item.price)}</strong>
        <p class="outcome">${esc(item.outcome)}</p>
        <button class="detail-button" type="button" data-detail="${item.id}">LIHAT SCOPE LENGKAP <b>+</b></button>
        <section class="benefit-list">
          <header><span>BENEFIT INTI</span><b>${item.baseline.length} ITEM SCOPE</b></header>
          <ul>${list(item.baseline, 6)}</ul>
          ${item.baseline.length > 6 ? `<button type="button" data-detail="${item.id}">+ ${item.baseline.length - 6} DETAIL LAINNYA</button>` : ''}
        </section>
      </section>
      <aside class="package-proof">
        ${preview}
        <div class="difference"><span>KENAPA PAKET INI?</span><p>${esc(item.difference)}</p></div>
      </aside>
    </div>`,
  };
}

function groupDivider(group, items) {
  const subcategories = [...new Set(items.map((item) => item.subcategory))];
  return {
    type: 'divider', group: group.id, dark: true,
    html: `<div class="group-divider" style="--accent:${group.accent}">
      <span class="giant-number">${group.number}</span>
      <div class="divider-copy"><small>KATEGORI UTAMA</small><h1>${esc(group.title)}</h1><p>${esc(group.subtitle)}</p></div>
      <div class="divider-index"><b>${items.length} PAKET</b>${subcategories.map((name) => `<span>${esc(name)}</span>`).join('')}</div>
    </div>`,
  };
}

const slides = [
  {
    type: 'cover', group: 'overview', dark: true,
    html: `<div class="cover">
      <div class="cover-label">DRAFT INTERNAL · SIMPLIFIED STRUCTURE · 2026</div>
      <h1>Pricing,<br><em>dipermudah.</em></h1>
      <p>21 paket publik. Tiga kategori. Scope tetap fleksibel.</p>
      <div class="cover-metric"><strong>21</strong><span>PAKET<br>PUBLIK</span></div>
      <div class="cover-foot">SERVICE CATALOGUE · PRICING BENCHMARK · SCOPE FRAMEWORK · QUOTATION GUIDE</div>
    </div>`,
  },
  {
    type: 'toc', group: 'overview',
    html: `<div class="toc">
      <header><span>02 · DAFTAR ISI</span><h1>Tiga kategori.<br>Semua kebutuhan.</h1></header>
      <div class="toc-list">${groups.map((group) => {
        const items = catalogue.filter((item) => item.group === group.id);
        const sub = [...new Set(items.map((item) => item.subcategory))];
        return `<button type="button" data-group-jump="${group.id}" style="--accent:${group.accent}">
          <span>${group.number}</span><div><h2>${esc(group.title)}</h2><p>${sub.join(' · ')}</p></div><strong>${items.length}<small>PAKET</small></strong><b>→</b>
        </button>`;
      }).join('')}</div>
      <footer><b>21</b> paket publik menggantikan puluhan variasi paket lama.</footer>
    </div>`,
  },
  {
    type: 'statement', group: 'overview',
    html: `<div class="statement-page">
      <div class="statement-title"><span>03 · TUJUAN STRUKTUR BARU</span><h1>Sedikit paket.<br><em>Lebih mudah dijual.</em></h1></div>
      <div class="statement-grid six">
        <article><b>01</b><h2>Mudah dipahami</h2><p>Tim dan client tidak perlu memilih terlalu banyak paket.</p></article>
        <article><b>02</b><h2>Outcome jelas</h2><p>Perbedaan dijelaskan dari hasil, bukan sekadar daftar fitur.</p></article>
        <article><b>03</b><h2>Scope fleksibel</h2><p>Traffic, user, role, integrasi, dan risiko menjadi adjustment.</p></article>
        <article><b>04</b><h2>Tidak dipaksakan</h2><p>Project kompleks tidak dimasukkan ke paket standar.</p></article>
        <article><b>05</b><h2>SKU terkonsolidasi</h2><p>ERP, SaaS, Marketplace, dan sistem kompleks masuk Custom.</p></article>
        <article><b>06</b><h2>Quotation akurat</h2><p>Discovery tetap menentukan scope dan harga final.</p></article>
      </div>
    </div>`,
  },
  {
    type: 'principles', group: 'overview', dark: true,
    html: `<div class="principle-page">
      <span>04 · TIGA ATURAN UTAMA</span>
      <div class="principle-row"><b>01</b><h2>Paket adalah <em>anchor</em>,<br>bukan harga mati.</h2><p>Nama paket membantu mengidentifikasi kebutuhan, benchmark awal, baseline scope, dan outcome.</p></div>
      <div class="principle-row"><b>02</b><h2>Complexity mengubah <em>quotation</em>,<br>bukan selalu nama paket.</h2><p>Traffic, user, admin, role, API, QR, CMS, atau payment dapat ditangani sebagai scope adjustment.</p></div>
      <div class="principle-row"><b>03</b><h2>Kompleks, besar, unik,<br>atau high-risk → <em>Custom.</em></h2><p>Multi-module, enterprise, ERP, SaaS, Marketplace, mobile app, dan regulated system wajib discovery.</p></div>
    </div>`,
  },
];

groups.forEach((group) => {
  const items = catalogue.filter((item) => item.group === group.id);
  slides.push(groupDivider(group, items));
  items.forEach((item, index) => slides.push(packageSlide(item, index + 1, items.length)));
});

slides.push(
  {
    type: 'framework', group: 'framework',
    html: `<div class="framework-page"><header><span>CLIENT SCALE FRAMEWORK</span><h1>Ukuran client bukan markup otomatis.</h1><p>Yang dinilai: dampaknya terhadap workload, complexity, risk, infrastructure, stakeholder, dan support.</p></header>
      <div class="scale-row">
        <article><b>S1</b><h2>Personal / Micro</h2><p>1–2 admin · traffic rendah · workflow sederhana · risiko rendah</p></article>
        <article><b>S2</b><h2>Small Business</h2><p>UMKM · 1–3 admin · operasi mulai aktif · requirement standar</p></article>
        <article><b>S3</b><h2>Growing / Mid</h2><p>User & data bertambah · QA dan reporting lebih penting</p></article>
        <article><b>S4</b><h2>Large Business</h2><p>Transaction tinggi · approval · security · integration · support</p></article>
        <article><b>S5</b><h2>Enterprise</h2><p>Multi-branch · SLA · audit · compliance · mission-critical</p></article>
      </div><footer>S5 biasanya diarahkan ke <b>Custom Quotation.</b></footer></div>`,
  },
  {
    type: 'framework', group: 'framework',
    html: `<div class="framework-page"><header><span>COMPLEXITY FRAMEWORK</span><h1>Empat level kompleksitas.</h1><p>Level membantu estimator melihat beban implementasi tanpa menambah nama paket.</p></header>
      <div class="complexity-grid">
        <article><b>A</b><h2>Simple</h2><ul><li>1 role</li><li>1 workflow</li><li>Sedikit entity</li><li>Tanpa integrasi kompleks</li></ul></article>
        <article><b>B</b><h2>Standard</h2><ul><li>2–3 role</li><li>Beberapa workflow</li><li>Notification</li><li>Search, filter, basic report</li></ul></article>
        <article><b>C</b><h2>Advanced</h2><ul><li>Multi-role & approval</li><li>Payment / API</li><li>Automation</li><li>Complex report</li></ul></article>
        <article class="danger"><b>D</b><h2>Enterprise</h2><ul><li>Multi-branch / department</li><li>Audit, security, SLA</li><li>High availability</li><li>Mission-critical → Custom</li></ul></article>
      </div></div>`,
  },
  {
    type: 'formula', group: 'framework', dark: true,
    html: `<div class="formula-page"><span>FORMULA PENENTUAN QUOTATION</span><h1>Benchmark adalah awal.<br><em>Workload menentukan akhir.</em></h1>
      <div class="formula-flow"><b>PACKAGE<br>BENCHMARK</b><i>±</i><b>SCOPE</b><i>+</i><b>FEATURE<br>& ADD-ON</b><i>+</i><b>COMPLEXITY<br>& SCALE</b><i>+</i><b>INTEGRATION<br>& INFRA</b><i>+</i><b>TIMELINE<br>& SUPPORT</b></div>
      <footer><strong>= FINAL QUOTATION</strong><p>Bukan kalkulator otomatis. Estimator tetap menggunakan judgement berdasarkan workload aktual, SLA, dan third-party cost.</p></footer></div>`,
  },
  {
    type: 'addons', group: 'framework',
    html: `<div class="addons-page"><header><span>ADD-ONS & SCOPE ADJUSTMENT</span><h1>Tambahan capability,<br>bukan paket baru.</h1><p>Guidance internal—harga berubah mengikuti actual scope.</p></header>
      <div class="addon-grid">
        ${[
          ['Additional normal page','Rp100–250rb+'],['Extra CMS content type','Rp250–500rb+'],['Additional role / permission','Rp300–750rb+'],['Approval workflow','Rp500rb–1,5jt+'],['Payment gateway','Rp750rb–1,5jt+'],['WhatsApp / API','Rp500rb–1,5jt+'],['Shipping integration','Rp750rb–1,5jt+'],['QR + scanner','Rp500rb–1jt'],['Advanced report / export','Rp300rb–1jt+'],['Multi-branch / outlet','Rp1jt+'],['External API','Rp500rb+'],['Data migration / import','Rp500rb+'],['Urgent delivery','+20–50%']
        ].map(([name, price]) => `<article><span>${name}</span><b>${price}</b></article>`).join('')}
      </div></div>`,
  },
  {
    type: 'custom-trigger', group: 'framework', dark: true,
    html: `<div class="custom-page"><span>KAPAN ADD-ON BERUBAH MENJADI CUSTOM?</span><h1>Jangan menumpuk add-on<br>sampai arsitekturnya berubah.</h1>
      <div class="trigger-cloud">${['Multi-module','Multi-role','Multi-department','Multi-branch','Mobile app','Banyak integration','Approval kompleks','High traffic','Mission-critical','SLA khusus','Security / audit','ERP','SaaS','Marketplace','Multi-tenant','Regulated system'].map((item) => `<b>${item}</b>`).join('')}</div>
      <footer><p>Jika jenis solusi masih sama → <b>scope adjustment.</b></p><p>Jika architecture dan risiko berubah → <b>Custom.</b></p></footer></div>`,
  },
  {
    type: 'case', group: 'framework',
    html: `<div class="case-page"><header><span>STUDI KASUS 01</span><h1>Event 20.000+ visitor.</h1><p>Nama paket tetap <b>Event Ticketing</b>. Yang berubah adalah scale, architecture, support, dan quotation.</p></header>
      <div class="case-main"><div class="case-classification"><span>PUBLIC PACKAGE</span><strong>Event Ticketing</strong><span>INTERNAL</span><strong>S4 / S5 · C / D</strong><span>QUOTATION</span><strong>Custom-scale</strong></div>
      <div class="case-factors"><h2>Faktor adjustment</h2><div>${['Peak traffic','Concurrent checkout','20.000+ QR','Gate & scanner','Payment risk','Venue network','Load testing','Monitoring & backup','Event-day SLA'].map((x) => `<span>${x}</span>`).join('')}</div></div></div>
      <footer>Event profile → ticket sales → payment → QR ticket → multi-gate check-in → sales & attendance report</footer></div>`,
  },
  {
    type: 'case', group: 'framework',
    html: `<div class="case-page travel"><header><span>STUDI KASUS 02</span><h1>Full Travel Umroh System.</h1><p>Ketika website, admin, jamaah, agen, payment, dokumen, dan commission terhubung, project masuk <b>Custom Software & Enterprise Solution.</b></p></header>
      <div class="travel-modules">
        <article><b>PUBLIC WEBSITE</b><p>Profile · paket · jadwal · blog · gallery · inquiry</p></article>
        <article><b>ADMIN DASHBOARD</b><p>Jamaah · transaksi · payment · dokumen · agen · commission · report</p></article>
        <article><b>JAMAAH PORTAL</b><p>Biodata · upload · payment status · itinerary · departure</p></article>
        <article><b>AGEN PORTAL</b><p>Referral · jamaah · commission · transaction · performance</p></article>
      </div>
      <footer>Registration → Verification → Payment → Document → Visa / Processing → Departure → Completion</footer></div>`,
  },
  {
    type: 'decision', group: 'framework',
    html: `<div class="decision-page"><header><span>SALES DECISION GUIDE</span><h1>Mulai dari kebutuhan,<br>bukan nama fitur.</h1></header>
      <div class="decision-list">
        ${[
          ['Tampil online','Personal / Institution / UMKM / Corporate Website'],['Kelola content sendiri','CMS sebagai scope / add-on'],['Pendaftaran event','Event Registration'],['Jual tiket event','Event Ticketing'],['Jual produk','E-Commerce'],['Digitalisasi satu proses','Business System'],['Alat operasional harian','Operational System'],['Government','Government Website / Digital Public Service'],['Besar, unik, high-scale','Custom Software & Enterprise Solution']
        ].map(([need, solution], index) => `<article><b>${String(index + 1).padStart(2, '0')}</b><span>${need}</span><strong>${solution}</strong></article>`).join('')}
      </div></div>`,
  },
  {
    type: 'consolidation', group: 'framework',
    html: `<div class="consolidation-page"><header><span>KONSOLIDASI PAKET LAMA · 01</span><h1>Lebih sedikit SKU.<br>Capability tetap ada.</h1></header>
      <div class="mapping-grid">${[
        ['Personal Blog Pro','Personal Professional + Blog/CMS'],['Personal Premium CMS','Personal Professional + CMS'],['Wedding Premium','Wedding Invitation + scope'],['Wedding RSVP','Wedding Guest Management'],['Wedding QR Management','Wedding Guest Management'],['Wedding Pro','Guest Management + scale'],['Institutional CMS','Institution Pro'],['Institutional Operational','Business / Operational / Custom'],['UMKM Premium CMS','UMKM Professional + CMS'],['UMKM Business Lite','Business System'],['UMKM Business','Business System'],['UMKM Business Pro','Operational System'],['UMKM Operational','Operational System'],['Event + CMS','Event Website + CMS'],['Event Registration + QR','Registration + QR add-on'],['E-Commerce Payment','E-Commerce Business']
      ].map(([oldName,newName]) => `<article><span>${oldName}</span><b>→</b><strong>${newName}</strong></article>`).join('')}</div></div>`,
  },
  {
    type: 'consolidation', group: 'framework',
    html: `<div class="consolidation-page"><header><span>KONSOLIDASI PAKET LAMA · 02</span><h1>Produk kompleks<br>masuk kategori yang benar.</h1></header>
      <div class="mapping-grid">${[
        ['E-Commerce Advanced','E-Commerce Pro / Custom'],['POS Lite / Business / Pro','Business System / Operational'],['Booking Basic / Business / Pro','Business System'],['CRM Lite / Business / Pro','Business / Operational / Custom'],['Corporate Professional','Corporate Website + scope'],['Corporate Operational','Operational / Custom'],['Government Professional','Government Website + scope'],['Government Integrated / Enterprise','Custom'],['Clinic Website','Corporate / Business Website'],['Clinic Booking','Business System'],['Clinic Management','Operational / Custom'],['Healthcare System','Custom'],['ERP Lite / Business','Custom'],['SaaS Platform','Custom'],['Marketplace','Custom'],['Enterprise Platform','Custom']
      ].map(([oldName,newName]) => `<article><span>${oldName}</span><b>→</b><strong>${newName}</strong></article>`).join('')}</div></div>`,
  },
  {
    type: 'matrix', group: 'framework',
    html: `<div class="matrix-page"><header><span>RINGKASAN FINAL</span><h1>21 paket publik.</h1></header>
      <div class="matrix-groups">${groups.map((group) => `<section style="--accent:${group.accent}"><h2>${group.title}</h2>${catalogue.filter((item) => item.group === group.id).map((item) => `<button type="button" data-detail="${item.id}"><span>${item.name}</span><b>${item.price}</b></button>`).join('')}</section>`).join('')}</div>
    </div>`,
  },
  {
    type: 'disclaimer', group: 'framework', dark: true,
    html: `<div class="disclaimer-page"><span>PRINSIP CLIENT-FACING</span><h1>Harga awal untuk<br><em>scope representatif.</em></h1><p>Final quotation dapat berbeda berdasarkan fitur, halaman atau modul, user dan role, workflow, integrasi, skala penggunaan, traffic, timeline, infrastructure, support, dan kebutuhan khusus.</p>
      <div><b>Jangan membuat paket baru hanya karena ada fitur tambahan.</b><p>Jika jenis solusi masih sama: add-on, scope adjustment, atau scale adjustment. Jika project berubah menjadi kompleks: Custom.</p></div></div>`,
  },
  {
    type: 'closing', group: 'framework', dark: true,
    html: `<div class="closing"><span>SOLIVATE STUDIO · PRICING MASTER SIMPLIFIED 2026</span><h1>Sedikit paket.<br><em>Benefit jelas.</em><br>Quotation akurat.</h1><p>Benchmark menentukan titik awal. Discovery menentukan scope. Scope menentukan harga.</p><button type="button" data-open-catalogue>BUKA 21 PAKET →</button></div>`,
  },
);

const groupFirstSlide = {};
slides.forEach((slide, index) => { if (slide.group && groupFirstSlide[slide.group] === undefined) groupFirstSlide[slide.group] = index; });
const packageSlideIndex = Object.fromEntries(slides.map((slide, index) => [slide.packageId, index]).filter(([id]) => id));
const chapterData = [
  { id: 'overview', number: '00', name: 'PEMBUKA' },
  ...groups.map((group) => ({ id: group.id, number: group.number, name: group.short.toUpperCase() })),
  { id: 'framework', number: '04', name: 'FRAMEWORK' },
];

let current = 0;
let activeFilter = 'all';

function chapterFor(slide) { return chapterData.find((chapter) => chapter.id === slide.group) || chapterData[0]; }

function renderChapterNav() {
  $('#chapterNav').innerHTML = chapterData.map((chapter) => `<button type="button" data-slide="${groupFirstSlide[chapter.id]}"><span>${chapter.number}</span>${chapter.name}</button>`).join('');
  $('#chapterNav').querySelectorAll('[data-slide]').forEach((button) => button.addEventListener('click', () => render(Number(button.dataset.slide))));
}

function bindSlideActions() {
  document.querySelectorAll('[data-detail]').forEach((button) => button.addEventListener('click', () => openDetail(button.dataset.detail)));
  document.querySelectorAll('[data-group-jump]').forEach((button) => button.addEventListener('click', () => render(groupFirstSlide[button.dataset.groupJump])));
  document.querySelectorAll('[data-open-catalogue]').forEach((button) => button.addEventListener('click', openCatalogue));
}

function render(index, direction = 1) {
  current = Math.max(0, Math.min(slides.length - 1, index));
  const slide = slides[current];
  const chapter = chapterFor(slide);
  const host = $('#slide');
  host.className = `slide slide-${slide.type} ${slide.dark ? 'is-dark' : ''} ${direction < 0 ? 'from-left' : 'from-right'}`;
  host.innerHTML = `<div class="slide-inner">${slide.html}</div>`;
  document.body.classList.toggle('dark-active', Boolean(slide.dark));
  $('#chapterNumber').textContent = chapter.number;
  $('#chapterName').textContent = chapter.name;
  $('#counter').textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
  $('#progress').style.width = `${((current + 1) / slides.length) * 100}%`;
  $('#prev').disabled = current === 0;
  $('#next').disabled = current === slides.length - 1;
  $('#chapterNav').querySelectorAll('button').forEach((button) => button.classList.toggle('active', Number(button.dataset.slide) === groupFirstSlide[slide.group]));
  history.replaceState(null, '', `#slide-${String(current + 1).padStart(2, '0')}`);
  bindSlideActions();
}

function detailSection(title, items, open = false) {
  if (!items?.length) return '';
  return `<details ${open ? 'open' : ''}><summary>${title}<b>${items.length}</b></summary><ul>${list(items)}</ul></details>`;
}

function openDetail(id) {
  const item = byId[id];
  if (!item) return;
  const group = groupFor(item.group);
  const live = liveExamples[id];
  $('#detailContent').innerHTML = `<header class="detail-hero" style="--accent:${group.accent}">
    <span>${esc(item.subcategory)}</span><h2>${esc(item.name)}</h2><strong>${esc(item.price)}</strong><p>${esc(item.outcome)}</p>
  </header>
  ${live ? `<a class="detail-preview" href="${live.url}" target="_blank" rel="noopener"><img src="${live.image}" alt="${esc(live.title)}" /><span>${esc(live.title)} · BUKA WEBSITE ↗</span></a>` : `<div class="detail-example"><span>CONTOH IMPLEMENTASI</span><p>${esc(item.useCase)}</p></div>`}
  <section class="detail-fact"><span>COCOK UNTUK</span><p>${esc(item.audience)}</p></section>
  <section class="detail-fact accent"><span>PEMBEDA UTAMA</span><p>${esc(item.difference)}</p></section>
  ${detailSection('Baseline scope', item.baseline, true)}
  ${detailSection('Tidak termasuk baseline', item.excluded)}
  ${detailSection('Optional / add-on', item.optional)}
  ${detailSection('Scope / scale adjustment', item.adjustment)}
  ${detailSection('Contoh workflow', item.examples)}
  ${detailSection('Trigger menuju Custom', item.customTrigger)}
  <div class="detail-disclaimer"><b>Benchmark ≠ final quotation.</b><p>Final quotation ditentukan setelah discovery berdasarkan scope, complexity, scale, integration, infrastructure, timeline, support, SLA, dan third-party cost.</p></div>
  <button class="present-package" type="button" data-present="${item.id}">TAMPILKAN HALAMAN PAKET →</button>`;
  $('#detailLayer').classList.add('open');
  $('#detailLayer').setAttribute('aria-hidden', 'false');
  document.body.classList.add('overlay-open');
  $('[data-present]').addEventListener('click', () => { closeDetail(); closeCatalogue(); render(packageSlideIndex[id]); });
}

function closeDetail() {
  $('#detailLayer').classList.remove('open');
  $('#detailLayer').setAttribute('aria-hidden', 'true');
  if (!$('#catalogue').classList.contains('open')) document.body.classList.remove('overlay-open');
}

function renderFilters() {
  const options = [{ id: 'all', title: 'Semua' }, ...groups];
  $('#filters').innerHTML = options.map((item) => `<button type="button" data-filter="${item.id}" class="${activeFilter === item.id ? 'active' : ''}">${item.title}</button>`).join('');
  $('#filters').querySelectorAll('[data-filter]').forEach((button) => button.addEventListener('click', () => { activeFilter = button.dataset.filter; renderFilters(); renderCatalogue(); }));
}

function renderCatalogue() {
  const query = $('#search').value.trim().toLowerCase();
  const items = catalogue.filter((item) => (activeFilter === 'all' || item.group === activeFilter) && (!query || [item.name, item.price, item.subcategory, item.audience, item.outcome, item.useCase, ...item.baseline].join(' ').toLowerCase().includes(query)));
  $('#catalogueGrid').innerHTML = items.length ? items.map((item) => {
    const group = groupFor(item.group);
    return `<button type="button" data-card="${item.id}" style="--accent:${group.accent}"><span>${esc(item.subcategory)}</span><h3>${esc(item.name)}</h3><strong>${esc(item.price)}</strong><p>${esc(item.difference)}</p><b>LIHAT DETAIL →</b></button>`;
  }).join('') : '<div class="empty-state">Paket tidak ditemukan.</div>';
  $('#catalogueGrid').querySelectorAll('[data-card]').forEach((button) => button.addEventListener('click', () => openDetail(button.dataset.card)));
}

function openCatalogue() {
  $('#catalogue').classList.add('open');
  $('#catalogue').setAttribute('aria-hidden', 'false');
  document.body.classList.add('overlay-open');
  renderFilters(); renderCatalogue();
}
function closeCatalogue() {
  $('#catalogue').classList.remove('open');
  $('#catalogue').setAttribute('aria-hidden', 'true');
  if (!$('#detailLayer').classList.contains('open')) document.body.classList.remove('overlay-open');
}

$('#prev').addEventListener('click', () => render(current - 1, -1));
$('#next').addEventListener('click', () => render(current + 1, 1));
$('#goHome').addEventListener('click', () => render(0));
$('#openCatalogue').addEventListener('click', openCatalogue);
$('#closeCatalogue').addEventListener('click', closeCatalogue);
$('#closeDetail').addEventListener('click', closeDetail);
$('#detailBackdrop').addEventListener('click', closeDetail);
$('#search').addEventListener('input', renderCatalogue);
$('#fullscreen').addEventListener('click', async () => { if (!document.fullscreenElement) await document.documentElement.requestFullscreen?.(); else await document.exitFullscreen?.(); });

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') { if ($('#detailLayer').classList.contains('open')) closeDetail(); else if ($('#catalogue').classList.contains('open')) closeCatalogue(); return; }
  if ($('#detailLayer').classList.contains('open') || $('#catalogue').classList.contains('open')) return;
  if (['ArrowRight', 'PageDown', ' '].includes(event.key)) { event.preventDefault(); render(current + 1, 1); }
  if (['ArrowLeft', 'PageUp'].includes(event.key)) { event.preventDefault(); render(current - 1, -1); }
  if (event.key === 'Home') render(0);
  if (event.key === 'End') render(slides.length - 1);
});

const hashMatch = location.hash.match(/slide-(\d+)/);
if (hashMatch) current = Math.max(0, Math.min(slides.length - 1, Number(hashMatch[1]) - 1));
renderChapterNav();
render(current);
