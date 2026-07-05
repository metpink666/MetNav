export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  const { name } = body

  if (!id || !name?.trim()) return { success: false, error: '参数错误' }

  const env = (event.context as any).cloudflare?.env || {}
  const DB = env.DB
  if (!DB) return { success: false, error: 'D1 not bound' }

  await DB.prepare('UPDATE categories SET name = ? WHERE id = ?').bind(name.trim(), Number(id)).run()
  return { success: true }
})