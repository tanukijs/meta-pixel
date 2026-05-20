import type { InitData } from 'meta-pixel'

export interface ReactPixel {
  /**
   * Your pixel id. A string — pixel ids are 15-16 digits and a numeric literal
   * can silently lose precision past `Number.MAX_SAFE_INTEGER`.
   */
  id: string
  /**
   * Enable Meta's automatic configuration. Default `true`. Maps to
   * `fbq('set', 'autoConfig', <boolean>, <pixelId>)`.
   * @see https://developers.facebook.com/docs/meta-pixel/advanced
   */
  autoConfig?: boolean
  /**
   * Advanced matching sent at init. Every field is a string — including
   * digit-only `ph` and `db` (YYYYMMDD).
   * @see https://developers.facebook.com/docs/meta-pixel/advanced/advanced-matching/
   */
  advancedMatching?: InitData
  /**
   * Glob matched against the current pathname to decide whether this pixel
   * fires an automatic `PageView`. Default `'**'` (every path). Supports
   * `**`, `*`, `?` and a leading `!` (no brace/char-class expansion).
   */
  pageView?: string
}

export interface MetaPixelOptions {
  /**
   * When `false`, nothing is loaded or sent, but `useMetaPixel()` still returns
   * a no-op `$fbq` so components keep working. Handy to disable tracking
   * outside production without conditionally mounting the provider.
   */
  enabled?: boolean
  /**
   * GDPR consent, applied globally to every pixel (the Meta `consent` command
   * takes no pixel id). Set `'revoke'` to hold all event delivery until you
   * grant it at runtime via `consent('grant')` (e.g. after a cookie banner is
   * accepted). Granting is runtime-only, so `'grant'` is not a valid config
   * value (tracking is allowed by default).
   * @see https://developers.facebook.com/docs/meta-pixel/implementation/gdpr/
   */
  consent?: 'revoke'
  /** Pixels to load, keyed by an arbitrary name. */
  pixels: Record<string, ReactPixel>
}
