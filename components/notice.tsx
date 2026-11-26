import { CircleAlert, CircleCheckBig, Info } from 'lucide-react'
import type { ReactNode } from 'react'

const variants = {
  error: {
    icon: CircleAlert,
    shell: 'border-rose-200/90 bg-gradient-to-br from-white to-rose-50 text-rose-800 shadow-rose-950/10',
    badge: 'bg-rose-100 text-rose-700 ring-rose-200',
  },
  success: {
    icon: CircleCheckBig,
    shell: 'border-emerald-200/90 bg-gradient-to-br from-white to-emerald-50 text-emerald-900 shadow-emerald-950/10',
    badge: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
  },
  info: {
    icon: Info,
    shell: 'border-sky-200/90 bg-gradient-to-br from-white to-sky-50 text-sky-900 shadow-sky-950/10',
    badge: 'bg-sky-100 text-sky-700 ring-sky-200',
  },
} as const

export function Notice({
  children,
  type = 'info',
  className = '',
  compact = false,
}: {
  children: ReactNode
  type?: keyof typeof variants
  className?: string
  compact?: boolean
}) {
  const variant = variants[type]
  const Icon = variant.icon

  return (
    <div
      role={type === 'error' ? 'alert' : 'status'}
      aria-live={type === 'error' ? 'assertive' : 'polite'}
      className={`ui-pop flex items-start gap-3 overflow-hidden rounded-2xl border font-bold shadow-lg ${variant.shell} ${compact ? 'p-3 text-xs' : 'p-4 text-sm'} ${className}`}
    >
      <span className={`grid shrink-0 place-items-center rounded-xl ring-1 ${variant.badge} ${compact ? 'size-7' : 'size-9'}`}>
        <Icon className={compact ? 'size-3.5' : 'size-4.5'} />
      </span>
      <span className="min-w-0 flex-1 self-center leading-6">{children}</span>
    </div>
  )
}
