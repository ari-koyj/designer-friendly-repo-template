import { db } from '@/lib/db/client'
import { todos, type NewTodo } from '@/lib/db/schema'

/**
 * テスト間の隔離（共有依存 = DB を順次実行で隔離する）。
 * 各テストの beforeEach / afterEach で呼び、テーブルを空にする。
 */
export async function resetTodos() {
  await db.delete(todos)
}

/**
 * Arrange 用の投入ヘルパー。作成された行を返す。
 */
export async function seedTodo(values: Partial<NewTodo> = {}) {
  const [row] = await db
    .insert(todos)
    .values({ title: 'テストタスク', ...values })
    .returning()
  return row
}
