export interface Pixel {
  id: number | string
  autoconfig?: boolean
  pageView?: string
}

export interface ModuleOptions {
  enabled?: boolean
  pixels: {
    [name: string]: Pixel
  }
}