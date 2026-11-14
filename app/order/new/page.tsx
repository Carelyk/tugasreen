'use client'

import Link from 'next/link'
import { siteConfig, servicesList } from '@/config/site'
import { ArrowLeft, Upload, CheckCircle } from 'lucide-react'

export default function NewOrderPage() {
  return (
    <div className="min-h-screen bg-emerald-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-900 transition">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
          </Link>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-200 text-emerald-900">Form Pemesanan Multi-Step</span>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-emerald-100 p-8 sm:p-10">
          <h1 className="text-2xl sm:text-3xl font-black text-emerald-950 mb-2">Buat Pesanan Tugas Baru</h1>
          <p className="text-slate-600 text-sm mb-8">Lengkapi detail tugas Anda dan ajukan estimasi budget yang diinginkan.</p>

          <form onSubmit={(e) => { e.preventDefault(); alert('Pesanan berhasil disubmit! (Demo mode)'); }} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-emerald-950 mb-2">Pilih Jenis Layanan</label>
              <select className="w-full px-4 py-3 rounded-xl border border-emerald-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 text-sm font-medium">
                {servicesList.map(s => (
                  <option key={s.id} value={s.id}>{s.title}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-emerald-950 mb-2">Mata Kuliah / Topik</label>
                <input type="text" required placeholder="Contoh: Kalkulus II / Pemrograman Web" className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 text-sm font-medium" />
              </div>
              <div>
                <label className="block text-sm font-bold text-emerald-950 mb-2">Judul / Topik Spesifik</label>
                <input type="text" required placeholder="Contoh: Analisis Algoritma Sorting" className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 text-sm font-medium" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-emerald-950 mb-2">Deskripsi Kebutuhan Tugas (Min. 20 karakter)</label>
              <textarea rows={4} required minLength={20} placeholder="Jelaskan detail instruksi, format output, dan hal khusus yang perlu diperhatikan..." className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 text-sm font-medium"></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-emerald-950 mb-2">Deadline Pengerjaan</label>
                <input type="datetime-local" required className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 text-sm font-medium" />
              </div>
              <div>
                <label className="block text-sm font-bold text-emerald-950 mb-2">Tingkat Kesulitan</label>
                <select className="w-full px-4 py-3 rounded-xl border border-emerald-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 text-sm font-medium">
                  <option value="Mudah">Mudah</option>
                  <option value="Sedang">Sedang</option>
                  <option value="Sulit">Sulit</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-emerald-950 mb-2">Estimasi Harga / Budget Anda (Rupiah)</label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-slate-500 font-bold text-sm">Rp</span>
                <input type="number" min={0} step={10000} required placeholder="Contoh: 75000" className="w-full pl-12 pr-4 py-3 rounded-xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 text-sm font-medium" />
              </div>
              <p className="text-xs text-slate-500 mt-1">Atau ketik 0 jika ingin meminta rekomendasi harga wajar dari admin.</p>
            </div>

            <div>
              <label className="block text-sm font-bold text-emerald-950 mb-2">Upload File Instruksi (PDF / DOCX / ZIP, Maks 20MB)</label>
              <div className="border-2 border-dashed border-emerald-200 rounded-2xl p-6 text-center bg-emerald-50/50 hover:bg-emerald-50 transition cursor-pointer">
                <Upload className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <p className="text-sm font-bold text-emerald-900">Klik untuk upload file atau drag & drop</p>
                <p className="text-xs text-slate-500 mt-1">PDF, DOCX, PPTX, XLSX, ZIP (Maks 20MB)</p>
                <input type="file" className="hidden" />
              </div>
            </div>

            <button type="submit" className="w-full py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-base shadow-lg shadow-emerald-700/25 transition">
              Kirim Pesanan Sekarang
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
