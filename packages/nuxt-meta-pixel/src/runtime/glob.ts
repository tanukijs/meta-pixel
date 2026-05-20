/**
 * Minimal, dependency-free glob matcher for route paths.
 *
 * Replaces `minimatch` to avoid the `brace-expansion` ESM interop crash in Vite
 * dev (see issues #14 and #20). Only the subset used for `pageView` patterns is
 * supported:
 *   - `**` matches any characters, including `/`
 *   - `*`  matches any characters except `/` (a single path segment)
 *   - `?`  matches a single character except `/`
 *   - a leading `!` negates the whole pattern
 */

const SPECIAL = new Set('.+^${}()|[]\\'.split(''))

function globToRegExp(glob: string): RegExp {
  let re = ''

  for (let i = 0; i < glob.length; i++) {
    const char = glob[i]

    if (char === '*') {
      if (glob[i + 1] === '*') {
        re += '.*'
        i++
      } else {
        re += '[^/]*'
      }
    } else if (char === '?') {
      re += '[^/]'
    } else if (SPECIAL.has(char)) {
      re += '\\' + char
    } else {
      re += char
    }
  }

  return new RegExp('^' + re + '$')
}

export function matchPath(path: string, pattern: string): boolean {
  let negate = false
  let glob = pattern

  while (glob[0] === '!') {
    negate = !negate
    glob = glob.slice(1)
  }

  const matched = globToRegExp(glob).test(path)
  return negate ? !matched : matched
}
