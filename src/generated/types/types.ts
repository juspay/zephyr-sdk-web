import { isJSON, decodeString, decodeNumber, decodeArray } from 'type-decoder';

/**
 * @type { BlazeInitiatePayload }
 */
export type BlazeInitiatePayload = {
  /**
   * @type { string }
   * @memberof BlazeInitiatePayload
   */
  merchantId: string;
  /**
   * @type { string }
   * @memberof BlazeInitiatePayload
   */
  shopUrl: string;
  /**
   * @type { ShopPlatformEnum }
   * @memberof BlazeInitiatePayload
   */
  shopPlatform: ShopPlatformEnum;
  /**
   * @type { EnvironmentEnum }
   * @memberof BlazeInitiatePayload
   */
  environment: EnvironmentEnum | null;
};

export function decodeBlazeInitiatePayload(rawInput: unknown): BlazeInitiatePayload | null {
  if (isJSON(rawInput)) {
    const decodedMerchantId = decodeString(rawInput['merchantId']);
    const decodedShopUrl = decodeString(rawInput['shopUrl']);
    const decodedShopPlatform = decodeShopPlatformEnum(rawInput['shopPlatform']);
    const decodedEnvironment = decodeEnvironmentEnum(rawInput['environment']);

    if (decodedMerchantId === null || decodedShopUrl === null || decodedShopPlatform === null) {
      return null;
    }

    return {
      merchantId: decodedMerchantId,
      shopUrl: decodedShopUrl,
      shopPlatform: decodedShopPlatform,
      environment: decodedEnvironment
    };
  }
  return null;
}
/**
 * @type { ShopPlatformEnum }
 */
export type ShopPlatformEnum = 'shopify' | 'magento' | 'bigcommerce' | 'woocommerce' | 'custom';

export function decodeShopPlatformEnum(rawInput: unknown): ShopPlatformEnum | null {
  switch (rawInput) {
    case 'shopify':
    case 'magento':
    case 'bigcommerce':
    case 'woocommerce':
    case 'custom':
      return rawInput;
  }
  return null;
}
/**
 * @type { EnvironmentEnum }
 */
export type EnvironmentEnum = 'production' | 'beta';

export function decodeEnvironmentEnum(rawInput: unknown): EnvironmentEnum | null {
  switch (rawInput) {
    case 'production':
    case 'beta':
      return rawInput;
  }
  return null;
}

/**
 * @type { BlazeProcessPayload }
 */
export type BlazeProcessPayload = {
  /**
   * @type { ActionEnum }
   * @memberof BlazeProcessPayload
   */
  action: ActionEnum | null;
  /**
   * @type { BlazeProcessPayloadCart }
   * @memberof BlazeProcessPayload
   */
  cart: BlazeProcessPayloadCart;
  /**
   * @type { BlazeUTMParams }
   * @memberof BlazeProcessPayload
   */
  utmParams: BlazeUTMParams | null;
  /**
   * @type { string }
   * @memberof BlazeProcessPayload
   */
  signature: string | null;
};

export function decodeBlazeProcessPayload(rawInput: unknown): BlazeProcessPayload | null {
  if (isJSON(rawInput)) {
    const decodedAction = decodeActionEnum(rawInput['action']);
    const decodedCart = decodeBlazeProcessPayloadCart(rawInput['cart']);
    const decodedUtmParams = decodeBlazeUTMParams(rawInput['utmParams']);
    const decodedSignature = decodeString(rawInput['signature']);

    if (decodedCart === null) {
      return null;
    }

    return {
      action: decodedAction,
      cart: decodedCart,
      utmParams: decodedUtmParams,
      signature: decodedSignature
    };
  }
  return null;
}
/**
 * @type { ActionEnum }
 */
export type ActionEnum = 'startCheckout';

export function decodeActionEnum(rawInput: unknown): ActionEnum | null {
  switch (rawInput) {
    case 'startCheckout':
      return rawInput;
  }
  return null;
}
export type BlazeProcessPayloadCart = CBlazeProcessPayloadCartBlazeCart | string;

export function decodeBlazeProcessPayloadCart(rawInput: unknown): BlazeProcessPayloadCart | null {
  const result: BlazeProcessPayloadCart | null =
    decodeCBlazeProcessPayloadCartBlazeCart(rawInput) ?? decodeString(rawInput);

  return result;
}

export class CBlazeProcessPayloadCartBlazeCart {
  data: BlazeCart;
  constructor(data: BlazeCart) {
    this.data = data;
  }
}

export function decodeCBlazeProcessPayloadCartBlazeCart(
  rawInput: unknown
): CBlazeProcessPayloadCartBlazeCart | null {
  const result = decodeBlazeCart(rawInput);
  if (result === null) {
    return null;
  }
  return new CBlazeProcessPayloadCartBlazeCart(result);
}

/**
 * @type { BlazeCart }
 */
export type BlazeCart = {
  /**
   * @type { number }
   * @memberof BlazeCart
   */
  initialPrice: number;
  /**
   * @type { number }
   * @memberof BlazeCart
   */
  totalPrice: number;
  /**
   * @type { number }
   * @memberof BlazeCart
   */
  totalDiscount: number;
  /**
   * @type { number }
   * @memberof BlazeCart
   */
  weight: number | null;
  /**
   * @type { number }
   * @memberof BlazeCart
   */
  itemCount: number;
  /**
   * @type { BlazeCurrency }
   * @memberof BlazeCart
   */
  currency: BlazeCurrency;
  /**
   * @type { BlazeCartItem[] }
   * @memberof BlazeCart
   */
  items: BlazeCartItem[];
};

export function decodeBlazeCart(rawInput: unknown): BlazeCart | null {
  if (isJSON(rawInput)) {
    const decodedInitialPrice = decodeNumber(rawInput['initialPrice']);
    const decodedTotalPrice = decodeNumber(rawInput['totalPrice']);
    const decodedTotalDiscount = decodeNumber(rawInput['totalDiscount']);
    const decodedWeight = decodeNumber(rawInput['weight']);
    const decodedItemCount = decodeNumber(rawInput['itemCount']);
    const decodedCurrency = decodeBlazeCurrency(rawInput['currency']);
    const decodedItems = decodeArray(rawInput['items'], decodeBlazeCartItem);

    if (
      decodedInitialPrice === null ||
      decodedTotalPrice === null ||
      decodedTotalDiscount === null ||
      decodedItemCount === null ||
      decodedCurrency === null ||
      decodedItems === null
    ) {
      return null;
    }

    return {
      initialPrice: decodedInitialPrice,
      totalPrice: decodedTotalPrice,
      totalDiscount: decodedTotalDiscount,
      weight: decodedWeight,
      itemCount: decodedItemCount,
      currency: decodedCurrency,
      items: decodedItems
    };
  }
  return null;
}

/**
 * @type { BlazeCartItem }
 */
export type BlazeCartItem = {
  /**
   * @type { string }
   * @memberof BlazeCartItem
   */
  id: string;
  /**
   * @type { string }
   * @memberof BlazeCartItem
   */
  title: string;
  /**
   * @type { string }
   * @memberof BlazeCartItem
   */
  variantTitle: string | null;
  /**
   * @type { string }
   * @memberof BlazeCartItem
   */
  variantId: string | null;
  /**
   * @type { string }
   * @memberof BlazeCartItem
   */
  image: string | null;
  /**
   * @type { number }
   * @memberof BlazeCartItem
   */
  weight: number | null;
  /**
   * @type { number }
   * @memberof BlazeCartItem
   */
  quantity: number;
  /**
   * @type { number }
   * @memberof BlazeCartItem
   */
  discount: number;
  /**
   * @type { number }
   * @memberof BlazeCartItem
   */
  initialPrice: number;
  /**
   * @type { number }
   * @memberof BlazeCartItem
   */
  finalPrice: number;
};

export function decodeBlazeCartItem(rawInput: unknown): BlazeCartItem | null {
  if (isJSON(rawInput)) {
    const decodedId = decodeString(rawInput['id']);
    const decodedTitle = decodeString(rawInput['title']);
    const decodedVariantTitle = decodeString(rawInput['variantTitle']);
    const decodedVariantId = decodeString(rawInput['variantId']);
    const decodedImage = decodeString(rawInput['image']);
    const decodedWeight = decodeNumber(rawInput['weight']);
    const decodedQuantity = decodeNumber(rawInput['quantity']);
    const decodedDiscount = decodeNumber(rawInput['discount']);
    const decodedInitialPrice = decodeNumber(rawInput['initialPrice']);
    const decodedFinalPrice = decodeNumber(rawInput['finalPrice']);

    if (
      decodedId === null ||
      decodedTitle === null ||
      decodedQuantity === null ||
      decodedDiscount === null ||
      decodedInitialPrice === null ||
      decodedFinalPrice === null
    ) {
      return null;
    }

    return {
      id: decodedId,
      title: decodedTitle,
      variantTitle: decodedVariantTitle,
      variantId: decodedVariantId,
      image: decodedImage,
      weight: decodedWeight,
      quantity: decodedQuantity,
      discount: decodedDiscount,
      initialPrice: decodedInitialPrice,
      finalPrice: decodedFinalPrice
    };
  }
  return null;
}

/**
 * @type { BlazeCurrency }
 * @description Currency schema
 */
export type BlazeCurrency = 'INR' | 'USD' | 'GBP' | 'AUD' | 'CAD' | 'SGD' | 'AED' | 'PKR' | 'BDT';

export function decodeBlazeCurrency(rawInput: unknown): BlazeCurrency | null {
  switch (rawInput) {
    case 'INR':
    case 'USD':
    case 'GBP':
    case 'AUD':
    case 'CAD':
    case 'SGD':
    case 'AED':
    case 'PKR':
    case 'BDT':
      return rawInput;
  }
  return null;
}

/**
 * @type { BlazeUTMParams }
 */
export type BlazeUTMParams = {
  /**
   * @type { string }
   * @memberof BlazeUTMParams
   */
  utmSource: string | null;
  /**
   * @type { string }
   * @memberof BlazeUTMParams
   */
  utmMedium: string | null;
  /**
   * @type { string }
   * @memberof BlazeUTMParams
   */
  utmCampaign: string | null;
  /**
   * @type { string }
   * @memberof BlazeUTMParams
   */
  utmTerm: string | null;
  /**
   * @type { string }
   * @memberof BlazeUTMParams
   */
  utmContent: string | null;
};

export function decodeBlazeUTMParams(rawInput: unknown): BlazeUTMParams | null {
  if (isJSON(rawInput)) {
    const decodedUtmSource = decodeString(rawInput['utmSource']);
    const decodedUtmMedium = decodeString(rawInput['utmMedium']);
    const decodedUtmCampaign = decodeString(rawInput['utmCampaign']);
    const decodedUtmTerm = decodeString(rawInput['utmTerm']);
    const decodedUtmContent = decodeString(rawInput['utmContent']);

    return {
      utmSource: decodedUtmSource,
      utmMedium: decodedUtmMedium,
      utmCampaign: decodedUtmCampaign,
      utmTerm: decodedUtmTerm,
      utmContent: decodedUtmContent
    };
  }
  return null;
}

/**
 * @type { BlazeEvent }
 */
export type BlazeEvent = {
  /**
   * @type { string }
   * @memberof BlazeEvent
   */
  eventName: string;
  /**
   * @type { BlazeEventEventData }
   * @memberof BlazeEvent
   */
  eventData: BlazeEventEventData | null;
};

export function decodeBlazeEvent(rawInput: unknown): BlazeEvent | null {
  if (isJSON(rawInput)) {
    const decodedEventName = decodeString(rawInput['eventName']);
    const decodedEventData = decodeBlazeEventEventData(rawInput['eventData']);

    if (decodedEventName === null) {
      return null;
    }

    return {
      eventName: decodedEventName,
      eventData: decodedEventData
    };
  }
  return null;
}
/**
 * @type { BlazeEventEventData }
 */
export type BlazeEventEventData = Record<string, unknown>;

export function decodeBlazeEventEventData(rawInput: unknown): BlazeEventEventData | null {
  if (isJSON(rawInput)) {
    return {
      ...rawInput
    };
  }
  return null;
}
