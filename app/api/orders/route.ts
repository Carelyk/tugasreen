import JSZip from 'jszip'
import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { siteConfig } from '@/config/site'

const validDifficulty = new Set(['Mudah', 'Sedang', 'Sulit'])

function stringField(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === 'string' ? value.trim() : ''
}

function safeFileName(name: string) {
  const cleaned = name
    .normalize('NFKD')
    .replace(/[^a-zA-Z0-9._ -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 120)
  return cleaned || 'lampiran'
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Pesanan belum dapat diproses.'
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Silakan masuk sebelum mengirim pesanan.' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const jenisLayanan = stringField(formData, 'jenisLayanan')
    const mataKuliah = stringField(formData, 'mataKuliah')
    const judul = stringField(formData, 'judul')
    const deskripsi = stringField(formData, 'deskripsi')
    const deadline = stringField(formData, 'deadline')
    const tingkatKesulitan = stringField(formData, 'tingkatKesulitan')
    const hargaDiajukan = Number(stringField(formData, 'hargaDiajukan'))
    const files = formData.getAll('files').filter((value): value is File => value instanceof File && value.size > 0)

    if (!jenisLayanan || !mataKuliah || !judul || deskripsi.length < 20) {
      return NextResponse.json({ error: 'Detail pesanan belum lengkap.' }, { status: 400 })
    }
    if (!validDifficulty.has(tingkatKesulitan)) {
      return NextResponse.json({ error: 'Tingkat kesulitan tidak valid.' }, { status: 400 })
    }
    if (!Number.isFinite(hargaDiajukan) || hargaDiajukan < 0) {
      return NextResponse.json({ error: 'Budget tidak valid.' }, { status: 400 })
    }
    const deadlineDate = new Date(deadline)
    if (Number.isNaN(deadlineDate.getTime()) || deadlineDate <= new Date()) {
      return NextResponse.json({ error: 'Deadline harus berada setelah waktu sekarang.' }, { status: 400 })
    }
    if (files.length === 0 || files.length > siteConfig.maxFilesPerOrder) {
      return NextResponse.json({ error: `Lampiran harus berisi 1 sampai ${siteConfig.maxFilesPerOrder} file.` }, { status: 400 })
    }

    const totalBytes = files.reduce((total, file) => total + file.size, 0)
    const maxBytes = siteConfig.storageMaxFileSizeMB * 1024 * 1024
    if (totalBytes > maxBytes) {
      return NextResponse.json({ error: `Total lampiran maksimal ${siteConfig.storageMaxFileSizeMB} MB.` }, { status: 413 })
    }
    const invalidFile = files.find((file) => {
      const extension = file.name.split('.').pop()?.toLowerCase() ?? ''
      return !siteConfig.allowedFileTypes.includes(file.type) && !siteConfig.allowedFileExtensions.includes(extension)
    })
    if (invalidFile) {
      return NextResponse.json({ error: `Format ${invalidFile.name} belum didukung.` }, { status: 415 })
    }

    const orderId = crypto.randomUUID()
    const zip = new JSZip()
    const usedNames = new Set<string>()

    for (const [index, file] of files.entries()) {
      let name = safeFileName(file.name)
      if (usedNames.has(name)) name = `${index + 1}-${name}`
      usedNames.add(name)
      zip.file(name, await file.arrayBuffer())
    }

    zip.file('README-tuGasREEN.txt', [
      `Pesanan: ${orderId}`,
      `Judul: ${judul}`,
      `Mata kuliah/topik: ${mataKuliah}`,
      `Jumlah file: ${files.length}`,
      '',
      'Paket ini dibuat otomatis oleh tuGasREEN.',
    ].join('\n'))

    const archive = await zip.generateAsync({
      type: 'uint8array',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 },
    })
    const storagePath = `${user.id}/${orderId}/brief-${orderId.slice(0, 8)}.zip`

    const { error: uploadError } = await supabase.storage
      .from('task-files')
      .upload(storagePath, archive, { contentType: 'application/zip', upsert: false })

    if (uploadError) throw new Error(`Upload paket gagal: ${uploadError.message}`)

    const { error: insertError } = await supabase.from('orders').insert({
      id: orderId,
      user_id: user.id,
      jenis_layanan: jenisLayanan,
      mata_kuliah: mataKuliah,
      judul,
      deskripsi,
      deadline: deadlineDate.toISOString(),
      tingkat_kesulitan: tingkatKesulitan,
      file_urls: [storagePath],
      harga_diajukan: hargaDiajukan,
      status: 'Menunggu ACC',
    })

    if (insertError) {
      await supabase.storage.from('task-files').remove([storagePath])
      throw new Error(`Pesanan gagal disimpan: ${insertError.message}`)
    }

    return NextResponse.json({ orderId }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: errorMessage(error) }, { status: 500 })
  }
}
