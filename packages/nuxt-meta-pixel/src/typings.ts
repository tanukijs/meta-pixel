export interface Pixel {
  /**
   * Your pixel id. A string — pixel ids are 15-16 digits and a numeric literal
   * can silently lose precision past `Number.MAX_SAFE_INTEGER`.
   */
  id: string
  /**
   * Enable Meta's automatic configuration. Default `true`. Matches the Meta
   * command `fbq('set', 'autoConfig', <boolean>, <pixelId>)`.
   * @see https://developers.facebook.com/docs/meta-pixel/advanced
   */
  autoConfig?: boolean
  pageView?: string
}

export interface ModuleOptions {
  /**
   * When `false`, the module loads and sends nothing, but still provides a
   * no-op `$fbq` so components calling it keep working. Handy to disable
   * tracking outside production without conditionally registering the module.
   * Override at runtime with `NUXT_PUBLIC_METAPIXEL_ENABLED`. Default `true`.
   */
  enabled?: boolean
  /**
   * GDPR consent, applied globally to every pixel (the Meta `consent` command
   * takes no pixel id). Set `'revoke'` to hold all event delivery until you
   * grant consent at runtime via `$fbq('consent', 'grant')` (e.g. after a
   * cookie banner is accepted). Granting is runtime-only, so `'grant'` is not a
   * valid config value (tracking is allowed by default).
   * @see https://developers.facebook.com/docs/meta-pixel/implementation/gdpr/
   */
  consent?: 'revoke'
  /** Pixels to load, keyed by an arbitrary name. */
  pixels: Record<string, Pixel>
}
