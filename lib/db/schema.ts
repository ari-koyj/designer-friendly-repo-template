import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * todos テーブル。これがドメインの単一の真実であり、
 * drizzle-zod を通して API のバリデーションスキーマもここから導出する。
 */
export const todos = sqliteTable('todos', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  completed: integer('completed', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(current_timestamp)`)
})

export type Todo = typeof todos.$inferSelect
export type NewTodo = typeof todos.$inferInsert

/**
 * matters テーブル。案件管理のドメインモデル。
 * 配列フィールド（handlingAttorneys 等）は JSON 文字列として格納し、
 * API 層でシリアライズ / デシリアライズする。
 */
export const matters = sqliteTable('matters', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  matterNo: text('matter_no').notNull(),
  clientCode: text('client_code').notNull(),
  matterCode: text('matter_code').notNull(),
  contacts: text('contacts').notNull().default(''),
  openDate: text('open_date').notNull(),
  location: text('location').notNull().default('Tokyo'),
  handlingAttorneys: text('handling_attorneys').notNull().default('[]'),
  billingAttorneys: text('billing_attorneys').notNull().default('[]'),
  filingAttorney: text('filing_attorney').notNull().default(''),
  status: text('status').notNull().default('Draft'),
  region: text('region').notNull().default('[]'),
  practice: text('practice').notNull().default('[]'),
  mainPractice: text('main_practice').notNull().default(''),
  pg: text('pg').notNull().default('[]'),
  billable: text('billable').notNull().default('対象'),
  totalEstimate: text('total_estimate').notNull().default(''),
  credit: text('credit').notNull().default(''),
  scheduledCloseDate: text('scheduled_close_date').notNull().default(''),
  requestedBy: text('requested_by').notNull().default(''),
  kycRequired: integer('kyc_required', { mode: 'boolean' }).notNull().default(false),
  slp: integer('slp', { mode: 'boolean' }).notNull().default(false),
  altFee: integer('alt_fee', { mode: 'boolean' }).notNull().default(false),
  hide: text('hide').notNull().default('Open'),
  description: text('description').notNull().default(''),
  remarks: text('remarks').notNull().default(''),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(current_timestamp)`)
})

export type Matter = typeof matters.$inferSelect
export type NewMatter = typeof matters.$inferInsert
