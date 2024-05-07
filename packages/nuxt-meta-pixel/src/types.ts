export interface Pixel {
  id: string
  noscript?: boolean
  autoConfig?: boolean
}

export interface ModuleOptions {
  pixel?: Pixel
  pixels?: Pixel[]
}

export type PluginOptions = Required<Pick<ModuleOptions, 'pixels'>>