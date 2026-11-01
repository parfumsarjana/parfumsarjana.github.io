# PARFUM SARJANA – POS (GitHub Pages + Firebase)

Aplikasi kasir: Kasir, Pelanggan, Laporan, Riwayat, dan Pengaturan. Login memakai Firebase Authentication; hak akses dijaga aturan Firestore.

## Fitur utama
- **Kasir**: tampilan produk Grid / List (pilihan diingat), paginasi. Keranjang hanya menampilkan item, subtotal, total, dan tombol **Buat Pesanan**; pelanggan, diskon, metode bayar, QRIS, dan kembalian ada di popup pembayaran.
- **Pelanggan**: tambah pelanggan lewat popup; detail pelanggan punya filter tanggal pesanan dan produk.
- **Riwayat**: filter cabang, kasir, kategori, cari produk/invoice, plus paginasi.
- **Pengaturan**: Produk (tambah/edit popup, impor & ekspor Excel, edit massal), Kategori, Cabang, Role & Akses, Akun Staff (tambah & edit), Template Struk, QRIS. Semua form tambah berupa popup.

## 1. Buat proyek Firebase
1. console.firebase.google.com > **Add project**.
2. **Build > Authentication > Get started > Sign-in method > Email/Password > Enable.**
3. **Build > Firestore Database > Create database** (production mode, mis. `asia-southeast2` Jakarta).
4. Tab **Rules**: hapus isinya, tempel seluruh isi `firestore.rules`, klik **Publish**. (Wajib dipublish ulang karena aturan berubah untuk role dinamis.)
5. **Project settings > General > Your apps > ikon Web `</>`**, daftarkan aplikasi, salin nilai `firebaseConfig` ke `config.js`.

## 2. Buat admin pertama (sekali saja)
1. **Authentication > Users > Add user**: email `admin@parfumsarjana.app` + password. Salin **User UID**.
2. **Firestore > Start collection `users`** > Document ID = UID tadi > field: `username` = `admin`, `role` = `admin`, `active` (boolean) = `true`.
3. Login pertama sebagai admin otomatis membuat data awal cabang (UMS, UNS) dan role **Kasir**. Selanjutnya kelola dari **Pengaturan**.

Saat login ketik `admin` (tanpa @...) dan password; jika ada lebih dari satu cabang aktif, pilih cabang setelahnya.

## 3. Pasang di GitHub Pages
1. Unggah `index.html`, `config.js`, `README.md`, `firestore.rules`, dan `qris.png` ke root repository.
2. **Settings > Pages > Deploy from a branch > main / (root).**
3. Firebase: **Authentication > Settings > Authorized domains > Add domain** `USERNAME.github.io`.
4. Buka `https://USERNAME.github.io/NAMA-REPO/`.

## Catatan
- **Cabang**: Pengaturan > Cabang. Kode cabang tidak bisa diubah; cabang nonaktif tidak muncul saat memilih cabang.
- **Role**: Pengaturan > Role & Akses. Admin selalu punya semua akses. Akses lain bisa diaktif/nonaktifkan per role (kasir, pelanggan, laporan, riwayat, batal transaksi, kelola produk/kategori/struk, lihat semua cabang & periode lama). Akses ditegakkan di aplikasi dan di aturan Firestore.
- **QRIS**: admin bisa mengunggah gambar di Pengaturan > QRIS (disimpan di database). Jika kosong, aplikasi memakai `qris.png` di root.
- **Excel**: kolom `SKU, Nama, Kategori, Harga, Stok` (kolom `ID` dari hasil ekspor juga dikenali). Produk dicocokkan lewat ID, lalu SKU. Gunakan tombol *Unduh template* di popup impor. Ekspor memakai produk terpilih, atau semua hasil filter bila tidak ada yang dipilih. Pustaka SheetJS dimuat dari CDN saat dibutuhkan.
- **Edit massal**: centang produk di tabel, klik *Edit Massal* (kategori, harga: set / % / Rp, stok: set / tambah).
- **Template struk**: judul, info toko, teks penutup, lebar kertas 58/80 mm, dan bagian yang ditampilkan. Dipakai untuk nota, WhatsApp, dan cetak.
- Produk, stok, kategori, dan pelanggan dipakai bersama semua cabang; transaksi dan laporan dipisah per cabang.
- Laporan dibaca dari ringkasan harian per kasir (hemat kuota baca). Riwayat memuat maksimal 300 transaksi terbaru per cabang per periode; paginasi dilakukan di sisi aplikasi. Tidak ada pembaruan otomatis; pakai **Muat ulang**.
- Pencarian pelanggan berdasarkan awalan nama atau nomor HP; daftar memuat maksimal 300 pelanggan. Nomor WhatsApp menjadi ID pelanggan dan tidak bisa diubah.
- Mengganti password akun: hapus akun di Firebase Console (Authentication) lalu buat ulang dari aplikasi.
