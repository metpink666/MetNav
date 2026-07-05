<template>
  <div>
    <h3>🔗 网址管理</h3>
    <div class="list">
      <div v-for="item in bookmarks" :key="item.id" class="row">
        <div class="info">
          <img v-if="item.avatar" :src="item.avatar" class="avatar" />
          <span class="name">{{ item.name }}</span>
          <span class="url">{{ item.url }}</span>
          <span class="note">{{ item.note || '' }}</span>
          <span class="cat">{{ item.category_name || '未分类' }}</span>
        </div>
        <div class="actions">
          <button @click="editBookmark(item)" class="btn-edit">✎</button>
          <button @click="deleteBookmark(item.id)" class="btn-delete">✕</button>
        </div>
      </div>
    </div>

    <!-- 新增表单 -->
    <div class="add-form">
      <input v-model="newBookmark.name" placeholder="名称" class="input" />
      <input v-model="newBookmark.url" placeholder="网址" class="input" />
      <div class="flex-row">
        <input v-model="newBookmark.avatar" placeholder="头像 URL" class="input" />
        <button @click="autoFetchAvatar" class="btn-small">🖼️ 自动获取</button>
      </div>
      <input v-model="newBookmark.note" placeholder="备注" class="input" />
      <select v-model="newBookmark.category_id" class="input">
        <option :value="null">无分类</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
      </select>
      <button @click="addBookmark" class="btn-add">➕ 添加</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const bookmarks = ref([])
const categories = ref([])
const newBookmark = ref({ name: '', url: '', avatar: '', note: '', category_id: null })

const fetchData = async () => {
  const [bmRes, catRes] = await Promise.all([
    $fetch('/api/bookmarks'),
    $fetch('/api/categories')
  ])
  bookmarks.value = bmRes.data || []
  categories.value = catRes.data || []
}

const addBookmark = async () => {
  if (!newBookmark.value.name.trim() || !newBookmark.value.url.trim()) {
    alert('名称和网址不能为空')
    return
  }
  await $fetch('/api/bookmarks', {
    method: 'POST',
    body: { ...newBookmark.value, category_id: newBookmark.value.category_id || null }
  })
  newBookmark.value = { name: '', url: '', avatar: '', note: '', category_id: null }
  await fetchData()
}

const editBookmark = async (item) => {
  const name = prompt('名称:', item.name)
  if (!name?.trim()) return
  const url = prompt('网址:', item.url)
  if (!url?.trim()) return
  const note = prompt('备注:', item.note || '') || ''
  await $fetch(`/api/bookmarks/${item.id}`, {
    method: 'PUT',
    body: { name: name.trim(), url: url.trim(), note, avatar: item.avatar, category_id: item.category_id }
  })
  await fetchData()
}

const deleteBookmark = async (id) => {
  if (!confirm('确认删除此网址？')) return
  await $fetch(`/api/bookmarks/${id}`, { method: 'DELETE' })
  await fetchData()
}

const autoFetchAvatar = () => {
  const url = newBookmark.value.url.trim()
  if (!url) { alert('请先输入网址') }
  newBookmark.value.avatar = `https://www.google.com/s2/favicons?domain=${url.replace(/^https?:\/\//, '')}`
}

onMounted(fetchData)
</script>

<style scoped>
h3 { color: #f0f6ff; font-weight: 400; margin-bottom: 16px; }
.list { margin-bottom: 16px; }
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  color: #f0f6ff;
  flex-wrap: wrap;
  gap: 8px;
}
.info { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.avatar { width: 28px; height: 28px; border-radius: 6px; object-fit: contain; background: rgba(255,255,255,0.05); padding: 2px; }
.name { font-weight: 500; }
.url { opacity: 0.5; font-size: 0.8rem; }
.note { opacity: 0.4; font-size: 0.7rem; }
.cat { background: rgba(255,255,255,0.06); padding: 2px 10px; border-radius: 20px; font-size: 0.7rem; }
.actions { display: flex; gap: 6px; }
.btn-edit, .btn-delete {
  background: rgba(255,255,255,0.06);
  border: none;
  color: #f0f6ff;
  padding: 2px 10px;
  border-radius: 20px;
  cursor: pointer;
}
.btn-delete:hover { background: rgba(255,70,70,0.2); color: #ff6b6b; }
.add-form { display: flex; flex-direction: column; gap: 8px; margin-top: 12px; }
.flex-row { display: flex; gap: 8px; flex-wrap: wrap; }
.input {
  padding: 10px 16px;
  border-radius: 40px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.04);
  color: #f0f6ff;
  outline: none;
  flex: 1;
  min-width: 120px;
}
.input::placeholder { color: rgba(255,255,255,0.3); }
select.input option { background: #1c3a5e; }
.btn-add {
  padding: 10px 20px;
  border-radius: 40px;
  border: none;
  background: rgba(255,255,255,0.08);
  color: #f0f6ff;
  cursor: pointer;
  align-self: flex-start;
}
.btn-add:hover { background: rgba(255,255,255,0.16); }
.btn-small {
  padding: 8px 16px;
  border-radius: 40px;
  border: none;
  background: rgba(255,255,255,0.06);
  color: #f0f6ff;
  cursor: pointer;
  font-size: 0.8rem;
  white-space: nowrap;
}
</style>