# Photobooth (paket Spark / GitHub Pages)

## Pasang
1. Upload semua file kecuali `firestore.rules` dan `README.md` ke root repo GitHub Pages.
2. Firebase Console → Firestore → Rules: tempel isi `firestore.rules`, lalu Publish.
3. Authentication → Sign-in method: aktifkan Email/Password, lalu buat 1 user admin (tab Users).
4. Firestore: buat koleksi `admins`, dokumen dengan ID = UID user admin tadi (isi bebas, mis. ok: true).

## Pakai
- Tablet (Chrome): buka alamat situs (`index.html`).
- iPhone (Safari): buka `.../camera.html`, tekan "Mulai kamera".
- Pengaturan (tombol kanan bawah halaman pembuka): harga, waktu, mode pembayaran, PIN operator, gambar QRIS, template.
- Template: PNG dengan area foto transparan. Area foto terdeteksi otomatis, klik kotak untuk mengatur urutan.
- Mode "Lewati pembayaran" aktif secara default untuk tes. Matikan untuk produksi.
