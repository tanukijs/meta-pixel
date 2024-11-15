interface EventOptions {
  content_category?: string
  content_ids?: Array<string | number>
  content_name?: string
  content_type?: string
  contents?: [{ name: string, quantity: number }]
  currency?: string
  num_items?: number
  predicted_ltv?: number
  search_string?: string
  status?: boolean
  value?: number
}

type InitData = {
  em?: string
  fn?: string
  ln?: string
  ph?: number
  external_id?: string
  ge?: '' | 'f' | 'm'
  db?: number
  ct?: string
  st?: string
  zp?: string
  country?: string
}
type AddPaymentInfoData = Pick<EventOptions, 'content_category' | 'content_ids' | 'contents' | 'currency' | 'value'>
type AddToCartData = Pick<EventOptions, 'content_ids' | 'content_name' | 'content_type' | 'contents' | 'currency' | 'value'>
type AddToWishlist = Pick<EventOptions, 'content_name' | 'content_category' | 'content_ids' | 'contents' | 'currency' | 'value'>
type CompleteRegistrationData = Pick<EventOptions, 'content_name' | 'currency' | 'status' | 'value'>
type InitiateCheckoutData = Pick<EventOptions, 'content_category' | 'content_ids' | 'contents' | 'currency' | 'num_items' | 'value'>
type LeadData = Pick<EventOptions, 'content_category' | 'content_name' | 'currency' | 'value'>
type PurchaseData = Pick<EventOptions, 'content_ids' | 'content_name' | 'content_type' | 'contents' | 'num_items'> & Required<Pick<EventOptions, 'currency' | 'value'>>
type ScheduleData = Pick<EventOptions, 'content_category' | 'content_ids' | 'content_type' | 'contents' | 'currency' | 'search_string' | 'value'>
type StartTrialData = Pick<EventOptions, 'currency' | 'predicted_ltv' | 'value'>
type SubscribeData = Pick<EventOptions, 'currency' | 'predicted_ltv' | 'value'>
type ViewContentData = Pick<EventOptions, 'content_ids' | 'content_category' | 'content_name' | 'content_type' | 'contents' | 'currency' | 'value'>

interface FacebookQueryExtra {
  eventID: string
}

type Events = {
  AddPaymentInfo: (data?: AddPaymentInfoData, extra?: FacebookQueryExtra) => void
  AddToCart: (data?: AddToCartData, extra?: FacebookQueryExtra) => void
  AddToWishlist: (data?: AddToWishlist, extra?: FacebookQueryExtra) => void
  CompleteRegistration: (data?: CompleteRegistrationData, extra?: FacebookQueryExtra) => void
  Contact: (data?: Record<string, any>, extra?: FacebookQueryExtra) => void
  CustomizeProduct: (data?: Record<string, any>, extra?: FacebookQueryExtra) => void
  Donate: (data?: Record<string, any>, extra?: FacebookQueryExtra) => void
  FindLocation: (data?: Record<string, any>, extra?: FacebookQueryExtra) => void
  InitiateCheckout: (data?: InitiateCheckoutData, extra?: FacebookQueryExtra) => void
  Lead: (data?: LeadData, extra?: FacebookQueryExtra) => void
  PageView: () => void
  Purchase: (data: PurchaseData, extra?: FacebookQueryExtra) => void
  Schedule: (data: ScheduleData, extra?: FacebookQueryExtra) => void
  Search: (data?: Record<string, any>, extra?: FacebookQueryExtra) => void
  StartTrial: (data?: StartTrialData, extra?: FacebookQueryExtra) => void
  SubmitApplication: (data?: Record<string, any>, extra?: FacebookQueryExtra) => void
  Subscribe: (data?: SubscribeData, extra?: FacebookQueryExtra) => void
  ViewContent: (data?: ViewContentData, extra?: FacebookQueryExtra) => void
}

type Args<T, E extends keyof T> = T[E] extends (...args: infer A) => void ? A : never;

// @see https://developers.facebook.com/docs/meta-pixel/reference/
export interface FacebookQuery {
  disablePushState: boolean;
  (command: 'init', pixelId: string, data?: InitData): void
  (command: 'set', key: string, value1: any, value2: any): void
  <E extends keyof Events>(command: 'track', event: E, ...args: Args<Events, E>): void
  (command: 'trackCustom', event: string, data?: any): void
  <E extends keyof Events>(command: 'trackSingle', pixelId: string, event: E, ...args: Args<Events, E>): void
  (command: 'trackSingleCustom', pixelId: string, event: string, data?: any): void
}

export interface Setup {
  $fbq: FacebookQuery
  init(pixelId: string, autoconfig?: boolean): Setup
  pageView(pixelId?: string): Setup
} 

declare global {
  interface Window {
    fbq?: FacebookQuery
    _fbq?: FacebookQuery
  }
}