export const getPassword = async (DB) => {
  const result = await DB.prepare('SELECT value FROM settings WHERE key = ?').bind('password').first()
  return result?.value || null
}

export const updatePassword = async (DB, newPassword) => {
  await DB.prepare('UPDATE settings SET value = ? WHERE key = ?').bind(newPassword, 'password').run()
}