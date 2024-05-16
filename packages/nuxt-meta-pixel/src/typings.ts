export interface Pixel {
  id: string
  noscript?: boolean
  autoconfig?: boolean
}

export interface ModuleOptions {
  pixels: Pixel[]
}