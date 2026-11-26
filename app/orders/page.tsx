import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { CalendarClock, Download, FileArchive, Plus, WalletCards } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'
import { PreferencesControls } from '@/components/preferences'
import { Notice } from '@/components/notice'

export const metadata = { title: 'Pesanan saya' }

type Order = {
  id: string
  judul: string
  mata_kuliah: string
  jenis_layanan: string
  deadline: string
  harga_diajukan: number
  harga_final: number | null
  status: string
  file_urls: string[] | null
  created_at: string
}

const statusStyle: Record<string, string> = {
  'Menunggu ACC': 'bg-amber-100 text-amber-800',
  'Nego Harga': 'bg-violet-100 text-violet-800',
  Diproses: 'bg-blue-100 text-blue-800',
  Revisi: 'bg-orange-100 text-orange-800',
  Selesai: 'bg-emerald-100 text-emerald-800',
  Dibatalkan: 'bg-slate-200 text-slate-700',
  Ditolak: 'bg-rose-100 text-rose-800',
}

async function OrdersContent() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data, error } = await supabase
    .from('orders')
    .select('id, judul, mata_kuliah, jenis_layanan, deadline, harga_diajukan, harga_final, status, file_urls, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const orders = (data ?? []) as Order[]

  return (
    <main className="min-h-screen bg-[#f7faf4] px-4 py-6 text-[#17382d] sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-6 rounded-[2rem] bg-[#004b34] p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-9">
          <div><Link href="/" className="text-sm font-bold text-emerald-200">tuGasREEN</Link><h1 className="mt-3 text-4xl font-black tracking-[-0.05em]">Pesanan saya</h1><p className="mt-3 text-emerald-100/70">Masuk sebagai {user.email}</p></div>
          <div className="flex flex-wrap items-center gap-3"><PreferencesControls /><Link href="/order/new" className="flex items-center justify-center gap-2 rounded-2xl bg-[#c8ff2f] px-5 py-4 font-extrabold text-[#004b34]"><Plus className="size-5" /> Buat pesanan</Link></div>
        </header>

        {error && <Notice type="error" className="mt-6">Pesanan belum dapat dimuat: {error.message}</Notice>}

        {orders.length === 0 ? (
          <section className="mt-6 rounded-[2rem] border border-dashed border-emerald-950/20 bg-white p-10 text-center sm:p-16"><span className="mx-auto grid size-16 place-items-center rounded-2xl bg-emerald-50 text-[#007a53]"><FileArchive className="size-7" /></span><h2 className="mt-5 text-2xl font-black">Belum ada pesanan</h2><p className="mx-auto mt-3 max-w-md leading-7 text-[#687a71]">Mulai dengan mengisi brief dan mengunggah file yang dibutuhkan.</p><Link href="/order/new" className="mt-6 inline-flex rounded-xl bg-[#007a53] px-5 py-3 font-extrabold text-white">Buat pesanan pertama</Link></section>
        ) : (
          <div className="mt-6 grid gap-4">
            {orders.map((order) => (
              <article key={order.id} className="rounded-3xl border border-emerald-950/10 bg-white p-5 shadow-sm sm:p-7">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0"><div className="flex flex-wrap items-center gap-3"><span className={`rounded-full px-3 py-1.5 text-xs font-black ${statusStyle[order.status] ?? 'bg-slate-100 text-slate-700'}`}>{order.status}</span><span className="font-mono text-xs font-bold text-[#829088]">#{order.id.slice(0, 8).toUpperCase()}</span></div><h2 className="mt-4 text-2xl font-black tracking-[-0.035em]">{order.judul}</h2><p className="mt-2 text-[#687a71]">{order.mata_kuliah} • {order.jenis_layanan}</p></div>
                  <div className="flex flex-wrap gap-3">{order.file_urls && order.file_urls.length > 0 && <Link href={`/api/files/${order.id}`} className="flex items-center gap-2 rounded-xl border border-emerald-950/15 px-4 py-3 text-sm font-extrabold text-[#007a53] transition hover:bg-emerald-50"><Download className="size-4" /> Unduh ZIP</Link>}</div>
                </div>
                <div className="mt-6 grid gap-3 border-t border-emerald-950/10 pt-5 sm:grid-cols-3">
                  <div className="flex items-center gap-3 rounded-2xl bg-[#f7faf4] p-4"><CalendarClock className="size-5 text-[#007a53]" /><div><p className="text-xs font-bold text-[#7b8981]">Deadline</p><p className="mt-1 text-sm font-extrabold">{new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Jakarta' }).format(new Date(order.deadline))}</p></div></div>
                  <div className="flex items-center gap-3 rounded-2xl bg-[#f7faf4] p-4"><WalletCards className="size-5 text-[#007a53]" /><div><p className="text-xs font-bold text-[#7b8981]">Budget diajukan</p><p className="mt-1 text-sm font-extrabold">{order.harga_diajukan === 0 ? 'Minta rekomendasi' : `Rp${Number(order.harga_diajukan).toLocaleString('id-ID')}`}</p></div></div>
                  <div className="flex items-center gap-3 rounded-2xl bg-[#f7faf4] p-4"><FileArchive className="size-5 text-[#007a53]" /><div><p className="text-xs font-bold text-[#7b8981]">Dibuat</p><p className="mt-1 text-sm font-extrabold">{new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeZone: 'Asia/Jakarta' }).format(new Date(order.created_at))}</p></div></div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export default function OrdersPage() {
  return <Suspense fallback={<div className="grid min-h-screen place-items-center bg-[#f7faf4] font-bold text-[#007a53]">Memuat pesanan...</div>}><OrdersContent /></Suspense>
}
