// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, renderHook } from '@testing-library/react'
import { MetaPixelProvider } from '../src/MetaPixelProvider'
import { useMetaPixel } from '../src/useMetaPixel'
import type { MetaPixelOptions } from '../src/typings'

// Mock the core so we assert exactly which commands the provider issues,
// without injecting a real <script> into jsdom.
const { controller, setupMock } = vi.hoisted(() => {
  const $fbq = vi.fn() as ReturnType<typeof vi.fn> & { disablePushState?: boolean }
  const ctrl = {
    $fbq,
    consent: vi.fn(() => ctrl),
    init: vi.fn(() => ctrl),
    pageView: vi.fn(() => ctrl),
  }
  return { controller: ctrl, setupMock: vi.fn(() => ctrl) }
})

vi.mock('meta-pixel', () => ({ setup: setupMock }))

beforeEach(() => {
  vi.clearAllMocks()
})

describe('MetaPixelProvider', () => {
  it('initializes each pixel on mount, forwarding autoConfig and advanced matching', () => {
    render(
      <MetaPixelProvider
        options={{
          pixels: {
            a: { id: '111', advancedMatching: { em: 'jane@doe.com' } },
            b: { id: '222', autoConfig: false },
          },
        }}
      />,
    )

    expect(setupMock).toHaveBeenCalledTimes(1)
    expect(controller.init).toHaveBeenCalledWith('111', undefined, { em: 'jane@doe.com' })
    expect(controller.init).toHaveBeenCalledWith('222', false, undefined)
  })

  it('revokes consent globally BEFORE any init', () => {
    render(<MetaPixelProvider options={{ consent: 'revoke', pixels: { a: { id: '111' } } }} />)

    expect(controller.consent).toHaveBeenCalledWith('revoke')
    const consentOrder = controller.consent.mock.invocationCallOrder[0]
    const initOrder = controller.init.mock.invocationCallOrder[0]
    expect(consentOrder).toBeLessThan(initOrder)
  })

  it('loads and sends nothing when disabled', () => {
    render(<MetaPixelProvider options={{ enabled: false, pixels: { a: { id: '111' } } }} pathname="/" />)

    expect(setupMock).not.toHaveBeenCalled()
    expect(controller.init).not.toHaveBeenCalled()
    expect(controller.pageView).not.toHaveBeenCalled()
  })

  it('fires PageView only for pixels whose glob matches the pathname', () => {
    render(
      <MetaPixelProvider
        options={{ pixels: { a: { id: '111', pageView: '/products/**' } } }}
        pathname="/products/42"
      />,
    )
    expect(controller.pageView).toHaveBeenCalledWith('111')
  })

  it('does not fire PageView when the glob does not match', () => {
    render(
      <MetaPixelProvider
        options={{ pixels: { a: { id: '111', pageView: '/products/**' } } }}
        pathname="/about"
      />,
    )
    expect(controller.pageView).not.toHaveBeenCalled()
  })

  it('re-fires PageView on pathname change', () => {
    const options: MetaPixelOptions = { pixels: { a: { id: '111' } } }
    const { rerender } = render(<MetaPixelProvider options={options} pathname="/a" />)
    expect(controller.pageView).toHaveBeenCalledTimes(1)

    rerender(<MetaPixelProvider options={options} pathname="/b" />)
    expect(controller.pageView).toHaveBeenCalledTimes(2)
  })

  it('does not fire automatic PageView when no pathname is given', () => {
    render(<MetaPixelProvider options={{ pixels: { a: { id: '111' } } }} />)
    expect(controller.init).toHaveBeenCalled()
    expect(controller.pageView).not.toHaveBeenCalled()
  })
})

describe('useMetaPixel', () => {
  it('throws when used outside a provider', () => {
    expect(() => renderHook(() => useMetaPixel())).toThrow(/MetaPixelProvider/)
  })

  it('exposes $fbq, consent and pageView inside the provider', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MetaPixelProvider options={{ pixels: { a: { id: '111' } } }}>{children}</MetaPixelProvider>
    )
    const { result } = renderHook(() => useMetaPixel(), { wrapper })

    expect(typeof result.current.$fbq).toBe('function')
    expect(typeof result.current.consent).toBe('function')
    expect(typeof result.current.pageView).toBe('function')
  })
})
