# Changelog

## v0.1.0

Initial release — React bindings for `meta-pixel`.

### Added
- `<MetaPixelProvider>` — loads `fbevents.js` and initializes the configured
  pixels in a client effect (SSR/RSC-safe; never touches `window`/`document`
  during render). Honors a global `enabled` toggle and the GDPR
  revoke-before-init flow.
- `useMetaPixel()` — typed hook returning `{ $fbq, consent, pageView }`; `$fbq`
  carries the full event typing from `meta-pixel`.
- Automatic route `PageView` via an optional `pathname` prop, glob-matched per
  pixel (router-agnostic — works with next/navigation, react-router, …).
- Forwards advanced matching per pixel through `meta-pixel`'s `init()`.
