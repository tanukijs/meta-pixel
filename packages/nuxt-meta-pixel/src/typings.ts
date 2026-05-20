import type { Consent, FacebookQuery, InitData } from 'meta-pixel'

export interface Pixel {
  id: number | string
  autoconfig?: boolean
  pageView?: string
}

/** Options for initializing a pixel at runtime via `useMetaPixel().init`. */
export interface InitOptions {
  /** Enable Meta's automatic configuration. Default `true`. */
  autoConfig?: boolean
  /** Advanced matching data passed to `fbq('init', id, data)`. */
  advancedMatching?: InitData
  /**
   * Glob deciding which routes auto-send a `PageView` for this pixel (same
   * semantics as the config `pageView`). Default `'**'`. A `PageView` also
   * fires immediately if the current route matches.
   */
  pageView?: string
}

/** Runtime API exposed by `useMetaPixel()` (and `$metaPixel`). */
export interface MetaPixelController {
  /** The underlying Facebook query function. */
  $fbq: FacebookQuery
  /** Initialize a pixel at runtime (e.g. after fetching settings from an API). */
  init(id: string | number, options?: InitOptions): void
  /** Send a `PageView`, optionally for a single pixel. */
  pageView(pixelId?: string): void
  /** Set the global GDPR consent. */
  consent(consent: Consent): void
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
