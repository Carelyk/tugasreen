'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, LoaderCircle, LockKeyhole, Mail } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { PreferencesControls } from '@/components/preferences'
import { BrandMark } from '@/components/brand-mark'
import { Notice } from '@/components/notice'

function messageFrom(error: unknown) {
  return error instanceof Error ? error.message : 'Autentikasi admin belum berhasil.'
}

export default function AdminLoginPage() {
  const supabase = useMemo(() => createClient(), [])
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error: loginError } = await supabase.auth.signInWithPassword({ email, password })
      if (loginError) throw loginError
      router.push('/admin')
      router.refresh()
    } catch (authError) {
      setError(messageFrom(authError))
      setLoading(false)
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#f7faf4] p-4 text-[#17382d] sm:p-8">
      <div className="w-full max-w-lg">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-extrabold text-[#007a53]"><ArrowLeft className="size-4" /> Kembali ke beranda</Link>
          <PreferencesControls />
        </div>
        <section className="overflow-hidden rounded-[2rem] border border-emerald-950/10 bg-white p-6 shadow-2xl shadow-emerald-950/10 sm:p-10">
          <div className="flex items-center gap-3"><BrandMark className="size-12" priority /><div><p className="text-lg font-black">tuGasREEN</p><p className="text-sm font-semibold text-[#6a7b72]">Akses internal admin</p></div></div>
          <h1 className="mt-9 text-4xl font-black tracking-[-0.05em]">Masuk admin</h1>
          <p className="mt-3 leading-7 text-[#63766c]">Halaman ini hanya untuk pengelola yang sudah terdaftar.</p>

          {error && <Notice type="error" className="mt-6">{error}</Notice>}

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <div><label htmlFor="email" className="mb-2 block text-sm font-extrabold">Email admin</label><div className="relative"><Mail className="absolute left-4 top-4 size-5 text-[#849189]" /><input id="email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-2xl border border-emerald-950/15 py-3.5 pl-12 pr-4 text-base focus:border-[#007a53] focus:ring-4 focus:ring-emerald-700/10" placeholder="admin@email.com" /></div></div>
            <div><label htmlFor="password" className="mb-2 block text-sm font-extrabold">Password</label><div className="relative"><LockKeyhole className="absolute left-4 top-4 size-5 text-[#849189]" /><input id="password" type="password" required minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-2xl border border-emerald-950/15 py-3.5 pl-12 pr-4 text-base focus:border-[#007a53] focus:ring-4 focus:ring-emerald-700/10" placeholder="Password admin" /></div></div>
            <button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#007a53] px-5 py-4 font-extrabold text-white transition hover:bg-[#006846] disabled:cursor-wait disabled:opacity-60">{loading && <LoaderCircle className="size-4 animate-spin" />}Masuk ke panel admin</button>
          </form>
        </section>
      </div>
    </main>
  )
}
