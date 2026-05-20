import { useContext } from 'react'
import { MetaPixelContext, type MetaPixelContextValue } from './context'

/**
 * Access the Meta Pixel from any component rendered inside `<MetaPixelProvider>`.
 *
 * ```tsx
 * const { $fbq } = useMetaPixel()
 * $fbq('track', 'Purchase', { value: 9.99, currency: 'EUR' })
 * ```
 */
export function useMetaPixel(): MetaPixelContextValue {
  const ctx = useContext(MetaPixelContext)
  if (ctx === null) {
    throw new Error('useMetaPixel() must be used within a <MetaPixelProvider>.')
  }
  return ctx
}
