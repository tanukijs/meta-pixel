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
    pixels: {}
  },
  setup (options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.public.metapixel = defu(
      nuxt.options.runtimeConfig.public.metapixel,
      options
    )

    // Transpile the runtime through Nuxt's pipeline so the `#imports` virtual
    // alias used by the plugin resolves in consuming apps. Without this, a
    // consumer's Vite may pre-bundle the runtime from node_modules and fail to
    // resolve the alias (#12).
    nuxt.options.build.transpile.push(resolver.resolve('./runtime'))

    addPlugin(resolver.resolve('./runtime/plugin.client'))
  }
})
