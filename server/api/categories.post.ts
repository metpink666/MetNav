export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name } = body
  if (!name?.trim()) return { success: false, error: '分类名称不能为空' }

  const env = (event.context as any).cloudflare?.env || {}
  const DB = env.DB
  if (!DB) return { success: false, error: 'D1 not bound' }

  const result = await DB.prepare('INSERT INTO categories (name) VALUES (?)').bind(name.trim()).run()
  return { success: true, id: result.meta.last_row_id }
})