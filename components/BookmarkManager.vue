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
        </div>
        <div class="actions">
          <button @click="editBookmark(item)" class="btn-edit">✎</button>
          <button @click="deleteBookmark(item.id)" class="btn-delete">✕</button>
        </div>
      </div>
    </div>
    <div class="add-form">
      <input v-model="newItem.name" placeholder="名称" class="input" />
      <input v-model="newItem.url" placeholder="网址" class="input" />
      <div class="flex-row">
        <input v-model="newItem.avatar" placeholder="头像 URL" class="input" />
        <button @click="autoFetchAvatar" class="btn-small">🖼️ 获取头像</button>
      </div>
      <input v-model="newItem.note" placeholder="备注" class="input" />
      <button @click="addBookmark" class="btn-add">➕ 添加</button>
    </div>
  </div>
</template>

<script setup>
const bookmarks = ref([])
const newItem = ref({ name: '', url: '', avatar: '', note: '' })

const fetchBookmarks = async () => {
  const { data } = await $fetch('/api/bookmarks')
  bookmarks.value = data || []
}

const addBookmark = async () => {
  if (!newItem.value.name.trim() || !newItem.value.url.trim()) {
    alert('名称和网址不能为空')
    return
  }
  await $fetch('/api/bookmarks', { method: 'POST', body: newItem.value })
  newItem.value = { name: '', url: '', avatar: '', note: '' }
  await fetchBookmarks()
}

const editBookmark = async (item) => {
  const name = prompt('名称:', item.name)
  if (!name?.trim()) return
  const url = prompt('网址:', item.url)
  if (!url?.trim()) return
  await $fetch(`/api/bookmarks/${item.id}`, {
    method: 'PUT',
    body: { ...item, name: name.trim(), url: url.trim() }
  })
  await fetchBookmarks()
}

const deleteBookmark = async (id) => {
  if (!confirm('确认删除？')) return
  await $fetch(`/api/bookmarks/${id}`, { method: 'DELETE' })
  await fetchBookmarks()
}

const autoFetchAvatar = () => {
  const url = newItem.value.url.trim()
  if (!url) return alert('请先输入网址')
  newItem.value.avatar = `https://www.google.com/s2/favicons?domain=${url.replace(/^https?:\/\//, '')}`
}

fetchBookmarks()
</script>

<style scoped>
h3 { color: #f0f6ff; font-weight: 400; margin-bottom: 16px; }
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  color: #f0f6ff;
  flex-wrap: wrap;
}
.info { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.avatar { width: 28px; height: 28px; border-radius: 6px; object-fit: contain; background: rgba(255,255,255,0.05); }
.name { font-weight: 500; }
.url { opacity: 0.5; font-size: 0.8rem; }
.note { opacity: 0.4; font-size: 0.7rem; }
.actions { display: flex; gap: 6px; }
.btn-edit, .btn-delete {
  background: rgba(255,255,255,0.06);
  border: none;
  color: #f0f6ff;
  padding: 2px 10px;
  border-radius: 20px;
  cursor: pointer;
}
.add-form { display: flex; flex-direction: column; gap: 8px; margin-top: 12px; }
.flex-row { display: flex; gap: 8px; }
.input {
  padding: 10px 16px;
  border-radius: 40px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.04);
  color: #f0f6ff;
  outline: none;
}
.btn-add {
  padding: 10px 20px;
  border-radius: 40px;
  border: none;
  background: rgba(255,255,255,0.08);
  color: #f0f6ff;
  cursor: pointer;
  align-self: flex-start;
}
.btn-small {
  padding: 8px 16px;
  border-radius: 40px;
  border: none;
  background: rgba(255,255,255,0.06);
  color: #f0f6ff;
  cursor: pointer;
}
</style>