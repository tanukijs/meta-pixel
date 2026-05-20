import type { Consent, FacebookQuery, InitData, Setup } from './typings'

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
  // `consent` is a global Meta Pixel setting (the command takes no pixel id),
  // so it applies to every pixel. Call `consent('revoke')` BEFORE `init` to hold
  // event delivery, then `consent('grant')` once the user has opted in.
  // @see https://developers.facebook.com/docs/meta-pixel/implementation/gdpr/
  function consent (consent: Consent) {
    $fbq('consent', consent)
    return setup($fbq)
  }

  // `advancedMatching` lets you pass hashed/plain customer data (email, phone, …)
  // to Meta at init for better attribution. Every field is sent as a string.
  // @see https://developers.facebook.com/docs/meta-pixel/advanced/advanced-matching/
  function init (pixelId: string, autoConfig: boolean = true, advancedMatching?: InitData) {
    $fbq('set', 'autoConfig', autoConfig, pixelId)
    $fbq('init', pixelId, advancedMatching)
    return setup($fbq)
  }
  
  function pageView (pixelId?: string) {
    if (pixelId === undefined) {
      $fbq('track', 'PageView')
    } else {
      $fbq('trackSingle', pixelId, 'PageView')
    }

    return setup($fbq)
  }

  return {
    $fbq,
    consent,
    init,
    pageView
  }
}
