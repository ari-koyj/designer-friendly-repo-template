import { zValidator } from '@hono/zod-validator'
import { desc, eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { z } from 'zod'
import { db } from '@/lib/db/client'
import { matters } from '@/lib/db/schema'

/**
 * 案件一覧・詳細・作成・更新・削除の CRUD ルート。
 * 配列フィールド（handling_attorneys 等）は DB に JSON 文字列で格納し、
 * このルートでシリアライズ / デシリアライズする。
 */

const parseArrayField = (val: string): string[] => {
  try {
    const parsed = JSON.parse(val)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

type MatterRow = typeof matters.$inferSelect

function deserializeMatter(row: MatterRow) {
  return {
    ...row,
    handlingAttorneys: parseArrayField(row.handlingAttorneys),
    billingAttorneys: parseArrayField(row.billingAttorneys),
    region: parseArrayField(row.region),
    practice: parseArrayField(row.practice),
    pg: parseArrayField(row.pg)
  }
}

const createMatterSchema = z.object({
  matterNo: z.string().min(1),
  clientCode: z.string().min(1),
  matterCode: z.string().min(1),
  contacts: z.string().default(''),
  openDate: z.string().min(1),
  location: z.string().default('Tokyo'),
  handlingAttorneys: z.array(z.string()).default([]),
  billingAttorneys: z.array(z.string()).default([]),
  filingAttorney: z.string().default(''),
  status: z.string().default('Draft'),
  region: z.array(z.string()).default([]),
  practice: z.array(z.string()).default([]),
  mainPractice: z.string().default(''),
  pg: z.array(z.string()).default([]),
  billable: z.string().default('対象'),
  totalEstimate: z.string().default(''),
  credit: z.string().default(''),
  scheduledCloseDate: z.string().default(''),
  requestedBy: z.string().default(''),
  kycRequired: z.boolean().default(false),
  slp: z.boolean().default(false),
  altFee: z.boolean().default(false),
  hide: z.string().default('Open'),
  description: z.string().default(''),
  remarks: z.string().default('')
})

const updateMatterSchema = createMatterSchema.partial()

export const mattersRoute = new Hono()
  .get('/', async (c) => {
    const status = c.req.query('status')
    let query = db.select().from(matters).orderBy(desc(matters.createdAt))
    const rows = await query
    const filtered = status ? rows.filter((r) => r.status === status) : rows
    return c.json(filtered.map(deserializeMatter))
  })
  .get('/:id', async (c) => {
    const id = Number(c.req.param('id'))
    const [row] = await db.select().from(matters).where(eq(matters.id, id))
    if (!row) return c.json({ error: 'Not Found' }, 404)
    return c.json(deserializeMatter(row))
  })
  .post('/', zValidator('json', createMatterSchema), async (c) => {
    const data = c.req.valid('json')
    const [created] = await db
      .insert(matters)
      .values({
        ...data,
        handlingAttorneys: JSON.stringify(data.handlingAttorneys),
        billingAttorneys: JSON.stringify(data.billingAttorneys),
        region: JSON.stringify(data.region),
        practice: JSON.stringify(data.practice),
        pg: JSON.stringify(data.pg)
      })
      .returning()
    return c.json(deserializeMatter(created), 201)
  })
  .patch('/:id', zValidator('json', updateMatterSchema), async (c) => {
    const id = Number(c.req.param('id'))
    const data = c.req.valid('json')
    const patch: Record<string, unknown> = { ...data }
    if (data.handlingAttorneys !== undefined)
      patch.handlingAttorneys = JSON.stringify(data.handlingAttorneys)
    if (data.billingAttorneys !== undefined)
      patch.billingAttorneys = JSON.stringify(data.billingAttorneys)
    if (data.region !== undefined) patch.region = JSON.stringify(data.region)
    if (data.practice !== undefined) patch.practice = JSON.stringify(data.practice)
    if (data.pg !== undefined) patch.pg = JSON.stringify(data.pg)
    const [updated] = await db
      .update(matters)
      .set(patch)
      .where(eq(matters.id, id))
      .returning()
    if (!updated) return c.json({ error: 'Not Found' }, 404)
    return c.json(deserializeMatter(updated))
  })
  .delete('/:id', async (c) => {
    const id = Number(c.req.param('id'))
    const [deleted] = await db.delete(matters).where(eq(matters.id, id)).returning()
    if (!deleted) return c.json({ error: 'Not Found' }, 404)
    return c.json({ success: true })
  })
