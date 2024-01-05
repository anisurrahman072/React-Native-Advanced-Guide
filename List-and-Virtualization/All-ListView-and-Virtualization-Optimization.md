# React Native — Ultimate Guide on Virtualization Performance Optimization

### Optimize list performance — FlatList, SectionList, VirtualizedList, ScrollView (All in one) 🔥

![](https://cdn-images-1.medium.com/max/5760/1*prRdmtPhH2EpkO8ZkjCC4g.png)

## What is Virtualization?

In this guide, we will discuss list **virtualization** (also known as **windowing**). This is the idea of **rendering only visible rows of content** in a dynamic list instead of the entire list. The rows rendered are only a small subset of the full list with what is visible (the window) moving as the user scrolls. **This can improve rendering performance**.

**Virtualization massively improves memory consumption** and performance of large lists by maintaining a finite render window of active items and replacing all items outside of the render window with appropriately sized **blank space**.

## Virtualization Components in React Native

Mainly, these are **virtualization components** provided by the React Native team.

1.  [VirtualizedList](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/List-and-Virtualization/All-ListView-and-Virtualization-Optimization.md#virtualizedlist)

2.  [FlatList](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/List-and-Virtualization/All-ListView-and-Virtualization-Optimization.md#flatlist)

3.  [SectionList](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/List-and-Virtualization/All-ListView-and-Virtualization-Optimization.md#sectionlist)

4.  [**ScrollView** with Virtualization (**Experimental** & not suggested)](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/List-and-Virtualization/All-ListView-and-Virtualization-Optimization.md#scrollview)

We will see each of these **implementations in code** and then do **performance optimization** on each of them so that they can all load **more than 10,000 items**.

## Native RCTScrollView Component

Before starting with the **React Native virtualization** component, let’s understand the **Native Wrapper** of all virtualization components in React Native.

**“RCTScrollView”** is a native component that is used by the ScrollView component in React Native. It is a wrapper around the native **UIScrollView** on iOS and the native **android.widget.ScrollView** on Android. It provides the functionality of scrolling a view that contains multiple subviews or a large content that does not fit the screen. It also supports features such as **bouncing**, **paging**, **horizontal** mode, **sticky headers**, and **scroll indicators**.

The relation between **“RCTScrollView”** and **“ScrollView”** is that “ScrollView” is a **React Native component that renders a “RCTScrollView”** under the hood. You can use the “ScrollView” component in your React Native code to render a scrollable view with your custom content. You do not need to import or use the **“RCTScrollView”** component directly, as it is handled internally by the “ScrollView” component.

The relation between **“RCTScrollView”** and **other list components** such as **FlatList**, **SectionList**, and **RecyclerListView** is that they are all based on the same native component (“RCTScrollView”) that provides the scrolling functionality for the list views. However, they have different implementations and features that make them suitable for different use cases and scenarios.

## VirtualizedList

Let’s deep dive into the implementation of **VirtualizedList**. Here is the basic implementation for VirtualizedList.

![Basic implementation for VirtualizedList](https://cdn-images-1.medium.com/max/2000/1*j2Y-dAt1AdN1FPiwEXVG6g.png)

And below is the function **‘renderItem’** to render the **JSX elements** for VirtualizedList.

![](https://cdn-images-1.medium.com/max/2400/1*5AuUcNPQoW1ttCZNp980JA.png)

**_Output (IOS + Android)_**

![**Basic VirtualizedList view**](https://cdn-images-1.medium.com/max/5344/1*dgd9VusluhWPCw_dSd20yw.png)

### Optimize the performance of VirtualizedList

Let’s add some new props to the **VirtualizedList** component to improve the performance so that it can render a list of **10000+ items.**

![Added new props to VirtualizedList to improve its rendering performance.](https://cdn-images-1.medium.com/max/2000/1*eF0IRTsp337LtKc9kqBuCw.png)

### Understand the props of VirtualizedList

Let’s understand some props that you can pass to the VirtualizedList component to improve the rendering performance.

- **_initialNumToRender:_** How many items to render in the **initial batch**. This should be enough to fill the screen but not much more. Note these items will never be unmounted as part of the windowed rendering in order to improve perceived performance of scroll-to-top actions. **Default value = 10.**

- **_removeClippedSubviews:_** This may **improve scroll performance** for large lists. Note: **May have bugs** (missing content) in some circumstances — use at your own risk.

- **_windowSize:_** Determines the maximum number of items rendered outside of the visible area, in units of visible lengths. So, if your list fills the screen, then **windowSize={21}** (the default) will render the visible screen area plus up to 10 screens above and 10 below the viewport. **Reducing this number will reduce memory consumption** and may improve performance but will increase the chance that fast scrolling may reveal momentary blank areas of unrendered content.

- **_keyExtractor:_** Use the **keyExtractor** prop to provide a unique key for each item in the data array. This helps React to identify which items have changed, added, or removed. The key should be a string that is stable and does not change over time.

- **_getItemLayout:_** Use the **getItemLayout** prop to specify the height (or width, for horizontal lists) of each item in pixels. This allows the VirtualizedList to skip measurement of the items and optimize the scrolling performance. The function should return an object with **length**, **offset**, and **index** properties.

- **_maxToRenderPerBatch:_** Use the **maxToRenderPerBatch** prop to control how many items are rendered in each batch after the initial render. The larger this number, the less often the user will see blank space while scrolling, but the more work the UI thread has to do.

- **_updateCellsBatchingPeriod:_** Use the **updateCellsBatchingPeriod** prop to control how often the VirtualizedList attempts to update its cells. The **default value is 50 milliseconds**, which means that at most one update per 50 milliseconds will be performed. Increasing this number can reduce CPU usage and improve performance but may cause more lag in updating the list.

- **_removeClippedSubviews_**: This may improve scroll performance for large lists. **On Android the default value is true**. (Note: May have bugs (missing content) in some circumstances — use at your own risk.)

### Some challenges I faced while implementing VirtualizedList

Since **VirtualizedList** is very customizable and the base implementation for virtualization in React Native, you need to handle some basic needs in your own implementation logic.

**_#Challange_1_**

I found that creating **multiple columns in VirtualizedList is quite complex** and tough to handle. I created a 2-column view by using the code below. Therefore, I needed to add the prop **_getItem_** like below.

![VirtualizedList Implementation](https://cdn-images-1.medium.com/max/2000/1*0azY0xOLpNHRp2xwWWpMaw.png)

Here is the code for the function that implements the logic for showing **2 columns.**

![***getItem props function implementation***](https://cdn-images-1.medium.com/max/2000/1*Kh5HTFjOl1BJ1OIiyrZLbg.png)

Now that you have added the getItem prop with the **2-column logic**, you need to change the child component behavior for rendering the 2-column view. Here is the **code for rendering the 2-column view** for the VirtualizedList component.

![VirtualizedList child component JSX code for render the view](https://cdn-images-1.medium.com/max/2192/1*3QvP-2IS8s5nobVURuxM9w.png)

So, in the **child component** of **VirtualizedList**, we see that we needed to add an extra map function. Therefore, every time this item **array length will be 2** as I created a **2-column based logic** in the getItem prop function. This was a huge change in the code for showing a 2 or multi-column view in the VirtualizedList component.

**_#Challenge_2:_**

Another challenge I faced to use **_getItemLayout. _**From the previous of my explanation on**_ getItemLayout_** you already understand that how it works. Basically you need to set length, offset, index.

Where,

1.  **length means:** the height (or width, if horizontal) of your item, in pixels.

2.  **offset means:** the distance (**in pixels**) of the current item from the top of the list. It helps the list to calculate the scroll position and render only the visible items on the screen. The **easiest way** to **calculate the offset** for **items with constant height** is to **multiply the height by the index**, which gives the position immediately after the previous item. For example, if each item has a height of 50 pixels, then the offset for the third item is 50 \* 2 = 100 pixels.

3.  **index means:** The index is the position of your item in the data array, starting from 0.

So, to set it, I applied this code but I observed that it was not set properly and it made my **VirtualizedList** view **kind of shaky** and **inappropriate** in **behavior**.

![**getItemLayout** props function](https://cdn-images-1.medium.com/max/2308/1*0ewGwQXxRWGWstRfSTlNXA.png)

And this is how I set **_getItemLayout_** in **VirtualizedList**.

![set **getItemLayout** props in **VirtualizedList**](https://cdn-images-1.medium.com/max/2000/1*3AzIIxbLO-i7Of3Hk3Jndg.png)

I skipped **getItemLayout** in my **VirtualizedList** implementation as already my VirtualizedList implementation works smoothly with **1000+ image** Items.

### Final code of VirtualizedList Implementation

Here is the final code of **_VirtualizedList_** implementation with both

1.  **Highly optimized** the performance for rendering **1000+ Items**.

2.  Implemented **multi column** VirtualizedList.

        // Virtualized List Render JSX element 👇
        function renderVirtualizedListItem({ item, index }) {
            return (
                <View key={index} style={styles.virtualizedListStyle}>
                    {item.map((elem, i) => (
                        <View key={i}>
                            <Image
                                style={styles.image}
                                resizeMethod="resize"
                                source={{
                                    uri: elem.easyImageUrl
                                }}
                            />
                            <Text>{elem.nftName}</Text>
                        </View>
                    ))}
                </View>
            )
        }

        // Define how ROW of items will be visible 👇
        function getTwoColumnVirtualizedListItems(data, index) {
            // Return two items per row
            let items = []
            for (let i = 0; i < 2; i++) {
                const item = data[index * 2 + i]
                item && items.push(item)
            }
            return items
        }

        return (
            {/* VirtualizedList 🔥 🔥 🔥  */}
            <VirtualizedList
                data={myNftsData.findMyNfts}
                renderItem={renderVirtualizedListItem}
                getItemCount={(data) => data.length}
                getItem={getTwoColumnVirtualizedListItems}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={11}
                updateCellsBatchingPeriod={100}
            />
        )

**_VirtualizedList Final Output (IOS + Android)_**

![1000+ Images rendering using VirtualizedList](https://cdn-images-1.medium.com/max/5236/1*aVkx1wHa8vCdibNOVZDttw.png)

## FlatList

Let’s implement the above same data for FlatList

![FlatList implementation](https://cdn-images-1.medium.com/max/2000/1*QyTY6hWrEunD2a3GbBk7rg.png)

Red marked props were used for **performance optimization**. These are all the same as the props of **VirtualizedList**. I have already details explained about all these options in **VirtualizedList** section.

Now, below is the code for **_renderItem_** props function implementation for rendering JSX code.

![***renderItem*** props function implementation](https://cdn-images-1.medium.com/max/2780/1*L9c1KHbNcJ3VR2EshMu-KA.png)

### Final code for FlatList

    function renderFlatlistItem({ item }) {
      return (
       <View
        style={styles.nftCard}>
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

    return (
        {/* FlatList 🔥 🔥 🔥  */}
        <FlatList
           data={myNftsData.findMyNfts}
           renderItem={renderFlatlistItem}
           keyExtractor={(item) => item._id}
           numColumns={2}
           removeClippedSubviews={true}
           maxToRenderPerBatch={10}
           updateCellsBatchingPeriod={100}
           initialNumToRender={10}
           windowSize={11}
        />
    )

### Comparative analysis between VirtualizedList & FlatList

There is not much difference in **performance between** **VirtualizedList** and **FlatList**, as they are both based on the same **base implementation**. However, some factors that may affect the performance are:

- **_The type and size of the data array:_ VirtualizedList** can work with immutable data instead of plain arrays, which may be **more efficient** for some use cases. However, **FlatList** may have **better memory management for large arrays**.

- **_The layout and complexity of the items:_** **VirtualizedList** allows **more flexibility and customization** of the item layout, which may be useful for complex or dynamic items. However, **FlatList provides some convenient features**, such as **numColumns**, **horizontal**, and **inverted**, which may simplify the layout for some scenarios.

- **_The configuration and optimization of the props:_** Both **VirtualizedList** and **FlatList** have several props that can help to **improve the performance**, such as **removeClippedSubviews**, **maxToRenderPerBatch**, **updateCellsBatchingPeriod**, **initialNumToRender**, **windowSize**, **getItemLayout**, and **keyExtractor**. These props should be adjusted according to the needs and preferences of each case.
  > In general, **FlatList** is recommended for rendering basic, flat lists with **simple** data and layout. **VirtualizedList** is recommended for rendering **complex lists** with **custom data and layout**.

## SectionList

Let’s implement the above same data with **SectionList**. As, now we are going to show some section wise List, so we will add **2 sections** in our List.

1.  **Male Players**

2.  **Female Players**

Let’s see the code of **SectionList** component

![SectionList component code](https://cdn-images-1.medium.com/max/2000/1*eP-XmULoeMuLjnekv1dGPQ.png)

Now let’s see each function **props** of **SectionList**

![**Props functions of SectionList component**](https://cdn-images-1.medium.com/max/2628/1*Lix6BgBsKTFomJCVyoGH0Q.png)

### View of SectionList

![**SectionList output**](https://cdn-images-1.medium.com/max/5248/1*V0HmcuskxA5PrlmUzifKBg.png)

### MultiColumn view in SectionList

Let’s see now how we can **make multiple column** in **SectionList**. Basically there are 2 ways in how we can apply **multi column** view in **SectionList**.

**_#First_Way_**

✅ Apply **_FlatList_** inside **_SectionList_** **_renderItem_** props function.

Let’s see the code of first way.

![**Apply FlatList inside SectionList**](https://cdn-images-1.medium.com/max/2000/1*YHv6QAIwlrSgfXD3C5YS7A.png)

Now add the function **_renderSection_** into your SectionList component like below

![Added **renderSection** function in **renderItem** props](https://cdn-images-1.medium.com/max/2184/1*B2AeyvuFMbB1HYk5Qo8y7Q.png)

The **demerits** of this way are:

- You may encounter some **performance issues** and **warnings**, such as **_“VirtualizedLists should never be nested inside plain ScrollViews”_** or **_“Invariant Violation: Changing numColumns on the fly is not supported”_**.

- You may have to **deal with some complexity and bugs**, such as missing content, duplicate rendering, scrolling behavior, etc.

**_#Second_Way_**

✅ The second way is a **bit more complex** than the previous way. It is like an **algorithmic way** to **maintain the performance of SectionList** **as good as the original performance**.

You just need to change the **_renderItem_** props function like below:

![**Algorithmic** way for showing Multi line column in SectionList](https://cdn-images-1.medium.com/max/3104/1*RSkKs7029TEaR-C-f-1-jg.png)

This above function is for the **_renderItem_** **props functions**. Just replace your necessary code in the above function & send the function as **_renderItem_** props function of **SectionList**.

> # ❝ If you like my Algorithmic way, please give a STAR 🙏

### Multi Column view of SectionList

![](https://cdn-images-1.medium.com/max/5352/1*t5QqUIGS1xl-K4W2a8OnEQ.png)

### Final code of SectionList

Let me show you the code of **SectionList** with **multi-column** and **performance optimization**:

    function sectionsData() {
      return [
       {
        title: 'Male Players',
        data: myNftsData.findMyNfts.filter(
         (item) => item.collectionType == 'Male'
        )
       },
       {
        title: 'Female Players',
        data: myNftsData.findMyNfts.filter(
         (item) => item.collectionType == 'Female'
        )
       }
      ]
     }


     function renderItem({ section, index }) {
      const numColumns = 2 // Show 2 columns

      // Return null as ITEM already PUSHED into "items" array
      if (index % numColumns !== 0) return null

      // "numColumns" row wise ITEMS will be inserted into this Array
      const items = []

      // Loop for "numColumns" times for each valid "index"
      for (let i = index; i < index + numColumns; i++) {
       if (i >= section.data.length) {
        break
       }

       // PUSH row wise elements into "items" array. As i set "numColumns" as 2 so the final view 👇
       // [Item index: 0, Item index: 1]
       // [Item index: 2, Item index: 3]
       // [Item index: 4, Item index: 5]
       items.push(
        <View style={styles.nftCard}>
         <Image
          style={styles.image}
          resizeMethod="resize"
          source={{
           uri: section.data[i].url
          }}
         />
         <Text>{section.data[i].nftName}</Text>
        </View>
       )
      }

      // When index will be 0 it will return 👉 (<View> [Item index: 0, Item index: 1] </View>)
      // When index will be 2 it will return 👉 (<View> [Item index: 2, Item index: 3] </View>)
      // When index will be 4 it will return 👉 (<View> [Item index: 4, Item index: 5] </View>)
      return (
       <View
        style={{
         flexDirection: 'row',
         justifyContent: 'space-between'
        }}>
        {items}
       </View>
      )
     }


     function renderSectionHeader({ section }) {
      return (
       <View style={{ backgroundColor: '#eee', padding: 10 }}>
        <Text>{section.title}</Text>
       </View>
      )
     }


    return (
      <SectionList
           sections={sectionsData()}
           renderItem={renderItem}
           renderSectionHeader={renderSectionHeader}
           keyExtractor={(item) => item._id}
           // Performance props
           maxToRenderPerBatch={20} // Increase the number of items per batch
           updateCellsBatchingPeriod={100} // Increase the time interval between updates
           windowSize={11} // Reduce the number of screens to render
           removeClippedSubviews={true} // Remove offscreen views
        />
    )

## ScrollView

**Component that wraps** platform **ScrollView** while providing integration with **touch locking “responder” system**.

Keep in mind that **ScrollViews** must have a bounded **height** in order to work, since they contain unbounded-height children into a bounded container (via a scroll interaction). In order to bound the height of a ScrollView, **either set the height** of the view directly (discouraged) or make sure **all parent views have bounded height**. Forgetting to transfer {flex: 1} down the view stack can lead to errors here, which the element inspector makes quick to debug.

**Doesn’t yet support** other **contained responders** from blocking this scroll view from becoming the responder.

### Load 1000+ images with ScrollView

**ScrollView is not for rendering lists**. **_ScrollView_** is only for rendering views that are scrollable. However, let’s see how we can use **_ScrollView_** to render a list.

![ScrollView implementation for rendering a List](https://cdn-images-1.medium.com/max/2000/1*cZV8DooaXD72tn0Er3FbNg.png)

You can see that I applied **_“removeClippedSubviews”_** as true. It will help to render a list. Let’s see what this “removeClippedSubviews” do in ScrollView.

**_“removeClippedSubviews”:_** It is still experimental. When true, offscreen child views (whose overflow value is hidden) are removed from their native backing superview when offscreen. This can improve scrolling performance on long lists.

### Final code for ScrollView

    <ScrollView
     removeClippedSubviews={true}
     showsVerticalScrollIndicator={false}>
     <View key={nftCollectionType}>
      {myNftsData.findMyNfts.map((item, index) => (
       <View key={index}>
        <Image
         style={styles.image}
         resizeMethod="resize"
         source={{
          uri: item.url
         }}
        />
        <Text>{item.nftName}</Text>
       </View>
      ))}
     </View>
    </ScrollView>

### Observation

For my case, I was able to load more than **200 images** easily by using it, but I suggest that if you need to render a list, then use any list-supported component like **FlatList**, **VirtualizedList**, etc.

## ScrollView vs Virtualization

Let’s see some comparative analysis:

- **ScrollView renders all its child components at once**, which can cause **slow rendering** and **increased memory usage** if the list is large. **FlatList**, on the other hand, **renders items lazily**, only when they are about to appear on the screen, and removes items that scroll way off screen to save memory and processing time.

- **ScrollView does not have built-in optimizations** for **rendering** and **updating large lists**, such as separators, multiple columns, infinite scroll loading, etc. FlatList supports these features out of the box.

- **ScrollView maintains the state of its child components**, which can be useful for some scenarios, but also adds overhead to the rendering process. **FlatList unmounts and recreates components from scratch** when they scroll in and out of view, which can improve performance but also lose state.

## When to use ScrollView & When to use FlatList/ VirtualizedList?

**ScrollView** and **FlatList** are **two components that can render a list of items** in React Native. However, they have different ways of handling state. **ScrollView maintains the state of its child components**, which means that it **remembers the data and UI changes of each item** in the list. FlatList unmounts and recreates components from scratch when they scroll in and out of view, which means that it does not preserve the data and UI changes of each item in the list.

To illustrate this difference, let’s look at an example. **Suppose you have a list of 100 items** that can be selected by tapping on them. **Each item has a text and a checkbox** to indicate its selection status. You can use either ScrollView or FlatList to render this list, but the result will be different.

If you use **ScrollView**, you will be able to select and deselect any item in the list, and the **checkbox will reflect the selection status correctly**. This is because ScrollView keeps track of the state of each item and renders them accordingly.

If you use **FlatList**, you will be able to select and deselect any item in the list, but the **checkbox may not reflect the selection status correctly**. This is because **FlatList does not keep track of the state of each item** and renders them from scratch when they scroll in and out of view. For example, **if you select an item at the top of the list and then scroll down** to the bottom, the **item may appear as unselected when you scroll back up**. This is because FlatList has unmounted and recreated the item component without preserving its state.

Therefore, **if you need to preserve the state of each item in a large list**, **ScrollView may be more suitable** than FlatList. However, **ScrollView** has other drawbacks such as slow rendering and increased memory usage, so you need to weigh the pros and cons carefully.

## Nested Virtualization Error

If you see this **error** anytime in your **metro** 👇

### Error: ❝ VirtualizedLists should never be nested inside plain ScrollViews ❞

**Then here is the solution article with error reason & analysis:** [React Native — Nested Virtualization Anti-pattern (Performance Optimization)](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Anti-Patterns/Nested-Virtualization-anti-pattern.md)

## What Next ?

Since you have mastered **React Native Virtualization**, you are ready to explore **_FlashList_**, which is a new approach that uses **_‘Cell Recycling’_** instead of **_Virtualization_**. I will guide you through the steps and explain the terms related to **FlashList** and **Cell Recycling**. I also describe my journey on how **I loaded 64,000 image** Items in FlashList without any lac.

**FlashList article link:** [React Native — FlashList: Performant List view (Implementation + Analysis)](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/List-and-Virtualization/FlashList-Cell-Recycling-details.md)

### [🙏 If you find it helpful, please give a STAR (click here) ️⭐️ ⭐️](https://github.com/anisurrahman072/React-Native-Advanced-Guide)

Thank you for reading this article. I enjoy sharing my **5 years** of experience in **React-native**, **JavaScript**, **React** & **Node.js** with you every day. If you enjoyed reading this article, I would appreciate it if you could follow me on [**Twitter**](https://twitter.com/anis_RNCore) & [**Medium**](https://medium.com/@anisurrahmanbup).

If you find any **ISSUE** in this Guide BOOK, please create a **PR** to help the community 🔥
