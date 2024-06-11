# Zephyr SDK Web

Zephyr SDK Web is a Javascript library which enables you to seamlessly integrate and use [Breeze 1 Click Checkout](https://breeze.in/) in your Web app built using any kind of web technology.

## Installation

Run following command in your node project to install the Zephyr SDK Web package:

```sh
npm install @juspay/zephyr-sdk-web
```

This will install the Zephyr SDK Web package in your project.

_Note: You can use pnpm, yarn or any other package manager of your choice to install the package._

## Usage

To start using the Zephyr SDK Web, you need to complete following steps:

### Step 1: Initiate the Zephyr SDK Web

To initiate the Zephyr SDK Web, you need to call the `initiate` method of the SDK. This method takes an object as an argument which contains the following properties:

| Parameter      | Type   | Mandatory | Description                                                                                                |
| -------------- | ------ | --------- | ---------------------------------------------------------------------------------------------------------- |
| `merchantId`   | String | Yes       | The merchant ID provided by Juspay.                                                                        |
| `shopUrl`      | String | Yes       | The URL of the shop where the SDK will be used.                                                            |
| `environment`  | String | No        | The environment in which the SDK should run. Possible values are `beta` and `production`.                  |
| `shopPlatform` | String | Yes       | The platform on which the shop is built. Possible values are `shopify`, `magento`, `woocommerce`, `custom` |

```javascript
// Import the SDK to your project
import Zephyr from '@juspay/zephyr-sdk-web';

// Create the initiate payload

const initiatePayload = {
  merchantId: '<merchant-id-shared-by-breeze>',
  shopUrl: '<shop-url>',
  environment: 'production',
  shopPlatform: 'custom'
};

Zephyr.initiate(initiatePayload);
```

### Step 2: Process your request through Zephyr SDK

To process your request through Zephyr SDK, you need to call the `process` method of the SDK. This method takes an object. Refer below sections to understand the object structure.

#### Process Payload

| Parameter   | Type                 | Mandatory | Description                                                                                                |
| ----------- | -------------------- | --------- | ---------------------------------------------------------------------------------------------------------- |
| `action`    | String               | Yes       | The action to be performed by the SDK. Possible values are `startCheckout`                                 |
| `cart`      | ZephyrCart or String | Yes       | The cart object which contains the cart details or Stringified Cart when using signature based integration |
| `utmParams` | Object               | No        | UTP Parameters associated with the user journey                                                            |
| `signature` | String               | No        | RSA Signed signature for Stringified ZephyrCart JSON                                                       |

#### ZephyrCart

| Parameter       | Type             | Mandatory | Description                             |
| --------------- | ---------------- | --------- | --------------------------------------- |
| `initialPrice`  | Number           | Yes       | The initial price of the cart.          |
| `totalPrice`    | Number           | Yes       | The total price of the cart.            |
| `totalDiscount` | Number           | Yes       | The total discount applied on the cart. |
| `weight`        | Number           | No        | The total weight of the cart.           |
| `itemCount`     | Number           | Yes       | The total number of items in the cart.  |
| `currency`      | ZephyrCurrency   | Yes       | The currency of the cart.               |
| `items`         | ZephyrCartItem[] | Yes       | The array of items in the cart.         |

#### ZephyrCurrency

Zephyr SDK Web supports the following currencies:

- 'INR'
- 'USD'
- 'GBP'
- 'AUD'
- 'CAD'
- 'SGD'
- 'AED'
- 'PKR'
- 'BDT'

#### ZephyrCartItem

| Parameter      | Type   | Mandatory | Description                       |
| -------------- | ------ | --------- | --------------------------------- |
| `id`           | String | Yes       | The ID of the item.               |
| `title`        | String | Yes       | The title of the item.            |
| `variantTitle` | String | No        | The variant title of the item.    |
| `variantId`    | String | No        | The variant ID of the item.       |
| `image`        | String | No        | The image URL of the item.        |
| `weight`       | Number | No        | The weight of the item.           |
| `quantity`     | Number | Yes       | The quantity of the item.         |
| `discount`     | Number | Yes       | The discount applied on the item. |
| `initialPrice` | Number | Yes       | The initial price of the item.    |
| `finalPrice`   | Number | Yes       | The final price of the item.      |

Post you have initiated the SDK, you can call the `process` method to execute your query.

```javascript
// Import your SDK
import Zephyr from '@juspay/zephyr-sdk-web';

// Creating process payload
const processPayload = {
  action: 'startCheckout',
  cart: {
    initialPrice: 1000,
    totalPrice: 900,
    totalDiscount: 100,
    weight: 1000,
    itemCount: 2,
    currency: 'INR',
    items: [
      {
        id: '1',
        title: 'Item 1',
        variantTitle: 'Variant 1',
        variantId: '1',
        image: 'https://example.com/image1.jpg',
        weight: 500,
        quantity: 1,
        discount: 50,
        initialPrice: 500,
        finalPrice: 450
      },
      {
        id: '2',
        title: 'Item 2',
        variantTitle: 'Variant 2',
        variantId: '2',
        image: 'https://example.com/image2.jpg',
        weight: 500,
        quantity: 1,
        discount: 50,
        initialPrice: 500,
        finalPrice: 450
      }
    ]
  },
  utmParams: {
    utm_source: 'google',
    utm_medium: 'cpc',
    utm_campaign: 'summer-sale'
  }
};

Zephyr.process(processPayload);
```

Note: This SDK is in alpha stage. Expect new features & breaking changes in upcoming versions.
