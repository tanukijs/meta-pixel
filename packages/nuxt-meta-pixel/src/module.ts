import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import type { ModuleOptions, PluginOptions } from './types'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-meta-pixel',
    configKey: 'nuxtMetaPixel'
  },
  setup (options, nuxt) {
    const resolver = createResolver(import.meta.url)
    options.pixels ??= []
    if (options.pixel !== undefined) {
      options.pixels.unshift(options.pixel)
    }

    nuxt.options.runtimeConfig.public.nuxtMetaPixel = options as PluginOptions
    // TODO: noscript can be string, pls don't
    const noscript = nuxt.options.app.head.noscript ?? []

    for (const pixel of options.pixels) {
      if (pixel.noscript === true) {
        noscript.push({ innerHTML: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${pixel.id}&ev=PageView&noscript=1"/>` })
      }
    }
    
    nuxt.options.app.head.noscript = noscript
    addPlugin(resolver.resolve('./runtime/plugin.client'))
  }
})
