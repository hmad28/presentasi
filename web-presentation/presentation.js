const $ = (q) => document.querySelector(q);

const chapterDefs = [
  { id: '01', label: 'KERANGKA HARGA', from: 1, to: 6 },
  { id: '02', label: 'KATALOG PRODUK', from: 7, to: 12 },
  { id: '03', label: 'PANDUAN SALES', from: 13, to: 15 },
  { id: '04', label: 'DEMO & PENUTUP', from: 16, to: 16 },
];

const infoCards = (items, cols = 3, selected = -1, cls = '') => `<div class="grid cols-${cols} ${cls}">${items.map((x, i) => `<article class="card ${i === selected ? 'selected' : ''}"><div class="card-inner"><span class="issue-no">${String(i + 1).padStart(2, '0')}</span><h3>${x[0]}</h3><p class="outcome">${x[1]}</p></div></article>`).join('')}</div>`;

const flowHTML = (steps) => `<div class="capability-flow" style="--count:${steps.length}">${steps.map((s, i) => `<div class="cap-step"><small>${String(i + 1).padStart(2, '0')}</small>${s}</div>`).join('')}</div>`;

const base = (eyebrow, title, sub = '', body = '', dark = false, extra = '') => ({
  dark,
  html: `<p class="eyebrow">${eyebrow}</p><h1 class="headline ${extra}">${title}</h1>${sub ? `<p class="subhead">${sub}</p>` : ''}${body}`,
});

const priceRows = (items) => `<div class="price-rows">${items.map((x, i) => `<div class="price-row ${i === items.length - 1 ? 'last' : ''}"><div><b>${x[0]}</b><p>${x[2]}</p></div><strong>${x[1]}</strong></div>`).join('')}</div>`;

const tierCard = (title, items, note = '', selected = false) => `<article class="card tier-card ${selected ? 'selected' : ''}"><div class="card-inner"><div class="tier-card-head"><h3>${title}</h3>${note ? `<span class="mini-chip">${note}</span>` : ''}</div>${priceRows(items)}</div></article>`;

const slides = [
  {
    dark: true,
    html: `<div class="cover-content"><div class="cover"><span class="label-chip lime">MASTER INTERNAL 2026</span><h1 class="headline">PRICING<br>MASTER</h1><p class="subhead">Katalog Layanan • Benchmark Harga • Cakupan • Demo • Kerangka Penawaran</p><p class="cover-description">Standar internal untuk menentukan posisi layanan, benchmark harga, cakupan, dan penawaran proyek Solivate Studio.</p><div class="cover-highlights"><div><span>BUSINESS / CORPORATE</span><b>Floor &gt; Rp2 Juta</b></div><div><span>GOVERNMENT</span><b>Floor ≥ Rp5 Juta</b></div><div><span>ERP / SAAS / MARKETPLACE</span><b>Rp10–15 Juta+</b></div></div></div><div class="orbital"><div class="core">SOLIVATE<br>2026</div><b></b><b></b><b></b><b></b></div></div>`,
  },

  base('KENAPA DIREVISI?', 'Pricelist lama belum cukup untuk menentukan harga proyek.', 'Enam masalah utama yang diselesaikan oleh Pricing Master Final 2026.', infoCards([
    ['Tier Kurang Jelas', 'Perbedaan paket belum terasa sebanding dengan perbedaan harga.'],
    ['Cakupan Terlalu Berat', 'Paket murah sudah membawa CMS, dashboard, database, workflow, atau support besar.'],
    ['Posisi Harga Kurang Tepat', 'Business, Corporate, Government, ERP, SaaS, dan Marketplace masih terlalu rendah.'],
    ['Belum Ada Kerangka Harga', 'Angka paket mudah dianggap fixed tanpa melihat kebutuhan klien.'],
    ['Demo Belum Standar', 'Sales belum punya demo yang menunjukkan perbedaan tiap tier.'],
    ['Publik & Internal Tercampur', 'Klien tidak perlu melihat seluruh logika harga internal.'],
  ], 3, 3, 'problem-grid')),

  base('PERUBAHAN UTAMA', 'Dari “pricelist” menjadi kerangka harga.', 'Pricing Master adalah sistem pengambilan keputusan, bukan tabel harga yang disalin ke klien.', `<div class="grid cols-3 pillar-grid"><article class="card"><div class="card-inner"><span class="label-chip">01</span><h3>Katalog Produk</h3><p class="outcome">Menjelaskan apa yang Solivate jual, siapa targetnya, dan capability setiap tier.</p></div></article><article class="card selected"><div class="card-inner"><span class="label-chip lime">02</span><h3>Benchmark Harga</h3><p class="outcome">Memberikan anchor harga untuk cakupan yang representatif.</p></div></article><article class="card dark-card"><div class="card-inner"><span class="label-chip lime">03</span><h3>Kerangka Penawaran</h3><p class="outcome">Menentukan harga sebenarnya berdasarkan kebutuhan proyek.</p></div></article></div><div class="benchmark-statement"><strong>BENCHMARK</strong><span>≠</span><strong>PENAWARAN FINAL</strong><p>Dua klien pada paket yang sama dapat menerima harga berbeda jika cakupan, role, workflow, integrasi, data, timeline, risiko, atau dukungannya berbeda.</p></div>`),

  {
    dark: true,
    html: `<p class="eyebrow">CARA MEMBACA LEVEL LAYANAN</p><h1 class="headline">Capability sistem berubah di setiap tier.</h1><p class="subhead">Upgrade paket bukan sekadar mendapat lebih banyak halaman.</p><div class="ladder concise-ladder">${[
      ['WEBSITE', 'Rp299rb+', 'Informasi & branding'],
      ['CMS', 'Rp799rb+', 'Klien mengelola konten'],
      ['BUSINESS', 'Rp2,25jt+', 'Lead, customer, atau order masuk database'],
      ['OPERATIONAL', 'Rp4,99jt+', 'Role, workflow, transaksi, dokumen, laporan'],
      ['ENTERPRISE', 'Rp10jt+', 'Multi-branch, audit, integrasi, security, SLA'],
    ].map((x, i) => `<div class="ladder-item" style="height:${38 + i * 10}%"><span>0${i + 1}</span><h3>${x[0]}</h3><b>${x[1]}</b><p>${x[2]}</p></div>`).join('')}</div><p class="dark-callout">Informasi → CMS → Database → Workflow → Multi-role → Operasi Enterprise</p>`,
  },

  base('KERANGKA PENENTUAN HARGA', 'Jadi, harga final ditentukan dari apa?', 'Formula adalah alat bantu estimasi—bukan kalkulator otomatis.', `<div class="pricing-formula"><div class="formula-result">PENAWARAN<br>FINAL</div><div class="formula-parts"><div><span>01</span><b>Benchmark Paket</b><small>Anchor capability</small></div><div><span>02</span><b>± Penyesuaian Cakupan</b><small>Lebih kecil / lebih besar</small></div><div><span>03</span><b>Fitur & Tambahan</b><small>Capability di luar baseline</small></div><div><span>04</span><b>Kompleksitas</b><small>Role, workflow, data</small></div><div><span>05</span><b>Integrasi</b><small>API dan provider</small></div><div><span>06</span><b>Timeline & Urgensi</b><small>Reprioritas kerja</small></div><div><span>07</span><b>Dukungan / SLA</b><small>Operational commitment</small></div><div><span>08</span><b>Biaya Pihak Ketiga</b><small>Provider aktual</small></div></div></div><div class="pricing-warning"><b>Bukan karena klien “terlihat besar”.</b><span>Penyesuaian wajib punya dasar: user/load, stakeholder, workflow, security, compliance, SLA, integrasi, atau dampak operasional.</span></div>`),

  base('ALUR PENAWARAN', 'Dari klien masuk sampai harga dikunci.', 'Delapan tahap mencegah proyek melebar tanpa kontrol.', `<div class="quotation-flow">${[
    ['Discovery', 'Kebutuhan, objective, user, workflow, deadline.'],
    ['Pilih Package Anchor', 'Cari paket yang paling mendekati.'],
    ['Baseline Scope', 'Tentukan included dan excluded.'],
    ['Scale & Complexity', 'Role, data, branch, security, stakeholder.'],
    ['Gap & Add-on', 'Payment, WhatsApp, API, AI, migration, report.'],
    ['Review Risiko', 'Urgensi, deployment, compliance, vendor.'],
    ['Finalisasi Penawaran', 'Scope, deliverable, timeline, payment, support.'],
    ['Freeze Scope', 'Kebutuhan baru menjadi change request.'],
  ].map((x, i) => `<div><span>${String(i + 1).padStart(2, '0')}</span><b>${x[0]}</b><p>${x[1]}</p></div>`).join('')}</div>`),

  base('PERSONAL, NON-PROFIT & UMKM', 'Entry website → business system.', 'Yang perlu dipahami adalah perubahan capability, bukan daftar fitur panjang.', `<div class="catalogue-split"><article class="catalogue-panel"><div class="panel-head"><div><span class="label-chip">PERSONAL</span><h3>Presensi → Publikasi</h3></div></div>${priceRows([
    ['Basic', 'Rp299rb', 'Landing portfolio sederhana.'],
    ['Standard', 'Rp499rb', 'Personal branding multipage.'],
    ['Premium + CMS', 'Rp799rb', 'Dashboard untuk kelola portfolio/content.'],
    ['Blog Pro', 'Rp999rb+', 'Publikasi, article CMS, search, dan SEO.'],
  ])}</article><article class="catalogue-panel selected-panel"><div class="panel-head"><div><span class="label-chip lime">UMKM</span><h3>Presensi → Operasi Internal</h3></div></div>${priceRows([
    ['Basic', 'Rp499rb', 'Landing bisnis.'],
    ['Standard', 'Rp749rb', 'Multipage company profile.'],
    ['Premium + CMS', 'Rp999rb', 'Manajemen produk dan konten.'],
    ['Business Lite', 'Rp2,25jt+', 'Database lead/customer.'],
    ['Business', 'Rp2,99jt+', 'Customer, order, invoice, dan status.'],
    ['Business Pro', 'Rp3,99jt+', 'Multi-admin, notifikasi, dokumen, laporan.'],
    ['Operational', 'Rp4,99jt+', 'Staf, transaksi, workflow, role, reporting.'],
  ])}</article></div><div class="three-key-differences"><span><b>UMKM Premium</b>Website dengan CMS</span><span><b>UMKM Business</b>Business system</span><span><b>UMKM Operational</b>Internal operational software</span></div>`),

  base('EVENT & E-COMMERCE', 'Dari campaign menuju transaksi.', 'Database, QR, dan pembayaran mengubah kelas produk secara nyata.', `<div class="catalogue-split equal-panels"><article class="catalogue-panel"><div class="panel-head"><div><span class="label-chip">EVENT</span><h3>Landing → Database → QR → Commerce</h3></div></div>${priceRows([
    ['Landing', 'Rp749rb+', 'Campaign, agenda, speaker, venue.'],
    ['Event + CMS', 'Rp999rb+', 'Panitia mengelola konten sendiri.'],
    ['Registration', 'Rp1,499jt+', 'Database peserta.'],
    ['Registration + QR', 'Rp2,499jt+', 'QR unik, scanner, dan attendance.'],
    ['Ticketing + QRIS', 'Rp3,499jt+', 'Checkout, payment, tiket, QR, laporan.'],
  ])}</article><article class="catalogue-panel selected-panel"><div class="panel-head"><div><span class="label-chip lime">E-COMMERCE</span><h3>Storefront → Operasi Retail</h3></div></div>${priceRows([
    ['Starter', 'Rp2,499jt+', 'Storefront, cart, checkout, order.'],
    ['Payment', 'Rp3,499jt+', 'Siklus pembayaran QRIS otomatis.'],
    ['Business', 'Rp4,999jt+', 'Inventory, voucher, customer, shipping, report.'],
    ['Advanced', 'Rp7,5jt+', 'Role, inventory, promo, return, API.'],
  ])}<div class="panel-warning">Multi-vendor bukan E-Commerce Advanced → masuk Marketplace.</div></article></div>`),

  base('POS • BOOKING • CRM', 'Tiga produk untuk tiga jenis operasi.', 'Pilih berdasarkan pekerjaan utama yang dilakukan pengguna setiap hari.', `<div class="grid cols-3 operation-cards">${[
    ['POS', 'KASIR & STOK', [['Lite', 'Rp2,25jt+', 'Kasir, produk, transaksi, stok dasar.'], ['Business', 'Rp3,5jt+', 'Inventory, supplier, purchase, expense, customer.'], ['Pro', 'Rp5jt+', 'Multi-cashier, role, stock movement, payment/report.']]],
    ['BOOKING', 'JADWAL & RESOURCE', [['Basic', 'Rp1,5jt+', 'Reservasi, availability, status.'], ['Business', 'Rp2,5jt+', 'Calendar, slot, customer, notifikasi/payment.'], ['Pro', 'Rp4jt+', 'Multi-resource, staf, ruang, allocation, rules.']]],
    ['CRM', 'PIPELINE SALES', [['Lite', 'Rp2,5jt+', 'Lead, customer, pipeline.'], ['Business', 'Rp4jt+', 'Assignment, follow-up, quotation, activity.'], ['Pro', 'Rp6jt+', 'Automation, approval, integrasi, laporan lanjutan.']]],
  ].map((x, i) => `<article class="card tier-card ${i === 2 ? 'selected' : ''}"><div class="card-inner"><div class="tier-card-head"><div><span class="card-kicker">${x[1]}</span><h3>${x[0]}</h3></div><span class="issue-no">0${i + 1}</span></div>${priceRows(x[2])}</div></article>`).join('')}</div>`),

  base('CORPORATE & OPERATIONAL', 'Business / Corporate floor > Rp2 juta.', 'Website yang mendukung bisnis berbeda dengan software yang menjadi alat kerja internal.', `<div class="catalogue-split equal-panels corporate-layout"><article class="catalogue-panel"><div class="panel-head"><div><span class="label-chip">CORPORATE</span><h3>Presensi → Fungsi Bisnis</h3></div></div>${priceRows([
    ['Corporate Website', 'Rp2,5jt+', 'CMS, services, project, team, news, lead form.'],
    ['Professional', 'Rp3,5jt+', 'Careers, newsroom, arsitektur konten dan UX.'],
    ['Corporate Business', 'Rp5jt+', 'Database, request, quotation, dokumen, workflow.'],
  ])}<p class="panel-definition"><b>Corporate Business</b> menghubungkan website dengan proses bisnis.</p></article><article class="catalogue-panel selected-panel"><div class="panel-head"><div><span class="label-chip lime">INTERNAL OPERATIONAL</span><h3>Workflow → Enterprise Operation</h3></div></div>${priceRows([
    ['Operational Lite', 'Rp5jt+', '1–2 workflow.'],
    ['Operational Standard', 'Rp7,5jt+', '3–5 modul.'],
    ['Operational Pro', 'Rp10jt+', 'Lintas proses, approval, audit, laporan rinci.'],
    ['Enterprise Operational', 'Rp15jt+ / Custom', 'Multi-branch, integrasi, security, SLA.'],
  ])}<p class="panel-definition"><b>Operational System</b> menjadi alat kerja internal perusahaan.</p></article></div>`),

  base('GOVERNMENT & HEALTHCARE', 'Dua sektor dengan requirement dan risiko khusus.', 'Harga final wajib mempertimbangkan stakeholder, compliance, keamanan, dan dampak operasional.', `<div class="catalogue-split equal-panels risk-sectors"><article class="catalogue-panel government-panel"><div class="panel-head"><div><span class="label-chip">GOVERNMENT • FLOOR Rp5JT</span><h3>Informasi Publik → Layanan</h3></div></div>${priceRows([
    ['Government Website', 'Rp5jt+', 'Portal informasi dan CMS.'],
    ['Professional', 'Rp7,5jt+', 'PPID, dokumen, complaint, multi-admin.'],
    ['Digital Public Service', 'Rp10jt+', 'Submission, dokumen, tracking, workflow staf.'],
    ['Integrated', 'Rp15jt+', 'Multi-unit, approval, integrasi, audit.'],
    ['Enterprise', 'Custom', 'Sistem publik strategis.'],
  ])}<p class="sector-note">Guardrail mencakup pengadaan, accessibility, compliance, security, support, dan stakeholder.</p></article><article class="catalogue-panel healthcare-panel"><div class="panel-head"><div><span class="label-chip risk-chip">HEALTHCARE</span><h3>Presensi Klinik → Sistem Kesehatan</h3></div></div>${priceRows([
    ['Clinic Website', 'Rp2,5jt+', 'Profil, dokter, layanan, CMS.'],
    ['Clinic Booking', 'Rp3,5jt+', 'Jadwal dan appointment.'],
    ['Clinic Management', 'Rp7,5jt+', 'Pasien, visit, billing, stok, laporan.'],
    ['Healthcare System', 'Rp15jt+', 'Multi-workflow, integration, security.'],
    ['Hospital / Enterprise', 'Custom', 'Multi-department dan SLA.'],
  ])}<p class="sector-note risk">Rekam medis, SATUSEHAT/BPJS, lab, farmasi lanjutan, atau data sensitif → discovery + security review + custom quotation.</p></article></div>`),

  {
    dark: true,
    html: `<p class="eyebrow">CUSTOM SOFTWARE • ERP • SAAS • MARKETPLACE</p><h1 class="headline">Ini bukan “website dengan banyak fitur”.</h1><p class="subhead">Arsitektur, model data, authentication, tenancy/vendor logic, QA, security, dan maintainability-nya berbeda kelas.</p><div class="premium-product-grid">${[
      ['CUSTOM SOFTWARE', 'Rp5jt+', 'Satu aplikasi khusus', 'Database • dashboard • workflow'],
      ['ERP LITE', 'Rp10jt+', '3–5 modul terintegrasi', 'Master data • role • approval • report'],
      ['ERP BUSINESS', 'Rp15jt+', '5+ modul lintas proses', 'Cross-module • approval • reporting'],
      ['SAAS PLATFORM', 'Rp12,5jt+', 'Produk multi-account', 'Auth • tenant • subscription • super admin'],
      ['MARKETPLACE', 'Rp15jt+', 'Buyer + vendor', 'Listing • order • commission/payment'],
      ['ENTERPRISE PLATFORM', 'Rp25jt+ / CUSTOM', 'Mission-critical platform', 'Multi-branch • audit • API • security • SLA'],
    ].map((x, i) => `<article class="premium-product ${i === 5 ? 'featured' : ''}"><span>${x[0]}</span><strong>${x[1]}</strong><h3>${x[2]}</h3><p>${x[3]}</p></article>`).join('')}</div><div class="architecture-strip"><span>ARCHITECTURE</span><span>AUTHENTICATION</span><span>DATA MODEL</span><span>GOVERNANCE</span><span>MAINTAINABILITY</span></div>`,
  },

  base('TAMBAHAN & PENYESUAIAN CAKUPAN', 'Tambahkan capability—bukan menyembunyikan proyek besar.', 'Angka berikut adalah guidance internal untuk estimasi awal, bukan harga publik tetap.', `<div class="addon-compact-grid">${[
    ['Halaman Tambahan', 'Rp100–250rb'], ['Jenis CMS Tambahan', 'Rp250–500rb'], ['Role Tambahan', 'Rp300–750rb'], ['Approval Workflow', 'Rp500rb–1,5jt'], ['Payment Gateway', 'Rp750rb–1,5jt'], ['WhatsApp/API', 'Rp500rb–1,5jt+'], ['Shipping', 'Rp750rb–1,5jt+'], ['QR + Scanner', 'Rp500rb–1jt'], ['Multi-branch', 'Rp1jt+'], ['API Eksternal', 'Rp500rb+'], ['Urgent Delivery', '+20–50%'],
  ].map((x, i) => `<div class="addon-chip ${i === 10 ? 'urgent' : ''}"><span>${x[0]}</span><b>${x[1]}</b></div>`).join('')}</div><div class="upgrade-warning"><div><span>PERINGATAN</span><h3>Add-on ≠ cara membuat paket murah menjadi proyek besar.</h3></div><div><p>Jika 2–3 add-on sudah setara tier berikutnya:</p><b>UPGRADE PACKAGE / RE-SCOPE</b><p>Multi-vendor, multi-tenant, multi-branch, regulated, atau mission-critical:</p><b>PINDAH KE KATEGORI YANG TEPAT</b></div></div>`),

  {
    dark: true,
    html: `<p class="eyebrow">PANDUAN KEPUTUSAN SALES</p><h1 class="headline medium">Klien sebenarnya membutuhkan apa?</h1><div class="sales-map">${[
      ['Tampil online?', 'Website / Landing'], ['Edit konten sendiri?', 'CMS'], ['Simpan lead/customer/order?', 'Business'], ['Dipakai staf setiap hari?', 'Operational'], ['Produk/tiket + payment?', 'E-Commerce / Event'], ['Kasir & stok?', 'POS'], ['Calendar / reservasi?', 'Booking'], ['Pipeline sales?', 'CRM'], ['Beberapa modul/departemen?', 'ERP'], ['Banyak organisasi memakai software?', 'SaaS'], ['Buyer + vendor?', 'Marketplace'], ['Klien pemerintah?', 'Government Pricing'],
    ].map((x) => `<div><span>${x[0]}</span><b>→ ${x[1]}</b></div>`).join('')}<div class="sales-map-final"><span>Tidak cocok / berisiko tinggi?</span><b>→ CUSTOM DISCOVERY</b></div></div>`,
  },

  base('PERUBAHAN HARGA UTAMA', 'Bukan asal menaikkan harga.', 'Benchmark baru menyelaraskan cakupan dan capability dengan posisi produk.', `<div class="price-change-table"><div class="change-head"><span>PAKET</span><span>LAMA</span><span>BARU</span><span>ALASAN UTAMA</span></div>${[
    ['Personal CMS', 'Rp499rb', 'Rp799rb', 'CMS adalah capability upgrade.'],
    ['UMKM Business', 'Rp1,499jt', 'Rp2,99jt', 'Database, order, invoice, workflow.'],
    ['Corporate CMS', 'Rp1,299jt', 'Rp2,5jt', 'Positioning dan review corporate.'],
    ['Government CMS', 'Rp1,999jt', 'Rp5jt', 'Guardrail sektor pemerintah.'],
    ['Public Service', 'Rp3,999jt', 'Rp10jt', 'Aplikasi layanan dan staff workflow.'],
    ['ERP Lite', 'Rp5,999jt', 'Rp10jt', 'Beberapa modul terintegrasi.'],
    ['SaaS', 'Rp7,999jt', 'Rp12,5jt', 'Tenant, account, subscription, admin.'],
    ['Enterprise', 'Custom', 'Rp25jt+ / Custom', 'Ekspektasi entry enterprise.'],
  ].map((x, i) => `<div class="change-row ${i === 7 ? 'featured' : ''}"><b>${x[0]}</b><span>${x[1]}</span><strong>${x[2]}</strong><p>${x[3]}</p></div>`).join('')}</div>`),

  {
    dark: true,
    html: `<p class="eyebrow">DEMO STRATEGY & NEXT ACTION</p><h1 class="headline">Tunjukkan produk. Jangan hanya menjanjikan capability.</h1><p class="subhead">P0 harus tersedia lebih dulu karena mewakili kebutuhan dan tier yang paling sering ditawarkan.</p><div class="demo-closing-layout"><div class="demo-grid">${[
      ['P01', 'Personal Portfolio', 'Personal Basic'], ['U01', 'Kopi Rona', 'UMKM Basic'], ['U04', 'LeadDesk', 'Business Lite'], ['E01', 'Tech Summit', 'Event Landing'], ['E04', 'Event Ticketing', 'Ticketing + QRIS'], ['C02', 'Lunara Pay', 'E-Commerce Payment'], ['CRM01', 'Nexa Sales CRM', 'CRM'], ['COR01', 'Nexa Corporate', 'Corporate Website'], ['OPS01', 'ProcureFlow', 'Operational System'],
    ].map((x, i) => `<div class="demo-item ${i === 8 ? 'featured' : ''}"><span>${x[0]}</span><b>${x[1]}</b><small>${x[2]}</small></div>`).join('')}</div><div class="closing-message"><span class="label-chip lime">PRINSIP FINAL</span><h2>Harga tidak dibuat kaku.<br>Harga dibuat konsisten.</h2><p>Benchmark menentukan titik awal.<br>Discovery menentukan cakupan.<br>Cakupan menentukan penawaran.</p><b>Rasional • Scalable • Mudah Dijelaskan</b></div></div>`,
  },
];

if (slides.length !== 16) console.warn(`Seharusnya 16 slide, ditemukan ${slides.length}`);

let current = Math.max(0, Math.min(slides.length - 1, Number(location.hash.replace('#slide-', '')) - 1 || 0));
let toastTimer;

function chapterAt(index) {
  const number = index + 1;
  return chapterDefs.find((chapter) => number >= chapter.from && number <= chapter.to) || chapterDefs.at(-1);
}

function showToast(text) {
  const el = $('#toast');
  el.textContent = text;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 900);
}

function render() {
  const slide = slides[current];
  const el = $('#slide');
  el.className = `slide ${slide.dark ? 'dark' : ''}`;
  el.innerHTML = slide.html;
  document.body.classList.toggle('is-dark', !!slide.dark);
  $('#counter').textContent = `${String(current + 1).padStart(2, '0')} / ${slides.length}`;
  $('#progress').style.width = `${((current + 1) / slides.length) * 100}%`;
  const chapter = chapterAt(current);
  $('#chapter').textContent = `${chapter.id} / ${chapter.label}`;
  [...$('#chapters').children].forEach((node, i) => node.classList.toggle('active', chapterDefs[i].id === chapter.id));
  $('#prev').disabled = current === 0;
  $('#next').disabled = current === slides.length - 1;
  history.replaceState(null, '', `#slide-${String(current + 1).padStart(2, '0')}`);
  requestAnimationFrame(() => {
    el.classList.add('entering');
    setTimeout(() => el.classList.remove('entering'), 620);
  });
}

function next() {
  if (current < slides.length - 1) { current += 1; render(); }
  else showToast('AKHIR PRESENTASI');
}

function prev() {
  if (current > 0) { current -= 1; render(); }
  else showToast('AWAL PRESENTASI');
}

chapterDefs.forEach((chapter) => {
  const node = document.createElement('span');
  node.textContent = `${chapter.id} ${chapter.label}`;
  $('#chapters').appendChild(node);
});

$('#prev').addEventListener('click', prev);
$('#next').addEventListener('click', next);

document.addEventListener('keydown', (event) => {
  if (['ArrowRight', 'PageDown', ' ', 'Enter'].includes(event.key)) { event.preventDefault(); next(); }
  if (['ArrowLeft', 'PageUp', 'Backspace'].includes(event.key)) { event.preventDefault(); prev(); }
  if (event.key.toLowerCase() === 'f') $('#fullscreen').click();
  if (event.key === 'Home') { current = 0; render(); }
  if (event.key === 'End') { current = slides.length - 1; render(); }
});

$('#fullscreen').addEventListener('click', async () => {
  if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
  else await document.exitFullscreen();
});

render();
