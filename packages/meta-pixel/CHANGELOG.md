# Changelog

## v2.0.0

### Breaking
- Types tightened to match Meta's documented API. Existing code using the old
  shapes will no longer type-check:
  - `contents` is now `Array<{ id: string, quantity: number }>` (was a
    one-element tuple keyed by `name`).
  - Advanced-matching `ph` and `db` are now `string` (were `number`), so
    digit-only phone numbers and `YYYYMMDD` birthdays keep their leading zeros.
  ([#33](https://github.com/tanukijs/meta-pixel/pull/33))

### Added
- `setup().init()` accepts an optional advanced-matching object:
  `init(pixelId, autoConfig?, advancedMatching?)`, forwarded to
  `fbq('init', id, data)`. The `InitData` type is now exported.
  ([#37](https://github.com/tanukijs/meta-pixel/pull/37))

### Changed
- The `init` parameter `autoconfig` was renamed to `autoConfig` (positional, so
  callers are unaffected).
- Packaging: add a `prepack` build step, `sideEffects: false`, `publishConfig`,
  `repository.directory`, and a bundled `LICENSE`.

## v1.2.0

### Added
- GDPR consent support: a new `setup().consent('grant' | 'revoke')` method, the
  exported `Consent` type, and the `('consent', …)` command on `FacebookQuery`.
  Call `consent('revoke')` before `init` to hold event delivery, then
  `consent('grant')` once the user opts in. ([#18](https://github.com/tanukijs/meta-pixel/issues/18))

## v1.1.0
- Initial published baseline.
