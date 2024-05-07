# meta-pixel

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

> TypeScript implementation of the facebook's pixel script. This is a client-side only library.

## Usage

### Load a single pixel
```js
import { initSingle } from 'meta-pixel'

const fbq = initSingle('my_pixel_id')
// fbq('track', 'CompleteRegistration')
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/meta-pixel/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/meta-pixel

[npm-downloads-src]: https://img.shields.io/npm/dm/meta-pixel.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/meta-pixel

[license-src]: https://img.shields.io/npm/l/meta-pixel.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/meta-pixel