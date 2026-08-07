<p align="center">
  <img src="web-presentation/assets/solivate_logo.png" alt="Solivate Studio" width="520" />
</p>

<h1 align="center">Solivate Studio — Pricing Master 2026</h1>

<p align="center">
  Katalog produk dan sistem harga interaktif premium untuk kebutuhan internal Solivate Studio.
</p>

<p align="center">
  <a href="https://hmad28.github.io/presentasi/"><strong>Buka Presentasi Live</strong></a>
  ·
  <a href="Solivate_Studio_Pricing_Master_Final_2026.pdf">Unduh PDF</a>
  ·
  <a href="Solivate_Studio_Pricing_Master_Final_2026.pptx">Unduh PowerPoint</a>
</p>

## Tentang proyek

Pricing Master 2026 memosisikan penawaran Solivate sebagai sebuah **product and pricing system**, bukan sekadar daftar harga jasa pembuatan website. Deck ini membantu founder, management, sales, estimator, project lead, dan developer memahami hubungan antara kebutuhan klien, level capability, scope, benchmark harga, dan final quotation.

Versi web dirancang sebagai **pricing comparison deck 14 slide**. Angka benchmark menjadi fokus utama, diikuti perbedaan capability, benefit, dan contoh proyek pada setiap paket.

## Fitur utama

- Presentasi full-page berformat 16:9 yang berjalan langsung di browser.
- Tombol `LANJUT` dan `KEMBALI` untuk berpindah slide.
- Navigasi keyboard, fullscreen, progress bar, dan chapter navigator.
- Deep link per slide, misalnya `#slide-12`.
- Katalog interaktif berisi 64 paket lengkap dan 13 kategori dari Pricing Master.
- Pencarian dan filter kategori dalam grid yang lapang.
- Drawer detail paket berisi target pengguna, outcome, benchmark, scope lengkap, demo, pembeda tier, dan catatan internal.
- Paket pada slide dapat diklik untuk langsung membuka detail terkait.
- Katalog capability dari Website, CMS, Business, Operational, hingga Enterprise.
- Materi pricing engine, discovery workflow, add-on, decision map, demo library, dan governance.
- Tanpa framework atau proses build untuk versi web.

## Kontrol presentasi

| Aksi | Kontrol |
| --- | --- |
| Slide berikutnya | Tombol `LANJUT`, `→`, `Page Down`, `Space`, atau `Enter` |
| Slide sebelumnya | Tombol `KEMBALI`, `←`, `Page Up`, atau `Backspace` |
| Slide pertama / terakhir | `Home` / `End` |
| Fullscreen | `F` atau tombol `FULLSCREEN` |

> Klik pada tombol atau navigasi chapter tidak akan memicu perpindahan slide secara tidak sengaja.

## Menjalankan secara lokal

Presentasi bisa dibuka langsung melalui `web-presentation/index.html`. Untuk hasil paling konsisten, jalankan static server dari root repository:

```powershell
python -m http.server 4173
```

Kemudian buka:

```text
http://localhost:4173/
```

Root page akan mengarahkan browser ke deck utama di `/web-presentation/`.

## Struktur repository

```text
.
├── index.html                      # Entry point GitHub Pages
├── web-presentation/
│   ├── index.html                  # Presentation shell
│   ├── presentation.js             # Konten 14 slide dan interaksi
│   ├── catalogue-data.js            # Data lengkap 64 paket
│   ├── styles.css                  # Visual system dan responsive layout
│   └── assets/                     # Logo presentasi
├── pricing_master_source.md        # Materi sumber Pricing Master 2026
├── build_deck.js                   # Generator versi PowerPoint
├── Solivate_Studio_Pricing_Master_Final_2026.pptx
├── Solivate_Studio_Pricing_Master_Final_2026.pdf
└── Solivate_Web_Presentation_2026.zip
```

## Versi yang tersedia

- **Web presentation** — pengalaman utama untuk presentasi interaktif dan GitHub Pages.
- **PowerPoint** — versi `.pptx` untuk penggunaan offline dan editing lanjutan.
- **PDF** — versi referensi yang mudah dibagikan.
- **ZIP** — paket portable dari web presentation.

## GitHub Pages

Deployment menggunakan GitHub Pages dari branch `main` dan folder root `/`. Setiap perubahan yang di-push ke branch tersebut akan diterbitkan ulang oleh GitHub Pages.

---

<p align="center">
  <strong>Right Scope. Right Capability. Right Price.</strong><br />
  Solivate Studio — Digital Product & Technology Studio
</p>
