# meta-pixel-react

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

> React bindings for [`meta-pixel`](https://npmjs.com/package/meta-pixel): an SSR-safe provider and a typed hook for Meta's Pixel. Client-side only.

## Why

Most React pixel wrappers expose a singleton you must `init` yourself in an effect, drop `window is undefined` errors during SSR, and accept untyped `track(event, data)` calls. This package gives you:

- **`<MetaPixelProvider>`** — loads `fbevents.js` and initializes your pixels on the client only (safe to render during SSR/RSC).
- **`useMetaPixel()`** — a typed hook; `Purchase` requires `currency`/`value`, advanced-matching fields are strings, etc. (all inherited from `meta-pixel`).
- **Automatic `PageView`** on route change, glob-matched per pixel.
- **GDPR consent** helper for the revoke-then-grant flow.

## Installation

```bash
npm i meta-pixel-react
# react >= 18 is a peer dependency
```

## Usage

Wrap your app once. Pass the current `pathname` from your router to get automatic page views:

```tsx
import { MetaPixelProvider } from 'meta-pixel-react'

const pixelOptions = {
  consent: 'revoke', // optional: hold delivery until the user opts in
  pixels: {
    main: { id: '1234567890', pageView: '**' },
  },
} as const

export function App({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() // next/navigation, react-router, etc.
  return (
    <MetaPixelProvider options={pixelOptions} pathname={pathname}>
      {children}
    </MetaPixelProvider>
  )
}
```

> Define `options` outside the component (or `useMemo` it) — it is read once on mount.

Track events anywhere below the provider:

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
pageView()           // every pixel
pageView('1234567890') // a single pixel (uses trackSingle)
```

## API

### `<MetaPixelProvider options pathname?>`

| Prop | Description |
| --- | --- |
| `options` | `{ enabled?, consent?, pixels }`. Read once on mount. |
| `pathname` | Current route path. When it changes, pixels whose `pageView` glob matches fire a `PageView`. Omit to disable auto page views. |

`options.pixels` is keyed by an arbitrary name; each pixel is `{ id, autoConfig?, advancedMatching?, pageView? }`. `enabled: false` loads and sends nothing while keeping `useMetaPixel()` working (no-op `$fbq`).

### `useMetaPixel()`

Returns `{ $fbq, consent, pageView }`. `$fbq` is the fully-typed query function from `meta-pixel` — use it for `track`, `trackCustom`, `trackSingle`, and CAPI deduplication via the 4th `eventID` arg: `$fbq('track', 'Purchase', {...}, { eventID })`.

### `pageView` globs

Patterns use `meta-pixel`'s in-house matcher: `**`, `*`, `?`, and a leading `!`. No brace/char-class expansion.

## Resources

- Core library: https://npmjs.com/package/meta-pixel
- Pixel reference: https://developers.facebook.com/docs/meta-pixel/reference
- Advanced matching: https://developers.facebook.com/docs/meta-pixel/advanced/advanced-matching

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/meta-pixel-react/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/meta-pixel-react

[npm-downloads-src]: https://img.shields.io/npm/dm/meta-pixel-react.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/meta-pixel-react

[license-src]: https://img.shields.io/npm/l/meta-pixel-react.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/meta-pixel-react
