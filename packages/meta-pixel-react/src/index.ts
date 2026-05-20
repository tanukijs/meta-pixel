export { MetaPixelProvider, type MetaPixelProviderProps } from './MetaPixelProvider'
export { useMetaPixel } from './useMetaPixel'
export { type MetaPixelContextValue } from './context'
export type { MetaPixelOptions, ReactPixel } from './typings'

// Re-export core types so consumers don't need a second import from `meta-pixel`.
export type { Consent, FacebookQuery, InitData } from 'meta-pixel'
