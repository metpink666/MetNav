export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { password } = body

  // 本地开发模式（环境变量标记）
  const isLocal = process.env.NUXT_ENV_LOCAL_DB === 'true'

  if (isLocal) {
    if (password === '123456') {
      setCookie(event, 'metnav_auth', 'true', {
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
        path: '/',
        sameSite: 'lax'
      })
      return { success: true }
    }
    return { success: false, error: '密码错误' }
  }

  // 生产模式（Cloudflare Pages + D1）
  try {
    const env = (event.context as any).cloudflare?.env || {}
    const DB = env.DB
    if (!DB) throw new Error('D1 not bound')

    const result = await DB.prepare('SELECT value FROM settings WHERE key = ?').bind('password').first()
    if (!result) return { success: false, error: '系统未初始化' }

    if (password === result.value) {
      setCookie(event, 'metnav_auth', 'true', {
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
        path: '/',
        sameSite: 'lax'
      })
      return { success: true }
    }
    return { success: false, error: '密码错误' }
  } catch (error) {
    console.error('D1 error:', error)
    return { success: false, error: '数据库连接失败' }
  }
})