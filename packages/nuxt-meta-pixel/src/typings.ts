export interface Pixel {
  id: string
  autoconfig?: boolean
  pageView?: string
}

export interface ModuleOptions {
  [name: string]: Pixel
}