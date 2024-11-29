import('./style.css');
import BlazeSDK from '@juspay/blaze-sdk-web';

const uuidV4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

function createSDKPayload(payload: Record<string, unknown>): Record<string, unknown> {
  return {
    requestId: Math.random().toString(36).substring(7),
    service: 'in.breeze.onecco',
    payload
  };
}

function createInitiatePayload() {
  return {
    merchantId: 'd2cstore',
    environment: 'release',
    shopUrl: 'https://breeze-it-store.myshopify.com'
  };
}

function createProcessPayload() {
  return {
    action: 'startCheckout',
    cart: {
      token:
        'Z2NwLWFzaWEtc291dGhlYXN0MTowMUo4SFY4RjBGUUpSQU0xNlBOUFBBWTlCTQ?key=4eb243b9901c080606e65b541fa40600',
      note: '',
      attributes: {},
      original_total_price: 700,
      total_price: 700,
      total_discount: 0,
      total_weight: 0.0,
      item_count: 1,
      items: [
        {
          id: 44182614474984,
          properties: {},
          quantity: 1,
          variant_id: 44182614474984,
          key: '44182614474984:14a856f03fde63adbb7df3da56d64b10',
          title: 'Blackout Shirt - black',
          price: 700,
          original_price: 700,
          presentment_price: 7.0,
          discounted_price: 700,
          line_price: 700,
          original_line_price: 700,
          total_discount: 0,
          discounts: [],
          sku: '1233',
          grams: 0,
          vendor: 'Bombay Shirt Company',
          taxable: true,
          product_id: 8070198591720,
          product_has_only_default_variant: false,
          gift_card: false,
          final_price: 700,
          final_line_price: 700,
          url: '/products/blackout-shirt?variant=44182614474984',
          featured_image: {
            aspect_ratio: 1.0,
            alt: 'Blackout Shirt',
            height: 1200,
            url: 'https://cdn.shopify.com/s/files/1/0647/6526/4104/products/bmb1.webp?v=1670259737',
            width: 1200
          },
          image: 'https://cdn.shopify.com/s/files/1/0647/6526/4104/products/bmb1.webp?v=1670259737',
          handle: 'blackout-shirt',
          requires_shipping: true,
          product_type: '',
          product_title: 'Blackout Shirt',
          product_description: 'Built for your adventures after dark.',
          variant_title: 'black',
          variant_options: ['black'],
          options_with_values: [{ name: 'Color', value: 'black' }],
          line_level_discount_allocations: [],
          line_level_total_discount: 0,
          has_components: false
        }
      ],
      requires_shipping: true,
      currency: 'INR',
      items_subtotal_price: 700,
      cart_level_discount_applications: []
    }
  };
}

function initiateSDK(): void {
  BlazeSDK.initiate(createSDKPayload(createInitiatePayload()), (event) => {
    console.log("callback: ", event);
  });
}

function processSDK(): void {
  BlazeSDK.process(createSDKPayload(createProcessPayload()));
}

window.initiateSDK = initiateSDK;
window.processSDK = processSDK;
