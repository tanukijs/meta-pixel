export interface Pixel {
  id: number | string
  /**
   * Opt into GDPR consent gating. Set `'revoke'` to hold event delivery until
   * you grant consent at runtime via `$fbq('consent', 'grant')` (e.g. after a
   * cookie banner is accepted).
   *
   * Consent is a GLOBAL Meta setting (the command takes no pixel id): revoking
   * on any pixel holds *every* configured pixel, not just this one. Granting is
   * runtime-only, so `'grant'` is not a valid config value.
   * @see https://developers.facebook.com/docs/meta-pixel/implementation/gdpr/
   */
  consent?: 'revoke'
  autoconfig?: boolean
  pageView?: string
}

export interface ModuleOptions {
  [name: string]: Pixel
}