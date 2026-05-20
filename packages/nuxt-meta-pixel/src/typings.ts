import type { Consent } from 'meta-pixel'

export interface Pixel {
  id: number | string
  /**
   * GDPR consent for the Meta Pixel. Set `revoke` to hold all event delivery
   * until you call `$fbq('consent', 'grant')` (e.g. after a cookie banner is
   * accepted). Consent is a global Meta setting, so it applies to every pixel.
   * @see https://developers.facebook.com/docs/meta-pixel/implementation/gdpr/
   */
  consent?: Consent
  autoconfig?: boolean
  pageView?: string
}

export interface ModuleOptions {
  [name: string]: Pixel
}