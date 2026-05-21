# Meta Pixel

[![License][license-src]][license-href]
[![GitHub stars][stars-src]][stars-href]

A TypeScript monorepo for integrating the Meta (Facebook) Pixel into JavaScript, Nuxt, and React applications.

<img src="https://raw.githubusercontent.com/tanukijs/meta-pixel/dev/events.png" style="max-width: 400px" />

## Packages

| Package | Downloads | Description |
| --- | --- | --- |
| [`meta-pixel`](packages/meta-pixel) | [![downloads][mp-d]][mp-href] | Framework-agnostic, **client-side only** wrapper around Meta's `fbevents.js`. Typed standard events, multi-pixel, GDPR consent. |
| [`nuxt-meta-pixel`](packages/nuxt-meta-pixel) | [![downloads][nmp-d]][nmp-href] | Nuxt 3 & 4 module built on `meta-pixel`: declare pixels in config, automatic route `PageView`, SSR-safe. |
| [`meta-pixel-react`](packages/meta-pixel-react) | [![downloads][mpr-d]][mpr-href] | React bindings for `meta-pixel`: an SSR-safe `<MetaPixelProvider>`, a typed `useMetaPixel()` hook, and automatic route `PageView`. |

Each package has its own README with full usage details.

## Development

This is a [Yarn](https://yarnpkg.com) workspaces monorepo (Node & Yarn versions are pinned via [Volta](https://volta.sh)).

```bash
yarn install

# meta-pixel — build the TypeScript wrapper
yarn workspace meta-pixel build

# nuxt-meta-pixel — run the playground / tests / lint
yarn workspace nuxt-meta-pixel dev:prepare   # generate type stubs first
yarn workspace nuxt-meta-pixel dev
yarn workspace nuxt-meta-pixel test
yarn workspace nuxt-meta-pixel lint

# meta-pixel-react — build the React bindings / run tests
yarn workspace meta-pixel-react build
yarn workspace meta-pixel-react test
```

Contributions are welcome ❤️ — and if these packages help you, consider [starring the repo](https://github.com/tanukijs/meta-pixel) ⭐.

## License

[MIT](LICENSE) © [tanukijs](https://github.com/tanukijs)

<!-- Badges -->
[license-src]: https://img.shields.io/npm/l/meta-pixel.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://github.com/tanukijs/meta-pixel/blob/dev/LICENSE

[stars-src]: https://img.shields.io/github/stars/tanukijs/meta-pixel?style=flat&colorA=020420&colorB=00DC82
[stars-href]: https://github.com/tanukijs/meta-pixel

[mp-d]: https://img.shields.io/npm/dm/meta-pixel.svg?style=flat&colorA=020420&colorB=00DC82
[mp-href]: https://npmjs.com/package/meta-pixel

[nmp-d]: https://img.shields.io/npm/dm/nuxt-meta-pixel.svg?style=flat&colorA=020420&colorB=00DC82
[nmp-href]: https://npmjs.com/package/nuxt-meta-pixel

[mpr-d]: https://img.shields.io/npm/dm/meta-pixel-react.svg?style=flat&colorA=020420&colorB=00DC82
[mpr-href]: https://npmjs.com/package/meta-pixel-react
