import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { siteConfig } from '@/config/site'
import { Suspense } from 'react'

async function AdminContent() {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/login')
  }

  // check if user is admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('role, email')
    .eq('id', user.id)
    .single()

  const isAdmin = profile?.role === 'admin' || siteConfig.adminEmails.includes(user.email || '')

  if (!isAdmin) {
    redirect('/')
  }

  // fetch orders for admin
  const { data: orders } = await supabase
    .from('orders')
    .select('*, profiles:user_id(nama, email)')
    .order('created_at', { ascending: false })

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
              <p className="text-xs text-emerald-300">Login sebagai: {user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-xs font-bold text-white transition">
              Keluar ke Beranda
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100">
            <h2 className="text-xl font-black text-slate-900">Daftar Semua Pesanan Client</h2>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">Total: {orders?.length || 0} Pesanan</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-bold text-slate-500 uppercase">
                  <th className="py-4 px-4">Client</th>
                  <th className="py-4 px-4">Layanan & Judul</th>
                  <th className="py-4 px-4">Budget / Harga</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4">Aksi Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {orders && orders.length > 0 ? (
                  orders.map((order: any) => (
                    <tr key={order.id}>
                      <td className="py-4 px-4">
                        <p className="font-bold text-slate-900">{order.profiles?.nama || 'Client'}</p>
                        <p className="text-xs text-slate-500">{order.profiles?.email}</p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-bold text-slate-800">{order.jenis_layanan} - {order.mata_kuliah}</p>
                        <p className="text-xs text-slate-500">{order.judul}</p>
                      </td>
                      <td className="py-4 px-4 font-bold text-emerald-700">Rp {order.harga_diajukan?.toLocaleString()}</td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">{order.status}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-xs text-slate-400 font-medium">Detail / Aksi</span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-400">Belum ada pesanan masuk.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-bold text-emerald-800">Memuat Panel Admin...</div>}>
      <AdminContent />
    </Suspense>
  )
}
