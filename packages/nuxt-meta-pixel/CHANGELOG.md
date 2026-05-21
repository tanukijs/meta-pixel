# Changelog

## v3.0.0

### Breaking
- **Config restructured.** `ModuleOptions` is now `{ enabled?, consent?, pixels }`
  where `pixels` is a `Record<string, Pixel>` map. The previous flat shape and
  per-pixel `consent` field are gone — `consent` is now a single global option
  (`'revoke'`), matching Meta's global consent command. Runtime env vars become
  `NUXT_PUBLIC_METAPIXEL_PIXELS_<NAME>_ID`.
  ([#30](https://github.com/tanukijs/meta-pixel/pull/30))
- **Pixel config tightened**: `autoConfig` casing and string pixel ids enforced.
  ([#34](https://github.com/tanukijs/meta-pixel/pull/34))

### Added
- Global `enabled` toggle (default `true`). When `false` the module loads and
  sends nothing but still provides a no-op `$fbq`. Override at runtime with
  `NUXT_PUBLIC_METAPIXEL_ENABLED`.
  ([#31](https://github.com/tanukijs/meta-pixel/pull/31), [#15](https://github.com/tanukijs/meta-pixel/issues/15), [#16](https://github.com/tanukijs/meta-pixel/issues/16))
- **Nuxt 4 support** while keeping Nuxt 3 compatibility.
  ([#36](https://github.com/tanukijs/meta-pixel/pull/36))

### Changed
- Bump the `meta-pixel` dependency to `^2.0.0`.
- Packaging: add `publishConfig`, `repository.directory`, and a bundled `LICENSE`.

## v2.1.0

### Added
- **GDPR consent** ([#18](https://github.com/tanukijs/meta-pixel/issues/18)): opt
  into consent gating with a per-pixel `consent: 'revoke'` config field. The
  module revokes globally before init, so nothing is sent to Meta until you
  grant at runtime via `$fbq('consent', 'grant')` (e.g. after a cookie banner).
  Consent is a global Meta setting, so revoking on any pixel holds every pixel.

### Fixed
- Replace `minimatch` with a built-in glob matcher, removing the
  `brace-expansion` ESM-interop crash in Vite dev on recent Nuxt versions
  ([#14](https://github.com/tanukijs/meta-pixel/issues/14), [#20](https://github.com/tanukijs/meta-pixel/issues/20)).
- Resolve `#imports` in the published runtime and drop the `#vue-router` import,
  fixing `Failed to resolve import "#vue-router"` from consuming apps
  ([#12](https://github.com/tanukijs/meta-pixel/issues/12)).

### Changed
- Update to the latest Nuxt 3 line (3.21) and `@nuxt/module-builder` 1.x. The
  module is now **ESM-only** (no more `module.cjs` / `require` entry), as
  required for Nuxt v3+. Requires Node ≥ 22.
- Migrate linting to the ESLint 9 flat config.
- Bump the `meta-pixel` dependency to `^1.2.0` for the new consent API.

## v2.0.2
- Previous published release.
