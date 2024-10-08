declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    BlazeSDK?: {
      initiate?: (
        payload: Record<string, unknown>,
        callback: (response: Record<string, unknown>) => void
      ) => void;
      process?: (payload: Record<string, unknown>) => void;
    };
  }
}

export default {};
