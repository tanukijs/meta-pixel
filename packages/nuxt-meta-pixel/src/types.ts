export interface Pixel {
  id: string
  noscript?: boolean
  autoConfig?: boolean
  autoPageView?: string[]
}

export interface ModuleOptions {
  pixels: Pixel[]
}
