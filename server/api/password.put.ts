export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { oldPassword, newPassword, confirmPassword } = body

  if (!oldPassword || !newPassword || !confirmPassword) {
    return { success: false, error: '请完整填写所有密码字段' }
  }
  if (newPassword !== confirmPassword) {
    return { success: false, error: '新密码与确认密码不一致' }
  }
  if (newPassword.length < 6) {
    return { success: false, error: '新密码至少 6 位' }
  }

  const env = (event.context as any).cloudflare?.env || {}
  const DB = env.DB
  if (!DB) return { success: false, error: 'D1 not bound' }

  const current = await DB.prepare('SELECT value FROM settings WHERE key = ?').bind('password').first()
  if (!current) return { success: false, error: '系统未初始化' }
  if (current.value !== oldPassword) {
    return { success: false, error: '旧密码错误' }
  }

  await DB.prepare('UPDATE settings SET value = ? WHERE key = ?').bind(newPassword, 'password').run()
  return { success: true, message: '密码修改成功' }
})