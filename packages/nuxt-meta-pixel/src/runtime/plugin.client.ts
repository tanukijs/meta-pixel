import { defineNuxtPlugin, useRouter, useRuntimeConfig } from '#imports'
import { setup, type FacebookQuery, type InitData } from 'meta-pixel'
import { matchPath } from './glob'
import { createNoopController } from './composables'
import type { MetaPixelController } from '../typings'
import type { Plugin } from 'nuxt/app'

export default defineNuxtPlugin(() => {
  const { enabled = true, consent: globalConsent, pixels } = useRuntimeConfig().public.metapixel

  // When disabled, load and send nothing — but still provide a no-op `$fbq`
  // and controller so components keep working everywhere.
  if (!enabled) {
    const noop = createNoopController()
    return { provide: { fbq: noop.$fbq, metaPixel: noop } }
  }

  const { $fbq, init, pageView, consent } = setup()
  $fbq.disablePushState = true

  // `consent` is a global Meta setting. Revoke before any init when configured,
  // so nothing is sent until the app later calls `$fbq('consent', 'grant')`.
  if (globalConsent === 'revoke') {
    consent('revoke')
  }

  // Live registry of pixels eligible for automatic route PageView — seeded from
  // config and extended at runtime through `useMetaPixel().init`.
  const tracked: { id: string, pageView: string }[] = []

  function register(id: string, autoConfig: boolean | undefined, advancedMatching: InitData | undefined, pageViewGlob: string) {
    init(id, autoConfig ?? true, advancedMatching)
    tracked.push({ id, pageView: pageViewGlob })
  }

  for (const name in pixels) {
    const pixel = pixels[name]
    register(pixel.id.toString(), pixel.autoconfig, undefined, pixel.pageView ?? '**')
  }

  const router = useRouter()
  router.afterEach((to, _, failure) => {
    if (failure) return

    for (const { id, pageView: glob } of tracked) {
      if (matchPath(to.path, glob)) {
        pageView(id)
      }
    }
  })

  const controller: MetaPixelController = {
    $fbq,
    pageView,
    consent,
    init(id, options = {}) {
      const idStr = id.toString()
      const glob = options.pageView ?? '**'
      register(idStr, options.autoConfig, options.advancedMatching, glob)
      // The initial navigation has already happened by the time a runtime init
      // runs, so fire a PageView immediately if the current route matches.
      if (matchPath(router.currentRoute.value.path, glob)) {
        pageView(idStr)
      }
    }
  }

  return {
    provide: {
      fbq: $fbq,
      metaPixel: controller
    }
  }
}) as Plugin<{ fbq: FacebookQuery, metaPixel: MetaPixelController }>
