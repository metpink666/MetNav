export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { password } = body

  // 通过环境变量判断是否为本地开发模式
  const isLocal = process.env.NUXT_ENV_LOCAL_DB === 'true'

  // 🔹 本地模式：直接比对硬编码密码
  if (isLocal) {
    if (password === '123456') {
      setCookie(event, 'metnav_auth', 'true', {
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
        path: '/',
        sameSite: 'lax'
      })
      return { success: true }
    } else {
      return { success: false, error: '密码错误' }
    }
  }

  // 🔹 生产模式（Cloudflare Pages）：从 D1 读取密码
  try {
    const env = (event.context as any).cloudflare?.env || {}
    const DB = env.DB

    if (!DB) {
      return { success: false, error: '数据库连接失败' }
    }

    const result = await DB.prepare('SELECT value FROM settings WHERE key = ?').bind('password').first()

    if (!result) {
      return { success: false, error: '系统未初始化' }
    }

    const storedPassword = result.value

    if (password === storedPassword) {
      setCookie(event, 'metnav_auth', 'true', {
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
        path: '/',
        sameSite: 'lax'
      })
      return { success: true }
    } else {
      return { success: false, error: '密码错误' }
    }
  } catch (error) {
    console.error('D1 错误:', error)
    return { success: false, error: '数据库连接失败' }
  }
})