import { describe, it, expect } from 'vitest'
import { matchPath } from '../src/runtime/glob'

describe('matchPath', () => {
  it('matches everything with the default `**`', () => {
    expect(matchPath('/', '**')).toBe(true)
    expect(matchPath('/posts/hello', '**')).toBe(true)
  })

  it('matches a section with a globstar', () => {
    expect(matchPath('/posts/hello', '/posts/**')).toBe(true)
    expect(matchPath('/posts/hello/world', '/posts/**')).toBe(true)
    expect(matchPath('/about', '/posts/**')).toBe(false)
  })

  it('does not let a single star cross path separators', () => {
    expect(matchPath('/posts', '/*')).toBe(true)
    expect(matchPath('/posts/hello', '/*')).toBe(false)
  })

  it('supports negation with a leading `!`', () => {
    expect(matchPath('/posts/hello', '!/posts/**')).toBe(false)
    expect(matchPath('/about', '!/posts/**')).toBe(true)
  })

  it('matches a single character with `?`', () => {
    expect(matchPath('/a', '/?')).toBe(true)
    expect(matchPath('/ab', '/?')).toBe(false)
  })

  it('treats regex metacharacters as literals', () => {
    expect(matchPath('/posts.html', '/posts.html')).toBe(true)
    expect(matchPath('/postsXhtml', '/posts.html')).toBe(false)
  })
})
