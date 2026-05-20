import { addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import { defu } from 'defu'
import type { ModuleOptions } from './typings'

declare module '@nuxt/schema' {
  interface PublicRuntimeConfig {
    metapixel: ModuleOptions
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-meta-pixel',
    configKey: 'metapixel'
  },
  setup (options, nuxt) {
    const resolver = createResolver(import.meta.url)
    
    nuxt.options.runtimeConfig.public.metapixel = defu(
      nuxt.options.runtimeConfig.public.metapixel,
      options
    )

    addPlugin(resolver.resolve('./runtime/plugin.client'))
  }
})
