export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  const { name, url, avatar, note, category_id } = body

  if (!id || !name?.trim() || !url?.trim()) return { success: false, error: '参数错误' }

  const env = (event.context as any).cloudflare?.env || {}
  const DB = env.DB
  if (!DB) return { success: false, error: 'D1 not bound' }

  await DB.prepare(
    'UPDATE bookmarks SET name = ?, url = ?, avatar = ?, note = ?, category_id = ? WHERE id = ?'
  ).bind(name.trim(), url.trim(), avatar?.trim() || '', note?.trim() || '', category_id ? Number(category_id) : null, Number(id)).run()

  return { success: true }
})