import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { addScript } from 'meta-pixel'
import type { PluginOptions } from '../types'

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  const fbq = addScript(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
  const opts = runtimeConfig.public.nuxtMetaPixel as PluginOptions
  
  for (const pixel of opts.pixels) {
    const autoConfig = pixel.autoConfig === undefined ? true : pixel.autoConfig
    fbq('set', 'autoConfig', autoConfig, pixel.id)
    fbq('init', pixel.id)
  }

  fbq('track', 'PageView')

  return {
    provide: {
      fbq
    }
  }
})
