# meta-pixel

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

> TypeScript implementation of the facebook's pixel script. This is a client-side only library.

<img src="https://raw.githubusercontent.com/tanukijs/meta-pixel/dev/events.png" style="max-width: 400px" />

## Installation

```bash
npm i meta-pixel
```

## Usage
### Manually setup pixels
```ts
import { addScriptDefault } from 'meta-pixel'

const fbq = addScriptDefault()
fbq('set', 'autoConfig', true, 'pixel_01')
fbq('init', 'pixel_01')
fbq('track', 'PageView')
```

### Using setup & multi pixels
```ts
import { setup } from 'meta-pixel'

const { $fbq } = setup()
  .init('pixel_01')
  .init('pixel_02', false)
  .pageView()

$fbq('track', 'CompleteRegistration')
```

### Combining both
```ts
import { addScriptDefault, setup } from 'meta-pixel'

const fbq = addScriptDefault()
setup(fbq)
  .init('pixel_01')
  .init('pixel_02')
  .pageView()

fbq('track', 'CompleteRegistration')
```

### Manually define fbevents script
```diff
- const fbq = metapixel.addScriptDefault()
+ const fbq = metapixel.addScript(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
```

## API

`setup($fbq?)` returns a chainable controller. Pass your own `FacebookQuery` (e.g. from `addScriptDefault()`) or let it create one.

| Member | Description |
| --- | --- |
| `$fbq` | The underlying Facebook query function — use it for raw, fully typed calls like `$fbq('track', 'Purchase', { value: 9.99, currency: 'EUR' })`. |
| `init(pixelId, autoConfig = true, advancedMatching?)` | Initialize a pixel. `autoConfig` maps to `fbq('set', 'autoConfig', …)`. `advancedMatching` (typed `InitData`) forwards customer data — email, phone, etc., **all strings** — for better attribution. |
| `pageView(pixelId?)` | Send a `PageView`. With an id it uses `trackSingle`; without one it tracks every pixel. |
| `consent('grant' \| 'revoke')` | Global GDPR consent — the command takes **no** pixel id, so it applies to all pixels. Call `'revoke'` **before** `init` to hold delivery until you grant it. |

`init`, `pageView` and `consent` are chainable (they return the controller). Standard events and their parameters are typed — e.g. `Purchase` requires `currency` and `value`, and advanced-matching fields are strings.

```ts
import { setup } from 'meta-pixel'

setup()
  .consent('revoke')   // hold delivery until the user opts in
  .init('pixel_01')
  .pageView()
```

Pass advanced matching to improve attribution (every field is a string):

```ts
import { setup } from 'meta-pixel'

setup()
  .init('pixel_01', true, { em: 'jane@doe.com', ph: '16505554444', db: '19910526' })
  .pageView()
```

## Resources
- https://developers.facebook.com/docs/meta-pixel/get-started/
- https://developers.facebook.com/docs/meta-pixel/advanced/#automatic-configuration

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/meta-pixel/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/meta-pixel

[npm-downloads-src]: https://img.shields.io/npm/dm/meta-pixel.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/meta-pixel

[license-src]: https://img.shields.io/npm/l/meta-pixel.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/meta-pixel