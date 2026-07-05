export default defineEventHandler((event) => {
  const path = event.path || ''
  
  // 登录页面和 API 放行
  if (path === '/login' || path.startsWith('/api/')) {
    return
  }
  
  // 检查 cookie
  const auth = getCookie(event, 'metnav_auth')
  
  if (auth !== 'true') {
    // 没有登录 → 重定向到 login
    return sendRedirect(event, '/login', 302)
  }
})