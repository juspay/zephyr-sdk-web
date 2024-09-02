import type { BlazeSDK } from './src';

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    BlazeSDK: typeof BlazeSDK;
    breeze?: {
      startCheckout: (cart: Record<string, unknown>) => void;
    };
  }
}
