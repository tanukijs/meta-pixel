# nuxt-meta-pixel

[![Nuxt][nuxt-src]][nuxt-href]
[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

<img src="https://raw.githubusercontent.com/tanukijs/meta-pixel/dev/events.png" style="max-width: 400px" />

I needed a Facebook pixel integration for a large project, but what I found didn't meet my expectations. That's why I took the time to understand how a pixel works and developed **a unique integration that's as simple as it should be**, and **much more effective than any other integration**.

## Features

- ✨ &nbsp;Written in TypeScript, even the Facebook's events are typed.
- 🤖 &nbsp;You can load as much meta pixels as you want.
- ⚙️ &nbsp;`PageView` event are sent automatically based on configurable route match.
- 🚀 &nbsp;All the possibilities offered by Facebook are available: `track`, `trackSingle`, `trackCustom` & `trackSingleCustom`.
- ❤️ &nbsp;Contributions are  welcome.

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add nuxt-meta-pixel
```

That's it! You can now use `nuxt-meta-pixel` in your Nuxt app ✨

## Getting started

### Pixel parameters
- **id** `string` - your pixel id
- **autoconfig** `boolean` (default: `true`) - enable or disable pixel autoconfig. [see more](https://developers.facebook.com/docs/meta-pixel/advanced/?locale=fr_FR)
- **pageView** `string` (default: `**`) - glob expression to decide which route or not should send a PageView event automatically. [see more](https://www.npmjs.com/package/minimatch)

### Module configuration
The module can also be configured under the key `metaPixel`.
```ts
// nuxt.config.ts
// This example show how to load multiple pixels

export default defineNuxtConfig({
  modules: [
    ['nuxt-meta-pixel', {
      pixels: [
        { id: '101010100100101' },
        { id: '445554445454554', autoconfig: false },
        { id: '223323232323323', pageView: '/posts/**' },
      ]
    }]
  ],
})
```

```html
// app.vue
// This example show how to use fbq in your pages

<script setup lang="ts">
const { $fbq } = useNuxtApp()

onMounted(() => {
  $fbq('track', 'CompleteRegistration')
  $fbq('trackSingle', YOUR_PIXEL_ID, 'CompleteRegistration')
})
</script>

<template>
  <div>nuxt-meta-pixel</div>
</template>
```


## More informations
During the development i have seen some behaviors that i need to clarify.
- Facebook automatically track `PageView` after initializing a pixel. This behavior can't be altered.
- On an SPA, a pixel initialized on a specific page will be active on your entire application. A pixel can't be unloaded.

## Useful resources
- [Conversion Tracking](https://developers.facebook.com/docs/meta-pixel/implementation/conversion-tracking/?locale=fr_FR)
- [Events](https://developers.facebook.com/docs/meta-pixel/reference/)
- [Accurate Event Tracking with Multiple Pixels](https://developers.facebook.com/ads/blog/post/v2/2017/11/28/event-tracking-with-multiple-pixels-tracksingle/)


## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  npm install
  
  # Generate type stubs
  npm run dev:prepare
  
  # Develop with the playground
  npm run dev
  
  # Build the playground
  npm run dev:build
  
  # Run ESLint
  npm run lint
  
  # Run Vitest
  npm run test
  npm run test:watch
  
  # Release new version
  npm run release
  ```

</details>

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-meta-pixel/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-meta-pixel

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-meta-pixel.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/nuxt-meta-pixel

[license-src]: https://img.shields.io/npm/l/nuxt-meta-pixel.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-meta-pixel

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
