import { isJSON, decodeString, decodeNumber, decodeArray } from 'type-decoder';

/**
 * @type { ZephyrInitiatePayload }
 */
export type ZephyrInitiatePayload = {
  /**
   * @type { string }
   * @memberof ZephyrInitiatePayload
   */
  merchantId: string;
  /**
   * @type { string }
   * @memberof ZephyrInitiatePayload
   */
  shopUrl: string;
  /**
   * @type { ShopPlatformEnum }
   * @memberof ZephyrInitiatePayload
   */
  shopPlatform: ShopPlatformEnum;
  /**
   * @type { EnvironmentEnum }
   * @memberof ZephyrInitiatePayload
   */
  environment: EnvironmentEnum | null;
};

export function decodeZephyrInitiatePayload(rawInput: unknown): ZephyrInitiatePayload | null {
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
 * @type { ZephyrProcessPayload }
 */
export type ZephyrProcessPayload = {
  /**
   * @type { ActionEnum }
   * @memberof ZephyrProcessPayload
   */
  action: ActionEnum | null;
  /**
   * @type { ZephyrCart }
   * @memberof ZephyrProcessPayload
   */
  cart: ZephyrCart | string;
  /**
   * @type { ZephyrUTMParams }
   * @memberof ZephyrProcessPayload
   */
  utmParams: ZephyrUTMParams | null;
  /**
   * @type { string }
   * @memberof ZephyrProcessPayload
   */
  signature: string | null;
};

export function decodeZephyrProcessPayload(rawInput: unknown): ZephyrProcessPayload | null {
  if (isJSON(rawInput)) {
    const decodedAction = decodeActionEnum(rawInput['action']);
    const decodedCart = decodeZephyrCart(rawInput['cart']) ?? decodeString(rawInput['cart']);
    const decodedUtmParams = decodeZephyrUTMParams(rawInput['utmParams']);
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

/**
 * @type { ZephyrCart }
 */
export type ZephyrCart = {
  /**
   * @type { number }
   * @memberof ZephyrCart
   */
  initialPrice: number;
  /**
   * @type { number }
   * @memberof ZephyrCart
   */
  totalPrice: number;
  /**
   * @type { number }
   * @memberof ZephyrCart
   */
  totalDiscount: number;
  /**
   * @type { number }
   * @memberof ZephyrCart
   */
  weight: number | null;
  /**
   * @type { number }
   * @memberof ZephyrCart
   */
  itemCount: number;
  /**
   * @type { ZephyrCurrency }
   * @memberof ZephyrCart
   */
  currency: ZephyrCurrency;
  /**
   * @type { ZephyrCartItem[] }
   * @memberof ZephyrCart
   */
  items: ZephyrCartItem[];
};

export function decodeZephyrCart(rawInput: unknown): ZephyrCart | null {
  if (isJSON(rawInput)) {
    const decodedInitialPrice = decodeNumber(rawInput['initialPrice']);
    const decodedTotalPrice = decodeNumber(rawInput['totalPrice']);
    const decodedTotalDiscount = decodeNumber(rawInput['totalDiscount']);
    const decodedWeight = decodeNumber(rawInput['weight']);
    const decodedItemCount = decodeNumber(rawInput['itemCount']);
    const decodedCurrency = decodeZephyrCurrency(rawInput['currency']);
    const decodedItems = decodeArray(rawInput['items'], decodeZephyrCartItem);

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
 * @type { ZephyrCartItem }
 */
export type ZephyrCartItem = {
  /**
   * @type { string }
   * @memberof ZephyrCartItem
   */
  id: string;
  /**
   * @type { string }
   * @memberof ZephyrCartItem
   */
  title: string;
  /**
   * @type { string }
   * @memberof ZephyrCartItem
   */
  variantTitle: string | null;
  /**
   * @type { string }
   * @memberof ZephyrCartItem
   */
  variantId: string | null;
  /**
   * @type { string }
   * @memberof ZephyrCartItem
   */
  image: string | null;
  /**
   * @type { number }
   * @memberof ZephyrCartItem
   */
  weight: number | null;
  /**
   * @type { number }
   * @memberof ZephyrCartItem
   */
  quantity: number;
  /**
   * @type { number }
   * @memberof ZephyrCartItem
   */
  discount: number;
  /**
   * @type { number }
   * @memberof ZephyrCartItem
   */
  initialPrice: number;
  /**
   * @type { number }
   * @memberof ZephyrCartItem
   */
  finalPrice: number;
};

export function decodeZephyrCartItem(rawInput: unknown): ZephyrCartItem | null {
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
 * @type { ZephyrCurrency }
 * @description Currency schema
 */
export type ZephyrCurrency = 'INR' | 'USD' | 'GBP' | 'AUD' | 'CAD' | 'SGD' | 'AED' | 'PKR' | 'BDT';

export function decodeZephyrCurrency(rawInput: unknown): ZephyrCurrency | null {
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
 * @type { ZephyrUTMParams }
 */
export type ZephyrUTMParams = {
  /**
   * @type { string }
   * @memberof ZephyrUTMParams
   */
  utmSource: string | null;
  /**
   * @type { string }
   * @memberof ZephyrUTMParams
   */
  utmMedium: string | null;
  /**
   * @type { string }
   * @memberof ZephyrUTMParams
   */
  utmCampaign: string | null;
  /**
   * @type { string }
   * @memberof ZephyrUTMParams
   */
  utmTerm: string | null;
  /**
   * @type { string }
   * @memberof ZephyrUTMParams
   */
  utmContent: string | null;
};

export function decodeZephyrUTMParams(rawInput: unknown): ZephyrUTMParams | null {
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
 * @type { ZephyrEvent }
 */
export type ZephyrEvent = {
  /**
   * @type { string }
   * @memberof ZephyrEvent
   */
  eventName: string;
  /**
   * @type { ZephyrEventEventData }
   * @memberof ZephyrEvent
   */
  eventData: ZephyrEventEventData | null;
};

export function decodeZephyrEvent(rawInput: unknown): ZephyrEvent | null {
  if (isJSON(rawInput)) {
    const decodedEventName = decodeString(rawInput['eventName']);
    const decodedEventData = decodeZephyrEventEventData(rawInput['eventData']);

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
 * @type { ZephyrEventEventData }
 */
export type ZephyrEventEventData = Record<string, unknown>;

export function decodeZephyrEventEventData(rawInput: unknown): ZephyrEventEventData | null {
  if (isJSON(rawInput)) {
    return {
      ...rawInput
    };
  }
  return null;
}
