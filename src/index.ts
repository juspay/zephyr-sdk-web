import {
  type BlazeProcessPayload,
  type BlazeInitiatePayload,
  decodeBlazeInitiatePayload,
  decodeBlazeProcessPayload
} from './generated/types';

export type BlazeCallback = (payload: Record<string, unknown>) => void;

class BlazeSDK {
  static initiatePayload: BlazeInitiatePayload;
  static callback: BlazeCallback;
  static processPayload: BlazeProcessPayload;

  /**
   * @description Initiate the Blaze SDK. Ensures all assets required for running Blaze SDK services are pre-loaded.
   * @param payload {BlazeInitiatePayload}
   * @param callbackFn {BlazeCallback} - Optional
   * @returns void
   */
  static initiate(payload: BlazeInitiatePayload, callbackFn?: BlazeCallback): void {
    const decodedInitiatePayload = decodeBlazeInitiatePayload(payload);
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
      script.setAttribute('data-environment', payload.environment ?? 'production');
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
   * @description Request Blaze SDK to process your request.
   * @param payload {BlazeProcessPayload} - The payload data required for the process request.
   * @param callbackFn {BlazeCallback} - Optional
   */
  static process(payload: BlazeProcessPayload, callbackFn?: BlazeCallback): void {
    const decodedProcessPayload = decodeBlazeProcessPayload(payload);
    if (decodedProcessPayload === null) {
      throw new Error('Invalid Process payload');
    }
    if (typeof this.initiatePayload === 'undefined') {
      throw new Error('Call BlazeSDK.initiate before calling BlazeSDK.process');
    }

    this.processPayload = decodedProcessPayload;
    if (typeof callbackFn === 'function') {
      this.callback = callbackFn;
    }
    this.processPayload = payload;

    if (typeof window.breeze?.startCheckout === 'function') {
      window.breeze.startCheckout({ ...payload, shopUrl: this.initiatePayload.shopUrl });
    } else {
      console.error('Breeze SDK not loaded');
    }
  }
}

if (typeof window !== 'undefined') {
  window.BlazeSDK = BlazeSDK;
}

export default BlazeSDK;
