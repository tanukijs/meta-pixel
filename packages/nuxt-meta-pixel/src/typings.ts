export interface Pixel {
  id: number | string
  autoconfig?: boolean
  pageView?: string
}

export interface ModuleOptions {
  [name: string]: Pixel
}