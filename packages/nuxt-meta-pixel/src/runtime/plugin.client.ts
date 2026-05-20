import { defineNuxtPlugin, useRouter, useRuntimeConfig } from '#imports'
import { setup, type FacebookQuery } from 'meta-pixel'
import { matchPath } from './glob'
import type { Plugin } from 'nuxt/app'

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  const pixels = runtimeConfig.public.metapixel
  const { $fbq, init, pageView, consent } = setup()
  $fbq.disablePushState = true

  // `consent` is a global Meta setting (not per-pixel). Revoke once before any
  // init if a pixel opts into GDPR gating, so nothing is sent until the app
  // later calls `$fbq('consent', 'grant')`.
  if (Object.values(pixels).some(pixel => pixel.consent === 'revoke')) {
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
