'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LoaderCircle, Save } from 'lucide-react'

const statuses = ['Menunggu ACC', 'Nego Harga', 'Diproses', 'Revisi', 'Selesai', 'Dibatalkan', 'Ditolak']

export function OrderActions({ orderId, initialStatus, initialFinalPrice }: { orderId: string; initialStatus: string; initialFinalPrice: number | null }) {
  const router = useRouter()
  const [status, setStatus] = useState(initialStatus)
  const [finalPrice, setFinalPrice] = useState(initialFinalPrice?.toString() ?? '')
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function save() {
    setLoading(true)
    setMessage('')
    const response = await fetch(`/api/admin/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, finalPrice: finalPrice === '' ? null : Number(finalPrice), note }),
    })
    const result = (await response.json()) as { error?: string }
    if (!response.ok) {
      setMessage(result.error || 'Perubahan gagal disimpan.')
      setLoading(false)
      return
    }
    setMessage('Tersimpan')
    setLoading(false)
    router.refresh()
  }

  return (
    <div className="grid gap-3 rounded-2xl bg-[#f6f8f3] p-4 lg:grid-cols-[1fr_0.8fr_1.2fr_auto] lg:items-end">
      <div><label className="mb-1.5 block text-xs font-black uppercase tracking-wider text-[#718078]">Status</label><select value={status} onChange={(event) => setStatus(event.target.value)} className="w-full rounded-xl border border-emerald-950/15 bg-white px-3 py-2.5 text-sm font-bold">{statuses.map((item) => <option key={item}>{item}</option>)}</select></div>
      <div><label className="mb-1.5 block text-xs font-black uppercase tracking-wider text-[#718078]">Harga final</label><input type="number" min="0" step="10000" value={finalPrice} onChange={(event) => setFinalPrice(event.target.value)} className="w-full rounded-xl border border-emerald-950/15 bg-white px-3 py-2.5 text-sm font-bold" placeholder="Opsional" /></div>
      <div><label className="mb-1.5 block text-xs font-black uppercase tracking-wider text-[#718078]">Catatan perubahan</label><input value={note} onChange={(event) => setNote(event.target.value)} className="w-full rounded-xl border border-emerald-950/15 bg-white px-3 py-2.5 text-sm" placeholder="Contoh: Harga disetujui" /></div>
      <div><button type="button" disabled={loading} onClick={save} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0b6b4f] px-4 py-2.5 text-sm font-extrabold text-white disabled:opacity-60">{loading ? <LoaderCircle className="size-4 animate-spin" /> : <Save className="size-4" />} Simpan</button>{message && <p className={`mt-1 text-center text-xs font-bold ${message === 'Tersimpan' ? 'text-emerald-700' : 'text-rose-600'}`}>{message}</p>}</div>
    </div>
  )
}
