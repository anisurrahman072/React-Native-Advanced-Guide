# React Native — Ultimate Guide on New Architecture in depth

### Hermes, JSI, Fabric, Yoga, Turbo Module, Codegen — All in one 🔥

![](https://cdn-images-1.medium.com/max/5760/1*udRjfqFoyN7zSXdnI9uZvg.png)

_I have found tons of articles on the internet about the **new architecture** of React Native, but the problem is they were too brief and **lacked sufficient information**. This made it hard to understand it clearly. Finally, I have gathered all the info **from the official documentation** of React Native and other sources. **I can assure you that you will get the best overview of the new architecture** of React Native and also learn about the **relations between each of the new terms** that the React Native team introduced in the documentation._

**_Take a deep breath and grab a cup of coffee for a long article, so that you won’t feel sleepy 😃._**

## What we will learn

- [Terms of React Native (Get some basic)](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/New-Architecture/New-Architecture-in-depth.md#terms-of-react-native-get-some-basic)

- [OLD architecture (Quick overview)](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/New-Architecture/New-Architecture-in-depth.md#old-architecture-quick-overview)

- [OLD Architecture drawbacks](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/New-Architecture/New-Architecture-in-depth.md#old-architecture-drawbacks)

- [New Architecture of React Native (Quick overview)](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/New-Architecture/New-Architecture-in-depth.md#new-architecture-of-react-native-quick-overview)

- [New Architecture two Phases](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/New-Architecture/New-Architecture-in-depth.md#new-architecture-two-phases)

- [Codegen (Native Code Generator)](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/New-Architecture/New-Architecture-in-depth.md#codegen-native-code-generator)

- [JSI (JavaScript Interface)](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/New-Architecture/New-Architecture-in-depth.md#jsi-javascript-interface)

- [How can JavaScript call native methods with JSI?](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/New-Architecture/New-Architecture-in-depth.md#how-can-javascript-call-native-methods-with-jsi)

- [How JSI synchronous made it great!](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/New-Architecture/New-Architecture-in-depth.md#how-jsi-synchronous-made-it-great)

- [Hermes Engine](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/New-Architecture/New-Architecture-in-depth.md#hermes-engine)

- [Is Hermes a good choice?](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/New-Architecture/New-Architecture-in-depth.md#is-hermes-a-good-choice)

- [Does Hermes make React Native faster?](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/New-Architecture/New-Architecture-in-depth.md#does-hermes-make-react-native-faster)

- [How Hermes improves React Native performance?](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/New-Architecture/New-Architecture-in-depth.md#how-hermes-improves-react-native-performance)

- [Turbo Modules](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/New-Architecture/New-Architecture-in-depth.md#turbo-modules)

- [Fabric (New Rendering Engine)](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/New-Architecture/New-Architecture-in-depth.md#fabric-new-rendering-engine)

- [The Fabric render pipeline (three phases)](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/New-Architecture/New-Architecture-in-depth.md#the-fabric-render-pipeline-three-phases)

- [Flow of New Architecture](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/New-Architecture/New-Architecture-in-depth.md#flow-of-new-architecture)

## Terms of React Native (Get some basic)

To understand the **New Architecture,** we need to first understand some terms of React Native. Also, we need to understand some terms from the OLD architecture. Let’s understand those first.

### Native Modules

**“Native modules”** are pieces of **Native code** that are written in a native platform language, such as **Java** for Android or **Objective-C** for iOS, and can be called from JavaScript.

### Native Module System

**Native module system** is a system by which **JavaScript** and **“Native modules”** communicate with each other. The **Native module system** allows your **JavaScript** code to use native features and libraries that are not available in JavaScript, such as **camera**, **sensors**, or **encryption**.

There are **2 types** of Native Module System in React Native

1.  **OLD native module** **system** (aka: **“Bridge based Native Module system”** or **“Legacy native module system”** that uses **JSON data Serialization**)

2.  **New native module** **system** (aka: **Turbo Module system** that uses **JSI.** JSI (JavaScript Interface) was written by C++)

### **Typed JavaScript code**

**Typed JavaScript code** is code that is **written in JavaScript (using Flow **or** Typescript)**, but with some extra information about the **types** of the variables and functions. **Types** are labels that tell you **what kind of data** a variable or a function can hold or return. For example, a **type** can be a **number**, a **string**, a **Boolean**, an **array**, an **object**, or a **function**. Typed JavaScript code can **help you avoid errors** and bugs caused by incorrect or missing types. For example, if you try to add a number and a string together, typed JavaScript code will warn you that this is not possible.

### **Interface elements**

**Interface elements** are **components** or **modules** that can be used in a **React Native app**. A component is a part of the user interface (UI), such as a button, a text, or an image. A **module** is a piece of code that can **perform some logic** or functionality, such as accessing the camera, the sensors, or the encryption libraries. An **interface element** has an **“_interface”_** and **_“an implementation”_**. The **“_interface”_** is a set of properties and methods that define how it can be used and interacted with. The **_“implementation”_** is the code that actually performs the logic and functionality of the element.

## OLD architecture (Quick overview)

In a nutshell, **each react native app** is composed of **two main** parts

1.  The **JavaScript code** and

2.  The **native code**.

The code is executed over **three threads**:

1. **The JavaScript thread:** to run JS Bundle with specific JavaScript engine

2. **The Native/UI thread:** it runs the native code and handles any user interface operation like rendering or gesture events.

3. **The Shadow thread:** which calculates the position of native elements in the layout.

The **relationship** between the **JavaScript** and **Native threads** is mediated by a component called the **Bridge**.

![Old Architecture of react Native](https://cdn-images-1.medium.com/max/3504/1*K_fgQAbLpCSA2YZFAuswAQ.png)

## OLD Architecture drawbacks

Although **React Native** apps are fast enough, they **still lag behind native solutions** in terms of performance. The reason lies with the architecture used.

The bridge in the **old architecture works by serializing** all data that must be passed from JavaScript to native.

The **Bridge** have some **limitations**:

- **It is asynchronous:** one layer submits data to a bridge and waits for the data to be processed by the other layer, even when it’s unnecessary.

- **It is single threaded:** JavaScript used to be single-threaded, so computation that takes place has to be performed on that single thread.

- **Overhead costs:** each time one layer communicates with another, **it must serialize the data**. The other layer **must deserialize it**. JSON was chosen for its simplicity and human readability, despite being a lightweight format it has a cost associated with it.

## New Architecture of React Native (Quick overview)

The **New Architecture** dropped the concept of The **Bridge** in favour of the **JavaScript Interface (JSI)**, with new components, which increased performance (the new architecture is available starting from RN 0.68).

### All components of New Architecture

Let’s know all the name of the components of New Architecture

- **Codegen** (Native code generator)

- **JSI** _(JavaScript Interface)_

- **Hermes Engine** _(A **JS engine** that **runs JS** code in devices)_

- **Turbo Module** _(It Implements **Native Module** by using **JSI** & **Native Code**)_

- **Fabric** _(Native **UI renderer**/ New render engine)_

- **Fabric renderer** _(The new render pipeline creator)_

- **Yoga** _(Cross platform layout engine. It was also in OLD architecture)_

We will discuss each & every components of above later in this Article 🚀

## New Architecture two Phases

The **new Architecture** of **React Native** completes its full cycle in **2 phases**.

1.  **Phase 1:** App **Build** time

2.  **Phase 2:** App **Run** time

### Phase 1: App Build time

When a developer turns on both **Codegen** and **Turbo Module** in their app and then gives a **build command** just before production deployment to create an **APK** for **Android** or an **IAP** for **iOS** device, the following steps are done from the new architecture flow:

- The **Build** command **compiles** the JavaScript code into **bytecode**.

- It also creates **native code** during the build time by using **_Codegen_**.

The **bytecode** and **native code** are then included in the **app package**, which can be installed on the device.

> Remember, **Codegen** only works in **App Build time**. **Not** in **App Run time**.

### Phase 2: App Run time

When a user launches the app, the **rest of the work happens** from the new architecture flow of the React Native app. Mainly **two big** **components** run when the app has been **launched by any user** on their device:

1.  **Turbo Module** component

2.  **Fabric** component

All the other **sub components** of React Native’s **new architecture** also come inside this **“Phase 2: App Run time”**. These are 👇

- **Hermes engine**

- **JSI (JavaScript Interface)**

- **Native Module**

- **Yoga**

- **Fabric Renderer**
  > Remember once again: **Codegen** already **ran** in **“Phase 1: App Build time”.** At the end of the Article, we will see the full flow of how the New Architecture works. Also, we will see the relation between each component of new architecture. For now, let’s understand each component of New Architecture closely 👇👇

## Codegen (Native Code Generator)

**Codegen** specially do these **2 jobs** in **new architecture** of React Native

1.  **Static type checking**

2.  **Generate** **“Native code”**

Let’s understand these 2 more clearly below.

### Static type checking

- JavaScript is a **dynamically typed** (you don’t need to define the type of a variable) language, and JSI is written in C++, which is a statically typed _(you must have to define variable type)_ language. Consequently, there are some **communication issues** between the two (JS and C++).

- That’s why the new architecture includes a **static type checker** called CodeGen. It solves the type related communication issue between JavaScript & C++.
  > Remember that **Codegen** makes ready **Native Code** for **JSI**. **Codegen** don’t use **JSI**.

### Generate “Native code”

Codegen is **responsible** to generate **Native Code** for **2 big components** of New Architecture. These are:

1.  The **Turbo Module** component and

2.  The **Fabric** component

Both of these **2 big components** of New Architecture needs **Native Code** that should be generated by **Codegen**.

Let’s understand **how Codegen generate Native Code** 👇

- You write **_“typed JavaScript code”_** to define the **Native** **components** or **Native** **modules** that you want to use in your app.

- Codegen creates **_“native code”_** for **each platform** as **output** from your written **_“typed JavaScript code”_.**

- These generated **_“native code”_** can communicate with **_“typed JavaScript code”_** directly, without using the bridge. As a result **Codegen** makes the communication between JavaScript and native code **faster** and more **reliable**, since it avoids using the bridge.

- CodeGen **generates** native code at **build time** instead of **run time.**

- By using **Codegen**, you don’t have to write the **_“native code”_** yourself. You just have to **write **the** _“typed JavaScript code”_** that defines the interface of your component or module. **Codegen** will do the rest for you.

- The **advantage** of using **Codegen** is that it **reduces the amount of work** required for **creating** and **maintaining** **native modules** and **components**.

## JSI (JavaScript Interface)

**JavaScript Interface (JSI)** is the deepest part of the **New Architecture** of React Native and **it is being used by all of these** components of New Architecture**👇**

1.  **Hermes Engine** _(A **JS engine** that **runs JS** code in devices)_

2.  **Turbo Module** _(It Implements **Native Module** by using **JSI** & **Native Code**)_

3.  **Fabric** _(Native **UI renderer**/ New render engine)_

We will see about these in next sections. But for now let’s **understand JSI first** clearly. Then we will move to other parts of the **New Architecture**.

**JSI (JavaScript Interface)** was written in **C++**. It **replaced** the **bridge** from the **OLD architecture** and provide a **direct**, **native interface** to **JavaScript** objects and functions. This idea unlocks several benefits 👇

- **Concurrency**: JavaScript can invoke functions that are executed on **different threads**.

- **Synchronous execution:** the capability to execute **synchronously** those functions that should not have been **asynchronous** in the **first place**.

- **Lower overhead:** The New Architecture **does not need to serialize or deserialize data anymore**, which eliminates the need for serialization taxes.

- **Code sharing:** The **introduction of C++** has enabled the development of platform-independent code, which can be shared easily between platforms.

- **Type safety:** To ensure that **JavaScript** can properly invoke methods on **C++ objects**, a layer of code has been added to the language. This code is generated starting from some JavaScript specifications that must be typed through **Flow** or **TypeScript**.

- **Lightweight:** JSI is a lightweight **general-purpose** JavaScript interface, written in C++, that can be used by the JavaScript engine to directly invoke methods in the native realm.

- **Decouple the interface from the JS Engine:** The OLD architecture uses the **JSC (JavaScriptCore) Engine**. The Bridge was only compatible with this particular JSC engine, however the **new architecture** will decouple the interface from the Engine, **enabling the use of other JavaScript Engines** like Chakra, v8 and Hermes, etc.

## How can JavaScript call native methods with JSI?

Through the JSI, **Native methods** will be exposed to JavaScript **via C++** objects. These **objects can be referenced by JavaScript code**, thus can be invoked directly. This is similar to the web, where JavaScript code can reference any DOM element, and call methods on that element.

For Example: when you write:

    const container = document.createElement(‘div’);

Here, the container is a **JavaScript variable that holds a reference to a DOM element**. When we call any method on the “container” variable, it will in turn call the method on the DOM element. Similarly, **JSI works in the same way**.

> The JSI will allow **JavaScript** code to **hold a reference to Native Modules**, so JavaScript can call methods on this reference directly.

To Sum it up, **JSI** will allow using **other JavaScript engines** and will allow for complete interoperability between the threads.

> One of the **main advantages of the JSI** is that it’s written in **C++**. This means that **React Native can target a wide range of devices**, including smart TVs, watches and other devices.

### ❝ **JSI (JavaScript Interface)** opens the door of Single Interface for All Platforms by C++ ❞

## How JSI synchronous made it great!

You might be wondering how JSI **synchronous** made it great, since **asynchronous** is the best like JS behaviour. In **asynchronous**, we don’t need to wait for a task to complete. It means that **asynchronous is more performant** than **synchronous**. But how **synchronous** made it great **JSI**?

Well, the answer is that JSI does not make everything **synchronous**, it just gives the option to do so when needed. Asynchronous calls are still preferred for most cases, because they don’t block the UI thread or the JS thread. However, there are some situations where synchronous calls are necessary or beneficial, such as:

- **Initializing native modules:** some native modules need to be initialized before they can be used, and this can cause delays or crashes if done asynchronously. With JSI, native modules can be initialized synchronously when the app starts, avoiding these issues.

- **Accessing constants:** some native modules expose constants that are used by the JS code, such as device information or platform-specific values. With JSI, these constants can be accessed synchronously from JS, without having to wait for a bridge message.

- **Calling synchronous native methods:** some native methods need to return a value immediately to the JS code, such as accessing the clipboard or getting the current location. With JSI, these methods can be called synchronously from JS, without having to use callbacks or promises.

As you can see, JSI synchronous made it great by allowing more flexibility and performance for React Native apps.

## Hermes Engine

**Hermes**, a **JavaScript engine** that runs on devices when a user launches an App in his device. Hermes has these benefits in short:

1.  It improves the **app size**

2.  It improves the **memory usage**, and

3.  It improves the **start-up time** of the app.

Here is the **flow of Hermes**. How **Hermes work** at the time of when a user launch the app in his device.

- A developer build **“bytecode”** of the React Native project **before production deployment**.

- Then , when any user **launch** the app in his device then **Hermes** loads that **“bytecode”** file which contains the **JavaScript code** & **“Native code”** of the app _(**“Native code”** was generated by **Codegen**)._

- The **bytecode** file is a simpler and more efficient form of code that can be **executed directly by Hermes**, without needing to be interpreted or compiled again.

- **Hermes** handles the **logic**, the **data**, and the **events** of the app, such as fetching data from an **API**, updating the **state**, or responding to **user input**.

- **Hermes** communicates with the **“Native code”** of the app using a feature called **JavaScript Interface** (JSI). **JSI allows Hermes** to **access native functions** and **objects directly**, without using the bridge.

- **Hermes** updates the **user interface** of the app **using Fabric**, a new rendering system for React Native. We will later know details about **Fabric** below.

## Is Hermes a good choice?

Since the **introduction of Hermes** as an option in JavaScript compiling engine in **React Native 0.64**, the JavaScript engine has seen tremendous support from the React Native developer community, especially since it is more performant.

Hermes is not just good for React Native applications, but **also reduces bundle size** and load time along with a GUI to visualize the performance metrics of your app during development. This feature helps developers learn how their applications will perform after release.

## Does Hermes make React Native faster?

According to research conducted by maintainers of React Native, Hermes is the most performant JavaScript engine for building React Native applications. The study evaluated three metrics (Time to Interactive TTI, binary size, and Memory consumption) to determine which engine performs best.

- **TTI** is the duration between when an app is launched and when users can interact with it.

- **Binary size** is the size of the bundled React Native application in APK (Android) or IPA (iOS)

- **Memory consumption** is the size of memory used when running the app.

[Here is a link to the complete article covering the research](https://reactnative.dev/blog/2022/07/08/hermes-as-the-default).

## How Hermes improves React Native performance

Let’s discuss the benefits of using Hermes as your JavaScript engine for React Native applications.

- **Pre-compilation:** Hermes precompiles app source code to bytecode before starting up.

- **Faster TTI:** Hermes reduces the TTI, resulting in a smooth user experience

- **Smaller app bundle size:** The size of applications compiled with Hermes is smaller than those built with other JavaScript engines.

## Turbo Modules

**Turbo Modules** is just a **Native Module system** which **replaced** the **OLD Native Module system**.

The **OLD Native Module system** is also known as **Bridge-based native module system** or **Legacy native module system.** The **OLD native module system** used the technique of JSON data serialization which was slow in performance.

The **New Native module system** is also known as “**Turbo Module”** which uses **JSI** technology instead of JSON data serialization. JSI (JavaScript Interface) was written in **C++**.

- **Turbo Module** is **a new way** of **implementing “Native modules”** in React Native. It implement Native Module by using **JSI** & “**Native Code”** that was generated by **Codegen**.

- In New Architecture, **Turbo Module** introduced **Lazy Loading** for **Native Modules** (e.g. Bluetooth, Geo Location and File Storage) to load when a user **launch an app**. In OLD architecture all Native Modules used in the app **must** be initialized in the **start-up**, even if the user **does not require** one of these modules 🥴.

- Turbo Modules **allow your JavaScript code** to **hold references** of these **Native modules**. As a result a particular Native Module will be loaded **only when** the Module is **required**. This improved app start-up time 💯.

- By the above reasons, **Turbo Modules** are called a new version of **Native Modules** in New Architecture.

- **As** in new architecture, **JavaScript** using **JSI** to communicate with **Native Modules**, so it will help you by **reducing the amount of work required for porting your app to multiple platforms**. This is because JSI was written in C++. **C++** is a language that **can run on multiple platforms**, such as Android, iOS, Windows, or macOS. It is also a language that can interact with other native languages, such as Java or Objective-C, through bindings. This means that **you can write your “Native module” logic in C++**, and then use bindings to expose it to the other native languages. This way, you can **share the same implementation across different platforms**, and only write the bindings for each platform.

### ❝ **JSI (JavaScript Interface)** opens the door of Single Interface for All Platforms by C++ ❞

## Fabric (New Rendering Engine)

**Fabric** is the **UIManager** that will be responsible for **rendering the UI** in devices. The difference now is that instead of communicating with JavaScript through a **bridge**, **Fabric** exposes its **functions** via **JavaScript** so the **JS side** and **Native side** (vice-versa) can communicate directly through **ref functions**. passing data between sides will be **performant**.

- **Fabric** uses **JSI** to communicate with **Hermes** and **native code**, without using the bridge.

- **Fabric** is a new rendering system for React Native, seeking to improve the interoperability of the framework with **host platforms (the platform of Native Side. **Ex: Android or iOS**)**, Improving communication between JavaScript and the native threads.

### Improved interoperability between React Native and host views

- A **host view** is a **tree representation** of the **UI elements** in the **host platform** (the device from which the app was launched by the user. Ex: Android or iOS).

- The **C++ core** shared by **different host platforms** (Ex: Android, iOS, MacOS, TvOS, etc) **improves interoperability between** React Native and the **host** and **enables React Native to render surfaces synchronously**. In the **OLD (legacy)** architecture, the **layout was asynchronous**, causing a [layout “jump” issue](https://github.com/react-navigation/stack/issues/366) when embedding a React Native rendered view.

### Improvements in data fetching

**Data fetching** in applications has become easier with the integration of **_React Suspense_**. Other **new features** available **in React 18** are **now enabled in the Fabric renderer**, such as **Concurrent Features**, which keeps the UI of our applications responsive during expensive state transitions.

## The Fabric render pipeline (three phases)

The **Fabric Renderer** is React Native’s **new rendering system**. It is a conceptual evolution of the legacy (old) render system and is **designed to unify more render logic in C++**, improve interoperability with host platforms (Ex: Android or iOS), and **unlock new capabilities** for React Native.

The Fabric render pipeline occurs in three phases:

1.  The **Render** phase

2.  The **Commit** phase

3.  The **Mount** phase

I have created a Flow chart of **how the Fabric Render Pipeline works**. Look a bit into it 👇. Don’t be too much into it now as we are going to discuss in details about these 3 phase below 🚀

![](https://cdn-images-1.medium.com/max/2000/1*EcNF1tILs1MGT54YhrW7UQ.png)

### The Render phase

In this phase, **React executes** code to **create React element trees**. A **React Element** is a **plain JavaScript object** that describes what appears on the screen.

The **React element tree** is used to render the **React shadow tree** in **C++**. The **Fabric Renderer** **creates a shadow tree**, which is made up of **React shadow nodes** which represent components to be mounted.

    const App = () => {
      return (
        <View>
          <Text>Hello World</Text>
        </View>
      );
    };

During the **Render phase**, a **shadow node** is created for **each React element**. This shadow node is created **synchronously**, only for React **host components**, and **not for composite components** such as **<View>**.

When transformed into a Shadow Block , the **<View>** is translated into a **<ViewShadowNode>** object.

The new **renderer** will automatically reflect the **parent-child relationships** between React element nodes. The above process shows how the React shadow tree is assembled; once it is complete, **the renderer triggers a commit** of the **element tree**.

Here is a representation of the **render phase**:

![](https://cdn-images-1.medium.com/max/2644/0*Mxc2HInNy9JxB85E)

### The Commit phase

**Cross-platform layout engine Yoga** performs operations that occur during the **commit phase**, which consist of two operations:

1.  **Layout calculation** and

2.  **Tree promotion**.

The **layout calculation generates** the **position and size of each React shadow node** by invoking Yoga to calculate its layout.

The Tree Promotion operation promotes the new React **shadow tree as the next tree to be mounted**. This promotion represents the latest state of the React element tree.

![](https://cdn-images-1.medium.com/max/2800/0*UKULLkYZTTEsKCTd)

### The Mount phase

This is the phase in which the **React Shadow Tree (which contains the data from the layout calculation)** is transformed into a **host view tree** _(the view tree for **host device**. The **device from where the app was launched**. Ex: Android or iOS)_ **with rendered pixels** on the screen. The **Fabric renderer** creates a **corresponding host view** for **each React shadow node** and mounts it on screen.

The **React Shadow Tree**, which contains the data from the **layout calculation**, is **transformed into** a **host view tree** **with rendered pixels** on the screen. The Fabric renderer is responsible for creating host views and mounting them on screen.

![](https://cdn-images-1.medium.com/max/2800/0*L4XdkKusYl5D4B-k)

_Wow, that’s great! If you have already studied this far, then it is really a great achievement for you 🎉. You now understand how the full architecture works and what the relationship is between each component of the new architecture of React Native._

_Just a little more patience as we are almost at the end of the article. I just want to let you know about the final flow of the new architecture of React Native._

## Flow of New Architecture

Please look a bit into this image first 👇

![New Architecture of React Native](https://cdn-images-1.medium.com/max/2800/0*ZY7g26oM69HCS98u)

Here is the **full flow of React Native new architecture**👇

- The app starts by **loading the bytecode** file that contains the JavaScript code of the app. The bytecode file is a simpler and more efficient form of code that can be **executed directly by Hermes**, a **JavaScript engine** that runs on Android devices & iOS devices. Hermes improves the app size, the memory usage, and the start-up time of the app.

- Then, the **JavaScript** code of the app **communicates** with the **native code** of the app using a feature called **JavaScript Interface (JSI)**, which allows direct communication between JavaScript and native code, without using the bridge. The bridge is a mechanism that sends messages and data between JavaScript and native code, which can be slow and inefficient. **JSI** **improves the performance** and interoperability of the app, as well as enables new features that are not possible with the bridge.

- Then, the **native code** of the app **implements native modules** using a feature called **Turbo Module**, which is **a new way of creating native modules** that can be accessed from JavaScript. **Turbo Module** also **uses JSI** to communicate with JavaScript code, without using the bridge. **Turbo Module improves the performance** and reliability of native modules, as well as simplifies their development and maintenance.

- Then, the **JavaScript code** of the app defines user interface elements using **React components**, which are pieces of code that describe how a part of the app should look and behave. **React components** are **translated** into **native code** using a feature called **Fabric**, which is **a new rendering system** for React Native. **Fabric** also **uses JSI** to communicate with JavaScript and native code, without using the bridge. **Fabric improves the speed and responsiveness** of user interface updates, as well as integrates better with native features.

- Then, **Fabric** uses a library called **Yoga** to **calculate the layout of user interface** elements, such as their **position**, **size**, **alignment**, etc. **Yoga is a cross-platform layout engine** that implements Flex box, a CSS standard for web development. Yoga ensures that user interface elements are consistent across different devices and platforms.

- Finally, **Fabric uses** a component called **Fabric Renderer** to **draw user interface elements on the screen**, using native graphics APIs such as Core Animation on iOS or SurfaceView on Android. **Fabric Renderer handles** **animations**, **gestures**, **accessibility**, and **other features** that make user interface elements interactive and engaging.

## Conclusion

The **new architecture** of **React Native** improves the **performance** of React Native apps by reducing the overhead of **communication** between **JavaScript** and **native code**, and by enabling concurrent rendering of multiple screens.

It **enhances the stability** of **React Native** apps by avoiding crashes and memory leaks caused by the old bridge-based architecture, and by providing better error handling and debugging tools.

It **improves the developer experience** of React Native apps by simplifying the creation and integration of native modules, and by supporting modern JavaScript features and libraries.

## Next Read

Congratulations on mastering the **New Architecture of React Native**! However, **don’t stop there**. To fully experience the benefits of the New Architecture proposed by the RN team, you need to **enable** both the **New Architecture** and the **Hermes JS engine** in your app.

1.  Enable **Hermes** in your React native app

2.  Enable **New Architecture** of React native in your App

If you want to **become an expert in performance optimization**, you need to learn how to use these two features in your app. Don’t worry, I have got you covered. I have written two **detailed articles that will teach you everything** you need to know about them. You can find them below:

- **Article Link:** [How to enable **Hermes** in your Old React native app](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/New-Architecture/Hermes-and-Static-Hermes-in-depth.md)

- **Article Link:** [How to enable **New Architecture** in your React native App](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/New-Architecture/How-to-Enable-New-Architecture.md)

### [🙏 If you find it helpful, please give a STAR (click here) ⭐️⭐️](https://github.com/anisurrahman072/React-Native-Advanced-Guide)

Thank you for reading this article. I enjoy sharing my **5 years** of experience in **JavaScript**, **React**, **React-native** & **Node.js** with you every day. If you enjoyed reading this article, I would appreciate it if you could follow me on [**Twitter**](https://twitter.com/anis_RNCore) & [**Medium**](https://medium.com/@anisurrahmanbup).

If you find any **ISSUE** in this Guide BOOK, please create a **PR** to help the community 🚀
