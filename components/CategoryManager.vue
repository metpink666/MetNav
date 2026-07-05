<template>
  <div>
    <h3>📂 分类管理</h3>
    <div class="list">
      <div v-for="cat in categories" :key="cat.id" class="row">
        <span>{{ cat.name }}</span>
        <div class="actions">
          <button @click="editCategory(cat)" class="btn-edit">✎</button>
          <button @click="deleteCategory(cat.id)" class="btn-delete">✕</button>
        </div>
      </div>
    </div>
    <div class="add-form">
      <input v-model="newName" placeholder="新分类名称" class="input" />
      <button @click="addCategory" class="btn-add">➕ 添加</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const categories = ref([])
const newName = ref('')

const fetchCategories = async () => {
  const { data } = await $fetch('/api/categories')
  categories.value = data || []
}

const addCategory = async () => {
  if (!newName.value.trim()) return
  await $fetch('/api/categories', { method: 'POST', body: { name: newName.value.trim() } })
  newName.value = ''
  await fetchCategories()
}

const editCategory = async (cat) => {
  const newName = prompt('修改分类名称:', cat.name)
  if (newName && newName.trim()) {
    await $fetch(`/api/categories/${cat.id}`, { method: 'PUT', body: { name: newName.trim() } })
    await fetchCategories()
  }
}

const deleteCategory = async (id) => {
  if (!confirm('确认删除此分类？')) return
  await $fetch(`/api/categories/${id}`, { method: 'DELETE' })
  await fetchCategories()
}

onMounted(fetchCategories)
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
}
.actions { display: flex; gap: 8px; }
.btn-edit, .btn-delete {
  background: rgba(255,255,255,0.06);
  border: none;
  color: #f0f6ff;
  padding: 4px 12px;
  border-radius: 20px;
  cursor: pointer;
}
.btn-edit:hover { background: rgba(255,255,255,0.12); }
.btn-delete:hover { background: rgba(255,70,70,0.2); color: #ff6b6b; }
.add-form { display: flex; gap: 8px; flex-wrap: wrap; }
.input {
  flex: 1;
  padding: 10px 16px;
  border-radius: 40px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.04);
  color: #f0f6ff;
  outline: none;
  min-width: 150px;
}
.input::placeholder { color: rgba(255,255,255,0.3); }
.btn-add {
  padding: 10px 20px;
  border-radius: 40px;
  border: none;
  background: rgba(255,255,255,0.08);
  color: #f0f6ff;
  cursor: pointer;
}
.btn-add:hover { background: rgba(255,255,255,0.16); }
</style>