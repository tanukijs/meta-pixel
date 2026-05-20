// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { renderToString } from 'react-dom/server'
import { MetaPixelProvider, useMetaPixel } from '../src'

// Runs in a pure Node environment: there is no `window`/`document` here, so if
// the provider (or anything it renders) touched the DOM during render — the
// classic "window is undefined" crash under Next.js SSR/RSC — this would throw.
describe('SSR (server render)', () => {
  function Probe() {
    const { $fbq } = useMetaPixel()
    // Calling the pixel during render must be a safe no-op on the server.
    $fbq('track', 'PageView')
    return <span>probe-ok</span>
  }

  it('renders without touching the DOM and exposes a no-op $fbq', () => {
    expect(typeof window).toBe('undefined')

    const html = renderToString(
      <MetaPixelProvider options={{ pixels: { main: { id: '123' } } }} pathname="/">
        <Probe />
      </MetaPixelProvider>,
    )

    expect(html).toContain('probe-ok')
  })
})
