import { defineNuxtPlugin } from '#app'
import { addScript } from 'meta-pixel'
import type { ModuleOptions } from '../module'

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  const router = useRouter()
  const fbq = addScript(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
  const opts = runtimeConfig.public.nuxtMetaPixel as ModuleOptions

  fbq('set', 'autoConfig', opts.autoConfig, opts.pixelId)
  fbq('init', opts.pixelId)
  fbq('track', 'PageView')

  router.afterEach(() => {
    fbq('track', 'PageView')
  })

  nuxtApp.provide('fbq', fbq)
})
