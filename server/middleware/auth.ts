export default defineEventHandler((event) => {
  const path = event.path || ''
  if (path === '/login' || path.startsWith('/api/')) return
  const auth = getCookie(event, 'metnav_auth')
  if (auth !== 'true' && path !== '/admin') {
    return sendRedirect(event, '/login', 302)
  }
})