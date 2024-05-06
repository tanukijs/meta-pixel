import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import type { ModuleOptions } from './types'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-meta-pixel',
    configKey: 'nuxtMetaPixel'
  },
  defaults: {
    pixelId: '',
    autoConfig: true,
    noscript: true
  },
  setup (options, nuxt) {
    const resolver = createResolver(import.meta.url)
    nuxt.options.runtimeConfig.public.nuxtMetaPixel = options

    if (options.noscript) {
      // TODO: noscript can be string, pls don't
      const scripts = nuxt.options.app.head.noscript ?? []
      scripts.push({ innerHTML: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${options.pixelId}&ev=PageView&noscript=1"/>` })
      nuxt.options.app.head.noscript = scripts
    }

    addPlugin(resolver.resolve('./runtime/plugin.client'))
  }
})
