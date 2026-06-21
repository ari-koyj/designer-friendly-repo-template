import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import * as schema from './schema'

/**
 * libSQL クライアント。
 * - ローカル開発 / テスト: file:./local.db（サーバー不要）
 * - 本番: TURSO_DATABASE_URL + TURSO_AUTH_TOKEN で Turso Cloud に接続
 *
 * 接続先は環境変数だけで切り替わり、アプリ側のコードは一切変更しない。
 */
const url = process.env.TURSO_DATABASE_URL ?? 'file:./local.db'
const authToken = process.env.TURSO_AUTH_TOKEN

export const libsql = createClient({ url, authToken })

export const db = drizzle(libsql, { schema })

export type Database = typeof db
