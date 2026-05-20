import { defineNuxtPlugin, useRouter, useRuntimeConfig } from '#imports'
import { setup, type FacebookQuery } from 'meta-pixel'
import { matchPath } from './glob'
import type { Plugin } from 'nuxt/app'

export default defineNuxtPlugin(() => {
  const { enabled = true, consent: globalConsent, pixels } = useRuntimeConfig().public.metapixel

  // When disabled, load and send nothing — but still provide a no-op `$fbq` so
  // components calling it (e.g. `$fbq('track', …)`) keep working everywhere.
  if (!enabled) {
    const noop = (() => {}) as unknown as FacebookQuery
    return { provide: { fbq: noop } }
  }

  const { $fbq, init, pageView, consent } = setup()
  $fbq.disablePushState = true

  // `consent` is a global Meta setting. Revoke before any init when configured,
  // so nothing is sent until the app later calls `$fbq('consent', 'grant')`.
  if (globalConsent === 'revoke') {
    consent('revoke')
  }

  for (const name in pixels) {
    const pixel = pixels[name]
    init(pixel.id.toString(), pixel.autoconfig)
  }

  const router = useRouter()
  router.afterEach((to, _, failure) => {
    if (failure) return

    for (const name in pixels) {
      const pixel = pixels[name]
      const match = matchPath(to.path, pixel.pageView ?? '**')
      if (match) {
        pageView(pixel.id.toString())
      }
    }
  })

  return {
    provide: {
      fbq: $fbq
    }
  } 
}) as Plugin<{fbq: FacebookQuery}>
