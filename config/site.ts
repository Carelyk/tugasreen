export const siteConfig = {
  name: "tuGasREEN",
  tagline: "Brief rapi. Pengerjaan terarah.",
  description: "Satu ruang untuk mengirim brief, merapikan file, menyepakati budget, dan memantau progres pengerjaan.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://tugasreen.vercel.app",
  adminEmails: (process.env.ADMIN_EMAILS || "admin@tugasreen.com,owner@tugasreen.com").split(",").map(e => e.trim()),
  whatsappNumber: "+6281234567890", // Placeholder, ganti sesuai nomor WA admin
  whatsappDisplay: "0812-3456-7890",
  emailAdmin: "support@tugasreen.com",
  storageMaxFileSizeMB: 20,
  maxFilesPerOrder: 10,
  allowedFileExtensions: ["pdf", "doc", "docx", "ppt", "pptx", "xls", "xlsx", "zip"],
  allowedFileTypes: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/zip",
    "application/x-zip-compressed"
  ],
  cleanupDaysOld: 30,
};

export const servicesList = [
  {
    id: "tugas-individu",
    title: "Tugas Individu",
    description: "Pengerjaan esai, makalah, resume, laporan praktikum, dan tugas mandiri berbagai mata kuliah.",
    icon: "FileText",
    badge: "Populer",
  },
  {
    id: "tugas-kelompok",
    title: "Tugas Kelompok",
    description: "Kolaborasi terstruktur, makalah kelompok, paper riset, dan penyusunan tugas besar tim.",
    icon: "Users",
    badge: "Tim",
  },
  {
    id: "analisis-data",
    title: "Analisis Data",
    description: "Olahan data SPSS, Excel, Python, R, uji statistik, dan interpretasi hasil riset skripsi/tugas.",
    icon: "BarChart3",
    badge: "Analitik",
  },
  {
    id: "presentasi-ppt",
    title: "Presentasi / PPT",
    description: "Desain slide presentasi profesional, animasi estetik, dan ringkasan materi siap sidang/tampil.",
    icon: "Presentation",
    badge: "Visual",
  },
  {
    id: "programming",
    title: "Programming",
    description: "Pendampingan tugas coding web, mobile, backend, struktur data, dan debugging script.",
    icon: "Code",
    badge: "Teknis",
  },
  {
    id: "lainnya",
    title: "Lainnya (Custom)",
    description: "Permintaan khusus akademik lainnya sesuai kebutuhan unik Anda. Konsultasikan langsung.",
    icon: "Sparkles",
    badge: "Fleksibel",
  },
];

export const faqsList = [
  {
    question: "Bagaimana sistem penentuan harga di tuGasREEN?",
    answer: "Berbeda dari jasa lain yang kaku, di tuGasREEN Anda yang mengajukan estimasi harga/budget sesuai kemampuan. Admin kami akan mereview dan melakukan ACC atau Nego harga secara adil."
  },
  {
    question: "Apakah data dan kerahasiaan tugas saya aman?",
    answer: "Sangat aman. Dokumen instruksi dan hasil kerja Anda dienkripsi dan hanya dapat diakses oleh Anda dan tim admin terverifikasi. Kami menjamin 100% kerahasiaan akademik."
  },
  {
    question: "Bagaimana cara melakukan pembayaran?",
    answer: "Setelah harga disepakati (status Menunggu Pembayaran/Diproses), admin akan memberikan instruksi pembayaran via transfer bank atau e-wallet melalui detail pesanan."
  },
  {
    question: "Apakah bisa mengajukan revisi jika ada yang kurang?",
    answer: "Tentu! Setiap pesanan mencakup garansi revisi sesuai kesepakatan detail tugas untuk memastikan hasil akhir memuaskan dan sesuai instruksi."
  },
  {
    question: "Bagaimana jika deadline tugas saya sangat mendesak (urgent)?",
    answer: "Anda tetap dapat memasukkan deadline pada form pesanan. Sampaikan kebutuhan mendesak pada kolom deskripsi agar admin dapat memprioritaskan peninjauan."
  },
  {
    question: "Apakah tuGasREEN melayani joki ujian atau kuis real-time?",
    answer: "Tidak. Sesuai batasan layanan kami, tuGasREEN tidak melayani ujian/kuis real-time, joki ujian, atau tindakan plagiasi instan. Kami fokus membantu pengerjaan tugas terstruktur dan konsultasi akademik."
  }
];
