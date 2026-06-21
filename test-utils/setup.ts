/**
 * bun test の preload。すべてのテストファイルが読み込まれる前に一度だけ実行される。
 *
 * - DB 接続先を専用のテスト用ファイル（.test.db）へ強制する。
 *   これにより開発用 local.db や本番 Turso を絶対に汚さない。
 * - スキーマ（マイグレーション）を適用する。
 *
 * 注意: import はホイストされ env 設定より先に評価されるため、
 * client の読み込みは env 設定後の動的 import で行う。
 */
export {}

process.env.TURSO_DATABASE_URL = 'file:./.test.db'
delete process.env.TURSO_AUTH_TOKEN

const { db } = await import('@/lib/db/client')
const { migrate } = await import('drizzle-orm/libsql/migrator')

await migrate(db, { migrationsFolder: './lib/db/migrations' })
