import { defineNuxtPlugin, useRuntimeConfig, useRouter } from '#app'
import { addScript } from 'meta-pixel'
import { minimatch } from 'minimatch'
import type { ModuleOptions } from '../types'

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  const router = useRouter()
  const fbq = addScript(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
  const opts = runtimeConfig.public.nuxtMetaPixel as ModuleOptions
  
  for (const pixel of opts.pixels) {
    console.log('init')
    const autoConfig = pixel.autoConfig === undefined ? true : pixel.autoConfig
    fbq('set', 'autoConfig', autoConfig, pixel.id)
    fbq('init', pixel.id)
  }
  
  fbq('track', 'PageView')

  router.afterEach((route) => {
    for (const pixel of opts.pixels) {
      if (pixel.autoPageView === undefined) continue
  
      const match = minimatch(route.path, pixel.autoPageView)
      
      if (match) {
        console.log({pixelId: pixel.id, path: route.path, autoPageView: pixel.autoPageView, match})
        //fbq('trackSingle', pixel.id, 'PageView')
      }
    }
  })

  return {
    provide: {
      fbq
    }
  }
})
