import { NextResponse } from 'next/server'
import { siteConfig } from '@/config/site'
import { createAdminClient } from '@/utils/supabase/admin'
import { createClient } from '@/utils/supabase/server'

const allowedStatuses = new Set(['Menunggu ACC', 'Nego Harga', 'Diproses', 'Revisi', 'Selesai', 'Dibatalkan', 'Ditolak'])

type UpdateBody = {
  status?: unknown
  finalPrice?: unknown
  note?: unknown
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const admin = createAdminClient()
  const { data: profile } = await admin.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin' && !siteConfig.adminEmails.includes(user.email ?? '')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = (await request.json()) as UpdateBody
  if (typeof body.status !== 'string' || !allowedStatuses.has(body.status)) {
    return NextResponse.json({ error: 'Status tidak valid.' }, { status: 400 })
  }

  const finalPrice = body.finalPrice === null ? null : Number(body.finalPrice)
  if (finalPrice !== null && (!Number.isFinite(finalPrice) || finalPrice < 0)) {
    return NextResponse.json({ error: 'Harga final tidak valid.' }, { status: 400 })
  }

  const { id } = await params
  const { error } = await admin.from('orders').update({
    status: body.status,
    harga_final: finalPrice,
    updated_at: new Date().toISOString(),
  }).eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  await admin.from('order_events').insert({
    order_id: id,
    status: body.status,
    catatan: typeof body.note === 'string' && body.note.trim() ? body.note.trim().slice(0, 500) : null,
  })

  return NextResponse.json({ ok: true })
}
