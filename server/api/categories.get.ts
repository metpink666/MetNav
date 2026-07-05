export default defineEventHandler(async (event) => {
  const env = (event.context as any).cloudflare?.env || {}
  const DB = env.DB
  if (!DB) return { success: false, error: 'D1 not bound' }

  const result = await DB.prepare('SELECT * FROM categories ORDER BY id').all()
  return { success: true, data: result.results }
})