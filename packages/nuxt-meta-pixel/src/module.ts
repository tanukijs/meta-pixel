import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'

export interface Pixel {
  id: string
  noscript?: boolean
  autoConfig?: boolean
  autoPageView?: string[]
}

export interface ModuleOptions {
  pixels: Pixel[]
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-meta-pixel',
    configKey: 'nuxtMetaPixel'
  },
  defaults: {
    pixels: []
  },
  setup (options, nuxt) {
    const resolver = createResolver(import.meta.url)
    nuxt.options.runtimeConfig.public.nuxtMetaPixel = options
    // TODO: noscript can be string, pls don't
    const scripts = nuxt.options.app.head.noscript ?? []

    for (const pixel of options.pixels) {
      if (pixel.noscript === true) {
        scripts.push({ innerHTML: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${pixel.id}&ev=PageView&noscript=1"/>` })
      }
    }
    
    nuxt.options.app.head.noscript = scripts
    addPlugin(resolver.resolve('./runtime/plugin.client'))
  }
})
