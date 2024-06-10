import {
  type ZephyrProcessPayload,
  type ZephyrInitiatePayload,
  decodeZephyrInitiatePayload,
  decodeZephyrProcessPayload
} from './generated/types';

export type ZephyrCallback = (payload: Record<string, unknown>) => void;

class ZephyrSDK {
  static initiatePayload: ZephyrInitiatePayload;
  static callback: ZephyrCallback;
  static processPayload: ZephyrProcessPayload;

  /**
   * @description Initiate the Zephyr SDK. Ensures all assets required for running Zephyr SDK services are pre-loaded.
   * @param payload {ZephyrInitiatePayload}
   * @param callbackFn {ZephyrCallback} - Optional
   * @returns void
   */
  static initiate(payload: ZephyrInitiatePayload, callbackFn?: ZephyrCallback): void {
    const decodedInitiatePayload = decodeZephyrInitiatePayload(payload);
    if (decodedInitiatePayload === null) {
      throw new Error('Invalid Initiate payload');
    }
    this.initiatePayload = decodedInitiatePayload;
    if (typeof callbackFn === 'function') {
      this.callback = callbackFn;
    }
    try {
      const script: HTMLScriptElement = document.createElement('script');
      script.src = 'https://sdk.breeze.in/electron/107.0.0/index.js';
      script.type = 'module';
      script.id = 'breeze-script-tag';
      script.async = true;
      script.setAttribute('data-merchantid', payload.merchantId);
      script.setAttribute('data-shopurl', payload.shopUrl);
      script.onload = () => {
        try {
          const hiddenElement = document.createElement('breeze-button');
          hiddenElement.style.display = 'none';
          document.body.appendChild(hiddenElement);
        } catch (e) {
          console.error('Error creating Breeze button', e);
        }
      };
      document.body.appendChild(script);
    } catch (e) {
      console.error('Error loading Breeze script', e);
    }
  }

  /**
   * @description Request Zephyr SDK to process your request.
   * @param payload {ZephyrProcessPayload} - The payload data required for the process request.
   * @param callbackFn {ZephyrCallback} - Optional
   */
  static process(payload: ZephyrProcessPayload, callbackFn?: ZephyrCallback): void {
    const decodedProcessPayload = decodeZephyrProcessPayload(payload);
    if (decodedProcessPayload === null) {
      throw new Error('Invalid Process payload');
    }
    if (typeof this.initiatePayload === 'undefined') {
      throw new Error('Call ZephyrSDK.initiate before calling ZephyrSDK.process');
    }

    this.processPayload = decodedProcessPayload;
    if (typeof callbackFn === 'function') {
      this.callback = callbackFn;
    }
    this.processPayload = payload;

    if (typeof window.breeze?.startCheckout === 'function') {
      window.breeze.startCheckout({ ...payload.cart, shopUrl: this.initiatePayload.shopUrl });
    } else {
      console.error('Breeze SDK not loaded');
    }
  }
}

if (typeof window !== 'undefined') {
  window.ZephyrSDK = ZephyrSDK;
}

export default ZephyrSDK;
