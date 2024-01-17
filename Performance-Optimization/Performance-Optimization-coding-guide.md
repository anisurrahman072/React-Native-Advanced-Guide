# React Native — Ultimate Guide on Performance Optimization

### iOS & Android — Be a Sr. React Native Engineer today 🔥

![](https://cdn-images-1.medium.com/max/5760/1*uWXsg7dBqEGXP6YtRAAN8w.png)

This guide covers all the **basics** of React Native **code optimization**. This guide is suitable for React Native developers of every level: **beginner**, **intermediate**, and **senior**. However, if you already know **how to optimize your code** at the code level, you can read my **advanced optimization article** on React Native to be a **Debugging Expert**. Here is the article link: [Ultimate Guide on Debugging , Profiling & Advanced Optimization.](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Debugging-Profiling/Debugging-and-Profiling-ultimate-guide.md)

### ❝ React Native app performance is the difference between a good app and **a great app**, and it requires constant attention and optimization from the start ❞

Creating an app that offers a great **user experience** should be the main goal of any app development. React Native provides you with the tools you need to build a **fast and smooth app**, but sometimes you need to optimize your app **manually**. To do this, you need to think about **performance optimization** from the beginning of your projects.

To keep your app running smoothly and responsively, you need to [display a frame within 16.67 milliseconds](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Debugging-Profiling/Debugging-and-Profiling-ultimate-guide.md) — that’s how long a modern mobile device takes to show **60 frames in one second**. If you fail to do this, your app will perform poorly and the UI may seem to freeze.

This article will show you how to improve the performance of your React Native app by following these steps

- [What is the **mechanism of React Native**?](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Performance-Optimization/Performance-Optimization-coding-guide.md#what-is-the-mechanism-of-react-native)

- [Use **FlatList** or **SectionList** to display large lists in React Native](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Performance-Optimization/Performance-Optimization-coding-guide.md#use-flatlist-or-sectionlist-to-display-large-lists-in-react-native)

- [Delete all **console** statements](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Performance-Optimization/Performance-Optimization-coding-guide.md#delete-all-console-statements)

- [**Cache expensive** computations](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Performance-Optimization/Performance-Optimization-coding-guide.md#cache-expensive-computations)

- [Adjust (**resize** and scale down) **image** sizes](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Performance-Optimization/Performance-Optimization-coding-guide.md#adjust-resize-and-scale-down-image-sizes)

- [**Cache images** locally](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Performance-Optimization/Performance-Optimization-coding-guide.md#cache-images-locally)

- [Use **fast loading image** formats in React Native](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Performance-Optimization/Performance-Optimization-coding-guide.md#use-fast-loading-image-formats-in-react-native)

- [Schedule animations with **InteractionManager** and LayoutAnimation](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Performance-Optimization/Performance-Optimization-coding-guide.md#schedule-animations-with-interactionmanager-and-layoutanimation)

- [Use **native driver** with the Animated API](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Performance-Optimization/Performance-Optimization-coding-guide.md#use-native-driver-with-the-animated-api)

- [Remove unnecessary libraries](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Performance-Optimization/Performance-Optimization-coding-guide.md#remove-unnecessary-libraries-and-features)

- [Use Hermes Engine](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Performance-Optimization/Performance-Optimization-coding-guide.md#use-hermes-engine)

- [Use **Reselect** with **Redux** (for Cache)](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Performance-Optimization/Performance-Optimization-coding-guide.md#use-reselect-with-redux)

- [**Monitor memory usage** in React Native](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Performance-Optimization/Performance-Optimization-coding-guide.md#monitor-memory-usage-in-react-native)

- [**Navigation** in React Native](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Performance-Optimization/Performance-Optimization-coding-guide.md#navigation-in-react-native)

## What is the mechanism of React Native?

The **new architecture** in React Native is an upgrade that aims to **improve the performance** and development of React Native apps. It replaces the **old communication** mechanism between **JavaScript** and **native code**, called The Bridge, with a new one called **JavaScript Interface (JSI)**. This allows direct access to native objects from JavaScript and vice versa, without **serialization** or **queues**.

The new architecture also introduces a new way of managing components called **minimal persistence**, which **reduces** the **memory usage** and simplifies the code. Additionally, it adopts a new JavaScript engine called **Hermes**, which is optimized for React Native and offers **faster startup time**, **lower memory footprint** and **smaller app size**.

The new architecture is composed of **two main parts**: the new native module system **(Turbo Modules)** and the new renderer **(Fabric)**. Turbo Modules are a more efficient way to create native modules that leverage platform-specific APIs, while Fabric is a re-implementation of the React Native UI layer that supports concurrent rendering, asynchronous layout and smooth animations.

> 🙋‍♂️ Know **more about in details of New Architecture**: [React Native New Architecture details (Hermes, JSI, Turbo Module, Fabric, Codegen, Yoga)](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/New-Architecture/New-Architecture-in-depth.md)

Let’s look at some of the **best practices** for **improving the performance** of a React Native application with several code examples.

## Use FlatList or SectionList to display large lists in React Native

If you have a large list, rendering all the items at once can cause a performance issue, but lazy loading with **FlatList** can improve performance.

The **FlatList** component renders only the items that will be displayed on the screen and removes them when they are no longer displayed. This **saves a lot of memory**, making the app **much faster**:

```javascript
import React from 'react'
import {FlatList} from 'react-native'

const data = [
  {
    id: 1,
    text: 'First'
  },
  {
    id: 2,
    text: 'Second'
  },
  ...
]

const App = () => {
  const renderItem = ({item}) =>(
    <View>
      <Text>{item.text}</Text>
    </View>
  )
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  )
}
```

**FlatList** and **SectionList** serve similar purposes. Both can improve the performance of your app. However, SectionList is more suitable when rendering sections. **VirtualizedList** may also be used if you need more flexibility.

It is also possible to render lists with ListView and, while this can be used for small lists, it is not recommended for large lists. Although it is possible to render lists with **map**, it is not advisable to do so in React Native.

## Delete all console statements

Console statements are necessary for debugging JavaScript codes, but they are only meant for development purposes. These statements could cause serious performance issues in your React Native application if they are not removed before bundling.

While you could install plugins such as babel-plugin-transform-remove-console to remove these statements from production, **it is better to manually remove them** if you don’t want to add additional dependencies to your app.

## Cache expensive computations

React introduced the **memo HOC (Higher Order Component)** in React v16.6 for preventing unnecessary re-rendering and the useMemo hook in React v16.8 for optimizing expensive computations.

However, **it is also possible to use the useCallback hook** to do that. The major difference between **useMemo** and **useCallback** is that useMemo returns a memoized value, but useCallback returns a memoized callback.

Let’s take a look at each of them.

### 👉 The React.memo Higher Order Component (HOC)

**React.memo** was introduced to functional components to serve the same purpose that **React PureComponents** serve in class components. memo prevents unnecessary re-rendering of a component and can help to optimize an application.

However, like other optimization technique, **memo** should only be used when it is necessary. In some cases, unnecessary re-rendering will not impact performance much.

Here is an example to illustrate memo:

```javascript
import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'

const Element = ({children, value, setValue}) =>{
  const handleOperation = () => setValue(value * 2)
  return (
    <View>
      <Text>{value}</Text>
      <TouchableOpacity onPress={handleOperation}>
        {children}
      </TouchableOpacity>
    </View>
    )
  }

export default Element
```

```javascript
import React, {useState} from 'react'
import {View} from 'react-native'
import Element from './Element'

const App = () => {
  const [firstNum, setFirstNum] = useState(5)
  const [secondNum, setSecondNum] = useState(5)

  return (
    <View>
      <Element setValue={setFirstNum} value={firstNum} >
        Add First
      </Element>
      <Element setValue={setSecondNum} value={secondNum} >
        Add Second
      </Element>
    </View>
  )
}
```

The problem with the above code is that when any of the buttons are pressed, both buttons will re-render even though only the states for the pressed button will be changed.

This can be fixed by **wrapping the Element component with the React.memo HOC**. Here’s how to do that:

```javascript
import React, {memo} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'

const Element = ({children, value, setValue}) => {
  const handleOperation = () => setValue(value * 2)

  return (
    <View>
      <Text>{value}</Text>
      <TouchableOpacity onPress={handleOperation}>
        {children}
      </TouchableOpacity>
    </View>
    )
  }

export default memo(Element)
```

This would fix the re-rendering issue. However, **_it should be used only when the re-rendering is causing performance issues_**.

### 👉 The useMemo hook

**useMemo** returns a **memoized value** of a function. However, **_it should only be used when performing expensive computations_**.

For instance, suppose we want to filter some data coming from our API by their rating. We could memoize the computation to recalculate the results only when the values change:

```javascript
const data = [
  {id: 1, state: 'Texas', rating: 4.5},
  {id: 2, state: 'Hawaii', rating: 3},
  {id: 3, state: 'Illinois', rating: 4},
  {id: 4, state: 'Texas', rating: 5},
  {id: 5, state: 'Ohio', rating: 4.5},
  {id: 6, state: 'Louisiana', rating: 3},
  {id: 7, state: 'Texas', rating: 2},
  // ...
  {id: 1000, state: 'Illinois', rating: 4.5},
]
```

If we wish to filter the data based on the rating (without memoization), we may use up a lot of memory.

For such, we don’t want to unnecessarily recalculate the values when other components re-render. **We want to re-render or re-calculate only when the dependent rating changes**.

Let’s see how we can achieve this with **useMemo**:

```javascript
import React, {useMemo} from 'react'
import {FlatList} from 'react-native'
import data from './data'

const App = () => {
  const rateCompare = 3;

  const computedValue = useMemo(() => {
    // supposed computationally intensive calculation
    const result = data.filter((d) => d.rating > rateCompare);
    return result;
  }, [rateCompare]);

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.state}</Text>
    </View>
  );

  return (
    <FlatList
      data={computedValue}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  )
}
```

We assumed that we have huge data coming from our API and needed to perform a computationally intensive calculation. Although we’ve used a simple filter operation, we could be doing a series of calculations here. This is a good use case for the **useMemo** hook.

By using **useMemo, we can cache (memoize) the results for the value specified in the dependency array**. For instance, if the rateCompare constant was 3 the first time it is run, the function will not recalculate anytime the value of rateCompare is 3, even if the entire components re-render. It will only recalculate when the value changes.

### 👉 The useCallback hook

The **useCallback** hook is similar to useMemo , but it **returns a memoized callback**:

```javascript
import React, {useState, useEffect, useCallback} from 'react'
import {FlatList} from 'react-native'
import data from './data'

const App = () => {
  const [values, setValues] = useState([]);
  const rateCompare = 3;

  const valuesCallback = useCallback(() => {
    // supposed computationally intensive calculation
    const result = data.filter((d) => d.rating > rateCompare);
    setValues(result);
  }, [rateCompare, setValues]);

  useEffect(() => {
    valuesCallback();
  }, [valuesCallback]);

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.state}</Text>
    </View>
  );

  return (
    <FlatList
      data={values}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  )
}
```

This does the same thing as the **useMemo** example. However, because **useCallback** returns a function, we need to call that function to get the value. Here, **we have called the function in a useEffect hook** and then rendered the values in a FlatList component.

We could equally have called the function in a Button or TouchableOpacity component. That way, the computation will run whenever the button is pressed:

```javascript
<Button onPress={valuesCallback} title="Example button" />
```

While **React.memo** can optimize an entire component, useMemo and useCallback can optimize a calculation or process. However, each of these should be used only when they are necessary, otherwise, they could even compound the performance issue.

### It is recommended to first write the calculation or component without memoization and only optimize (memoize) it if it is causing performance issues

## Adjust (resize and scale down) image sizes

Images can contribute significantly to performance issues in React Native applications. They can also pose issues in web apps, but the browser has the capability of downloading and even scaling the images. In some cases, it may even cache them.

But this is different with mobile apps. React Native ships with an **Image component that can handle a single image very well**, but it performs poorly with many large-sized images.

The best way to solve this problem is by **loading the exact size of the image** you need. In other words, you should **resize and scale down the image size** before loading them to your app.

## Cache images locally

Caching is another solution to image problems in a React Native app. It saves the images locally the first time they are loaded and uses the local cache in the subsequent requests. This could improve the app performance remarkably.

> But **caching with the image component** [is supported in iOS alone, not in Android](https://reactnative.dev/docs/image#imagesource).

Here’s how you would cache an image:

```javascript
<Image
  source={{
    uri: 'https://unsplash.it/200/200?image=8'
    cache: 'only-if-cached'
  }}
  style={{ ... }}
/>
```

However, this method of caching is not optimal because it hardly solves the issues. Several issues, such as flickering, cache misses, poor app performance, and poor performance loading from the cache, may occur when the image is cached this way. It is possible to solve this issue with the **react-native-fast-image**.

In addition to caching images, [FastImage](https://github.com/DylanVann/react-native-fast-image) also adds authorization headers and several other features:

```javascript
import FastImage from 'react-native-fast-image'

const App = () => (
  <FastImage
    style={{ ... }}
    source={{
      uri: 'https://unsplash.it/200/200?image=8',
      priority: FastImage.priority.normal,
      cache: FastImage.cacheControl.cacheOnly
    }}
  />
)
```

Let’s take a closer look at the properties of the FastImage component. As the name suggests, the priority props define the priority with which the images should be loaded. For an image needing to be loaded first, you would set the priority to **FastImage.priority.high**.

Nevertheless, in the context of optimizing your React Native App, we are most interested in the cache property. The **cache** property allows us to cache images in three different ways:

1.  FastImage.cacheControl.immutable: This is the default value. **The image will only be updated, if the URI changes**

2.  FastImage.cacheControl.web: The configuration from the source.headers prop can be used for following normal caching procedures like an ordinary web browser would do

3.  FastImage.cacheControl.cacheOnly: This is the most restrictive option. Only images from the cache will be shown and **no network requests will be made**

## Use fast loading image formats in React Native

Together with the image size, the image format may also affect the app performance. Developers coming from the web background would prefer JPEG and JPG formats because they allow for compression. However, this is not true for mobile platforms.

On the other hand, you could reduce the number of unique colors in each row of the pixels that make up a PNG image. This could significantly reduce the image size. It is sufficient to say that the **PNG format is better than the JPG format for mobile platforms**.

The **WebP format** introduced by Google in 2010 is the most performant of the three. [It supports both lossless and lossy compression modes](https://developer.android.com/topic/performance/network-xfer) and can **reduce the image size by up to 25-34%**. Keep in mind that this format is not supported by all mobile devices. It is supported by Android 4.2.1 and higher devices and iOS 14.

## Schedule animations with InteractionManager and LayoutAnimation

If not properly done, animations can affect the performance of your React Native application. The **runAfterInteractions** method of **InteractionManager** can be used to schedule long-running synchronous operations after an animation or interaction has been completed. This can improve the performance of a React Native application by ensuring that animations run smoothly:

```javascript
InteractionManager.runAfterInteractions(() => {
  // ...
});
```

If you are concerned about the user experience, **it may be preferable to use LayoutAnimation instead**. This would run the animation during the next layout:

```javascript
import React, {useState} from 'react'
import {LayoutAnimation} from 'react-native'

if (Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App = () => {
  const [animate, setAnimate] = useState(false)

  const handlePress = () =>{
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    setAnimate(!animate)
  }
  return (
    <Button onPress={handlePress} title="Animate" />
  )
}
```

The flag UIManager.setLayoutAnimationEnabledExperimental(true); has to be set to ensure that it works on Android.

## Use native driver with the Animated API

**Running animation** **on the JavaScript thread is a bad idea**. The JS thread can be easily blocked and this could make the animation run slowly or not run at all.

Because the [Animated API is serializable](https://reactnative.dev/blog/2017/02/14/using-native-driver-for-animated), it is possible to push the details of the animation to native before the animation begins. As such, **the native codes will perform the animation on the UI thread**. This will ensure that the animation runs smoothly even if the JavaScript thread is blocked.

Here’s how to set useNativeDriver with the Animated API:

```javascript
import React, {useRef} from 'react'
import {Animated} from 'react-native'

const App = () => {
  const opacity = useRef(new Animated.value(0)).current

  const showVal = () =>{
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  // ...

  return (
    <View>
      <Animated.View>
        <Animated.Text>Text to show</Animated.Text>
      </Animated.View>
      <Button title="Show" onPress={showVal} />
    </View>
  )
}
```

Here, we declared a variable opacity to hold the opacity value. We set the initial value to 0 and then we used Animated.timing to trigger the animation on button click. useNativeDriver is set to true in Animated.timing to send details of the animation to Native.

## Remove unnecessary libraries and features

Each library in a React or React Native application leaves some footprint on the application. This is why you should only add libraries and features you need in your app and remove irrelevant dependencies and libraries.

**Animations**, **navigations**, **tabs**, and **other features** can **contribute to the screen load time** and so the **more they are on the screen, the worse the performance**.

## Use Hermes Engine

**Hermes is a JavaScript engine** developed by Facebook in 2019. It is one of the must-have features for **improving app performance**, **reducing memory usage**, **decreasing app size**, and **improving the app start-up time**.

**Hermes is currently enabled by default in React Native in your app**.

Before the release of React Native v0.64, Hermes was available only for Android platforms, **but it is now available for iOS as well**.

**🚀 Article Link:** [Know more about Hermes in details here ✈️](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/New-Architecture/Hermes-and-Static-Hermes-in-depth.md)

If you are using an earlier version of React Native, you need to first upgrade it to the acceptable version before enabling Hermes.

To enable Hermes on Android, edit your `android/app/build.gradle` file and add the following rules:

```java
project.ext.react = [
  entryFile: "index.js",
  enableHermes: true
]
```

You could also do it like this:

```java
def enableHermes = project.ext.react.get("enableHermes", true);
```

If you are using **ProGuard**, open your `proguard-rules.pro` and add the following rules:

```java
-keep class com.facebook.hermes.unicode.** { *; }
-keep class com.facebook.jni.** { *; }
```

Then clean and rebuild your app if you have already built it. To do this, first run cd android and then **./gradlew clean**.

If you are upgrading your React Native version, be sure to edit the **build.gradle** file accordingly with the latest Gradle releases.

Interestingly, **Hermes for iOS was recently released** in the new React Native version 0.64 on March 12, 2021. **To enable Hermes for iOS, set hermes_enabled to true** and run pod install in your Podfile:

```ruby
use_react_native!(
  :path => config[:reactNativePath],
  :hermes_enabled => true
)
```

## Use Reselect with Redux

Like the **useMemo hook**, **Reselect can be used to create memoized selectors to optimize expensive computations**. However, unlike useMemo, this has to be used with Redux.

Assuming we have a getPosts state from our Redux store, we can use Reselect to select posts with the highest likes and users from the posts.

Reselect comes with the createSelector function that can be used to create memoized selectors, as shown below:

```javascript
import {createSelector} from 'reselect'
import 'filter' from 'lodash/filter'

// non-memoized selector
export const getAllPosts = (state) => state.allPosts

// memoized selector to get posts with top likes
export const getMostLiked = (likes) => createSelector(
  getAllPost,
  item => item && filter(item, (post) => post.likes >= likes)
)

// memoized selector to get users with the top likes
export const getTopUsersByLikedPosts = (likes) => createSelector(
  getMostLiked(likes),
  item =>
    item && _(item).map((post)=> post.user).uniqBy(post =>
      post.id).value()
)
```

First, we created a non-optimized selector getAllPosts from our redux state allPosts. We then created an optimized selector getMostLiked on getAllPosts and then filtered the items based on their likes. This memoizes getMostLiked such that the values will be recomputed only when the posts data change.

Furthermore, **we created a memoized selector**, getTopUsersByLikedPosts, from getMostLiked and selected the users from the posts. This ensures that getTopUsersByLikedPosts changes only when the top likes from the posts data change.

> This is just an example. We could perform any expensive computation here and memoize it with Reselect.

Reselect should only be used when it is necessary; overusing it could even compound the performance issue in your React Native application.

## Monitor memory usage in React Native

Some processes and features could use up an **unusual amount of memory than you would expect**. Unless you want those processes, turning them off or optimizing them could be the key to improving your React Native performance.

> You can monitor the memory usage on both **Android studio** and [Xcode](https://developer.apple.com/documentation/xcode/improving_your_app_s_performance) to find leaks that may be affecting the performance of your app.

This can be done through the Memory Profiler on Android Studio. You can open the Memory Profiler from **View > Tool Windows > Profiler** or locate the **Profile** icon from the toolbar.

You can also monitor the performance of your app from the developer menu in your app. To open the developer menu, use the shortcut **Command + M** (Mac) or **Control + M** (Windows and Linux). In the developer menu, toggle Show Perf Monitor to monitor the performance of each component on your app.

Xcode also allows developers to find memory churns or leaks in their apps. You can find this from **Product > Profile**. Alternatively, you can use the shortcut **Command + i** to open the Leaks Profiler. Restart your app in your simulator to start identifying the memory leaks.

Memory leaks can be caused by several factors, as discussed above. Sometimes, **cached images can clog up the memory and cause issues**. In some cases, you may simply need to change ListView to FlatList to fix the issue. In any case, the Profiler will show you the actual cause of the problem.

## Navigation in React Native

The most popular library for handling navigation in React Native is the [react-navigation](https://github.com/react-navigation/react-navigation.github.io) package. It is a normal JavaScript library which is also promoted by React Native itself on its documentation. Tips on how to install the package accordingly can be found [here](https://reactnative.dev/docs/navigation) and [here](https://reactnavigation.org/docs/getting-started).

Let’s have a look at a simple implementation of react-navigation:

```javascript
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Home from './screens/Home'
import Profile from './screens/Profile'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

In the **App.js**, we wrap our components in a NavigationContainer. Secondly, we created a **Stack Navigator**, which is the most common way of navigation in mobile apps. The default route is defined in line 9 and in our case, it’s the Home screen:

```javascript
import {View, Text, Button} from 'react-native'

export default function Home({ navigation }) {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        title="Go to Profile Page"
        onPress={() =>
          navigation.navigate("Profile", {
            name: "John Doe",
            age: 25,
            email: "johndoe@gmail.com",
            phone: "123-456-7890",
          })
        }
      />
    </View>
  );
}
```

In the **Home.js** file we add a button, which will allow us to navigate to the profile screen. Please note, in line 10, that we can easily pass data between the screens:

```javascript
import React from "react";
import {View, Text, Button} from "react-native";

export default function Profile({ route, navigation }) {
  const { name, age, email, phone } = route.params;

  return (
    <View>
      <Text>Profile Screen</Text>
      <Button
        title="Go Back"
        onPress={() => navigation.goBack()}
      />
      <View>
        <Text>Name: {name}</Text>
        <Text>Age: {age}</Text>
        <Text>Email: {email}</Text>
        <Text>Phone: {phone}</Text>
      </View>
    </View>
  );
}
```

Inside the **Profile.js**, we then render the information that got passed to it. In line 10, we see another possibility to navigate between screens. In the Home.js, we explicitly set the profile screen to be the destination, but here we just say `navigation.goBack()`.

**While it is pretty straightforward to get started with this library, it’s smart to watch out for different navigation libraries for increasing the app performance**. Especially **on Android devices** it can come to **performance decreases** when your apps get more complex. Also, the **_overhead of this navigation option is quite high_**. @react-navigation/**native**, @react-navigation/**native-stack**, **react-native-safe-area-context** and **react-native-screens** will end up in your project’s package.json.

For a more performant and lightweight alternative, you can try out the [react-native-navigation](https://wix.github.io/react-native-navigation/docs/before-you-start/) library, which is tied to the native components. Even though the installation and the docs generally are not quite as intuitive when compared to the first navigation library, it is still worth it. Check out [this page](https://wix.github.io/react-native-navigation/docs/installing) for the installation part. Below you can find the code for a simple demo for how to navigate between two screens:

```javascript
import React from 'react'
import {View, Text, Button} from 'react-native'
import {Navigation} from 'react-native-navigation'

const HomeScreen = (props) => {
  return (
    <View>
      <Text>Home</Text>
      <Button
        title='Go to profile'
        onPress={() => Navigation.push(props.componentId, {
          component: {
            name: 'Profile',
            options: {
              topBar: {
                title: {
                  text: 'Profile'
                }
              }
            }
          }
        })}/>
    </View>
  );
};

const ProfileScreen = () => {
  return (
    <View>
      <Text>Profile Screen</Text>
    </View>
  );
}

Navigation.registerComponent('Home', () => HomeScreen);
Navigation.registerComponent('Profile', () => ProfileScreen);

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Home'
            }
          }
        ]
      }
    }
  });
});
```

**There are still several other libraries for handling the navigation in React Native**, but those two are the most popular options.

## Conclusion

Performance is a crucial factor in every React Native application, but it is also a complex topic.

**Several factors can affect performance**, ranging from console statements and animations to large-sized images and heavy computations. It is important to identify the sources of these memory leaks and poor performance and fix them.

Interestingly, both Android Studio and Xcode provide us a way to monitor memory usage. We also have a plethora of tools and methods to optimize React Native applications for performance, as discussed. **Try out these optimization techniques in your next React Native project**.

## Next Read

Congratulations! You have just **mastered the art of optimizing your code** for both iOS and Android platforms. But **don’t stop there**! You can still squeeze more performance out of your React Native app by enabling these two powerful features 👇

1.  Enable **Hermes** in your React native app

2.  Enable **New Architecture** of React native in your App

These are the latest innovations in the React Native world that can make your app more responsive, stable and secure.

If you want to **become an expert in performance optimization**, you need to learn how to use these two features in your app. Don’t worry, I have got you covered. I have written two **detailed articles that will teach you everything** you need to know about them. You can find them below:

- **Article Link:** [How to enable **Hermes** in your Old React native app](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/New-Architecture/Hermes-and-Static-Hermes-in-depth.md)

- **Article Link:** [How to enable **New Architecture** in your React native App](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/New-Architecture/How-to-Enable-New-Architecture.md)

### [🙏 If you find it helpful, please give a STAR (click here) ️⭐️ ⭐️](https://github.com/anisurrahman072/React-Native-Advanced-Guide)

Thank you for reading this article. I enjoy sharing my **5 years** of experience in **React-native**, **JavaScript**, **React** & **Node.js** with you every day. If you enjoyed reading this article, I would appreciate it if you could follow me on [**Twitter**](https://twitter.com/anis_RNCore) & [**Medium**](https://medium.com/@anisurrahmanbup).

If you find any **ISSUE** in this Guide BOOK, please create a **PR** to help the community 🔥
