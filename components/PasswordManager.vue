<template>
  <div>
    <h3>🔐 修改密码</h3>
    <div class="form">
      <input v-model="oldPwd" type="password" placeholder="旧密码" class="input" />
      <input v-model="newPwd" type="password" placeholder="新密码" class="input" />
      <input v-model="confirmPwd" type="password" placeholder="确认新密码" class="input" />
      <button @click="changePassword" class="btn-change">确认修改</button>
      <p v-if="message" class="msg">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const oldPwd = ref('')
const newPwd = ref('')
const confirmPwd = ref('')
const message = ref('')

const changePassword = async () => {
  if (!oldPwd.value || !newPwd.value || !confirmPwd.value) {
    message.value = '请完整填写所有字段'
    return
  }
  if (newPwd.value !== confirmPwd.value) {
    message.value = '新密码与确认密码不一致'
    return
  }
  if (newPwd.value.length < 6) {
    message.value = '新密码至少 6 位'
    return
  }

  try {
    const result = await $fetch('/api/password', {
      method: 'PUT',
      body: {
        oldPassword: oldPwd.value,
        newPassword: newPwd.value,
        confirmPassword: confirmPwd.value
      }
    })
    message.value = result.success ? '✅ 密码修改成功' : `❌ ${result.error}`
    if (result.success) {
      oldPwd.value = ''
      newPwd.value = ''
      confirmPwd.value = ''
    }
  } catch {
    message.value = '❌ 请求失败，请重试'
  }
}
</script>

<style scoped>
h3 { color: #f0f6ff; font-weight: 400; margin-bottom: 16px; }
.form { display: flex; flex-direction: column; gap: 12px; max-width: 320px; }
.input {
  padding: 12px 18px;
  border-radius: 40px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.04);
  color: #f0f6ff;
  outline: none;
}
.input::placeholder { color: rgba(255,255,255,0.3); }
.btn-change {
  padding: 12px;
  border-radius: 40px;
  border: none;
  background: rgba(255,255,255,0.08);
  color: #f0f6ff;
  cursor: pointer;
}
.btn-change:hover { background: rgba(255,255,255,0.16); }
.msg { margin-top: 8px; color: #f0f6ff; font-size: 0.9rem; opacity: 0.8; }
</style>