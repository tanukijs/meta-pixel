<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: My Module
- Package name: my-module
- Description: My new Nuxt module
-->

# nuxt-meta-pixel

[![Nuxt][nuxt-src]][nuxt-href]
[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

<img src="https://raw.githubusercontent.com/tanukijs/meta-pixel/dev/events.png" style="max-width: 400px" />

## Features

<!-- Highlight some of the features your module provide here -->
- ⛰ &nbsp;Load one or more meta pixels.
- 🚠 &nbsp; configurable `noscript` & `autoconfig`.
- 🚠 &nbsp;`PageView` event sent automatically.
- 🌲 &nbsp;Allows you to use `track`, `trackSingle`, `trackCustom`, `trackSingleCustom` and every features of a pixel in your application.

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add nuxt-meta-pixel
```

That's it! You can now use My Module in your Nuxt app ✨

## Getting started

```ts
// nuxt.config.ts
// This example show how to load multiple pixels

export default defineNuxtConfig({
  modules: [
    'nuxt-meta-pixel'
  ],
  metaPixel: {
    pixels: [
      { id: '101010100100101', noscript: true },
      { id: '223323232323323' },
      { id: '445554445454554', autoconfig: false },
    ]
  }
})
```

```html
// app.vue
// This example show how to use fbq in your pages

<script setup lang="ts">
const { $fbq } = useNuxtApp()
$fbq('track', 'CompleteRegistration')
$fbq('trackSingle', YOUR_PIXEL_ID, 'CompleteRegistration')
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