import { Minimatch } from 'minimatch'
import { defineNuxtPlugin, useRuntimeConfig, useRouter } from '#app'
import { addScript } from 'meta-pixel'
import type { ModuleOptions, Pixel } from '../types'


interface MatchCurrentPixelOptions {
  pixels: Pixel[]
  path: string
}

// @TODO: maybe this helper function should be
// moved to a helper package to share across
// framework implementations
function matchCurrentPixel({ pixels, path }: MatchCurrentPixelOptions): string | undefined {
  if (!pixels.length) {
    return
  }

  const matched = pixels.find(pixel => {
    const routes = pixel.routes ?? []

    const route = routes.find(route => {
      const minimatch = new Minimatch(route)
      return minimatch.match(path)
    })

    return Boolean(route)
  })

  return matched?.pixelId
}

export default defineNuxtPlugin(async (nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  const router = useRouter()
  const fbq = await addScript(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
  const opts = runtimeConfig.public.nuxtMetaPixel as ModuleOptions

  router.afterEach(({ path }) => {
    const matchingPixelId = matchCurrentPixel({
      path,
      pixels: opts.pixels ?? [],
    })

    if (!matchingPixelId) {
      fbq('track', 'PageView')
      return
    }

    fbq('set', 'autoConfig', opts.autoConfig, matchingPixelId)
    fbq('init', matchingPixelId)
    fbq('trackSingle', matchingPixelId, 'PageView')
  })

  fbq('set', 'autoConfig', opts.autoConfig, opts.pixelId)
  fbq('init', opts.pixelId)
  fbq('trackSingle', opts.pixelId, 'PageView')

  nuxtApp.provide('fbq', fbq)
})
