import Link from 'next/link'
import { siteConfig, servicesList, faqsList } from '@/config/site'
import { CheckCircle2, XCircle, ArrowRight, ShieldCheck, Clock, DollarSign, UploadCloud, MessageSquare, Award, Star, Menu, Sparkles } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-emerald-50/40 text-slate-800 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-emerald-700/20">
              TR
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-emerald-900">{siteConfig.name}</span>
              <span className="hidden sm:block text-xs text-emerald-600 font-medium -mt-1">{siteConfig.tagline}</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#layanan" className="hover:text-emerald-700 transition">Layanan</a>
            <a href="#carakerja" className="hover:text-emerald-700 transition">Cara Kerja</a>
            <a href="#harga" className="hover:text-emerald-700 transition">Harga & Budget</a>
            <a href="#batasan" className="hover:text-emerald-700 transition">Batasan</a>
            <a href="#faq" className="hover:text-emerald-700 transition">FAQ</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="px-5 py-2.5 rounded-xl border border-emerald-200 text-emerald-800 hover:bg-emerald-50 font-bold text-sm transition">
              Masuk
            </Link>
            <Link href="/order/new" className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-lg shadow-emerald-700/25 transition flex items-center gap-2">
              Pesan Sekarang <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-28 overflow-hidden bg-gradient-to-b from-emerald-50/80 via-emerald-100/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-6 border border-emerald-200 shadow-xs">
              <Sparkles className="w-4 h-4 text-emerald-600" /> Platform Jasa Akademik Modern #1
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-emerald-950 tracking-tight leading-tight mb-6">
              Your Tasks, <span className="text-emerald-600 underline decoration-emerald-300 decoration-wavy">Your Way.</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed font-normal">
              {siteConfig.description} Tentukan sendiri budget tugas Anda, pantau progress secara real-time, dan nikmati pengerjaan profesional yang aman dan terpercaya.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/order/new" className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-base shadow-xl shadow-emerald-700/30 transition flex items-center justify-center gap-3">
                Mulai Buat Pesanan <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="#carakerja" className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200 font-extrabold text-base transition flex items-center justify-center gap-3 shadow-sm">
                Pelajari Cara Kerja
              </Link>
            </div>
            <div className="mt-12 pt-8 border-t border-emerald-100/60 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-emerald-900">500+</p>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">Tugas Diselesaikan</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-emerald-900">100%</p>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">Kerahasiaan Aman</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-emerald-900">Flex</p>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">Budget Fleksibel</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Layanan Section */}
      <section id="layanan" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">Layanan Kami</span>
            <h2 className="text-3xl sm:text-4xl font-black text-emerald-950 mt-4 mb-3">Solusi Akademik Komprehensif</h2>
            <p className="text-slate-600">Pilih jenis layanan tugas yang Anda butuhkan. Dikerjakan oleh tenaga ahli sesuai bidang studinya.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((srv, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-emerald-50/40 border border-emerald-100 hover:border-emerald-300 hover:shadow-xl hover:bg-white transition duration-300 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-emerald-700/20 group-hover:scale-110 transition">
                      {srv.title.charAt(0)}
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">{srv.badge}</span>
                  </div>
                  <h3 className="text-xl font-bold text-emerald-950 mb-3">{srv.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">{srv.description}</p>
                </div>
                <Link href="/order/new" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-900 group-hover:translate-x-1 transition">
                  Pesan Layanan Ini <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cara Kerja Section */}
      <section id="carakerja" className="py-24 bg-emerald-50/60 border-y border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">Alur Pemesanan</span>
            <h2 className="text-3xl sm:text-4xl font-black text-emerald-950 mt-4 mb-3">4 Langkah Mudah di TUGASREEN</h2>
            <p className="text-slate-600">Transparan, adil, dan terpantau real-time dari dashboard Anda.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-emerald-100 relative">
              <span className="absolute -top-4 -left-4 w-10 h-10 rounded-xl bg-emerald-700 text-white font-black flex items-center justify-center shadow-md">1</span>
              <UploadCloud className="w-8 h-8 text-emerald-700 mb-4" />
              <h3 className="font-bold text-lg text-emerald-950 mb-2">Isi Form & Upload</h3>
              <p className="text-sm text-slate-600">Lengkapi detail tugas, mata kuliah, deadline, dan upload file instruksi.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-emerald-100 relative">
              <span className="absolute -top-4 -left-4 w-10 h-10 rounded-xl bg-emerald-700 text-white font-black flex items-center justify-center shadow-md">2</span>
              <DollarSign className="w-8 h-8 text-emerald-700 mb-4" />
              <h3 className="font-bold text-lg text-emerald-950 mb-2">Ajukan Estimasi Harga</h3>
              <p className="text-sm text-slate-600">Masukkan budget atau minta rekomendasi harga wajar dari admin kami.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-emerald-100 relative">
              <span className="absolute -top-4 -left-4 w-10 h-10 rounded-xl bg-emerald-700 text-white font-black flex items-center justify-center shadow-md">3</span>
              <ShieldCheck className="w-8 h-8 text-emerald-700 mb-4" />
              <h3 className="font-bold text-lg text-emerald-950 mb-2">Review & ACC / Nego</h3>
              <p className="text-sm text-slate-600">Admin mereview tugas. Harga disepakati bersama sebelum pengerjaan dimulai.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-emerald-100 relative">
              <span className="absolute -top-4 -left-4 w-10 h-10 rounded-xl bg-emerald-700 text-white font-black flex items-center justify-center shadow-md">4</span>
              <Clock className="w-8 h-8 text-emerald-700 mb-4" />
              <h3 className="font-bold text-lg text-emerald-950 mb-2">Pantau & Selesai</h3>
              <p className="text-sm text-slate-600">Pantau progress real-time di dashboard, revisi jika perlu, dan tugas tuntas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Harga & Budget Section */}
      <section id="harga" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-emerald-900 to-emerald-950 text-white p-10 sm:p-14 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 w-64 h-64 bg-emerald-800/40 rounded-full blur-3xl pointer-events-none"></div>
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest bg-emerald-800/80 px-3 py-1 rounded-full">Sistem Budget Fleksibel</span>
            <h2 className="text-3xl sm:text-4xl font-black mt-4 mb-4">Harga Disesuaikan Kebutuhan Anda</h2>
            <p className="text-emerald-100/90 leading-relaxed mb-8">
              Di TUGASREEN, tidak ada harga patokan yang kaku. Anda tahu kemampuan budget Anda, dan kami memberikan penawaran terbaik berdasarkan faktor tingkat kesulitan, kompleksitas materi, serta urgensi deadline.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 text-emerald-950">
              <div className="bg-emerald-50 p-6 rounded-2xl">
                <h4 className="font-bold text-emerald-900 mb-1">Tingkat Kesulitan</h4>
                <p className="text-xs text-slate-600">Mudah, Sedang, hingga Analisis Tingkat Lanjut.</p>
              </div>
              <div className="bg-emerald-50 p-6 rounded-2xl">
                <h4 className="font-bold text-emerald-900 mb-1">Deadline Tugas</h4>
                <p className="text-xs text-slate-600">Reguler santai atau Urgent kilat.</p>
              </div>
              <div className="bg-emerald-50 p-6 rounded-2xl">
                <h4 className="font-bold text-emerald-900 mb-1">Budget Client</h4>
                <p className="text-xs text-slate-600">Ajukan angka penawaran Anda secara jujur.</p>
              </div>
            </div>
            <Link href="/order/new" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-extrabold transition shadow-lg">
              Ajukan Tugas Sekarang <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Batasan Layanan Section */}
      <section id="batasan" className="py-24 bg-emerald-50/40 border-t border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">Komitmen Profesional</span>
            <h2 className="text-3xl sm:text-4xl font-black text-emerald-950 mt-4 mb-3">Batasan Layanan Kami</h2>
            <p className="text-slate-600">Demi menjaga kualitas akademik dan integritas bersama, harap perhatikan batasan berikut.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-emerald-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-emerald-950">Bisa Kami Bantu</h3>
              </div>
              <ul className="space-y-3 text-slate-600 text-sm">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Tugas akademik umum, esai, makalah, dan laporan praktikum.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Analisis data statistik (SPSS, Excel, Python, R).</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Pembuatan slide presentasi profesional & interaktif.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Tugas pemrograman dan konsultasi kode terstruktur.</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-rose-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                  <XCircle className="w-6 h-6 text-rose-600" />
                </div>
                <h3 className="text-xl font-bold text-rose-950">Tidak Bisa Kami Bantu</h3>
              </div>
              <ul className="space-y-3 text-slate-600 text-sm">
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <span>Ujian, kuis real-time, atau joki ujian akademik.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <span>Permintaan akses akun LMS kampus pribadi Anda.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <span>Tindakan plagiasi instan tanpa proses pembelajaran atau referensi.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <span>Pekerjaan di luar kapasitas keilmuan tim kami.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">Pertanyaan Umum</span>
            <h2 className="text-3xl sm:text-4xl font-black text-emerald-950 mt-4 mb-3">FAQ TUGASREEN</h2>
            <p className="text-slate-600">Temukan jawaban cepat seputar layanan dan sistem pemesanan kami.</p>
          </div>
          <div className="space-y-4">
            {faqsList.map((faq, idx) => (
              <details key={idx} className="group p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100 open:bg-white open:shadow-md transition">
                <summary className="font-bold text-lg text-emerald-950 cursor-pointer flex items-center justify-between">
                  {faq.question}
                  <span className="text-emerald-700 group-open:rotate-180 transition transform font-black text-xl">+</span>
                </summary>
                <p className="mt-4 text-slate-600 text-sm leading-relaxed border-t border-emerald-100/60 pt-4">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-950 text-emerald-100 py-16 border-t border-emerald-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center text-white font-bold text-xl">
                TR
              </div>
              <span className="text-2xl font-black tracking-tight text-white">{siteConfig.name}</span>
            </div>
            <p className="text-sm text-emerald-300/80 leading-relaxed mb-4">
              {siteConfig.description}
            </p>
            <p className="text-xs text-emerald-400 font-medium">Tagline: "{siteConfig.tagline}"</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Navigasi Cepat</h4>
            <ul className="space-y-2 text-sm text-emerald-300/80">
              <li><a href="#layanan" className="hover:text-white transition">Layanan Akademik</a></li>
              <li><a href="#carakerja" className="hover:text-white transition">Cara Kerja</a></li>
              <li><a href="#harga" className="hover:text-white transition">Estimasi Budget</a></li>
              <li><a href="#batasan" className="hover:text-white transition">Batasan Layanan</a></li>
              <li><a href="#faq" className="hover:text-white transition">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Kontak & Dukungan</h4>
            <ul className="space-y-2 text-sm text-emerald-300/80">
              <li>Email: {siteConfig.emailAdmin}</li>
              <li>WhatsApp: {siteConfig.whatsappDisplay}</li>
              <li>Operational: Senin - Minggu (24 Jam)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Keamanan & Sistem</h4>
            <p className="text-xs text-emerald-300/80 leading-relaxed mb-4">
              Dilindungi oleh sistem Supabase Row Level Security, enkripsi file tugas, serta keep-alive cron harian anti down.
            </p>
            <Link href="/admin" className="text-xs font-bold text-emerald-400 hover:underline">
              → Login Panel Admin
            </Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-emerald-900/60 text-center text-xs text-emerald-400/70">
          © 2026 {siteConfig.name}. All rights reserved. Built with Next.js, Tailwind CSS, & Supabase.
        </div>
      </footer>
    </div>
  )
}
