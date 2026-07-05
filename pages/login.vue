<template>
  <div class="login-wrapper">
    <div class="login-card">
      <h1>🔐 MetNav</h1>
      <p>请输入密码访问</p>
      <input
        v-model="password"
        type="password"
        placeholder="密码"
        @keyup.enter="handleLogin"
      />
      <button @click="handleLogin" :disabled="loading">
        {{ loading ? '验证中...' : '进入' }}
      </button>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
const password = ref('')
const loading = ref(false)
const error = ref('')
const router = useRouter()

const handleLogin = async () => {
  if (!password.value.trim()) {
    error.value = '请输入密码'
    return
  }

  loading.value = true
  error.value = ''

  try {
    const { data } = await useFetch('/api/auth/verify', {
      method: 'POST',
      body: { password: password.value }
    })

    if (data.value?.success) {
      // 登录成功，跳转到管理后台
      await router.push('/admin')
    } else {
      error.value = data.value?.error || '密码错误'
    }
  } catch (err) {
    error.value = '网络错误，请重试'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}
.login-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  padding: 48px 40px;
  border-radius: 32px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 380px;
  text-align: center;
}
.login-card h1 {
  color: #fff;
  font-size: 2rem;
  font-weight: 300;
  margin-bottom: 8px;
}
.login-card p {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.95rem;
  margin-bottom: 24px;
}
.login-card input {
  width: 100%;
  padding: 14px 18px;
  border-radius: 60px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
  font-size: 1rem;
  outline: none;
  margin-bottom: 16px;
}
.login-card input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}
.login-card input:focus {
  border-color: rgba(255, 255, 255, 0.3);
}
.login-card button {
  width: 100%;
  padding: 14px;
  border-radius: 60px;
  border: none;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
.login-card button:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.25);
}
.login-card button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.login-card .error {
  color: #ff6b6b;
  font-size: 0.85rem;
  margin-top: 12px;
}
</style>