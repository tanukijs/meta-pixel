export default defineNuxtConfig({
  modules: ['../src/module'],
  nuxtMetaPixel: {
    pixels: [
      { id: '415215247513663', autoPageView: ['*'], noscript: true },
      { id: '415215247513663', autoPageView: ['/about/**'] },
    ]
  },
  devtools: { enabled: true }
})
