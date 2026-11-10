# Vexa — ZWCAD

Landing page statis untuk **ZWCAD**, distributor resmi ZWSOFT Indonesia.
Halaman ini juga tersedia sebagai snippet Elementor yang bisa langsung
ditempel di WordPress.

## Struktur

| Path | Isi |
|---|---|
| `index.html` | Halaman lengkap: header, hero, semua section, footer |
| `assets/css/main.css` | Stylesheet halaman (light + dark mode) |
| `assets/js/main.js` | Interaksi: nav, tema, video, reveal, form |
| `assets/img/` | Screenshot, poster video, kartu OG |
| `assets/video/` | Video demo |
| `elementor/` | Snippet HTML/CSS/JS siap tempel untuk Elementor |
| `seo/` | Meta tag + JSON-LD untuk WordPress (lihat `seo/README.md`) |
| `PRICING.md` | Sumber harga dan aturan penulisan harga |

## Pratinjau lokal

```bash
python3 -m http.server 8000
# buka http://localhost:8000
```

## Deploy

Repo ini statis. Set root directory ke `/`, tanpa build step. `index.html`
adalah entry point. Tidak ada dependensi eksternal selain Google Fonts dan
video demo ZWSOFT.

Link ke halaman produk lain diarahkan ke `https://vexatekno.com/...` karena
tiap produk punya repo sendiri. Ganti ke URL deployment masing-masing kalau
kedua repo dipasang di domain terpisah.

## Catatan SEO

- `<title>`, description, canonical, robots, Open Graph, dan JSON-LD ada di
  dalam `index.html`.
- Untuk WordPress, tag kepala harus dipasang lewat `seo/vexatekno-seo.php`
  karena Elementor tidak bisa mengubah `<head>`.
- Kartu sosial 1200×630 ada di `assets/img/og-zwcad.png`. Unggah ke Media
  Library sebelum memakai meta `og:image`.
- Canonical menunjuk ke `https://vexatekno.com/zwcad/`.

## Aturan konten

- Harga **wajib** mengikuti `PRICING.md`. Jangan menambah angka IDR tanpa
  sumber.
- Lisensi network tidak dipublikasikan harganya oleh distributor; arahkan ke
  penawaran, jangan menebak.
- Nama produk tidak memakai tahun rilis.

## Kontak

- WhatsApp: +62 819-0224-4660
- Email: krisna@vexatekno.com
- Situs: https://vexatekno.com/zwcad/
