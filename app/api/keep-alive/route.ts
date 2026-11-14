import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.from('profiles').select('id').limit(1)

    if (error) {
      return NextResponse.json({ status: 'error', message: error.message }, { status: 500 })
    }

    return NextResponse.json({ status: 'ok', timestamp: new Date().toISOString(), db_ping: 'success' })
  } catch (err: any) {
    return NextResponse.json({ status: 'error', message: err.message || 'Unknown error' }, { status: 500 })
  }
}
