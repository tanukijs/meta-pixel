export default defineNuxtConfig({
  modules: ['../src/module'],
  nuxtMetaPixel: {
    pixelId: '415215247513663',
    pixels: [
      { pixelId: '415215247513664', routes: ['/about/**'] }
    ]
  },
  devtools: { enabled: true }
})
