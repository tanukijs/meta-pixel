# meta-pixel

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![GitHub stars][stars-src]][stars-href]
[![TypeScript][ts-src]][ts-href]

<img src="https://raw.githubusercontent.com/tanukijs/meta-pixel/dev/events.png" style="max-width: 400px" />

> A tiny, fully-typed wrapper around Meta's `fbevents.js`. Framework-agnostic and **client-side only** — the typed core behind [`nuxt-meta-pixel`](https://npmjs.com/package/nuxt-meta-pixel) and [`meta-pixel-react`](https://npmjs.com/package/meta-pixel-react).

## Contents

- [Features](#features)
- [Quick start](#quick-start)
- [Why meta-pixel](#why-meta-pixel)
- [Documentation](#documentation)
- [Useful links](#useful-links)
- [License](#license)

## Features

- ✨ &nbsp;Written in TypeScript — even Meta's standard events are typed (`Purchase` requires `currency` + `value`, `contents` is `{ id, quantity }[]`, …).
- 🤖 &nbsp;Load as many pixels as you want; `trackSingle` / `trackSingleCustom` supported.
- 🧩 &nbsp;Chainable `setup()` API — `init`, `pageView`, `consent`.
- 🔐 &nbsp;GDPR consent built in (global `revoke` / `grant`).
- 🎯 &nbsp;Advanced matching at init, and CAPI deduplication via `eventID`.
- 🪶 &nbsp;Zero dependencies, no framework lock-in.

## Quick start

```bash
npm i meta-pixel
```

```ts
import { setup } from 'meta-pixel'

const { $fbq } = setup()
  .init('1234567890')
  .pageView()

// Standard events are fully typed:
$fbq('track', 'Purchase', { value: 9.99, currency: 'EUR' })
```

## Why meta-pixel

Meta ships `fbevents.js` as an untyped global `fbq()`. This package wraps it so you get:

- **Type safety** for the bits that are easy to get wrong — `Purchase` won't compile without `currency`/`value`, advanced-matching fields are strings (so leading zeros on phone numbers survive), and `contents` uses the documented `{ id, quantity }` shape.
- **A small, chainable API** instead of stringly-typed positional `fbq()` calls.
- **No runtime weight** — it's a thin wrapper, not a framework.

## Documentation

### Setting up pixels

`setup($fbq?)` returns a chainable controller. Pass your own `FacebookQuery` (e.g. from `addScriptDefault()`) or let it create one.

```ts
import { setup } from 'meta-pixel'

setup()
  .init('pixel_01')
  .init('pixel_02', false)   // disable autoConfig
  .pageView()
```

| Member | Description |
| --- | --- |
| `$fbq` | The underlying, fully-typed Facebook query function — use it for raw calls like `$fbq('track', 'Purchase', { value: 9.99, currency: 'EUR' })`. |
| `init(pixelId, autoConfig = true, advancedMatching?)` | Initialize a pixel. `autoConfig` maps to `fbq('set', 'autoConfig', …)`. `advancedMatching` (typed `InitData`) forwards customer data — email, phone, etc., **all strings** — for better attribution. |
| `pageView(pixelId?)` | Send a `PageView`. With an id it uses `trackSingle`; without one it tracks every pixel. |
| `consent('grant' \| 'revoke')` | Global GDPR consent — the command takes **no** pixel id, so it applies to all pixels. Call `'revoke'` **before** `init` to hold delivery until you grant it. |

`init`, `pageView` and `consent` are chainable (they return the controller).

### Advanced matching

```ts
setup()
  .init('pixel_01', true, { em: 'jane@doe.com', ph: '16505554444', db: '19910526' })
  .pageView()
```

Every field is a **string** — including digit-only `ph` and `db` (`YYYYMMDD`) — so leading zeros are preserved.

### GDPR consent

```ts
setup()
  .consent('revoke')   // hold delivery until the user opts in
  .init('pixel_01')
  .pageView()

// later, once the cookie banner is accepted:
$fbq('consent', 'grant')
```

### CAPI deduplication

`eventID` is the 4th positional argument, so the same event sent from the browser and the Conversions API is de-duplicated:

```ts
$fbq('track', 'Purchase', { value: 9.99, currency: 'EUR' }, { eventID: 'order_123' })
```

### Manual setup

```ts
import { addScriptDefault, setup } from 'meta-pixel'

const fbq = addScriptDefault()
setup(fbq).init('pixel_01').pageView()
```

To control the script URL yourself, use `addScript(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')`.

## Useful links

- [Pixel events & parameters](https://developers.facebook.com/docs/meta-pixel/reference)
- [Advanced matching](https://developers.facebook.com/docs/meta-pixel/advanced/advanced-matching)
- [autoConfig / automatic configuration](https://developers.facebook.com/docs/meta-pixel/advanced/#automatic-configuration)
- [GDPR consent](https://developers.facebook.com/docs/meta-pixel/implementation/gdpr/)
- [`nuxt-meta-pixel`](https://npmjs.com/package/nuxt-meta-pixel) — the Nuxt module
- [`meta-pixel-react`](https://npmjs.com/package/meta-pixel-react) — the React bindings

## License

[MIT](https://github.com/tanukijs/meta-pixel/blob/dev/LICENSE) © [tanukijs](https://github.com/tanukijs)

If this saved you some time, consider [starring the repo](https://github.com/tanukijs/meta-pixel) ⭐ — it helps others find it.

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/meta-pixel/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/meta-pixel

[npm-downloads-src]: https://img.shields.io/npm/dm/meta-pixel.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/meta-pixel

[license-src]: https://img.shields.io/npm/l/meta-pixel.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/meta-pixel

[stars-src]: https://img.shields.io/github/stars/tanukijs/meta-pixel?style=flat&colorA=020420&colorB=00DC82
[stars-href]: https://github.com/tanukijs/meta-pixel

[ts-src]: https://img.shields.io/badge/TypeScript-020420?style=flat&logo=typescript&logoColor=00DC82
[ts-href]: https://www.typescriptlang.org
