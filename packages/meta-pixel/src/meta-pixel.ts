import type { FacebookQuery, Setup } from './typings'

export * from './typings'

export function addScript(f: Window, b: Document, e: string, v: string, n?: any, t?: HTMLScriptElement, s?: HTMLScriptElement): FacebookQuery {
  if (f.fbq) { return f.fbq }

  n = f.fbq = function() {
    if (n.callMethod) {
      // eslint-disable-next-line prefer-spread, prefer-rest-params
      n.callMethod.apply(n, arguments)
    } else {
      // eslint-disable-next-line prefer-rest-params
      n.queue.push(arguments)
    }
  } as unknown as FacebookQuery

  if (!f._fbq) { f._fbq = n }

  n.push = n
  n.loaded = true
  n.version = '2.0'
  n.queue = []

  t = b.createElement(e) as HTMLScriptElement
  t.async = true
  t.src = v

  s = b.getElementsByTagName(e)[0] as HTMLScriptElement
  s.parentNode!.insertBefore(t, s)

  return n
}

export function addScriptDefault() {
  return addScript(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
}

export function setup($fbq: FacebookQuery = addScriptDefault()): Setup {
  function init (pixelId: string, autoconfig: boolean = true) {
    $fbq('set', 'autoConfig', autoconfig, pixelId)
    $fbq('init', pixelId)
    return setup($fbq)
  } 
  
  function pageView () {
    $fbq('track', 'PageView')
    return { $fbq }
  }

  return {
    $fbq,
    init,
    pageView
  }
}
