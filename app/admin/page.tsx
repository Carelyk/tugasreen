'use client'

import Link from 'next/link'
import { siteConfig } from '@/config/site'
import { ShieldAlert, CheckCircle, Clock, FileText, ArrowLeft, RefreshCw } from 'lucide-react'

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="bg-emerald-950 text-white border-b border-emerald-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center font-bold text-lg">
              AD
            </div>
            <div>
              <h1 className="font-black text-lg">Panel Admin {siteConfig.name}</h1>
              <p className="text-xs text-emerald-300">Kelola pesanan, ACC / Nego harga, dan status pengerjaan.</p>
            </div>
          </div>
          <Link href="/" className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-xs font-bold text-white transition">
            Keluar ke Beranda
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-xs font-bold text-slate-500 uppercase">Pesanan Masuk</p>
            <p className="text-3xl font-black text-emerald-900 mt-2">12</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-xs font-bold text-slate-500 uppercase">Menunggu ACC</p>
            <p className="text-3xl font-black text-amber-600 mt-2">4</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-xs font-bold text-slate-500 uppercase">Sedang Diproses</p>
            <p className="text-3xl font-black text-blue-600 mt-2">6</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-xs font-bold text-slate-500 uppercase">Estimasi Storage</p>
            <p className="text-3xl font-black text-emerald-700 mt-2">145 MB <span className="text-xs font-normal text-slate-500">/ 1 GB</span></p>
          </div>
        </div>

        {/* Actions & Filters */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
            <h2 className="text-xl font-black text-slate-900">Daftar Semua Pesanan Client</h2>
            <div className="flex items-center gap-3">
              <button onClick={() => alert('Storage cleanup executed!')} className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition flex items-center gap-2">
                <RefreshCw className="w-4 h-4" /> Bersihkan File Lama ({siteConfig.cleanupDaysOld} hari)
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-bold text-slate-500 uppercase">
                  <th className="py-4 px-4">Client / Layanan</th>
                  <th className="py-4 px-4">Mata Kuliah & Judul</th>
                  <th className="py-4 px-4">Budget Client</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4">Aksi Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                <tr>
                  <td className="py-4 px-4">
                    <p className="font-bold text-slate-900">Budi Santoso</p>
                    <p className="text-xs text-slate-500">Tugas Individu</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-bold text-slate-800">Kalkulus II</p>
                    <p className="text-xs text-slate-500">Integral Lipat Tiga</p>
                  </td>
                  <td className="py-4 px-4 font-bold text-emerald-700">Rp 75.000</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">Menunggu ACC</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => alert('ACC Pesanan')} className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800 transition">ACC</button>
                      <button onClick={() => alert('Nego Harga')} className="px-3 py-1.5 rounded-lg bg-amber-600 text-white font-bold text-xs hover:bg-amber-700 transition">Nego</button>
                      <button onClick={() => alert('Tolak')} className="px-3 py-1.5 rounded-lg bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition">Tolak</button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4">
                    <p className="font-bold text-slate-900">Siti Rahma</p>
                    <p className="text-xs text-slate-500">Analisis Data</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-bold text-slate-800">Statistika Bisnis</p>
                    <p className="text-xs text-slate-500">Uji Regresi SPSS</p>
                  </td>
                  <td className="py-4 px-4 font-bold text-emerald-700">Rp 150.000</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">Diproses</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => alert('Ubah status ke Selesai')} className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800 transition">Selesaikan</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
