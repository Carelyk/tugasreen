'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  FileArchive,
  FileText,
  LoaderCircle,
  LockKeyhole,
  Trash2,
  UploadCloud,
} from 'lucide-react'
import { servicesList, siteConfig } from '@/config/site'

type FormState = {
  jenisLayanan: string
  mataKuliah: string
  judul: string
  deskripsi: string
  deadline: string
  tingkatKesulitan: 'Mudah' | 'Sedang' | 'Sulit'
  hargaDiajukan: string
}

const initialState: FormState = {
  jenisLayanan: servicesList[0].id,
  mataKuliah: '',
  judul: '',
  deskripsi: '',
  deadline: '',
  tingkatKesulitan: 'Sedang',
  hargaDiajukan: '',
}

const inputClass = 'w-full rounded-2xl border border-[#073f31]/15 bg-white px-4 py-3.5 text-base text-[#17382d] shadow-sm transition placeholder:text-[#97a49d] focus:border-[#0b6b4f] focus:ring-4 focus:ring-emerald-700/10'
const labelClass = 'mb-2 block text-sm font-extrabold text-[#27493e]'

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.ceil(bytes / 1024)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function safeMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Terjadi kesalahan. Silakan coba lagi.'
}

export default function NewOrderPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormState>(initialState)
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [dragging, setDragging] = useState(false)

  const totalBytes = files.reduce((total, file) => total + file.size, 0)

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }))
    setError('')
  }

  function addFiles(incoming: File[]) {
    setError('')
    const combined = [...files]

    for (const file of incoming) {
      const extension = file.name.split('.').pop()?.toLowerCase() ?? ''
      const supported = siteConfig.allowedFileTypes.includes(file.type) || siteConfig.allowedFileExtensions.includes(extension)
      if (!supported) {
        setError(`Format ${file.name} belum didukung.`)
        return
      }
      if (!combined.some((item) => item.name === file.name && item.size === file.size)) {
        combined.push(file)
      }
    }

    if (combined.length > siteConfig.maxFilesPerOrder) {
      setError(`Maksimal ${siteConfig.maxFilesPerOrder} file untuk satu pesanan.`)
      return
    }

    const combinedBytes = combined.reduce((total, file) => total + file.size, 0)
    if (combinedBytes > siteConfig.storageMaxFileSizeMB * 1024 * 1024) {
      setError(`Total file maksimal ${siteConfig.storageMaxFileSizeMB} MB.`)
      return
    }

    setFiles(combined)
  }

  function goNext() {
    setError('')
    if (step === 1) {
      if (!form.mataKuliah.trim() || !form.judul.trim() || form.deskripsi.trim().length < 20) {
        setError('Lengkapi topik, judul, dan deskripsi minimal 20 karakter.')
        return
      }
    }
    if (step === 2) {
      if (!form.deadline || new Date(form.deadline) <= new Date()) {
        setError('Pilih deadline yang berada setelah waktu sekarang.')
        return
      }
      if (form.hargaDiajukan === '' || Number(form.hargaDiajukan) < 0) {
        setError('Masukkan budget, atau isi 0 untuk meminta rekomendasi admin.')
        return
      }
    }
    setStep((current) => Math.min(3, current + 1))
  }

  async function submitOrder() {
    if (files.length === 0) {
      setError('Tambahkan minimal satu file agar brief dapat dikemas menjadi ZIP.')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      const payload = new FormData()
      Object.entries(form).forEach(([key, value]) => {
        payload.append(key, key === 'deadline' ? new Date(value).toISOString() : value)
      })
      files.forEach((file) => payload.append('files', file))

      const response = await fetch('/api/orders', { method: 'POST', body: payload })
      const result = (await response.json()) as { error?: string; orderId?: string }

      if (response.status === 401) {
        router.push('/login?next=/order/new')
        return
      }
      if (!response.ok || !result.orderId) {
        throw new Error(result.error || 'Pesanan belum dapat disimpan.')
      }

      router.push(`/orders?created=${result.orderId}`)
      router.refresh()
    } catch (submitError) {
      setError(safeMessage(submitError))
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f3f6f1] px-4 py-6 text-[#17382d] sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm font-extrabold text-[#0b6b4f]"><ArrowLeft className="size-4" /> Kembali ke beranda</Link>
          <Link href="/orders" className="text-sm font-bold text-[#60736a] hover:text-[#0b6b4f]">Pesanan saya</Link>
        </header>

        <div className="grid overflow-hidden rounded-[2rem] border border-emerald-950/10 bg-white shadow-2xl shadow-emerald-950/10 lg:grid-cols-[0.72fr_1.28fr]">
          <aside className="bg-[#073f31] p-7 text-white sm:p-10">
            <span className="inline-flex rounded-full bg-[#c9f24b] px-3 py-1.5 text-xs font-black uppercase tracking-wider text-[#073f31]">Brief pesanan</span>
            <h1 className="balance mt-6 text-4xl font-black tracking-[-0.05em]">Satu form untuk semua detail penting.</h1>
            <p className="mt-5 leading-7 text-emerald-100/70">Isi bertahap. Anda masih bisa kembali ke langkah sebelumnya sebelum pesanan dikirim.</p>

            <div className="mt-10 space-y-3">
              {['Kebutuhan', 'Deadline & budget', 'File & konfirmasi'].map((label, index) => {
                const number = index + 1
                const active = step === number
                const done = step > number
                return (
                  <div key={label} className={`flex items-center gap-3 rounded-2xl p-3.5 ${active ? 'bg-white/10' : ''}`}>
                    <span className={`grid size-9 place-items-center rounded-xl text-sm font-black ${done ? 'bg-[#c9f24b] text-[#073f31]' : active ? 'bg-white text-[#073f31]' : 'bg-white/10 text-white/60'}`}>{done ? <Check className="size-4" /> : number}</span>
                    <span className={active || done ? 'font-extrabold' : 'font-semibold text-white/50'}>{label}</span>
                  </div>
                )
              })}
            </div>

            <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.06] p-5">
              <LockKeyhole className="size-5 text-[#c9f24b]" />
              <p className="mt-3 font-extrabold">Paket file privat</p>
              <p className="mt-2 text-sm leading-6 text-emerald-100/65">Lampiran digabung menjadi ZIP dan hanya tersedia melalui akses terotorisasi.</p>
            </div>
          </aside>

          <section className="p-6 sm:p-10 lg:p-12">
            <div className="mb-8 flex items-end justify-between gap-4 border-b border-emerald-950/10 pb-6">
              <div><p className="text-sm font-black uppercase tracking-[0.18em] text-[#0b6b4f]">Langkah {step} dari 3</p><h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">{step === 1 ? 'Ceritakan kebutuhannya' : step === 2 ? 'Tentukan waktu dan budget' : 'Lengkapi dengan file'}</h2></div>
              <span className="hidden font-mono text-sm font-bold text-[#839087] sm:block">{Math.round((step / 3) * 100)}%</span>
            </div>

            {error && <div role="alert" className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-bold text-rose-700">{error}</div>}

            {step === 1 && (
              <div className="space-y-6">
                <div><label className={labelClass} htmlFor="service">Jenis layanan</label><select id="service" className={inputClass} value={form.jenisLayanan} onChange={(event) => updateField('jenisLayanan', event.target.value)}>{servicesList.map((service) => <option key={service.id} value={service.id}>{service.title}</option>)}</select></div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div><label className={labelClass} htmlFor="subject">Mata kuliah atau topik</label><input id="subject" className={inputClass} value={form.mataKuliah} onChange={(event) => updateField('mataKuliah', event.target.value)} placeholder="Contoh: Statistika" /></div>
                  <div><label className={labelClass} htmlFor="title">Judul tugas</label><input id="title" className={inputClass} value={form.judul} onChange={(event) => updateField('judul', event.target.value)} placeholder="Contoh: Uji regresi berganda" /></div>
                </div>
                <div><div className="flex items-center justify-between"><label className={labelClass} htmlFor="description">Deskripsi kebutuhan</label><span className="mb-2 text-xs font-bold text-[#819087]">{form.deskripsi.length} karakter</span></div><textarea id="description" rows={6} className={inputClass} value={form.deskripsi} onChange={(event) => updateField('deskripsi', event.target.value)} placeholder="Jelaskan output yang dibutuhkan, format, sumber data, dan catatan khusus lainnya." /><p className="mt-2 text-sm text-[#718078]">Minimal 20 karakter. Semakin jelas brief, semakin cepat admin melakukan review.</p></div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div><label className={labelClass} htmlFor="deadline">Deadline pengerjaan</label><input id="deadline" type="datetime-local" className={inputClass} value={form.deadline} onChange={(event) => updateField('deadline', event.target.value)} /></div>
                  <div><label className={labelClass} htmlFor="difficulty">Tingkat kesulitan</label><select id="difficulty" className={inputClass} value={form.tingkatKesulitan} onChange={(event) => updateField('tingkatKesulitan', event.target.value as FormState['tingkatKesulitan'])}><option>Mudah</option><option>Sedang</option><option>Sulit</option></select></div>
                </div>
                <div><label className={labelClass} htmlFor="budget">Budget yang diajukan</label><div className="relative"><span className="absolute left-4 top-3.5 font-extrabold text-[#6f7e76]">Rp</span><input id="budget" type="number" min="0" step="10000" className={`${inputClass} pl-12`} value={form.hargaDiajukan} onChange={(event) => updateField('hargaDiajukan', event.target.value)} placeholder="150000" /></div><p className="mt-2 text-sm text-[#718078]">Isi 0 jika Anda ingin admin memberikan rekomendasi harga terlebih dahulu.</p></div>
                <div className="rounded-2xl bg-[#f1f6ef] p-5"><p className="font-extrabold text-[#17382d]">Bagaimana harga ditinjau?</p><p className="mt-2 text-sm leading-6 text-[#60736a]">Admin mempertimbangkan kompleksitas, jumlah output, kualitas file sumber, dan jarak deadline sebelum menyetujui atau mengajukan negosiasi.</p></div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div
                  className={`rounded-3xl border-2 border-dashed p-7 text-center transition ${dragging ? 'border-[#0b6b4f] bg-emerald-50' : 'border-[#0b6b4f]/25 bg-[#f8faf6]'}`}
                  onDragEnter={(event) => { event.preventDefault(); setDragging(true) }}
                  onDragOver={(event) => event.preventDefault()}
                  onDragLeave={() => setDragging(false)}
                  onDrop={(event) => { event.preventDefault(); setDragging(false); addFiles(Array.from(event.dataTransfer.files)) }}
                >
                  <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-[#073f31] text-white"><UploadCloud className="size-6" /></span>
                  <h3 className="mt-5 text-lg font-black">Tarik file ke sini</h3>
                  <p className="mt-2 text-sm leading-6 text-[#6b7b73]">PDF, DOCX, PPTX, XLSX, atau ZIP • maksimal {siteConfig.maxFilesPerOrder} file • total {siteConfig.storageMaxFileSizeMB} MB</p>
                  <button type="button" onClick={() => fileInputRef.current?.click()} className="mt-5 rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-[#0b6b4f] shadow-sm ring-1 ring-emerald-950/10 transition hover:bg-emerald-50">Pilih dari perangkat</button>
                  <input ref={fileInputRef} type="file" multiple className="hidden" accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip" onChange={(event) => { addFiles(Array.from(event.target.files ?? [])); event.target.value = '' }} />
                </div>

                {files.length > 0 && <div className="rounded-2xl border border-emerald-950/10"><div className="flex items-center justify-between border-b border-emerald-950/10 p-4"><div className="flex items-center gap-3"><FileArchive className="size-5 text-[#0b6b4f]" /><p className="font-extrabold">Isi paket ZIP</p></div><span className="text-sm font-bold text-[#718078]">{files.length} file • {formatBytes(totalBytes)}</span></div><div className="divide-y divide-emerald-950/10">{files.map((file) => <div key={`${file.name}-${file.size}`} className="flex items-center gap-3 p-4"><FileText className="size-5 shrink-0 text-[#789087]" /><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{file.name}</p><p className="mt-1 text-xs text-[#849189]">{formatBytes(file.size)}</p></div><button type="button" aria-label={`Hapus ${file.name}`} onClick={() => setFiles((current) => current.filter((item) => item !== file))} className="rounded-xl p-2 text-rose-600 transition hover:bg-rose-50"><Trash2 className="size-4" /></button></div>)}</div></div>}

                <div className="grid gap-3 rounded-2xl bg-[#073f31] p-5 text-white sm:grid-cols-2"><div><p className="text-xs font-bold uppercase tracking-wider text-emerald-200">Judul</p><p className="mt-1 font-extrabold">{form.judul}</p></div><div><p className="text-xs font-bold uppercase tracking-wider text-emerald-200">Budget</p><p className="mt-1 font-extrabold">{Number(form.hargaDiajukan) === 0 ? 'Minta rekomendasi' : `Rp${Number(form.hargaDiajukan).toLocaleString('id-ID')}`}</p></div></div>
              </div>
            )}

            <div className="mt-9 flex items-center justify-between border-t border-emerald-950/10 pt-6">
              <button type="button" disabled={step === 1 || submitting} onClick={() => { setError(''); setStep((current) => Math.max(1, current - 1)) }} className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-extrabold text-[#60736a] transition hover:bg-[#f1f6ef] disabled:invisible"><ChevronLeft className="size-4" /> Sebelumnya</button>
              {step < 3 ? <button type="button" onClick={goNext} className="flex items-center gap-2 rounded-xl bg-[#0b6b4f] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#095c45]">Lanjutkan <ChevronRight className="size-4" /></button> : <button type="button" disabled={submitting} onClick={submitOrder} className="flex items-center gap-2 rounded-xl bg-[#0b6b4f] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#095c45] disabled:cursor-wait disabled:opacity-60">{submitting ? <><LoaderCircle className="size-4 animate-spin" /> Membuat ZIP...</> : 'Kirim pesanan'}</button>}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
