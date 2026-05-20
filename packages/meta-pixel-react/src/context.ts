import { createContext } from 'react'
import type { Consent, FacebookQuery } from 'meta-pixel'

export interface MetaPixelContextValue {
  /**
   * The underlying, fully-typed Facebook query function. Use it for raw calls
   * like `$fbq('track', 'Purchase', { value: 9.99, currency: 'EUR' })`. Before
   * the provider has initialized (or when disabled), it is a no-op.
   */
  $fbq: FacebookQuery
  /**
   * Global GDPR consent. Typically `consent('grant')` after a cookie banner is
   * accepted, when the provider was configured with `consent: 'revoke'`.
   */
  consent(consent: Consent): void
  /** Manually send a `PageView`. With an id it uses `trackSingle`. */
  pageView(pixelId?: string): void
}

export const MetaPixelContext = createContext<MetaPixelContextValue | null>(null)
