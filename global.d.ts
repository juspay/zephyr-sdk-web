import type { BlazeSDK } from './src';

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    BlazeSDK: typeof BlazeSDK;
    BlazeSDKWeb: typeof BlazeSDK;
    blazeCallback?: (response: Record<string, unknown>) => void;
  }
}
