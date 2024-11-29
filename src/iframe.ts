import type { CallbackFn } from './types';

let initiateQueue: Array<Record<string, unknown>> = [];
let processQueue: Array<Record<string, unknown>> = [];

function initiate(payload: Record<string, unknown>, callbackFn: CallbackFn): void {
  try {
    const script: HTMLScriptElement = document.createElement('script');
    script.src = 'https://sdk.breeze.in/electron/171.0.2/index.js';
    script.type = 'module';
    script.id = 'breeze-script-tag';
    script.async = true;

    initiateQueue.push(payload);

    const payloadData: Record<string, unknown> =
      isJSON(payload) && isJSON(payload.payload) ? payload.payload : {};

    const merchantId = typeof payloadData.merchantId === 'string' ? payloadData.merchantId : null;
    const shopUrl = typeof payloadData.shopUrl === 'string' ? payloadData.shopUrl : null;
    const shopId = typeof payloadData.shopId === 'string' ? payloadData.shopId : null;
    const environment =
      typeof payloadData.environment === 'string' ? payloadData.environment : 'production';

    if (merchantId !== null) {
      script.setAttribute('data-merchantid', merchantId);
    }

    if (shopUrl !== null) {
      script.setAttribute('data-shopurl', shopUrl);
    }

    if (shopId !== null) {
      script.setAttribute('data-shopid', shopId);
    }

    script.setAttribute('data-environment', environment);
    script.onload = () => {
      try {
        const hiddenElement = document.createElement('breeze-button');
        hiddenElement.style.display = 'none';
        document.body.appendChild(hiddenElement);
        drainQueue(callbackFn);
      } catch (e) {
        console.error('Error creating Breeze button', e);
      }
    };

    document.body.appendChild(script);
  } catch (e) {}
}

function process(payload: Record<string, unknown>): void {
  if (typeof window.BlazeSDK === 'object' && typeof window.BlazeSDK.process === 'function') {
    window.BlazeSDK.process(payload);
  } else {
    processQueue.push(payload);
  }
}

function drainQueue(callbackFn: CallbackFn): boolean {
  const isSDKLoaded =
    typeof window.BlazeSDK === 'object' &&
    typeof window.BlazeSDK.initiate === 'function' &&
    typeof window.BlazeSDK.process === 'function';

  if (isSDKLoaded) {
    if (initiateQueue.length > 0) {
      window.BlazeSDK.initiate(initiateQueue.at(0), callbackFn);
      initiateQueue = [];
    }

    if (processQueue.length > 0) {
      const processQueueData = processQueue;
      processQueue = [];
      processQueueData.forEach((payload) => {
        window.BlazeSDK.process(payload);
      });
    }
    return true;
  } else {
    let attempts = 0;
    const intervalId = setInterval(() => {
      if (attempts > 5) {
        clearInterval(intervalId);
      }
      const drainStatus = drainQueue(callbackFn);

      if (drainStatus) {
        clearInterval(intervalId);
      }
      attempts++;
    });
  }
  return false;
}

function isJSON(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && !Array.isArray(value) && value !== null;
}

export default { initiate, process };
