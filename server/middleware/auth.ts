export default defineEventHandler((event) => {
  // 登录页面和验证接口不需要检查
  const path = event.path || ''
  if (path === '/login' || path === '/api/auth/verify') {
    return
  }
  
  // 检查登录状态
  const auth = getCookie(event, 'metnav_auth')
  if (auth !== 'true') {
    // 返回 401，前端跳转到登录页
    throw createError({
      statusCode: 401,
      message: '请先登录'
    })
  }
})