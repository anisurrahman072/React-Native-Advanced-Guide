# React Native — How to enable New Architecture (New Android and IOS app)

### All the commands & steps to enable New Architecture - In this Guide 🔥

![](https://cdn-images-1.medium.com/max/5760/1*hQOpw7D3rGrfPD4GWmkdBw.png)

## Perquisites before start

Since you are going to create an app with **new architecture**, you should understand the **full flow** of it. Therefore, I strongly recommend that you read this article first and then come back here.

**_Article link:_** [React Native New Architecture in depth](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/New-Architecture/New-Architecture-in-depth.md)

_If you already have enough knowledge about the new architecture of React Native and how its components are interconnected, you can skip the article above. You can proceed to the next section._

## React Native version

At the time of writing this article, the **latest version of React Native is 0.72**.

> The New **Architecture is available** in React Native version **0.68 or later**.

## Implementation

> I assume you have read my previous article. Therefore, I will go straight to the part where you can start with the new architecture.

This **article is for CLI only**, not for Expo. The new architecture is not available for Expo users yet. You will have to wait for a future release of the Expo SDK.

## Development Environment

To proceed, you need to complete all the steps in the [Setting up the development environment section](https://reactnative.dev/docs/environment-setup?guide=native) under the React Native CLI QuickStart tab from **React Native official documentation**.

If following the setup guide, stop when you reach the section “**Running your React Native Application”**, and resume following this article.

## Creating a New Application

If you previously installed a **global** **_react-native-cli_** package, please **remove it** as it may cause unexpected issues:

    npm uninstall -g react-native-cli @react-native-community/cli

If you already have your development environment set up, create a new React Native project from the template:

    npx react-native@latest init OneClickDev

## Configuration

Follow the steps below to **enable the New Architecture** and build the app.

## Enable Hermes

**Hermes** is an **open-source JavaScript engine** optimized for React Native. Hermes will be the default engine in the future, and React Native team highly recommends using it.

Read this article to learn more about **how to enable Hermes** in both **iOS & Android** 👇

**Article Link:** [React Native Performance optimization by enabling Hermes](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/New-Architecture/Hermes-and-Static-Hermes-in-depth.md)

## Enable the New Architecture

This is the most exciting part.

### Target OS (Android)

Set the **newArchEnabled** property to **true** by either:

- Changing the corresponding line in **android/gradle.properties** file “or”

- Setting the environment variable ORG_GRADLE_PROJECT_newArchEnabled = true

Then build and run the app as usual:

    npx react-native run-android

You may notice **longer build times** with the New Architecture due to **additional step of C++ compilation** with the Android NDK. To improve your build time.

### Target OS (iOS)

Navigate to the **ios directory** and run the following:

    bundle install && RCT_NEW_ARCH_ENABLED=1 bundle exec pod install

Then build and run the app as usual:

    npx react-native run-android

> NOTE: In future when you do a pod install command then all new architecture code will be removed from pod file.

So to solve this follow this 👇

Add this is your **_package.json_** file 👇

![](https://cdn-images-1.medium.com/max/2304/1*MmD2M4LwXLoIZEBpFsAr4w.png)

The line is here for ease of access 👇

    "pod-install": "cd ios && RCT_NEW_ARCH_ENABLED=1 bundle exec pod install"

Now **always run this bellow command** in the **root directory** of the project instead of **pod install** command

    yarn pod-install

## Confirming the New Architecture is in Use

After you build and run the app when Metro serves the JavaScript bundle, you should see **"fabric": true** in the Metro logs:

![](https://cdn-images-1.medium.com/max/2904/1*-Wn8ThR0Q1tDvGkFpnH5rQ.png)

You are all set 🎉

**Very soon I will publish another article on how to migrate an existing app into New Architecture 🚀**

### [🙏 If you find it helpful, please give a STAR (click here) ️⭐️ ⭐️](https://github.com/anisurrahman072/React-Native-Advanced-Guide)

Thank you for reading this article. I enjoy sharing my **5 years** of experience in **React-native**, **JavaScript**, **React** & **Node.js** with you every day. If you enjoyed reading this article, I would appreciate it if you could follow me on [**Twitter**](https://twitter.com/anis_RNCore) & [**Medium**](https://medium.com/@anisurrahmanbup).

If you find any **ISSUE** in this Guide BOOK, please create a **PR** to help the community 🔥
