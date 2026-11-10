<?php
/**
 * Plugin Name: Vexa SEO — ZWCAD & ZW3D
 * Description: Meta description, Open Graph, Twitter Card, hreflang, dan JSON-LD untuk halaman produk ZWCAD & ZW3D.
 * Version:     1.0.0
 * Author:      PT Vexa Dinamika Teknologi
 *
 * Cara pakai: lihat seo/README.md. Jangan aktifkan bersamaan dengan plugin SEO
 * lain (Yoast, Rank Math, SEOPress, AIOSEO) — lihat vexa_seo_third_party_active().
 *
 * Sumber harga: PRICING.md. Setiap perubahan harga di halaman WAJIB diikuti
 * perubahan angka di vexa_seo_pages() supaya structured data tidak berbohong.
 */

defined('ABSPATH') || exit;

if (!function_exists('vexa_seo_pages')) {

    /**
     * Data per halaman produk. Slug => data.
     */
    function vexa_seo_pages(): array
    {
        static $pages = null;

        if ($pages !== null) {
            return $pages;
        }

        $base   = 'https://vexatekno.com';
        $upload = $base . '/wp-content/uploads/2026/11';
        $org_id = $base . '/#organization';

        $pages = array(
            'zwcad' => array(
                'url'               => $base . '/zwcad/',
                'name'              => 'ZWCAD',
                'title'             => 'ZWCAD Indonesia — Harga Resmi & Lisensi Perpetual | Vexa',
                'description'       => 'ZWCAD untuk drafting 2D: kompatibel penuh DWG, antarmuka familiar, lisensi perpetual mulai Rp 15.320.000. Distributor resmi ZWSOFT, support lokal.',
                'og_title'          => 'ZWCAD — Drafting 2D yang familiar, kompatibel DWG',
                'og_description'    => 'Lisensi perpetual mulai Rp 15.320.000. Distributor resmi ZWSOFT Indonesia dengan support lokal.',
                'og_image'          => $upload . '/og-zwcad.png',
                'og_image_alt'      => 'Kartu ZWCAD: drafting 2D kompatibel DWG dari Vexa, distributor resmi ZWSOFT Indonesia',
                'product_desc'      => 'Perangkat lunak CAD 2D dan 3D dari ZWSOFT dengan kompatibilitas native DWG, DXF, dan DWT, serta lisensi perpetual.',
                'price_low'         => '15320000',
                'price_high'        => '28920000',
                'offers'            => array(
                    array('name' => 'ZWCAD Standard',     'price' => '15320000'),
                    array('name' => 'ZWCAD Professional', 'price' => '23800000'),
                    array('name' => 'ZWCAD MFG',          'price' => '28920000'),
                ),
                'faq'               => array(
                    array(
                        'q' => 'Apakah ZWCAD benar-benar kompatibel dengan DWG?',
                        'a' => 'Ya. ZWCAD membaca dan menulis DWG secara native, termasuk DXF dan DWT. File dapat dibuka dari AutoCAD dan aplikasi CAD lain, diedit, lalu dikembalikan tanpa konversi manual.',
                    ),
                    array(
                        'q' => 'Apa perbedaan ZWCAD dengan AutoCAD?',
                        'a' => 'ZWCAD menawarkan alur kerja 2D yang sangat mirip dengan antarmuka dan command yang familiar, dengan model lisensi perpetual dan biaya kepemilikan yang lebih rendah. Untuk kebutuhan spesifik, kami dapat melakukan perbandingan fitur berdasarkan workflow tim Anda.',
                    ),
                    array(
                        'q' => 'Apakah aplikasi LISP dan VBA saya tetap berjalan?',
                        'a' => 'ZWCAD mendukung LISP, VBA, ZRX, dan .NET. Sebagian besar aplikasi dapat berjalan langsung atau dengan penyesuaian kecil. Kami dapat membantu menguji aplikasi kritikal Anda selama proses migrasi.',
                    ),
                    array(
                        'q' => 'Berapa spesifikasi komputer minimum?',
                        'a' => 'ZWCAD berjalan pada Windows 64-bit dengan RAM 8 GB (disarankan 16 GB) dan GPU yang mendukung OpenGL. Untuk drawing dan point cloud berukuran besar, RAM 32 GB dan GPU diskrit sangat disarankan.',
                    ),
                    array(
                        'q' => 'Apakah lisensi perpetual bisa dipindah ke komputer lain?',
                        'a' => 'Bisa, dengan proses deaktivasi dan aktivasi ulang sesuai ketentuan lisensi. Untuk tim yang sering berpindah perangkat, lisensi network biasanya lebih praktis.',
                    ),
                    array(
                        'q' => 'Bagaimana cara mendapatkan trial dan harga?',
                        'a' => 'Trial 30 hari tersedia melalui tautan unduh resmi. Daftar harga lisensi dalam IDR ada di bagian lisensi halaman ini. Untuk konfigurasi network atau jumlah seat khusus, isi formulir kontak atau hubungi WhatsApp kami.',
                    ),
                ),
            ),
            'zw3d' => array(
                'url'               => $base . '/zw3d/',
                'name'              => 'ZW3D',
                'title'             => 'ZW3D Indonesia — Distributor CAD/CAE/CAM Resmi | Vexa',
                'description'       => 'ZW3D menyatukan CAD, CAE, CAM, dan PDM untuk desain mesin dan manufaktur. Lisensi perpetual mulai Rp 42.130.000, demo dengan file tim Anda.',
                'og_title'          => 'ZW3D — CAD, CAE, CAM, dan PDM dalam satu lingkungan',
                'og_description'    => 'Lisensi perpetual mulai Rp 42.130.000. Distributor resmi ZWSOFT Indonesia dengan support lokal.',
                'og_image'          => $upload . '/og-zw3d.png',
                'og_image_alt'      => 'Kartu ZW3D: CAD, CAE, CAM, dan PDM dari Vexa, distributor resmi ZWSOFT Indonesia',
                'product_desc'      => 'Perangkat lunak CAD/CAE/CAM/PDM terintegrasi dari ZWSOFT untuk desain mesin, assembly besar, simulasi, dan manufaktur.',
                'price_low'         => '42130000',
                'price_high'        => '168388000',
                'offers'            => array(
                    array('name' => 'ZW3D Lite',             'price' => '42130000'),
                    array('name' => 'ZW3D Standard',         'price' => '70290000'),
                    array('name' => 'ZW3D Professional',     'price' => '105347000'),
                    array('name' => 'ZW3D Advanced',         'price' => '116952000'),
                    array('name' => 'ZW3D 2-Axis Machining', 'price' => '58487000'),
                    array('name' => 'ZW3D 3-Axis Machining', 'price' => '105347000'),
                    array('name' => 'ZW3D Premium',          'price' => '168388000'),
                ),
                'faq'               => array(
                    array(
                        'q' => 'Apa itu ZW3D?',
                        'a' => 'ZW3D adalah software engineering 3D untuk manufaktur mesin. Di dalamnya tersedia CAD, CAE, CAM, dan PDM yang saling terhubung, sehingga tim dapat bergerak dari desain menuju produksi dengan lebih sedikit handoff.',
                    ),
                    array(
                        'q' => 'Apakah ZW3D mencakup CAD, CAE, dan CAM?',
                        'a' => 'Ya. ZW3D menggabungkan pemodelan part dan assembly, drawing 2D, simulasi struktur/termal/getaran/fatik, serta strategi CAM 2–5 axis dalam satu lingkungan. PDM juga tersedia terintegrasi.',
                    ),
                    array(
                        'q' => 'Seberapa besar assembly yang bisa ditangani?',
                        'a' => 'ZW3D mendukung workflow assembly hingga 20.000 komponen dengan teknologi lightweight. Performa aktual bergantung pada kompleksitas geometri, RAM, GPU, dan konfigurasi workstation.',
                    ),
                    array(
                        'q' => 'Apakah bisa membuka file dari SolidWorks, NX, atau STEP?',
                        'a' => 'Bisa. ZW3D mendukung 25+ format impor/ekspor, termasuk STEP, IGES, Parasolid, dan format CAD komersial. Geometri impor dapat diedit langsung tanpa feature history aslinya.',
                    ),
                    array(
                        'q' => 'Bagaimana integrasinya dengan ZWCAD?',
                        'a' => 'ZW3D dapat menyinkronkan drawing 2D dengan file DWG/DXF ZWCAD secara associative. Ini memudahkan tim yang memakai ZWCAD untuk dokumentasi 2D dan ZW3D untuk desain 3D.',
                    ),
                    array(
                        'q' => 'Apakah tersedia trial dan demo menggunakan file kami?',
                        'a' => 'Tersedia trial 30 hari. Kami juga menyelenggarakan demo terarah menggunakan file atau studi kasus tim Anda, sehingga evaluasi dilakukan pada workflow nyata — bukan hanya model contoh.',
                    ),
                ),
            ),
        );

        /**
         * URL gambar OG. Ganti di sini kalau file di Media Library berpindah
         * atau WordPress mengubah nama file.
         */
        $pages = apply_filters('vexa_seo_pages', $pages);

        return $pages;
    }

    /**
     * Deteksi apakah SEO plugin lain sudah menangani head. Kalau iya, snippet
     * ini berhenti supaya tidak ada meta ganda.
     */
    function vexa_seo_third_party_active(): bool
    {
        return defined('WPSEO_VERSION')          // Yoast
            || defined('RANK_MATH_VERSION')      // Rank Math
            || defined('SEOPRESS_VERSION')       // SEOPress
            || defined('AIOSEO_VERSION')         // All in One SEO
            || defined('THE_SEO_FRAMEWORK_VERSION'); // The SEO Framework
    }

    /**
     * Slug produk untuk request saat ini, atau null.
     */
    function vexa_seo_current_key(): ?string
    {
        if (is_admin() || !is_singular()) {
            return null;
        }

        $pages = vexa_seo_pages();
        $id    = get_queried_object_id();

        if (!$id) {
            return null;
        }

        $slug = (string) get_post_field('post_name', $id);

        if (isset($pages[$slug])) {
            return $slug;
        }

        // Fallback: segmen terakhir dari permalink (mis. /produk/zwcad/).
        $path     = trim((string) wp_parse_url(get_permalink($id), PHP_URL_PATH), '/');
        $segments = explode('/', $path);
        $last     = (string) end($segments);

        return isset($pages[$last]) ? $last : null;
    }

    /**
     * Judul dokumen.
     */
    add_filter('pre_get_document_title', function ($title) {
        if (vexa_seo_third_party_active()) {
            return $title;
        }

        $key = vexa_seo_current_key();

        if (!$key) {
            return $title;
        }

        $pages = vexa_seo_pages();

        return $pages[$key]['title'];
    }, 20);

    /**
     * Robots: index/follow + preview besar. Menggabung dengan tag bawaan
     * WordPress, bukan menambah tag kedua.
     */
    add_filter('wp_robots', function (array $robots): array {
        if (vexa_seo_third_party_active() || !vexa_seo_current_key()) {
            return $robots;
        }

        $robots['index']             = true;
        $robots['follow']            = true;
        $robots['max-image-preview'] = 'large';
        $robots['max-snippet']       = -1;
        $robots['max-video-preview'] = -1;

        return $robots;
    });

    /**
     * Bahasa halaman produk.
     */
    add_filter('language_attributes', function ($output): string {
        if (!vexa_seo_current_key()) {
            return $output;
        }

        $replaced = preg_replace('/lang="[^"]*"/', 'lang="id-ID"', $output, 1);

        return $replaced === null ? $output : $replaced;
    });

    /**
     * Meta + Open Graph + Twitter Card + hreflang + JSON-LD.
     */
    add_action('wp_head', 'vexa_seo_head', 5);

    function vexa_seo_head(): void
    {
        $key = vexa_seo_current_key();

        if (!$key || vexa_seo_third_party_active()) {
            return;
        }

        $pages = vexa_seo_pages();
        $page  = $pages[$key];
        $org   = vexa_seo_organization();

        echo "\n<!-- Vexa SEO -->\n";

        printf('<meta name="description" content="%s">' . "\n", esc_attr($page['description']));
        printf('<link rel="alternate" hreflang="id-ID" href="%s">' . "\n", esc_url($page['url']));
        printf('<link rel="alternate" hreflang="x-default" href="%s">' . "\n", esc_url($page['url']));

        printf('<meta property="og:type" content="website">' . "\n");
        printf('<meta property="og:site_name" content="%s">' . "\n", esc_attr('Vexa Dinamika Teknologi'));
        printf('<meta property="og:locale" content="id_ID">' . "\n");
        printf('<meta property="og:url" content="%s">' . "\n", esc_url($page['url']));
        printf('<meta property="og:title" content="%s">' . "\n", esc_attr($page['og_title']));
        printf('<meta property="og:description" content="%s">' . "\n", esc_attr($page['og_description']));
        printf('<meta property="og:image" content="%s">' . "\n", esc_url($page['og_image']));
        printf('<meta property="og:image:type" content="image/png">' . "\n");
        printf('<meta property="og:image:width" content="1200">' . "\n");
        printf('<meta property="og:image:height" content="630">' . "\n");
        printf('<meta property="og:image:alt" content="%s">' . "\n", esc_attr($page['og_image_alt']));

        printf('<meta name="twitter:card" content="summary_large_image">' . "\n");
        printf('<meta name="twitter:title" content="%s">' . "\n", esc_attr($page['og_title']));
        printf('<meta name="twitter:description" content="%s">' . "\n", esc_attr($page['og_description']));
        printf('<meta name="twitter:image" content="%s">' . "\n", esc_url($page['og_image']));
        printf('<meta name="twitter:image:alt" content="%s">' . "\n", esc_attr($page['og_image_alt']));

        $graph = array(
            $org,
            vexa_seo_product($page, $org['@id']),
            vexa_seo_faq($page),
            vexa_seo_breadcrumb($page),
        );

        foreach ($graph as $node) {
            printf(
                '<script type="application/ld+json">%s</script>' . "\n",
                wp_json_encode($node, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE)
            );
        }
    }

    function vexa_seo_organization(): array
    {
        return array(
            '@context'     => 'https://schema.org',
            '@type'        => 'Organization',
            '@id'          => 'https://vexatekno.com/#organization',
            'name'         => 'PT Vexa Dinamika Teknologi',
            'alternateName' => 'Vexa',
            'url'          => 'https://vexatekno.com/',
            'logo'         => array(
                '@type'  => 'ImageObject',
                'url'    => 'https://vexatekno.com/wp-content/uploads/2026/04/cropped-Judul2.png',
                'width'  => 512,
                'height' => 512,
            ),
            'description'  => 'Distributor resmi ZWSOFT untuk Indonesia. Penjualan, implementasi, training, dan dukungan teknis ZWCAD dan ZW3D.',
            'email'        => 'krisna@vexatekno.com',
            'telephone'    => '+6281902244660',
            'areaServed'   => array('@type' => 'Country', 'name' => 'Indonesia'),
            'contactPoint' => array(
                array(
                    '@type'            => 'ContactPoint',
                    'contactType'      => 'sales',
                    'telephone'        => '+6281902244660',
                    'email'            => 'krisna@vexatekno.com',
                    'areaServed'       => 'ID',
                    'availableLanguage' => array('id', 'en'),
                ),
            ),
        );
    }

    function vexa_seo_product(array $page, string $org_id): array
    {
        $offers = array();

        foreach ($page['offers'] as $offer) {
            $offers[] = array(
                '@type'         => 'Offer',
                'name'          => $offer['name'],
                'price'         => $offer['price'],
                'priceCurrency' => 'IDR',
                'availability'  => 'https://schema.org/InStock',
                'itemCondition' => 'https://schema.org/NewCondition',
                'url'           => $page['url'] . '#harga',
            );
        }

        return array(
            '@context'    => 'https://schema.org',
            '@type'       => 'Product',
            'name'        => $page['name'],
            'description' => $page['product_desc'],
            'brand'       => array('@type' => 'Brand', 'name' => 'ZWSOFT'),
            'category'    => 'Computer aided design software',
            'url'         => $page['url'],
            'image'       => array($page['og_image']),
            'offers'      => array(
                '@type'          => 'AggregateOffer',
                'priceCurrency'  => 'IDR',
                'lowPrice'       => $page['price_low'],
                'highPrice'      => $page['price_high'],
                'offerCount'     => (string) count($page['offers']),
                'availability'   => 'https://schema.org/InStock',
                'seller'         => array('@id' => $org_id),
                'offers'         => $offers,
            ),
        );
    }

    function vexa_seo_faq(array $page): array
    {
        $items = array();

        foreach ($page['faq'] as $pair) {
            $items[] = array(
                '@type'          => 'Question',
                'name'           => $pair['q'],
                'acceptedAnswer' => array(
                    '@type' => 'Answer',
                    'text'  => $pair['a'],
                ),
            );
        }

        return array(
            '@context'   => 'https://schema.org',
            '@type'      => 'FAQPage',
            '@id'        => $page['url'] . '#faq',
            'mainEntity' => $items,
        );
    }

    function vexa_seo_breadcrumb(array $page): array
    {
        return array(
            '@context'        => 'https://schema.org',
            '@type'           => 'BreadcrumbList',
            '@id'             => $page['url'] . '#breadcrumb',
            'itemListElement' => array(
                array(
                    '@type'    => 'ListItem',
                    'position' => 1,
                    'name'     => 'Beranda',
                    'item'     => 'https://vexatekno.com/',
                ),
                array(
                    '@type'    => 'ListItem',
                    'position' => 2,
                    'name'     => $page['name'],
                    'item'     => $page['url'],
                ),
            ),
        );
    }
}
