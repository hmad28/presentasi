const $ = (query) => document.querySelector(query);
const catalogue = window.SOLIVATE_CATALOGUE || [];
const byId = Object.fromEntries(catalogue.map((item) => [item.id, item]));

const categoryMeta = [
  { key: 'Personal', title: 'Personal', major: 'PRESENCE', accent: 'blue', statement: 'Membangun personal brand dari satu landing page hingga sistem publikasi mandiri.', progression: 'Landing → Multipage → CMS → Publication' },
  { key: 'Wedding', title: 'Wedding', major: 'PRESENCE', accent: 'coral', statement: 'Mengubah undangan digital menjadi sistem pengelolaan dan check-in tamu.', progression: 'Invitation → Interaction → RSVP → QR → Guest Operations' },
  { key: 'Institusi', title: 'Institution', major: 'PRESENCE', accent: 'green', statement: 'Dari profil lembaga hingga workflow operasional multi-role.', progression: 'Landing → Profile → CMS → Interaction → Operations' },
  { key: 'UMKM', title: 'UMKM', major: 'PRESENCE', accent: 'lime', statement: 'Jalur upgrade lengkap dari website informasi menuju software operasional harian.', progression: 'Landing → Multipage → CMS → Lead → Order → Team → Operations' },
  { key: 'Event', title: 'Event', major: 'OPERATIONS', accent: 'coral', statement: 'Dari campaign event hingga ticketing, pembayaran, dan attendance.', progression: 'Campaign → Content → Registration → QR → Ticketing' },
  { key: 'E-Commerce', title: 'E-Commerce', major: 'OPERATIONS', accent: 'lime', statement: 'Dari storefront sederhana menuju retail operation yang terintegrasi.', progression: 'Storefront → Payment → Commerce Operations → Advanced Retail' },
  { key: 'POS', title: 'Point of Sale', major: 'OPERATIONS', accent: 'blue', statement: 'Sistem kasir yang tumbuh dari transaksi dasar menuju kontrol inventory dan multi-cashier.', progression: 'Cashier → Inventory → Multi-Cashier' },
  { key: 'Booking', title: 'Booking', major: 'OPERATIONS', accent: 'green', statement: 'Mengelola reservasi, slot waktu, kapasitas, dan banyak resource.', progression: 'Reservation → Slots → Multi-Resource' },
  { key: 'CRM', title: 'CRM', major: 'OPERATIONS', accent: 'coral', statement: 'Mengelola lead dan pipeline sales dari pencatatan dasar hingga automation.', progression: 'Lead → Team Sales → Automation' },
  { key: 'Corporate', title: 'Corporate', major: 'SECTOR', accent: 'blue', statement: 'Memisahkan corporate presence, business function, dan internal operational software.', progression: 'Presence → Professional Content → Business Function → Operations' },
  { key: 'Government', title: 'Government', major: 'SECTOR', accent: 'lime', statement: 'Portal publik dan aplikasi layanan dengan floor, governance, dan risiko khusus.', progression: 'Information → Public Interaction → Digital Service → Integrated' },
  { key: 'Healthcare', title: 'Healthcare', major: 'SECTOR', accent: 'coral', statement: 'Produk digital kesehatan dengan peningkatan sensitivity, workflow, dan security review.', progression: 'Presence → Booking → Clinic Operations → Healthcare System' },
  { key: 'Platform', title: 'Product Platforms', major: 'PLATFORM', accent: 'lime', statement: 'Software custom, ERP, SaaS, Marketplace, dan Enterprise dengan arsitektur kelas produk.', progression: 'Custom App → ERP / SaaS / Marketplace → Enterprise' },
];

const majorLabels = {
  OVERVIEW: 'OVERVIEW',
  PRESENCE: 'DIGITAL PRESENCE',
  OPERATIONS: 'BUSINESS & OPERATIONS',
  SECTOR: 'CORPORATE & SECTOR',
  PLATFORM: 'PRODUCT PLATFORMS',
};

function categorySlide(meta, items, categoryNumber) {
  return {
    type: 'category', major: meta.major, accent: meta.accent,
    html: `<div class="category-opener accent-${meta.accent}">
      <div class="category-index"><span>${String(categoryNumber).padStart(2, '0')}</span><small>KATEGORI</small></div>
      <div class="category-main">
        <p>${majorLabels[meta.major]}</p>
        <h1>${meta.title}</h1>
        <h2>${meta.statement}</h2>
        <div class="category-progression">${meta.progression}</div>
      </div>
      <div class="category-packages">
        <span>${items.length} PAKET</span>
        <ol>${items.map((item) => `<li>${item.nama}</li>`).join('')}</ol>
      </div>
      <div class="category-next">LANJUT UNTUK BREAKDOWN SETIAP PAKET <b>→</b></div>
    </div>`,
  };
}

function packageSlide(item, meta, packageIndex, packageTotal) {
  const featureClass = item.termasuk.length > 7 ? 'many-features' : '';
  return {
    type: 'package', major: meta.major, accent: meta.accent,
    html: `<div class="package-spotlight accent-${meta.accent}">
      <header class="package-heading">
        <div><span>${meta.title.toUpperCase()}</span><small>PAKET ${String(packageIndex).padStart(2, '0')} / ${String(packageTotal).padStart(2, '0')}</small></div>
        <button type="button" data-package="${item.id}">BUKA DETAIL LENGKAP ↗</button>
      </header>

      <div class="package-primary">
        <h1>${item.nama}</h1>
        <div class="benchmark-label">BENCHMARK</div>
        <strong class="package-price${item.harga.length > 12 ? " is-long" : ""}">${item.harga}</strong>
        <div class="suitable"><span>COCOK UNTUK</span><p>${item.cocok}</p></div>
      </div>

      <div class="package-explanation">
        <figure class="demo-visual">
          <img src="assets/demos/${item.id}.png" alt="Concept preview ${item.demo}" />
          <figcaption><span>CONCEPT PREVIEW · BUKAN WEBSITE PIHAK KETIGA</span></figcaption>
        </figure>
        <section class="benefit-block">
          <span>BENEFIT UTAMA</span>
          <h2>${item.hasil}</h2>
        </section>
        <section class="difference-block">
          <span>KENAPA BERBEDA?</span>
          <p>${item.pembeda}</p>
        </section>
      </div>

      <section class="scope-block ${featureClass}">
        <header><span>SCOPE REPRESENTATIF</span><b>${item.termasuk.length} CAPABILITY</b></header>
        <ul>${item.termasuk.slice(0, 5).map((feature) => `<li>${feature}</li>`).join('')}</ul>
        ${item.termasuk.length > 5 ? `<button class="scope-more" type="button" data-package="${item.id}">+${item.termasuk.length - 5} CAPABILITY LAINNYA · BUKA DETAIL ↗</button>` : ''}
      </section>

      <footer class="demo-strip">
        <span>CONTOH PROYEK / DEMO</span>
        <strong>${item.demo}</strong>
        ${item.catatan ? `<p>${item.catatan}</p>` : ''}
      </footer>
    </div>`,
  };
}

function tableOfContentsSlide() {
  let nextPage = 3;
  const entries = categoryMeta.map((meta, index) => {
    const packageCount = catalogue.filter((item) => item.kategori === meta.key).length;
    const startPage = nextPage;
    nextPage += packageCount + 1;
    return { ...meta, index: index + 1, packageCount, startPage };
  });

  return {
    type: 'toc', major: 'OVERVIEW',
    html: `<div class="toc-layout">
      <section class="toc-intro">
        <span>02 · NAVIGASI UTAMA</span>
        <h1>Daftar<br>Isi.</h1>
        <p>Pilih kategori untuk langsung menuju breakdown harga dan paket.</p>
        <div class="toc-summary"><b>13</b><span>KATEGORI</span><b>64</b><span>PAKET</span></div>
      </section>
      <nav class="toc-grid" aria-label="Daftar kategori">
        ${entries.map((entry) => `<button type="button" data-jump="${entry.startPage - 1}">
          <span>${String(entry.index).padStart(2, '0')}</span>
          <strong>${entry.title}</strong>
          <small>${entry.packageCount} paket</small>
          <b>HAL. ${String(entry.startPage).padStart(2, '0')} ↗</b>
        </button>`).join('')}
      </nav>
    </div>`,
  };
}

const slides = [
  {
    type: 'cover', major: 'OVERVIEW', dark: true,
    html: `<div class="cover-sequential"><span>FINAL INTERNAL MASTER · 2026</span><h1>SATU PAKET.<br><em>SATU HALAMAN.</em></h1><p>64 breakdown harga, benefit, scope, dan contoh proyek.</p></div><div class="cover-count"><b>64</b><span>PAKET<br>LENGKAP</span></div>`,
  },
  tableOfContentsSlide(),
];

categoryMeta.forEach((meta, categoryIndex) => {
  const items = catalogue.filter((item) => item.kategori === meta.key);
  slides.push(categorySlide(meta, items, categoryIndex + 1));
  items.forEach((item, packageIndex) => slides.push(packageSlide(item, meta, packageIndex + 1, items.length)));
});

slides.push({
  type: 'closing', major: 'PLATFORM', dark: true,
  html: `<div class="closing-sequential"><span>SOLIVATE STUDIO · PRICING MASTER 2026</span><h1>64 paket.<br><em>Tanpa campur.</em><br>Tanpa pengulangan.</h1><p>Benchmark adalah titik awal. Discovery menentukan quotation final.</p><button type="button" data-open-catalogue>BUKA KATALOG PENCARIAN →</button></div>`,
});

const majorOrder = ['OVERVIEW', 'PRESENCE', 'OPERATIONS', 'SECTOR', 'PLATFORM'];
const chapters = majorOrder.map((major, index) => {
  const first = slides.findIndex((slide) => slide.major === major);
  const last = slides.reduce((value, slide, slideIndex) => slide.major === major ? slideIndex : value, first);
  return { id: String(index + 1).padStart(2, '0'), label: majorLabels[major], from: first + 1, to: last + 1 };
});

let current = 0;
let catalogueOpen = false;
let activeCategory = 'Semua';
let activePackage = null;

function chapterFor(number) { return chapters.find((chapter) => number >= chapter.from && number <= chapter.to) || chapters[0]; }
function renderChapters() {
  $('#chapters').innerHTML = chapters.map((chapter) => `<button type="button" data-slide="${chapter.from - 1}"><span>${chapter.id}</span>${chapter.label}</button>`).join('');
  document.querySelectorAll('#chapters [data-slide]').forEach((button) => button.addEventListener('click', () => renderSlide(Number(button.dataset.slide))));
}

function renderSlide(index, direction = 1) {
  current = Math.max(0, Math.min(slides.length - 1, index));
  const data = slides[current];
  const host = $('#slide');
  host.className = `slide slide-${data.type} ${data.dark ? 'is-dark' : ''} ${direction < 0 ? 'from-left' : 'from-right'}`;
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
  document.querySelectorAll('[data-jump]').forEach((button) => button.addEventListener('click', () => renderSlide(Number(button.dataset.jump))));
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
  $('#catalogueGrid').innerHTML = items.length ? items.map((item) => `<button class="catalogue-card" type="button" data-catalogue-id="${item.id}"><img src="assets/demos/${item.id}.png" alt="" loading="lazy" /><span>${item.kategori}</span><h3>${item.nama}</h3><strong>${item.harga}</strong><p>${item.hasil}</p><small>${item.demo}</small><i>BUKA DETAIL ↗</i></button>`).join('') : `<div class="empty-state"><h3>Paket tidak ditemukan.</h3><p>Coba kata kunci atau kategori lain.</p></div>`;
  document.querySelectorAll('[data-catalogue-id]').forEach((button) => button.addEventListener('click', () => openDrawer(button.dataset.catalogueId)));
}
function openDrawer(id) {
  const item = byId[id]; if (!item) return;
  activePackage = item;
  $('#drawerContent').innerHTML = `<div class="drawer-hero"><span>${item.kategori}</span><h2>${item.nama}</h2><strong>${item.harga}</strong><p>${item.hasil}</p></div><div class="drawer-preview"><img src="assets/demos/${item.id}.png" alt="Concept preview ${item.demo}" /><span>CONCEPT PREVIEW · ${item.demo}</span></div><div class="drawer-facts"><div><span>COCOK UNTUK</span><p>${item.cocok}</p></div><div><span>PEMBEDA UTAMA</span><p>${item.pembeda}</p></div></div><details open><summary>Benefit & capability <b>${item.termasuk.length}</b></summary><ul>${item.termasuk.map((feature) => `<li>${feature}</li>`).join('')}</ul></details>${item.catatan ? `<details><summary>Catatan internal</summary><p class="drawer-note">${item.catatan}</p></details>` : ''}<div class="drawer-disclaimer"><b>Benchmark ≠ final quotation.</b><p>Harga final mengikuti scope, complexity, integration, timeline, support, dan biaya pihak ketiga.</p></div>`;
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
