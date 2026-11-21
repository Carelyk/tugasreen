'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Check, LoaderCircle, LockKeyhole, Mail } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'

function messageFrom(error: unknown) {
  return error instanceof Error ? error.message : 'Autentikasi belum berhasil.'
}

export default function LoginPage() {
  const supabase = useMemo(() => createClient(), [])
  const router = useRouter()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  function destination() {
    const requested = new URLSearchParams(window.location.search).get('next') || '/orders'
    return requested.startsWith('/') && !requested.startsWith('//') ? requested : '/orders'
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      if (mode === 'signup') {
        if (name.trim().length < 2) throw new Error('Nama minimal 2 karakter.')
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name.trim() },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })
        if (signUpError) throw signUpError
        if (!data.session) {
          setMessage('Akun dibuat. Periksa email Anda untuk mengonfirmasi akun, lalu masuk.')
          setMode('login')
          setLoading(false)
          return
        }
      } else {
        const { error: loginError } = await supabase.auth.signInWithPassword({ email, password })
        if (loginError) throw loginError
      }

      router.push(destination())
      router.refresh()
    } catch (authError) {
      setError(messageFrom(authError))
      setLoading(false)
    }
  }

  async function handleGoogleLogin() {
    setLoading(true)
    setError('')
    const callbackUrl = new URL('/auth/callback', window.location.origin)
    callbackUrl.searchParams.set('next', destination())
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: callbackUrl.toString() },
    })
    if (oauthError) {
      setError(oauthError.message)
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f3f6f1] p-4 text-[#17382d] sm:p-8">
      <div className="mx-auto mb-6 max-w-6xl"><Link href="/" className="inline-flex items-center gap-2 text-sm font-extrabold text-[#0b6b4f]"><ArrowLeft className="size-4" /> Kembali ke beranda</Link></div>
      <div className="mx-auto grid min-h-[720px] max-w-6xl overflow-hidden rounded-[2rem] border border-emerald-950/10 bg-white shadow-2xl shadow-emerald-950/10 lg:grid-cols-2">
        <section className="hidden bg-[#073f31] p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div><div className="flex items-center gap-3"><span className="grid size-12 place-items-center rounded-2xl bg-[#c9f24b] text-sm font-black text-[#073f31]">TR</span><span className="text-xl font-black">TUGASREEN</span></div><h1 className="balance mt-14 text-5xl font-black leading-tight tracking-[-0.055em]">Simpan brief dan file di tempat yang sama.</h1><p className="mt-6 max-w-md text-lg leading-8 text-emerald-100/70">Akun digunakan untuk melindungi paket file dan menampilkan progres pesanan Anda.</p></div>
          <div className="space-y-3">{['Riwayat pesanan tersimpan', 'Paket ZIP hanya untuk akses terotorisasi', 'Status pekerjaan dapat dipantau'].map((item) => <div key={item} className="flex items-center gap-3 text-sm font-bold text-emerald-50/85"><span className="grid size-7 place-items-center rounded-full bg-white/10"><Check className="size-4 text-[#c9f24b]" /></span>{item}</div>)}</div>
        </section>

        <section className="flex items-center p-6 sm:p-12">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-8 flex rounded-2xl bg-[#f1f6ef] p-1.5">
              <button type="button" onClick={() => { setMode('login'); setError('') }} className={`flex-1 rounded-xl px-4 py-3 text-sm font-extrabold transition ${mode === 'login' ? 'bg-white text-[#073f31] shadow-sm' : 'text-[#6a7b72]'}`}>Masuk</button>
              <button type="button" onClick={() => { setMode('signup'); setError('') }} className={`flex-1 rounded-xl px-4 py-3 text-sm font-extrabold transition ${mode === 'signup' ? 'bg-white text-[#073f31] shadow-sm' : 'text-[#6a7b72]'}`}>Buat akun</button>
            </div>

            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#0b6b4f]">{mode === 'login' ? 'Selamat datang kembali' : 'Akun baru'}</p>
            <h2 className="mt-2 text-4xl font-black tracking-[-0.05em]">{mode === 'login' ? 'Masuk ke ruang pesanan.' : 'Mulai dengan identitas Anda.'}</h2>
            <p className="mt-4 leading-7 text-[#63766c]">{mode === 'login' ? 'Gunakan email yang terdaftar untuk melihat dan membuat pesanan.' : 'Akun Anda akan terhubung dengan setiap brief dan file yang dikirim.'}</p>

            {error && <div role="alert" className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-bold text-rose-700">{error}</div>}
            {message && <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-800">{message}</div>}

            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
              {mode === 'signup' && <div><label htmlFor="name" className="mb-2 block text-sm font-extrabold">Nama lengkap</label><input id="name" required value={name} onChange={(event) => setName(event.target.value)} className="w-full rounded-2xl border border-emerald-950/15 px-4 py-3.5 text-base focus:border-[#0b6b4f] focus:ring-4 focus:ring-emerald-700/10" placeholder="Nama Anda" /></div>}
              <div><label htmlFor="email" className="mb-2 block text-sm font-extrabold">Email</label><div className="relative"><Mail className="absolute left-4 top-4 size-5 text-[#849189]" /><input id="email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-2xl border border-emerald-950/15 py-3.5 pl-12 pr-4 text-base focus:border-[#0b6b4f] focus:ring-4 focus:ring-emerald-700/10" placeholder="nama@email.com" /></div></div>
              <div><label htmlFor="password" className="mb-2 block text-sm font-extrabold">Password</label><div className="relative"><LockKeyhole className="absolute left-4 top-4 size-5 text-[#849189]" /><input id="password" type="password" required minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-2xl border border-emerald-950/15 py-3.5 pl-12 pr-4 text-base focus:border-[#0b6b4f] focus:ring-4 focus:ring-emerald-700/10" placeholder="Minimal 6 karakter" /></div></div>
              <button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0b6b4f] px-5 py-4 font-extrabold text-white transition hover:bg-[#095c45] disabled:cursor-wait disabled:opacity-60">{loading && <LoaderCircle className="size-4 animate-spin" />}{mode === 'login' ? 'Masuk ke akun' : 'Buat akun'}</button>
            </form>

            <div className="my-6 flex items-center gap-3"><span className="h-px flex-1 bg-emerald-950/10" /><span className="text-xs font-bold uppercase tracking-wider text-[#8a978f]">atau</span><span className="h-px flex-1 bg-emerald-950/10" /></div>
            <button type="button" disabled={loading} onClick={handleGoogleLogin} className="flex w-full items-center justify-center gap-3 rounded-2xl border border-emerald-950/15 bg-white px-5 py-4 font-extrabold transition hover:bg-[#f6f8f3] disabled:opacity-60"><span className="grid size-6 place-items-center rounded-full bg-white text-sm font-black text-[#4285f4] shadow-sm">G</span>Lanjutkan dengan Google</button>
            <p className="mt-7 text-center text-sm text-[#7a8981]">Admin dapat masuk dengan akun yang sudah ditandai sebagai admin di Supabase.</p>
          </div>
        </section>
      </div>
    </main>
  )
}
