# nuxt-meta-pixel

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![GitHub stars][stars-src]][stars-href]
[![Nuxt][nuxt-src]][nuxt-href]

<img src="https://raw.githubusercontent.com/tanukijs/meta-pixel/dev/events.png" style="max-width: 400px" />

> A Meta (Facebook) Pixel module for **Nuxt 3 & 4**. Declare your pixels in config; the module loads them, sends `PageView` automatically on route changes, and exposes a fully-typed `$fbq` everywhere — with first-class support for multiple pixels and GDPR consent.

## Contents

- [Features](#features)
- [Quick start](#quick-start)
- [Why nuxt-meta-pixel](#why-nuxt-meta-pixel)
- [Documentation](#documentation)
  - [Module configuration](#module-configuration)
  - [Module options](#module-options)
  - [Pixel options](#pixel-options)
  - [Disable outside production](#disable-outside-production)
  - [GDPR consent](#gdpr-consent)
  - [Environment variables](#environment-variables)
  - [Tracking events](#tracking-events)
- [Useful links](#useful-links)
- [Contributing](#contributing)
- [License](#license)

## Features

- ✨ &nbsp;Written in TypeScript — even Meta's events are typed.
- 🤖 &nbsp;Load as many pixels as you want.
- 📨 &nbsp;`PageView` sent automatically based on a configurable route glob.
- ⚙️ &nbsp;Configurable via `nuxt.config.ts` or `.env`.
- 🚀 &nbsp;Full Meta API surface: `track`, `trackSingle`, `trackCustom`, `trackSingleCustom`.
- 🔒 &nbsp;SSR-safe — the pixel loads only in the browser (client-only plugin).
- 🛑 &nbsp;Global `enabled` toggle and GDPR consent gating built in.

## Quick start

Install the module with one command:

```bash
npx nuxi module add nuxt-meta-pixel
```

Then declare a pixel:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt-meta-pixel'],
  runtimeConfig: {
    public: {
      metapixel: {
        pixels: {
          default: { id: '1176370652884847' },
        },
      },
    },
  },
})
```

That's it — `PageView` is now sent on every route change ✨

## Why nuxt-meta-pixel

Wiring the Meta Pixel into Nuxt by hand means a client-only plugin, manual route tracking, and an untyped global. This module gives you:

- **Config-driven pixels** — declare them in `nuxt.config.ts` (or via env vars), including multiple pixels with per-pixel route matching.
- **Automatic, glob-matched `PageView`** on navigation, SSR-safe by construction.
- **A typed `$fbq`** injected everywhere, backed by [`meta-pixel`](https://npmjs.com/package/meta-pixel).
- **GDPR-correct consent** — handled as a single global setting, the way Meta actually implements it.

## Documentation

### Module configuration

Configure the module under the `metapixel` key. This example loads multiple pixels:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt-meta-pixel'],
  runtimeConfig: {
    public: {
      metapixel: {
        pixels: {
          default: { id: '1176370652884847', pageView: '/posts/**' },
          ads01: { id: '415215247513663' },
          ads02: { id: '415215247513664', pageView: '!/posts/**' },
        },
      },
    },
  },
})
```

> **Breaking change in v3:** pixels are now nested under `metapixel.pixels`, and `consent` moved to a top-level (global) option. Previously pixels lived directly under `metapixel`.

### Module options

- **enabled** `boolean` (default `true`) — when `false`, the module loads and sends nothing, but still provides a no-op `$fbq` so your components keep working (see [Disable outside production](#disable-outside-production)).
- **consent** `'revoke'` — opt into GDPR consent gating, applied to **all** pixels (see [GDPR consent](#gdpr-consent)). When omitted, pixels behave normally.
- **pixels** `Record<string, Pixel>` — the pixels to load, keyed by an arbitrary name.

### Pixel options

- **id** `string` — your pixel id (use a string — a numeric literal can lose precision on 15-16 digit ids).
- **autoConfig** `boolean` (default `true`) — enable or disable pixel [automatic configuration](https://developers.facebook.com/docs/meta-pixel/advanced/#automatic-configuration).
- **pageView** `string` (default `**`) — glob deciding which routes auto-send a `PageView`. Supports `**` (anything, including `/`), `*` (a single path segment), `?` (one character), and a leading `!` to negate.

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
        },
      },
    },
  },
})
```

You can also flip it at runtime with the `NUXT_PUBLIC_METAPIXEL_ENABLED` environment variable.

### GDPR consent

Meta's `consent` is a **global** setting — the command takes no pixel id, so it applies to **every** pixel at once. It's therefore a single top-level option, not per-pixel:

- `consent: 'revoke'` holds **all** pixels until you grant consent.
- The config only accepts `'revoke'`. Granting is done **at runtime** — tracking is allowed by default, so a config `'grant'` would be a no-op.

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
        },
      },
    },
  },
})
```

Then grant (or re-revoke) consent at runtime once your cookie banner is answered:

```vue
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

> On a classic multi-page (non-SPA) site, Meta requires calling `revoke` on every page load — the module handles this by revoking on plugin init.

### Environment variables

```env
# .env
NUXT_PUBLIC_METAPIXEL_PIXELS_DEFAULT_ID=ID1
NUXT_PUBLIC_METAPIXEL_PIXELS_ADS01_ID=ID2
NUXT_PUBLIC_METAPIXEL_PIXELS_ADS02_ID=ID3
```

The variable you override must already be defined in your `nuxt.config.ts`. Replace `DEFAULT`, `ADS01`, `ADS02` with the names you defined.

### Tracking events

```vue
<!-- app.vue -->
<script setup lang="ts">
const { $fbq } = useNuxtApp()

onMounted(() => {
  $fbq('track', 'CompleteRegistration')
  $fbq('trackSingle', '1176370652884847', 'CompleteRegistration')
})
</script>
```

## Useful links

- [Conversion tracking](https://developers.facebook.com/docs/meta-pixel/implementation/conversion-tracking/)
- [Pixel events & parameters](https://developers.facebook.com/docs/meta-pixel/reference/)
- [Event tracking with multiple pixels (`trackSingle`)](https://developers.facebook.com/ads/blog/post/v2/2017/11/28/event-tracking-with-multiple-pixels-tracksingle/)
- [GDPR consent](https://developers.facebook.com/docs/meta-pixel/implementation/gdpr/)
- [`meta-pixel`](https://npmjs.com/package/meta-pixel) — the framework-agnostic core
- [`meta-pixel-react`](https://npmjs.com/package/meta-pixel-react) — the React bindings

## Contributing

<details>
  <summary>Local development</summary>

  ```bash
  npm install            # install dependencies
  npm run dev:prepare    # generate type stubs
  npm run dev            # develop with the playground
  npm run dev:build      # build the playground
  npm run lint           # run ESLint
  npm run test           # run Vitest
  ```

</details>

Contributions are welcome ❤️

## License

[MIT](https://github.com/tanukijs/meta-pixel/blob/dev/LICENSE) © [tanukijs](https://github.com/tanukijs)

If this saved you some time, consider [starring the repo](https://github.com/tanukijs/meta-pixel) ⭐ — it helps others find it.

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-meta-pixel/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-meta-pixel

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-meta-pixel.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/nuxt-meta-pixel

[license-src]: https://img.shields.io/npm/l/nuxt-meta-pixel.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-meta-pixel

[stars-src]: https://img.shields.io/github/stars/tanukijs/meta-pixel?style=flat&colorA=020420&colorB=00DC82
[stars-href]: https://github.com/tanukijs/meta-pixel

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
