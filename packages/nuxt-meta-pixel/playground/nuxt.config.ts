export default defineNuxtConfig({
  modules: ['../src/module'],
  metapixel: {
    consent: 'revoke',
    pixels: {
      default: { id: '1176370652884847', pageView: '/posts/**' },
      test01: { id: '415215247513663' },
      test02: { id: '415215247513664', pageView: '!/posts/**' },
    },
  },
  devtools: { enabled: true },
  compatibilityDate: '2025-07-15'
})
