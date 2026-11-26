# tuGasREEN

Landing page layanan bantuan tugas dengan konsultasi langsung melalui kanal kontak dan panel internal admin.

## Fitur yang sudah tersedia

- Landing page responsif dengan identitas visual tuGasREEN.
- Alur publik tanpa registrasi atau login pengguna.
- Section kontak untuk WhatsApp, Instagram, dan X dengan status aman ketika kanal belum dikonfigurasi.
- Route publik lama `/login`, `/order/new`, dan `/orders` dialihkan ke beranda atau section kontak.
- Kode legacy upload ZIP dan penyimpanan privat Supabase Storage tetap tersedia, tetapi tidak diekspos ke pengunjung.
- Login internal admin di `/admin-login` menggunakan email/password Supabase.
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
NEXT_PUBLIC_WHATSAPP_NUMBER=628xxxxxxxxxx
NEXT_PUBLIC_WHATSAPP_DISPLAY=08xx-xxxx-xxxx
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/username
NEXT_PUBLIC_X_URL=https://x.com/username
```

`SUPABASE_SERVICE_ROLE_KEY` dan `CRON_SECRET` hanya boleh disimpan sebagai secret server. Jangan menggunakan awalan `NEXT_PUBLIC_` untuk keduanya.

## Menyiapkan Supabase

### Proyek baru

Jalankan seluruh isi `supabase_migration.sql` melalui Supabase SQL Editor.

### Proyek lama tuGasREEN

Jalankan `supabase_upgrade_v2.sql` sekali. Upgrade ini:

- mengubah bucket `task-files` menjadi privat;
- membatasi file berdasarkan folder pemilik;
- memperbaiki policy profile, order, dan event;
- mempertahankan akses penuh untuk role admin.

Setelah akun admin dibuat di Supabase, tandai profilnya:

```sql
update public.profiles
set role = 'admin'
where email = 'admin@example.com';
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

Google Drive belum aktif. Implementasi saat ini masih memiliki kode legacy untuk menyimpan ZIP ke bucket privat Supabase Storage `task-files`, tetapi route upload publik sudah dialihkan ke section kontak. Integrasi Drive tanpa akun pengguna memerlukan Google Cloud service account, ID folder tujuan, pembagian akses folder kepada service account, serta proteksi upload publik seperti rate limit dan CAPTCHA.
