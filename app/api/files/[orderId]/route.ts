import { NextResponse } from 'next/server'
import { siteConfig } from '@/config/site'
import { createAdminClient } from '@/utils/supabase/admin'
import { createClient } from '@/utils/supabase/server'

export async function GET(_request: Request, { params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const admin = createAdminClient()
  const { data: order } = await admin
    .from('orders')
    .select('user_id, file_urls')
    .eq('id', orderId)
    .single()

  if (!order) return NextResponse.json({ error: 'Pesanan tidak ditemukan.' }, { status: 404 })

  const { data: profile } = await admin.from('profiles').select('role').eq('id', user.id).single()
  const allowed = order.user_id === user.id || profile?.role === 'admin' || siteConfig.adminEmails.includes(user.email ?? '')
  if (!allowed) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const storagePath = Array.isArray(order.file_urls) ? order.file_urls[0] : null
  if (!storagePath) return NextResponse.json({ error: 'Paket file tidak tersedia.' }, { status: 404 })

  const { data, error } = await admin.storage.from('task-files').createSignedUrl(storagePath, 60, { download: true })
  if (error || !data?.signedUrl) {
    return NextResponse.json({ error: 'Tautan unduh belum dapat dibuat.' }, { status: 500 })
  }

  return NextResponse.redirect(data.signedUrl)
}
