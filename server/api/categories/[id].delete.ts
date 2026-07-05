export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) return { success: false, error: '缺少分类 ID' }

  const env = (event.context as any).cloudflare?.env || {}
  const DB = env.DB
  if (!DB) return { success: false, error: 'D1 not bound' }

  // 先删除该分类下的所有网址（或设 category_id = NULL）
  await DB.prepare('DELETE FROM bookmarks WHERE category_id = ?').bind(Number(id)).run()
  await DB.prepare('DELETE FROM categories WHERE id = ?').bind(Number(id)).run()
  return { success: true }
})