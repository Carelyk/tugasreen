import Link from 'next/link'
import {
  AtSign,
  BadgeCheck,
  BookOpenCheck,
  Check,
  Clock3,
  Code2,
  FileArchive,
  FileChartColumnIncreasing,
  FileText,
  FolderUp,
  GraduationCap,
  LockKeyhole,
  MessageCircleMore,
  Presentation,
  ShieldCheck,
  Sparkles,
  Users,
  WalletCards,
} from 'lucide-react'
import { faqsList, servicesList, siteConfig } from '@/config/site'
import { PreferencesControls } from '@/components/preferences'
import { BrandMark } from '@/components/brand-mark'

const serviceIcons = {
  'tugas-individu': FileText,
  'tugas-kelompok': Users,
  'analisis-data': FileChartColumnIncreasing,
  'presentasi-ppt': Presentation,
  programming: Code2,
  lainnya: Sparkles,
}

const steps = [
  {
    title: 'Susun brief',
    description: 'Pilih layanan, tulis kebutuhan, deadline, dan budget yang paling masuk akal untuk Anda.',
    icon: BookOpenCheck,
  },
  {
    title: 'Kirim detail dan file',
    description: 'Admin mengarahkan pengiriman brief dan lampiran melalui kanal yang telah disepakati.',
    icon: FolderUp,
  },
  {
    title: 'Sepakati pengerjaan',
    description: 'Admin meninjau detail, mengonfirmasi harga, lalu memperbarui status pekerjaan.',
    icon: BadgeCheck,
  },
]

export default function Home() {
  const whatsappUrl = siteConfig.whatsappNumber
    ? `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Halo admin tuGasREEN, saya ingin konsultasi tugas.')}`
    : ''

  return (
    <main className="overflow-hidden bg-[#f7faf4] text-[#10271e]">
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
        <div className="mx-auto flex min-h-16 max-w-7xl flex-wrap items-center justify-between gap-x-3 gap-y-2 rounded-2xl border border-emerald-950/10 bg-white/90 px-4 py-2 shadow-sm backdrop-blur-xl sm:flex-nowrap sm:px-6">
          <Link href="/" className="flex items-center gap-3" aria-label="tuGasREEN beranda">
            <BrandMark priority />
            <span>
              <span className="block text-base font-black tracking-[-0.04em]">{siteConfig.name}</span>
              <span className="hidden text-[12px] font-medium text-[#5c6f66] sm:block">{siteConfig.tagline}</span>
            </span>
          </Link>

          <a href="#kontak" className="rounded-xl bg-[#004b34] px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-[#007a53] sm:hidden">Hubungi admin</a>

          <nav className="hidden items-center gap-7 text-sm font-semibold text-[#465a50] lg:flex" aria-label="Navigasi utama">
            <a className="transition hover:text-[#007a53]" href="#layanan">Layanan</a>
            <a className="transition hover:text-[#007a53]" href="#alur">Alur kerja</a>
            <a className="transition hover:text-[#007a53]" href="#keamanan">Keamanan</a>
            <a className="transition hover:text-[#007a53]" href="#faq">FAQ</a>
          </nav>

          <div className="flex w-full flex-wrap items-center justify-between gap-2 sm:w-auto sm:justify-end">
            <PreferencesControls />
            <a href="#kontak" className="hidden rounded-xl bg-[#004b34] px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-[#007a53] sm:block">Hubungi admin</a>
          </div>
        </div>
      </header>

      <section className="noise-grid relative px-4 pb-20 pt-48 sm:px-6 sm:pb-28 sm:pt-40">
        <div className="absolute left-[10%] top-24 size-72 rounded-full bg-[#c8ff2f]/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.03fr_0.97fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#007a53]/15 bg-white px-4 py-2 text-sm font-bold text-[#007a53] shadow-sm"><Sparkles className="size-4" />Semua kebutuhan tugas dalam satu alur</div>
            <h1 className="balance max-w-3xl text-[clamp(2.65rem,8vw,5.2rem)] font-black leading-[1.04] tracking-[-0.055em] text-[#004b34]">Brief lebih rapi. Kerja jadi lebih pasti.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#53675d] sm:text-xl">{siteConfig.description} Brief, deadline, budget, dan cara mengirim file dibicarakan sejak awal.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#kontak" className="rounded-2xl bg-[#007a53] px-6 py-4 text-center text-base font-extrabold text-white shadow-lg shadow-emerald-900/15 transition hover:-translate-y-0.5 hover:bg-[#006846]">Chat admin</a>
              <a href="#alur" className="rounded-2xl border border-[#004b34]/15 bg-white px-6 py-4 text-center text-base font-extrabold text-[#004b34] transition hover:border-[#007a53]/40 hover:bg-emerald-50">Lihat cara kerjanya</a>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-[#53675d]">
              <span className="flex items-center gap-2"><Check className="size-4 text-[#007a53]" /> Tanpa membuat akun</span>
              <span className="flex items-center gap-2"><Check className="size-4 text-[#007a53]" /> Konsultasi langsung</span>
              <span className="flex items-center gap-2"><Check className="size-4 text-[#007a53]" /> Budget fleksibel</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:ml-auto">
            <div className="soft-shadow rotate-1 rounded-[2rem] border border-emerald-950/10 bg-white p-4 sm:p-6">
              <div className="flex items-center justify-between border-b border-emerald-950/10 pb-5">
                <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7a8b82]">Konsultasi baru</p><p className="mt-1 text-lg font-black text-[#004b34]">Analisis data penelitian</p></div>
                <span className="rounded-full bg-[#fff3c4] px-3 py-1.5 text-xs font-bold text-[#755b00]">Draft</span>
              </div>
              <div className="grid gap-3 py-5 sm:grid-cols-2">
                <div className="rounded-2xl bg-[#f2f6f1] p-4"><p className="text-xs font-semibold text-[#718078]">Deadline</p><p className="mt-2 flex items-center gap-2 font-extrabold"><Clock3 className="size-4 text-[#007a53]" /> Jumat, 20.00</p></div>
                <div className="rounded-2xl bg-[#f2f6f1] p-4"><p className="text-xs font-semibold text-[#718078]">Budget diajukan</p><p className="mt-2 flex items-center gap-2 font-extrabold"><WalletCards className="size-4 text-[#007a53]" /> Rp150.000</p></div>
              </div>
              <div className="rounded-2xl border border-dashed border-[#007a53]/25 bg-emerald-50/60 p-4">
                <div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-xl bg-[#007a53] text-white"><FileArchive className="size-5" /></span><div className="min-w-0 flex-1"><p className="truncate text-sm font-extrabold">Brief dan lampiran</p><p className="mt-1 text-xs text-[#63766c]">Cara kirim disepakati bersama admin</p></div><ShieldCheck className="size-5 text-[#007a53]" /></div>
              </div>
              <div className="mt-5 flex items-center justify-between rounded-2xl bg-[#004b34] p-4 text-white"><div><p className="text-xs font-semibold text-emerald-200">Langkah berikutnya</p><p className="mt-1 font-extrabold">Hubungi admin untuk review</p></div><span className="size-3 rounded-full bg-[#c8ff2f] shadow-[0_0_0_6px_rgba(201,242,75,0.13)]" /></div>
            </div>
            <div className="absolute -bottom-7 -left-5 -rotate-3 rounded-2xl border border-[#004b34]/10 bg-[#c8ff2f] px-5 py-4 text-[#004b34] shadow-lg sm:-left-12"><p className="text-xs font-bold uppercase tracking-wider">Kanal langsung</p><p className="mt-1 text-sm font-black">Tanpa registrasi akun</p></div>
          </div>
        </div>
      </section>

      <section id="layanan" className="bg-white px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div><p className="text-sm font-black uppercase tracking-[0.2em] text-[#007a53]">Ruang lingkup layanan</p><h2 className="balance mt-4 text-4xl font-black tracking-[-0.05em] text-[#004b34] sm:text-5xl">Dari brief sederhana sampai pekerjaan teknis.</h2></div>
            <p className="max-w-2xl text-lg leading-8 text-[#5c6f66] lg:ml-auto">Pilih kategori yang paling mendekati kebutuhan Anda. Detail pekerjaan tetap ditentukan dari brief, file, deadline, dan tingkat kesulitan.</p>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {servicesList.map((service) => {
              const Icon = serviceIcons[service.id as keyof typeof serviceIcons] ?? GraduationCap
              return (
                <a key={service.id} href="#kontak" className="group rounded-3xl border border-[#004b34]/10 bg-[#f8faf6] p-6 transition hover:-translate-y-1 hover:border-[#007a53]/35 hover:bg-white hover:shadow-xl hover:shadow-emerald-950/5">
                  <div className="flex items-start justify-between"><span className="grid size-12 place-items-center rounded-2xl bg-[#004b34] text-white transition group-hover:bg-[#007a53]"><Icon className="size-5" /></span><span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#60736a] ring-1 ring-emerald-950/10">{service.badge}</span></div>
                  <h3 className="mt-7 text-xl font-black tracking-[-0.025em] text-[#004b34]">{service.title}</h3><p className="mt-3 text-base leading-7 text-[#61746a]">{service.description}</p><p className="mt-6 text-sm font-extrabold text-[#007a53]">Konsultasikan</p>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      <section id="alur" className="px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-[#004b34] px-5 py-8 text-white sm:px-10 sm:py-12 lg:px-14 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
            <div><span className="inline-flex rounded-full bg-[#c8ff2f] px-4 py-2 text-sm font-black text-[#004b34]">Alur yang jelas sejak awal</span><h2 className="balance mt-6 text-4xl font-black tracking-[-0.05em] sm:text-5xl">Tiga langkah, satu sumber informasi.</h2><p className="mt-5 max-w-xl text-lg leading-8 text-emerald-100/75">Setiap pesanan punya brief dan paket file sendiri, sehingga admin tidak perlu menyusun ulang lampiran dari berbagai chat.</p></div>
            <div className="grid gap-4">
              {steps.map((step, index) => (
                <div key={step.title} className="grid gap-4 rounded-3xl border border-white/10 bg-white/[0.06] p-5 sm:grid-cols-[auto_1fr] sm:items-center sm:p-6"><div className="grid size-12 place-items-center rounded-2xl bg-white text-[#004b34]"><step.icon className="size-5" /></div><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c8ff2f]">Langkah {index + 1}</p><h3 className="mt-1 text-xl font-black">{step.title}</h3><p className="mt-2 leading-7 text-emerald-100/70">{step.description}</p></div></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="keamanan" className="bg-white px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div className="rounded-[2rem] border border-[#004b34]/10 bg-[#f1f6ef] p-5 sm:p-8"><div className="rounded-3xl bg-white p-5 shadow-lg shadow-emerald-950/5 sm:p-7"><div className="flex items-center gap-4 border-b border-emerald-950/10 pb-5"><span className="grid size-12 place-items-center rounded-2xl bg-[#c8ff2f] text-[#004b34]"><LockKeyhole className="size-5" /></span><div><p className="font-black">Akses file terkontrol</p><p className="mt-1 text-sm text-[#6a7b72]">Paket privat, tautan unduh sementara</p></div></div><div className="space-y-4 pt-5">{['Validasi tipe dan total ukuran file', 'Folder terpisah untuk setiap pemesan', 'Pembersihan file pesanan lama terjadwal'].map((item) => <div key={item} className="flex items-center gap-3 rounded-2xl bg-[#f7f9f5] p-4 text-sm font-bold text-[#395047]"><Check className="size-4 text-[#007a53]" />{item}</div>)}</div></div></div>
          <div><p className="text-sm font-black uppercase tracking-[0.2em] text-[#007a53]">File yang lebih tertata</p><h2 className="balance mt-4 text-4xl font-black tracking-[-0.05em] text-[#004b34] sm:text-5xl">Konsultasi dulu, kirim file setelah ruang lingkup jelas.</h2><p className="mt-6 text-lg leading-8 text-[#5c6f66]">Admin akan memberi instruksi pengiriman dokumen setelah kebutuhan, deadline, dan budget disepakati. Kanal penyimpanan dapat dipindahkan ke Google Drive saat kredensial admin sudah tersedia.</p><div className="mt-8 grid gap-4 sm:grid-cols-2"><div className="rounded-2xl border border-[#004b34]/10 p-5"><FileArchive className="size-6 text-[#007a53]" /><p className="mt-4 font-black">Instruksi dari admin</p><p className="mt-2 text-sm leading-6 text-[#63766c]">Format dan tempat pengiriman file ditentukan setelah konsultasi awal.</p></div><div className="rounded-2xl border border-[#004b34]/10 p-5"><ShieldCheck className="size-6 text-[#007a53]" /><p className="mt-4 font-black">Tidak ada upload publik</p><p className="mt-2 text-sm leading-6 text-[#63766c]">Form upload lama tidak lagi ditampilkan setelah akses akun pengguna dihapus.</p></div></div></div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 sm:py-28"><div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2"><div className="rounded-[2rem] border border-emerald-950/10 bg-white p-7 sm:p-9"><div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-2xl bg-emerald-100 text-[#007a53]"><Check className="size-5" /></span><h2 className="text-2xl font-black tracking-[-0.03em]">Bisa dibantu</h2></div><ul className="mt-7 space-y-4 text-base leading-7 text-[#53675d]"><li>• Pendampingan tugas, makalah, laporan, dan presentasi.</li><li>• Analisis data, pemrograman, serta konsultasi teknis.</li><li>• Perapihan materi dan penyusunan output sesuai brief.</li></ul></div><div className="rounded-[2rem] bg-[#fff5f0] p-7 ring-1 ring-[#8c3b1f]/10 sm:p-9"><div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-2xl bg-[#ffe1d5] text-[#8c3b1f]"><ShieldCheck className="size-5" /></span><h2 className="text-2xl font-black tracking-[-0.03em] text-[#572416]">Di luar layanan</h2></div><ul className="mt-7 space-y-4 text-base leading-7 text-[#744b3e]"><li>• Ujian atau kuis real-time dan akses akun LMS pribadi.</li><li>• Permintaan plagiasi atau manipulasi data akademik.</li><li>• Pekerjaan tanpa brief dan ruang lingkup yang dapat diverifikasi.</li></ul></div></div></section>

      <section id="faq" className="bg-white px-4 py-20 sm:px-6 sm:py-28"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.72fr_1.28fr]"><div><p className="text-sm font-black uppercase tracking-[0.2em] text-[#007a53]">Pertanyaan umum</p><h2 className="balance mt-4 text-4xl font-black tracking-[-0.05em] text-[#004b34] sm:text-5xl">Sebelum Anda mengirim brief.</h2><p className="mt-5 text-lg leading-8 text-[#5c6f66]">Masih ada pertanyaan khusus? Sampaikan langsung kepada admin melalui kanal kontak.</p></div><div className="space-y-3">{faqsList.map((faq) => <details key={faq.question} className="group rounded-2xl border border-[#004b34]/10 bg-[#fafbf8] p-5 open:bg-white open:shadow-lg open:shadow-emerald-950/5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-extrabold text-[#17382d]">{faq.question}<span className="text-xl text-[#007a53] transition group-open:rotate-45">+</span></summary><p className="mt-4 border-t border-emerald-950/10 pt-4 leading-7 text-[#60736a]">{faq.answer}</p></details>)}</div></div></section>

      <section id="kontak" className="scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-[#004b34] p-6 text-white sm:p-10 lg:p-14">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end"><div><p className="text-sm font-black uppercase tracking-[0.2em] text-[#c8ff2f]">Kontak langsung</p><h2 className="balance mt-4 text-4xl font-black tracking-[-0.05em] sm:text-5xl">Bicarakan tugas langsung dengan admin.</h2></div><p className="max-w-2xl text-lg leading-8 text-emerald-100/70 lg:ml-auto">Tidak perlu membuat akun. Pilih kanal yang tersedia untuk menjelaskan kebutuhan, deadline, budget, dan cara mengirim file.</p></div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {whatsappUrl ? <a href={whatsappUrl} target="_blank" rel="noreferrer" className="group rounded-3xl bg-[#c8ff2f] p-6 text-[#004b34] transition hover:-translate-y-1 hover:shadow-xl"><MessageCircleMore className="size-7" /><p className="mt-8 text-xl font-black">WhatsApp admin</p><p className="mt-2 text-sm font-semibold opacity-75">{siteConfig.whatsappDisplay}</p></a> : <div aria-disabled="true" className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 text-white/70"><MessageCircleMore className="size-7" /><p className="mt-8 text-xl font-black text-white">WhatsApp admin</p><p className="mt-2 text-sm font-semibold">Nomor segera tersedia</p></div>}
            {siteConfig.instagramUrl ? <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer" className="group rounded-3xl border border-white/10 bg-white/[0.06] p-6 transition hover:-translate-y-1 hover:bg-white/10"><AtSign className="size-7 text-[#c8ff2f]" /><p className="mt-8 text-xl font-black">Instagram</p><p className="mt-2 text-sm font-semibold text-emerald-100/65">Kirim DM</p></a> : <div aria-disabled="true" className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 text-white/70"><AtSign className="size-7" /><p className="mt-8 text-xl font-black text-white">Instagram</p><p className="mt-2 text-sm font-semibold">Segera hadir</p></div>}
            {siteConfig.xUrl ? <a href={siteConfig.xUrl} target="_blank" rel="noreferrer" className="group rounded-3xl border border-white/10 bg-white/[0.06] p-6 transition hover:-translate-y-1 hover:bg-white/10"><span className="grid size-7 place-items-center text-xl font-black text-[#c8ff2f]">X</span><p className="mt-8 text-xl font-black">X</p><p className="mt-2 text-sm font-semibold text-emerald-100/65">Kirim pesan</p></a> : <div aria-disabled="true" className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 text-white/70"><span className="grid size-7 place-items-center text-xl font-black">X</span><p className="mt-8 text-xl font-black text-white">X</p><p className="mt-2 text-sm font-semibold">Segera hadir</p></div>}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-14"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 rounded-[2rem] bg-[#c8ff2f] p-7 text-[#004b34] sm:p-10 lg:flex-row lg:items-center"><div><p className="text-sm font-black uppercase tracking-[0.18em]">Siap berkonsultasi?</p><h2 className="balance mt-3 text-3xl font-black tracking-[-0.045em] sm:text-4xl">Mulai dari kebutuhan yang jelas.</h2></div><a href="#kontak" className="rounded-2xl bg-[#004b34] px-6 py-4 text-base font-extrabold text-white transition hover:bg-[#007a53]">Lihat kanal kontak</a></div></section>

      <footer className="bg-[#004b34] px-4 py-12 text-white sm:px-6"><div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.4fr_0.8fr_0.8fr]"><div><div className="flex items-center gap-3"><BrandMark /><span className="text-xl font-black">{siteConfig.name}</span></div><p className="mt-5 max-w-md leading-7 text-emerald-100/65">{siteConfig.description}</p></div><div><p className="font-black">Akses</p><div className="mt-4 grid gap-3 text-sm font-semibold text-emerald-100/65"><a href="#kontak">Hubungi admin</a><a href="#layanan">Layanan</a><a href="#faq">FAQ</a></div></div><div><p className="font-black">Kontak</p><div className="mt-4 grid gap-3 text-sm text-emerald-100/65"><span>{siteConfig.emailAdmin}</span><span>{siteConfig.whatsappDisplay}</span><span>Instagram: segera hadir</span><span>X: segera hadir</span></div></div></div><div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-sm text-emerald-100/50">© 2026 {siteConfig.name}. Brief rapi, pengerjaan terarah.</div></footer>
    </main>
  )
}
