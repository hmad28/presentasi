const $ = (q) => document.querySelector(q);

const chapterDefs = [
  { id: '01', label: 'SISTEM HARGA', from: 1, to: 11 },
  { id: '02', label: 'PRESENSI', from: 12, to: 18 },
  { id: '03', label: 'BISNIS', from: 19, to: 36 },
  { id: '04', label: 'OPERASIONAL', from: 37, to: 48 },
  { id: '05', label: 'SEKTOR PUBLIK', from: 49, to: 56 },
  { id: '06', label: 'PLATFORM', from: 57, to: 63 },
  { id: '07', label: 'PENJUALAN', from: 64, to: 73 },
  { id: '08', label: 'TATA KELOLA', from: 74, to: 83 },
];

const pkg = (kategori, nama, harga, cocok, outcome, termasuk, demo, pembeda, catatan = '') => ({
  kategori, nama, harga, cocok, outcome, termasuk, demo, pembeda, catatan,
});

const personal = [
  pkg('PERSONAL', 'Personal Basic', 'Rp299.000', 'Mahasiswa, freelancer awal, CV online, dan portofolio sederhana.', 'Hadir online secara profesional melalui satu landing page yang fokus pada profil dan ajakan tindakan.', ['1 landing page dengan 5–6 bagian', 'Profil, keahlian/layanan, portofolio, pencapaian/testimoni, kontak', 'Responsif desktop dan seluler', 'CTA WhatsApp/media sosial dan SEO dasar', 'Subdomain, hosting, dan SSL', '2 revisi minor; garansi bug 1 bulan'], 'P01 — Nara Dev Portfolio', 'Satu halaman tanpa CMS atau dashboard.'),
  pkg('PERSONAL', 'Personal Standard', 'Rp499.000', 'Freelancer, kreator, konsultan, dan profesional dengan personal brand.', 'Memiliki struktur multipage yang lebih kredibel untuk personal branding.', ['Maksimal 5 halaman', 'Home, About, Portfolio/Projects, Achievement/Experience, Contact', 'Template WhatsApp dan Google Maps bila relevan', 'Analytics dasar dan Search Console', 'Domain umum 1 tahun, hosting, dan SSL', 'Hingga 4 revisi; garansi bug 3 bulan'], 'P02 — Raka Creative', 'Naik dari satu halaman menjadi multipage; belum ada CMS.'),
  pkg('CMS PERSONAL', 'Personal Premium + CMS', 'Rp799.000', 'Personal brand aktif yang rutin menambah proyek, pencapaian, galeri, atau konten.', 'Klien dapat mengelola konten melalui dashboard tanpa meminta developer.', ['Sekitar 8–10 halaman', 'CMS dan dashboard admin', 'Kelola 3–4 jenis konten', 'Unggah media dan field SEO dasar', 'Analytics', 'Domain umum 1 tahun, hosting, dan SSL', 'Hingga 5 revisi; garansi bug 6 bulan'], 'P03 — Aster Professional CMS', 'Peningkatan capability menjadi pengelolaan konten mandiri.'),
  pkg('PUBLIKASI', 'Personal Blog Pro', 'Rp999.000+', 'Blogger, thought leader, publikasi personal, dan content creator.', 'Menjalankan blog serius dengan alur publikasi dan penemuan konten.', ['Fondasi Personal Standard/Premium sesuai scope', 'CMS artikel: draft dan publish', 'Kategori, tag, dan thumbnail', 'Pencarian dan artikel terkait', 'SEO per artikel, sitemap, dan analytics', 'Domain, hosting, dan SSL'], 'P04 — Insight Journal', 'Fokus pada workflow publikasi, bukan sekadar CMS portofolio.'),
];

const umkmPresence = [
  pkg('UMKM', 'UMKM Basic', 'Rp499.000', 'Warung, laundry, catering, bengkel, barbershop, dan jasa lokal.', 'Mudah ditemukan dan mengarahkan calon pelanggan ke WhatsApp.', ['1 landing page', 'Produk/layanan, manfaat, galeri, testimonial opsional', 'Maps, media sosial, dan WhatsApp', 'Responsif dan SEO dasar', 'Hosting, SSL, dan domain umum sesuai ketentuan'], 'U01 — Kopi Rona', 'Website informasi; tanpa login, CMS, database, atau proses bisnis.'),
  pkg('UMKM', 'UMKM Standard', 'Rp749.000', 'UMKM yang membutuhkan company profile lebih lengkap dan kredibel.', 'Membentuk presensi bisnis multipage untuk memperkuat layanan, produk, dan kepercayaan.', ['Maksimal 5–7 halaman', 'Home, About, Product/Service, Gallery/Portfolio, Testimonial, Contact', 'SEO dan analytics dasar', 'CTA WhatsApp dan Maps', 'Domain dan hosting'], 'U02 — Arunika Interior', 'Naik dari landing page menjadi multipage; konten masih dikelola developer.'),
  pkg('CMS UMKM', 'UMKM Premium + CMS', 'Rp999.000', 'UMKM yang rutin mengubah produk, layanan, galeri, promo, testimonial, atau artikel.', 'Pemilik atau admin dapat mengelola konten sendiri melalui dashboard.', ['Website multipage sekitar 8–10 halaman', 'CMS dan dashboard admin', 'Manajemen produk/layanan', 'Galeri, testimonial, promo/artikel sesuai scope', 'Field SEO dan analytics', 'Domain dan hosting'], 'U03 — Kopi Rona CMS', 'Sudah memiliki dashboard konten; belum menjadi sistem transaksi internal.'),
];

const business = [
  pkg('SISTEM BISNIS', 'UMKM Business Lite', 'Rp2.250.000+', 'Bisnis jasa yang mulai menyimpan lead atau pelanggan secara terstruktur.', 'Website mulai menghasilkan data yang dapat dikelola dan ditindaklanjuti tim.', ['Website dan CMS sesuai kebutuhan', 'Database lead/kontak', 'Detail lead, sumber, catatan, dan status sederhana', 'Pencarian dan filter', 'Ringkasan dashboard', 'Ekspor dasar'], 'U04 — Arunika LeadDesk', 'Perubahan dari CMS menjadi database lead/pelanggan.'),
  pkg('SISTEM BISNIS', 'UMKM Business', 'Rp2.990.000+', 'Bisnis dengan alur order atau request sederhana.', 'Mengelola pelanggan, order, invoice, dan status dalam satu dashboard.', ['Database pelanggan', 'Manajemen order/request', 'Invoice atau quotation sederhana', 'Workflow status dan catatan', 'Pelaporan dasar', 'Dashboard admin'], 'U05 — CleanFlow Laundry', 'Naik dari lead management menjadi siklus transaksi/order.'),
  pkg('SISTEM BISNIS', 'UMKM Business Pro', 'Rp3.990.000+', 'Bisnis berkembang dengan operasional aktif dan lebih dari satu admin/staf.', 'Menjalankan workflow aktif dengan notifikasi, dokumen, pelaporan, dan role sederhana.', ['Seluruh capability Business', 'Multi-admin/staf sederhana', 'Sistem notifikasi', 'Unggah atau pembuatan dokumen dasar', 'Workflow/status lebih luas', 'Pelaporan lebih lengkap'], 'U06 — TravelOps Lite', 'Mendukung kerja beberapa orang dan lintas status; belum multi-departemen.'),
  pkg('OPERASIONAL UMKM', 'UMKM Operational', 'Rp4.990.000+', 'UMKM atau growing business yang memakai sistem sebagai alat kerja harian.', 'Menyatukan data staf, pelanggan, transaksi, dokumen, workflow, dan laporan.', ['CMS bila diperlukan', 'Staf/pengguna, pelanggan, dan transaksi', 'Role dasar, dokumen, dan workflow', 'Notifikasi', 'Dashboard operasional dan laporan', 'Aktivitas audit sederhana bila scope memungkinkan'], 'U07 — NexaOps Small Business', 'Bukan lagi website dengan fitur tambahan; ini perangkat lunak operasional.'),
];

const wedding = [
  pkg('WEDDING', 'Wedding Basic', 'Rp149–249rb', 'Undangan sederhana.', 'Menyampaikan informasi acara secara menarik.', ['Informasi acara', 'Maps', 'Galeri', 'Musik'], 'W01 — Alya & Fikri', 'Undangan informasi tanpa database tamu.'),
  pkg('WEDDING', 'Wedding Premium', 'Rp349–499rb', 'Undangan interaktif.', 'Memberi pengalaman undangan yang lebih personal.', ['Nama tamu', 'RSVP/gift/video', 'Interaksi premium'], 'W01 — Alya & Fikri', 'Menambah pengalaman interaktif.'),
  pkg('DATABASE TAMU', 'Wedding RSVP', 'Rp699rb+', 'Acara yang perlu mendata konfirmasi tamu.', 'RSVP tersimpan dan dapat dikelola panitia.', ['Form RSVP', 'Database tamu', 'Manajemen tamu'], 'W02 — Guest Desk', 'Mulai menyimpan data tamu.'),
  pkg('CHECK-IN', 'Wedding QR Management', 'Rp999rb+', 'Acara dengan check-in digital.', 'Setiap tamu memiliki QR unik dan status kehadiran.', ['QR unik', 'Scanner', 'Dashboard kehadiran'], 'W02 — Guest Desk', 'Menambah identitas digital dan operasi di lokasi.'),
  pkg('OPERASI TAMU', 'Wedding Pro', 'Rp1.499.000+', 'Pernikahan besar dengan pengelolaan tamu lebih kompleks.', 'Mengelola kategori, jumlah pax, impor massal, dan beberapa scanner.', ['Kategori dan pax', 'Impor tamu massal', 'Multi-scanner', 'Pelaporan kehadiran'], 'W02 — Guest Desk', 'Sistem operasi tamu pernikahan.'),
];

const institution = [
  pkg('INSTITUSI', 'Institutional Landing', 'Rp499.000', 'Campaign atau program lembaga.', 'Satu halaman fokus pada informasi program dan CTA.', ['1 landing page', 'Responsif dan SEO dasar', 'Tanpa CMS'], 'I01 — Yayasan Al-Falah', 'Presensi program paling sederhana.'),
  pkg('INSTITUSI', 'Institutional Profile', 'Rp749.000', 'Lembaga yang membutuhkan profil lengkap.', 'Profil lembaga multipage yang kredibel.', ['5–7 halaman', 'Domain umum', 'SEO dasar', 'Struktur profil dan program'], 'I01 — Yayasan Al-Falah', 'Naik menjadi profil multipage.'),
  pkg('CMS INSTITUSI', 'Institutional CMS', 'Rp999.000', 'Lembaga yang rutin memperbarui berita, program, dan galeri.', 'Admin dapat mengelola konten lembaga melalui dashboard.', ['CMS berita', 'Program/kegiatan', 'Galeri', 'Dashboard admin'], 'I01 — Yayasan Al-Falah', 'Pengelolaan konten mandiri.'),
  pkg('INSTITUSI PRO', 'Institutional Pro', 'Rp1.499.000+', 'Lembaga aktif dengan dokumen dan interaksi publik.', 'Mengelola event, dokumen, formulir, pencarian, dan filter.', ['Event', 'Dokumen', 'Formulir', 'Pencarian dan filter'], 'I01 — Yayasan Al-Falah', 'Dari konten menuju fungsi institusional.'),
];

const eventPackages = [
  pkg('EVENT', 'Event Landing', 'Rp749.000+', 'Seminar, kajian, workshop, community event, atau expo kecil.', 'Campaign page yang menjelaskan event dan mendorong registrasi.', ['Hero dan countdown', 'Overview, agenda, speaker, venue', 'Sponsor/partner dan FAQ', 'CTA registrasi', 'Responsif, social share, SEO dasar', 'Domain dan hosting'], 'E01 — Nusantara Tech Summit 2026', 'Tidak menyimpan peserta di sistem kecuali form eksternal sederhana.'),
  pkg('CMS EVENT', 'Event + CMS', 'Rp999.000+', 'Event yang sering mengubah agenda, speaker, sponsor, galeri, atau pengumuman.', 'Panitia dapat memperbarui konten event tanpa developer.', ['Seluruh Event Landing', 'CMS agenda dan speaker', 'CMS sponsor, FAQ, galeri, dan pengumuman', 'Dashboard admin'], 'E01 — Tech Summit Admin', 'Konten event dikelola panitia.'),
  pkg('REGISTRASI', 'Event Registration', 'Rp1.499.000+', 'Event gratis atau undangan yang membutuhkan data pendaftar.', 'Registrasi tersimpan langsung dalam database peserta.', ['Website dan CMS', 'Form registrasi khusus', 'Database peserta', 'Pencarian, filter, dan ekspor', 'Konfirmasi email dasar'], 'E02 — EventReg', 'Mulai memiliki database peserta; belum ada QR check-in.'),
  pkg('CHECK-IN', 'Event Registration + QR', 'Rp2.499.000+', 'Event yang memerlukan verifikasi peserta di lokasi.', 'Setiap peserta memiliki QR unik dan panitia memiliki scanner serta dashboard check-in.', ['Seluruh Event Registration', 'QR unik peserta', 'Scanner melalui browser web/seluler', 'Status dan waktu check-in', 'Dashboard serta ekspor kehadiran'], 'E03 — EventGate', 'Menambah identitas peserta dan workflow operasional di lokasi.'),
  pkg('KOMERSIAL EVENT', 'Event Ticketing + QRIS', 'Rp3.499.000+', 'Conference, expo, atau event berbayar dengan tipe dan kuota tiket.', 'Menyatukan checkout, pembayaran, penerbitan tiket, check-in QR, dan laporan.', ['Tipe tiket, harga, dan kuota', 'Checkout serta data pembeli/peserta', 'Payment gateway QRIS', 'Pelacakan pembayaran', 'Tiket digital dan QR', 'Scanner, penjualan, dan laporan kehadiran'], 'E04 — Tech Conference Ticketing', 'Alur komersial event penuh; biaya provider tetap terpisah.'),
];

const institutionOps = [
  pkg('OPERASIONAL INSTITUSI', 'Operational Lite', 'Rp1.999.000+', 'Lembaga dengan satu modul operasional.', 'Mengelola satu basis data, dashboard, dan status.', ['1 modul', 'Database', 'Dashboard', 'Pelacakan status'], 'I02 — EduAdmin Lite', 'Satu modul operasional.'),
  pkg('OPERASIONAL INSTITUSI', 'Operational Standard', 'Rp2.999.000+', 'Lembaga dengan 2–3 modul.', 'Menghubungkan data, dokumen, dan laporan antar modul.', ['2–3 modul', 'Data terintegrasi', 'Dokumen', 'Pelaporan'], 'I02 — EduAdmin Lite', 'Beberapa modul terintegrasi.'),
  pkg('OPERASIONAL INSTITUSI', 'Operational Pro', 'Rp4.499.000+', 'Lembaga dengan workflow kompleks.', 'Menjalankan multi-role, approval, QR/payment, dan reporting.', ['Multi-role', 'Approval', 'QR atau pembayaran', 'Pelaporan lanjutan'], 'I03 — Masjid Program Manager', 'Workflow institusi yang kompleks; scope wajib ditetapkan per lembaga.'),
];

const commerce = [
  pkg('E-COMMERCE', 'E-Commerce Starter', 'Rp2.499.000+', 'UMKM yang ingin toko online sendiri tanpa payment gateway otomatis.', 'Menjual produk melalui storefront, cart, checkout, lalu diproses admin.', ['Storefront dan CMS', 'Manajemen produk/kategori', 'Cart dan checkout', 'Manajemen order serta dashboard admin', 'Instruksi pembayaran manual atau konfirmasi sederhana'], 'C01 — Lunara Store', 'Fondasi commerce; belum ada konfirmasi pembayaran otomatis.'),
  pkg('E-COMMERCE', 'E-Commerce Payment', 'Rp3.499.000+', 'UMKM yang membutuhkan pembayaran QRIS otomatis.', 'Status checkout dan pembayaran tersinkron agar order lebih mudah diproses.', ['Seluruh Starter', 'Payment gateway QRIS', 'Status dan pelacakan pembayaran', 'Invoice/receipt', 'Penanganan callback/webhook'], 'C02 — Lunara Pay', 'Menambahkan siklus pembayaran otomatis.'),
  pkg('OPERASI COMMERCE', 'E-Commerce Business', 'Rp4.999.000+', 'Toko online yang mulai membutuhkan inventory dan reporting.', 'Menjalankan operasi penjualan lebih lengkap, bukan hanya menerima order.', ['Voucher dan promo', 'Inventory sederhana', 'Manajemen pelanggan', 'Laporan penjualan', 'Integrasi pengiriman sesuai provider', 'Pemisahan role admin dasar bila diperlukan'], 'C03 — Lunara Commerce', 'Naik dari checkout menjadi operasi commerce.'),
  pkg('COMMERCE LANJUTAN', 'E-Commerce Advanced', 'Rp7.500.000+', 'Brand atau growing retail dengan kebutuhan kompleks.', 'Commerce system dengan role, inventory/promotion lanjutan, return/refund, dan integrasi.', ['Role permission lanjutan', 'Pergerakan stok/multi-lokasi dasar sesuai scope', 'Aturan promosi lanjutan', 'Workflow return/refund', 'Integrasi eksternal/API', 'Analytics dan laporan lebih luas'], 'C04 — CommerceOps', 'Bila multi-vendor, pindahkan ke kategori Marketplace.'),
];

const pos = [
  pkg('POS', 'POS Lite', 'Rp2.250.000+', 'Satu outlet.', 'Menjalankan kasir dan transaksi dasar.', ['Kasir', 'Produk', 'Stok dasar', 'Transaksi dan receipt', 'Laporan shift/hari'], 'POS01 — Rasa Raya Cafe', 'Fondasi kasir satu outlet.'),
  pkg('POS', 'POS Business', 'Rp3.500.000+', 'Retail atau F&B aktif.', 'Menghubungkan transaksi dengan operasi inventory.', ['Seluruh POS Lite', 'Inventory', 'Supplier dan purchase', 'Expense', 'Pelanggan'], 'POS01 — Rasa Raya Cafe', 'Menambah pembelian, supplier, biaya, dan inventory.'),
  pkg('POS', 'POS Pro', 'Rp5.000.000+', 'Operasi kasir yang lebih lanjut.', 'Mendukung banyak kasir, permission, pergerakan stok, dan payment.', ['Multi-cashier', 'Role dan permission', 'Stock movement', 'Integrasi QRIS', 'Pelaporan lanjutan'], 'POS01 — Rasa Raya Cafe', 'Operasi POS multi-pengguna dan lebih terkontrol.'),
];

const booking = [
  pkg('BOOKING', 'Booking Basic', 'Rp1.500.000+', 'Reservasi sederhana.', 'Menerima reservasi dengan availability dan status dasar.', ['Form booking', 'Ketersediaan dasar', 'Status reservasi'], 'B01 — UrbanCut Barbershop', 'Satu alur reservasi sederhana.'),
  pkg('BOOKING', 'Booking Business', 'Rp2.500.000+', 'Bisnis dengan calendar, capacity, atau payment.', 'Mengelola time slot, pelanggan, notifikasi, dan pembayaran opsional.', ['Kalender dan time slot', 'Kapasitas', 'Database pelanggan', 'Notifikasi', 'Pembayaran opsional'], 'B01 — UrbanCut Barbershop', 'Menambah pengaturan slot dan kapasitas.'),
  pkg('BOOKING', 'Booking Pro', 'Rp4.000.000+', 'Bisnis dengan beberapa resource, ruang, atau staf.', 'Mengalokasikan resource dengan aturan dan laporan.', ['Multi-resource/staf/ruang', 'Aturan penjadwalan', 'Alokasi resource', 'Pelaporan'], 'B01 — UrbanCut Multi-Resource', 'Penjadwalan kompleks untuk banyak resource.'),
];

const crm = [
  pkg('CRM', 'CRM Lite', 'Rp2.500.000+', 'Pipeline penjualan sederhana.', 'Menyimpan lead, pelanggan, status, dan catatan dalam dashboard.', ['Lead dan pelanggan', 'Status pipeline', 'Catatan', 'Dashboard'], 'CRM01 — Nexa Sales CRM', 'Fondasi pipeline sederhana.'),
  pkg('CRM', 'CRM Business', 'Rp4.000.000+', 'Tim penjualan aktif.', 'Mengelola assignment, follow-up, quotation, aktivitas, dan laporan.', ['Assignment', 'Follow-up', 'Quotation', 'Aktivitas', 'Pelaporan'], 'CRM01 — Nexa Sales CRM', 'Kolaborasi tim sales dan aktivitas terstruktur.'),
  pkg('CRM', 'CRM Pro', 'Rp6.000.000+', 'Workflow sales khusus dan terintegrasi.', 'Mengotomasi pipeline dengan approval dan integrasi.', ['Automation', 'Approval', 'Timeline aktivitas', 'Integrasi eksternal', 'Pelaporan lanjutan'], 'CRM01 — Nexa Sales CRM Pro', 'Workflow CRM khusus dan automation.'),
];

const corporate = [
  pkg('CORPORATE', 'Corporate Website', 'Rp2.500.000+', 'CV/PT kecil-menengah yang membutuhkan company profile profesional.', 'Membangun corporate presence yang kredibel dan mudah dikelola.', ['Corporate website dan CMS', 'Service/product dan portfolio/project', 'Team, testimonial, dan news/blog', 'Form kontak/lead dasar', 'SEO, analytics, domain, dan hosting'], 'COR01 — Nexa Prima Consulting', 'Branding dan standar UX/review lebih tinggi daripada UMKM.'),
  pkg('CORPORATE', 'Corporate Professional', 'Rp3.500.000+', 'Corporate dengan struktur konten lebih banyak dan employer/public presence aktif.', 'Menjadikan website pusat informasi perusahaan yang lengkap.', ['Seluruh Corporate Website', 'Careers/job content', 'News/insight lebih luas', 'Lebih banyak content type dan section', 'UX, SEO/content architecture, dan analytics lebih kuat'], 'COR02 — Nexa Group', 'Lebih dalam pada arsitektur informasi; belum menjadi business system.'),
  pkg('CORPORATE BUSINESS', 'Corporate Business', 'Rp5.000.000+', 'Perusahaan yang ingin website terhubung dengan proses sales/request.', 'Lead dan request pelanggan mulai dikelola sebagai proses bisnis.', ['Corporate CMS', 'Database lead/request pelanggan', 'Unggah dan manajemen dokumen dasar', 'Alur quotation/request', 'Dashboard admin, status, dan laporan'], 'COR03 — Nexa Client Portal Lite', 'Masuk ke database dan workflow, bukan sekadar konten corporate.'),
];

const corporateOps = [
  pkg('OPERASIONAL CORPORATE', 'Operational Lite', 'Rp5.000.000+', 'Satu hingga dua workflow.', 'Dashboard, database, role, tracking, dan laporan untuk proses terbatas.', ['1–2 workflow', 'Dashboard dan database', 'Role', 'Tracking', 'Laporan'], 'OPS01 — ProcureFlow', 'Sistem operasional terfokus.'),
  pkg('OPERASIONAL CORPORATE', 'Operational Standard', 'Rp7.500.000+', 'Tiga hingga lima modul.', 'Menghubungkan staf, pelanggan, transaksi, dokumen, dan workflow.', ['3–5 modul', 'Staf dan pelanggan', 'Transaksi dan dokumen', 'Workflow', 'Laporan'], 'OPS01 — ProcureFlow', 'Beberapa modul operasional terintegrasi.'),
  pkg('OPERASIONAL CORPORATE', 'Operational Pro', 'Rp10.000.000+', 'Proses lintas fungsi.', 'Mengendalikan approval, catatan finansial, audit, dan laporan rinci.', ['Approval', 'Catatan finance', 'Audit log', 'Laporan rinci'], 'OPS01 — ProcureFlow', 'Operasi lintas proses dengan governance lebih kuat.'),
  pkg('ENTERPRISE OPERATIONAL', 'Enterprise Operational', 'Rp15.000.000+ / Custom', 'Multi-branch atau multi-divisi.', 'Sistem berskala besar dengan SLA, integrasi, keamanan, audit, dan scale.', ['Multi-branch/divisi', 'SLA', 'Integrasi', 'Security', 'Audit', 'Scale'], 'Prototype sesuai kasus', 'Wajib discovery dan technical scoping.'),
];

const government = [
  pkg('PEMERINTAHAN', 'Government Website + CMS', 'Rp5.000.000+', 'Desa, lembaga, unit pemerintah, atau instansi yang membutuhkan portal informasi.', 'Portal informasi publik yang terstruktur dan dapat dikelola admin.', ['Profil dan organisasi', 'Berita, agenda, dan pengumuman', 'Dokumen/publikasi', 'Galeri', 'CMS dan admin', 'SEO/aksesibilitas dasar sesuai scope'], 'GOV01 — Portal Desa Sukamaju', 'Floor pemerintah berlaku karena requirement dan stakeholder berbeda.'),
  pkg('TATA KELOLA PUBLIK', 'Government Professional', 'Rp7.500.000+', 'Instansi dengan PPID, informasi publik, complaint, form, dan multi-admin.', 'Mengelola publikasi dan interaksi publik secara lebih terstruktur.', ['Seluruh Government Website', 'PPID/informasi publik dasar', 'Complaint/contact/form', 'Multi-admin', 'Manajemen dokumen, kategori, filter, pencarian', 'Laporan submission dasar'], 'GOV02 — PublicInfo Portal', 'Naik menjadi tata kelola konten dan interaksi publik.'),
  pkg('LAYANAN PUBLIK', 'Digital Public Service', 'Rp10.000.000+', 'Layanan pengajuan atau permohonan digital masyarakat.', 'Masyarakat submit dan melacak; staf memverifikasi dan menyetujui.', ['Submission publik', 'Unggah dokumen', 'Nomor referensi dan tracking', 'Dashboard staf', 'Workflow status/verifikasi/approval', 'Notifikasi dasar', 'Laporan dan ekspor'], 'GOV03 — e-Layanan', 'Ini aplikasi layanan, bukan website informasi.'),
  pkg('PEMERINTAH TERINTEGRASI', 'Government Integrated', 'Rp15.000.000+', 'Instansi dengan proses lintas unit/role atau integrasi eksternal.', 'Mendukung workflow multi-unit, audit, dan laporan yang kompleks.', ['Multi-role dan multi-unit', 'Rantai approval', 'Audit trail lebih luas', 'API/integrasi sesuai scope', 'Pelaporan lanjutan', 'Security review lebih dalam'], 'GOV04 — GovFlow', 'Untuk dampak operasional tinggi; di atasnya gunakan custom enterprise.'),
  pkg('ENTERPRISE PEMERINTAH', 'Government Enterprise', 'Custom', 'Kebutuhan publik berskala besar atau strategis.', 'Platform khusus dengan security, SLA, integrasi, dan kebijakan infrastruktur.', ['Security review', 'SLA', 'Integrasi kompleks', 'Kebijakan infrastruktur', 'Audit dan compliance'], 'Prototype sesuai kasus', 'Discovery dan quotation khusus wajib.'),
];

const healthcare = [
  pkg('HEALTHCARE', 'Clinic Website + CMS', 'Rp2.500.000+', 'Klinik yang membutuhkan profil digital.', 'Mengelola dokter, layanan, jadwal, artikel, dan konten.', ['Profil klinik', 'Dokter dan layanan', 'Jadwal', 'Artikel', 'CMS'], 'HC01 — Klinik Sehat Sentosa', 'Website klinik yang dapat dikelola.'),
  pkg('HEALTHCARE', 'Clinic + Booking', 'Rp3.500.000+', 'Klinik dengan appointment.', 'Menghubungkan jadwal dokter, booking, dan database kontak pasien.', ['Jadwal dokter', 'Booking', 'Database kontak pasien'], 'HC01 — Klinik Sehat Sentosa', 'Menambah appointment workflow.'),
  pkg('OPERASI KLINIK', 'Clinic Management Lite', 'Rp7.500.000+', 'Operasional klinik ringan.', 'Mengelola pasien, kunjungan, billing dasar, stok, role, dan laporan.', ['Pasien/kontak', 'Visit', 'Billing dasar', 'Stok obat dasar', 'Role', 'Laporan'], 'HC02 — ClinicOps', 'Operasional ringan dengan dummy data non-sensitif pada demo.'),
  pkg('SISTEM HEALTHCARE', 'Healthcare System', 'Rp15.000.000+', 'Healthcare dengan multi-workflow.', 'Menjalankan role dan workflow lanjutan dengan integrasi serta keamanan.', ['Role lanjutan', 'Multi-workflow', 'Integrasi', 'Security review'], 'Prototype sesuai discovery', 'Data sensitif mengubah model delivery.'),
  pkg('ENTERPRISE HEALTHCARE', 'Hospital / Enterprise', 'Custom', 'Rumah sakit atau layanan kesehatan skala besar.', 'Platform multi-departemen dengan audit, integrasi, SLA, dan keamanan.', ['Multi-departemen', 'Audit', 'Integrasi', 'SLA', 'Security'], 'Prototype sesuai kasus', 'Discovery dan security review wajib.'),
];

const enterprise = [
  pkg('PERANGKAT LUNAK KHUSUS', 'Custom Business Software', 'Rp5.000.000+', 'Bisnis yang membutuhkan aplikasi internal khusus tetapi belum sekelas ERP.', 'Membangun perangkat lunak spesifik untuk satu masalah atau workflow utama.', ['Database khusus', 'Dashboard/admin', 'Role dasar', 'Workflow sesuai scope', 'Pelaporan', 'Integrasi opsional'], 'SW01 — ServiceDesk Custom', 'Bukan paket modul baku; scope ditetapkan melalui discovery.'),
  pkg('ERP', 'ERP Lite', 'Rp10.000.000+', 'Bisnis yang membutuhkan beberapa modul internal terintegrasi.', 'Mengintegrasikan 3–5 modul dalam master data dan role system.', ['Dashboard inti', '3–5 modul sederhana-menengah', 'Master data', 'Role', 'Approval dasar', 'Pelaporan', 'Import/export dasar'], 'ERP01 — NexaERP Lite', 'Lebih kompleks daripada aplikasi operasional satu tujuan.'),
  pkg('ERP', 'ERP Business', 'Rp15.000.000+', 'Bisnis menengah dengan workflow lintas modul yang lebih kompleks.', 'Menjalankan proses lintas departemen dengan reporting dan approval yang kuat.', ['5+ modul sesuai discovery', 'Workflow lintas modul', 'Approval lebih luas', 'Catatan finance/operasional dasar', 'Pelaporan lanjutan', 'Audit activity', 'Integrasi opsional'], 'ERP02 — NexaERP Business', 'Lebih luas dan saling bergantung; biasanya perlu discovery formal.'),
  pkg('SAAS', 'SaaS Platform', 'Rp12.500.000+', 'Founder atau perusahaan yang membangun produk multi-user/multi-tenant.', 'Membentuk fondasi produk yang digunakan banyak akun atau organisasi.', ['Authentication', 'Pemisahan user/organization/tenant', 'Workflow produk inti', 'Subscription/payment bila diperlukan', 'Dashboard user dan super admin', 'Email/notifikasi dasar', 'Usage/reporting dasar'], 'SAAS01 — Flowdesk', 'Tenancy dan lifecycle akun menambah kompleksitas arsitektur.'),
  pkg('MARKETPLACE', 'Marketplace', 'Rp15.000.000+', 'Platform yang mempertemukan pembeli dengan vendor/provider.', 'Mendukung marketplace multisisi dengan vendor, order, dan aturan transaksi.', ['Akun pembeli', 'Onboarding vendor/provider', 'Katalog/listing/service', 'Pencarian dan filter', 'Order/booking', 'Komisi/payment flow sesuai provider', 'Moderasi dan dashboard admin'], 'MKT01 — ServiceHub', 'Sistem multisisi jauh lebih kompleks daripada e-commerce satu merchant.'),
  pkg('ENTERPRISE', 'Enterprise Platform', 'Rp25.000.000+ / Custom', 'Enterprise, multi-branch, mission-critical, atau kebutuhan strategis.', 'Membangun sistem dengan arsitektur, governance, integrasi, security, dan support khusus.', ['Multi-branch/divisi', 'Role/permission kompleks', 'Approval/workflow', 'Audit trail', 'API/integrasi', 'Security review', 'Arsitektur deployment/infra', 'SLA/support terpisah'], 'Prototype atau architecture walkthrough sesuai kasus', 'Tidak dijual sebagai fixed-scope package; discovery wajib.'),
];

const flowHTML = (steps) => `<div class="capability-flow" style="--count:${steps.length}">${steps.map((s, i) => `<div class="cap-step"><small>${String(i + 1).padStart(2, '0')}</small>${s}</div>`).join('')}</div>`;

const compactCard = (p, selected = false) => `<article class="card ${selected ? 'selected' : ''}"><div class="card-inner"><div class="card-kicker">${p.kategori}</div><h3>${p.nama}</h3><div class="price">${p.harga}</div><p class="outcome">${p.outcome}</p><ul class="feature-list">${p.termasuk.slice(0, 4).map((x) => `<li>${x}</li>`).join('')}</ul><div class="card-foot"><span>DEMO</span><span>↗ ${p.demo}</span></div></div></article>`;

const fullCard = (p, selected = false) => `<article class="card detail-card ${selected ? 'selected' : ''}"><div class="card-inner"><div class="detail-head"><div><div class="card-kicker">${p.kategori}</div><h3>${p.nama}</h3></div><div class="price">${p.harga}</div></div><div class="detail-meta"><div><b>COCOK UNTUK</b><p>${p.cocok}</p></div><div><b>HASIL UTAMA</b><p>${p.outcome}</p></div></div><div class="detail-scope"><b>TERMASUK DALAM CAKUPAN ACUAN</b><ul class="feature-list">${p.termasuk.map((x) => `<li>${x}</li>`).join('')}</ul></div><div class="detail-foot"><span><b>DEMO ACUAN</b>${p.demo}</span><span><b>PEMBEDA UTAMA</b>${p.pembeda}</span></div>${p.catatan ? `<p class="detail-note">${p.catatan}</p>` : ''}</div></article>`;

const compactGrid = (items, cls = '') => `<div class="grid package-grid ${cls} cols-${Math.min(items.length, 6)}">${items.map((p, i) => compactCard(p, i === items.length - 1)).join('')}</div>`;
const detailGrid = (items, cls = '') => `<div class="grid detail-grid ${cls} cols-${items.length}">${items.map((p, i) => fullCard(p, i === items.length - 1)).join('')}</div>`;

const mockup = (name) => `<div class="mockup"><div class="browser-bar"><i></i><i></i><i></i><span>${name}</span></div><div class="mock-body"><aside class="side-rail"><span></span><span></span><span></span><span></span><span></span></aside><div class="dash"><div class="stat-row"><div class="stat">TOTAL<b>1.284</b></div><div class="stat">AKTIF<b>86</b></div><div class="stat">MENUNGGU<b>24</b></div></div><div class="chart"><i></i><i></i><i></i><i></i></div></div></div></div>`;
const base = (eyebrow, title, sub = '', body = '', dark = false, extra = '') => ({ dark, html: `<p class="eyebrow">${eyebrow}</p><h1 class="headline ${extra}">${title}</h1>${sub ? `<p class="subhead">${sub}</p>` : ''}${body}` });
const packagesSlide = (eyebrow, title, sub, items, flow = [], cls = '') => base(eyebrow, title, sub, `${flow.length ? flowHTML(flow) : ''}${compactGrid(items, cls)}`);
const detailSlide = (eyebrow, title, sub, items, cls = '') => base(eyebrow, title, sub, detailGrid(items, cls));
const showcase = (eyebrow, p, steps, note = '') => base(eyebrow, p.nama, p.outcome, `<div class="split detail-showcase"><div>${fullCard(p, true)}</div><div>${mockup(p.demo)}${flowHTML(steps)}${note ? `<p class="showcase-note">${note}</p>` : ''}</div></div>`);
const divider = (chapter, title, sub, badge) => ({ dark: true, html: `<div class="divider-layout"><div><p class="eyebrow">BAB ${chapter}</p><h1 class="headline">${title}</h1><p class="subhead">${sub}</p><span class="label-chip lime">${badge}</span></div><div class="divider-bars"><i style="height:15%"></i><i style="height:29%"></i><i style="height:46%"></i><i style="height:66%"></i><i style="height:90%"></i></div></div>` });
const infoCards = (items, cols = 3, selected = -1) => `<div class="grid cols-${cols}">${items.map((x, i) => `<article class="card ${i === selected ? 'selected' : ''}"><div class="card-inner"><span class="issue-no">${String(i + 1).padStart(2, '0')}</span><h3>${x[0]}</h3><p class="outcome">${x[1]}</p></div></article>`).join('')}</div>`;

const slides = [
  { dark: true, html: `<div class="cover-content"><div class="cover"><span class="label-chip lime">MASTER INTERNAL FINAL</span><h1 class="headline">PRICING MASTER<br>FINAL 2026</h1><p class="subhead">Katalog Layanan • Benchmark Harga • Scope • Demo • Kerangka Quotation</p></div><div class="orbital"><div class="core">SOLIVATE<br>2026</div><b></b><b></b><b></b><b></b></div></div>` },
  base('SISTEM HARGA', 'Lebih dari sekadar daftar harga.', 'Satu sistem untuk positioning produk, perlindungan scope, demo, estimasi, dan quotation.', `<div class="split equal"><article class="card"><div class="card-inner"><span class="label-chip">SEBELUMNYA</span><h3 class="large-card-title">Daftar harga</h3><p class="subhead">Harga → jumlah fitur.</p></div></article><article class="card dark-card"><div class="card-inner"><span class="label-chip lime">SISTEM 2026</span><div class="grid cols-2 system-list">${['Katalog Produk', 'Benchmark Harga', 'Kerangka Scope', 'Library Demo', 'Sistem Quotation'].map((x) => `<div><h3>${x}</h3></div>`).join('')}</div></div></article></div>`),
  base('ALASAN REVISI', 'Delapan masalah yang diperbaiki.', '', infoCards([
    ['Perbedaan Tier', 'Perbedaan antar paket terlalu tipis dan tidak sebanding dengan selisih harga.'],
    ['Scope Terlalu Berat', 'Paket murah sudah membawa CMS, dashboard, database, workflow, atau garansi panjang.'],
    ['Floor Business', 'Kategori Business dan Corporate belum konsisten di atas Rp2 juta.'],
    ['Floor Government', 'Kategori Government belum konsisten mulai Rp5 juta.'],
    ['Kelas Produk', 'ERP, SaaS, dan Marketplace masih di bawah positioning arsitekturnya.'],
    ['Demo Penjualan', 'Belum ada demo yang langsung mewakili tiap paket.'],
    ['Skala Klien', 'Belum ada mekanisme formal untuk dampak operasional dan risiko.'],
    ['Pemisahan Informasi', 'Logika internal dan pricelist publik masih tercampur.'],
  ], 4, 4)),
  base('PRINSIP DASAR', 'Capability dan workload menentukan harga.', 'Ukuran klien tidak boleh menjadi alasan markup tanpa tambahan beban kerja, risiko, stakeholder, load, SLA, atau compliance.', infoCards([
    ['Outcome Dulu', 'Setiap paket harus menjelaskan hasil bisnis, bukan hanya fitur.'],
    ['Peningkatan Capability', 'Informasi → CMS → database → workflow → multi-role → enterprise.'],
    ['Benchmark, Bukan Harga Tetap', 'Angka adalah anchor scope representatif.'],
    ['Quotation Spesifik Proyek', 'Harga final mengikuti hasil discovery dan scope aktual.'],
    ['Biaya Pihak Ketiga Terpisah', 'Provider mengikuti kebutuhan dan harga aktual.'],
    ['Discovery untuk Kompleksitas', 'Kebutuhan kompleks atau lintas kategori tidak dipaksa masuk paket.'],
    ['Penyesuaian Berbasis Beban', 'Adjustment harus punya alasan konkret.'],
    ['Perlindungan Scope', 'Perubahan setelah persetujuan menjadi change request.'],
  ], 4, 1)),
  { dark: true, html: `<p class="eyebrow">PESAN INTI</p><h1 class="headline">Harga berdasarkan capability.</h1><p class="subhead">Yang berubah bukan sekadar jumlah fitur, tetapi jenis masalah bisnis yang dapat diselesaikan.</p><div class="ladder">${[['WEBSITE', 'Informasi & branding', 'Rp299rb+'], ['CMS', 'Kelola konten', 'Rp799rb+'], ['BUSINESS', 'Kelola data & proses', 'Rp2,25jt+'], ['OPERATIONAL', 'Kelola operasi tim', 'Rp4,99jt+'], ['ENTERPRISE', 'Kelola skala & governance', 'Rp10jt+']].map((x, i) => `<div class="ladder-item" style="height:${34 + i * 9}%"><h3>${x[0]}</h3><p>${x[1]}</p><b>${x[2]}</b></div>`).join('')}</div>` },
  base('BAHASA HARGA', 'Benchmark bukan penawaran final.', '', `<div class="big-equation"><strong>BENCHMARK</strong><span>≠</span><strong>PENAWARAN FINAL</strong></div>${infoCards([
    ['Harga Acuan', 'Patokan untuk cakupan representatif atau normal.'], ['Batas Harga Kategori', 'Guardrail harga minimum internal.'], ['Penyesuaian Cakupan', 'Penyesuaian karena kebutuhan aktual.'], ['Tambahan / Integrasi', 'Capability di luar paket dasar.'], ['Penawaran Final', 'Harga yang ditawarkan setelah pendalaman kebutuhan.'], ['Permintaan Perubahan', 'Perubahan setelah cakupan disetujui.'],
  ], 3, 4)}`),
  base('LOGIKA ESTIMASI', 'Mesin penentuan penawaran.', 'Alat bantu estimasi terstruktur, bukan kalkulator harga otomatis.', flowHTML(['Benchmark paket', 'Penyesuaian cakupan', 'Fitur/tambahan', 'Kompleksitas', 'Integrasi', 'Urgensi', 'Dukungan/SLA', 'PENAWARAN FINAL'])),
  base('WORKFLOW LAPANGAN', 'Sembilan tahap yang terkendali.', '', `${flowHTML(['Discovery', 'Paket anchor', 'Baseline scope', 'Kompleksitas & skala', 'Gap & add-on', 'Risiko komersial', 'Floor & margin', 'Quotation', 'Freeze scope'])}${infoCards([['PAHAMI', 'Tahap 1–3: objective, anchor, dan batas scope.'], ['ESTIMASI', 'Tahap 4–6: effort, gap, dan risiko.'], ['KOMIT', 'Tahap 7–9: validasi, proposal, dan scope freeze.']], 3, 2)}`),
  base('SKALA KLIEN', 'Panduan workload, bukan markup otomatis.', '', `<div class="staircase">${[['S1', 'PERSONAL / MICRO', 'Base', '1–3 admin, traffic rendah, stakeholder sedikit.'], ['S2', 'SMALL BUSINESS', 'Base + 0–10%', 'Konten/user lebih banyak; operasional mulai aktif.'], ['S3', 'MID-MARKET', '+10–25%', 'Stakeholder, data, integrasi, dan QA bertambah.'], ['S4', 'LARGE BUSINESS', '+25–50%', 'Load, approval, security, reporting, dan support naik.'], ['S5', 'ENTERPRISE', 'Custom', 'SLA, compliance, multi-branch, audit, integrasi kompleks.']].map((x, i) => `<article class="stair" style="height:${34 + i * 10}%"><span class="mini-chip ${i === 4 ? 'lime' : ''}">${x[0]}</span><h3>${x[1]}</h3><b>${x[2]}</b><p>${x[3]}</p></article>`).join('')}</div>`),
  base('TINGKAT KOMPLEKSITAS', 'Empat kelas implementasi.', '', `<div class="staircase">${[['A — SEDERHANA', '0%', ['1 role dan 1 workflow', 'Sedikit entity/data', 'Tanpa integrasi eksternal']], ['B — STANDAR', '+10–20%', ['2–3 role', 'Laporan, notifikasi, search/filter', 'Beberapa workflow']], ['C — LANJUTAN', '+25–50%', ['Multi-role dan approval', 'Payment/API/automation', 'Laporan kompleks']], ['D — ENTERPRISE', 'Custom', ['Multi-branch', 'Audit, security, SLA', 'High availability']]].map((x, i) => `<article class="stair" style="height:${39 + i * 13}%"><h3>${x[0]}</h3><b>${x[1]}</b>${x[2].map((v) => `<p>${v}</p>`).join('')}</article>`).join('')}</div>`),
  { dark: true, html: `<p class="eyebrow">DAFTAR DISCOVERY</p><h1 class="headline">Tanpa discovery, tidak ada harga final.</h1><p class="subhead">Pertanyaan wajib sebelum quotation dikunci.</p><div class="grid cols-3 discovery-grid">${[
    ['Pengguna & Role', 'Berapa admin, staf, pelanggan, branch, atau outlet?'], ['Workflow', 'Apa proses awal–akhir? Ada approval dan status bertingkat?'], ['Modul & Data', 'Berapa modul, transaksi, laporan, dokumen, dan media?'], ['Integrasi', 'Payment, WhatsApp, OTP, maps, shipping, API, SSO, import?'], ['Keamanan', 'Apakah data sensitif, regulated, atau butuh audit log?'], ['Deadline', 'Ada tanggal event, launch, campaign, atau urgency?'], ['Support', 'Garansi bug, maintenance, on-call, atau SLA?'], ['Deployment', 'Server sendiri, staging, source handover, atau environment khusus?'], ['Stakeholder', 'Berapa reviewer dan jalur approval?'],
  ].map((x, i) => `<article class="card dark-card ${i === 8 ? 'selected' : ''}"><div class="card-inner"><span class="issue-no">0${i + 1}</span><h3>${x[0]}</h3><p class="outcome">${x[1]}</p></div></article>`).join('')}</div>` },

  divider('02', 'PRESENSI<br>DIGITAL', 'Personal • Wedding • Institusi', 'DARI ONLINE → KELOLA KONTEN'),
  packagesSlide('PERSONAL / NON-PROFIT', 'Jalur peningkatan dari presensi hingga publikasi.', 'Entry product untuk personal branding, portofolio, blog, dan publikasi personal.', personal, ['Landing Page', 'Multipage', 'CMS', 'Workflow Publikasi']),
  detailSlide('DETAIL PERSONAL', 'Personal Basic dan Standard', 'Perbedaan harga membeli struktur, kredibilitas, domain, revisi, dan garansi yang lebih kuat.', personal.slice(0, 2)),
  detailSlide('DETAIL PERSONAL', 'CMS dan workflow publikasi', 'Capability berubah dari website personal menjadi pengelolaan konten dan publishing.', personal.slice(2, 4)),
  packagesSlide('WEDDING', 'Dari undangan ke operasi tamu.', 'Dua demo utama memperlihatkan perbedaan website undangan dan sistem guest management.', wedding, ['Undangan', 'Interaktif', 'Database Tamu', 'QR Check-in', 'Operasi Tamu'], 'dense'),
  packagesSlide('INSTITUSI NON-PEMERINTAH', 'Presensi untuk komunitas, yayasan, dan lembaga sosial.', 'Demo Yayasan Al-Falah dapat diperlihatkan dalam mode profil maupun CMS.', institution, ['Campaign', 'Profil', 'CMS', 'Fungsi Institusi']),
  base('KETENTUAN DASAR', 'Batas scope yang melindungi harga entry-level.', 'Ketentuan ini berlaku sebagai fondasi sebelum detail paket dan quotation proyek.', infoCards([
    ['Proyek < Rp400rb', 'Menggunakan subdomain Solivate kecuali disepakati lain.'], ['Proyek ≥ Rp400rb', 'Dapat mencakup domain umum 1 tahun sesuai ketersediaan dan proposal.'], ['Domain Khusus', '.id, .co.id, .or.id, .sch.id mengikuti syarat dan harga registrar.'], ['Hosting & SSL', 'Termasuk sesuai paket; server khusus, storage, CDN, atau database berbayar terpisah.'], ['Garansi', 'Hanya bug/error development dalam scope yang disetujui.'], ['Biaya Provider', 'Payment, WhatsApp, email/SMS/OTP, maps, shipping, dan AI API terpisah.'],
  ], 3, 3)),

  divider('03', 'SISTEM<br>BISNIS', 'Dari presensi digital menuju operasi nyata.', 'DATA → TRANSAKSI → WORKFLOW'),
  detailSlide('UMKM — PRESENSI DIGITAL', 'Landing, multipage, lalu CMS.', 'Konten dikelola developer pada Basic/Standard; Premium mengubah capability menjadi self-service CMS.', umkmPresence),
  packagesSlide('UMKM — SISTEM BISNIS', 'Apa yang berubah ketika klien membayar lebih?', 'Category floor Business/System berada di atas Rp2 juta.', business, ['Lead', 'Order', 'Multi-Staf', 'Operasi Internal']),
  showcase('UMKM BUSINESS LITE', business[0], ['Form konsultasi', 'Database lead', 'Baru', 'Dihubungi', 'Qualified', 'Closed'], 'CMS → DATA PELANGGAN'),
  showcase('UMKM BUSINESS', business[1], ['Pelanggan', 'Order', 'Diproses', 'Siap', 'Selesai', 'Invoice'], 'LEAD → SIKLUS TRANSAKSI'),
  showcase('UMKM BUSINESS PRO', business[2], ['Booking', 'Verifikasi', 'Invoice', 'Status pembayaran', 'Dokumen', 'Selesai'], 'MULTI-STAF • NOTIFIKASI • PELAPORAN'),
  showcase('UMKM OPERATIONAL', business[3], ['Staf', 'Pelanggan', 'Transaksi', 'Dokumen', 'Workflow', 'Laporan'], 'PERANGKAT LUNAK OPERASIONAL HARIAN'),

  divider('03', 'EVENT', 'Pengalaman → operasi peserta → commerce.', 'CAMPAIGN → KONTEN → PEMBAYARAN'),
  packagesSlide('PETA PAKET EVENT', 'Setiap tier menambah capability operasional baru.', 'Benchmark bertambah ketika data peserta, identitas QR, dan pembayaran masuk ke sistem.', eventPackages, ['Promosi', 'Konten', 'Peserta', 'Check-in', 'Transaksi'], 'dense'),
  detailSlide('DETAIL EVENT', 'Event Landing dan Event + CMS', 'Website campaign berubah menjadi konten yang dikelola panitia sendiri.', eventPackages.slice(0, 2)),
  showcase('EVENT REGISTRATION', eventPackages[2], ['Registrasi', 'Konfirmasi', 'Database peserta'], 'DATA PESERTA TERSIMPAN DI SISTEM'),
  showcase('EVENT REGISTRATION + QR', eventPackages[3], ['Daftar', 'QR pass', 'Scan', 'Kehadiran'], 'IDENTITAS DIGITAL + OPERASI LOKASI'),
  showcase('EVENT TICKETING + QRIS', eventPackages[4], ['Pilih tiket', 'Checkout', 'QRIS', 'Lunas', 'Tiket QR', 'Scan', 'Laporan'], 'BIAYA PROVIDER TETAP TERPISAH'),
  detailSlide('OPERASIONAL INSTITUSI', 'Modul menggantikan halaman.', 'Scope spesifik ditentukan per lembaga; contoh demo EduAdmin Lite dan Masjid Program Manager.', institutionOps),
  packagesSlide('E-COMMERCE', 'Dari storefront menuju operasi retail lanjutan.', 'Marketplace multi-vendor tidak masuk kategori ini.', commerce, ['Storefront', 'Pembayaran', 'Operasi Commerce', 'Retail Lanjutan']),
  showcase('E-COMMERCE STARTER', commerce[0], ['Storefront', 'Cart', 'Checkout', 'Order admin'], 'PEMBAYARAN MANUAL • SATU MERCHANT'),
  showcase('E-COMMERCE PAYMENT', commerce[1], ['Checkout', 'QRIS', 'Lunas', 'Invoice', 'Order admin'], 'CALLBACK / WEBHOOK PEMBAYARAN'),
  detailSlide('E-COMMERCE', 'Business dan Advanced', 'Inventory, role, return/refund, integrasi, dan analytics mengubahnya menjadi sistem operasi commerce.', commerce.slice(2, 4)),

  divider('04', 'PRODUK<br>OPERASIONAL', 'POS • Booking • CRM', 'ALAT KERJA HARIAN'),
  detailSlide('POINT OF SALE', 'POS Lite, Business, dan Pro', 'Demo Rasa Raya Cafe menunjukkan kasir dasar hingga multi-cashier, stock movement, dan integrasi pembayaran.', pos),
  base('CAPABILITY POS', 'Satu aplikasi, tiga kedalaman operasi.', 'Setiap tier menambahkan kontrol operasional, bukan hanya layar baru.', `<div class="split"><div>${mockup('POS01 — Rasa Raya Cafe')}</div><div class="tier-table">${[['Produk & transaksi', '●', '●', '●'], ['Stok dasar', '●', '●', '●'], ['Supplier & purchase', '—', '●', '●'], ['Expense & pelanggan', '—', '●', '●'], ['Multi-cashier & permission', '—', '—', '●'], ['Stock movement & QRIS', '—', '—', '●'], ['Pelaporan lanjutan', '—', '—', '●']].map((r, i) => `<div class="tier-row ${i === 0 ? 'tier-head' : ''}"><span>${r[0]}</span><b>${r[1]}</b><b>${r[2]}</b><b>${r[3]}</b></div>`).join('')}<div class="tier-labels"><span></span><b>LITE</b><b>BUSINESS</b><b>PRO</b></div></div></div>`),
  detailSlide('BOOKING', 'Dari reservasi sederhana ke multi-resource.', 'Demo UrbanCut: layanan → barber → tanggal → slot waktu → pelanggan → status.', booking),
  detailSlide('CRM', 'Dari lead ke pipeline penjualan terintegrasi.', 'Demo Nexa Sales CRM: capture → qualification → assignment → follow-up → quotation → won/lost.', crm),

  divider('05', 'SISTEM<br>CORPORATE', 'Presensi corporate → fungsi bisnis → operasi internal.', 'CATEGORY FLOOR > Rp2 JUTA'),
  packagesSlide('CORPORATE WEBSITE', 'Tiga kelas presensi dan fungsi bisnis.', 'Benchmark tetap menyesuaikan stakeholder, QA, workflow, risiko, dan support.', corporate, ['Corporate CMS', 'Content Operation', 'Business Function']),
  showcase('CORPORATE WEBSITE', corporate[0], ['Layanan', 'Proyek', 'Tim', 'Testimoni', 'Berita', 'Lead'], 'PRESENSI CORPORATE + CMS'),
  showcase('CORPORATE PROFESSIONAL', corporate[1], ['Careers', 'Newsroom', 'Case Study', 'Dokumen ESG', 'Multi-content CMS'], 'ARSITEKTUR INFORMASI LEBIH DALAM'),
  showcase('CORPORATE BUSINESS', corporate[2], ['Inquiry', 'Qualification', 'Quotation/request', 'Dokumen', 'Status'], 'KONTEN → FUNGSI BISNIS'),
  packagesSlide('OPERASIONAL CORPORATE', 'Dari workflow tunggal menuju enterprise operational.', 'Penawaran di bawah floor memerlukan exception dan approval internal.', corporateOps, ['1–2 Workflow', '3–5 Modul', 'Lintas Proses', 'Multi-Branch']),
  base('SHOWCASE OPERASIONAL', 'ProcureFlow', 'Demo terbaik untuk menunjukkan perbedaan Business Website dan true Operational System.', `<div class="split"><div>${mockup('OPS01 — ProcureFlow')}</div><div><span class="label-chip lime">Rp5JT+ → CUSTOM</span>${flowHTML(['Purchase request', 'Approval manager', 'Procurement', 'Vendor', 'Finance', 'Selesai', 'Laporan'])}<article class="card dark-card process-note"><div class="card-inner"><h3>Capability inti</h3><p>Role • approval • dokumen • status • audit • laporan</p></div></article></div></div>`),

  divider('05', 'PEMERINTAHAN<br>& LAYANAN PUBLIK', 'Informasi publik → interaksi → layanan → integrasi.', 'CATEGORY FLOOR ≥ Rp5 JUTA'),
  packagesSlide('PETA PAKET PEMERINTAHAN', 'Kebutuhan publik mengubah kelas pelaksanaan.', 'Pengadaan, aksesibilitas, dokumen publik, keamanan, hosting, kepatuhan, dan dukungan ikut dinilai.', government, ['Portal', 'Tata Kelola', 'Layanan', 'Lintas Unit', 'Enterprise'], 'dense'),
  showcase('GOVERNMENT WEBSITE', government[0], ['Profil', 'Organisasi', 'Berita', 'Agenda', 'Dokumen', 'Galeri'], 'PORTAL INFORMASI YANG DIKELOLA ADMIN'),
  showcase('GOVERNMENT PROFESSIONAL', government[1], ['PPID', 'Dokumen', 'Complaint', 'Multi-admin', 'Laporan'], 'TATA KELOLA KONTEN + INTERAKSI PUBLIK'),
  showcase('DIGITAL PUBLIC SERVICE', government[2], ['Pengajuan', 'Unggah', 'Nomor referensi', 'Verifikasi', 'Approval', 'Tracking', 'Hasil'], 'APLIKASI LAYANAN • BUKAN WEBSITE INFORMASI'),
  showcase('GOVERNMENT INTEGRATED', government[3], ['Masyarakat', 'Multi-unit', 'Rantai approval', 'API eksternal', 'Audit & laporan'], 'DAMPAK OPERASIONAL TINGGI'),
  packagesSlide('HEALTHCARE', 'Capability bertambah bersama sensitivitas data.', 'Demo menggunakan dummy data non-sensitif; scope klinis aktual membutuhkan security review.', healthcare, ['Profil', 'Appointment', 'Operasi Klinik', 'Multi-Workflow', 'Enterprise'], 'dense'),
  { dark: true, html: `<p class="eyebrow">RISIKO HEALTHCARE</p><h1 class="headline">Sensitivitas data lebih tinggi.</h1><p class="subhead">Rekam medis elektronik, SATUSEHAT/BPJS, lab, farmasi lanjutan, atau data sensitif skala besar wajib melalui discovery, security review, dan custom quotation.</p>${infoCards([['Security Review', 'Review akses, data flow, penyimpanan, dan risiko.'], ['Data Sensitif', 'Scope dan perlindungan data tidak diasumsikan.'], ['Integrasi Eksternal', 'SATUSEHAT, BPJS, lab, dan provider dinilai terpisah.'], ['Audit', 'Jejak aktivitas dan governance mengikuti kebutuhan.'], ['Discovery Khusus', 'Requirement klinis dan operasional dikunci sebelum quote.']], 5, 0)}` },

  divider('06', 'PLATFORM<br>PRODUK', 'ERP • SaaS • Marketplace • Enterprise', 'ARSITEKTUR MENENTUKAN KELAS'),
  packagesSlide('PETA PAKET PLATFORM', 'Autentikasi, model data, peran, tenancy, pembayaran, QA, dan pemeliharaan.', 'Benchmark adalah acuan cakupan representatif; pendalaman kebutuhan tetap wajib.', enterprise, [], 'dense'),
  showcase('CUSTOM BUSINESS SOFTWARE', enterprise[0], ['Request', 'Ticket', 'Workflow', 'Laporan'], 'SATU MASALAH JELAS • SCOPE KHUSUS'),
  detailSlide('ERP', 'ERP Lite dan ERP Business', 'Perbedaan terletak pada jumlah modul, ketergantungan lintas proses, approval, audit, dan reporting.', enterprise.slice(1, 3)),
  showcase('SAAS PLATFORM', enterprise[3], ['Daftar organisasi', 'Workspace', 'Pengguna', 'Produk inti', 'Subscription', 'Super admin'], 'PRODUK MULTI-PELANGGAN • TENANT LIFECYCLE'),
  showcase('MARKETPLACE', enterprise[4], ['Onboarding vendor', 'Listing', 'Pencarian', 'Order', 'Komisi/payment', 'Moderasi'], 'PEMBELI ↔ MARKETPLACE CORE ↔ VENDOR'),
  { dark: true, html: `<p class="eyebrow">ENTERPRISE PLATFORM</p><h1 class="headline">Rp25 juta+ / Custom</h1><p class="subhead">Produk mission-critical dirancang melalui discovery, bukan dipilih dari checklist.</p><div class="grid cols-4">${['Multi-branch/divisi', 'Role & permission kompleks', 'Approval/workflow', 'Audit trail', 'API & integrasi', 'Security review', 'Arsitektur infrastruktur', 'SLA & support'].map((x) => `<article class="card dark-card"><div class="card-inner"><h3>${x}</h3></div></article>`).join('')}</div><div class="label-chip lime enterprise-mandatory">DISCOVERY DAN TECHNICAL SCOPING WAJIB</div>` },

  base('TAMBAHAN INTERNAL', 'Panduan rentang estimasi awal.', 'Bukan harga publik tetap. Nilai final mengikuti beban kerja nyata dan penggunaan ulang komponen.', `<div class="grid cols-4 addon-grid">${[['Halaman tambahan', 'Rp100–250rb', 'Halaman normal; halaman kompleks dapat lebih tinggi.'], ['Jenis konten CMS', 'Rp250–500rb', 'Skema data, CRUD, validasi, dan media.'], ['Peran/hak akses', 'Rp300–750rb', 'Matriks peran dan pembatasan akses.'], ['Alur persetujuan', 'Rp500rb–1,5jt', 'Beberapa tahap, status, dan riwayat.'], ['Integrasi pembayaran', 'Rp750rb–1,5jt', 'Integrasi, webhook, status, dan pengujian.'], ['WhatsApp/API', 'Rp500rb–1,5jt+', 'Biaya provider terpisah.'], ['Integrasi pengiriman', 'Rp750rb–1,5jt+', 'Tarif, AWB, dan tracking sesuai provider.'], ['QR + pemindai', 'Rp500rb–1jt', 'Identitas QR dan check-in.'], ['Laporan lanjutan', 'Rp300rb–1jt+', 'Agregasi, filter, dan ekspor.'], ['Multi-cabang/outlet', 'Rp1jt+', 'Pemisahan cabang, peran, dan laporan.'], ['API eksternal', 'Rp500rb+', 'Tergantung API dan pengujian.'], ['Migrasi data', 'Rp500rb+', 'Volume, pembersihan, dan pemetaan.'], ['Pengerjaan mendesak', '+20–50%', 'Reprioritas pekerjaan atau lembur.']].map((x, i) => `<article class="card ${i === 12 ? 'selected' : ''}"><div class="card-inner"><h3>${x[0]}</h3><div class="price addon-price">${x[1]}</div><p class="outcome">${x[2]}</p></div></article>`).join('')}</div>`),
  base('DISIPLIN PAKET', 'Kapan add-on berubah menjadi upgrade?', '', `${flowHTML(['Paket dasar', 'Add-on', 'Add-on', 'Add-on', 'Salah paket?'])}${infoCards([['Upgrade Paket', 'Jika 2–3 add-on membuat capability setara tier berikutnya.'], ['Re-scope', 'Jika role, workflow, atau integrasi mengubah arsitektur secara signifikan.'], ['Pindah Kategori', 'Jika menjadi multi-vendor, multi-tenant, multi-branch, regulated, atau mission-critical.']], 3, 2)}<p class="bottom-callout">Jangan menyembunyikan proyek besar di dalam base package murah.</p>`),
  { dark: true, html: `<p class="eyebrow">PETA KEPUTUSAN SALES</p><h1 class="headline medium">Apa yang sebenarnya dibutuhkan klien?</h1><div class="decision-grid">${[['Hanya tampil online?', 'Website'], ['Kelola konten sendiri?', 'CMS'], ['Simpan lead/customer/order?', 'Business'], ['Dipakai staf setiap hari?', 'Operational'], ['Payment/ticket/product?', 'Event / E-Commerce'], ['Kasir dan stok?', 'POS'], ['Calendar/time slot?', 'Booking'], ['Pipeline sales?', 'CRM'], ['Modul terintegrasi?', 'ERP'], ['Banyak organisasi pelanggan?', 'SaaS'], ['Pembeli + vendor?', 'Marketplace'], ['Klien pemerintah?', 'Framework Government']].map((x) => `<div class="decision-item">${x[0]}<b>→ ${x[1]}</b></div>`).join('')}<div class="decision-item final">Tidak pas atau berisiko tinggi?<b>→ Discovery + quotation khusus</b></div></div>` },
  base('BAHASA PENJUALAN', 'Tiga script untuk menjaga positioning.', '', `<div class="grid cols-3">${[['KENAPA TIER INI?', '“Paket lebih rendah fokus pada informasi atau konten. Paket ini sudah masuk database dan workflow operasional, jadi capability-nya berbeda—bukan sekadar jumlah halaman.”'], ['HARGA SEBELUM SCOPE?', '“Kebutuhan seperti ini biasanya mengacu ke paket sekitar RpX. Angka final disesuaikan setelah melihat role, workflow, integrasi, data, timeline, dan skala penggunaan.”'], ['KENAPA BERBEDA DARI BENCHMARK?', '“Pricelist adalah referensi kelas kebutuhan. Harga final mengikuti requirement yang benar-benar dikerjakan agar klien tidak overprice dan delivery tidak under-scope.”']].map((x, i) => `<article class="card quote-card ${i === 0 ? 'selected' : ''}"><div class="card-inner"><span class="mini-chip">0${i + 1}</span><h3>${x[0]}</h3><blockquote>${x[1]}</blockquote></div></article>`).join('')}</div>`),
  base('LIBRARY DEMO', 'P0 — dibangun lebih dahulu.', 'Prioritas mengikuti frekuensi kebutuhan dan price tier yang paling sering ditawarkan.', `<div class="grid cols-3">${[['P01', 'Personal Portfolio', 'Personal Basic'], ['U01', 'Kopi Rona', 'UMKM Basic'], ['U04', 'LeadDesk', 'Business Lite'], ['E01', 'Tech Summit', 'Event Landing/CMS'], ['E04', 'Event Ticketing', 'Ticketing + QRIS'], ['C02', 'Lunara Pay', 'E-Commerce Payment'], ['CRM01', 'Nexa Sales CRM', 'CRM'], ['COR01', 'Nexa Corporate', 'Corporate Website'], ['OPS01', 'ProcureFlow', 'Operational System']].map((x, i) => `<article class="card ${i === 8 ? 'selected' : ''}"><div class="card-inner"><span class="mini-chip">${x[0]}</span><h3>${x[1]}</h3><p class="outcome">Menjual: ${x[2]}</p></div></article>`).join('')}</div>`),
  base('ROADMAP DEMO', 'Urutan pembangunan mengikuti pipeline.', '', `<div class="grid cols-3">${[['P0 — BANGUN DULU', ['P01 Personal Portfolio', 'U01 Kopi Rona', 'U04 LeadDesk', 'E01 Tech Summit', 'E04 Ticketing', 'C02 Lunara Pay', 'CRM01 Nexa CRM', 'COR01 Corporate', 'OPS01 ProcureFlow']], ['P1 — BERIKUTNYA', ['P03 Personal CMS', 'U05 Laundry Management', 'POS01 Rasa Raya', 'B01 UrbanCut', 'GOV01 Portal Desa', 'GOV03 e-Layanan', 'ERP01 NexaERP', 'SAAS01 Flowdesk']], ['P2 — SAAT PIPELINE AKTIF', ['W02 Wedding QR Guest', 'HC01 Clinic Booking', 'MKT01 ServiceHub']]].map((x, i) => `<article class="card ${i === 0 ? 'dark-card' : ''}"><div class="card-inner"><span class="label-chip ${i === 0 ? 'lime' : ''}">${x[0]}</span><ul class="feature-list roadmap-list">${x[1].map((v) => `<li>${v}</li>`).join('')}</ul></div></article>`).join('')}</div>`),
  base('PUBLIK VS INTERNAL', 'Kejelasan publik. Kontrol internal.', '', `<div class="split equal"><article class="card public-card"><div class="card-inner"><span class="label-chip">YANG DILIHAT KLIEN</span><ul class="feature-list visibility-list">${['Nama paket dan “Mulai dari”', 'Cocok untuk siapa', 'Outcome utama', 'Fitur inti dalam bahasa bisnis', 'Pembeda tier dan demo', 'Disclaimer final quote', 'Biaya pihak ketiga'].map((x) => `<li>${x}</li>`).join('')}</ul></div></article><article class="card dark-card"><div class="card-inner"><span class="label-chip lime">YANG DILIHAT SOLIVATE</span><ul class="feature-list visibility-list">${['Benchmark dan category floor', 'Client scale dan complexity', 'Add-on dan integrasi', 'Negotiation authority', 'Risk/security note', 'Urgency, support, dan workload', 'Rekomendasi demo dan reuse komponen'].map((x) => `<li>${x}</li>`).join('')}</ul></div></article></div>`),
  base('PERUBAHAN BENCHMARK', 'Kenaikan mencerminkan capability dan positioning.', 'Angka ini adalah revisi benchmark internal, bukan quotation otomatis.', `<div class="grid cols-4 change-grid">${[['Personal CMS', 'Rp499rb', 'Rp799rb', 'Capability CMS'], ['UMKM Business', 'Rp1,499jt', 'Rp2,99jt', 'Database + order + invoice'], ['Corporate CMS', 'Rp1,299jt', 'Rp2,5jt', 'Positioning corporate'], ['Government CMS', 'Rp1,999jt', 'Rp5jt', 'Floor Government'], ['Public Service', 'Rp3,999jt', 'Rp10jt', 'Workflow layanan'], ['ERP Lite', 'Rp5,999jt', 'Rp10jt', 'Modul terintegrasi'], ['SaaS', 'Rp7,999jt', 'Rp12,5jt', 'Tenancy dan subscription'], ['Enterprise', 'Custom', 'Rp25jt+ / Custom', 'Ekspektasi enterprise']].map((x) => `<article class="card"><div class="card-inner"><h3>${x[0]}</h3><p><span>${x[1]}</span> → <b>${x[2]}</b></p><span class="mini-chip lime">ALASAN</span><p class="change-reason">${x[3]}</p></div></article>`).join('')}</div>`),
  base('MATRIKS BENCHMARK', '01 — Personal, UMKM, event, dan commerce.', '', `<div class="matrix">${[
    ['PERSONAL', [['Basic', 'Rp299rb'], ['Standard', 'Rp499rb'], ['CMS', 'Rp799rb'], ['Blog Pro', 'Rp999rb+']]],
    ['WEDDING', [['Basic', 'Rp149–249rb'], ['Premium', 'Rp349–499rb'], ['RSVP', 'Rp699rb+'], ['QR', 'Rp999rb+'], ['Pro', 'Rp1,499jt+']]],
    ['UMKM', [['Basic', 'Rp499rb'], ['Standard', 'Rp749rb'], ['CMS', 'Rp999rb'], ['Business Lite', 'Rp2,25jt+'], ['Business', 'Rp2,99jt+'], ['Pro', 'Rp3,99jt+'], ['Operational', 'Rp4,99jt+']]],
    ['EVENT', [['Landing', 'Rp749rb+'], ['CMS', 'Rp999rb+'], ['Registration', 'Rp1,499jt+'], ['QR', 'Rp2,499jt+'], ['Ticketing', 'Rp3,499jt+']]],
    ['COMMERCE', [['Starter', 'Rp2,499jt+'], ['Payment', 'Rp3,499jt+'], ['Business', 'Rp4,999jt+'], ['Advanced', 'Rp7,5jt+']]],
  ].map((r) => `<div class="matrix-row"><div class="matrix-label">${r[0]}</div><div class="matrix-chips">${r[1].map((x) => `<div class="matrix-chip">${x[0]}<b>${x[1]}</b></div>`).join('')}</div></div>`).join('')}</div>`),
  base('MATRIKS BENCHMARK', '02 — Operasional, corporate, publik, healthcare, dan platform.', '', `<div class="matrix">${[
    ['OPERASIONAL', [['POS Lite', 'Rp2,25jt+'], ['POS Business', 'Rp3,5jt+'], ['POS Pro', 'Rp5jt+'], ['Booking Basic', 'Rp1,5jt+'], ['Booking Business', 'Rp2,5jt+'], ['CRM Pro', 'Rp6jt+']]],
    ['CORPORATE', [['Website', 'Rp2,5jt+'], ['Professional', 'Rp3,5jt+'], ['Business', 'Rp5jt+'], ['Ops Lite', 'Rp5jt+'], ['Ops Pro', 'Rp10jt+']]],
    ['GOVERNMENT', [['Website', 'Rp5jt+'], ['Professional', 'Rp7,5jt+'], ['Public Service', 'Rp10jt+'], ['Integrated', 'Rp15jt+']]],
    ['HEALTHCARE', [['Website', 'Rp2,5jt+'], ['Booking', 'Rp3,5jt+'], ['Clinic Mgmt', 'Rp7,5jt+'], ['System', 'Rp15jt+']]],
    ['PLATFORM', [['Custom SW', 'Rp5jt+'], ['ERP Lite', 'Rp10jt+'], ['SaaS', 'Rp12,5jt+'], ['ERP Business', 'Rp15jt+'], ['Marketplace', 'Rp15jt+'], ['Enterprise', 'Rp25jt+']]],
  ].map((r) => `<div class="matrix-row"><div class="matrix-label">${r[0]}</div><div class="matrix-chips">${r[1].map((x) => `<div class="matrix-chip">${x[0]}<b>${x[1]}</b></div>`).join('')}</div></div>`).join('')}</div>`),

  base('TATA KELOLA RILIS PUBLIK', 'Janji publik yang masih harus dikunci.', 'Kerangka internal siap sebagai patokan kerja; versi untuk klien memerlukan keputusan eksplisit.', infoCards([
    ['Bahasa Publik', 'Kunci penggunaan “Mulai dari” atau rentang harga.'], ['Kewenangan Harga', 'Kunci batas kategori, diskon, dan kewenangan negosiasi.'], ['Pelaksanaan', 'Kunci revisi dan garansi per tier.'], ['Infrastruktur', 'Kunci kebijakan domain dan hosting.'], ['Tambahan', 'Kunci batas harga tambahan yang boleh dipublikasikan.'], ['Dukungan', 'Kunci maintenance, SLA, dan layanan siaga.'], ['Demo', 'Pastikan seluruh demo P0 benar-benar tersedia.'],
  ], 4, 6)),
  base('KETENTUAN QUOTATION', 'Apa yang harus tertulis sebelum proyek berjalan?', 'Quotation yang baik mengubah hasil discovery menjadi komitmen yang dapat dikendalikan.', infoCards([
    ['Scope & Deliverable', 'Apa yang dibuat, modul, halaman, role, dan hasil serah terima.'], ['Exclusion', 'Apa yang tidak termasuk agar ekspektasi jelas.'], ['Timeline', 'Tahap kerja, dependency, dan target delivery.'], ['Payment Term', 'Termin dan syarat pembayaran.'], ['Garansi & Support', 'Cakupan bug warranty, maintenance, dan SLA.'], ['Biaya Pihak Ketiga', 'Provider, lisensi, server, API, dan biaya berulang.'], ['Masa Berlaku', 'Batas validitas quotation dan asumsi harga.'], ['Scope Freeze', 'Perubahan setelah deal diproses sebagai change request.'],
  ], 4, 7)),
  base('DOMAIN & INFRASTRUKTUR', 'Included bukan berarti tanpa batas.', 'Kapasitas dan kebijakan deployment harus mengikuti kebutuhan aktual.', infoCards([
    ['Domain Umum', '.com/.site/.me/.cloud dapat termasuk 1 tahun sesuai proposal.'], ['Domain Khusus', 'Syarat dokumen dan harga mengikuti registrar.'], ['Hosting Standar', 'Termasuk sesuai paket untuk scope representatif.'], ['Kebutuhan Khusus', 'Server sendiri, storage besar, high traffic, CDN, dan dedicated environment terpisah.'], ['SSL', 'Termasuk sesuai paket.'], ['Deployment Klien', 'Server sendiri, staging, source handover, dan environment khusus dinilai saat discovery.'],
  ], 3, 3)),
  base('GARANSI, REVISI, DAN PERUBAHAN', 'Pisahkan bug dari fitur baru.', 'Disiplin definisi menjaga kualitas hubungan dan margin proyek.', `<div class="split equal"><article class="card selected"><div class="card-inner"><span class="label-chip lime">TERMASUK GARANSI</span><h3 class="large-card-title">Bug atau error development</h3><p class="outcome">Perilaku yang tidak sesuai scope dan acceptance yang telah disetujui.</p><ul class="feature-list"><li>Perbaikan dalam periode garansi paket</li><li>Tidak mengubah flow atau requirement</li><li>Tidak menambah desain dan capability baru</li></ul></div></article><article class="card dark-card"><div class="card-inner"><span class="label-chip">CHANGE REQUEST</span><h3 class="large-card-title">Fitur, flow, atau redesign baru</h3><p class="outcome">Perubahan requirement setelah approval harus diestimasi ulang.</p><ul class="feature-list"><li>Scope dan effort baru</li><li>Dapat mengubah timeline</li><li>Ditagihkan terpisah atau merevisi quotation</li></ul></div></article></div>`),
  base('BIAYA PIHAK KETIGA', 'Development dan provider adalah dua komponen berbeda.', 'Biaya berikut dipisahkan kecuali proposal secara eksplisit menyatakan termasuk.', `<div class="grid cols-4 provider-grid">${['Payment gateway', 'WhatsApp API', 'Email / SMS / OTP', 'Maps', 'Shipping', 'AI API', 'Database berbayar', 'CDN / server khusus'].map((x, i) => `<article class="card ${i === 0 ? 'selected' : ''}"><div class="card-inner"><span class="issue-no">${String(i + 1).padStart(2, '0')}</span><h3>${x}</h3><p class="outcome">Mengikuti provider, volume, dan kebutuhan aktual saat quotation.</p></div></article>`).join('')}</div>`),
  base('CARA MEMBACA BENCHMARK', 'Anchor untuk scope representatif—bukan hak atas seluruh kategori.', 'Harga final dapat lebih rendah, sama, atau lebih tinggi bila scope aktual berbeda dan tetap mematuhi floor/approval.', `<div class="split equal"><article class="card"><div class="card-inner"><span class="label-chip">BENCHMARK</span><h3 class="large-card-title">Membantu memilih kelas capability.</h3><ul class="feature-list visibility-list"><li>Menjadi anchor estimasi awal</li><li>Menjelaskan demo dan upgrade path</li><li>Membandingkan scope representatif</li><li>Mempercepat komunikasi sales</li></ul></div></article><article class="card dark-card"><div class="card-inner"><span class="label-chip lime">BUKAN OTOMATIS</span><h3 class="large-card-title">Tidak mengunci harga sebelum discovery.</h3><ul class="feature-list visibility-list"><li>Bukan harga minimum absolut</li><li>Bukan quotation yang mengikat</li><li>Bukan hak meminta semua fitur kategori</li><li>Bukan pengganti review scope dan risiko</li></ul></div></article></div>`),
  base('CHECKLIST FINAL ESTIMATOR', 'Sebelum angka diberikan ke klien.', '', `<div class="checklist-board">${['Objective dan outcome klien dipahami', 'Paket anchor dan demo acuan dipilih', 'Included dan excluded ditulis', 'Role, workflow, modul, dan data dihitung', 'Integrasi dan biaya provider dipisahkan', 'Skala, risiko, security, dan stakeholder dinilai', 'Timeline, support, deployment, dan SLA dinilai', 'Category floor serta margin tervalidasi', 'Quotation direview sesuai kewenangan', 'Scope freeze dan change request dijelaskan'].map((x, i) => `<div><span>${String(i + 1).padStart(2, '0')}</span><b>${x}</b></div>`).join('')}</div>`),
  base('GUARDRAIL & PENGECUALIAN', 'Floor melindungi positioning dan delivery.', 'Penawaran di bawah guardrail bukan keputusan sales individual; harus memiliki alasan scope yang kuat dan approval sesuai kewenangan.', `<div class="grid cols-3 floor-grid"><article class="card"><div class="card-inner"><span class="label-chip">BUSINESS / CORPORATE</span><h3 class="floor-price">&gt; Rp2 juta</h3><p class="outcome">Database, workflow, stakeholder, dan standar review menempatkannya di kelas sistem bisnis.</p></div></article><article class="card selected"><div class="card-inner"><span class="label-chip lime">GOVERNMENT</span><h3 class="floor-price">≥ Rp5 juta</h3><p class="outcome">Procurement, informasi publik, aksesibilitas, keamanan, hosting, dan stakeholder memerlukan guardrail khusus.</p></div></article><article class="card dark-card"><div class="card-inner"><span class="label-chip lime">ERP / SAAS / MARKETPLACE</span><h3 class="floor-price">Rp10–15 juta+</h3><p class="outcome">Arsitektur, authentication, data model, tenancy/vendor, QA, dan maintainability menentukan kelas produk.</p></div></article></div><p class="bottom-callout">Pengecualian wajib terdokumentasi: scope, workload, margin, risiko, dan pemberi approval.</p>`),
  base('PRINSIP FINAL', 'Paket menentukan titik awal.', 'Pendalaman kebutuhan menentukan penawaran final.', `<div class="final-principles">${[['Cakupan yang Tepat', 'Tidak kurang, tidak berlebihan.'], ['Capability yang Tepat', 'Sesuai masalah bisnis yang diselesaikan.'], ['Harga yang Tepat', 'Berbasis beban kerja, risiko, dan komitmen pelaksanaan.']].map((x, i) => `<article class="card ${i === 2 ? 'selected' : ''}"><div class="card-inner"><span class="issue-no">0${i + 1}</span><h3>${x[0]}</h3><p class="outcome">${x[1]}</p></div></article>`).join('')}</div>`),
  { dark: true, html: `<div class="closing"><div><p class="eyebrow">SOLIVATE STUDIO • PRICING MASTER 2026</p><h2>Paket menentukan<br>titik awal.</h2></div><div><h2>Pendalaman kebutuhan menentukan<br>penawaran final.</h2><p class="subhead">Cakupan Tepat. Capability Tepat. Harga Tepat.</p></div></div>` },
];

if (slides.length !== 83) console.warn(`Seharusnya 83 slide, ditemukan ${slides.length}`);

let current = Math.max(0, Math.min(slides.length - 1, Number(location.hash.replace('#slide-', '')) - 1 || 0));
let toastTimer;

function chapterAt(index) {
  const n = index + 1;
  return chapterDefs.find((c) => n >= c.from && n <= c.to) || chapterDefs.at(-1);
}

function render() {
  const s = slides[current];
  const el = $('#slide');
  el.className = `slide ${s.dark ? 'dark' : ''}`;
  el.innerHTML = s.html;
  document.body.classList.toggle('is-dark', !!s.dark);
  $('#counter').textContent = `${String(current + 1).padStart(2, '0')} / ${slides.length}`;
  $('#progress').style.width = `${((current + 1) / slides.length) * 100}%`;
  const chapter = chapterAt(current);
  $('#chapter').textContent = `${chapter.id} / ${chapter.label}`;
  [...$('#chapters').children].forEach((node, i) => node.classList.toggle('active', chapterDefs[i].id === chapter.id));
  history.replaceState(null, '', `#slide-${String(current + 1).padStart(2, '0')}`);
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
  if (current < slides.length - 1) { current += 1; render(); }
  else showToast('AKHIR PRESENTASI');
}

function prev() {
  if (current > 0) { current -= 1; render(); }
  else showToast('AWAL PRESENTASI');
}

chapterDefs.forEach((c) => {
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
  if (['ArrowRight', 'PageDown', ' ', 'Enter'].includes(e.key)) { e.preventDefault(); next(); }
  if (['ArrowLeft', 'PageUp', 'Backspace'].includes(e.key)) { e.preventDefault(); prev(); }
  if (e.key.toLowerCase() === 'f') $('#fullscreen').click();
  if (e.key === 'Home') { current = 0; render(); }
  if (e.key === 'End') { current = slides.length - 1; render(); }
});

$('#fullscreen').addEventListener('mousedown', (e) => e.stopPropagation());
$('#fullscreen').addEventListener('click', async (e) => {
  e.stopPropagation();
  if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
  else await document.exitFullscreen();
});

setTimeout(() => $('#gestureHint').classList.add('hidden'), 5200);
render();
