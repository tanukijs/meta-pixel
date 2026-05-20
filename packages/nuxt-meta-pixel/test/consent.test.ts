import { describe, it, expect } from 'vitest'
import { setup, type FacebookQuery } from 'meta-pixel'

function mockFbq() {
  const calls: unknown[][] = []
  const fbq = ((...args: unknown[]) => {
    calls.push(args)
  }) as unknown as FacebookQuery
  return { fbq, calls }
}

describe('consent', () => {
  it('issues the global consent command (no pixel id)', () => {
    const { fbq, calls } = mockFbq()
    setup(fbq).consent('revoke')
    expect(calls).toContainEqual(['consent', 'revoke'])
  })

  it('revokes before init so nothing is sent until granted', () => {
    const { fbq, calls } = mockFbq()
    setup(fbq).consent('revoke').init('123', true)

    const consentIdx = calls.findIndex(c => c[0] === 'consent')
    const initIdx = calls.findIndex(c => c[0] === 'init')
    expect(consentIdx).toBeGreaterThanOrEqual(0)
    expect(consentIdx).toBeLessThan(initIdx)
  })

  it('does not touch consent when never called (backward compatible)', () => {
    const { fbq, calls } = mockFbq()
    setup(fbq).init('123', true)
    expect(calls.some(c => c[0] === 'consent')).toBe(false)
  })
})
