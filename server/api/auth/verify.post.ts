export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { password } = body
  
  // 从 D1 获取密码
  const ctx = event.context.cloudflare?.env || {}
  const DB = ctx.DB
  
  if (!DB) {
    return { success: false, error: '数据库连接失败' }
  }
  
  const result = await DB.prepare('SELECT value FROM settings WHERE key = ?').bind('password').first()
  
  if (!result) {
    return { success: false, error: '系统未初始化' }
  }
  
  // 简单比对（生产环境请用 bcrypt）
  const storedPassword = result.value
  if (password === storedPassword) {
    // 设置登录状态（通过 cookie）
    setCookie(event, 'metnav_auth', 'true', {
      maxAge: 60 * 60 * 24 * 7, // 7天
      httpOnly: true,
      path: '/'
    })
    return { success: true }
  } else {
    return { success: false, error: '密码错误' }
  }
})