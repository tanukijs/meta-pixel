# Changelog

## v1.2.0

### Added
- GDPR consent support: a new `setup().consent('grant' | 'revoke')` method, the
  exported `Consent` type, and the `('consent', …)` command on `FacebookQuery`.
  Call `consent('revoke')` before `init` to hold event delivery, then
  `consent('grant')` once the user opts in. ([#18](https://github.com/tanukijs/meta-pixel/issues/18))

## v1.1.0
- Initial published baseline.
