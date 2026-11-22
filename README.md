# TUGASREEN

Platform pemesanan bantuan tugas terstruktur dengan alur brief, upload multi-file, pembuatan ZIP otomatis, budget, status pekerjaan, dan panel admin.

## Fitur yang sudah tersedia

- Landing page responsif dengan identitas visual TUGASREEN.
- Registrasi dan login email/password melalui Supabase Auth.
- Login Google dengan callback `/auth/callback`.
- Form pesanan tiga langkah.
- Upload 1–10 file dengan batas total 20 MB.
- Validasi PDF, DOC/DOCX, PPT/PPTX, XLS/XLSX, dan ZIP.
- Penggabungan seluruh lampiran menjadi satu ZIP di server.
- Penyimpanan paket ZIP privat di Supabase Storage.
- Riwayat pesanan pengguna di `/orders`.
- Panel admin di `/admin` dengan unduh ZIP, status, harga final, dan catatan progres.
- Keep-alive database harian dan pembersihan file pesanan lama.

## Menjalankan secara lokal

Persyaratan: Node.js 20 atau versi yang kompatibel dengan Next.js 16.

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

## Environment variables

Buat `.env.local` di root proyek:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ADMIN_EMAILS=admin@example.com
CRON_SECRET=replace-with-a-long-random-secret
```

`SUPABASE_SERVICE_ROLE_KEY` dan `CRON_SECRET` hanya boleh disimpan sebagai secret server. Jangan menggunakan awalan `NEXT_PUBLIC_` untuk keduanya.

## Menyiapkan Supabase

### Proyek baru

Jalankan seluruh isi `supabase_migration.sql` melalui Supabase SQL Editor.

### Proyek lama TUGASREEN

Jalankan `supabase_upgrade_v2.sql` sekali. Upgrade ini:

- mengubah bucket `task-files` menjadi privat;
- membatasi file berdasarkan folder pemilik;
- memperbaiki policy profile, order, dan event;
- mempertahankan akses penuh untuk role admin.

Setelah akun admin mendaftar, tandai profilnya:

```sql
update public.profiles
set role = 'admin'
where email = 'admin@example.com';
```

Untuk Google login, aktifkan Google provider di Supabase Authentication dan tambahkan URL berikut ke Redirect URLs:

```text
http://localhost:3000/auth/callback
https://domain-produksi-anda/auth/callback
```

## Verifikasi

```bash
npm run lint
npm run build
```

Tailwind CSS diproses melalui PostCSS pada dev dan build produksi. Build menggunakan Webpack untuk menghindari panic Turbopack yang pernah terjadi di Windows.

## Deploy Vercel

1. Push branch yang sudah diverifikasi ke GitHub.
2. Import repository ke Vercel.
3. Tambahkan seluruh environment variables.
4. Ubah `NEXT_PUBLIC_SITE_URL` menjadi URL produksi.
5. Tambahkan URL produksi ke Supabase Authentication Redirect URLs.
6. Deploy. Jadwal di `vercel.json` akan mengaktifkan keep-alive dan cleanup mingguan.

## Catatan Google Drive

Struktur file sudah disiapkan sebagai satu ZIP per pesanan, sehingga integrasi Google Drive dapat ditambahkan sebagai tahap berikutnya. Integrasi tersebut belum diaktifkan karena membutuhkan keputusan akun tujuan dan kredensial OAuth/Service Account.
