import { addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import { defu } from 'defu'
import type { ModuleOptions } from './typings'

declare module 'nuxt/schema' {
  interface PublicRuntimeConfig {
    metaPixel: ModuleOptions
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-meta-pixel',
    configKey: 'metaPixel'
  },
  defaults: {
    pixels: []
  },
  setup (options, nuxt) {
    const resolver = createResolver(import.meta.url)
    const head = nuxt.options.app.head
    head.noscript ??= []
    
    for (const pixel of options.pixels) {
      if (pixel.noscript === true) {
        head.noscript.push({ innerHTML: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${pixel.id}&ev=PageView&noscript=1"/>` })
      }
    }
    
    nuxt.options.runtimeConfig.public.metaPixel = defu(
      nuxt.options.runtimeConfig.public.metaPixel,
      options
    )

    addPlugin(resolver.resolve('./runtime/plugin.client'))
  }
})
