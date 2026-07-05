<template>
  <div class="container">
    <!-- 顶部：分类框 + 设置按钮 -->
    <div class="top-bar">
      <div class="category-bar">
        <div class="category-scroll">
          <span
            v-for="cat in categories"
            :key="cat"
            class="category-tag"
            :class="{ active: activeCategory === cat }"
            @click="activeCategory = cat"
          >
            {{ cat }}
          </span>
        </div>
      </div>
      <button class="settings-btn" @click="handleSettingsClick">
        <svg v-if="!isLoggedIn" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
      </button>
    </div>

    <!-- 下方：小框网格 -->
    <div class="grid-container">
      <div
        v-for="item in filteredItems"
        :key="item.id"
        class="grid-item"
        @click="openUrl(item.url)"
      >
        <img
          v-if="item.avatar"
          :src="item.avatar"
          :alt="item.name"
          class="avatar"
        />
        <div v-else class="avatar-placeholder">{{ item.name.charAt(0) }}</div>
        <span class="item-name">{{ item.name }}</span>
        <span v-if="item.note" class="item-note">{{ item.note }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// 导航数据（硬编码，后续替换为 API）
const categories = ['全部', '工作', '学习', '娱乐', '工具']
const activeCategory = ref('全部')

const navItems = [
  { id: 1, name: 'GitHub', url: 'https://github.com', avatar: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg', note: '代码托管', category: '工具' },
  { id: 2, name: 'V2EX', url: 'https://v2ex.com', avatar: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/v2ex.svg', note: '社区', category: '娱乐' },
  { id: 3, name: 'MDN', url: 'https://developer.mozilla.org', avatar: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/mdn.svg', note: 'Web文档', category: '学习' },
  { id: 4, name: 'GitHub', url: 'https://github.com', avatar: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg', note: '代码托管', category: '工作' },
  { id: 5, name: 'V2EX', url: 'https://v2ex.com', avatar: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/v2ex.svg', note: '社区', category: '娱乐' },
  { id: 6, name: 'MDN', url: 'https://developer.mozilla.org', avatar: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/mdn.svg', note: 'Web文档', category: '学习' },
]

// 是否已登录
const isLoggedIn = ref(false)

// 检查登录状态
const checkAuth = () => {
  const cookies = document.cookie.split(';')
  const authCookie = cookies.find(c => c.trim().startsWith('metnav_auth='))
  isLoggedIn.value = authCookie !== undefined
}

onMounted(() => {
  checkAuth()
})

// 过滤
const filteredItems = computed(() => {
  if (activeCategory.value === '全部') return navItems
  return navItems.filter(item => item.category === activeCategory.value)
})

// 打开链接
const openUrl = (url) => {
  if (url) window.open(url, '_blank')
}

// 设置按钮点击
const handleSettingsClick = () => {
  if (isLoggedIn.value) {
    // 退出登录
    document.cookie = 'metnav_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    isLoggedIn.value = false
    alert('已退出登录')
  } else {
    // 跳转到登录页
    navigateTo('/login')
  }
}
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px 16px 40px;
  width: 100%;
}

/* ===== 顶部栏 ===== */
.top-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
}

.category-bar {
  flex: 1;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 100px; /* 两端完全半圆 */
  padding: 6px 6px 6px 18px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.category-scroll {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 4px 0;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,0.2) transparent;
  -webkit-overflow-scrolling: touch;
}

.category-scroll::-webkit-scrollbar {
  height: 4px;
}
.category-scroll::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.2);
  border-radius: 20px;
}

.category-tag {
  white-space: nowrap;
  padding: 8px 18px;
  border-radius: 40px;
  background: rgba(255, 255, 255, 0.06);
  color: #eef6ff;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
  flex-shrink: 0;
}

.category-tag:hover {
  background: rgba(255, 255, 255, 0.12);
}

.category-tag.active {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
  color: #fff;
}

/* 设置按钮（圆形） */
.settings-btn {
  width: 48px;
  min-width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  color: #eef6ff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.settings-btn:hover {
  background: rgba(255, 255, 255, 0.18);
}

/* ===== 网格 ===== */
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 16px;
}

.grid-item {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 16px; /* 仅圆角，非半圆 */
  padding: 18px 8px 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  color: #eef6ff;
  cursor: pointer;
  transition: all 0.2s;
  min-height: 110px;
}

.grid-item:hover {
  background: rgba(255, 255, 255, 0.12);
  transform: translateY(-2px);
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  object-fit: contain;
  background: rgba(255,255,255,0.05);
  padding: 4px;
  margin-bottom: 6px;
}

.avatar-placeholder {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(255,255,255,0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 600;
  color: rgba(255,255,255,0.5);
  margin-bottom: 6px;
}

.item-name {
  font-size: 0.85rem;
  font-weight: 500;
  line-height: 1.2;
}

.item-note {
  font-size: 0.65rem;
  opacity: 0.5;
  margin-top: 2px;
}

/* 响应式 */
@media (max-width: 480px) {
  .grid-container {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 10px;
  }
  .grid-item {
    padding: 14px 4px 10px;
    min-height: 90px;
  }
  .avatar,
  .avatar-placeholder {
    width: 32px;
    height: 32px;
  }
}
</style>