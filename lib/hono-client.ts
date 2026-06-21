import { hc } from 'hono/client'
import type { AppType } from '@/app/api/app'

/**
 * 型安全な Hono RPC クライアント。
 * features/hooks はこの client 経由で API を呼び、エンドポイントの型が
 * そのままフロントの引数・戻り値に伝播する。
 */
const baseUrl =
  typeof window === 'undefined'
    ? (process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000')
    : window.location.origin

export const client = hc<AppType>(baseUrl)

export const todosApi = client.api.todos
