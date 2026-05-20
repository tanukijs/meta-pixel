# Meta Pixel

A TypeScript monorepo for integrating the Meta (Facebook) Pixel into JavaScript and Nuxt applications.

## Packages

| Package | Description |
| --- | --- |
| [`meta-pixel`](packages/meta-pixel) | Framework-agnostic, **client-side only** TypeScript wrapper around Meta's `fbevents.js`. Typed standard events, multi-pixel, GDPR consent. |
| [`nuxt-meta-pixel`](packages/nuxt-meta-pixel) | Nuxt 3 & 4 module built on `meta-pixel`: declare pixels in config, automatic route `PageView`, SSR-safe. |
| [`meta-pixel-react`](packages/meta-pixel-react) | React bindings for `meta-pixel`: an SSR-safe `<MetaPixelProvider>`, a typed `useMetaPixel()` hook, and automatic route `PageView`. |

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

# meta-pixel-react — build the React bindings
yarn workspace meta-pixel-react build
```

Each package has its own README with usage details. Contributions are welcome.

## License

[MIT](https://opensource.org/licenses/MIT)
