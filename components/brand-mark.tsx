import Image from 'next/image'

export function BrandMark({
  className = 'size-10',
  priority = false,
}: {
  className?: string
  priority?: boolean
}) {
  return (
    <Image
      src="/tugasreen-logo.jpg"
      width={160}
      height={160}
      alt=""
      aria-hidden="true"
      priority={priority}
      className={`${className} shrink-0 rounded-[28%] object-cover shadow-sm ring-1 ring-emerald-950/10`}
    />
  )
}
