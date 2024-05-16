export interface Pixel {
  id: string
  noscript?: boolean
  autoconfig?: boolean
  pageView?: string
}

export interface ModuleOptions {
  pixels: Pixel[]
}