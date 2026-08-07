<p align="center">
  <img src="web-presentation/assets/solivate_logo.png" alt="Solivate Studio" width="500" />
</p>

<h1 align="center">Pricing Master Simplified 2026</h1>

<p align="center">
  Presentasi web interaktif berisi 21 paket publik, benchmark harga, scope framework, dan panduan quotation Solivate Studio.
</p>

<p align="center">
  <a href="https://hmad28.github.io/presentasi/"><strong>Buka Presentasi Live</strong></a>
</p>

## Struktur baru

Pricing Master disederhanakan dari puluhan SKU menjadi tiga kategori dan 21 paket publik:

1. **Personal & Non-Profit** — 6 paket.
2. **UMKM & Growing Business** — 10 paket.
3. **Business & Enterprise** — 5 paket.

Setiap paket mempunyai satu halaman khusus yang menampilkan harga, outcome, benefit utama, pembeda, dan contoh implementasi. Tombol **Lihat Scope Lengkap** membuka panel detail berisi seluruh baseline scope, exclusion, optional/add-on, scale adjustment, workflow, serta custom trigger yang tersedia pada materi sumber.

## Fitur

- Presentasi full-page 16:9 dengan 41 halaman.
- Navigasi tombol `LANJUT` dan `KEMBALI`.
- Daftar isi tiga kategori yang dapat diklik.
- Katalog 21 paket dengan pencarian dan filter.
- Detail paket interaktif dan bagian yang dapat dibuka/tutup.
- Screenshot serta tautan website Solivate untuk contoh yang relevan.
- Placeholder jujur untuk demo khusus yang belum tersedia.
- Client scale, complexity, quotation formula, add-on, custom trigger, dan decision guide.
- Studi kasus Event 20.000+ visitor dan Full Travel Umroh System.
- Deep link per halaman, fullscreen, dan navigasi keyboard.

## Menjalankan secara lokal

```powershell
python -m http.server 4173
```

Buka `http://localhost:4173/`.

## Kontrol

| Aksi | Kontrol |
| --- | --- |
| Berikutnya | Tombol `LANJUT`, `→`, `Page Down`, atau `Space` |
| Sebelumnya | Tombol `KEMBALI`, `←`, atau `Page Up` |
| Awal / akhir | `Home` / `End` |
| Tutup panel | `Esc` |
| Fullscreen | Tombol ikon fullscreen |

## Struktur penting

```text
web-presentation/
├── index.html            # Shell presentasi dan overlay
├── catalogue-data.js     # 21 paket dan scope lengkap
├── live-examples.js      # Pemetaan contoh website nyata
├── presentation.js       # 41 halaman dan interaksi
├── styles.css            # Sistem visual serta responsive layout
└── assets/               # Logo dan screenshot website

DEMO-TODO.md              # Backlog demo unik untuk setiap paket
```

## Prinsip

> Paket adalah anchor, bukan harga mati. Complexity mengubah quotation, bukan selalu nama paket. Project kompleks masuk Custom.

GitHub Pages diterbitkan dari branch `main` dan root repository.
