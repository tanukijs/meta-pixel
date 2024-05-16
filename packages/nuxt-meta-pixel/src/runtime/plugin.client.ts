import { defineNuxtPlugin, useRuntimeConfig } from '#imports'
import { setup, type FacebookQuery } from 'meta-pixel'
import type { Plugin } from 'nuxt/app'

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  const opts = runtimeConfig.public.metaPixel
  const { $fbq, init, pageView } = setup()
  
  for (const pixel of opts.pixels) {
    init(pixel.id, pixel.autoconfig)
  }

  pageView()

  return {
    provide: {
      fbq: $fbq
    }
  } 
}) as Plugin<{fbq: FacebookQuery}>
