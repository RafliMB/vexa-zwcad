# SEO untuk halaman ZWCAD & ZW3D

Halaman produk di WordPress memakai Elementor, dan Elementor **tidak bisa**
mengatur isi `<head>`. Karena itu meta tag, Open Graph, dan JSON-LD dipasang
lewat file PHP terpisah: [`vexatekno-seo.php`](vexatekno-seo.php).

Snippet Elementor hanya mengatur tampilan; tidak ada yang perlu diubah di sana
untuk SEO.

## Yang dipasang

Untuk `/zwcad/` dan `/zw3d/` saja:

| Bagian | Isi |
|---|---|
| `<title>` | Judul khusus per produk (mengganti judul bawaan WordPress) |
| `meta description` | 139–146 karakter, memuat kata kunci + harga awal |
| `robots` | `index, follow, max-image-preview:large, max-snippet:-1` |
| `hreflang` | `id-ID` dan `x-default` |
| Open Graph | `type`, `site_name`, `locale`, `url`, `title`, `description`, `image` (1200×630), `image:alt` |
| Twitter Card | `summary_large_image` + judul, deskripsi, gambar, alt |
| JSON-LD | `Organization`, `Product` + `AggregateOffer`, `FAQPage`, `BreadcrumbList` |
| `lang` | `id-ID` (hanya dua halaman ini) |

Canonical **tidak** ditambahkan karena WordPress sudah mengeluarkannya sendiri
(`https://vexatekno.com/zwcad/`, `/zw3d/`). Menambah lagi akan membuat dua tag
canonical.

## Cara pasang

### 1. Unggah dua gambar OG

Unggah lewat **Media Library**:

- `assets/img/og-zwcad.png`
- `assets/img/og-zw3d.png`

Ukuran sudah 1200×630. Jangan dikompres ulang oleh plugin optimasi gambar;
kalau plugin mengubah nama file, sesuaikan `$upload` di `vexa_seo_pages()`.

### 2. Pasang PHP-nya

Pilih salah satu:

**A. Plugin Code Snippets** (paling aman, tanpa edit tema)

1. Install plugin **Code Snippets**.
2. Snippets → Add New.
3. Judul: `Vexa SEO ZWCAD/ZW3D`.
4. Salin seluruh isi `vexatekno-seo.php` **tanpa** baris `<?php` paling atas.
5. Location: *Run everywhere*. Save, lalu Activate.

**B. Upload sebagai plugin**

1. Buat folder `wp-content/plugins/vexa-seo/`.
2. Simpan file sebagai `wp-content/plugins/vexa-seo/vexa-seo.php`.
3. Aktifkan di Plugins → *Vexa SEO — ZWCAD & ZW3D*.

**C. Child theme**

Tambahkan di `functions.php` child theme:

```php
require get_stylesheet_directory() . '/inc/vexatekno-seo.php';
```

Jangan pasang di dua tempat sekaligus. File sudah dibungkus
`function_exists()` supaya tidak fatal, tetapi hook-nya tetap bisa dobel.

### 3. Sesuaikan URL gambar kalau perlu

Di `vexa_seo_pages()`:

```php
$upload = $base . '/wp-content/uploads/2026/11';
```

Ganti `2026/11` dengan bulan upload sebenarnya. Cek hasilnya:

```bash
curl -s https://vexatekno.com/zwcad/ | grep -E 'og:image"|ld\+json'
```

## Yang harus dijaga

- **Jangan aktifkan bersamaan dengan Yoast, Rank Math, SEOPress, AIOSEO, atau
  The SEO Framework.** Kalau salah satunya aktif, snippet ini otomatis diam
  supaya tidak ada meta ganda. Pindahkan datanya ke plugin tersebut.
- **Harga di JSON-LD harus sama dengan harga di halaman.** Sumbernya
  [`../PRICING.md`](../PRICING.md). Kalau harga berubah, ubah juga
  `price_low`, `price_high`, dan `offers` di `vexa_seo_pages()`.
- **Jawaban FAQ di JSON-LD harus persis sama** dengan teks yang terlihat di
  halaman. Kalau FAQ diedit di Elementor, edit juga array `faq` di PHP.
  Google menolak FAQPage yang teksnya tidak cocok.
- **Bahasa situs.** Snippet ini memaksa `lang="id-ID"` hanya di dua halaman
  produk. Untuk seluruh situs, set Settings → General → Site Language ke
  Bahasa Indonesia.

## Verifikasi

1. **Rich Results Test** — <https://search.google.com/test/rich-results>
   Uji `https://vexatekno.com/zwcad/` dan `/zw3d/`. Yang harus terdeteksi:
   Product, FAQ, Breadcrumb.
2. **Schema Markup Validator** — <https://validator.schema.org/>
3. **Facebook Sharing Debugger** — <https://developers.facebook.com/tools/debug/>
   Klik *Scrape Again* setelah gambar diunggah.
4. **LinkedIn Post Inspector** — <https://www.linkedin.com/post-inspector/>
5. Cek manual:

```bash
curl -s https://vexatekno.com/zwcad/ | grep -c 'application/ld+json'   # 4
curl -s https://vexatekno.com/zwcad/ | grep -o '<title>[^<]*</title>'
curl -s https://vexatekno.com/zwcad/ | grep -o 'lang="[^"]*"' | head -1 # id-ID
```

## Catatan teknis

- JSON-LD sengaja dicetak di `wp_head`, bukan di badan halaman, supaya tidak
  ikut terhapus saat widget Elementor diedit.
- `Product` memakai `AggregateOffer` berisi 3 offer (ZWCAD) dan 7 offer
  (ZW3D), semuanya dalam IDR dan berstatus `InStock`.
- `Organization` memakai logo situs 512×512 yang sudah ada di
  `/wp-content/uploads/2026/04/cropped-Judul2.png`.
- `sameAs` belum diisi karena akun resmi (LinkedIn/Instagram) belum
  dikonfirmasi. Tambahkan kalau sudah ada.
