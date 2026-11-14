# TUGASREEN — Platform Jasa Layanan Tugas Akademik

Website lengkap untuk jasa layanan tugas akademik **TUGASREEN** (*"Your Tasks, Your Way."*). Dibangun dengan **Next.js (App Router) + TypeScript + Tailwind CSS + Supabase**, dirancang anti-down di Vercel free tier dengan keep-alive cron dan manajemen storage otomatis.

---

## Fitur Utama

1. **Sistem Pemesanan Canggih (Client-Driven Pricing)**:
   - Form multi-step lengkap (layanan, mata kuliah, judul, deskripsi min 20 karakter, deadline, tingkat kesulitan).
   - Upload file instruksi (PDF/DOCX/PPTX/XLSX/ZIP, max 20MB) dengan validasi client & server.
   - Client memasukkan estimasi harga/budget sendiri atau meminta rekomendasi admin.
2. **Flow Admin ACC / Nego / Tolak**:
   - Panel admin terproteksi (`/admin`) untuk mengelola semua pesanan masuk.
   - Admin dapat melakukan **ACC** (harga final), **Tolak** (dengan alasan), atau **Nego** (harga balik ke client).
   - Perubahan status real-time (`Menunggu ACC` → `Diproses` → `Revisi` → `Selesai`).
3. **Anti-Down untuk Free Tier (Wajib)**:
   - **Keep-alive Supabase**: API route `/api/keep-alive` dipanggil otomatis oleh **Vercel Cron** (`vercel.json`) setiap hari jam 01.00 UTC agar Supabase tidak pernah pause karena inaktif.
   - **Manajemen Storage Otomatis**: Endpoint `/api/cleanup-storage` untuk membersihkan file instruksi order lama (>30 hari) secara otomatis.
4. **Keamanan & RLS**:
   - Supabase Row Level Security (RLS) aktif untuk tabel `profiles`, `orders`, dan `order_events`.
   - Konfigurasi environment variables terpusat di `src/config/site.ts` dan `.env.example`.

---

## Panduan Instalasi & Deploy Lengkap (Untuk Pemula)

### 1. Setup Project Supabase Baru
1. Buat project baru di [Supabase](https://supabase.com).
2. Buka **SQL Editor** di dashboard Supabase Anda.
3. Salin seluruh isi file `supabase_migration.sql` dari repository ini, lalu jalankan (*Run*). Ini akan membuat tabel `profiles`, `orders`, `order_events`, policy RLS, trigger auth otomatis, dan storage bucket `task-files`.

### 2. Konfigurasi Environment Variables
Buat file `.env.local` di root folder berdasarkan `.env.example`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ADMIN_EMAILS=admin@tugasreen.com,owner@tugasreen.com
CRON_SECRET=random-secure-cron-secret-token
```

### 3. Menjalankan di Lokal
```bash
npm install
npm run dev
```
Buka `http://localhost:3000` di browser Anda.

### 4. Deploy ke Vercel
1. Hubungkan repository GitHub Anda ke Vercel.
2. Masukkan semua Environment Variables dari langkah ke-2 ke Vercel Project Settings.
3. Klik **Deploy**. Vercel akan otomatis mendeteksi `vercel.json` untuk mengaktifkan Vercel Cron keep-alive.

### 5. Setup UptimeRobot (Monitoring Uptime Gratis)
1. Buat akun gratis di [UptimeRobot](https://uptimerobot.com).
2. Tambahkan **New Monitor** dengan tipe **HTTP(s)**.
3. Masukkan URL production Vercel Anda (mis. `https://tugasreen.vercel.app`).
4. Atur interval pemantauan 5 menit. Masukkan email admin untuk alert jika terjadi gangguan.

### 6. Cara Ganti ke Custom Domain Nanti
1. Beli domain Anda (mis. `tugasreen.com`).
2. Masuk ke Vercel Dashboard → Project Settings → **Domains**, lalu tambahkan domain Anda dan ikuti instruksi DNS records.
3. Update nilai `NEXT_PUBLIC_SITE_URL` di Environment Variables Vercel menjadi `https://tugasreen.com`.
4. Di Supabase Dashboard → Authentication → **URL Configuration**, update Site URL dan Redirect URLs sesuai domain baru Anda.
