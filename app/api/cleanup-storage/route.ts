import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import { siteConfig } from '@/config/site'

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')

  if (secret !== process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    // allow local development trigger without strict secret if unset
    if (process.env.NODE_ENV === 'production' && process.env.CRON_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { getAll: () => [], setAll: () => {} } }
    )

    const daysOld = siteConfig.cleanupDaysOld || 30
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - daysOld)

    // find finished or cancelled orders older than cutoff
    const { data: oldOrders, error: fetchError } = await supabase
      .from('orders')
      .select('id, file_urls')
      .in('status', ['Selesai', 'Dibatalkan', 'Ditolak'])
      .lt('updated_at', cutoffDate.toISOString())

    if (fetchError) {
      return NextResponse.json({ status: 'error', error: fetchError.message }, { status: 500 })
    }

    let deletedFilesCount = 0
    if (oldOrders && oldOrders.length > 0) {
      for (const order of oldOrders) {
        if (order.file_urls && order.file_urls.length > 0) {
          const filePaths = order.file_urls.map((url: string) => {
            const parts = url.split('/task-files/')
            return parts[1] || ''
          }).filter(Boolean)

          if (filePaths.length > 0) {
            await supabase.storage.from('task-files').remove(filePaths)
            deletedFilesCount += filePaths.length
          }
        }
      }
    }

    return NextResponse.json({
      status: 'success',
      cleaned_orders_count: oldOrders?.length || 0,
      deleted_files_count: deletedFilesCount,
      timestamp: new Date().toISOString()
    })
  } catch (err: any) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
