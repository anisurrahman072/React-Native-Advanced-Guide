# React Native — Ultimate Guide on FlashList: Performant List view (Implementation + Analysis)

### Fast & Performant React Native List — No more blank cells 🔥

![**FlashList** — Top Performant List View that can **load** even more than **64,000 Items**](https://cdn-images-1.medium.com/max/5760/1*uc2p0EfErOx1cRomeGwj3A.png)

Let’s see an index of what we will learn from this article:

- [Introduction to “FlashList”](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/List-and-Virtualization/FlashList-Cell-Recycling-details.md#introduction-to-flashlist)

- [What is **“RecyclerListView”** ?](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/List-and-Virtualization/FlashList-Cell-Recycling-details.md#what-is-recyclerlistview-)

- [What is **“Cell Recycling”** ?](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/List-and-Virtualization/FlashList-Cell-Recycling-details.md#what-is-cell-recycling-)

- [Benefits of “RecyclerListView” & “FlashList”](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/List-and-Virtualization/FlashList-Cell-Recycling-details.md#benefits-of-recyclerlistview--flashlist)

- [Difference between **“Virtualization”** & **“Cell Recycling”** concepts](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/List-and-Virtualization/FlashList-Cell-Recycling-details.md#difference-between-virtualization--cell-recycling-concepts)

- [Basic implementation of FlashList](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/List-and-Virtualization/FlashList-Cell-Recycling-details.md#basic-implementation-of-flashlist)

- [Important **Props** of FlashList](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/List-and-Virtualization/FlashList-Cell-Recycling-details.md#important-props-of-flashlist)

- [How to write a performant FlashList Component](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/List-and-Virtualization/FlashList-Cell-Recycling-details.md#how-to-write-a-performant-flashlist-component)

- [Check the performance of FlashList](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/List-and-Virtualization/FlashList-Cell-Recycling-details.md#check-the-performance-of-flashlist)

- [Check your FlashList Load Time](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/List-and-Virtualization/FlashList-Cell-Recycling-details.md#check-your-flashlist-load-time)

- [Check how much **“Blank Space”** raised](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/List-and-Virtualization/FlashList-Cell-Recycling-details.md#check-how-much-blank-space-raised)

- [How to **reduce “Blank Space”** in FlashList ?](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/List-and-Virtualization/FlashList-Cell-Recycling-details.md#how-to-reduce-blank-space-in-flashlist)

- [Migrating from “Flat❌List" to "Flash✅List"](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/List-and-Virtualization/FlashList-Cell-Recycling-details.md#migrating-from-flatlist-to-flashlist)

- [Error that I faced while implementing FlashList (Quick Solution)](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/List-and-Virtualization/FlashList-Cell-Recycling-details.md#error-that-i-faced-while-implementing-flashlist-quick-solution)

- [What Next (Learn Virtualization)?](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/List-and-Virtualization/FlashList-Cell-Recycling-details.md#what-next-learn-virtualization)

## Introduction to “FlashList”

**_FlashList_** is a React Native component that allow you to render large lists of data efficiently. It **uses the concept of recycling views**, which means that it **only create and render a limited number of views** that are visible on the screen, and reuse them as the user scrolls through the list. This reduces the memory usage and improves the performance of the app.

However, **_FlashList_** is built on top of **_RecyclerListView_**, which means that it **inherits all the features and benefits of RecyclerListView**, but also adds some extra functionality.

**_FlashList_** is designed to be a drop-in replacement for **_FlatList_**, which is the default list component in React Native. **_FlatList_** uses the old Virtualization concept but **_FlashList_** uses the most modern concept **_Cell Recycling_**. FlashList has a similar API and props as FlatList, so you can easily convert your existing **FlatList** code to FlashList without much hassle.

## What is “RecyclerListView” ?

**_RecyclerListView_** was built with performance in mind which means no blanks while **quick scrolls** or frame drops. **RecyclerListView** encourages you to have deterministic heights for items you need to render. This does not mean that you need to have **all items of same height** and stuff, all you need is a way to look at the data and compute height upfront so that **RecyclerListView** can compute layout in one pass rather than waiting for the draw to happen.

You can still do all sorts of **GridViews** and **ListViews** with **different types** of items which are all recycled in optimal ways. Type based recycling is very easy to do and comes out of the box.

## What is “Cell Recycling” ?

**_RecyclerListView_** & **_FlashList_** both uses **_“cell recycling”_** to **reuse views** that are no longer visible to render items instead of creating new view objects. **Creation of objects is very expensive** and comes with a memory overhead which means as you scroll through the list the memory footprint keeps going up.

**Releasing invisible items** of memory is another technique but that leads to creation of even more objects and lot of **garbage collections**. Recycling is the best way to render infinite lists that does not compromise performance or memory efficiency.

## Benefits of “RecyclerListView” & “FlashList”

Apart from all performance benefits **_RecyclerListView_** comes with great features out of the box & maximum of them are now in **FlashList**:

- Supports staggered grid layouts

- Supports variable height items even if dimensions cannot be predetermined (prop — forceNonDeterministicRendering)

- End reach detections

- Horizontal Mode

- Viewability Events

- Initial render offset/index support

- Footer support and many more.

## Difference between “Virtualization” & “Cell Recycling” concepts

### **Virtualization**

React Native Virtualization is a technique that **renders only the items** that are **visible in the viewport**, and replaces the rest with **blank space**. This reduces the number of DOM elements that need to be created and updated, and improves memory consumption and scrolling speed. However, this also means that the items that are outside of the viewport are unmounted and lose their internal state and **creates a memory overhead** for **Blank Spaces**.

> **Read my in details article on** [React native virtualization components (VirtualizedList, FlatList, SectionList & ScrollView) with performance optimization props.](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/List-and-Virtualization/All-ListView-and-Virtualization-Optimization.md)

### **Cell Recycling**

React Native cell recycling is a technique that **reuses the existing DOM elements** for rendering new items, instead of creating new ones. This avoids the overhead of **mounting** and **un-mounting** components, and makes the rendering **more efficient** than Virtualization.

## Basic implementation of FlashList

First of all, let’s install **“⚡️FlashList”** by this below command

    yarn add @shopify/flash-list
    cd ios && pod install

Now, here is the very basic code for **FlashList** that I implemented

![Basic code of FlashList](https://cdn-images-1.medium.com/max/2232/1*QHs3GINj8F462sJzHhlXUQ.png)

Now implement **renderItem** props function **renderFlatlistItem()** like below.

![**renderItem** props implementation](https://cdn-images-1.medium.com/max/2808/1*qHFksI5Z09BgvygNl3thDQ.png)

Here is the **full code** that I implemented.

```javascript
function renderFlatlistItem({ item }) {
    return (
        <View>
            <Image
                style={styles.image}
                resizeMethod="resize"
                source={{
                    uri: item.url
                }}
            />
            <Text>{item.nftName}</Text>
        </View>
    )
}

// JSX code
return (
    <FlashList
        data={myNftsData.findMyNfts}
        renderItem={renderFlatlistItem}
        estimatedItemSize={20}
        keyExtractor={(item) => item._id}
        numColumns={2}
    />
)
```

Output of the Basic **FlashList** implementation (**IOS** + **Android**) in my App.

![150+ Images rendering using FlashList](https://cdn-images-1.medium.com/max/2800/0*k8nvyJ4zFY3rNkN7.png)

## Important Props of FlashList

Before diving deep, into the **performance improvement** of FlashList, let’s first understand some props of Flashlist that will be used to improve the performance.

### **_estimatedItemSize_**

**_estimatedItemSize_** is a single numeric value that hints FlashList about the approximate size of the items before they're rendered. FlashList can then use this information to decide **how many items it needs to draw** on the screen before initial load and while scrolling. If most of the items are of different sizes, you can think of an average or median value and if most items are of the same size, just use that number.

A quick look at Element Inspector can help you determine this. If you're confused between two values, the smaller value is a better choice. If you don't specify this prop, you will get a warning with a value you can use. I recommend not ignoring that warning and defining estimatedItemSize before the list gets to your users.

### **_keyExtractor_**

**_keyExtractor_** used to extract a unique key for a given item at the specified index. Key is used for optimizing performance. Defining keyExtractor is also necessary when doing layout animations to uniquely identify animated components.

### **_getItemType_**

**_getItemType_** allows developers to specify item types. This will improve recycling if you have different types of items in the list. Right type will be used for the right item.Default type is 0. If you don’t want to change for an indexes just return undefined. **This method is called very frequently. Keep it fast for better performance.** [In next section we will see how we can set getItemType](#97c4).

### **_overrideItemLayout_**

**_overrideItemLayout_** method can be used to provide explicit size estimates or change column span of an item. Providing specific estimates is a good idea when you can calculate sizes reliably. **FlashList** will prefer this value over estimatedItemSize for that specific item. Precise estimates will also improve precision of scrollToIndex method and initialScrollIndex prop. If you have a separator below your items, you can include its size in the estimate.

Changing item span is useful when you have grid layouts (**numColumns** > 1) and you want few items to be bigger than the rest. Modify the given layout. Do not return any value from the method. FlashList will fallback to default values if this is ignored. **_This method is called very frequently. Keep it fast for better performance._**

### **_minimumViewTime_**

**_minimumViewTime_** is the minimum amount of time (in **milliseconds**) that an item must be physically viewable before the viewability callback will be fired. A **high number means** that scrolling through **content without stopping** will not mark the content as viewable. The **default value is 250**. FlashList team do not recommend setting much lower values to preserve performance when **quickly scrolling**.

## How to write a Performant FlashList Component

While **FlashList** does its best to **achieve high performance**, it will still perform poorly if your item components are slow to render. In this post, let's dive deeper into how you can remedy this.

### Recycling

One important thing to understand is **how FlashList works** under the hood. When an item **gets out of the viewport**, instead of being destroyed, **the component is re-rendered** with a different item prop. When optimizing your item component, try to ensure as few things as possible have to be re-rendered and recomputed when recycling.

Even you should avoid to use any **_useState()_** inside your component items. Let’s see a bad component with useRef(), useState(), **logical calculation**, etc.

![A bad component example](https://cdn-images-1.medium.com/max/2156/1*FihYQWhXMyTNogIa_Qw9lg.png)

> Again, when optimizing your item component, **try to ensure as few things as possible have to be re-rendered** and recomputed when recycling.

### estimatedItemSize

Ensure **_estimatedItemSize_** props value is as close as possible to the real average value. To be more sure you can use Element Inspector.

### Remove “key” prop

> Using key prop inside your item and item's nested components will highly degrade performance.

Make sure your item components and their nested components **don’t have a key prop**. Using this prop will lead to FlashList not being able to recycle views, losing all the benefits of using it over FlatList.

For example, if we had a following item component:

![Used **key** prop in Item & nested Items.](https://cdn-images-1.medium.com/max/2140/1*pM1KbjUdZzOemEVgqcuh8g.png)

There might be cases where React forces you to use **key** prop, such as when using **map**. In such circumstances, **ensure that the key is not tied** to the **item prop** in any way, so the **keys don't change when recycling**.

Let’s imagine we want to display **names** of **users**:

![Used **key** prop for **map**](https://cdn-images-1.medium.com/max/2020/1*c9sSdXxxYcC15GCJY5SGFA.png)

If we wrote our item component like this, the **Text** component would need to be re-created. Instead, we can do the following:

![Used **index** as **key** props value (It will bind key prop **loosely** with ITEM component)](https://cdn-images-1.medium.com/max/2392/1*h7CfCk0aEE6BhoG4tPqXmw.png)

> Although using **index** as a key in map is not recommended by React, in this case since the data is derived from the list's data, the items will update correctly.

### Difficult calculations[​](https://shopify.github.io/flash-list/docs/fundamentals/performant-components/#difficult-calculations)

If you do any calculations that might take a lot of resources, consider **memoizing** it, making it faster, or removing it altogether. The render method of items should be as efficient as possible.

### getItemType

If you have different types of cell components and these are vastly different, consider leveraging the **_getItemType_** prop. For example, if we were building a messages list, we could write it like this:

![FlashList with ***getItemType*** prop](https://cdn-images-1.medium.com/max/2000/1*7odnKdiqalGlSQvHiOM5jQ.png)

Now what will be in **type**? So i set these below types

![Item types (React Native Items **<Text/>** & **<Image/>** basically)](https://cdn-images-1.medium.com/max/2000/1*p7dmiVR-85zx7hEL2Qq0RQ.png)

### Leaf components

Let’s consider the following example:

![**{ item } **is not using in **<MyHeavyComponent/>** component](https://cdn-images-1.medium.com/max/2000/1*Unh5SEYYiwM_dIk_uE_sjA.png)

Since MyHeavyComponent does not directly depend on the item prop, **memo** can be used to skip re-rendering MyHeavyComponent when the item is recycled and thus re-rendered:

![Put **<MyHeavyComponent/>** component body in **memo**](https://cdn-images-1.medium.com/max/2280/1*S1z0t5K1CEzI8np6yOZUkQ.png)

## Check the performance of FlashList

Now, **we know all the props** that are important for performance optimization. We also know **all the ways** (not only props but also the ways) how we can optimize the performance of FlashList.

So, let’s have some fun with **loading 64,000 images** in **FlashList**.

It is amazing the result I got. Here is the **initial load time**: only **454 milliseconds** for **64,000 images load**.

![Initial load time](https://cdn-images-1.medium.com/max/5232/1*qrrrUTKqoo-31Zi8IvbIpw.png)

Now let’s check after **quick** **scrolling down** & **reach end of FlashList**. It gave just an amazing output (**Very low size blank area** for **64,000 Images**) 🔥

![Blank Area raised](https://cdn-images-1.medium.com/max/5420/1*7waGoSNAiVK4ifZBI3ucJg.png)

Pretty cool that all my performance optimization works smoothly for **FlashList**.

### Let’s get introduce with matrix APIs from FlashList.

## Check your FlashList Load Time

The event **onLoad** is raised once the list has drawn items on the screen. It also reports **elapsedTimeInMs** which is the **time it took to draw the items**. This is required because FlashList doesn’t render items in the first cycle. **Items are drawn after it measures itself at the end of first render.** If you’re using **ListEmptyComponent**, this event is raised as soon as **ListEmptyComponent** is rendered.

Here is the code that I implemented. First, add **_onLoad_** props like below.

![Code of FlashList (Added **onLoad** props)](https://cdn-images-1.medium.com/max/2000/1*h7yRHQ-sUwER46i28BHZnQ.png)

Now implement **_onLoadListener()_** method like below

![Code of ***onLoadListener() **method*](https://cdn-images-1.medium.com/max/2000/1*Nm6VOF90umU7ZTUp84Pu2Q.png)

### Output analysis

For, **150 (Image) items** it gave me — **202 milliseconds** like below **(Pretty fast)** in my simulator (without release mode).

![**For 150 (Image) items load time output**](https://cdn-images-1.medium.com/max/2260/1*m730pGQLWgKiBm52-c05Fg.png)

### Source Code

Here is the final code

```javascript
const MyComponent = () => {
    const onLoadListener = useCallback(({ elapsedTimeInMs } ) => {
        ingestData("Sample List load time", elapsedTimeInMs);
    }, []);

    // JSX code
    return <FlashList {...props} onLoad={onLoadListener} />;
}
```

## Check how much “Blank Space” raised

Though **“FlashList”** works in the concept of **“Cell recycling”** instead of **“Blank space”**, it is possible that the user of your app may face **visible blank space** while they scroll very fast in their device.

So, FlashList comes with a **hook** that can **track cumulative** and **maximum blank space** that the user experienced while scrolling the list. The cost of tracking this metric is minimal and you can implement it in the following way.

Here is the code that I implemented. First, add **_onBlankArea_** props and a **_ref_** props like below.

![Added **ref** and **onBlankArea** props in **FlashList**](https://cdn-images-1.medium.com/max/2084/1*-vC5idKqqQkzli7ZfL2omw.png)

Now import **_useBlankAreaTracker_** hook from FlashList like below

![Imported **useBlankAreaTracker** from FlashList](https://cdn-images-1.medium.com/max/2988/1*Q7kO0xHyl5nHske8AI6t2w.png)

Now create a **_ref_** by using **_useRef()_** and also define **_useBlankAreaTracker_** hook like below

![Defined **ref** and ***useBlankAreaTracker **hook*](https://cdn-images-1.medium.com/max/3776/1*1HZTZGnF05ZR6aMhX-ivkg.png)

Now implement a useEffect() hook to get the output like below

![**useEffect()** hook to get **“Blank Space”** raised output](https://cdn-images-1.medium.com/max/3372/1*u9sZ0MzTqY6Hn-j4JNZvbg.png)

### Output

For, **150 (Image)** items it gave me — below output **(Pretty performant)** in my simulator (without release mode). I scrolled the images very fast & scrolled up-down very fast.

![Output from onBlankArea](https://cdn-images-1.medium.com/max/2988/1*7FH4UZbSKVIL_11zRQI7ew.png)

### Output Analysis

FlashList onBlankArea props means the following:

- **_cumulativeBlankArea_** is the **total blank area** that the user has seen while scrolling the list. It is measured in pixels and it is the sum of all the gaps between the items that were not rendered yet. A **lower value** means **less blank space** and **better performance**.

- **_maxBlankArea_** is the **maximum blank area** that the user has seen while scrolling the list. It is also measured in pixels and it is the largest gap between the items that were not rendered yet. A lower value means less noticeable blank space and better user experience.

For a **150 items** rendering in an android simulator, these values seem to be quite low, which indicates a **good performance**.

### Full code of **_onBlankArea_** implementation.

Here is the full code that i implemented. So that you can just copy & test the juice 💁‍♂️

```javascript
import React, { useRef } from 'react'
import { FlashList, useBlankAreaTracker } from '@shopify/flash-list'

function MyListComponent(){
    // For FlashList
    const ref = useRef(null)
    const [blankAreaTrackerResult, onBlankArea] = useBlankAreaTracker(ref)

    // Only when the component will unmount then you will see the output
    // As we set the console in cleanUp function 👇
    // It will show you then the latest output of Blank Area when unmount
    useEffect(() => {
        return () => {
            console.log('On blank area: ', blankAreaTrackerResult)
        }
    }, [])

    // JSX code
    return (
        <FlashList
            {...props}
            ref={ref}
            onBlankArea={onBlankArea}
        />
    )
}
```

## How to reduce “Blank Space” in FlashList?

To improve the performance of **_onBlankArea_**, you need to reduce the blank area that the user sees while scrolling the list. This means that you need to **optimize the rendering of the list items** and make sure they are ready to be displayed as soon as possible. There are some ways to do that, such as:

- Using the **estimatedItemSize** prop to provide an approximate height or width of each item. This can help FlashList to allocate the right amount of space for each item and avoid unnecessary layout shifts.

- Using the **getItemType** prop to specify different types of items based on their content or layout. This can help FlashList to recycle the components more efficiently and avoid re-rendering items that have the same type.

- Using **React.memo** or **PureComponent** to prevent unnecessary re-rendering of your list items. This can improve the performance of your app by avoiding wasteful computations and memory allocations.

## Migrating from "Flat❌List" to "Flash✅List"

1.  You should see a warning about missing **estimatedItemSize** and a suggestion. Set this value as the prop directly.

2.  Important: Scan your **renderItem** hierarchy for explicit key prop definitions and remove them. If you’re doing a .map() use indices as keys.

3.  Check your **renderItem** hierarchy for components that make use of useState and verify whether that state would need to be reset if a different item is passed to that component.

4.  If your list has heterogenous views, pass their types to **FlashList** using **getItemType** prop to improve performance.

5.  Do not test performance with **JS dev mode** on. Make sure you’re in **release mode**. FlashList can appear slower while in dev mode due to a small render buffer.

## Error that I faced while implementing FlashList (Quick Solution)

Basically two error I faced. I will tell you the solution of them too.

### #ERROR: 1

**Error:** Invariant Violation: requireNativeComponent: “AutoLayoutView” was not found in the UIManager.

**Solution:** Just stop the Xcode & Metro. Clean build in XCode. **Re build your app from XCode.**

### **#ERROR: 2**

**Error:** FlashList’s rendered size is not usable. Either the height or width is too small **(<2px)**. Please make sure that the parent view of the list has a valid size. FlashList will match the size of the parent.

**Solution:** **_FlashList_** uses **_recyclerlistview_** to leverage its recycling capability. recyclerlistview's default layout algorithm **cannot work without a valid size**. It needs to first measure itself and then decide how much to draw and reuse. So, **make sure that the parent of the list mounts with a valid size (>=2px)** and FlashList will match the size of its parent.

Please note that **you cannot apply style directly to FlashList** so you may need to wrap it in a View. Please note most lists do mount with deterministic sizes so make sure to check it if the parent has a correct size. Just add a **fixed height** into the parent component of FlashList like below.

![Added a fixed height in parent component of FlashList](https://cdn-images-1.medium.com/max/2000/1*Y5GYQntG_PdBfBErBpn6Gg.png)

## What Next (Learn Virtualization)?

If you are interested in learning about the previous version of **_React Native virtualization_**, which used a different approach than the current **FlashList** component, you can read this article that provides a detailed and easy-to-understand explanation.

**Article link:** [React Native — Virtualization Performance Optimization (FlatList, SectionList, VirtualizedList, ScrollView)](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/List-and-Virtualization/All-ListView-and-Virtualization-Optimization.md)

### [🙏 If you find it helpful, please give a STAR (click here) ️⭐️ ⭐️](https://github.com/anisurrahman072/React-Native-Advanced-Guide)

Thank you for reading this article. I enjoy sharing my **5 years** of experience in **React-native**, **JavaScript**, **React** & **Node.js** with you every day. If you enjoyed reading this article, I would appreciate it if you could follow me on [**Twitter**](https://twitter.com/anis_RNCore) & [**Medium**](https://medium.com/@anisurrahmanbup).

If you find any **ISSUE** in this Guide BOOK, please create a **PR** to help the community 🔥
