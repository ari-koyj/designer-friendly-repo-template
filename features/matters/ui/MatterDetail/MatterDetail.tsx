'use client'

import { useState } from 'react'
import { Button } from '@/shared/ui/Button'
import { Checkbox } from '@/shared/ui/Checkbox'
import { TextInput } from '@/shared/ui/TextInput'
import { StatusTag } from '@/shared/ui/StatusTag'
import type { StatusTagStatus } from '@/shared/ui/StatusTag'
import type { Matter } from '@/lib/db/schema'

const VALID_STATUSES: StatusTagStatus[] = ['Draft', '申請中', '承認済', '差戻し', 'Closed']
function isValidStatus(s: string): s is StatusTagStatus {
  return VALID_STATUSES.includes(s as StatusTagStatus)
}

function parseArrayField(raw: string): string[] {
  try {
    const p = JSON.parse(raw)
    return Array.isArray(p) ? p : []
  } catch {
    return raw ? raw.split(',').map((s) => s.trim()).filter(Boolean) : []
  }
}

type FormRow = {
  label: string
  children: React.ReactNode
}

function Row({ label, children }: FormRow) {
  return (
    <div className="flex items-start border-b border-[--color-border-lighter] py-3 last:border-0">
      <span className="w-40 shrink-0 pt-0.5 text-xs text-foreground-subtle">{label}</span>
      <div className="flex-1">{children}</div>
    </div>
  )
}

export type MatterDetailProps = {
  matter: Matter
  onBack: () => void
  onSave: (updated: Partial<Matter>) => void
  onCancel: () => void
}

export function MatterDetail({ matter, onBack, onSave, onCancel }: MatterDetailProps) {
  const [form, setForm] = useState({
    requestedBy: matter.requestedBy,
    clientCode: matter.clientCode,
    matterCode: matter.matterCode,
    contacts: matter.contacts,
    openDate: matter.openDate,
    location: matter.location,
    slp: matter.slp,
    kycRequired: matter.kycRequired,
    altFee: matter.altFee,
    handlingAttorneys: parseArrayField(matter.handlingAttorneys).join(', '),
    billingAttorneys: parseArrayField(matter.billingAttorneys).join(', '),
    filingAttorney: matter.filingAttorney,
    pg: parseArrayField(matter.pg).join(', '),
    practice: parseArrayField(matter.practice).join(', '),
    mainPractice: matter.mainPractice,
    region: parseArrayField(matter.region).join(', '),
    description: matter.description,
    billable: matter.billable,
    totalEstimate: matter.totalEstimate,
    credit: matter.credit,
    scheduledCloseDate: matter.scheduledCloseDate,
    remarks: matter.remarks,
    hide: matter.hide
  })

  const setField = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [k]: v }))
  }

  const handleSave = () => {
    onSave({
      ...form,
      handlingAttorneys: JSON.stringify(
        form.handlingAttorneys
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
      ),
      billingAttorneys: JSON.stringify(
        form.billingAttorneys
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
      ),
      pg: JSON.stringify(
        form.pg
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
      ),
      practice: JSON.stringify(
        form.practice
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
      ),
      region: JSON.stringify(
        form.region
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
      )
    })
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex size-8 items-center justify-center rounded-[--radius-control] border border-border text-foreground-muted hover:bg-surface-fill transition-colors"
          title="戻る"
        >
          <svg className="size-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M10 12L6 8l4-4" />
          </svg>
        </button>
        <h1 className="flex-1 text-base font-semibold text-foreground">{matter.matterCode}</h1>
        {isValidStatus(matter.status) && <StatusTag status={matter.status} />}
      </div>

      {/* Basic Information Card */}
      <div className="rounded-[--radius-card] border border-border bg-surface p-5 shadow-[--shadow-card]">
        <h2 className="mb-4 text-sm font-semibold text-foreground">基本情報</h2>
        <Row label="ステータス">
          {isValidStatus(matter.status) ? (
            <StatusTag status={matter.status} />
          ) : (
            <span className="text-sm text-foreground-muted">{matter.status}</span>
          )}
        </Row>
        <Row label="申請者">
          <TextInput value={form.requestedBy} onChange={(e) => setField('requestedBy', e.target.value)} />
        </Row>
        <Row label="案件No.">
          <span className="text-sm text-foreground-muted">{matter.matterNo}</span>
        </Row>
        <Row label="クライアントコード">
          <TextInput value={form.clientCode} onChange={(e) => setField('clientCode', e.target.value)} />
        </Row>
        <Row label="案件コード">
          <TextInput value={form.matterCode} onChange={(e) => setField('matterCode', e.target.value)} />
        </Row>
        <Row label="担当者">
          <TextInput value={form.contacts} onChange={(e) => setField('contacts', e.target.value)} />
        </Row>
        <Row label="開設日">
          <TextInput
            type="date"
            value={form.openDate}
            onChange={(e) => setField('openDate', e.target.value)}
            className="max-w-[160px]"
          />
        </Row>
        <Row label="拠点">
          <TextInput value={form.location} onChange={(e) => setField('location', e.target.value)} />
        </Row>
        <Row label="SLP">
          <Checkbox checked={form.slp} onChange={(e) => setField('slp', e.target.checked)} />
        </Row>
        <Row label="KYC要否">
          <Checkbox checked={form.kycRequired} onChange={(e) => setField('kycRequired', e.target.checked)} />
        </Row>
        <Row label="Alt Fee">
          <Checkbox checked={form.altFee} onChange={(e) => setField('altFee', e.target.checked)} />
        </Row>
      </div>

      {/* Additional Information Card */}
      <div className="rounded-[--radius-card] border border-border bg-surface p-5 shadow-[--shadow-card]">
        <h2 className="mb-4 text-sm font-semibold text-foreground">追加情報</h2>
        <Row label="担当弁護士">
          <TextInput
            value={form.handlingAttorneys}
            onChange={(e) => setField('handlingAttorneys', e.target.value)}
            placeholder="カンマ区切りで複数入力"
          />
        </Row>
        <Row label="請求弁護士">
          <TextInput
            value={form.billingAttorneys}
            onChange={(e) => setField('billingAttorneys', e.target.value)}
            placeholder="カンマ区切りで複数入力"
          />
        </Row>
        <Row label="申請弁護士">
          <TextInput value={form.filingAttorney} onChange={(e) => setField('filingAttorney', e.target.value)} />
        </Row>
        <Row label="PG">
          <TextInput
            value={form.pg}
            onChange={(e) => setField('pg', e.target.value)}
            placeholder="カンマ区切りで複数入力"
          />
        </Row>
        <Row label="プラクティス">
          <TextInput
            value={form.practice}
            onChange={(e) => setField('practice', e.target.value)}
            placeholder="カンマ区切りで複数入力"
          />
        </Row>
        <Row label="メインプラクティス">
          <TextInput value={form.mainPractice} onChange={(e) => setField('mainPractice', e.target.value)} />
        </Row>
        <Row label="地域">
          <TextInput
            value={form.region}
            onChange={(e) => setField('region', e.target.value)}
            placeholder="カンマ区切りで複数入力"
          />
        </Row>
        <Row label="説明">
          <textarea
            value={form.description}
            onChange={(e) => setField('description', e.target.value)}
            rows={3}
            className="w-full rounded-[--radius-control] border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none placeholder:text-foreground-placeholder focus:border-primary transition-colors resize-none"
          />
        </Row>
        <Row label="課金区分">
          <TextInput value={form.billable} onChange={(e) => setField('billable', e.target.value)} />
        </Row>
        <Row label="見積額">
          <TextInput value={form.totalEstimate} onChange={(e) => setField('totalEstimate', e.target.value)} />
        </Row>
        <Row label="与信">
          <TextInput value={form.credit} onChange={(e) => setField('credit', e.target.value)} />
        </Row>
        <Row label="完了予定日">
          <TextInput
            type="date"
            value={form.scheduledCloseDate}
            onChange={(e) => setField('scheduledCloseDate', e.target.value)}
            className="max-w-[160px]"
          />
        </Row>
        <Row label="備考">
          <textarea
            value={form.remarks}
            onChange={(e) => setField('remarks', e.target.value)}
            rows={3}
            className="w-full rounded-[--radius-control] border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none placeholder:text-foreground-placeholder focus:border-primary transition-colors resize-none"
          />
        </Row>
        <Row label="非表示">
          <div className="flex items-center gap-4">
            {['Open', 'Closed'].map((v) => (
              <label key={v} className="flex cursor-pointer items-center gap-1.5 text-sm text-foreground-muted">
                <input
                  type="radio"
                  name="hide"
                  value={v}
                  checked={form.hide === v}
                  onChange={() => setField('hide', v)}
                  className="accent-primary"
                />
                {v}
              </label>
            ))}
          </div>
        </Row>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-2 pt-2">
        <Button variant="default" onClick={onCancel}>
          キャンセル
        </Button>
        <Button variant="primary" onClick={handleSave}>
          保存
        </Button>
      </div>
    </div>
  )
}
