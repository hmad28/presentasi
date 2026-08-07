const live = (title, url, image, capability) => ({
  title,
  url,
  image: `assets/live-examples/${image}.png`,
  capability,
});

// Setiap paket hanya memakai satu contoh utama. Screenshot tidak dipakai ulang
// untuk tier berbeda agar perbedaan solusi tetap mudah dijelaskan.
window.SOLIVATE_LIVE_EXAMPLES = {
  'personal-starter': live('Happy Birthday Matt', 'https://hbd-matt.solivate.com/', 'hbd-matt', 'Contoh personal landing page sederhana'),
  'personal-professional': live('Firqatun Najiyyah', 'https://firqatun-najiyyah.vercel.app/', 'firqatun', 'Contoh website personal dengan struktur konten lebih luas'),
  'wedding-invitation': live('Hammad & Fulanah', 'https://hammaddanfulanah.solivate.com/', 'hammad-wedding', 'Undangan digital dengan nama tamu custom'),
  'wedding-guest-management': live('WeddingPro', 'https://weddingpro.solivate.com/', 'wedding-pro', 'Undangan, barcode, dan dashboard pengelolaan tamu'),
  'institution-profile': live('SMK Solivate 01', 'https://smk01.solivate.com/', 'smk01', 'Website profil sekolah landing dan multipage'),
  'institution-pro': live('Peduli Sesama', 'https://pedulisesama.solivate.com/', 'peduli-sesama', 'Profil, artikel, galeri, data keuangan, dan dashboard'),
  'umkm-professional': live('Nusuk Haromain Indonesia', 'https://www.nusukharomainindonesia.com/', 'nusuk-haromain', 'Landing dan katalog travel umroh'),
  'ecommerce-starter': live('Makdian Bakery', 'https://makdianbakery.vercel.app/', 'makdian-bakery', 'Storefront e-commerce bakery'),
  'ecommerce-pro': live('Shofi Frozen', 'https://shofifrozen.com/', 'shofi-frozen', 'E-commerce, QRIS, CMS, dan POS'),
  'business-system': live('Cutbae Barbershop', 'https://cutbaebarbershop.vercel.app/', 'cutbae', 'Contoh implementasi landing dan booking'),
  'operational-system': live('Sahabat Qolbu', 'https://sahabatqolbu.com/', 'sahabat-qolbu', 'Katalog travel, CMS, dan operasional'),
  'corporate-website': live('Buraq Logistik', 'https://buraqlogistik.com/', 'buraq-logistik', 'Company profile perusahaan logistik'),
};

window.SOLIVATE_MORE_EXAMPLES = [
  live('PT Antaran Anak Daerah', 'https://add-logistik.com/', 'add-logistik', 'Company profile dan layanan logistik'),
  live('Al-Muhtadun', 'https://almuhtadun.solivate.com/', 'al-muhtadun', 'Profil masjid, artikel, galeri, data keuangan, dan dashboard'),
  live('StudyShare', 'https://studyshare.web.id/', 'studyshare', 'Landing page, blog tugas, dan CMS'),
  live('SpectraSec', 'https://www.spectrasec.xyz/', 'spectrasec', 'Landing page organisasi cyber security'),
  live('CPX Indonesia', 'https://cpxindo.solivate.com/', 'cpxindo', 'E-commerce jersey dengan CMS'),
  live('Masjid Raya Puri Telukjambe', 'https://www.masjidrayapuritelukjambe.com/', 'masjid-puri', 'CMS, booking, dan dashboard internal'),
];
