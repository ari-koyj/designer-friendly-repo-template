'use client'

import { useState } from 'react'
import { useMatters, useCreateMatter, useUpdateMatter } from '@/features/matters/hooks/useMatters'
import { MatterList } from '@/features/matters/ui/MatterList/MatterList'
import { MatterDetail } from '@/features/matters/ui/MatterDetail/MatterDetail'
import type { Matter } from '@/lib/db/schema'

type View = { type: 'list' } | { type: 'detail'; matter: Matter } | { type: 'new' }

/**
 * 案件管理画面の viewmodel。
 * hooks（= Hono API）と純粋な UI（MatterList / MatterDetail）を配線するだけで、
 * 表示ロジックは UI へ、サーバー処理は hooks へ委譲する。
 */
export function MatterPage() {
  const { data: matters = [], isLoading } = useMatters()
  const createMatter = useCreateMatter()
  const updateMatter = useUpdateMatter()
  const [view, setView] = useState<View>({ type: 'list' })

  const container = 'mx-auto w-full max-w-7xl px-4 py-6'

  if (isLoading) {
    return (
      <main className={container}>
        <div className="flex h-64 items-center justify-center">
          <p className="text-sm text-foreground-subtle">読み込み中...</p>
        </div>
      </main>
    )
  }

  if (view.type === 'detail') {
    return (
      <main className={container}>
        <MatterDetail
          matter={view.matter}
          onBack={() => setView({ type: 'list' })}
          onCancel={() => setView({ type: 'list' })}
          onSave={(updated) => {
            updateMatter.mutate(
              { id: view.matter.id, ...updated },
              { onSuccess: () => setView({ type: 'list' }) }
            )
          }}
        />
      </main>
    )
  }

  if (view.type === 'new') {
    const blankMatter: Matter = {
      id: 0,
      matterNo: '',
      clientCode: '',
      matterCode: '',
      contacts: '',
      openDate: new Date().toISOString().slice(0, 10),
      location: 'Tokyo',
      handlingAttorneys: '[]',
      billingAttorneys: '[]',
      filingAttorney: '',
      status: 'Draft',
      region: '[]',
      practice: '[]',
      mainPractice: '',
      pg: '[]',
      billable: '対象',
      totalEstimate: '',
      credit: '',
      scheduledCloseDate: '',
      requestedBy: '',
      kycRequired: false,
      slp: false,
      altFee: false,
      hide: 'Open',
      description: '',
      remarks: '',
      createdAt: ''
    }
    return (
      <main className={container}>
        <MatterDetail
          matter={blankMatter}
          onBack={() => setView({ type: 'list' })}
          onCancel={() => setView({ type: 'list' })}
          onSave={(data) => {
            if (!data.matterNo || !data.clientCode || !data.matterCode || !data.openDate) return
            createMatter.mutate(
              {
                matterNo: data.matterNo!,
                clientCode: data.clientCode!,
                matterCode: data.matterCode!,
                openDate: data.openDate!,
                contacts: data.contacts ?? '',
                location: data.location ?? 'Tokyo',
                handlingAttorneys: JSON.parse(data.handlingAttorneys ?? '[]'),
                billingAttorneys: JSON.parse(data.billingAttorneys ?? '[]'),
                filingAttorney: data.filingAttorney ?? '',
                status: data.status ?? 'Draft',
                region: JSON.parse(data.region ?? '[]'),
                practice: JSON.parse(data.practice ?? '[]'),
                mainPractice: data.mainPractice ?? '',
                pg: JSON.parse(data.pg ?? '[]'),
                billable: data.billable ?? '対象',
                totalEstimate: data.totalEstimate ?? '',
                credit: data.credit ?? '',
                scheduledCloseDate: data.scheduledCloseDate ?? '',
                requestedBy: data.requestedBy ?? '',
                kycRequired: data.kycRequired ?? false,
                slp: data.slp ?? false,
                altFee: data.altFee ?? false,
                hide: data.hide ?? 'Open',
                description: data.description ?? '',
                remarks: data.remarks ?? ''
              },
              { onSuccess: () => setView({ type: 'list' }) }
            )
          }}
        />
      </main>
    )
  }

  return (
    <main className={container}>
      <MatterList
        matters={matters}
        onOpen={(m) => setView({ type: 'detail', matter: m })}
        onNew={() => setView({ type: 'new' })}
      />
    </main>
  )
}
