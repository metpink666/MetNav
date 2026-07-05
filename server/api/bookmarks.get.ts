export default defineEventHandler(async (event) => {
  const env = (event.context as any).cloudflare?.env || {}
  const DB = env.DB
  if (!DB) return { success: false, error: 'D1 not bound' }

  const result = await DB.prepare(`
    SELECT b.*, c.name as category_name
    FROM bookmarks b
    LEFT JOIN categories c ON b.category_id = c.id
    ORDER BY b.id
  `).all()
  return { success: true, data: result.results }
})