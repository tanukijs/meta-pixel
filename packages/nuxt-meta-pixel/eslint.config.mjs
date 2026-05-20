// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt()
  .append({
    ignores: ['dist', 'playground/.nuxt', 'playground/.output', 'test/fixtures/**/.nuxt'],
  })
  .append({
    rules: {
      // Nuxt's file-based routing requires single-word page names (index, about, ...).
      'vue/multi-word-component-names': 'off',
    },
  })
  .append({
    // The playground is illustrative dev-only code (not shipped); allow the
    // demo to declare API symbols it only references in commented examples.
    files: ['playground/**'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  })
