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
    
    nuxt.options.runtimeConfig.public.metaPixel = defu(
      nuxt.options.runtimeConfig.public.metaPixel,
      options
    )

    addPlugin(resolver.resolve('./runtime/plugin.client'))
  }
})
