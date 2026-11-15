# Photobooth (paket Spark / GitHub Pages, multi-akun)

Tiap akun login punya isi sendiri: pengaturan, template, dan room kamera. Tidak ada role admin terpisah.

## Pasang
1. Upload `index.html`, `camera.html`, `common.js`, `firebase-config.js` ke root repo GitHub Pages.
2. Firebase Console, Firestore, Rules: tempel isi `firestore.rules`, lalu Publish.
3. Authentication, Sign-in method: aktifkan Email/Password. Buat akun di tab Users (Add user), satu per pemilik.
4. Authentication, Settings, Authorized domains: pastikan domain GitHub Pages ada di daftar.

## Pakai
- Tablet (Chrome): buka situs, tekan Pengaturan, login dengan akun pemilik. Login tetap tersimpan di tablet.
- iPhone (Safari): buka `.../camera.html`, login dengan akun yang SAMA, lalu Mulai kamera.
- Isi PIN di Pengaturan supaya customer tidak bisa membuka pengaturan di tablet yang sedang login.
