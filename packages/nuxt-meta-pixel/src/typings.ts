export interface Pixel {
  id: number | string
  consent?: string
  autoconfig?: boolean
  pageView?: string
}

export interface ModuleOptions {
  [name: string]: Pixel
}