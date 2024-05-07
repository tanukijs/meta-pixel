import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { addScript } from 'meta-pixel'

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  const opts = runtimeConfig.public.metaPixel
  const fbq = addScript(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
  
  for (const pixel of opts.pixels) {
    const autoConfig = pixel.autoconfig === undefined ? true : pixel.autoconfig
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
