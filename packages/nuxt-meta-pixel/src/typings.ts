export interface Pixel {
  id: number | string
  autoconfig?: boolean
  pageView?: string
}

export interface ModuleOptions {
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
