import { handle } from 'hono/vercel'
import { app } from '../app'

// Next.js の catch-all ルートに Hono アプリをマウントする。
export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)
