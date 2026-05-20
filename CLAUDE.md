# CLAUDE.md

## What this is

Yarn 4 monorepo (`packages/*`) shipping two published packages:

- **`meta-pixel`** — framework-agnostic, **client-side only** TypeScript wrapper around Meta's `fbevents.js`. Builds with `tsc` to `lib/` (not committed). CJS (`main`/`types`), no `exports` field.
- **`nuxt-meta-pixel`** — Nuxt 3 module wrapping `meta-pixel`. Built with `@nuxt/module-builder` to `dist/` (ESM).

## Direction & conventions

- Goal: keep both packages **fully functional on Nuxt 3**.
- **One PR per fix** by default (small, focused branches off `dev`) — not catch-all branches.
- `dev` is the integration/PR base branch; feature branches merge into it.
- Released via `changelogen` (`npm run release` in each package); bump `meta-pixel` before the dependent `nuxt-meta-pixel`.
- Toolchain pinned via Volta (Node 22.15.0, Yarn 4.2.1).

## Meta Pixel semantics (verified against Meta docs — easy to get wrong)

- `fbq('set', 'autoConfig', <boolean>, <pixelId>)` — **boolean before pixel id**.
- **`consent` is global** (takes no pixel id): applies to every pixel. Must be `revoke`d **before** `init`, and re-`revoke`d on every page load. `'grant'` is runtime-only (tracking is on by default), so it's not a valid config value.
- **Advanced matching fields are all strings** — including digit-only `ph` (e.g. `'16505554444'`) and `db` (YYYYMMDD, e.g. `'19910526'`).
- `contents` is an **array of `{ id, quantity }`** (key is `id`, not `name`).
- `Purchase` is the only standard event that **requires** `currency` + `value`.
- CAPI deduplication: `eventID` is the **4th positional arg** — `fbq('track', 'Purchase', {...}, { eventID })`.
- `pageView` globs use the in-house `runtime/glob.ts`, **not** minimatch — only `**`, `*`, `?`, leading `!` are supported (no `{a,b}` / `[abc]`). It replaced minimatch to dodge a `brace-expansion` ESM crash in Vite dev (#14, #20).

## Common commands

```bash
# meta-pixel
cd packages/meta-pixel && yarn build      # tsc --build

# nuxt-meta-pixel
cd packages/nuxt-meta-pixel
npm run dev:prepare                        # generate type stubs (run first)
npm run dev                                # playground
npm run lint                               # eslint
npm run test                               # vitest run
```

## Reference docs

- Pixel events & parameters: https://developers.facebook.com/docs/meta-pixel/reference
- Advanced matching: https://developers.facebook.com/docs/meta-pixel/advanced/advanced-matching
- autoConfig / advanced: https://developers.facebook.com/docs/meta-pixel/advanced
- GDPR consent: https://developers.facebook.com/docs/meta-pixel/implementation/gdpr
- trackSingle (multi-pixel): https://developers.facebook.com/ads/blog/post/v2/2017/11/28/event-tracking-with-multiple-pixels-tracksingle/
