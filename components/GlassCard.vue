<template>
  <a :href="url" target="_blank" class="glass-card">
    <span class="name">{{ name }}</span>
  </a>
</template>

<script setup>
defineProps({
  name: String,
  url: String
})
</script>

<style scoped>
.glass-card {
  display: inline-block;
  padding: 18px 40px;
  border-radius: 60px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #f0f6ff;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 500;
  transition: all 0.25s ease;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.glass-card:hover {
  background: rgba(255, 255, 255, 0.18);
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);
}
</style>