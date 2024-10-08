# Blaze SDK Web

Blaze SDK Web is a Javascript library which enables you to seamlessly integrate and use [Breeze 1 Click Checkout](https://breeze.in/) in your Web app built using any kind of web technology.

## Web SDK Integration

Follow the below steps to integrate Blaze SDK into your web app written in any framework.

### Step 1: Obtaining the Blaze SDK

Run following command in your node project to install the Blaze SDK Web package:

```sh
npm install @juspay/blaze-sdk-web
```

This will install the Blaze SDK Web package in your project.

_Note: You can use pnpm, yarn or any other package manager of your choice to install the package._

### Step 2: Initialize the SDK

#### 2.2.1: Import the SDK

Import BlazeSDK using the following code in TS/JS project:

```javascript
import BlazeSDK from '@juspay/blaze-sdk-web';
```

#### 2.2.1: Construct the Initiate Payload

Create a Json with correct parameters to initiate the SDK. This is the data that will be used to initialize the SDK.

```javascript
  const initiatePayload = {
    merchantId: '<merchant-id-shared-by-breeze>',
    shopUrl: '<shop-url>',
    environment: 'production'
  };

  const initSDKPayload = {
    requestId: '<unique_request_id>',
    service: 'in.breeze.onecco',
    payload: initiatePayload
  }
```

#### 2.2.2: Construct the Callback Method

Create a callback method to handle the response from the SDK. This method will be called when the SDK has processed the request.

```javascript
// response will be an json object
const callbackMethod = (response>) => {
  console.log('Response from SDK:', response);
};
```

#### 2.2.3: Call the initiate method on Blaze

Call the `initiate` method on Blaze SDK with the initiate payload and the callback method.

```javascript
BlazeSDK.initiate(initSDKPayload, callbackMethod);
```

### Step 3: Start processing your requests

Once the SDK is initiated, you can start processing your requests using the initialized instance of the SDK.
The SDK will call the callback method with the result of the SDK operation.

#### 3.1: Construct the Process Payload

Create a Json payload with the required parameters to process the request.
The process payload differs based on the request.
Refer to schemas sections to understand what kind of data is required for different requests

```javascript
// 3.1 Create SDK Process Payload
// Create a JSONObject for the Process data
let processPayload = {
  "action": "<ACTION>",
  // and more parameters required as per the action
};


// Place Process Payload into SDK Payload
let processSDKPayload = {
  requestId: '<unique_request_id>',
  service: 'in.breeze.onecco',
  "payload": processPayload
};
```

#### 3.2: Call the process method on Blaze Instance

Call the process method on the Blaze instance with the process payload to start the user journey or a headless flow.

```kotlin
BlazeSDK.process(processSDKPayload)
```
