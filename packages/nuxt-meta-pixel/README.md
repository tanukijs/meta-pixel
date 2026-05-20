# nuxt-meta-pixel

[![Nuxt][nuxt-src]][nuxt-href]
[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

<img src="https://raw.githubusercontent.com/tanukijs/meta-pixel/dev/events.png" style="max-width: 400px" />

A Meta (Facebook) Pixel integration for Nuxt 3. Declare your pixels in config and the module loads them, sends `PageView` automatically on route changes, and exposes a fully typed `$fbq` everywhere — with first-class support for multiple pixels and GDPR consent.

## Features

- ✨ &nbsp;Written in TypeScript, even the Facebook's events are typed.
- 🤖 &nbsp;You can load as much meta pixels as you want.
- 📨 &nbsp;`PageView` event are sent automatically based on configurable route match.
- ⚙️ &nbsp;Configurable via a `.env` file.
- 🚀 &nbsp;All the possibilities offered by Facebook are available: `track`, `trackSingle`, `trackCustom` & `trackSingleCustom`.
- 🔒 &nbsp;SSR-safe — the pixel only loads in the browser (client-only plugin); call `$fbq` from `onMounted` or client-side handlers.
- ❤️ &nbsp;Contributions are welcome.

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add nuxt-meta-pixel
```

That's it! You can now use `nuxt-meta-pixel` in your Nuxt app ✨

## Getting started
### Module configuration
The module can also be configured under the key `metapixel`.
```ts
// nuxt.config.ts
// This example show how to load multiple pixels

export default defineNuxtConfig({
  modules: ['nuxt-meta-pixel'],
  runtimeConfig: {
    public: {
      metapixel: {
        pixels: {
          default: { id: '1176370652884847', pageView: '/posts/**' },
          ads01: { id: '415215247513663' },
          ads02: { id: '415215247513664', pageView: '!/posts/**' },
        }
      }
    }
  }
})
```

> **Breaking change in v3:** pixels are now nested under `metapixel.pixels`, and `consent` moved to a top-level (global) option. Previously pixels lived directly under `metapixel`.

#### Module options
- **enabled** `boolean` (default: `true`) - when `false`, the module loads and sends nothing, but still provides a no-op `$fbq` so your components keep working (see [Disable outside production](#disable-outside-production)).
- **consent** `'revoke'` - opt into GDPR consent gating, applied to **all** pixels (see [GDPR consent](#gdpr-consent)). When omitted, pixels behave normally. [see more](https://developers.facebook.com/docs/meta-pixel/implementation/gdpr/)
- **pixels** `Record<string, Pixel>` - the pixels to load, keyed by an arbitrary name.

### Disable outside production
Set `enabled` to `false` to avoid loading the pixel (e.g. in development or staging) without conditionally registering the module — your components can still call `$fbq` safely, it just does nothing:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt-meta-pixel'],
  runtimeConfig: {
    public: {
      metapixel: {
        enabled: process.env.NODE_ENV === 'production',
        pixels: {
          default: { id: '1176370652884847' },
        }
      }
    }
  }
})
```

You can also flip it at runtime with the `NUXT_PUBLIC_METAPIXEL_ENABLED` environment variable.

#### Pixel options
- **id** `string` - your pixel id (use a string — a numeric literal can lose precision on 15-16 digit ids)
- **autoConfig** `boolean` (default: `true`) - enable or disable pixel auto configuration. [see more](https://developers.facebook.com/docs/meta-pixel/advanced/?locale=fr_FR)
- **pageView** `string` (default: `**`) - glob deciding which routes auto-send a `PageView`. Supported syntax: `**` (anything, including `/`), `*` (a single path segment), `?` (one character), and a leading `!` to negate the pattern.

### GDPR consent
Meta's `consent` is a **global** setting — the command takes no pixel id, so it applies to **every** pixel at once. It's therefore a single top-level option, not per-pixel:

- `consent: 'revoke'` holds **all** pixels until you grant consent.
- The config only accepts `'revoke'` (opting into gating). Granting is done **at runtime** — tracking is allowed by default, so a config `'grant'` would be a no-op.

Set `consent: 'revoke'` so the module revokes **before** initialization — nothing is sent to Meta until you grant consent:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt-meta-pixel'],
  runtimeConfig: {
    public: {
      metapixel: {
        consent: 'revoke',
        pixels: {
          default: { id: '1176370652884847' },
        }
      }
    }
  }
})
```

Then grant (or re-revoke) consent at runtime once your cookie banner is answered, via the injected `$fbq`:

```html
<script setup lang="ts">
const { $fbq } = useNuxtApp()

function onCookieBannerAccepted() {
  $fbq('consent', 'grant')
}

function onCookieBannerRejected() {
  $fbq('consent', 'revoke')
}
</script>
```

> Note: on a classic multi-page (non-SPA) site Meta requires calling `revoke` on every page load — the module handles this by revoking on plugin init. [see more](https://developers.facebook.com/docs/meta-pixel/implementation/gdpr/)

### Environment variables
```env
// .env
// This example show how to define pixel ids via your environment variables
NUXT_PUBLIC_METAPIXEL_PIXELS_DEFAULT_ID=ID1
NUXT_PUBLIC_METAPIXEL_PIXELS_ADS01_ID=ID2
NUXT_PUBLIC_METAPIXEL_PIXELS_ADS02_ID=ID3
```

The variable you are trying to update via an environment variable must be defined in your `nuxt.config.ts`. Replace `DEFAULT`, `ADS01` or `ADS02` by the names you defined.

### Advanced usage
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

## Useful resources
- [Conversion Tracking](https://developers.facebook.com/docs/meta-pixel/implementation/conversion-tracking/?locale=fr_FR)
- [Events](https://developers.facebook.com/docs/meta-pixel/reference/)
- [Accurate Event Tracking with Multiple Pixels](https://developers.facebook.com/ads/blog/post/v2/2017/11/28/event-tracking-with-multiple-pixels-tracksingle/)
- [GDPR consent](https://developers.facebook.com/docs/meta-pixel/implementation/gdpr/)


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
