<template>
  <div class="app-container">
    <slot />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  min-height: 100vh;
  background: linear-gradient(145deg, #0b1a2e 0%, #1c3a5e 100%);
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  color: #f0f6ff;
}

.app-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px 12px 40px;
}
</style>