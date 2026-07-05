export default defineNuxtConfig({
  devtools: { enabled: true },
  nitro: {
    preset: 'cloudflare-pages'
  },
  runtimeConfig: {
    public: {
      appName: 'MetNav'
    }
  },
  css: ['~/assets/css/main.css']
})