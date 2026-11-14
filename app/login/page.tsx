'use client'

import Link from 'next/link'
import { siteConfig } from '@/config/site'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-emerald-50/60 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-emerald-100 p-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-emerald-700 text-white font-bold text-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-700/20">
          TR
        </div>
        <h1 className="text-2xl font-black text-emerald-950 mb-2">Masuk ke {siteConfig.name}</h1>
        <p className="text-slate-600 text-sm mb-8">Kelola pesanan tugas akademik Anda dengan mudah dan aman.</p>
        
        {/* Supabase Auth UI placeholder or standard login buttons */}
        <div className="space-y-4">
          <button onClick={() => alert('Integrasikan dengan Supabase Auth login Google/Email')} className="w-full py-3.5 px-4 rounded-xl border border-emerald-200 bg-white hover:bg-emerald-50 font-bold text-slate-700 text-sm transition flex items-center justify-center gap-3 shadow-xs">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.19v3.15C3.17 21.37 7.27 24 12 24z"/>
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.19C.43 8.1 0 9.8 0 12s.43 3.9 1.19 5.42l4.09-3.15z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.27 0 3.17 2.63 1.19 6.58l4.09 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
            </svg>
            Masuk dengan Google
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-emerald-100 flex items-center justify-between text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-emerald-700 transition">← Kembali ke Beranda</Link>
          <Link href="/admin" className="hover:text-emerald-700 transition">Portal Admin →</Link>
        </div>
      </div>
    </div>
  )
}
