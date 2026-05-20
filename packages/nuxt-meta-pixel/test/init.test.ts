import { describe, it, expect } from 'vitest'
import { setup, type FacebookQuery } from 'meta-pixel'

function mockFbq() {
  const calls: unknown[][] = []
  const fbq = ((...args: unknown[]) => {
    calls.push(args)
  }) as unknown as FacebookQuery
  return { fbq, calls }
}

describe('init', () => {
  it('passes advanced matching data to fbq init', () => {
    const { fbq, calls } = mockFbq()
    setup(fbq).init('123', true, { em: 'user@example.com' })
    expect(calls).toContainEqual(['set', 'autoConfig', true, '123'])
    expect(calls).toContainEqual(['init', '123', { em: 'user@example.com' }])
  })

  it('initializes without advanced matching when not provided', () => {
    const { fbq, calls } = mockFbq()
    setup(fbq).init('123')
    expect(calls).toContainEqual(['init', '123', undefined])
  })
})
