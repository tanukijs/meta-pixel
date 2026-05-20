import { useNuxtApp } from '#imports'
import type { FacebookQuery } from 'meta-pixel'
import type { MetaPixelController } from '../typings'

/** A controller that does nothing — used on the server and when disabled. */
export function createNoopController(): MetaPixelController {
  const noop = (() => {}) as unknown as FacebookQuery
  return {
    $fbq: noop,
    init: () => {},
    pageView: () => {},
    consent: () => {}
  }
}

/**
 * Access the Meta Pixel runtime API. Lets you initialize pixels dynamically —
 * e.g. after fetching a tenant's settings from an API:
 *
 * ```ts
 * const { init, $fbq } = useMetaPixel()
 * const settings = await fetchSettings()
 * init(settings.pixelId, { advancedMatching: { em }, pageView: '/shop/**' })
 * ```
 *
 * On the server (or when the module is disabled) it returns a no-op controller,
 * so it is always safe to call.
 */
export function useMetaPixel(): MetaPixelController {
  return useNuxtApp().$metaPixel ?? createNoopController()
}
