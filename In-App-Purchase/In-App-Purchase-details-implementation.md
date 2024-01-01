# React Native — Ultimate Guide on “In App Purchase”

### iOS + Android — RevenueCat made it really simple 🔥

![In App Purchase Implementation](https://cdn-images-1.medium.com/max/5760/1*GyY-nNROCWckM1r1QJ8lKw.png)

## Before Start 💁‍♂️

For your information, I found the **RevenueCat SDK integration in React Native app very easy** once I learned **some terms**, **how “In App Purchase” works**, and the **steps I needed to follow in sequence**. If you don’t know the **steps in sequence** for both Android and iOS, it will be a mess for you, and you will feel like you are in a sea without a boat and obviously there is a **deadline for you in your project**.

In RevenueCat’s official documentation and videos, I found that the **steps were not shown in sequence** and that’s why it took me almost 3 weeks to complete the full process for both Android and iOS. The major flaw I found in RevenueCat’s official documentation is that there are **more than 100 pages, but the steps are not in sequence,** and it will confuse you too.

But the good news is that each page of RevenueCat clearly describes a particular step. The **only thing missing is the sequence of steps**. I will cover

- All the **missing parts** from the documentation and

- Also guide you in a **sequential** and **organized** way with **proper links from the documentation** so that you can integrate it easily within 2 to 4 days.

Certainly, **we will learn these stuffs** from this article in details.

1.  [Basics of Payment Gateway](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/In-App-Purchase/In-App-Purchase-details-implementation.md#basics-of-payment-gateway)

2.  [Flow of a payment gateway](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/In-App-Purchase/In-App-Purchase-details-implementation.md#flow-of-a-payment-gateway)

3.  [What is Sandbox Testing?](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/In-App-Purchase/In-App-Purchase-details-implementation.md#what-is-sandbox-testing)

4.  [How Google or Apple In App Purchase (IAP) works?](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/In-App-Purchase/In-App-Purchase-details-implementation.md#how-google-or-apple-in-app-purchase-iap-works)

5.  [IOS In App Purchase flow](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/In-App-Purchase/In-App-Purchase-details-implementation.md#ios-in-app-purchase-flow)

6.  [Android In App Purchase Flow](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/In-App-Purchase/In-App-Purchase-details-implementation.md#android-in-app-purchase-flow)

7.  [Basics of In App Purchase — IOS](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/In-App-Purchase/In-App-Purchase-details-implementation.md#basics-of-in-app-purchase--ios)

8.  [Basics of In App Purchase — Android](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/In-App-Purchase/In-App-Purchase-details-implementation.md#basics-of-in-app-purchase--android)

9.  [Why RevenueCat SDK?](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/In-App-Purchase/In-App-Purchase-details-implementation.md#why-revenuecat-sdk)

10. [Basics of In App Purchase — RevenueCat](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/In-App-Purchase/In-App-Purchase-details-implementation.md#basics-of-in-app-purchase--revenuecat)

11. [Start Implementation (Documentation links in sequence)](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/In-App-Purchase/In-App-Purchase-details-implementation.md#start-implementation-documentation-links-in-sequence)

12. [IOS — Documentation links (In Sequence)](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/In-App-Purchase/In-App-Purchase-details-implementation.md#ios--documentation-links-in-sequence)

13. [ANDROID — Documentation links (In Sequence)](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/In-App-Purchase/In-App-Purchase-details-implementation.md#android--documentation-links-in-sequence)

14. [Perquisites before Test & Debugging (Very Important)](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/In-App-Purchase/In-App-Purchase-details-implementation.md#perquisites-before-test--debugging-very-important)

15. [Some ISSUE/ ERROR I faced deeply 🙇‍♂️️️🙇‍♂️️️](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/In-App-Purchase/In-App-Purchase-details-implementation.md#some-issue-error-i-faced-deeply-%EF%B8%8F%EF%B8%8F%EF%B8%8F%EF%B8%8F%EF%B8%8F%EF%B8%8F)

## Basics of Payment Gateway

This was not the first time I implemented a payment gateway. In fact, I implemented **5 payment gateways** in several projects. Those concepts really helped me to implement the full flow of In App Purchase in App Store Connect and in Google Play Store.

So, I have listed some basics that will surely help you if you have not implemented any payment gateway before.

### Flow of a payment gateway

Payment gateways require **high security** in the protocol and in the transactions. To ensure the security, the steps become complex to make a flawless integration.

First of all, in all **payment gateways**, you have to initialize a **token** for the transaction of your user who wants to buy a product. Then, after calling the **token creation API**, the payment gateway will send you a response with a one-time usable token with an expiration time.

Then, you will use that token to **complete the transaction** on behalf of your user to the specific payment gateway. Then, when your user **completes**, **cancels**, or **fails the transaction** due to an insufficient balance in their account, **an API** will be called from the payment gateway with the created token. This API will be a **public API from your server**. This API is called a **callback URL API** by the payment gateways. Inside that callback URL API, you must check some things for sure in your backend server.

1.  **Parse** the parameter that came from the payment gateway and find the transaction ID from the token.

2.  Now, call another API of the payment gateway by which you can easily **check if that transaction ID is valid or invalid**. If valid, you will get the details of the transaction like paid amount, transaction timestamp, etc.

3.  When you verify that the transaction was valid, you have to check in your database if that **transaction was already used** for a previous order for a product or if this is a fresh new transaction ID. This should be checked as there are tons of scammers around you who want to buy products for free.

4.  Then, **save the transaction ID** in your database for future check.

So, these 4 steps are essential for a payment gateway integration in your app for seamless transactions. Also, I suggest you use DB transaction in your app so that it maintains **ACID transactions** in your database and if any anomaly occurs, you can safely exit from the occurrence.

### What is Sandbox Testing?

So far, I have implemented 6 payment gateways including In App Purchase in Android and iOS, and what I found is that all the payment gateways have a **sandbox mode for testing** while integrating the payment gateway. Each payment gateway has a different way of enabling the sandbox mode. These are like:

1.  Sometimes, the payment gateway **changes the sandbox APIs** from the main transaction APIs.

2.  Sometimes, there is an option in the payment gateway dashboard to **make all the transactions as sandbox transactions** until it is turned off.

3.  Sometimes, **a test card number will be provided** for sandbox testing.

4.  Sometimes, a specific platform **staging/testflight will have only sandbox** mode even with real card information provided while testing.

It is very important to be familiar with the word sandbox and how sandbox works in the payment gateway you are going to work with.

## How Google or Apple In App Purchase (IAP) works?

We have learned the basics of how payment gateways work in general. So now, **let’s understand how Google Pay** and **Apple Pay work**. If you understand the flow of how they work, you will be able to start the integration easily. Let’s see the flow below.

### IOS In App Purchase flow

I’m showing you some screenshots below (from another app as I only have iPhone in the office) in order so that you can understand the flow easily.

**Step 1: Paywall screen** for the product.

![Step 1: Paywall screen](https://cdn-images-1.medium.com/max/5760/1*H3QlimO5XAfAADkzMBitAw.png)

**Step 2:** After clicking on a particular product, you will be asked to **enter your Apple ID and password** like below. Remember, you don’t need to enter any test (sandbox) account here. If you are in development mode (meaning you **ran your app from Xcode** or by **npx command** or downloaded the app from **TestFlight**) then you will never pay the real money.

![Step 2: Apple ID login](https://cdn-images-1.medium.com/max/5760/1*ZOsTSAMWnjBFdd59TIJqoA.png)

**Step 3:** After successfully logging in, you will see a bottom sheet pop up like below to **confirm your payment**. Notice that it shows already that you are in sandbox mode. If you are using a real card payment, you will not see the words sandbox or sandbox environment like below.

![Step 3: Payment confirmation screen](https://cdn-images-1.medium.com/max/5760/1*CWdzibDcNqJw27dEWZpqAw.png)

**Step 4:** Again, give your **password for final confirmation** to pay.

![Step 4: Final confirmation via password](https://cdn-images-1.medium.com/max/5760/1*KOwx3l9HX9eAs8cVD-cpng.png)

**Step 5:** Payment **success** screen

![Step 5: Payment success screen](https://cdn-images-1.medium.com/max/5760/1*FoIH6pi0m9Jc9UNhpPG7_A.png)

### Android In App Purchase Flow

Below, I’m sharing some screenshots from **my own React Native app** in order after successfully integrating In App Purchase.

**Step 1:** This is called **Paywall screen** from where the price of products will be shown.

![Step 1: Paywall screen](https://cdn-images-1.medium.com/max/5760/1*yRo8u4VecNTDx6_dL-iXgg.png)

**Step 2:** Confirm Payment

![Step 2: Confirm Payment](https://cdn-images-1.medium.com/max/5760/1*r0nZ4MLfGxMU5sUqy28GLQ.png)

**Step 3:** Payment **successfully** done.

![Step 3: Payment successful](https://cdn-images-1.medium.com/max/5760/1*Sc3XXTsoo7MossXer7XVBg.png)

## Basics of In App Purchase — IOS

There are 4 types of In App Purchase products according to the Apple developer documentation. These are below 👇

1.  **Consumable:** A product that is used once, after which it becomes depleted and must be purchased again. Example: order fish food in a fish app, **coin/ gem using in a gaming app to enhance the strength** of the player avatar, etc.

2.  **Non-Consumable:** A product that is purchased once and does not expire or decrease with use. Example: Race track for a game app, purchase something for **life time**, etc.

3.  **Auto-Renewable Subscription:** A product that allows users to purchase dynamic content for a set period. This type of Subscription renews automatically unless cancelled by the user. Example: **Monthly subscriptions for an app** offering streaming services.

4.  **Non-Renewing Subscription:** A product that allows users to purchase a service with a limited duration. The content of this in-app purchase can be static. This type of Subscription does not renew automatically. Example: **One year subscription** to a catalog of archived articles.

## Basics of In App Purchase — Android

Mainly there are 2 sections from where you will be able to create 2 different type products. These are

1.  **In App Products:** In app products are usually **one-time purchases** that can be **consumed** or **restored** within the app. For example, you can buy a pack of stickers in a messaging app and use them as many times as you want, or you can buy a level unlock in a game and play it again later.

2.  **Subscription Products:** Subscription products are **recurring payments** that give users access to **dynamic** or **updated content** for a certain period of time. For example, you can subscribe to a music or video streaming service and enjoy unlimited access to their catalog for a month or a year.
    > You can **adjust the pricing** and **availability** of your in app products and subscription products in the **Google Play Console** or the **App Store Connect**, depending on which platform you are developing for. You can also **promote** and **offer** in app purchases **directly on the App Store**.

## Why RevenueCat SDK?

So, to do the integration for In App Purchase, **I suggest using RevenueCat for the simplicity of work**. It will really help you to **reduce development time**. Though its official documentation is kind of **unorganized**, it really reduced the development time as it already handled all the security stuff that should be maintained by your server.

In the price plan, I saw that **for each $1000, it will cost only $8**, but the thing is the charge will be applicable after successfully doing $10,000 transactions. So, it will really help to start with.

![RevenueCat Price Plan](https://cdn-images-1.medium.com/max/3560/1*VQepuWYovBiU2iUy3WRKeg.png)

## Basics of In App Purchase — RevenueCat

Remember that **you don’t need to know too much about these terms** to achieve your first success in **“In App Purchase”**. So just learn some basics about these terms and it will help you to decide later.

Let’s understand some terms about In App Purchase here.

- **Entitlements** are the features or content that **users are entitled** to access **after they purchase** a **subscription** or **product**. For example, you can have an entitlement called **“Premium”** that unlocks ad-free experience and extra content for your users.

- **Offerings** are a group of products or packages that you can offer to your users at different price points or durations. For example, you can have an offering called **“Monthly”** that contains a **monthly subscription product** and **a package that bundles a monthly subscription with a free trial**.

- **Products** are the **individual items** that users can purchase from the app stores. They have a unique identifier, a price, and a duration (if they are subscriptions). For example, you can have a product called “com.myapp.monthly” that **costs $9.99 per month**.

- **Packages** are a way to offer the **same product with different introductory pricing** or trials. They have the same identifier as the product they contain, but with different billing parameters. For example, you can have a package called “com.myapp.monthly.trial” that **offers a 7-day free trial before charging $9.99 per month**.

![Terms of In App Purchase](https://cdn-images-1.medium.com/max/5436/1*B7UlfO2Mx73l6AQ8iAcafQ.png)

> I would like to suggest this video from RevenueCat for a better understanding these terms [https://youtu.be/QxHeZiW4KCA?si=J9rv5dyvO1H5k0LE](https://youtu.be/QxHeZiW4KCA?si=J9rv5dyvO1H5k0LE)

## Start Implementation (Documentation links in sequence)

I previously said that the **RevenueCat documentation is not really organized** in a way that will help developers. But RevenueCat is a good library. So please **follow this below sequence** for iOS and Android.

### IOS — Documentation links (In Sequence)

Sequence for iOS In App Purchase configuration and just follow the steps mentioned in each link.

1.  **App Store Connect Product Configuration:** [iOS Product Setup (revenuecat.com)](https://www.revenuecat.com/docs/ios-products)

2.  **Configure project & app in Revenuecat:** [SDK Quickstart (revenuecat.com)](https://www.revenuecat.com/docs/getting-started)

3.  **Generate “App-Specific Shared Secret” in App Store Connect & then store in Revenuecat:** [Apple App Store (revenuecat.com)](https://www.revenuecat.com/docs/itunesconnect-app-specific-shared-secret)

4.  **Generate _“In App Purchase key”_ from App Store Connect & then store in RevenueCat:** [In-App Purchase Key Configuration (revenuecat.com)](https://www.revenuecat.com/docs/in-app-purchase-key-configuration)

5.  **Configure product in RevenueCat:** [Configuring Products (revenuecat.com)](https://www.revenuecat.com/docs/entitlements)

6.  **Configure the SDK in your React Native app:** [Configuring the SDK (revenuecat.com)](https://www.revenuecat.com/docs/configuring-sdk)

7.  **Show Apple Store product in your App paywall:** [Displaying Products (revenuecat.com)](https://www.revenuecat.com/docs/displaying-products)

8.  **After payment completion do your server operation:** [Making Purchases (revenuecat.com)](https://www.revenuecat.com/docs/making-purchases)

9.  **App Store Connect In App Purchase SANDBOX testing:** [Apple App Store & TestFlight (revenuecat.com)](https://www.revenuecat.com/docs/apple-app-store)

### ANDROID — Documentation links (In Sequence)

Please **follow this below sequence for ANDROID In App Purchase** configuration and just follow the steps mentioned in each link.

1.  **Google Play Product Configuration:** [Google Play Product Setup (revenuecat.com)](https://www.revenuecat.com/docs/android-products)

2.  **Configure project & app in Revenuecat:** [SDK Quickstart (revenuecat.com)](https://www.revenuecat.com/docs/getting-started)

3.  **Generate “Google Play Service credentials” in Google play console & then store in Revenuecat:** [Google Play Store (revenuecat.com)](https://www.revenuecat.com/docs/creating-play-service-credentials)

4.  **Configure product in RevenueCat:** [Configuring Products (revenuecat.com)](https://www.revenuecat.com/docs/entitlements)

5.  **Configure the SDK in your React Native app:** [Configuring the SDK (revenuecat.com)](https://www.revenuecat.com/docs/configuring-sdk)

6.  **Show Google Store product in your App paywall:** [Displaying Products (revenuecat.com)](https://www.revenuecat.com/docs/displaying-products)

7.  **After payment completion do your server operation:** [Making Purchases (revenuecat.com)](https://www.revenuecat.com/docs/making-purchases)

8.  **Google play Store In App Purchase SANDBOX testing:** [Google Play Store (revenuecat.com)](https://www.revenuecat.com/docs/google-play-store)
    > Once again, **please read the above links in sequence I gave**. If you try to follow the documentation serial, then your brain will be stuck for sure for 3 weeks & it happened with me 🤞.

## Perquisites before Test & Debugging (Very Important)

Before you start **debugging** with In App Purchase, please make sure to check these 6 things below.

1.  To test **In-App Purchase** in both **Android** and **iOS**, you have to use a real phone. A **simulator will not work here**. It is true that **you can fetch** the **products**, **offerings**, or **packages** from a particular store via Revenuecat SDK in your **simulator**, but you will **not be able to complete the purchase** from your **simulator**. You will need a Real device at the end of the day.

2.  You must check that all your **Terms & Policy** were agreed upon in **Apple Store Connect**. If you do not agree with the latest changes to the policy and agreement, then you will not be able to test your In App Purchase. You will not be able to test locally from your iPhone either. So, you must agree to the new and all policies.

3.  You must fill up all **Tax** and **Payment Card** info in **Apple Store Connect**. If you don’t do that, then you will not be able to test In App Purchase.

4.  You must check that your **“In App Purchase”** in **Apple Store Connect** is in **“Ready to submit”** status. See here all the statuses: [In-app purchase statuses — Reference — App Store Connect — Help — Apple Developer.](https://developer.apple.com/help/app-store-connect/reference/in-app-purchase-statuses)

5.  In Android, you will be able to test without submitting **Tax Info** and **payment method** in **Google Play Console** even. But those are important for production IAP.

6.  If you find this error below, then you must recheck the whole process again as maybe you **missed some configuration** from the **above links I gave**. Also, wait 36 hours for Android approval of **“Service Credentials”**.

![](https://cdn-images-1.medium.com/max/3996/0*KbfF738kvQxv73kr)

Here is **Apple Store** **Connect** **“In App Purchase”** statuses.

![Apple In App Purchase Statuses](https://cdn-images-1.medium.com/max/2336/1*Y6duhY2ZKgQGsNi3CRAGRw.png)

## Some ISSUE/ ERROR I faced deeply 🙇‍♂️️️🙇‍♂️️️

🚩 If you use **Consumable** **“In App Products”** from **Apple Store Connect**, then maybe you will not be able to get the **correct PRODUCT_TYPE (Consumable)** by calling the products/offering API provided by RevenueCat. This ISSUE occurs due to not using **StoreKit framework version 2** in your RevenueCat SDK. When I faced this issue, I solved it in this way 👇

![](https://cdn-images-1.medium.com/max/2000/1*GNNZnDd1rY0yFJ6c-pzF5A.png)

🚩 If you are controlling both Android and iOS paywall screen from a single screen, then initialize RevenueCat STORE like below **just before calling product purchase API** instead of calling the initialize SDK inside useEffect().

![](https://cdn-images-1.medium.com/max/2000/1*VABdrOzz6ZeVoomc7WdLPA.png)

🚩 I don’t want to purchase an offering, but **I want to purchase only a single product**. How I did that?

Use this **purchaseStoreProduct** API provided by Revenuecat SDK.

![](https://cdn-images-1.medium.com/max/2000/1*b2Zuiao9XCItHPu1TCfC3g.png)

## Conclusion

It is **very important to read carefully each step in the sequence I gave you above** and **follow all my important knowledge about in app purchase** for both Android and iOS.

If you follow my sequence and the knowledge I shared with you carefully, then it is possible that you will be able to implement a basic In App Purchase in both Android and iOS React native app **within 2–4 days**.

Thank you for reading this article. I enjoy sharing my **5 years** of experience in **JavaScript**, **React**, **React-native** & **Node.js** with you every day.

If you enjoyed reading this article, I would appreciate it if you could follow me on [Twitter](https://twitter.com/anis_RNCore) & [Medium](https://medium.com/@anisurrahmanbup). You can also leave your feedback and comments there. Thank you for your support and interest.
