export type StatusTagStatus =
  | 'Draft'
  | '申請中'
  | '承認済'
  | '差戻し'
  | 'Closed'

export type StatusTagProps = {
  status: StatusTagStatus
  className?: string
}

const statusConfig: Record<
  StatusTagStatus,
  { label: string; className: string }
> = {
  Draft: {
    label: 'Draft',
    className: 'bg-[#f0f0f0] text-[#6b6b6b] border-[#d0d0d0]'
  },
  '申請中': {
    label: '申請中',
    className: 'bg-[#fdf6ec] text-[#b97a0a] border-[#f0d090]'
  },
  '承認済': {
    label: '承認済',
    className: 'bg-[#f0f9eb] text-[#4a9e28] border-[#b3e19b]'
  },
  '差戻し': {
    label: '差戻し',
    className: 'bg-[#fef0ee] text-[#b62613] border-[#f4b8b2]'
  },
  Closed: {
    label: 'Closed',
    className: 'bg-[#eef2f7] text-[#4a6080] border-[#b8c8dc]'
  }
}

/**
 * 純粋な UI の atom。案件ステータスを色分けして表示する。
 */
export function StatusTag({ status, className = '' }: StatusTagProps) {
  const config = statusConfig[status]
  return (
    <span
      className={`inline-flex items-center rounded-[--radius-control] border px-2 py-0.5 text-xs font-medium ${config.className} ${className}`}
    >
      {config.label}
    </span>
  )
}
