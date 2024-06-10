import type { JSONObject } from 'type-decoder';
import type { ZephyrSDK } from './src';

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    ZephyrSDK: typeof ZephyrSDK;
    breeze?: {
      startCheckout: (cart: JSONObject) => void;
    };
  }
}
