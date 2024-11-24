import BlazeSDK from '.';
import type { CallbackFn } from './types';

type RecordOrString = Record<string, unknown> | string;

function initiate(payload: RecordOrString, callbackFn: CallbackFn | null): void {
  const initiatePayload: Record<string, unknown> =
    typeof payload === 'string' ? safeParseJson(payload) : payload;
  const _callbackFn: CallbackFn =
    typeof callbackFn === 'function'
      ? callbackFn
      : typeof window.blazeCallback === 'function'
        ? window.blazeCallback
        : () => {};

  BlazeSDK.initiate(initiatePayload, _callbackFn);
}

function process(payload: RecordOrString): void {
  const processPayload: Record<string, unknown> =
    typeof payload === 'string' ? safeParseJson(payload) : payload;
  BlazeSDK.process(processPayload);
}

function safeParseJson(payload: string): Record<string, unknown> {
  try {
    return JSON.parse(payload);
  } catch (e) {
    return {};
  }
}

function injectMethods(): void {
  window.BlazeSDKWeb = {
    initiate,
    process
  };
}

injectMethods();
