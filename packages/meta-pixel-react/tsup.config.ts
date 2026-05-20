import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  treeshake: true,
  // Consumers bring their own React; meta-pixel is a runtime dependency.
  external: ['react', 'meta-pixel'],
})
