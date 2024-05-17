interface InitData {
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

interface EventData {
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

type AddPaymentInfoData = Pick<EventData, 'content_category' | 'content_ids' | 'contents' | 'currency' | 'value'>
type AddToCartData = Pick<EventData, 'content_ids' | 'content_name' | 'content_type' | 'contents' | 'currency' | 'value'>
type AddToWishlist = Pick<EventData, 'content_name' | 'content_category' | 'content_ids' | 'contents' | 'currency' | 'value'>
type CompleteRegistrationData = Pick<EventData, 'content_name' | 'currency' | 'status' | 'value'>
type InitiateCheckoutData = Pick<EventData, 'content_category' | 'content_ids' | 'contents' | 'currency' | 'num_items' | 'value'>
type LeadData = Pick<EventData, 'content_category' | 'content_name' | 'currency' | 'value'>
type PurchaseData = Pick<EventData, 'content_ids' | 'content_name' | 'content_type' | 'contents' | 'num_items'> & Required<Pick<EventData, 'currency' | 'value'>>
type ScheduleData = Pick<EventData, 'content_category' | 'content_ids' | 'content_type' | 'contents' | 'currency' | 'search_string' | 'value'>
type StartTrialData = Pick<EventData, 'currency' | 'predicted_ltv' | 'value'>
type SubscribeData = Pick<EventData, 'currency' | 'predicted_ltv' | 'value'>
type ViewContentData = Pick<EventData, 'content_ids' | 'content_category' | 'content_name' | 'content_type' | 'contents' | 'currency' | 'value'>

interface FacebookQueryExtra {
  eventID: string
}

// @see https://developers.facebook.com/docs/meta-pixel/reference/
export interface FacebookQuery {
  disablePushState: boolean
  (command: 'init', pixelId: string, data?: InitData): void
  (command: 'set', key: string, value1: any, value2: any): void
  (command: 'track', event: 'AddPaymentInfo', data?: AddPaymentInfoData, extra?: FacebookQueryExtra): void
  (command: 'track', event: 'AddToCart', data?: AddToCartData, extra?: FacebookQueryExtra): void
  (command: 'track', event: 'AddToWishlist', data?: AddToWishlist, extra?: FacebookQueryExtra): void
  (command: 'track', event: 'CompleteRegistration', data?: CompleteRegistrationData, extra?: FacebookQueryExtra): void
  (command: 'track', event: 'Contact', data?: Record<string, any>, extra?: FacebookQueryExtra): void
  (command: 'track', event: 'CustomizeProduct', data?: Record<string, any>, extra?: FacebookQueryExtra): void
  (command: 'track', event: 'Donate', data?: Record<string, any>, extra?: FacebookQueryExtra): void
  (command: 'track', event: 'FindLocation', data?: Record<string, any>, extra?: FacebookQueryExtra): void
  (command: 'track', event: 'InitiateCheckout', data?: InitiateCheckoutData, extra?: FacebookQueryExtra): void
  (command: 'track', event: 'Lead', data?: LeadData, extra?: FacebookQueryExtra): void
  (command: 'track', event: 'PageView'): void
  (command: 'track', event: 'Purchase', data: PurchaseData, extra?: FacebookQueryExtra): void
  (command: 'track', event: 'Schedule', data: ScheduleData, extra?: FacebookQueryExtra): void
  (command: 'track', event: 'Search', data?: Record<string, any>, extra?: FacebookQueryExtra): void
  (command: 'track', event: 'StartTrial', data?: StartTrialData, extra?: FacebookQueryExtra): void
  (command: 'track', event: 'SubmitApplication', data?: Record<string, any>, extra?: FacebookQueryExtra): void
  (command: 'track', event: 'Subscribe', data?: SubscribeData, extra?: FacebookQueryExtra): void
  (command: 'track', event: 'ViewContent', data?: ViewContentData, extra?: FacebookQueryExtra): void
  (command: 'trackCustom', event: string, data?: any): void
  (command: 'trackSingle', pixelId: string, event: 'AddPaymentInfo', data?: AddPaymentInfoData, extra?: FacebookQueryExtra): void
  (command: 'trackSingle', pixelId: string, event: 'AddToCart', data?: AddToCartData, extra?: FacebookQueryExtra): void
  (command: 'trackSingle', pixelId: string, event: 'AddToWishlist', data?: AddToWishlist, extra?: FacebookQueryExtra): void
  (command: 'trackSingle', pixelId: string, event: 'CompleteRegistration', data?: CompleteRegistrationData, extra?: FacebookQueryExtra): void
  (command: 'trackSingle', pixelId: string, event: 'Contact', data?: Record<string, any>, extra?: FacebookQueryExtra): void
  (command: 'trackSingle', pixelId: string, event: 'CustomizeProduct', data?: Record<string, any>, extra?: FacebookQueryExtra): void
  (command: 'trackSingle', pixelId: string, event: 'Donate', data?: Record<string, any>, extra?: FacebookQueryExtra): void
  (command: 'trackSingle', pixelId: string, event: 'FindLocation', data?: Record<string, any>, extra?: FacebookQueryExtra): void
  (command: 'trackSingle', pixelId: string, event: 'InitiateCheckout', data?: InitiateCheckoutData, extra?: FacebookQueryExtra): void
  (command: 'trackSingle', pixelId: string, event: 'Lead', data?: LeadData, extra?: FacebookQueryExtra): void
  (command: 'trackSingle', pixelId: string, event: 'PageView'): void
  (command: 'trackSingle', pixelId: string, event: 'Purchase', data: PurchaseData, extra?: FacebookQueryExtra): void
  (command: 'trackSingle', pixelId: string, event: 'Schedule', data: ScheduleData, extra?: FacebookQueryExtra): void
  (command: 'trackSingle', pixelId: string, event: 'Search', data?: Record<string, any>, extra?: FacebookQueryExtra): void
  (command: 'trackSingle', pixelId: string, event: 'StartTrial', data?: StartTrialData, extra?: FacebookQueryExtra): void
  (command: 'trackSingle', pixelId: string, event: 'SubmitApplication', data?: Record<string, any>, extra?: FacebookQueryExtra): void
  (command: 'trackSingle', pixelId: string, event: 'Subscribe', data?: SubscribeData, extra?: FacebookQueryExtra): void
  (command: 'trackSingle', pixelId: string, event: 'ViewContent', data?: ViewContentData, extra?: FacebookQueryExtra): void
  (command: 'trackSingleCustom', pixelId: string, event: string, data?: any): void
  (command: 'send', ...args: any[]): void
  (command: 'on', ...args: any[]): void
  (command: 'loadPlugin', ...args: any[]): void
  (command: 'dataProcessingOptions', ...args: any[]): void
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
