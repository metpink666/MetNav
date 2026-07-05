export default defineNuxtConfig({
  devtools: { enabled: true },
  nitro: {
    preset: 'cloudflare-pages'
  },
  css: ['~/assets/css/main.css']
})