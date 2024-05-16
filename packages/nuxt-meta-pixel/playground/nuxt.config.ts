export default defineNuxtConfig({
  modules: ['../src/module'],
  metaPixel: {
    pixels: [
      { id: '1176370652884847', noscript: true, pageView: '/posts/**' },
      // { id: '415215247513663' },
      // { id: '415215247513664', pageView: '/about/**' },
    ]
  },
  devtools: { enabled: true }
})
