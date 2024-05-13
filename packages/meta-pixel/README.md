# meta-pixel

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

> TypeScript implementation of the facebook's pixel script. This is a client-side only library.

<img src="https://raw.githubusercontent.com/tanukijs/meta-pixel/dev/events.png" style="max-width: 400px" />

## Usage
### Manually setup pixels
```ts
import { addScriptDefault } from 'meta-pixel'

const fbq = addScriptDefault()
fbq('set', 'autoConfig', 'pixel_01', true)
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