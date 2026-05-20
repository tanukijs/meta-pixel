import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Most tests exercise client behaviour in a DOM; the SSR test opts into a
    // pure `node` environment via a `// @vitest-environment node` docblock so a
    // stray `window`/`document` access during render would actually throw.
    environment: 'jsdom',
    globals: true,
  },
})
