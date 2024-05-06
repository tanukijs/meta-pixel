import { Minimatch } from 'minimatch'
import { defineNuxtPlugin, useRuntimeConfig, useRouter } from '#app'
import { addScript } from 'meta-pixel'
import type { Pixel } from '../types'


function getMatchingPixel (pixels: Pixel[], path: string) {
  if (!pixels) {
    return
  }

  const matched = pixels.find(pixel => {
    const routes = pixel.routes ?? []

    const routeIndex = routes.findIndex(route => {
      const minimatch = new Minimatch(route)
      return minimatch.match(path)
    })

    return routeIndex !== -1
  })

  return matched?.pixelId
}

export default defineNuxtPlugin(async (nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  const router = useRouter()
  const fbq = addScript(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
  const opts = runtimeConfig.public.nuxtMetaPixel as ModuleOptions

  router.afterEach(({ path }) => {
    const matchingPixelId = getMatchingPixel(opts.pixels, path)
    if (!matchingPixelId) {
      fbq('track', 'PageView')
      return
    }

    fbq('set', 'autoConfig', opts.autoConfig, matchingPixelId)
    fbq('init', matchingPixelId)
    fbq('track', 'PageView')
  })

  fbq('set', 'autoConfig', opts.autoConfig, opts.pixelId)
  fbq('init', opts.pixelId)
  fbq('track', 'PageView')


  nuxtApp.provide('fbq', fbq)
})
