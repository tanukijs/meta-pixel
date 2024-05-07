import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { addScript } from 'meta-pixel'
import type { PluginOptions } from '../types'

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  const fbq = addScript(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
  const opts = runtimeConfig.public.nuxtMetaPixel as PluginOptions
  
  for (const pixel of opts.pixels) {
    const autoConfig = pixel.autoconfig === undefined ? true : pixel.autoconfig
    fbq('set', 'autoConfig', autoConfig, pixel.id)
    fbq('init', pixel.id)
  }

  fbq('track', 'PageView')

  nuxtApp.provide('fbq', fbq)
})
