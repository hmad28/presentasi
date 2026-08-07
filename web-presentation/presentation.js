const $ = (query) => document.querySelector(query);
const catalogue = window.SOLIVATE_CATALOGUE || [];

const chapters = [
  { id: '01', label: 'DASAR', from: 1, to: 9 },
  { id: '02', label: 'PRODUK', from: 10, to: 18 },
  { id: '03', label: 'SALES', from: 19, to: 22 },
  { id: '04', label: 'PENUTUP', from: 23, to: 23 },
];

const icon = (name) => `<span class="line-icon" aria-hidden="true">${name}</span>`;
const packageButton = (id, title, price, copy) => `
  <button class="package-line" type="button" data-package="${id}">
    <span><b>${title}</b><small>${copy}</small></span>
    <strong>${price}</strong>
    <i>DETAIL ↗</i>
  </button>`;

const slide = (eyebrow, title, lead, content, options = {}) => ({
  dark: Boolean(options.dark),
  className: options.className || '',
  html: `
    <div class="slide-heading">
      <p class="eyebrow">${eyebrow}</p>
      <h1>${title}</h1>
      ${lead ? `<p class="lead">${lead}</p>` : ''}
    </div>
    ${content}`,
});

const slides = [
  {
    dark: true,
    className: 'cover-slide',
    html: `
      <div class="cover-copy">
        <span class="status-pill">FINAL · INTERNAL · 2026</span>
        <p class="cover-brand">SOLIVATE STUDIO</p>
        <h1>Pricing<br><em>Master.</em></h1>
        <p class="cover-lead">Satu sistem untuk memahami produk, menjaga scope, dan menyusun penawaran yang rasional.</p>
        <div class="cover-meta">
          <span>Service Catalogue</span><span>Pricing Benchmark</span><span>Quotation Framework</span>
        </div>
      </div>
      <div class="cover-mark" aria-hidden="true"><span>25</span><span>—</span><span>26</span></div>`,
  },

  slide('01 · TUJUAN', 'Master ini bukan daftar harga.', 'Ia adalah bahasa bersama agar founder, sales, estimator, dan delivery mengambil keputusan dari dasar yang sama.', `
    <div class="statement-layout">
      <div class="statement-old"><span>CARA LAMA</span><h2>Pilih paket.<br>Lihat fitur.<br>Sebut harga.</h2></div>
      <div class="statement-arrow">→</div>
      <div class="statement-new"><span>CARA 2026</span><h2>Pahami kebutuhan.<br>Pilih capability.<br>Kunci scope.</h2></div>
    </div>
    <p class="bottom-note"><b>Tujuannya:</b> harga konsisten, mudah dijelaskan, dan tetap fleksibel terhadap kebutuhan proyek.</p>`),

  slide('02 · MASALAH', 'Kenapa pricing perlu dirombak?', 'Bukan semata karena harga lama terlalu rendah. Struktur lama belum membedakan jenis pekerjaan yang sebenarnya.', `
    <div class="reason-list">
      <article><span>01</span><div><h3>Tier kabur</h3><p>Kenaikan harga belum terasa sebagai kenaikan capability.</p></div></article>
      <article><span>02</span><div><h3>Scope terlalu berat</h3><p>CMS, database, dashboard, dan workflow masuk ke paket yang terlalu murah.</p></div></article>
      <article><span>03</span><div><h3>Produk software dianggap website</h3><p>Business, Government, ERP, SaaS, dan Marketplace belum diposisikan sesuai kelasnya.</p></div></article>
      <article><span>04</span><div><h3>Harga dianggap fixed</h3><p>Padahal role, data, integrasi, timeline, dan support bisa sangat berbeda.</p></div></article>
      <article><span>05</span><div><h3>Sales belum punya peta</h3><p>Belum ada anchor paket, demo, dan aturan upgrade yang seragam.</p></div></article>
      <article><span>06</span><div><h3>Informasi internal tercampur</h3><p>Klien dan tim internal membutuhkan kedalaman informasi yang berbeda.</p></div></article>
    </div>`),

  slide('03 · SISTEM BARU', 'Tiga lapisan. Satu keputusan.', 'Setiap lapisan menjawab pertanyaan yang berbeda, tetapi semuanya mengarah ke penawaran yang tepat.', `
    <div class="three-layers">
      <article><span>01</span><p>APA YANG DIJUAL?</p><h2>Katalog<br>Produk</h2><small>Target, outcome, capability, demo, dan upgrade path.</small></article>
      <article class="accent"><span>02</span><p>DI MANA TITIK AWALNYA?</p><h2>Benchmark<br>Harga</h2><small>Anchor harga untuk scope yang representatif.</small></article>
      <article class="ink"><span>03</span><p>BERAPA HARGA SEBENARNYA?</p><h2>Kerangka<br>Penawaran</h2><small>Scope, risiko, integrasi, timeline, dan support.</small></article>
    </div>`),

  slide('04 · CAPABILITY', 'Yang naik bukan jumlah fitur. Yang berubah adalah kemampuan sistem.', 'Inilah cara paling sederhana membaca seluruh katalog Solivate.', `
    <div class="capability-track">
      <article><span>01</span><h3>WEBSITE</h3><b>Rp299rb+</b><p>Menyampaikan informasi dan membangun kepercayaan.</p></article>
      <article><span>02</span><h3>CMS</h3><b>Rp799rb+</b><p>Klien mengelola konten sendiri.</p></article>
      <article><span>03</span><h3>BUSINESS</h3><b>Rp2,25jt+</b><p>Lead, customer, order, atau transaksi masuk database.</p></article>
      <article><span>04</span><h3>OPERATIONAL</h3><b>Rp4,99jt+</b><p>Tim bekerja lewat role, workflow, dokumen, dan laporan.</p></article>
      <article><span>05</span><h3>ENTERPRISE</h3><b>Rp10jt+</b><p>Scale, governance, security, audit, dan integrasi.</p></article>
    </div>
    <div class="capability-caption"><span>INFORMASI</span><i></i><span>KONTEN</span><i></i><span>DATA</span><i></i><span>OPERASI</span><i></i><span>SKALA</span></div>`, { dark: true }),

  slide('05 · BENCHMARK', 'Benchmark bukan penawaran final.', 'Satu nama paket dapat menghasilkan harga berbeda ketika beban kerja dan risikonya berbeda.', `
    <div class="equation-hero">
      <div><span>TITIK AWAL</span><strong>Benchmark</strong><small>Scope representatif</small></div>
      <b>≠</b>
      <div><span>HASIL DISCOVERY</span><strong>Final Quote</strong><small>Scope proyek aktual</small></div>
    </div>
    <div class="definition-strip">
      <p><b>Category floor</b><span>Batas internal agar positioning tidak jatuh.</span></p>
      <p><b>Add-on</b><span>Capability tambahan di luar baseline.</span></p>
      <p><b>Change request</b><span>Perubahan setelah scope dikunci.</span></p>
    </div>`),

  slide('06 · PRICING ENGINE', 'Harga final dibangun, bukan ditebak.', 'Formula ini adalah checklist penilaian. Bukan kalkulator otomatis dan bukan markup berdasarkan ukuran nama klien.', `
    <div class="formula-board">
      <div class="formula-start"><small>ANCHOR</small><strong>Benchmark<br>Paket</strong></div>
      <div class="formula-plus">+</div>
      <div class="formula-grid">
        <span>Cakupan</span><span>Fitur / Add-on</span><span>Kompleksitas</span><span>Integrasi</span>
        <span>Urgensi</span><span>Support / SLA</span><span>Biaya pihak ketiga</span><span>Risiko delivery</span>
      </div>
      <div class="formula-equal">=</div>
      <div class="formula-result"><small>OUTPUT</small><strong>Final<br>Quotation</strong></div>
    </div>
    <p class="bottom-note"><b>Penyesuaian harus dapat dijelaskan:</b> lebih banyak user, role, stakeholder, workflow, data, compliance, load, integrasi, atau komitmen support.</p>`),

  slide('07 · WORKFLOW', 'Dari kebutuhan mentah ke scope yang terkunci.', 'Delapan langkah ini menjaga agar sales, estimator, dan delivery berbicara tentang proyek yang sama.', `
    <ol class="workflow-line">
      <li><span>01</span><b>Discovery</b><small>Tujuan, user, alur, data</small></li>
      <li><span>02</span><b>Package anchor</b><small>Paket terdekat</small></li>
      <li><span>03</span><b>Baseline scope</b><small>Included / excluded</small></li>
      <li><span>04</span><b>Scale & complexity</b><small>Role, branch, security</small></li>
      <li><span>05</span><b>Gap & add-on</b><small>Capability tambahan</small></li>
      <li><span>06</span><b>Risk review</b><small>Urgensi, vendor, support</small></li>
      <li><span>07</span><b>Quotation</b><small>Harga, timeline, terms</small></li>
      <li><span>08</span><b>Scope freeze</b><small>Perubahan = CR</small></li>
    </ol>`),

  slide('08 · DISCOVERY', 'Tanpa discovery, tidak ada harga final.', 'Sembilan pertanyaan ini lebih penting daripada bertanya “budget-nya berapa?”.', `
    <div class="question-grid">
      ${['Siapa yang memakai?', 'Alur kerjanya bagaimana?', 'Modul apa yang dibutuhkan?', 'Data apa yang disimpan?', 'Integrasi dengan apa?', 'Seberapa sensitif datanya?', 'Kapan harus selesai?', 'Support seperti apa?', 'Siapa yang menyetujui?'].map((x, i) => `<div><span>${String(i + 1).padStart(2, '0')}</span><p>${x}</p></div>`).join('')}
    </div>`),

  slide('09 · PETA PRODUK', 'Satu katalog, lima jenis masalah.', 'Sebelum memilih nama paket, tentukan dulu problem yang sebenarnya ingin diselesaikan.', `
    <div class="universe-map">
      <article><span>PRESENCE</span><h3>Terlihat & dipercaya</h3><p>Personal · Wedding · Institution · UMKM</p></article>
      <article><span>TRANSACTION</span><h3>Menerima & memproses</h3><p>Event · E-Commerce · Booking</p></article>
      <article><span>OPERATIONS</span><h3>Bekerja setiap hari</h3><p>POS · CRM · Business · Operational</p></article>
      <article><span>SECTOR</span><h3>Memenuhi kebutuhan khusus</h3><p>Corporate · Government · Healthcare</p></article>
      <article><span>PLATFORM</span><h3>Mengelola skala</h3><p>Custom · ERP · SaaS · Marketplace · Enterprise</p></article>
    </div>
    <button class="inline-cta" type="button" data-open-catalogue>JELAJAHI 64 PAKET <span>→</span></button>`),

  slide('10 · DIGITAL PRESENCE', 'Mulai dari hadir. Naik menjadi bisa mengelola.', 'Personal, Wedding, dan Institution sama-sama dimulai dari informasi—lalu bercabang sesuai kebutuhan.', `
    <div class="family-columns">
      <article><header><span>PERSONAL</span><b>Rp299rb → Rp999rb+</b></header><h3>Portfolio → multipage → CMS → publication</h3><p>Untuk personal brand, profesional, kreator, dan publikasi.</p>${packageButton('personal-cms','Premium + CMS','Rp799rb','Kelola konten sendiri')}</article>
      <article><header><span>WEDDING</span><b>Rp149rb → Rp1,499jt+</b></header><h3>Invitation → RSVP → QR → guest operations</h3><p>Dari undangan informasi sampai operasi check-in tamu.</p>${packageButton('wedding-qr','QR Management','Rp999rb+','QR unik dan scanner')}</article>
      <article><header><span>INSTITUTION</span><b>Rp499rb → Rp4,499jt+</b></header><h3>Profile → CMS → program → operations</h3><p>Untuk yayasan, sekolah, masjid, dan lembaga non-pemerintah.</p>${packageButton('institution-pro','Institutional Pro','Rp1,499jt+','Dokumen dan interaksi')}</article>
    </div>`),

  slide('11 · UMKM', 'Satu jalur upgrade yang paling mudah dijelaskan.', 'Titik pemisah utamanya jelas: website menyampaikan informasi; business system mengelola data dan proses.', `
    <div class="progression-river">
      <button data-package="umkm-basic"><span>01</span><b>BASIC</b><strong>Rp499rb</strong><small>Landing bisnis</small></button>
      <button data-package="umkm-standard"><span>02</span><b>STANDARD</b><strong>Rp749rb</strong><small>Multipage profile</small></button>
      <button data-package="umkm-cms"><span>03</span><b>PREMIUM + CMS</b><strong>Rp999rb</strong><small>Kelola konten</small></button>
      <button class="system-start" data-package="umkm-business-lite"><span>04</span><b>BUSINESS LITE</b><strong>Rp2,25jt+</strong><small>Database lead</small></button>
      <button data-package="umkm-business"><span>05</span><b>BUSINESS</b><strong>Rp2,99jt+</strong><small>Order lifecycle</small></button>
      <button data-package="umkm-business-pro"><span>06</span><b>BUSINESS PRO</b><strong>Rp3,99jt+</strong><small>Multi-staff workflow</small></button>
      <button data-package="umkm-operational"><span>07</span><b>OPERATIONAL</b><strong>Rp4,99jt+</strong><small>Daily operations</small></button>
    </div>
    <div class="river-labels"><span>WEBSITE & CMS</span><span>BUSINESS & OPERATIONS</span></div>`),

  slide('12 · EVENT', 'Event tumbuh dari kampanye menjadi commerce.', 'Setiap kenaikan tier menambah satu lapisan operasi yang nyata.', `
    <div class="journey-showcase">
      <div class="journey-steps">
        <button data-package="event-landing"><span>01</span><b>LANDING</b><small>Informasi & campaign</small><strong>Rp749rb+</strong></button>
        <button data-package="event-cms"><span>02</span><b>CMS</b><small>Panitia kelola konten</small><strong>Rp999rb+</strong></button>
        <button data-package="event-registration"><span>03</span><b>REGISTRATION</b><small>Database peserta</small><strong>Rp1,499jt+</strong></button>
        <button data-package="event-qr"><span>04</span><b>QR</b><small>Pass, scan, attendance</small><strong>Rp2,499jt+</strong></button>
        <button class="featured" data-package="event-ticketing"><span>05</span><b>TICKETING + QRIS</b><small>Checkout sampai laporan</small><strong>Rp3,499jt+</strong></button>
      </div>
      <aside><span>DEMO UTAMA</span><h2>Tech Conference Ticketing</h2><p>Pilih tiket → checkout → QRIS → paid → QR ticket → scan → sales & attendance.</p><button type="button" data-package="event-ticketing">LIHAT DETAIL ↗</button></aside>
    </div>`),

  slide('13 · E-COMMERCE', 'Toko online berhenti menjadi storefront ketika operasi ikut dikelola.', 'Multi-vendor tidak masuk tier tertinggi E-Commerce—ia berpindah kategori menjadi Marketplace.', `
    <div class="four-tiers">
      <button data-package="commerce-starter"><span>01</span><h3>Starter</h3><strong>Rp2,499jt+</strong><p>Storefront, cart, checkout, order.</p><small>Fondasi penjualan</small></button>
      <button data-package="commerce-payment"><span>02</span><h3>Payment</h3><strong>Rp3,499jt+</strong><p>QRIS, payment status, invoice.</p><small>Siklus pembayaran</small></button>
      <button data-package="commerce-business"><span>03</span><h3>Business</h3><strong>Rp4,999jt+</strong><p>Inventory, voucher, customer, shipping, report.</p><small>Operasi commerce</small></button>
      <button data-package="commerce-advanced"><span>04</span><h3>Advanced</h3><strong>Rp7,5jt+</strong><p>Role, stock movement, return, API, analytics.</p><small>Retail operation</small></button>
    </div>`),

  slide('14 · OPERATIONAL PRODUCTS', 'Tiga produk. Tiga pola kerja yang berbeda.', 'Pilih berdasarkan aktivitas inti yang dilakukan tim setiap hari.', `
    <div class="product-triad">
      <article><div class="triad-top"><span>POS</span><strong>Rp2,25–5jt+</strong></div><h2>Menjual & mengelola stok</h2><p>Kasir → produk → transaksi → inventory → supplier → reporting.</p><div class="tier-links"><button data-package="pos-lite">LITE</button><button data-package="pos-business">BUSINESS</button><button data-package="pos-pro">PRO</button></div></article>
      <article><div class="triad-top"><span>BOOKING</span><strong>Rp1,5–4jt+</strong></div><h2>Mengatur waktu & resource</h2><p>Service → resource → tanggal → slot → customer → status.</p><div class="tier-links"><button data-package="booking-basic">BASIC</button><button data-package="booking-business">BUSINESS</button><button data-package="booking-pro">PRO</button></div></article>
      <article><div class="triad-top"><span>CRM</span><strong>Rp2,5–6jt+</strong></div><h2>Mengelola pipeline sales</h2><p>Lead → qualification → assignment → follow-up → quotation → result.</p><div class="tier-links"><button data-package="crm-lite">LITE</button><button data-package="crm-business">BUSINESS</button><button data-package="crm-pro">PRO</button></div></article>
    </div>`),

  slide('15 · CORPORATE', 'Presence, business function, dan internal operations adalah tiga kelas berbeda.', 'Corporate website membangun kredibilitas. Corporate Business menghubungkan customer. Operational System menjadi alat kerja tim.', `
    <div class="corporate-stack">
      <button data-package="corporate-website"><span>01 · PRESENCE</span><div><h3>Corporate Website</h3><p>CMS, services, project, team, news, lead form.</p></div><strong>Rp2,5jt+</strong></button>
      <button data-package="corporate-professional"><span>02 · CONTENT DEPTH</span><div><h3>Corporate Professional</h3><p>Careers, newsroom, case study, arsitektur konten lebih dalam.</p></div><strong>Rp3,5jt+</strong></button>
      <button data-package="corporate-business"><span>03 · BUSINESS FUNCTION</span><div><h3>Corporate Business</h3><p>Lead, request, quotation, dokumen, status.</p></div><strong>Rp5jt+</strong></button>
      <button class="ops" data-package="corporate-ops-standard"><span>04 · INTERNAL OPERATIONS</span><div><h3>Operational System</h3><p>Workflow, role, approval, audit, modul, reporting.</p></div><strong>Rp5–15jt+ / Custom</strong></button>
    </div>`),

  slide('16 · GOVERNMENT & HEALTHCARE', 'Semakin sensitif konteksnya, semakin penting discovery dan governance.', 'Dua sektor ini memiliki floor dan proses penilaian khusus karena stakeholder, data, compliance, dan dampak operasionalnya.', `
    <div class="risk-sectors">
      <article class="government-sector"><span>GOVERNMENT · FLOOR Rp5JT</span><h2>Informasi publik → layanan digital → integrasi lintas unit</h2><div class="sector-prices"><button data-package="government-website">Website <b>5jt+</b></button><button data-package="government-professional">Professional <b>7,5jt+</b></button><button data-package="government-service">Public Service <b>10jt+</b></button><button data-package="government-integrated">Integrated <b>15jt+</b></button></div><p>Procurement, aksesibilitas, stakeholder, security, support, dan governance membedakan kategori ini.</p></article>
      <article class="health-sector"><span>HEALTHCARE · HIGHER DATA SENSITIVITY</span><h2>Presence → booking → clinic operations → healthcare system</h2><div class="sector-prices"><button data-package="clinic-website">Website <b>2,5jt+</b></button><button data-package="clinic-booking">Booking <b>3,5jt+</b></button><button data-package="clinic-management">Clinic Management <b>7,5jt+</b></button><button data-package="healthcare-system">System <b>15jt+</b></button></div><p>Rekam medis, SATUSEHAT/BPJS, lab, farmasi, dan data sensitif wajib discovery serta security review.</p></article>
    </div>`),

  slide('17 · PRODUCT PLATFORMS', 'Ini bukan website dengan banyak fitur.', 'Perbedaannya ada pada arsitektur, data model, authentication, hubungan antar pengguna, QA, security, dan maintainability.', `
    <div class="platform-landscape">
      <button data-package="custom-software"><span>CUSTOM SOFTWARE</span><strong>Rp5jt+</strong><p>Satu aplikasi custom untuk satu problem atau workflow utama.</p></button>
      <button data-package="erp-lite"><span>ERP LITE</span><strong>Rp10jt+</strong><p>3–5 modul terintegrasi dengan master data dan role.</p></button>
      <button data-package="saas-platform"><span>SAAS PLATFORM</span><strong>Rp12,5jt+</strong><p>Produk multi-user / multi-tenant dengan lifecycle account.</p></button>
      <button data-package="erp-business"><span>ERP BUSINESS</span><strong>Rp15jt+</strong><p>5+ modul dan workflow lintas departemen.</p></button>
      <button data-package="marketplace"><span>MARKETPLACE</span><strong>Rp15jt+</strong><p>Buyer, vendor, listing, order, dan commission/payment.</p></button>
      <button class="enterprise" data-package="enterprise-platform"><span>ENTERPRISE PLATFORM</span><strong>Rp25jt+ / Custom</strong><p>Multi-branch, audit, API, security, infrastructure, dan SLA.</p></button>
    </div>`, { dark: true }),

  slide('18 · ADD-ON', 'Add-on menambah capability. Bukan menyamarkan kategori yang salah.', 'Jika beberapa add-on sudah mengubah arsitektur atau menyamai tier berikutnya, proyek harus di-upgrade atau di-scope ulang.', `
    <div class="addon-layout">
      <div class="addon-cloud">
        <span>Additional Page<small>100–250rb</small></span><span>Extra CMS Type<small>250–500rb</small></span><span>Additional Role<small>300–750rb</small></span><span>Approval Workflow<small>500rb–1,5jt</small></span><span>Payment Gateway<small>750rb–1,5jt</small></span><span>WhatsApp / API<small>500rb–1,5jt+</small></span><span>Shipping<small>750rb–1,5jt+</small></span><span>QR + Scanner<small>500rb–1jt</small></span><span>Multi-branch<small>1jt+</small></span><span>External API<small>500rb+</small></span><span>Urgent Delivery<small>+20–50%</small></span>
      </div>
      <div class="rescope-rule"><span>BASE + ADD-ON + ADD-ON + ADD-ON</span><h2>Masih paket yang benar?</h2><p><b>Capability setara tier berikutnya</b> → Upgrade paket</p><p><b>Arsitektur berubah</b> → Re-scope</p><p><b>Multi-vendor / tenant / branch</b> → Pindah kategori</p></div>
    </div>`),

  slide('19 · SALES DECISION', 'Mulai dari kebutuhan. Bukan dari nama paket.', 'Cheat sheet ini membantu sales menemukan kategori awal sebelum discovery lebih dalam.', `
    <div class="decision-board">
      <div class="decision-question"><span>TANYAKAN</span><h2>Apa yang sebenarnya ingin klien lakukan?</h2></div>
      <div class="decision-options">
        <p><span>Tampil online</span><b>Website</b></p><p><span>Edit konten sendiri</span><b>CMS</b></p><p><span>Simpan lead / order</span><b>Business</b></p><p><span>Kerja harian tim</span><b>Operational</b></p>
        <p><span>Jual produk / tiket</span><b>E-Commerce / Event</b></p><p><span>Kasir & stok</span><b>POS</b></p><p><span>Reservasi</span><b>Booking</b></p><p><span>Pipeline sales</span><b>CRM</b></p>
        <p><span>Banyak modul</span><b>ERP</b></p><p><span>Banyak organisasi</span><b>SaaS</b></p><p><span>Buyer + vendor</span><b>Marketplace</b></p><p><span>High-risk / tidak cocok</span><b>Custom Discovery</b></p>
      </div>
    </div>`),

  slide('20 · PERUBAHAN BENCHMARK', 'Harga naik karena kelas produknya diperjelas.', 'Revisi utama terjadi pada paket yang sebelumnya membawa CMS, database, workflow, public service, atau arsitektur platform dengan positioning terlalu rendah.', `
    <div class="change-table">
      ${[
        ['Personal CMS','Rp499rb','Rp799rb','CMS capability'],['UMKM Business','Rp1,499jt','Rp2,99jt','Business process'],['Corporate CMS','Rp1,299jt','Rp2,5jt','Corporate positioning'],['Government CMS','Rp1,999jt','Rp5jt','Government floor'],['Public Service','Rp3,999jt','Rp10jt','Service application'],['ERP Lite','Rp5,999jt','Rp10jt','Integrated modules'],['SaaS','Rp7,999jt','Rp12,5jt','Multi-tenant architecture'],['Enterprise','Custom','Rp25jt+ / Custom','Enterprise guardrail']
      ].map(x => `<div><b>${x[0]}</b><span>${x[1]}</span><i>→</i><strong>${x[2]}</strong><small>${x[3]}</small></div>`).join('')}
    </div>`),

  slide('21 · DEMO STRATEGY', 'Sales menjual sesuatu yang dapat ditunjukkan.', 'Prioritas P0 mewakili kebutuhan dan rentang harga yang paling sering ditawarkan. Detail semua demo tersedia di katalog.', `
    <div class="demo-wall">
      ${[['P01','Nara Dev','Personal Portfolio'],['U01','Kopi Rona','UMKM Basic'],['U04','LeadDesk','Business Lite'],['E01','Tech Summit','Event Landing'],['E04','Event Ticketing','Ticketing + QRIS'],['C02','Lunara Pay','E-Commerce Payment'],['CRM01','Nexa Sales CRM','CRM'],['COR01','Nexa Corporate','Corporate Website'],['OPS01','ProcureFlow','Operational System']].map((x,i)=>`<article style="--i:${i}"><span>${x[0]}</span><h3>${x[1]}</h3><p>${x[2]}</p></article>`).join('')}
    </div>
    <button class="inline-cta" type="button" data-open-catalogue>BUKA KATALOG & DEMO <span>→</span></button>`),

  {
    dark: true,
    className: 'closing-slide',
    html: `
      <div class="closing-copy">
        <p>SOLIVATE STUDIO · PRICING MASTER 2026</p>
        <h1>Paket menentukan<br><span>titik awal.</span></h1>
        <h1>Discovery menentukan<br><em>penawaran final.</em></h1>
      </div>
      <div class="closing-footer"><span>RIGHT SCOPE.</span><span>RIGHT CAPABILITY.</span><span>RIGHT PRICE.</span></div>`,
  },
];

let current = 0;
let catalogueOpen = false;
let activeCategory = 'Semua';
let activePackage = null;

const chapterFor = (slideNumber) => chapters.find((item) => slideNumber >= item.from && slideNumber <= item.to) || chapters[0];

function renderChapters() {
  const nav = $('#chapters');
  nav.innerHTML = chapters.map((chapter) => `<button type="button" data-slide="${chapter.from - 1}"><span>${chapter.id}</span>${chapter.label}</button>`).join('');
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

  document.querySelectorAll('#chapters button').forEach((button) => {
    button.classList.toggle('active', Number(button.dataset.slide) + 1 === chapter.from);
  });

  history.replaceState(null, '', `#slide-${String(current + 1).padStart(2, '0')}`);
  bindSlideInteractions();
}

function bindSlideInteractions() {
  document.querySelectorAll('[data-package]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      openCatalogue(button.dataset.package);
    });
  });
  document.querySelectorAll('[data-open-catalogue]').forEach((button) => button.addEventListener('click', () => openCatalogue()));
}

function categories() {
  return ['Semua', ...new Set(catalogue.map((item) => item.kategori))];
}

function renderFilters() {
  $('#catalogueFilters').innerHTML = categories().map((category) => `<button type="button" data-category="${category}" class="${activeCategory === category ? 'active' : ''}">${category}</button>`).join('');
  document.querySelectorAll('[data-category]').forEach((button) => button.addEventListener('click', () => {
    activeCategory = button.dataset.category;
    renderFilters();
    renderCatalogue();
  }));
}

function filteredCatalogue() {
  const query = $('#catalogueSearch').value.trim().toLowerCase();
  return catalogue.filter((item) => {
    const categoryMatch = activeCategory === 'Semua' || item.kategori === activeCategory;
    const haystack = [item.nama, item.kategori, item.harga, item.cocok, item.hasil, item.demo, item.pembeda, ...item.termasuk].join(' ').toLowerCase();
    return categoryMatch && (!query || haystack.includes(query));
  });
}

function renderCatalogue() {
  const items = filteredCatalogue();
  $('#catalogueCount').textContent = `${items.length} paket ditemukan`;
  $('#catalogueGrid').innerHTML = items.length ? items.map((item) => `
    <button class="catalogue-card" type="button" data-catalogue-id="${item.id}">
      <span>${item.kategori}</span>
      <h3>${item.nama}</h3>
      <strong>${item.harga}</strong>
      <p>${item.hasil}</p>
      <small>${item.demo}</small>
      <i>BUKA DETAIL ↗</i>
    </button>`).join('') : `<div class="empty-state"><h3>Paket tidak ditemukan.</h3><p>Coba kata kunci atau kategori lain.</p></div>`;

  document.querySelectorAll('[data-catalogue-id]').forEach((button) => button.addEventListener('click', () => openDrawer(button.dataset.catalogueId)));
}

function openDrawer(id) {
  const item = catalogue.find((entry) => entry.id === id);
  if (!item) return;
  activePackage = item;
  $('#drawerContent').innerHTML = `
    <div class="drawer-hero">
      <span>${item.kategori}</span>
      <h2>${item.nama}</h2>
      <strong>${item.harga}</strong>
      <p>${item.hasil}</p>
    </div>
    <div class="drawer-facts">
      <div><span>COCOK UNTUK</span><p>${item.cocok}</p></div>
      <div><span>PEMBEDA UTAMA</span><p>${item.pembeda}</p></div>
    </div>
    <details open>
      <summary>Capability yang termasuk <b>${item.termasuk.length}</b></summary>
      <ul>${item.termasuk.map((feature) => `<li>${feature}</li>`).join('')}</ul>
    </details>
    <details>
      <summary>Demo acuan</summary>
      <div class="drawer-demo"><span>DEMO</span><h3>${item.demo}</h3><p>Demo digunakan untuk memperlihatkan capability paket, bukan sebagai scope final otomatis.</p></div>
    </details>
    ${item.catatan ? `<details><summary>Catatan internal</summary><p class="drawer-note">${item.catatan}</p></details>` : ''}
    <div class="drawer-disclaimer"><b>Benchmark ≠ final quotation.</b><p>Scope aktual tetap ditentukan setelah discovery, review kompleksitas, integrasi, timeline, support, dan biaya pihak ketiga.</p></div>`;
  $('#packageDrawer').classList.add('open');
  $('#packageDrawer').setAttribute('aria-hidden', 'false');
  $('#drawerBackdrop').classList.add('open');
  requestAnimationFrame(() => $('#drawerClose').focus());
}

function closeDrawer() {
  activePackage = null;
  $('#packageDrawer').classList.remove('open');
  $('#packageDrawer').setAttribute('aria-hidden', 'true');
  $('#drawerBackdrop').classList.remove('open');
}

function openCatalogue(packageId = null) {
  catalogueOpen = true;
  $('#catalogueOverlay').classList.add('open');
  $('#catalogueOverlay').setAttribute('aria-hidden', 'false');
  document.body.classList.add('catalogue-open');
  renderFilters();
  renderCatalogue();
  if (packageId) openDrawer(packageId);
  else requestAnimationFrame(() => $('#catalogueSearch').focus());
}

function closeCatalogue() {
  closeDrawer();
  catalogueOpen = false;
  $('#catalogueOverlay').classList.remove('open');
  $('#catalogueOverlay').setAttribute('aria-hidden', 'true');
  document.body.classList.remove('catalogue-open');
}

function go(delta) {
  if (catalogueOpen) return;
  renderSlide(current + delta, delta);
}

$('#prev').addEventListener('click', () => go(-1));
$('#next').addEventListener('click', () => go(1));
$('#goHome').addEventListener('click', () => renderSlide(0, -1));
$('#catalogueOpen').addEventListener('click', () => openCatalogue());
$('#catalogueClose').addEventListener('click', closeCatalogue);
$('#drawerClose').addEventListener('click', closeDrawer);
$('#drawerBackdrop').addEventListener('click', closeDrawer);
$('#catalogueSearch').addEventListener('input', renderCatalogue);
$('#fullscreen').addEventListener('click', () => {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
  else document.exitFullscreen?.();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (activePackage) closeDrawer();
    else if (catalogueOpen) closeCatalogue();
    return;
  }
  if (catalogueOpen || ['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
  if (['ArrowRight', 'PageDown', ' ', 'Enter'].includes(event.key)) { event.preventDefault(); go(1); }
  if (['ArrowLeft', 'PageUp', 'Backspace'].includes(event.key)) { event.preventDefault(); go(-1); }
  if (event.key === 'Home') { event.preventDefault(); renderSlide(0, -1); }
  if (event.key === 'End') { event.preventDefault(); renderSlide(slides.length - 1, 1); }
  if (event.key.toLowerCase() === 'f') $('#fullscreen').click();
});

renderChapters();
const hashMatch = location.hash.match(/slide-(\d+)/);
renderSlide(hashMatch ? Number(hashMatch[1]) - 1 : 0);
renderFilters();
renderCatalogue();
