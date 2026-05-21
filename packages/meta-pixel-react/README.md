# meta-pixel-react

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![GitHub stars][stars-src]][stars-href]
[![React][react-src]][react-href]

<img src="https://raw.githubusercontent.com/tanukijs/meta-pixel/dev/events.png" style="max-width: 400px" />

> React bindings for [`meta-pixel`](https://npmjs.com/package/meta-pixel): an **SSR-safe** provider and a typed hook for Meta's Pixel. Works with Next.js (App & Pages Router), Vite, Remix, and any React 18+ app. Client-side only.

## Why meta-pixel-react

Most React pixel wrappers expose a singleton you must `init` yourself in an effect, throw `window is undefined` during SSR, and accept untyped `track(event, data)` calls. This package instead gives you:

- **A real Provider + hook** instead of a manually-initialized global singleton.
- **SSR/RSC safety by construction** — the script is injected in a client effect, so server rendering never touches `window`/`document`.
- **Typed events** from the `meta-pixel` core, so you can't ship a malformed `Purchase`.
- **Automatic, glob-matched page views** wired to whatever router you use.

## Contents

- [Features](#features)
- [Quick start](#quick-start)
- [Documentation](#documentation)
  - [Next.js (App Router)](#nextjs-app-router)
  - [Tracking events](#tracking-events)
  - [GDPR consent](#gdpr-consent)
  - [Manual page views](#manual-page-views)
  - [API](#api)
- [Useful links](#useful-links)
- [License](#license)

## Features

- ✨ &nbsp;Typed events inherited from `meta-pixel` — `Purchase` requires `currency` + `value`, advanced-matching fields are strings, etc.
- 🧩 &nbsp;Idiomatic `<MetaPixelProvider>` + `useMetaPixel()` hook — no manual `init` in an effect.
- 🔒 &nbsp;**SSR/RSC-safe** — `fbevents.js` loads only in a client effect, never during render.
- 📨 &nbsp;Automatic route `PageView`, glob-matched per pixel (router-agnostic).
- 🤖 &nbsp;Multiple pixels, GDPR consent, and a global `enabled` toggle.

## Quick start

```bash
npm i meta-pixel-react
# react >= 18 is a peer dependency
```

```tsx
import { MetaPixelProvider, useMetaPixel } from 'meta-pixel-react'

const pixelOptions = {
  pixels: { main: { id: '1234567890' } },
} as const

function App({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() // next/navigation, react-router, etc.
  return (
    <MetaPixelProvider options={pixelOptions} pathname={pathname}>
      {children}
    </MetaPixelProvider>
  )
}

function BuyButton() {
  const { $fbq } = useMetaPixel()
  return <button onClick={() => $fbq('track', 'Purchase', { value: 9.99, currency: 'EUR' })}>Buy</button>
}
```

> Define `options` outside the component (or `useMemo` it) — it is read once on mount.

## Documentation

### Next.js (App Router)

`<MetaPixelProvider>` is a Client Component, so wrap it in your own client providers file and mount it in the root layout. `usePathname()` drives the automatic `PageView`:

```tsx
// app/providers.tsx
'use client'

import { usePathname } from 'next/navigation'
import { MetaPixelProvider } from 'meta-pixel-react'

const pixelOptions = {
  pixels: { main: { id: '1234567890' } },
} as const

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <MetaPixelProvider options={pixelOptions} pathname={pathname}>
      {children}
    </MetaPixelProvider>
  )
}
```

```tsx
// app/layout.tsx (Server Component — no 'use client')
import { Providers } from './providers'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

> **Pages Router:** pass `pathname={router.asPath.split('?')[0]}` from `next/router`'s `useRouter()` instead of `usePathname()`.

### Tracking events

```tsx
import { useMetaPixel } from 'meta-pixel-react'

function CheckoutButton() {
  const { $fbq } = useMetaPixel()
  return (
    <button onClick={() => $fbq('track', 'Purchase', { value: 9.99, currency: 'EUR' })}>
      Buy
    </button>
  )
}
```

`$fbq` is the fully-typed query function — use it for `track`, `trackCustom`, `trackSingle`, and CAPI deduplication via the 4th `eventID` arg: `$fbq('track', 'Purchase', {...}, { eventID })`.

### GDPR consent

Configure `consent: 'revoke'` to hold delivery, then grant once the user accepts:

```tsx
const { consent } = useMetaPixel()
// in your cookie-banner accept handler:
consent('grant')
```

### Manual page views

Omit `pathname` to disable automatic page views and fire them yourself:

```tsx
const { pageView } = useMetaPixel()
pageView()              // every pixel
pageView('1234567890')  // a single pixel (uses trackSingle)
```

### API

#### `<MetaPixelProvider options pathname?>`

| Prop | Description |
| --- | --- |
| `options` | `{ enabled?, consent?, pixels }`. Read once on mount. |
| `pathname` | Current route path. When it changes, pixels whose `pageView` glob matches fire a `PageView`. Omit to disable auto page views. |

`options.pixels` is keyed by an arbitrary name; each pixel is `{ id, autoConfig?, advancedMatching?, pageView? }`. `enabled: false` loads and sends nothing while keeping `useMetaPixel()` working (no-op `$fbq`).

#### `useMetaPixel()`

Returns `{ $fbq, consent, pageView }`. `$fbq` carries the full event typing from `meta-pixel`.

#### `pageView` globs

Patterns use `meta-pixel`'s in-house matcher: `**`, `*`, `?`, and a leading `!`. No brace/char-class expansion.

## Useful links

- [`meta-pixel`](https://npmjs.com/package/meta-pixel) — the framework-agnostic core
- [`nuxt-meta-pixel`](https://npmjs.com/package/nuxt-meta-pixel) — the Nuxt module
- [Pixel events & parameters](https://developers.facebook.com/docs/meta-pixel/reference)
- [Advanced matching](https://developers.facebook.com/docs/meta-pixel/advanced/advanced-matching)
- [GDPR consent](https://developers.facebook.com/docs/meta-pixel/implementation/gdpr/)

## License

[MIT](https://github.com/tanukijs/meta-pixel/blob/dev/LICENSE) © [tanukijs](https://github.com/tanukijs)

If this saved you some time, consider [starring the repo](https://github.com/tanukijs/meta-pixel) ⭐ — it helps others find it.

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/meta-pixel-react/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/meta-pixel-react

[npm-downloads-src]: https://img.shields.io/npm/dm/meta-pixel-react.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/meta-pixel-react

[license-src]: https://img.shields.io/npm/l/meta-pixel-react.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/meta-pixel-react

[stars-src]: https://img.shields.io/github/stars/tanukijs/meta-pixel?style=flat&colorA=020420&colorB=00DC82
[stars-href]: https://github.com/tanukijs/meta-pixel

[react-src]: https://img.shields.io/badge/React-020420?style=flat&logo=react&logoColor=00DC82
[react-href]: https://react.dev
