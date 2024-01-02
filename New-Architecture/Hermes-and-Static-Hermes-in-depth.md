# React Native — Hermes & Static Hermes (Bundle release & Hermes Bytecode)

### How to enable Hermes & be oversure Hermes is working - In this Guide 🔥

![Hermes & Static Hermes](https://cdn-images-1.medium.com/max/5760/1*TbeZC48fYPo304Nr1damjQ.png)

_I found that the React Native official documentation missed some details about the **Hermes bytecode** and **how to ensure that Hermes was enabled correctly**. Let me explain it in an easy way so that you can optimize your app’s performance with respect to the Hermes engine._

Let’s take a look at what we will learn in this article in a nutshell 👇

- [What is **Bundle Release**?](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/New-Architecture/Hermes-and-Static-Hermes-in-depth.md#what-is-bundle-release)

- [**Android** Bundle Release command](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/New-Architecture/Hermes-and-Static-Hermes-in-depth.md#android-bundle-release)

- [**IOS** Bundle Release command](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/New-Architecture/Hermes-and-Static-Hermes-in-depth.md#ios-bundle-release)

- [What is **Hermes Bytecode**?](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/New-Architecture/Hermes-and-Static-Hermes-in-depth.md#what-is-hermes-bytecode-hbc)

- [What is **.hbc file**?](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/New-Architecture/Hermes-and-Static-Hermes-in-depth.md#what-is-hermes-bytecode-hbc)

- [How to **enable Hermes**?](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/New-Architecture/Hermes-and-Static-Hermes-in-depth.md#enable-hermes)

- [**Is Hermes enabled correctly** or not?](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/New-Architecture/Hermes-and-Static-Hermes-in-depth.md#is-hermes-enabled-correctly-or-not-%EF%B8%8F%EF%B8%8F)

- [**Over sure Hermes is working perfectly**!](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/New-Architecture/Hermes-and-Static-Hermes-in-depth.md#over-sure-that-hermes-is-working-perfectly)

- [**Enabling Hermes on Older Versions** of React Native (Both IOS & Android)](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/New-Architecture/Hermes-and-Static-Hermes-in-depth.md#enabling-hermes-on-older-versions-of-react-native)

- [**Static Hermes**](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/New-Architecture/Hermes-and-Static-Hermes-in-depth.md#static-hermes)

# Let’s start 🚀

## 🙋‍♂️ Perquisites before start

Since you are going to work with **new architecture**, you should understand the **full flow** of it. Therefore, I strongly recommend that you read this article first and then come back here.

**_Article link:_** [React Native New Architecture in depth (Hermes relation in New Architecture)](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/New-Architecture/New-Architecture-in-depth.md)

_If you already have enough knowledge about the new architecture of React Native and how its components (Hermes, JSI, Turbo, Fabric, etc) are interconnected, you can skip the article above. You can proceed to the next section._

## What is Bundle Release?

Release mode is a way of **building** and **running** your **React Native app** that **optimizes its performance** and **size**. It also enables some features that are not available in debug mode, such as **Hermes**, **ProGuard**, and **signing**.

In release mode, your app bundles all the JavaScript needed to run into an **AAB (Android App Bundle)** or an **IPA (iOS App Store Package)** file. This reduces the app size and makes it faster to load and run.

Release mode helps you to test your app in a **realistic environment** before publishing it to the app stores. It also helps you to avoid some errors or bugs that may occur only in debug mode.

### Android Bundle Release

For **Android** run this bellow command for **Android** release build

npx react-native run-android --mode=release

**_NOTE:_** You need to have keystore file inside **_yourApp/android/app_** this location of your app to get the release command success.

### IOS Bundle Release

For **iOS** run this bellow command for **iOS** release build

npx react-native run-ios --configuration Release

## What is Hermes Bytecode (.hbc)?

**Hermes** is a **JavaScript engine** optimized for **fast start-up** of React Native apps. It features **ahead-of-time** static **optimization and compact bytecode**.

Bytecode is a low-level representation of JavaScript code that can be executed by the engine faster than the original source code. Hermes bytecode is stored in .hbc files that are generated during the app build process.

When you enable Hermes in your React Native app, your JavaScript code is compiled to **Hermes bytecode** and **bundled into your app**. This reduces the app size and improves the start-up time and memory usage.

## Enable Hermes

According to the official documentation, **Hermes** is the **default engine** as of **React Native 0.70**. This means that all new projects starting on v0.70 will have Hermes enabled by default.

## Is Hermes enabled correctly or not? ️🙇‍♂️

A **HermesInternal** global variable will be available in JavaScript that can be used to verify that Hermes is in use:

    const isHermes = () => !!global.HermesInternal;

I applied it like bellow 👇

![Added this code inside JSX code for an instant check.](https://cdn-images-1.medium.com/max/3304/1*oqlrY9Kxx6HK2jFLCUgYpw.png)

Output 👇

![My project is using Hermes 🚀](https://cdn-images-1.medium.com/max/2000/1*qNZKJlxjdEMizJTz1wdT3g.png)

### Over sure that Hermes is working perfectly!

If you are using a non-standard way of loading the JS bundle, it is possible that the **HermesInternal** variable is available but you aren't using the highly optimised pre-compiled bytecode. Confirm that you are using the **.hbc** file and also benchmark the before/after as detailed below.

### Details about **.hbc** file now 👇

At the beginning of this article, we saw how to create a bundle release for both Android & iOS. For Android, when you apply that release command then immediately after successfully completion of release build you will find an **_.apk_** file created under this bellow **file path** location.

yourApp/android/app/build/outputs/apk/release

The file name should look something like this: **“app-arm64-v8a-release.apk”** or similar like this.

But wait, there’s more! You can actually do something amazing with this file 💁‍♂️

All you need to do is change the file extension from **.apk** to **.ZIP** like this 👇

![](https://cdn-images-1.medium.com/max/2000/1*60zfv_FfGq9KN0RXC42XMg.png)

Then extract that ZIP folder using any **Unarchiver app**. Now open that unarchived folder & go to **“_assets”_** folder.

Inside that **“_assets”_** folder, if you find a file **_“index.android.bundle”_** then open your terminal under **“assets”** folder and then paste the bellow command in terminal 👇

    file index.android.bundle

After running the command, you will see like bellow 👇

![](https://cdn-images-1.medium.com/max/3880/1*O3dtOI8IRtb4tEYULDFgCA.png)

It shows that the bundle was created by **Hermes** engine. Great, you are using **hbc (Hermes Bytecode)** file 💁‍♂️

## Enabling Hermes on Older Versions of React Native

**Hermes** is the **default engine** as of **React Native 0.70**. This section explains how to enable Hermes on older versions of React Native. First, ensure you’re using **_at least version 0.60.4_** of React Native to enable Hermes on **Android** or **_0.64 of React Native_** to enable Hermes on **iOS**.

If you have an existing app based on an earlier version of React Native, you will have to upgrade it first. After upgrading the app, make sure everything works before trying to switch to Hermes.

> **Each Hermes release is aimed at a specific RN version.** The rule of thumb is to always follow Hermes releases strictly. Version mismatch can result in instant crash of your apps in the worst case scenario.

### Enable in Android

Edit your **android/gradle.properties** file and make sure **hermesEnabled** is true:

    hermesEnabled=true

> This property was added in React Native 0.71. If you can’t find it in your **gradle.properties** file, please refer to the documentation for the corresponding React Native version you're using.

Also, if you’re using **ProGuard**, you will need to add these rules in proguard-rules.pro :

    -keep class com.facebook.hermes.unicode.** { *; }
    -keep class com.facebook.jni.** { *; }

Next, if you’ve already built your app at least once, clean the build:

    cd android && ./gradlew clean

That’s it! You should now be able to develop and deploy your app as usual:

    npx react-native run-android

### Enable in iOS

Since React Native 0.64, Hermes also runs on iOS. To enable Hermes for iOS, edit your **ios/Podfile** file and make the change illustrated below:

![This is from RN 0.71](https://cdn-images-1.medium.com/max/3280/1*9XFxfEtvw2tfXprfm8CUwg.png)

By default, you will be using Hermes if you’re on the New Architecture. By specifying a value such as true or false you can enable/disable Hermes as you wish. Like bellow 👇

![](https://cdn-images-1.medium.com/max/2000/1*RCIcRQskQNf8-A-3wOqbbQ.png)

Once you’ve configured it, you can install the Hermes **pods** with:

    cd ios && pod install

That’s it! You should now be able to develop and deploy your app as usual:

    npx react-native run-ios

You are all set 🚀

## Static Hermes

**Static Hermes** is the next version of Hermes, which has an extra feature that makes your app even faster and smaller.

Static Hermes can **compile** your JavaScript code into **native code**, which is the code that your device understands directly. This means that your app does not need to use Hermes or any other JavaScript engine to run, because it already has the native code inside it.

**Static Hermes** can do this only if you use **TypeScript** or **Flow**, which are tools that help you write better JavaScript code by checking the types of your variables and functions.

The main difference between **Hermes** and **Static Hermes** is that **Hermes compiles your JavaScript code into bytecode at runtime**, which means when your app starts running on your device. **Static Hermes compiles your JavaScript code into native code at build time**, which means when you create your app on your computer. This makes Static Hermes faster and smaller than Hermes, because it does not need to do any extra work at runtime.

[Static Hermes was first introduced at React Native EU — 2023. It is still in experiment.](https://speakerdeck.com/tmikov2023/static-hermes-react-native-eu-2023-announcement) I will write an in details article on Static Hermes 🙇‍♂️.

## Next Read

Now that you have successfully learned **how to enable Hermes** for both iOS and Android, **you should know how to enable the New Architecture** in both iOS and Android. This is because Hermes is a part of the New Architecture provided by the React Native team and **Hermes cannot show its full power without enabling the New Architecture**. So read the article below to enable the full New Architecture of your React Native app.

**Article Link:** [React Native New Architecture (How to enable in new Android and IOS app)](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/New-Architecture/How-to-Enable-New-Architecture.md)

Also, if you want to improve the code quality and optimize your React Native code, read this 👇

**_Article link:_** [React Native app Performance Optimization: IOS & Android](https://medium.com/@anisurrahmanbup/react-native-app-performance-optimization-ios-android-be-a-sr-react-native-engineer-today-767cfcb0ed70)

### [🙏 If you find it helpful, please give a STAR (click here) ️⭐️ ⭐️](https://github.com/anisurrahman072/React-Native-Advanced-Guide)

Thank you for reading this article. I enjoy sharing my **5 years** of experience in **React-native**, **JavaScript**, **React** & **Node.js** with you every day. If you enjoyed reading this article, I would appreciate it if you could follow me on [**Twitter**](https://twitter.com/anis_RNCore) & [**Medium**](https://medium.com/@anisurrahmanbup).

If you find any **ISSUE** in this Guide BOOK, please create a **PR** to help the community 🔥
