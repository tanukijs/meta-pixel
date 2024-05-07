export interface Pixel {
  pixelId: string
  routes: string[]
}
export interface ModuleOptions {
  pixelId: string
  pixels?: Pixel[];
  autoConfig: boolean
  noscript: boolean
}