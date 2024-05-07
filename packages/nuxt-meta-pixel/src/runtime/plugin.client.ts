import { defineNuxtPlugin, useRuntimeConfig, useRouter } from '#app'
import { addScript } from 'meta-pixel'
import { Minimatch } from 'minimatch'
import type { ModuleOptions, Pixel } from '../types'

type FacebookQuery = ReturnType<typeof addScript>

function autoPageView (fbq: FacebookQuery, path: string, pixels: Pixel[]) {
  for (const pixel of pixels) {
    if (pixel.autoPageView === undefined) continue

    const match = pixel.autoPageView.some((pattern) => {
      const minimatch = new Minimatch(pattern)
      return minimatch.match(path)
    })

    if (!match) continue
    fbq('trackCustom', pixel.id, 'PageView')
  }
}

export default defineNuxtPlugin(async (nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  const router = useRouter()
  const fbq = addScript(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
  const opts = runtimeConfig.public.nuxtMetaPixel as ModuleOptions
  
  for (const pixel of opts.pixels) {
    fbq('set', 'autoConfig', pixel.autoConfig, pixel.id)
    fbq('init', pixel.id)
  }
  
  router.afterEach((route) => autoPageView(fbq, route.path, opts.pixels))

  return {
    provide: {
      fbq
    }
  }
})
