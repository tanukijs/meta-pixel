import { describe, expect, it } from 'vitest'
import { matchPath } from '../src/glob'

describe('matchPath', () => {
  it('matches everything with **', () => {
    expect(matchPath('/', '**')).toBe(true)
    expect(matchPath('/a/b/c', '**')).toBe(true)
  })

  it('* stays within a single segment', () => {
    expect(matchPath('/products', '/*')).toBe(true)
    expect(matchPath('/products/42', '/*')).toBe(false)
    expect(matchPath('/products/42', '/products/*')).toBe(true)
  })

  it('** crosses segments', () => {
    expect(matchPath('/products/42/reviews', '/products/**')).toBe(true)
  })

  it('? matches a single non-slash char', () => {
    expect(matchPath('/a', '/?')).toBe(true)
    expect(matchPath('/ab', '/?')).toBe(false)
  })

  it('leading ! negates', () => {
    expect(matchPath('/admin', '!/admin/**')).toBe(true)
    expect(matchPath('/admin/users', '!/admin/**')).toBe(false)
  })

  it('escapes regex special characters literally', () => {
    expect(matchPath('/a.b', '/a.b')).toBe(true)
    expect(matchPath('/axb', '/a.b')).toBe(false)
  })
})
