# Photobooth app

Halaman: `/` (booth tablet, Chrome), `/camera` (iPhone, Safari), `/?d=ID` (unduh, dibuka dari QR).

## Setup (sekali)
1. Firebase: aktifkan Firestore, Authentication (Email/Password), Storage, dan paket Blaze (untuk Functions + Storage).
2. Isi `public/firebase-config.js` dengan config web app.
3. Authentication → buat 1 user admin. Di Firestore buat dokumen `admins/<UID user itu>` (isi bebas, mis. `{ok:true}`).
4. Midtrans: ambil Server Key (sandbox dulu), lalu:
       firebase functions:secrets:set MIDTRANS_SERVER_KEY
5. Deploy:
       cd functions && npm install && cd ..
       firebase use --add
       firebase deploy
6. Isi URL function `midtransWebhook` di dashboard Midtrans (Payment Notification URL).
7. Hapus otomatis 7 hari + izin CORS untuk Storage (ganti BUCKET, mis. PROJECT_ID.appspot.com):
       gcloud storage buckets update gs://BUCKET --lifecycle-file=lifecycle.json --cors-file=cors.json

## Pemakaian
- Login lewat tombol Pengaturan di halaman pembuka: harga, semua waktu, tambah/hapus template.
- "Lewati pembayaran" aktif secara default supaya alur bisa dites tanpa Midtrans. Matikan untuk produksi.
- Template = PNG dengan area foto transparan. Posisi foto diisi per baris `x,y,w,h` (piksel gambar template).
