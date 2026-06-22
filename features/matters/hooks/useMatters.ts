'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { mattersApi } from '@/lib/hono-client'
import type { Matter } from '@/lib/db/schema'

const mattersKey = ['matters'] as const

/**
 * 案件一覧を取得する。status でフィルタリング可能。
 */
export function useMatters(params?: { status?: string }) {
  return useQuery<Matter[]>({
    queryKey: params?.status ? [...mattersKey, params.status] : mattersKey,
    queryFn: async () => {
      const res = await mattersApi.$get(
        params?.status ? { query: { status: params.status } } : {}
      )
      return (await res.json()) as Matter[]
    }
  })
}

/**
 * 案件詳細を取得する。
 */
export function useMatter(id: number) {
  return useQuery<Matter>({
    queryKey: [...mattersKey, id],
    queryFn: async () => {
      const res = await mattersApi[':id'].$get({ param: { id: String(id) } })
      if (!res.ok) throw new Error('Matter not found')
      return (await res.json()) as Matter
    },
    enabled: id > 0
  })
}

type MatterInput = {
  matterNo: string
  clientCode: string
  matterCode: string
  contacts?: string
  openDate: string
  location?: string
  handlingAttorneys?: string[]
  billingAttorneys?: string[]
  filingAttorney?: string
  status?: string
  region?: string[]
  practice?: string[]
  mainPractice?: string
  pg?: string[]
  billable?: string
  totalEstimate?: string
  credit?: string
  scheduledCloseDate?: string
  requestedBy?: string
  kycRequired?: boolean
  slp?: boolean
  altFee?: boolean
  hide?: string
  description?: string
  remarks?: string
}

/**
 * 案件を作成し、成功時に一覧を再取得する。
 */
export function useCreateMatter() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (input: MatterInput) => {
      const res = await mattersApi.$post({ json: input })
      if (!res.ok) throw new Error('Failed to create matter')
      return (await res.json()) as Matter
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: mattersKey })
  })
}

/**
 * 案件を更新し、成功時に一覧と詳細を再取得する。
 */
export function useUpdateMatter() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, ...input }: Partial<MatterInput> & { id: number }) => {
      const res = await mattersApi[':id'].$patch({
        param: { id: String(id) },
        json: input
      })
      if (!res.ok) throw new Error('Failed to update matter')
      return (await res.json()) as Matter
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: mattersKey })
      queryClient.invalidateQueries({ queryKey: [...mattersKey, variables.id] })
    }
  })
}

/**
 * 案件を削除し、成功時に一覧を再取得する。
 */
export function useDeleteMatter() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await mattersApi[':id'].$delete({ param: { id: String(id) } })
      if (!res.ok) throw new Error('Failed to delete matter')
      return res.json()
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: mattersKey })
  })
}
