'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/shared/ui/Button'
import { Checkbox } from '@/shared/ui/Checkbox'
import { TextInput } from '@/shared/ui/TextInput'
import { StatusTag } from '@/shared/ui/StatusTag'
import type { StatusTagStatus } from '@/shared/ui/StatusTag'
import type { Matter } from '@/lib/db/schema'

const STATUS_OPTIONS = ['全て', 'Draft', '申請中', '承認済', '差戻し', 'Closed'] as const

const VALID_STATUSES: StatusTagStatus[] = ['Draft', '申請中', '承認済', '差戻し', 'Closed']

function isValidStatus(s: string): s is StatusTagStatus {
  return VALID_STATUSES.includes(s as StatusTagStatus)
}

function parseAttorneys(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return raw ? [raw] : []
  }
}

export type MatterListProps = {
  matters: Matter[]
  onOpen: (m: Matter) => void
  onNew: () => void
}

export function MatterList({ matters, onOpen, onNew }: MatterListProps) {
  const [clientCodeFilter, setClientCodeFilter] = useState('')
  const [keywordFilter, setKeywordFilter] = useState('')
  const [attorneyFilter, setAttorneyFilter] = useState('')
  const [activeStatus, setActiveStatus] = useState<string>('全て')
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const filtered = useMemo(() => {
    return matters.filter((m) => {
      if (clientCodeFilter && !m.clientCode.toLowerCase().includes(clientCodeFilter.toLowerCase())) return false
      if (keywordFilter && !m.matterCode.toLowerCase().includes(keywordFilter.toLowerCase()) && !m.matterNo.toLowerCase().includes(keywordFilter.toLowerCase())) return false
      if (attorneyFilter) {
        const attorneys = parseAttorneys(m.handlingAttorneys)
        if (!attorneys.some((a) => a.toLowerCase().includes(attorneyFilter.toLowerCase()))) return false
      }
      if (activeStatus !== '全て' && m.status !== activeStatus) return false
      return true
    })
  }, [matters, clientCodeFilter, keywordFilter, attorneyFilter, activeStatus])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize)

  const allSelected = paginated.length > 0 && paginated.every((m) => selectedIds.has(m.id))
  const toggleAll = () => {
    if (allSelected) {
      const next = new Set(selectedIds)
      paginated.forEach((m) => next.delete(m.id))
      setSelectedIds(next)
    } else {
      const next = new Set(selectedIds)
      paginated.forEach((m) => next.add(m.id))
      setSelectedIds(next)
    }
  }

  const toggleRow = (id: number) => {
    const next = new Set(selectedIds)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelectedIds(next)
  }

  const handleSearch = () => {
    setPage(1)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Search bar */}
      <div className="flex items-center gap-2 rounded-[--radius-card] border border-border bg-surface p-3 shadow-[--shadow-card]">
        <div className="flex flex-1 items-center gap-2">
          <label className="shrink-0 text-xs text-foreground-subtle">クライアントコード</label>
          <TextInput
            placeholder="例: CL001"
            value={clientCodeFilter}
            onChange={(e) => setClientCodeFilter(e.target.value)}
            className="max-w-[140px]"
          />
          <label className="shrink-0 text-xs text-foreground-subtle">キーワード</label>
          <TextInput
            placeholder="案件名・案件コード"
            value={keywordFilter}
            onChange={(e) => setKeywordFilter(e.target.value)}
            className="max-w-[200px]"
          />
          <label className="shrink-0 text-xs text-foreground-subtle">担当弁護士</label>
          <TextInput
            placeholder="弁護士名"
            value={attorneyFilter}
            onChange={(e) => setAttorneyFilter(e.target.value)}
            className="max-w-[140px]"
          />
        </div>
        <Button variant="primary" size="sm" onClick={handleSearch}>
          検索
        </Button>
      </div>

      {/* Status filter + actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => { setActiveStatus(s); setPage(1) }}
              className={`h-7 rounded-[--radius-control] px-3 text-xs font-medium transition-colors ${
                activeStatus === s
                  ? 'bg-primary text-white'
                  : 'bg-surface text-foreground-muted border border-border hover:bg-surface-fill'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {selectedIds.size > 0 && (
            <span className="text-xs text-foreground-subtle">{selectedIds.size} 件選択中</span>
          )}
          <Button variant="default" size="sm">
            <svg className="size-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M8 2v8M4 7l4 4 4-4M2 13h12" />
            </svg>
            ダウンロード
          </Button>
          <Button variant="primary" size="sm" onClick={onNew}>
            + 新規作成
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-[--radius-card] border border-border bg-surface shadow-[--shadow-card]">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-muted text-left">
              <th className="w-10 px-3 py-2.5">
                <Checkbox
                  checked={allSelected}
                  onChange={toggleAll}
                />
              </th>
              <th className="px-3 py-2.5 text-xs font-semibold text-foreground-subtle whitespace-nowrap">案件No.</th>
              <th className="px-3 py-2.5 text-xs font-semibold text-foreground-subtle whitespace-nowrap">クライアントコード</th>
              <th className="px-3 py-2.5 text-xs font-semibold text-foreground-subtle whitespace-nowrap">案件コード</th>
              <th className="px-3 py-2.5 text-xs font-semibold text-foreground-subtle whitespace-nowrap">担当者</th>
              <th className="px-3 py-2.5 text-xs font-semibold text-foreground-subtle whitespace-nowrap">担当弁護士</th>
              <th className="px-3 py-2.5 text-xs font-semibold text-foreground-subtle whitespace-nowrap">ステータス</th>
              <th className="px-3 py-2.5 text-xs font-semibold text-foreground-subtle whitespace-nowrap">開設日</th>
              <th className="w-10 px-3 py-2.5"></th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-12 text-center text-sm text-foreground-subtle">
                  案件が見つかりませんでした
                </td>
              </tr>
            ) : (
              paginated.map((m) => (
                <tr
                  key={m.id}
                  className="border-b border-border last:border-0 hover:bg-surface-muted transition-colors"
                >
                  <td className="px-3 py-2.5">
                    <Checkbox
                      checked={selectedIds.has(m.id)}
                      onChange={() => toggleRow(m.id)}
                    />
                  </td>
                  <td className="px-3 py-2.5 text-xs text-foreground-muted whitespace-nowrap">{m.matterNo}</td>
                  <td className="px-3 py-2.5 text-xs text-foreground-muted whitespace-nowrap">{m.clientCode}</td>
                  <td className="px-3 py-2.5 whitespace-nowrap">
                    <button
                      type="button"
                      className="text-xs font-medium text-primary hover:underline"
                      onClick={() => onOpen(m)}
                    >
                      {m.matterCode}
                    </button>
                  </td>
                  <td className="px-3 py-2.5 text-xs text-foreground-muted">{m.contacts}</td>
                  <td className="px-3 py-2.5">
                    <div className="flex flex-wrap gap-1">
                      {parseAttorneys(m.handlingAttorneys).map((a, i) => (
                        <span key={i} className="rounded-[--radius-control-sm] bg-primary-subtle px-1.5 py-0.5 text-xs text-foreground-muted">
                          {a}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-3 py-2.5">
                    {isValidStatus(m.status) ? (
                      <StatusTag status={m.status} />
                    ) : (
                      <span className="text-xs text-foreground-subtle">{m.status}</span>
                    )}
                  </td>
                  <td className="px-3 py-2.5 text-xs text-foreground-muted whitespace-nowrap">{m.openDate}</td>
                  <td className="px-3 py-2.5">
                    <button
                      type="button"
                      className="flex size-6 items-center justify-center rounded-[--radius-control] text-foreground-subtle hover:bg-surface-fill hover:text-foreground-muted transition-colors"
                      onClick={() => onOpen(m)}
                      title="編集"
                    >
                      <svg className="size-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M11 2l3 3-8 8H3v-3l8-8z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-xs text-foreground-subtle">
        <span>全 {filtered.length} 件</span>
        <div className="flex items-center gap-2">
          <span>表示件数:</span>
          <select
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1) }}
            className="h-7 rounded-[--radius-control] border border-border bg-surface px-2 text-xs text-foreground-muted outline-none focus:border-primary"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="flex size-7 items-center justify-center rounded-[--radius-control] border border-border bg-surface text-foreground-muted disabled:opacity-40 hover:bg-surface-fill transition-colors"
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
              .map((p, idx, arr) => (
                <>
                  {idx > 0 && arr[idx - 1] !== p - 1 && (
                    <span key={`ellipsis-${p}`} className="px-1">…</span>
                  )}
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPage(p)}
                    className={`flex size-7 items-center justify-center rounded-[--radius-control] border text-xs transition-colors ${
                      p === page
                        ? 'border-primary bg-primary text-white'
                        : 'border-border bg-surface text-foreground-muted hover:bg-surface-fill'
                    }`}
                  >
                    {p}
                  </button>
                </>
              ))}
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="flex size-7 items-center justify-center rounded-[--radius-control] border border-border bg-surface text-foreground-muted disabled:opacity-40 hover:bg-surface-fill transition-colors"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
