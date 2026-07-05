export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, url, avatar, note, category_id } = body

  if (!name?.trim() || !url?.trim()) return { success: false, error: '名称和网址不能为空' }

  const env = (event.context as any).cloudflare?.env || {}
  const DB = env.DB
  if (!DB) return { success: false, error: 'D1 not bound' }

  const result = await DB.prepare(
    'INSERT INTO bookmarks (name, url, avatar, note, category_id) VALUES (?, ?, ?, ?, ?)'
  ).bind(name.trim(), url.trim(), avatar?.trim() || '', note?.trim() || '', category_id ? Number(category_id) : null).run()

  return { success: true, id: result.meta.last_row_id }
})