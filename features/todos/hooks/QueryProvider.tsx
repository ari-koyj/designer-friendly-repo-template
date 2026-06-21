'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

/**
 * TanStack Query のクライアントをアプリ全体に供給する。
 * クライアントはレンダーごとに作り直さないよう useState で一度だけ生成する。
 */
export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient())
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
