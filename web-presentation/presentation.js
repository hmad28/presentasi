const $ = (query) => document.querySelector(query);
const catalogue = window.SOLIVATE_CATALOGUE || [];
const byId = Object.fromEntries(catalogue.map((item) => [item.id, item]));

const chapters = [
  { id: '01', label: 'PATOKAN', from: 1, to: 2 },
  { id: '02', label: 'HARGA PAKET', from: 3, to: 14 },
  { id: '03', label: 'PENYESUAIAN', from: 15, to: 17 },
  { id: '04', label: 'PENUTUP', from: 18, to: 18 },
];

const packageCopy = {
  'personal-basic': ['Landing personal', '1 halaman, tanpa CMS'],
  'personal-standard': ['Personal brand lebih kredibel', 'Multipage + SEO dasar'],
  'personal-cms': ['Konten dapat diubah sendiri', 'Dashboard + 3–4 tipe konten'],
  'personal-blog': ['Publikasi artikel serius', 'Draft, kategori, tag, search'],
  'wedding-basic': ['Undangan digital sederhana', 'Informasi acara tanpa database'],
  'wedding-premium': ['Undangan lebih personal', 'Nama tamu + interaksi'],
  'wedding-rsvp': ['Konfirmasi tamu tersimpan', 'Mulai memiliki database tamu'],
  'wedding-qr': ['Check-in digital', 'QR unik + scanner'],
  'wedding-pro': ['Operasi tamu skala besar', 'Pax, kategori, bulk import, multi-scanner'],
  'institution-landing': ['Campaign satu halaman', 'Tanpa CMS'],
  'institution-profile': ['Profil lembaga lengkap', '5–7 halaman + domain'],
  'institution-cms': ['Update berita & program', 'Admin dashboard'],
  'institution-pro': ['Interaksi publik lembaga', 'Event, dokumen, form, search'],
  'institution-ops-lite': ['Satu modul operasional', 'Database + dashboard + status'],
  'institution-ops-standard': ['2–3 modul terhubung', 'Data, dokumen, laporan'],
  'institution-ops-pro': ['Workflow kompleks', 'Multi-role, approval, QR/payment'],
  'umkm-basic': ['Bisnis mudah ditemukan', 'Landing + WhatsApp, tanpa dashboard'],
  'umkm-standard': ['Profil usaha lebih proper', 'Multipage company profile'],
  'umkm-cms': ['Kelola produk & konten', 'CMS + admin dashboard'],
  'umkm-business-lite': ['Kelola lead/customer', 'Mulai masuk database'],
  'umkm-business': ['Kelola siklus order', 'Customer + order + invoice + status'],
  'umkm-business-pro': ['Kerja beberapa admin/staf', 'Notifikasi + dokumen + laporan'],
  'umkm-operational': ['Sistem kerja harian', 'Staff + transaksi + role + workflow'],
  'event-landing': ['Campaign event', 'Agenda, speaker, venue'],
  'event-cms': ['Panitia kelola konten', 'CMS agenda, speaker, sponsor'],
  'event-registration': ['Data peserta tersimpan', 'Form + database + confirmation'],
  'event-qr': ['Check-in di lokasi', 'QR unik + scanner + attendance'],
  'event-ticketing': ['Event berbayar end-to-end', 'Checkout + QRIS + ticket + scan'],
  'commerce-starter': ['Mulai jualan online', 'Storefront + cart + order'],
  'commerce-payment': ['Pembayaran otomatis', 'QRIS + status + invoice'],
  'commerce-business': ['Operasi toko online', 'Inventory + voucher + shipping + report'],
  'commerce-advanced': ['Retail lebih kompleks', 'Role + return + API + analytics'],
  'pos-lite': ['Kasir satu outlet', 'Produk + transaksi + stok dasar'],
  'pos-business': ['Kasir + inventory', 'Supplier + purchase + expense'],
  'pos-pro': ['Operasi multi-kasir', 'Role + stock movement + QRIS'],
  'booking-basic': ['Reservasi sederhana', 'Form + availability + status'],
  'booking-business': ['Kelola slot & kapasitas', 'Calendar + customer + notification'],
  'booking-pro': ['Banyak resource/staf', 'Allocation + rules + report'],
  'crm-lite': ['Pipeline sederhana', 'Lead + customer + status'],
  'crm-business': ['Tim sales aktif', 'Assignment + follow-up + quotation'],
  'crm-pro': ['Sales workflow custom', 'Automation + approval + integration'],
  'corporate-website': ['Corporate presence', 'CMS + services + project + news'],
  'corporate-professional': ['Konten corporate lebih dalam', 'Careers + newsroom + better UX'],
  'corporate-business': ['Website terhubung proses bisnis', 'Lead + request + document + quotation'],
  'corporate-ops-lite': ['1–2 workflow internal', 'Dashboard + role + tracking'],
  'corporate-ops-standard': ['3–5 modul operasional', 'Staff + transaksi + dokumen + workflow'],
  'corporate-ops-pro': ['Proses lintas fungsi', 'Approval + audit + detailed report'],
  'corporate-enterprise-ops': ['Operasi multi-branch', 'SLA + integration + security + scale'],
  'government-website': ['Portal informasi publik', 'CMS + berita + agenda + dokumen'],
  'government-professional': ['Tata kelola informasi publik', 'PPID + complaint + multi-admin'],
  'government-service': ['Aplikasi layanan masyarakat', 'Submission + tracking + staff workflow'],
  'government-integrated': ['Proses lintas unit', 'Approval + API + audit + report'],
  'government-enterprise': ['Platform publik strategis', 'Security + SLA + infra khusus'],
  'clinic-website': ['Profil klinik terkelola', 'Dokter + layanan + jadwal + CMS'],
  'clinic-booking': ['Appointment klinik', 'Jadwal dokter + booking + contact DB'],
  'clinic-management': ['Operasi klinik ringan', 'Patient + visit + billing + stock'],
  'healthcare-system': ['Multi-workflow healthcare', 'Advanced role + integration + security'],
  'hospital-enterprise': ['Platform rumah sakit', 'Multi-department + audit + SLA'],
  'custom-software': ['Aplikasi untuk satu problem', 'Database + dashboard + workflow'],
  'erp-lite': ['3–5 modul terintegrasi', 'Master data + role + approval + report'],
  'erp-business': ['5+ modul lintas departemen', 'Cross-module workflow + audit'],
  'saas-platform': ['Produk multi-customer', 'Tenant + subscription + super admin'],
  'marketplace': ['Buyer bertemu vendor', 'Listing + order + commission/payment'],
  'enterprise-platform': ['Sistem mission-critical', 'Multi-branch + audit + API + SLA'],
};

function priceCard(id, compact = false) {
  const item = byId[id];
  const [benefit, difference] = packageCopy[id] || [item.hasil, item.pembeda];
  return `<button class="price-card ${compact ? 'compact' : ''}" type="button" data-package="${id}">
    <span class="package-category">${item.kategori}</span>
    <h3>${item.nama}</h3>
    <strong>${item.harga}</strong>
    <div class="card-facts">
      <p><b>BENEFIT</b>${benefit}</p>
      <p><b>BEDA</b>${difference}</p>
    </div>
    <small>CONTOH · ${item.demo}</small>
    <i>DETAIL ↗</i>
  </button>`;
}

function priceGroup(title, subtitle, ids, className = '') {
  return `<section class="price-group ${className}"><header><div><span>${title}</span><p>${subtitle}</p></div><b>${ids.length} PAKET</b></header><div class="price-grid count-${ids.length}">${ids.map((id) => priceCard(id)).join('')}</div></section>`;
}

function standardSlide(number, title, subtitle, body, className = '') {
  return { className, html: `<div class="slide-title"><span>${number}</span><div><h1>${title}</h1><p>${subtitle}</p></div></div>${body}` };
}

const slides = [
  {
    dark: true,
    className: 'cover-slide',
    html: `<div class="cover-pricing"><span>FINAL INTERNAL MASTER · 2026</span><h1>HARGA.<br><em>BEDA.</em><br>CONTOH.</h1><p>Pricing Master Solivate Studio</p></div><div class="cover-range"><small>RANGE PRODUK</small><b>Rp149rb</b><i>→</i><b>Rp25jt+</b></div>`,
  },

  standardSlide('01', 'Cara membaca harga.', 'Semakin tinggi tier, semakin besar jenis masalah yang dapat diselesaikan.', `
    <div class="anchor-grid">
      <article><span>WEBSITE</span><strong>Rp299rb+</strong><p>Informasi & branding</p><small>CONTOH · Portfolio / company profile</small></article>
      <article><span>CMS</span><strong>Rp799rb+</strong><p>Kelola konten sendiri</p><small>CONTOH · Portfolio + dashboard</small></article>
      <article><span>BUSINESS</span><strong>Rp2,25jt+</strong><p>Kelola lead, customer, order</p><small>CONTOH · Laundry order system</small></article>
      <article><span>OPERATIONAL</span><strong>Rp4,99jt+</strong><p>Tim bekerja melalui sistem</p><small>CONTOH · Staff + workflow + report</small></article>
      <article><span>ENTERPRISE</span><strong>Rp10jt+</strong><p>Scale, audit, security, integration</p><small>CONTOH · ERP / SaaS / multi-branch</small></article>
    </div>`),

  standardSlide('02', 'Personal.', 'Branding → multipage → CMS → publication.', priceGroup('PERSONAL', 'Harga bertambah saat client mulai mengelola dan menerbitkan konten sendiri.', ['personal-basic','personal-standard','personal-cms','personal-blog'], 'full-height readable-grid')),

  standardSlide('03', 'Wedding.', 'Invitation → interaction → RSVP → QR → guest operations.', priceGroup('WEDDING', 'Harga bertambah saat undangan mulai menyimpan dan memproses data tamu.', ['wedding-basic','wedding-premium','wedding-rsvp','wedding-qr','wedding-pro'], 'full-height readable-grid')),

  standardSlide('04', 'Institution / Non-Government.', 'Presence → CMS → interaction → operations.', priceGroup('INSTITUTION', 'Website lembaga dan sistem operasional berada pada kelas berbeda.', ['institution-landing','institution-profile','institution-cms','institution-pro','institution-ops-lite','institution-ops-standard','institution-ops-pro'], 'full-height readable-grid')),

  standardSlide('05', 'UMKM.', 'Landing → multipage → CMS → lead → order → team → operations.', priceGroup('UMKM', 'Premium masih CMS. Business mulai mengelola data dan transaksi.', ['umkm-basic','umkm-standard','umkm-cms','umkm-business-lite','umkm-business','umkm-business-pro','umkm-operational'], 'full-height readable-grid')),

  standardSlide('06', 'Event.', 'Campaign → registration → QR → paid ticket.', priceGroup('EVENT', 'Harga bertambah ketika event mulai menyimpan peserta, check-in, dan menerima pembayaran.', ['event-landing','event-cms','event-registration','event-qr','event-ticketing'], 'full-height readable-grid')),

  standardSlide('07', 'E-Commerce.', 'Storefront → payment → commerce operations → advanced retail.', priceGroup('E-COMMERCE', 'Harga bertambah dari menerima order menjadi mengelola pembayaran, stok, dan retail operation.', ['commerce-starter','commerce-payment','commerce-business','commerce-advanced'], 'full-height readable-grid')),

  standardSlide('08', 'POS & Booking.', 'Transaksi kasir dan reservasi memakai pola operasi yang berbeda.', `<div class="dual-groups readable-dual">${priceGroup('POS', 'Kasir → inventory → multi-cashier', ['pos-lite','pos-business','pos-pro'])}${priceGroup('BOOKING', 'Reservation → slot → multi-resource', ['booking-basic','booking-business','booking-pro'])}</div>`),

  standardSlide('09', 'CRM.', 'Lead → team sales → automation.', priceGroup('CRM', 'Harga bertambah saat pipeline dipakai tim dan membutuhkan approval atau integrasi.', ['crm-lite','crm-business','crm-pro'], 'full-height readable-grid')),

  standardSlide('10', 'Corporate & Operational.', 'Presence → content depth → business function → operations.', priceGroup('CORPORATE', 'Corporate Business menghubungkan client. Operational menjadi alat kerja internal.', ['corporate-website','corporate-professional','corporate-business','corporate-ops-lite','corporate-ops-standard','corporate-ops-pro','corporate-enterprise-ops'], 'full-height readable-grid')),

  standardSlide('11', 'Government.', 'Information → public service → integrated system.', priceGroup('GOVERNMENT · FLOOR Rp5JT', 'Stakeholder, compliance, security, dan operational impact membentuk harga.', ['government-website','government-professional','government-service','government-integrated','government-enterprise'], 'full-height readable-grid')),

  standardSlide('12', 'Healthcare.', 'Presence → booking → clinic operations → healthcare system.', priceGroup('HEALTHCARE · SECURITY REVIEW', 'Data sensitif dan workflow kesehatan membutuhkan discovery lebih dalam.', ['clinic-website','clinic-booking','clinic-management','healthcare-system','hospital-enterprise'], 'full-height readable-grid')),

  standardSlide('13', 'Custom Software & Platforms.', 'Custom app → ERP / SaaS / Marketplace → Enterprise.', priceGroup('PRODUCT PLATFORM', 'Harga naik karena arsitektur, data, role, tenancy, vendor logic, dan scale.', ['custom-software','erp-lite','saas-platform','erp-business','marketplace','enterprise-platform'], 'full-height readable-grid')),

  standardSlide('14', 'Add-on utama.', 'Gunakan sebagai penambah scope. Jika capability berubah, upgrade paket.', `
    <div class="addon-price-grid">
      ${[['Additional page','Rp100-250rb','Halaman normal'],['Extra CMS type','Rp250-500rb','Schema + CRUD + media'],['Additional role','Rp300-750rb','Permission matrix'],['Approval workflow','Rp500rb-1,5jt','Multi-step approval'],['Payment gateway','Rp750rb-1,5jt','Webhook + payment status'],['WhatsApp / API','Rp500rb-1,5jt+','Provider terpisah'],['Shipping','Rp750rb-1,5jt+','Rate / AWB / tracking'],['QR + scanner','Rp500rb-1jt','Identity + check-in'],['Advanced report','Rp300rb-1jt+','Filter + aggregation + export'],['Multi-branch','Rp1jt+','Branch + role + report'],['External API','Rp500rb+','Tergantung API & testing'],['Data migration','Rp500rb+','Volume + cleaning + mapping'],['Urgent delivery','+20-50%','Reprioritization / overtime']].map(x=>`<article><span>${x[0]}</span><strong>${x[1]}</strong><small>${x[2]}</small></article>`).join('')}
    </div>
    <div class="upgrade-rule"><b>2–3 ADD-ON MENYAMAI TIER BERIKUTNYA?</b><span>UPGRADE PACKAGE / RE-SCOPE</span></div>`),

  standardSlide('15', 'Kenapa benchmark berubah?', 'Angka baru mengikuti capability yang sebenarnya dibawa produk.', `
    <div class="change-grid">
      ${[['Personal CMS','Rp499rb','Rp799rb','Dashboard + CMS'],['UMKM Business','Rp1,499jt','Rp2,99jt','Customer + order + invoice'],['Corporate CMS','Rp1,299jt','Rp2,5jt','Corporate scope & review'],['Government CMS','Rp1,999jt','Rp5jt','Government floor'],['Public Service','Rp3,999jt','Rp10jt','Submission + staff workflow'],['ERP Lite','Rp5,999jt','Rp10jt','3–5 integrated modules'],['SaaS','Rp7,999jt','Rp12,5jt','Tenant + account lifecycle'],['Enterprise','Custom','Rp25jt+ / Custom','Scale + security + SLA']].map(x=>`<article><span>${x[0]}</span><div><del>${x[1]}</del><i>→</i><strong>${x[2]}</strong></div><small>ALASAN · ${x[3]}</small></article>`).join('')}
    </div>`),

  standardSlide('16', 'Contoh menggambarkan proyek.', 'Mulai dari contoh kebutuhan, lalu tunjukkan paket dan alasan harganya.', `
    <div class="example-grid">
      ${[
        ['Laundry menerima order WA','UMKM Business','Rp2,99jt+','Customer → order → processing → ready → invoice','U05 · CleanFlow Laundry'],
        ['Seminar berbayar 300 peserta','Event Ticketing + QRIS','Rp3,499jt+','Checkout → QRIS → ticket → scan → report','E04 · Tech Conference Ticketing'],
        ['Tim sales 5 orang','CRM Business','Rp4jt+','Lead → assignment → follow-up → quotation → won/lost','CRM01 · Nexa Sales CRM'],
        ['Permohonan layanan warga','Digital Public Service','Rp10jt+','Submit → upload → verify → approve → tracking','GOV03 · e-Layanan'],
        ['Software untuk banyak perusahaan','SaaS Platform','Rp12,5jt+','Signup → workspace → users → subscription → super admin','SAAS01 · Flowdesk'],
        ['Procurement lintas divisi','Operational Pro','Rp10jt+','Request → approval → vendor → finance → audit','OPS01 · ProcureFlow'],
      ].map(x=>`<article><span>${x[0]}</span><h3>${x[1]}</h3><strong>${x[2]}</strong><p>${x[3]}</p><small>CONTOH · ${x[4]}</small></article>`).join('')}
    </div>`),

  {
    dark: true,
    className: 'closing-slide',
    html: `<div class="closing-price"><span>BENCHMARK MENENTUKAN TITIK AWAL</span><h1>Angka.<br><em>Alasan.</em><br>Contoh.</h1><button type="button" data-open-catalogue>BUKA 64 PAKET LENGKAP →</button></div><div class="closing-note"><b>DISCOVERY</b><p>menentukan scope dan penawaran final.</p></div>`,
  },
];

let current = 0;
let catalogueOpen = false;
let activeCategory = 'Semua';
let activePackage = null;

const chapterFor = (number) => chapters.find((item) => number >= item.from && number <= item.to) || chapters[0];

function renderChapters() {
  $('#chapters').innerHTML = chapters.map((chapter) => `<button type="button" data-slide="${chapter.from - 1}"><span>${chapter.id}</span>${chapter.label}</button>`).join('');
  document.querySelectorAll('#chapters [data-slide]').forEach((button) => button.addEventListener('click', () => renderSlide(Number(button.dataset.slide))));
}

function renderSlide(index, direction = 1) {
  current = Math.max(0, Math.min(slides.length - 1, index));
  const data = slides[current];
  const host = $('#slide');
  host.className = `slide ${data.dark ? 'is-dark' : ''} ${data.className || ''} ${direction < 0 ? 'from-left' : 'from-right'}`;
  host.innerHTML = `<div class="slide-inner">${data.html}</div>`;
  const chapter = chapterFor(current + 1);
  $('#chapter').textContent = `${chapter.id} · ${chapter.label}`;
  $('#counter').textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
  $('#progress').style.width = `${((current + 1) / slides.length) * 100}%`;
  $('#prev').disabled = current === 0;
  $('#next').disabled = current === slides.length - 1;
  document.body.classList.toggle('dark-slide-active', Boolean(data.dark));
  document.querySelectorAll('#chapters button').forEach((button) => button.classList.toggle('active', Number(button.dataset.slide) + 1 === chapter.from));
  history.replaceState(null, '', `#slide-${String(current + 1).padStart(2, '0')}`);
  bindSlideActions();
}

function bindSlideActions() {
  document.querySelectorAll('[data-package]').forEach((button) => button.addEventListener('click', () => openCatalogue(button.dataset.package)));
  document.querySelectorAll('[data-open-catalogue]').forEach((button) => button.addEventListener('click', () => openCatalogue()));
}

function categoryList() { return ['Semua', ...new Set(catalogue.map((item) => item.kategori))]; }
function renderFilters() {
  $('#catalogueFilters').innerHTML = categoryList().map((category) => `<button type="button" data-category="${category}" class="${activeCategory === category ? 'active' : ''}">${category}</button>`).join('');
  document.querySelectorAll('[data-category]').forEach((button) => button.addEventListener('click', () => { activeCategory = button.dataset.category; renderFilters(); renderCatalogue(); }));
}
function filteredCatalogue() {
  const query = $('#catalogueSearch').value.trim().toLowerCase();
  return catalogue.filter((item) => (activeCategory === 'Semua' || item.kategori === activeCategory) && (!query || [item.nama,item.kategori,item.harga,item.cocok,item.hasil,item.demo,item.pembeda,...item.termasuk].join(' ').toLowerCase().includes(query)));
}
function renderCatalogue() {
  const items = filteredCatalogue();
  $('#catalogueCount').textContent = `${items.length} paket ditemukan`;
  $('#catalogueGrid').innerHTML = items.length ? items.map((item) => `<button class="catalogue-card" type="button" data-catalogue-id="${item.id}"><span>${item.kategori}</span><h3>${item.nama}</h3><strong>${item.harga}</strong><p>${item.hasil}</p><small>${item.demo}</small><i>BUKA DETAIL ↗</i></button>`).join('') : `<div class="empty-state"><h3>Paket tidak ditemukan.</h3><p>Coba kata kunci atau kategori lain.</p></div>`;
  document.querySelectorAll('[data-catalogue-id]').forEach((button) => button.addEventListener('click', () => openDrawer(button.dataset.catalogueId)));
}
function openDrawer(id) {
  const item = byId[id]; if (!item) return;
  activePackage = item;
  $('#drawerContent').innerHTML = `<div class="drawer-hero"><span>${item.kategori}</span><h2>${item.nama}</h2><strong>${item.harga}</strong><p>${item.hasil}</p></div><div class="drawer-facts"><div><span>COCOK UNTUK</span><p>${item.cocok}</p></div><div><span>PEMBEDA UTAMA</span><p>${item.pembeda}</p></div></div><details open><summary>Benefit & capability <b>${item.termasuk.length}</b></summary><ul>${item.termasuk.map((feature) => `<li>${feature}</li>`).join('')}</ul></details><details><summary>Contoh proyek / demo</summary><div class="drawer-demo"><span>CONTOH</span><h3>${item.demo}</h3><p>Demo menggambarkan capability paket; scope final tetap mengikuti discovery.</p></div></details>${item.catatan ? `<details><summary>Catatan internal</summary><p class="drawer-note">${item.catatan}</p></details>` : ''}<div class="drawer-disclaimer"><b>Benchmark ≠ final quotation.</b><p>Harga final mengikuti scope, complexity, integration, timeline, support, dan biaya pihak ketiga.</p></div>`;
  $('#packageDrawer').classList.add('open'); $('#packageDrawer').setAttribute('aria-hidden','false'); $('#drawerBackdrop').classList.add('open');
}
function closeDrawer() { activePackage = null; $('#packageDrawer').classList.remove('open'); $('#packageDrawer').setAttribute('aria-hidden','true'); $('#drawerBackdrop').classList.remove('open'); }
function openCatalogue(id = null) { catalogueOpen = true; $('#catalogueOverlay').classList.add('open'); $('#catalogueOverlay').setAttribute('aria-hidden','false'); document.body.classList.add('catalogue-open'); renderFilters(); renderCatalogue(); if (id) openDrawer(id); }
function closeCatalogue() { closeDrawer(); catalogueOpen = false; $('#catalogueOverlay').classList.remove('open'); $('#catalogueOverlay').setAttribute('aria-hidden','true'); document.body.classList.remove('catalogue-open'); }
function go(delta) { if (!catalogueOpen) renderSlide(current + delta, delta); }

$('#prev').addEventListener('click', () => go(-1)); $('#next').addEventListener('click', () => go(1)); $('#goHome').addEventListener('click', () => renderSlide(0,-1));
$('#catalogueOpen').addEventListener('click', () => openCatalogue()); $('#catalogueClose').addEventListener('click', closeCatalogue); $('#drawerClose').addEventListener('click', closeDrawer); $('#drawerBackdrop').addEventListener('click', closeDrawer); $('#catalogueSearch').addEventListener('input', renderCatalogue);
$('#fullscreen').addEventListener('click', () => document.fullscreenElement ? document.exitFullscreen?.() : document.documentElement.requestFullscreen?.());
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') { if (activePackage) closeDrawer(); else if (catalogueOpen) closeCatalogue(); return; }
  if (catalogueOpen || ['INPUT','TEXTAREA'].includes(document.activeElement?.tagName)) return;
  if (['ArrowRight','PageDown',' ','Enter'].includes(event.key)) { event.preventDefault(); go(1); }
  if (['ArrowLeft','PageUp','Backspace'].includes(event.key)) { event.preventDefault(); go(-1); }
  if (event.key === 'Home') renderSlide(0,-1); if (event.key === 'End') renderSlide(slides.length-1,1); if (event.key.toLowerCase() === 'f') $('#fullscreen').click();
});

renderChapters();
const hash = location.hash.match(/slide-(\d+)/);
renderSlide(hash ? Number(hash[1]) - 1 : 0);
renderFilters(); renderCatalogue();
