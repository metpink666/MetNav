export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) return { success: false, error: '缺少网址 ID' }

  const env = (event.context as any).cloudflare?.env || {}
  const DB = env.DB
  if (!DB) return { success: false, error: 'D1 not bound' }

  await DB.prepare('DELETE FROM bookmarks WHERE id = ?').bind(Number(id)).run()
  return { success: true }
})