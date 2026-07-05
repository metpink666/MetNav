<template>
  <div class="container">
    <h1>🌊 液态玻璃导航</h1>
    <div class="links">
      <GlassCard
        v-for="item in navItems"
        :key="item.name"
        :name="item.name"
        :url="item.url"
      />
    </div>
  </div>
</template>

<script setup>
const navItems = [
  { name: 'GitHub', url: 'https://github.com' },
  { name: 'Cloudflare', url: 'https://cloudflare.com' },
  { name: 'Docker', url: 'https://docker.com' },
  { name: 'Nuxt', url: 'https://nuxt.com' },
  { name: 'D1', url: 'https://developers.cloudflare.com/d1' }
]
</script>

<style scoped>
.container {
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
}

h1 {
  color: #fff;
  font-size: 3rem;
  font-weight: 300;
  letter-spacing: 2px;
  margin-bottom: 40px;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.links {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}
</style>