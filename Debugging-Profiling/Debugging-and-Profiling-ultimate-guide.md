# React Native — Ultimate Guide on Debugging , Profiling & Advanced Optimization (iOS + Android)

### “Find why your app is SLOW” — by this article 🔥

![](https://cdn-images-1.medium.com/max/5760/1*EUZnJP1gClIZtUEiDamVrw.png)

_This article took me **16 days** to complete, with each day 5–6 hours of work besides my full-time office job (Sr. React Native Engineering, USA, remote)._

**Note:** I covered the whole **standard journey** from my experience on **React Native Debugging**, based on the **React Native official documentation** and the **CallStack Performance Optimization book** (the top React Native standard-making company). After completing this article, you will surely be an expert in React Native Debugging. I did all the R&D with **RN v0.71**.

**_Take a deep breath and grab a cup of coffee for a long article, so that you won’t feel sleepy 😃._**

### **Let’s see in a summary what this article will teach us.**

1.  [Accessing the Dev Menu](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Debugging-Profiling/Debugging-and-Profiling-ultimate-guide.md#accessing-the-dev-menu)

2.  [Fast Refresh](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Debugging-Profiling/Debugging-and-Profiling-ultimate-guide.md#fast-refresh)

3.  [LogBox](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Debugging-Profiling/Debugging-and-Profiling-ultimate-guide.md#logbox)

4.  [Chrome Developer Tools](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Debugging-Profiling/Debugging-and-Profiling-ultimate-guide.md#chrome-developer-tools)

5.  [Performance Monitor](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Debugging-Profiling/Debugging-and-Profiling-ultimate-guide.md#performance-monitor)

6.  [Details about FPS (Frame Per Second)](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Debugging-Profiling/Debugging-and-Profiling-ultimate-guide.md#details-about-fps-frame-per-second)

7.  [Common reasons of performance problems (Getting low FPS)](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Debugging-Profiling/Debugging-and-Profiling-ultimate-guide.md#common-reasons-of-performance-problems-getting-low-fps)

8.  [React Native four Threads](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Debugging-Profiling/Debugging-and-Profiling-ultimate-guide.md#react-native-four-threads)

9.  [Profiling Introduction](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Debugging-Profiling/Debugging-and-Profiling-ultimate-guide.md#profiling-introduction)

10. [Profiling iOS](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Debugging-Profiling/Debugging-and-Profiling-ultimate-guide.md#profiling-ios)

11. [Profiling iOS by Xcode Instruments](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Debugging-Profiling/Debugging-and-Profiling-ultimate-guide.md#profiling-ios-by-xcode-instruments)

12. [Flipper for JS Context tracking](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Debugging-Profiling/Debugging-and-Profiling-ultimate-guide.md#flipper-for-js-context-tracking)

13. [Profiling iOS by Flipper with “Hermes Debugger (RN)”](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Debugging-Profiling/Debugging-and-Profiling-ultimate-guide.md#profiling-ios-by-flipper-with-hermes-debugger-rn)

14. [Profiling Android](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Debugging-Profiling/Debugging-and-Profiling-ultimate-guide.md#profiling-android)

15. [Android Profiler in Android Studio](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Debugging-Profiling/Debugging-and-Profiling-ultimate-guide.md#android-profiler-in-android-studio)

16. [System Tracing with Android Studio CPU Profiler](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Debugging-Profiling/Debugging-and-Profiling-ultimate-guide.md#system-tracing-with-android-studio-cpu-profiler)

17. [Flipper performance plugin for Android](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Debugging-Profiling/Debugging-and-Profiling-ultimate-guide.md#flipper-performance-plugin-for-android)

18. [Replacing Flipper in 0.73+ ?](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Debugging-Profiling/Debugging-and-Profiling-ultimate-guide.md#replacing-flipper-in-073-)

### Let’s start React Native Debugging 🙇‍♂️

## Accessing the Dev Menu

React Native provides an **in-app developer menu** which offers several debugging options. You can access the Dev Menu by **shaking your device** or via keyboard shortcuts.

- **iOS Simulator:** Cmd ⌘ + D (or Device > Shake)

- **Android emulators:** Cmd ⌘ + M (macOS) or Ctrl + M (Windows and Linux)

Alternatively for Android devices and emulators, you can run **_adb shell input keyevent 82_** in your terminal.

Also you can use VSCode extension **_React Native Tools _** to open dev menu (bridge). Install the extension & then press Cmd ⌘ + Shift + P and type **_React Native: Show Dev Menu _**& hit enter.

> The Dev Menu is disabled in release (production) builds.

Dev menu is looking like below (IOS & Android)

![Dev Menu (From my IOS & Android App)](https://cdn-images-1.medium.com/max/5356/1*u4SQqT9GOEfIIq47jNd11A.png)

> Let’s Understand options of Dev Menu (Bridge) 👇

## Fast Refresh

**Fast Refresh** is a React Native feature that allows you to **get near-instant feedback for changes** in your React components. Fast Refresh is enabled by default, and you can toggle **“Enable Fast Refresh”** in the React Native Dev Menu. With Fast Refresh enabled, most edits should be visible within a second or two.

### How Fast Refresh works?

- If you edit a **module that only exports React component(s)**, Fast Refresh will update the code only for that module, and re-render your component. You can edit anything in that file, including styles, rendering logic, event handlers, or effects.

- If you edit a module with exports that _aren’t_ React components, Fast Refresh will re-run both that module, and the other modules importing it. So if both Button.js and Modal.js import Theme.js, editing Theme.js will update both components.

- Finally, if you **edit a file** that’s imported by **modules outside of the React tree**, Fast Refresh will fall back to doing a full reload. You might have a file which renders a React component but also exports a value that is imported by a non-React component.

### Error Resilience of Fast Refresh

If you make a **syntax error** during a Fast Refresh session, you can fix it and save the file again. The redbox will disappear. Modules with syntax errors are prevented from running, so you won’t need to reload the app.

If you make a **runtime error** during the **module initialization** (for example, typing Style.create instead of StyleSheet.create), the Fast Refresh session will continue once you fix the error. The redbox will disappear, and the module will be updated.

If you **make a mistake that leads to a runtime error** inside your **component**, the Fast Refresh session will _also_ continue after you fix the error. In that case, React will remount your application using the updated code.

### Limitations of Fast Refresh

Fast Refresh tries to preserve local React state in the component you’re editing, but only if it’s safe to do so. Here’s a few reasons why **you might see local state being reset on every edit to a file**:

- **Local state** is **not preserved** for **class components** (only function components and Hooks preserve state).

- The module you’re editing might have _other_ exports in addition to a React component.

- Sometimes, a module would export the result of calling higher-order component like createNavigationContainer(MyScreen). **If the returned component is a class**, **state will be reset**.

### Pro Tips about Fast Refresh

Sometimes you might want to _force_ the state to be reset, and a component to be remounted. For example, this can be handy if you’re tweaking an animation that only happens on mount. To do this, you can add **// @refresh reset** anywhere in the file **you're editing**. This directive is local to the file, and instructs Fast Refresh to remount components defined in that file on every edit.

### Fast Refresh and Hooks[​](https://reactnative.dev/docs/fast-refresh#fast-refresh-and-hooks)

When possible, Fast Refresh attempts to preserve the state of your component between edits. In particular, useState and useRef preserve their previous values as long as you don't change their arguments or the order of the Hook calls.

Hooks with dependencies — such as useEffect, useMemo, and useCallback—will _always_ update during Fast Refresh. Their list of dependencies will be ignored while Fast Refresh is happening.

## LogBox

Errors and warnings in **development builds** are displayed in LogBox inside your app.

> LogBox is disabled in release (production) builds.

### This is how LogBox look like

![React Native **LogBox** (Android & IOS)](https://cdn-images-1.medium.com/max/5204/1*iRINMCRygjNtl1LhdjybBw.png)

### Console Errors and Warnings

Console errors and warnings are displayed as on-screen notifications with a **red** or **yellow** badge, and the number of errors or warning in the console respectively. To view a console error or warnings, tap the notification to view the full screen information about the log and to paginate through all of the logs in the console.

These notifications can be hidden using **LogBox.ignoreAllLogs()**. This is useful when giving product demos, for example. Additionally, notifications can be hidden on a per-log basis via **LogBox.ignoreLogs()**. This is useful when there's a noisy warning that cannot be fixed, like those in a third-party dependency.

![How to ignore **LogBox** before demo](https://cdn-images-1.medium.com/max/2000/1*5jPRNleceub9eWxAZXZF1w.png)

Unhandled **_JavaScript errors_** such as undefined is not a function will automatically open a full screen LogBox error with the source of the error.

When **_syntax error_** occurs the full screen LogBox error will automatically open with the stack trace and location of the syntax error. This error is not dismissible because it represents invalid JavaScript execution that must be fixed before continuing with your app.

## Chrome Developer Tools

Follow this only 6 steps to activate **“Chrome Developer Tool”** for React Native App

![Only 6 steps how I activated Chrome Debug Tools](https://cdn-images-1.medium.com/max/3772/1*S720J_zYRw1n91iwlzNgkA.png)

### Useful Commands to copy & run

These are the commands I used to activate my **chrome debug tools** for React Native.

- **_yarn global add react-devtools_**

- **_react-devtools_**

- **_adb reverse tcp:8097 tcp:8097_**

### Tips & links

- If you’re new to Chrome DevTools, then I recommend learning about the [Console](https://developer.chrome.com/docs/devtools/#console) and [Sources](https://developer.chrome.com/docs/devtools/#sources) tabs in the docs.

- You may want to enable [Pause on Caught Exceptions](https://developer.chrome.com/docs/devtools/javascript/breakpoints/#exceptions) for a better debugging experience.

### Output of Chrome Developer tools (Android)

![This is how my **Chrome Debug Tools** look like **(Android)**](https://cdn-images-1.medium.com/max/5760/1*RrLq0ZDz4AyMUrrdtQmt4w.png)

### Output of Chrome Developer tools (IOS)

![This is how my **Chrome Debug Tools** look like **(IOS)**](https://cdn-images-1.medium.com/max/5760/1*UvNuGO8cqRmxRsPl4i955g.png)

### Debugging on a physical device (Android)

On Android 5.0+ devices connected via USB, you can use the **adb** command line tool to set up port forwarding from the device to your computer.

Command: **_adb reverse tcp:8081 tcp:8081_**

Alternatively, select **“Settings”** from the **Dev Menu**, then update the **“Debug server host for device”** setting to match the IP address of your computer.

### Debugging on a physical device (IOS)

On iOS devices, open the file **_RCTWebSocketExecutor.mm_** and change **"localhost"** to the **IP address** of your computer, then select **"Debug JS Remotely"** from the **Dev Menu**.

### Pro Tip (Issue on Dev Menu/ Debug tool)

If you run into any issues, it may be possible that one of your Chrome extensions is interacting in unexpected ways with the debugger. **Just Restart your laptop/ pc** as it solved mine after an exhaustive findings of in where actually still it connecting to an old debug tool.

## Performance Monitor

You can enable a performance overlay to help you debug performance problems by selecting **“Show Perf Monitor”** from the **Dev Menu** like below.

![**Performance Monitor** from **Dev Menu**](https://cdn-images-1.medium.com/max/5356/1*cY8BfLLiT04Yhes5p_rI_A.jpeg)

So, now below is the image from **my React Native app** (IOS + Android) after opening **Performance Monitor**.

![Performance Monitor (IOS + Android)](https://cdn-images-1.medium.com/max/5304/1*v6rw_WJqaU1N1jrG52HEbg.png)

The **performance monitor** in React Native app shows you some metrics that can help you to optimize your app’s performance and user experience. Here’s what each of the numbers means.

- **RAM**: This is the amount of memory used by your app. It includes both native and JavaScript memory usage. You want to keep this number as low as possible to avoid memory pressure and crashes.

- **JSC**: This is the amount of memory used by the JavaScriptCore engine, which runs your JavaScript code. **It’s a subset of the RAM usage.** You want to keep this number as low as possible to avoid garbage collection pauses and memory leaks.

- **Views**: This is the number of native views **(UI components)** created and destroyed by your app. The first number is the current number of views, and the second number is the peak number of views. You want to keep these numbers as low as possible to avoid unnecessary rendering and memory allocation.

- **UI**: This is the frame rate of the main thread, which handles the native UI rendering and user interactions. It’s measured in frames per second (FPS). **You want to keep this number as close to 60 as possible** to ensure a smooth and responsive UI.

- **JS**: This is the frame rate of the JavaScript thread, which handles your business logic, API calls, touch events, etc. It’s also measured in FPS. You want to keep this number as close to 60 as possible to ensure a fast and reliable app.

## Details about FPS (Frame Per Second)

A compelling reason for using React Native instead of WebView-based tools is to achieve 60 frames per second and a native look and feel to your apps.

Your grandparents’ generation called movies **_“moving pictures”_** for a reason: realistic motion in video is an illusion created by quickly changing static images at a consistent speed. **React Native team refers to each of these images as frames.** The number of frames that is displayed each second has a direct impact on how smooth and ultimately life-like a video (or user interface) seems to be. iOS devices display 60 frames per second, which gives you and the UI system about **16.67ms** to do all of the work needed to generate the static image (frame) that the user will see on the screen for that interval. If you are unable to do the work necessary to generate that frame within the allotted 16.67ms, then you will “drop a frame” and the UI will appear unresponsive.

Now to confuse the matter a little bit, open up the **Dev Menu** in your app and toggle **Show Perf Monitor**. You will notice that there are two different frame rates.

![](https://cdn-images-1.medium.com/max/2000/0*7ohYZXKyp3__1a_V.png)

There are **two types of Frame rate**

1.  JS Frame rate (JS thread)

2.  UI Frame rate (Main/ Native thread)

### JS frame rate (JavaScript thread)

For most React Native applications, **your business logic will run on the JavaScript thread**. This is where your React application lives, API calls are made, touch events are processed, etc… Updates to native-backed views are batched and sent over to the native side at the end of each iteration of the event loop, before the frame deadline (if all goes well).

If the **JavaScript thread** is unresponsive for a frame, it will be considered a **dropped frame**. For example, if you were to call **this.setState** on the root component of a complex application and it resulted in re-rendering computationally expensive component subtrees, it's conceivable that this might take 200ms and result in **12 frames being dropped**. Any animations controlled by JavaScript would appear to freeze during that time. If anything takes longer than **100ms**, the user will feel it.

**🤜 JS thread LOW FPS happens during Navigator transitions.**

When you push a **new route,** the JavaScript thread needs to render all of the components necessary for the scene in order to send over the proper commands to the native side to create the backing views. It’s common for the work being done here to take a few frames and cause jank because the transition is controlled by the JavaScript thread. Sometimes components will do additional work on **componentDidMount**, which might result in a second stutter in the transition.

**🤜 Another example is View not responding to touches due to low JS FPS.**

If you are doing work across multiple frames on the JavaScript thread, you might notice a delay in responding to **TouchableOpacity**, for example. This is because the JavaScript thread is busy and cannot process the raw touch events sent over from the main thread. As a result, **TouchableOpacity** cannot react to the touch events and command the native view to adjust its opacity.

### UI frame rate (main thread)

Many people have noticed that performance of **NavigatorIOS** is better out of the box than **Navigator**. The reason for this is that the animations for the **transitions are done entirely on the main thread**, and so they are not interrupted by frame drops on the JavaScript thread.

Similarly, you can happily scroll up and down through a **ScrollView** when the JavaScript thread is locked up because the **ScrollView** lives on the main thread. The scroll events are dispatched to the JS thread, but their receipt is not necessary for the scroll to occur.

## Common reasons of performance problems (Getting low FPS)

- Running in development mode: (**dev=true**) **lowers the FPS.**

- Using **console.log** statements **lowers the FPS.**

- **ListView lowers the FPS:** ListView initial rendering is too slow or scroll performance is bad for large lists. I would like to suggest, if you are facing low FPS then just use [FlashList](https://medium.com/@anisurrahmanbup/react-native-flashlist-performant-list-view-implementation-analysis-8b29df8f2560). **[See my in depth article on FlashList](https://medium.com/@anisurrahmanbup/react-native-flashlist-performant-list-view-implementation-analysis-8b29df8f2560)**. If you are still using **FlatList** then be sure that you’ve implemented [getItemLayout](https://medium.com/@anisurrahmanbup/react-native-virtualization-performance-optimization-flatlist-sectionlist-virtualizedlist-8430da4c68b3) to optimize rendering speed by skipping measurement of the rendered items. See my article on how to set [getItemLayout](https://medium.com/@anisurrahmanbup/react-native-virtualization-performance-optimization-flatlist-sectionlist-virtualizedlist-8430da4c68b3) properly.

- **Re-rendering a view that barely changes lowers the FPS:** If you are using a ListView, you must provide a rowHasChanged function that can reduce a lot of work by quickly determining whether or not a row needs to be re-rendered. If you are using immutable data structures, this would only need to be a reference equality check. Similarly, you can implement **shouldComponentUpdate** and indicate the exact conditions under which you would like the component to re-render.

- **Doing a lot of work on the JS thread at the same time will lowers the FPS:** “Slow Navigator transitions” is the most common manifestation of this, but there are other times this can happen. Using InteractionManager can be a good approach, but if the user experience cost is too high to delay work during an animation, then you might want to consider **LayoutAnimation**. The Animated API currently calculates each keyframe on-demand on the JavaScript thread unless you set useNativeDriver: true, while LayoutAnimation leverages Core Animation and is unaffected by JS thread and **main thread frame drops**. LayoutAnimation only works for fire-and-forget animations (**_“static” animations_**) — if it must be interruptible, you will need to use Animated.

- **Moving a view on the screen (scrolling, translating, rotating) drops UI thread FPS:** This is especially true when you have text with a transparent background positioned on top of an image, or any other situation where alpha compositing would be required to re-draw the view on each frame. You will find that enabling **shouldRasterizeIOS** or **renderToHardwareTextureAndroid** can help with this significantly. Be careful not to overuse this or your memory usage could go through the roof. Profile your performance and memory usage when using these props.

- **Animating the size of an image drops UI thread FPS:** On iOS, each time you adjust the width or height of an Image component it is re-cropped and scaled from the original image. This can be very expensive, especially for large images. Instead, use the transform: [{scale}] style property to animate the size. An example of when you might do this is when you tap an image and zoom it in to full screen.

- **My TouchableX view isn’t very responsive due to low FPS:** Sometimes, if you do an action in the same frame that you are adjusting the opacity or highlight of a component that is responding to a touch, **you won’t see that effect until after the onPress function has returned**. If onPress does a setState that results in a lot of work and a few frames dropped, this may occur. A solution to this is to wrap any action inside of your onPress handler in requestAnimationFrame:

        handleOnPress() {
            requestAnimationFrame(() => {
            this.doExpensiveAction();
            });
        }

- **Slow navigator transitions due to low FPS:** As mentioned above, Navigator animations are controlled by the JavaScript thread. Imagine the "push from right" scene transition: each frame, the new scene is moved from the right to left, starting offscreen (let's say at an x-offset of 320) and ultimately settling when the scene sits at an x-offset of 0. **Each frame during this transition**, the JavaScript thread needs to send a new **x-offset** to the main thread. **If the JavaScript thread is locked up**, it cannot do this and so **no update occurs** on that frame and the animation stutters. One solution to this is to allow for JavaScript-based animations to be offloaded to the main thread. Prop **_“useNativeDriver”_** as **_true_** will solve it.
  > **🔥 **Know more about Performance Optimization from **code level**:** [React Native app Performance Optimization from code level👇](https://medium.com/@anisurrahmanbup/react-native-app-performance-optimization-ios-android-be-a-sr-react-native-engineer-today-767cfcb0ed70)**

![[**Details in depth 18 points to optimize React Native app Performance](https://medium.com/@anisurrahmanbup/react-native-app-performance-optimization-ios-android-be-a-sr-react-native-engineer-today-767cfcb0ed70)**](https://cdn-images-1.medium.com/max/2800/0*gIpw3d1U-TOEUIAC.png)

## React Native four Threads

There are three primary threads that developers need to be aware of.

1.  **Main (UI) Thread**

2.  **JavaScript Thread**

3.  **Native Modules Thread**

In addition, a **Render Thread** is available for Android 5.0 and above. Each thread plays a distinct role in how your React Native application functions.

### Main (UI) Thread

This is the primary thread where all native **UI components are created** and **manipulated**. It handles user **interactions**, **renders UI components**, and **manages device screen updates**.

Every React Native UI update happens on this thread. Therefore, if you’re manipulating your state frequently, this thread can become busy and cause performance issues.

This thread’s primary role is to **_keep the interface smooth and responsive_**. An example is animating a member using the Animated API.

    Animated.timing(this.state.fadeAnim, {
      // this executes on the UI thread
      toValue: 1,
      duration: 2000,
    }).start();

In the above code snippet, **`Animated.timing`** updates the component’s opacity over two seconds. This animation occurs on the Main Thread to ensure smooth UI updates.

### JavaScript Thread

React Native applications execute JavaScript code in a separate JavaScript engine, which happens on the **JavaScript thread**. This includes **API calls**, handling **touch events**, and **executing JavaScript code**.

This is the thread where your actual React and JavaScript code gets executed. An example would be setting the state after fetching data from an API.

    fetchData = async () => {
      const response = await fetch("https://api.example.com/data");
      const json = await response.json();
      this.setState({ data: json }); // this line is executed in the JS thread
    }

This entire operation runs on the JavaScript Thread.

### Native Modules Thread

React Native allows you to write code in **native languages** (like Java for Android and Objective-C or Swift for iOS) when performing tasks without JavaScript. That is known as a native module, and the execution of this native code happens in the Native Modules thread.

If you’re using **native code** in your React Native app, it gets executed here. The native modules thread can also offload heavy computations from the JavaScript thread to keep your application responsive.

A simple example would be creating a Toast module in Android.

    // This is Java code that will run on the Native Modules Thread
    @ReactMethod
    public void show(String message, int duration) {
      Toast.makeText(getReactApplicationContext(), message, duration).show();
    }

In this example, the `show` method will be invoked from JavaScript but run on the Native Modules thread.

![**React Native Threads**](https://cdn-images-1.medium.com/max/3500/1*iWL-VKUUkVZseM22AFRf_A.png)

### Render Thread (Android 5.0+)

This thread was introduced in **Android 5.0 (Lollipop)**. It takes rendering off the Main Thread for apps built to take advantage of it. It is especially beneficial for complex animations that need a high frame rate.

## Profiling Introduction

Profiling is essential to understanding the **runtime performance** of the app through analysis that measures the memory or time complexity, frequency, and duration of function calls, etc. Getting all this information helps you to track down and provide proper solutions to keep your app healthy and your users engaged.

**70% of the users** will leave your app if the response to a given action takes too long. And once they do, they aren’t likely to return ever again, which can seriously harm your business. For that reason alone, profiling your React Native application with native tools for iOS and Android may turn out a **game changer** — for both your organization and your user base.

## Profiling iOS

Xcode provides some basic tools to do the first report. You can monitor the CPU, Memory, and Network.

After running your app from Xcode, you will see the performance monitor from Xcode **“Debug Navigator”** button at top of the the left side bar like below.

![Xcode Performance Monitor](https://cdn-images-1.medium.com/max/2744/1*CeLNRoz9kNuf9SP8vmX1EQ.png)

Let’s analysis & know what each monitor means from this “Performance Monitor”

- **CPU Monitor:** CPU Monitor measures the amount of work done.

- **Memory Monitor:** Memory Monitor is for observing the use of the app. All iOS devices use SSD for permanent storage, accessing this data is slower compared to RAM.

- **Disk Monitor:** Disk Monitor is for understanding your app’s disk-writing performance.

- **Network Monitor:** Network Monitor analyzes your iOS app’s TCP/IP and UDP/IP connections.
  > You can tap on each of them to find more information.

Let’s click on **CPU Monitor.** It will show you something like below.

![Xcode: **CPU Monitor**](https://cdn-images-1.medium.com/max/5760/1*bkYizLNlQo5N-JEFXQBIHQ.png)

Let’s click on **Memory Monitor** now & It will show you something like below.

![Xcode: **Memory Monitor**](https://cdn-images-1.medium.com/max/5760/1*KE6I3SLiB51OwBp5N7T_UQ.png)

Let’s click on **Disk Monitor** now & It will show you something like below.

![Xcode: **Disk Monitor**](https://cdn-images-1.medium.com/max/5760/1*mv7DpKL9P4AvJ4VCFFpGaw.png)

Let’s click on **Network Monitor** now & It will show you something like below.

![Xcode: **Network Monitor**](https://cdn-images-1.medium.com/max/5760/1*Is-dnQb77Xb1bDzgZgsV-w.png)

Xcode provides an extra monitor that isn’t shown by default but can help you inspect your UI — it’s the **View Hierarchy**. When the app is running, and you are on the screen you want to inspect, click on Debug **View UI Hierarchy** button like below. This will show your current UI in a 2D/3D model and the view tree.

![Xcode: ***View UI Hierarchy***](https://cdn-images-1.medium.com/max/5760/1*xx0PG-YA8YnR-AIs8iljDA.png)

This will help you to detect **overlappings** (you can’t see a component) or if you want to flatten your component tree. Even though RN does a view flattening, it sometimes can’t do it with all of them, so here we can do some optimization focusing on specific items.

## Profiling iOS by Xcode Instruments

From Xcode **“Open Developer Tool”** open **“Instruments”** like below.

![From where to open Xcode Instruments](https://cdn-images-1.medium.com/max/3176/1*cJ_A0FBkdGhThHVwe4r9gQ.png)

After clicking on **“Instruments”** you will see a panel like below.

![Xcode **Instruments** Panel](https://cdn-images-1.medium.com/max/3156/1*mry-BrtPrhzquXtLiK3SBQ.png)

We are going to use **_Time Profiler_** from here. Let’s dive into it. Click & open Time Profiler. After opening **Time Profiler** you will see something like below.

![Xcode Instruments: **Time Profiler**](https://cdn-images-1.medium.com/max/5760/1*p6RAoIl7io4Fw9nGFjAK8A.png)

From the **top left corner** of **Time Profiler**, you will see something like below (Look at **Red rectangle** 🟥 and **Green rectangle** 🟩).

![Xcode Instruments: **Time Profiler **(Top left corner view)](https://cdn-images-1.medium.com/max/2596/1*qxSTJsW-J2mYSK3vTvs2eg.png)

If you click on these **Red rectangle** 🟥 and **Green rectangle** 🟩 then you will see dropdown & from dropdown select **_your device_** & select **_your app_** accordingly like below.

![Xcode Instruments: **Time Profiler **(Top left corner view)](https://cdn-images-1.medium.com/max/2288/1*6Ldv-9tWGlY8Gd16Ia2uyg.png)

You already saw a **START (⭕️) button** at the **left side of your selected Device**. Just click on it & use your app as usual. For my case I loaded a list of items in a **FlatList** in my simulator.

![Started **Time Profiler** & loaded a **list of items** in App to **check list performance**.](https://cdn-images-1.medium.com/max/5760/1*1vTNpdxnCmmD5T95OVoSmA.png)

I used my app for **40 seconds** to load the List & scrawling it ups & down constantly to get any time killer issue. After stopping the “Profiler Recording” I found a big blue rectangle (see below image), which means there is **something that is taking a lot of time** (for my case blue rectangle took around 3 seconds) to finish.

![Big time killer found 🙇‍♂️](https://cdn-images-1.medium.com/max/5760/1*047YQLTgkAlFJ9PCEZWpvw.png)

**Let’s examine the threads.** The threads section shows all the activity done for the entire profiling duration (for my case, it was **40 seconds**). You can select any specific part of the chart to check the threads and their activity. Use your **mouse left-click button** on the graph to choose the range of the graph you want to inspect. I selected only the **red coloured part** as shown in the image below.

![Select a small part from profiler graph & debug on it.](https://cdn-images-1.medium.com/max/5760/1*utFdL9aZf6M9BdJG9QmShQ.png)

As shown in the image above, only a very small amount of **activity list** (**green coloured** box 🟩) is displayed for the selected part (**red coloured** box 🟥) of the graph.

You can expand by pressing **option** + **mouse click** over the **chevron (➡️)**, which will expand to display useful information. At least for now, it is **showing the memory address**, but we will need to find another way to find where the problem is.

## Flipper for JS Context tracking

Let’s use **_Flipper_** and pair it with a monitor called **_Hermes Debugger (RN)_**. With the app open and running, we go to **_Flipper_**, select the running app if not selected already, and go to **_Hermes Debugger (RN)_** -> **_Profiler_**.

Let’s first install flipper in MacOS. After successfully installing, we will see how we can pair with **_Hermes Debugger (RN)._**

### Install Flipper

To install Flipper use either **_Homebrew_** command or download .**_dmg_** file of Flipper from official flipper download link.

- **_Homebrew_** command to install Flipper: **brew install — cask flipper** (I used homebrew & it gave me **_Flipper_** stable version **_v0.225.0_**).

- **Flipper download** official link: [https://www.facebook.com/fbflipper/public/mac](https://www.facebook.com/fbflipper/public/mac)

### Troubleshoot Flipper Issue

After installing flipper, if you find this below error while opening **Flipper** app in your MacOS, then there is a simple solution.

![Flipper opening Error](https://cdn-images-1.medium.com/max/2000/0*yWswhTS0wOTTywZT.png)

**Solution:** Just run this command **xattr -d com.apple.quarantine /Applications/Flipper.app** in the root directory of your MacBook terminal (For my case it was **iTerm**). Now again open the Flipper app.

After opening Flipper now you may see something like below. An another error 🤜🙇‍♂️.

![Flipper connect to server error.](https://cdn-images-1.medium.com/max/3272/1*1jCAQfVZLGgmoV3ci8Lwpg.png)

But, what I did is just completely closed my Flipper App by **Cmd + Q**. Then again I opened Flipper from the launchpad. It worked for me now 😄. This is what Flipper gave me at it’s first view.

![Flipper is on the way to fly 🔥](https://cdn-images-1.medium.com/max/4548/1*4vfMlRyfygechAgot-3-og.png)

Ohh yea, you see already the tab **_“Hermes Debugger (RN)”_** under the section **React Native** in Flipper Home page. Pretty Cool 🎉.

> Let’s back on where we last stopped & started installing Flipper. Yea that was **“Pair Flipper with Hermes Debugger (RN) -> Profiler”.**

**🛑 Note:** Always remember that, **run your app** (iOS/ Android) in your device/ simulator **before opening Flipper app**.

## Profiling iOS by Flipper with “Hermes Debugger (RN)”

When i clicked on **“Hermes Debugger (RN)”** button it shows me a text like below.

![Hermes Debugger (RN) not found any Hermes enabled app.](https://cdn-images-1.medium.com/max/4500/1*9x--jTf-JZB4N0P_eVdIDA.png)

As my React native app was in **v0.71** so by default **Hermes** was true but still **Flipper** says that it didn’t find any **Hermes** **App**. So, I just reloaded my app in my simulator. Now it connected successfully & when i again click on **“Hermes Debugger (RN)”** button then it shows something like below.

> _If you you didn’t enable Hermes in your React native app or you want to check **“Is Hermes already enabled in your app ?”** then see my_ short Article on it. **Article link:** [Hermes Details 🔥](https://medium.com/@anisurrahmanbup/react-native-performance-optimization-by-enabling-hermes-bundle-release-hermes-bytecode-2d3c2be52672)

![Flipper connected successfully with my app 🔥](https://cdn-images-1.medium.com/max/4036/1*h0sAbgAKupIQVAq0I23btw.png)

Now, we click **start**, so the profiler begins. We do the same flow and actions in app as before when **profiling** with **Time Profiler**. When we stop, we will see all the data collected.

![Profiling data collected](https://cdn-images-1.medium.com/max/4328/1*durIs0MnEuLzsifjf-OInw.png)

By default, the data will be sorted from bottom to top with the heavy tasks at the top. In my case, I see that a function called **_checkType()_** takes the maximum time, which is only 122 milliseconds. So I understand that the code that I wrote in my React Native app is very efficient for the FlatList that I profiled.

I also learned from the previous **“Time Profiler”** from Xcode **Instruments** that the **big blue** time-consuming action was an API call that fetched the list data. So I need to optimize my backend code instead of my React Native code. After a good optimization in my backend, I don’t see that big blue in the graph anymore. Below is my final output from Xcode “Time Profiler” Instruments where i don’t see the **big blue** time consuming actions anymore 🔥.

![**“Time Profiler”** from **Xcode** Instruments](https://cdn-images-1.medium.com/max/4500/1*yw_ieSAmFx9M7poVmLA8kw.png)

## Profiling Android

In the event of any performance issues, we mostly use **React Profiler** to troubleshoot and resolve our problems. Since most of the performance problems originate from the **JS realm**, we don’t usually need to do anything beyond that. But sometimes, we’ll encounter a **bug** or **performance** **issue** that comes directly from the Android runtime. In such a case, we’ll need a fine profiling tool to help us gather the following metrics from the device:

- **CPU**

- **memory**

- **network**

- **battery usage**

Based on that data, we can check whether our app **consumes** **more energy** than usual or, in some cases, uses **more CPU power** than it should. It is useful especially to check the executed code on **lower-end (LE) Android devices**. Some **algorithms** can run faster on some devices, and the end user will not spot any glitches, but we have to remember **some customers can use LE devices**, and the algorithm or function can be **too heavy** for their phones. High-end devices will handle it because their hardware is powerful.

## Android Profiler in Android Studio

**Android Studio** is the IDE developed by JetBrains. It is officially supported by **Google** and the official IDE, which can be used to develop any Android app. It is very powerful and contains lots of functionalities in one place. One of those tools is **_Android Profiler_**, which, as the name suggests, comes in handy if you’re in need of React Native profiling on Android.

If you have not installed Android Studio yet, you can install it using [this link](https://developer.android.com/studio).

After installing **Android Studio**, just open your React native app **android folder** by **Android Studio**. Now give Android Studio some time to complete all of it’s **dependency of Gradle** for your react Native app. it will take some time (may be even more than 10 minutes).

After successfully installing all dependency open the **Profiler** like below, choose **View** > **Tool Windows** > **Profiler** from the **Android Studio** top menu bar.

![Android Studio **Profiler**](https://cdn-images-1.medium.com/max/3808/1*3NeblsDkL19R4F-Yq0Osww.png)

Or you can click on **Profile** button in the toolbar.

![Profile button from Toolbar](https://cdn-images-1.medium.com/max/2488/1*OPhI0tHq-jB70viE0_3dtw.png)

### Before you start profiling the app, please remember these

- **Run the app on an actual Android device** that is affected, preferably a lower-end phone or emulator if you don’t have one. If your app has runtime monitoring set up, use a model that is either the most used by users or the one that’s affected by a particular issue.

- Turn off development mode. **You must be sure that the app uses a JS bundle instead of the metro server**, which provides that bundle. Follow the below steps to make **“JS DEV MODE”** off.
  > Steps to make **_“JS DEV MODE”_** off 👇

1.  First run your app by using this **npx** command: **_npx react-native run-android_**

2.  After running your app, open **DEV MENU** from your device (by **shaking** your device)/ simulator (by pressing **_Cmd + M_** together).

3.  After opening **DEV MEDU** click on **Settings**.

4.  You will see an option **“JS DEV MODE”,** uncheck it & reload your app.

5.  While reloading you will see once again your app is **building 0–100%**. In this build, your app loads the server as a **BUNDLE** in your device/ simulator.

6.  After completing build, you will **not see any more log in your METRO**.
    > So, here is picture of **“JS DEV MODE”** from device/ simulator dev menu.

![**JS DEV MODE** from **Dev menu**](https://cdn-images-1.medium.com/max/2000/0*AllnbfjFD7xPin2L)

> And, here is the picture of **METRO last line**.

![**Metro last line**](https://cdn-images-1.medium.com/max/2000/0*5nPpZlaDuR7RH-Fy)

### Start Profiling

Now, go to the **Profiler tab** (2 way shown before how to open profiler or from at the bottom of **Android Studio)** and add a new profiler session like below. In **Profiler Session** you will find your device/ simulator running.

![Android Studio **Profiler Session**](https://cdn-images-1.medium.com/max/3172/1*TPvzXIDjIu8E0y5WfNYMAw.png)

**Wait for the session to attach** to your app and start performing actions that could cause some performance issues, like **swiping**, **scrolling**, **navigating**, etc. Once you’re done, you should see some metrics like below.

![Android Profiler Session Profiled](https://cdn-images-1.medium.com/max/5608/1*sD6K5epgiK5pViUC8LAqFg.png)

Each greenfield **React Native app has only one Android Activity**. If your app has more than one, it’s most likely a **brownfield** one. **Read** more about the brownfield approach here. In the above example, we don’t see anything interesting. **Everything works fine** without any glitches. Let’s check each metric:

- The **CPU metric** is strictly correlated to energy consumption because the CPU needs more energy to do some computations.

- The **memory metric** is not changing while using the app, which is expected. Memory usage can **grow**, e.g., when o**pening new screens**, and **drop** when the **garbage collector (GC) releases free memory**, e.g., when navigating out of a screen. When memory increases unexpectedly and keeps on growing, it may indicate a memory leak, which we want to avoid, as it can crash the app with **out-of-memory (OOM) errors**.

- The **network section** has been moved to a separate [tool](https://developer.android.com/studio/debug/network-profiler) called the Network Tab. In most cases, this metric is not needed, because it is mostly related to the backend infrastructure. If you would like to profile a network connection, you can find more information [here](https://developer.android.com/studio/debug/network-profiler).

- The **energy section** gives hints on when our app’s energy usage is **low,** **medium**, or **high**, impacting the daily experience of using the app.

### Use Android Profiler in action

In the previous example, we could see some relations between each metric.

![Hover your mouse & see when Touchable event pressed & at that time which leaks resources](https://cdn-images-1.medium.com/max/4812/1*BrfSCdpznYtsQwLpn-PyjA.png)

To see a more detailed view, we have to **double-click on the tab**. Now we can see more details. When the user started to do some **touch action** (swiping in the above example), we could see more **CPU work**. Each app will have its own signature of CPU spikes and lows. It’s important to build an intuition about it, by interacting with it and pairing certain activities, like touch events, with the increased usage. In other words, some spikes are expected, because the work needs to be done. **The problem starts when CPU usage is very high for extended periods** or in unexpected places.

Let’s imagine you would like to **pick the best list or scroll view component for your React Native app**, which has the best performance on a lower-end device. You noticed the current solutions could be revamped or improved, and you started working on this. In your experiment, **you would like to check how your solution works for LE devices** using the above-described solution. When you double-clicked on CPU, you could spot the below data.

![Details found **after double click** on a **high used CPU chart**](https://cdn-images-1.medium.com/max/3668/1*9hD7Fst0ugEU2iexgc_T2w.png)

So, what i found here is **_RenderThread_** taking time. If you’re using Android L (5.0) and up, you will have a **_RenderThread_** in your application. This thread generates the actual OpenGL commands used to draw your UI. The thread name will be either **_RenderThread_** or <...>.

**_OpenGL_** is an open source cross-platform API for rendering **2D and 3D graphics**. It is used by React Native to create native modules that can access the GPU and perform complex computations. React Native uses OpenGL to enable features such as **animations**, **transitions**, and **3D effects** in mobile applications.

Let’s see what about our **_mqt_js thread_** from the profiling chart. See below.

![***mqt_js thread **seems like smooth (not too much active)*](https://cdn-images-1.medium.com/max/3656/1*f3PrVMKLaNR8feL5y6aL3Q.png)

If you see somehow **_mqt_js thread_** shows toom much green field, then **_mqt_js thread_** used almost all the time and does some heavy computation because your computations are done on the **JS side**. You can start thinking about how to improve it. There are multiple options to check.

- **Replace the bridge with JSI** in terms of communication — do tests if JSI is faster than the bridge. [See details how JSI works with New Architecture.](https://medium.com/@anisurrahmanbup/react-native-new-architecture-in-depth-hermes-jsi-fabric-fabric-renderer-yoga-turbo-module-1284a192a82b)

- **Move some part of the code to the native side** — on the native side you have more control over threads execution and can schedule some work to not block the JS or UI thread.

- **Use a different native component** — replace the native scroll view with your custom solution.

- **Use shadow nodes** — do some expensive calculation with C++ and pass it to the native side.

You can try out all of those solutions and compare the effect between each other. The profiler will provide you with a metric, and based on that, you can decide which approach fits best to your particular problem.

## System Tracing with Android Studio CPU Profiler

Using the **Android Studio CPU Profiler**, we can also make a **system tracing**. We can check when the appropriate function has been called. We can triage all threads and see which function is the costliest, **which affects the UX**. To enable system tracing, click on the **CPU section** **_(while profiling session record is running)_** and select System Trace Recording. Then click on **“Record”**.

![Start **“System Trace”** to see Thread wise activity](https://cdn-images-1.medium.com/max/3432/1*CqXnNAHmBSRhwZqvmzgEAQ.png)

After **some interaction** in your app & stop the record, you should be able to see all the threads with details.

![**System Trace Details** (For scrolling 150 Items)](https://cdn-images-1.medium.com/max/5608/1*zmvkur_smTmfYpdlmkXFwA.png)

You can also **save your data** by clicking the Save Button.

![Save **System Trace** report for further use](https://cdn-images-1.medium.com/max/2000/1*I7OWtV5QDZl2ZA9o-EUJDQ.png)

> You can now **use the saved data** in a **different tool**, e.g., [Perfetto](https://ui.perfetto.dev/).

## Flipper performance plugin for Android

In iOS Profiling part of above we saw how to install Flipper & use it in debugging. In Flipper you can use this as a Flipper Plugin [Flashlight](https://docs.flashlight.dev/flipper). But it will be better if you use Flashlight from your CLI. Follow below steps to install Flashlight & start it into web.

1.  Install in MacOS/ Linux by this command from terminal **_curl [https://get.flashlight.dev](https://get.flashlight.dev) | bash_** or in windows run this command in terminal "**_iwr [https://get.flashlight.dev/windows](https://get.flashlight.dev/windows) -useb | iex_**"

2.  After install open a new terminal & run this command: **_flashlight measure_**

3.  It will open a port in web [http://localhost:3000/](http://localhost:3000/)

4.  Now from web select your connected device via USB/ simulator & start recording measure. It will show you output like below. I applied the measure on a **FlashList** in my App.

![**Flashlight** measure got **100 score** on 150 items loaded by a **FlashList**](https://cdn-images-1.medium.com/max/5760/1*H2wJCBOPz9oabrqU5efXHA.png)

## Replacing Flipper in 0.73+ ?

Don’t worry for upcoming versions of React Native. **you can still use Flipper with 0.73+**; you will just have to **install it yourself because it won’t come preinstalled**.

## Next Read

🔥 🔥 Read my in Details articles about New Architecture of React Native. Article link: [React Native — New Architecture in depth (Hermes, JSI, Fabric, Yoga, Turbo Module, Codegen)](https://medium.com/@anisurrahmanbup/react-native-new-architecture-in-depth-hermes-jsi-fabric-fabric-renderer-yoga-turbo-module-1284a192a82b).

![[**React Native — New Architecture in depth (Hermes, JSI, Fabric, Yoga, Turbo Module, Codegen)](https://medium.com/@anisurrahmanbup/react-native-new-architecture-in-depth-hermes-jsi-fabric-fabric-renderer-yoga-turbo-module-1284a192a82b)**](https://cdn-images-1.medium.com/max/2800/0*3XFYGhhw4I2bTzs-.png)

Thank you for reading this article. I enjoy sharing my **5 years** of experience in **JavaScript**, **React**, **React-native** & **Node.js** with you every day.

If you enjoyed reading this article, I would appreciate it if you could follow me on [Twitter](https://twitter.com/anis_RNCore) & [Medium](https://medium.com/@anisurrahmanbup). You can also leave your feedback and comments there. Thank you for your support and interest.
