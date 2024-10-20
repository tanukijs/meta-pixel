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
  defaults: {
    enabled: true,
  },
  setup (options, nuxt) {
    const resolver = createResolver(import.meta.url)
    
    nuxt.options.runtimeConfig.public.metapixel = defu(
      nuxt.options.runtimeConfig.public.metapixel,
      options
    )
    
    if(!nuxt.options.runtimeConfig.public.metapixel.enabled) {
      return
    }

    // minimatch > brace-expansion
    // Ensure we transform these cjs dependencies, remove as they get converted to ejs
    nuxt.options.vite.optimizeDeps ||= {}
    nuxt.options.vite.optimizeDeps.include ||= []
    nuxt.options.vite.optimizeDeps.include.push('brace-expansion')


    addPlugin({
      src: resolver.resolve('./runtime/plugin.client'),
      mode: 'client'
    })
  }
})
