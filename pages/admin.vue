<template>
  <div class="admin-container">
    <!-- 顶部：三个管理入口 + 退出 -->
    <div class="admin-top-bar">
      <div class="admin-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          class="tab-btn"
          :class="{ active: activeTab === tab.key }"
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
        </button>
      </div>
      <button class="logout-btn" @click="handleLogout">退出</button>
    </div>

    <!-- 内容区域（大框） -->
    <div class="admin-panel">
      <!-- 分类管理 -->
      <CategoryManager v-if="activeTab === 'categories'" />

      <!-- 网址管理 -->
      <BookmarkManager v-else-if="activeTab === 'bookmarks'" />

      <!-- 密码管理 -->
      <PasswordManager v-else-if="activeTab === 'password'" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CategoryManager from '~/components/CategoryManager.vue'
import BookmarkManager from '~/components/BookmarkManager.vue'
import PasswordManager from '~/components/PasswordManager.vue'

const router = useRouter()
const activeTab = ref('categories')
const tabs = [
  { key: 'categories', label: '📂 分类设置' },
  { key: 'bookmarks', label: '🔗 网址设置' },
  { key: 'password', label: '🔐 密码设置' }
]

// 检查登录状态
onMounted(() => {
  const cookies = document.cookie.split(';')
  const authCookie = cookies.find(c => c.trim().startsWith('metnav_auth='))
  if (!authCookie) {
    router.push('/login')
  }
})

const handleLogout = () => {
  document.cookie = 'metnav_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
  router.push('/login')
}
</script>

<style scoped>
.admin-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px 16px 40px;
  width: 100%;
}

.admin-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  gap: 12px;
}

.admin-tabs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 10px 24px;
  border-radius: 100px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  backdrop-filter: blur(4px);
}

.tab-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
}

.tab-btn.active {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.logout-btn {
  padding: 10px 20px;
  border-radius: 100px;
  border: 1px solid rgba(255, 70, 70, 0.2);
  background: rgba(255, 70, 70, 0.08);
  color: #ff6b6b;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
}

.logout-btn:hover {
  background: rgba(255, 70, 70, 0.18);
}

.admin-panel {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(14px);
  border-radius: 24px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  min-height: 300px;
}
</style>