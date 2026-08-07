const params = new URLSearchParams(location.search);
const id = params.get('id') || 'personal-basic';
const item = (window.SOLIVATE_CATALOGUE || []).find((entry) => entry.id === id) || window.SOLIVATE_CATALOGUE[0];

const palette = {
  Personal:'blue', Wedding:'coral', Institusi:'green', UMKM:'gold', Event:'violet',
  'E-Commerce':'coral', POS:'gold', Booking:'green', CRM:'blue', Corporate:'blue',
  Government:'green', Healthcare:'coral', Platform:'violet',
};

const cleanDemo = item.demo.replace(/^[A-Z0-9]+\s*[—-]\s*/, '');
const slug = cleanDemo.toLowerCase().replace(/[^a-z0-9]+/g,'.').replace(/^\.|\.$/g,'');
const features = item.termasuk.slice(0, 5);
const dashboardWords = ['cms','business','operational','ops','rsvp','qr','registration','ticketing','payment','advanced','pro','management','service','integrated','enterprise','software','erp','saas','marketplace','crm','pos','booking'];
const dashboard = dashboardWords.some((word) => item.id.includes(word));
const commerce = item.kategori === 'E-Commerce' && !item.id.includes('advanced');
const architecture = ['saas-platform','marketplace','enterprise-platform','government-enterprise','healthcare-system','hospital-enterprise','corporate-enterprise-ops'].includes(item.id);

function frame(content, type) {
  return `<section class="scene theme-${palette[item.kategori] || 'blue'}"><div class="browser"><div class="chrome"><i></i><i></i><i></i><div class="address">https://${slug || item.id}.demo.solivate.studio</div></div><div class="screen ${type}">${content}</div></div></section>`;
}

function website() {
  const cta = item.kategori === 'Wedding' ? 'Buka Undangan' : item.kategori === 'Event' ? 'Daftar Sekarang' : item.kategori === 'Healthcare' ? 'Buat Janji' : 'Hubungi Kami';
  return frame(`<div class="site-nav"><div class="wordmark">${cleanDemo.split(' ')[0]}<b>.</b></div><div class="site-links"><span>Tentang</span><span>Layanan</span><span>Galeri</span><span>${cta}</span></div></div><div class="hero"><div class="hero-copy"><small>${item.kategori.toUpperCase()} · CONCEPT PREVIEW</small><h1>${item.hasil}</h1><p>${item.cocok}</p><div class="hero-actions"><span>${cta}</span><span>Lihat Selengkapnya</span></div></div><div class="visual-card"><div class="metric-row"><i></i><i></i><i></i></div><div class="visual-copy"><b>${cleanDemo}</b><span>${features.slice(0,3).join(' · ')}</span></div></div></div>`, 'web-screen');
}

function dashboardView() {
  const labels = features.length ? features : ['Dashboard','Data','Workflow','Laporan'];
  const rows = [cleanDemo,'Aktivitas terbaru','Permintaan baru','Pembaruan status'];
  return frame(`<aside class="sidebar"><div class="sidebar-brand">${cleanDemo.split(' ')[0]}<b>.</b></div><small>WORKSPACE</small>${labels.slice(0,5).map((label,index)=>`<div class="nav-item ${index===0?'active':''}">${label}</div>`).join('')}<div class="user-chip">Admin Solivate · Online</div></aside><section class="workspace"><div class="workspace-top"><div><span class="eyebrow">${item.kategori.toUpperCase()} SYSTEM</span><h1>${cleanDemo}</h1></div><button>+ Tambah Data</button></div><div class="stats">${['Total Data','Aktif','Diproses','Selesai'].map((label,index)=>`<div class="stat"><span>${label}</span><b>${[128,36,18,74][index]}</b><i></i></div>`).join('')}</div><div class="board"><div class="panel"><div class="panel-head">Aktivitas operasional <span>HARI INI</span></div><div class="rows">${rows.map((label,index)=>`<div class="row"><b>${label}</b><span>${labels[index%labels.length]}</span><span class="pill">${['Aktif','Review','Baru','Selesai'][index]}</span></div>`).join('')}</div></div><div class="panel"><div class="panel-head">Ringkasan <span>30 HARI</span></div><div class="chart">${[48,72,38,88,63,96,78].map(height=>`<i style="height:${height}%"></i>`).join('')}</div></div></div></section>`, 'dashboard-screen');
}

function commerceView() {
  return frame(`<div class="site-nav"><div class="wordmark">${cleanDemo.split(' ')[0]}<b>.</b></div><div class="site-links"><span>New In</span><span>Koleksi</span><span>Promo</span><span>Cart · 2</span></div></div><div class="store-body"><div class="product-photo"></div><div class="product-info"><span class="eyebrow">FEATURED PRODUCT</span><h1>${cleanDemo}</h1><p>${item.hasil}</p><div class="price">Rp349.000</div><div class="swatches"><i></i><i style="background:#121827"></i><i style="background:#d9c8b1"></i></div><div class="cart-btn">Tambah ke Keranjang</div></div></div>`, 'commerce-screen');
}

function architectureView() {
  const nodes = item.id.includes('marketplace') ? ['Buyer Experience','Marketplace Core','Vendor Workspace'] : item.id.includes('saas') ? ['Organization','Product Workspace','Super Admin'] : ['Users & Branches','Business Core','Integration Layer'];
  return frame(`<div class="arch-head"><div><span>${item.kategori.toUpperCase()} ARCHITECTURE</span><h1>${cleanDemo}</h1></div><span>DISCOVERY-BASED CONCEPT</span></div><div class="nodes">${nodes.map((node,index)=>`<div class="node"><b>${node}</b><span>${features.slice(index,index+3).join(' · ') || item.hasil}</span><strong>0${index+1} / LAYER</strong></div>`).join('')}</div><div class="arch-tags">${features.slice(0,5).map(feature=>`<span>${feature}</span>`).join('')}</div>`, 'architecture-screen');
}

document.querySelector('#preview').innerHTML = architecture ? architectureView() : commerce ? commerceView() : dashboard ? dashboardView() : website();
