export default defineEventHandler(async (event) => {
  try {
    const { DB } = (event.context as any).cloudflare?.env || {}
    
    if (!DB) {
      return { success: false, error: '数据库连接失败' }
    }
    
    const result = await DB.prepare('SELECT * FROM todos').all()
    return { success: true, data: result?.results || [] }
  } catch (error) {
    console.error('D1 错误:', error)
    return { success: false, error: '数据库查询失败' }
  }
})