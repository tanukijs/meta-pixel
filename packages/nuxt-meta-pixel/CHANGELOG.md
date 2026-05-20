# Changelog

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
