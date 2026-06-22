import { Hono } from 'hono'
import { mattersRoute } from './routes/matters.route'
import { todosRoute } from './routes/todos.route'

/**
 * アプリ全体の Hono インスタンス。
 * ルートはここで合成し、型（AppType）を hono-client が RPC で利用する。
 */
export const app = new Hono()
  .basePath('/api')
  .route('/todos', todosRoute)
  .route('/matters', mattersRoute)

export type AppType = typeof app
