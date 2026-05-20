'use client'

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { setup, type FacebookQuery, type Setup } from 'meta-pixel'
import { MetaPixelContext, type MetaPixelContextValue } from './context'
import { matchPath } from './glob'
import type { MetaPixelOptions } from './typings'

// Provided before init (and when disabled) so components calling `$fbq` never crash.
const noopFbq = (() => {}) as unknown as FacebookQuery

export interface MetaPixelProviderProps {
  /**
   * Pixel configuration. Read once on mount — keep the object stable (define it
   * outside the component or memoize it); later changes are ignored.
   */
  options: MetaPixelOptions
  /**
   * Current route pathname (e.g. from `usePathname()` / `useLocation()`). When
   * it changes, each pixel whose `pageView` glob matches fires a `PageView`.
   * Omit to disable automatic page views (call `pageView()` yourself instead).
   */
  pathname?: string
  children?: ReactNode
}

/**
 * Loads `fbevents.js` and initializes the configured pixels on the client, then
 * exposes them through `useMetaPixel()`. Safe to render during SSR — the script
 * is only injected in a client effect, never during render.
 */
export function MetaPixelProvider({ options, pathname, children }: MetaPixelProviderProps) {
  // Freeze the first options so re-renders don't re-init the pixels.
  const optionsRef = useRef(options)
  const [controller, setController] = useState<Setup | null>(null)

  useEffect(() => {
    const opts = optionsRef.current
    if (opts.enabled === false) return

    const fbqSetup = setup()
    // PageView is fired explicitly from the pathname effect, so let the host
    // app own routing rather than fbevents' history hooks.
    fbqSetup.$fbq.disablePushState = true

    // `consent` is global and must be revoked before any init to hold delivery.
    if (opts.consent === 'revoke') {
      fbqSetup.consent('revoke')
    }

    for (const name in opts.pixels) {
      const pixel = opts.pixels[name]
      fbqSetup.init(pixel.id, pixel.autoConfig, pixel.advancedMatching)
    }

    setController(fbqSetup)
  }, [])

  // Initial PageView + every subsequent pathname change.
  useEffect(() => {
    if (controller === null || pathname === undefined) return

    const opts = optionsRef.current
    for (const name in opts.pixels) {
      const pixel = opts.pixels[name]
      if (matchPath(pathname, pixel.pageView ?? '**')) {
        controller.pageView(pixel.id)
      }
    }
  }, [controller, pathname])

  const value = useMemo<MetaPixelContextValue>(() => ({
    $fbq: controller?.$fbq ?? noopFbq,
    consent: (consent) => { controller?.consent(consent) },
    pageView: (pixelId) => { controller?.pageView(pixelId) },
  }), [controller])

  return (
    <MetaPixelContext.Provider value={value}>
      {children}
    </MetaPixelContext.Provider>
  )
}
