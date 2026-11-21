import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { CalendarClock, Download, FileArchive, LayoutDashboard, WalletCards } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { createAdminClient } from '@/utils/supabase/admin'
import { createClient } from '@/utils/supabase/server'
import { OrderActions } from './order-actions'

export const metadata = { title: 'Panel admin' }

type AdminOrder = {
  id: string
  user_id: string
  jenis_layanan: string
  mata_kuliah: string
  judul: string
  deskripsi: string
  deadline: string
  harga_diajukan: number
  harga_final: number | null
  status: string
  file_urls: string[] | null
  created_at: string
  profiles: { nama: string; email: string } | null
}

async function AdminContent() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin' && !siteConfig.adminEmails.includes(user.email ?? '')) redirect('/')

  const admin = createAdminClient()
  const { data, error } = await admin
    .from('orders')
    .select('id, user_id, jenis_layanan, mata_kuliah, judul, deskripsi, deadline, harga_diajukan, harga_final, status, file_urls, created_at, profiles:user_id(nama, email)')
    .order('created_at', { ascending: false })

  const orders = (data ?? []) as unknown as AdminOrder[]
  const pendingCount = orders.filter((order) => order.status === 'Menunggu ACC').length
  const activeCount = orders.filter((order) => ['Nego Harga', 'Diproses', 'Revisi'].includes(order.status)).length

  return (
    <main className="min-h-screen bg-[#f3f6f1] px-4 py-6 text-[#17382d] sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-[2rem] bg-[#073f31] p-6 text-white sm:p-9">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"><div><div className="flex items-center gap-2 text-sm font-bold text-[#c9f24b]"><LayoutDashboard className="size-4" /> Ruang kerja admin</div><h1 className="mt-3 text-4xl font-black tracking-[-0.05em]">Kelola pesanan</h1><p className="mt-3 text-emerald-100/65">Masuk sebagai {user.email}</p></div><Link href="/" className="rounded-xl border border-white/15 px-4 py-3 text-center text-sm font-extrabold hover:bg-white/10">Lihat website</Link></div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3"><div className="rounded-2xl bg-white/10 p-5"><p className="text-sm font-semibold text-emerald-100/60">Total pesanan</p><p className="mt-2 text-3xl font-black">{orders.length}</p></div><div className="rounded-2xl bg-[#c9f24b] p-5 text-[#073f31]"><p className="text-sm font-semibold">Menunggu review</p><p className="mt-2 text-3xl font-black">{pendingCount}</p></div><div className="rounded-2xl bg-white/10 p-5"><p className="text-sm font-semibold text-emerald-100/60">Sedang berjalan</p><p className="mt-2 text-3xl font-black">{activeCount}</p></div></div>
        </header>

        {error && <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-4 font-bold text-rose-700">Data gagal dimuat: {error.message}</div>}

        <div className="mt-6 grid gap-5">
          {orders.length === 0 ? <div className="rounded-[2rem] border border-dashed border-emerald-950/20 bg-white p-12 text-center"><FileArchive className="mx-auto size-8 text-[#0b6b4f]" /><p className="mt-4 text-xl font-black">Belum ada pesanan masuk.</p></div> : orders.map((order) => (
            <article key={order.id} className="rounded-[2rem] border border-emerald-950/10 bg-white p-5 shadow-sm sm:p-7">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0"><div className="flex flex-wrap items-center gap-3"><span className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-black text-emerald-800">{order.status}</span><span className="font-mono text-xs font-bold text-[#829088]">#{order.id.slice(0, 8).toUpperCase()}</span></div><h2 className="mt-4 text-2xl font-black tracking-[-0.035em]">{order.judul}</h2><p className="mt-2 text-[#687a71]">{order.profiles?.nama ?? 'Client'} • {order.profiles?.email ?? 'Email tidak tersedia'}</p><p className="mt-4 max-w-3xl leading-7 text-[#425c51]">{order.deskripsi}</p></div>
                {order.file_urls && order.file_urls.length > 0 && <Link href={`/api/files/${order.id}`} className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#073f31] px-4 py-3 text-sm font-extrabold text-white"><Download className="size-4" /> Unduh ZIP</Link>}
              </div>
              <div className="my-6 grid gap-3 border-y border-emerald-950/10 py-5 sm:grid-cols-3"><div className="flex items-center gap-3"><CalendarClock className="size-5 text-[#0b6b4f]" /><div><p className="text-xs font-bold text-[#7b8981]">Deadline</p><p className="mt-1 text-sm font-extrabold">{new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Jakarta' }).format(new Date(order.deadline))}</p></div></div><div className="flex items-center gap-3"><WalletCards className="size-5 text-[#0b6b4f]" /><div><p className="text-xs font-bold text-[#7b8981]">Budget</p><p className="mt-1 text-sm font-extrabold">{order.harga_diajukan === 0 ? 'Minta rekomendasi' : `Rp${Number(order.harga_diajukan).toLocaleString('id-ID')}`}</p></div></div><div className="flex items-center gap-3"><FileArchive className="size-5 text-[#0b6b4f]" /><div><p className="text-xs font-bold text-[#7b8981]">Layanan</p><p className="mt-1 text-sm font-extrabold">{order.jenis_layanan} • {order.mata_kuliah}</p></div></div></div>
              <OrderActions orderId={order.id} initialStatus={order.status} initialFinalPrice={order.harga_final} />
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}

export default function AdminPage() {
  return <Suspense fallback={<div className="grid min-h-screen place-items-center bg-[#f3f6f1] font-bold text-[#0b6b4f]">Memuat panel admin...</div>}><AdminContent /></Suspense>
}
