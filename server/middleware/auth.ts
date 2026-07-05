export default defineEventHandler((event) => {
  const path = event.path || ''

  // 放行登录页和所有 API
  if (path === '/login' || path.startsWith('/api/')) {
    return
  }

  // 检查 cookie
  const auth = getCookie(event, 'metnav_auth')
  if (auth !== 'true') {
    // 返回 401，前端全局拦截跳转
    throw createError({
      statusCode: 401,
      message: '请先登录'
    })
  }
})