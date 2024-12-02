import BlazeIframe from './iframe';
import type { CallbackFn } from './types';

class BlazeSDK {
  static initiatePayload: Record<string, unknown>;
  static callback: CallbackFn;
  static processPayload: Record<string, unknown>;

  /**
   * @description Initiate the Blaze SDK. Ensures all assets required for running Blaze SDK services are pre-loaded.
   * @param payload {Record<string, unknown>}
   * @param callbackFn {CallbackFn} - Mandatory method required to receive events from Blaze SDK.
   * @returns void
   */
  static initiate(payload: Record<string, unknown>, callbackFn: CallbackFn): void {
    this.callback = callbackFn;
    this.initiatePayload = payload;
    BlazeIframe.initiate(payload, callbackFn);
  }

  /**
   * @description Request Blaze SDK to process your request.
   * @param payload {Record<string, unknown>} - The payload data required for the process request.
   */
  static process(payload: Record<string, unknown>): void {
    this.processPayload = payload;
    BlazeIframe.process(payload);
  }

  /**
   * @description Terminate the Blaze SDK.
   * Ensures all assets required for running Blaze SDK services are pre-loaded.
   */

  static terminate(): void {
    BlazeIframe.terminate();
  }
}

export default BlazeSDK;
