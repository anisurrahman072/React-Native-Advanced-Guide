# React Native — Nested Virtualization Anti-pattern (Performance Optimization)

### ERROR “ VirtualizedLists should never be nested inside plain ScrollViews”.

![Anti Pattern — Nested Virtualization](https://cdn-images-1.medium.com/max/5760/1*ut1Fr0oJhGpHGaC2wTXd_Q.png)

React Native provides some components for rendering large lists of data efficiently: [<FlatList>](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/List-and-Virtualization/All-ListView-and-Virtualization-Optimization.md) and [<SectionList>](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/List-and-Virtualization/All-ListView-and-Virtualization-Optimization.md). These components are based on the **VirtualizedList** component, which implements a virtualization technique to improve **memory consumption** and **performance**.

**Virtualization** means that only the items that are **currently visible** on the screen (or within a certain window size) are rendered, while the rest are replaced by **blank spaces** of the **same size**. This way, the list can handle thousands of items without affecting the app’s responsiveness or memory usage.

## Nested VirtualizedLists Error

However, there is a common mistake that developers make when using these components: **nesting them inside a plain ScrollView** with the same orientation (horizontal or vertical). Ultimately it creates a silent error in metro like bellow:

### Error: ❝ VirtualizedLists should never be nested inside plain ScrollViews ❞

**Let’s see an example of Error View** (FlatList inside ScrollView):

![Error view (IOS & Android)](https://cdn-images-1.medium.com/max/5268/1*pqawX4h9jKwgvVwJ6PvGXQ.png)

## Error Reason

So, what are the problems when you nested a VirtualizedList component inside a plain ScrollView? Why was that error sent to your metro?

The are several reasons why nested VirtualizedList is an **Anti-pattern**. Such as:

- The **VirtualizedList** cannot calculate the **correct window size**, because the ScrollView takes up the **entire screen** and does not constrain its content. Therefore, the VirtualizedList will try to **_render all the items at once_**, defeating the purpose of virtualization and potentially **causing performance issues** or **crashes**.

- The ScrollView will intercept all the **touch events** and **prevent the VirtualizedList from handling them properly**. This can affect features like **pull-to-refresh**, **infinite scrolling**, or **swipe actions**.

- The ScrollView will also interfere with the **scroll position** and **momentum of the VirtualizedList**, causing a **janky** and **inconsistent** user experience.

## Quick solution before details explanation

To avoid these problems, React Native warns you when you nest a **VirtualizedList** inside a plain **ScrollView** with the **same orientation**, and suggests you to **_use another VirtualizedList-backed container_** instead. This means that you should either:

- Use a **_different orientation_** for the **nested list** (for example, a **horizontal** [FlatList](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/List-and-Virtualization/All-ListView-and-Virtualization-Optimization.md) inside a **vertical** **ScrollView**).

- Use another **_component that supports virtualization and scrolling_**, such as [`<SectionList>`](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/List-and-Virtualization/All-ListView-and-Virtualization-Optimization.md) or `<FlatGrid>`.

- Use a **custom component** that implements its own logic for **rendering** and **scrolling**, such as <RecyclerListView> or <LargeList>.

By following these suggestions, you can ensure that your **lists** are **rendered efficiently** and **smoothly**, without compromising the **user experience** or the **app performance**.

### Let’s get started with details explanation & solution.

## Error Code

So, in my case I had a code a where I needed to show a **_list of Images_** in [FlatList](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/List-and-Virtualization/All-ListView-and-Virtualization-Optimization.md) and at the top of the list there was a Title & a camera button to take more photos. The total view was wrapped by a **ScrollView**. Let’s see this anti-pattern view 👇

![Error view (**FlatList** inside **ScrollView**)](https://cdn-images-1.medium.com/max/4292/1*9ybNu8s4QjkYJolAMSbYyw.png)

So, from the above picture we see that [FlatList](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/List-and-Virtualization/All-ListView-and-Virtualization-Optimization.md) (red box) was wrapped by a [ScrollView](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/List-and-Virtualization/All-ListView-and-Virtualization-Optimization.md) (green box). This is **Anti-Pattern**.

Now let’s see this **anti-pattern** code 👇

![Error Code (**FlatList** inside **ScrollView**)](https://cdn-images-1.medium.com/max/2364/1*lXFc96bzsv7raL49FCBkNQ.png)

## Solution Code

We can solve it by using only the **FlatList** instead of using both FlatList with ScrollView. **Flatlist** made it really simple by providing the support for these two props functions. These 2 are:

- **Header support** (ListHeaderComponent)

- **Footer support** (ListFooterComponent)

So we will use ListHeaderComponent props function to solve our above problem for which the nested **_FlatList_** was used.

So, basically our problem was that we needed to make the **header** (Tittle & camera button) as scrollable. So, to do that we used **ScrollView**. But now we can do that by using **FlatList** ListHeaderComponent props function.

So, what we will do here is Just Wrap that header (Title & Camera button) into a <View> component & then pass that component into **FlatList** ListHeaderComponent props function.

Let’s see the code bellow. First, create a **wrapper component** for Title & Camera button like bellow.

![Header for **ListHeaderComponent** props function](https://cdn-images-1.medium.com/max/2180/1*PDgyu-9sYUn51zB23iuB9g.png)

Now just add this gearHeader() function as the **ListHeaderComponent** props of **_FlatList_** like bellow

![**FlatList** with **ListHeaderComponent **props](https://cdn-images-1.medium.com/max/2000/1*uJ68LZboR91nozJYcgXh1Q.png)

Here is the view of the solution

![Solution view (Nested Virtualization error solved)](https://cdn-images-1.medium.com/max/4288/1*chOQ29NVAPTT2NHcF7K3rQ.png)

Here is the final code with **ListHeaderComponent** props function

```javascript
// Header function
function gearHeader() {
  return (
    <View style={styles.titleHolder}>
      <Text style={styles.myGearText}>My Gear</Text>

      <View style={styles.iconRow}>
        <TouchableOpacity
          onPress={() => openCameraCameraRoll(IMAGE_FOR.FIELD_GEAR)}
        >
          <Icon name={"camera"} type={"entypo"} size={25} color="grey" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// FlatList "ListHeaderComponent" props
return (
  <FlatList
    data={gearPhotos}
    keyExtractor={(item) => item._id}
    numColumns={3}
    ListHeaderComponent={gearHeader}
    showsVerticalScrollIndicator={false}
    renderItem={renderItem}
  />
);
```

## What next?

Now that you have successfully solved the **virtualization anti-pattern** by using the power of **FlatList**, you might want to learn more about **React Native virtualization** and **FlatList** **performance optimization** to load **1000+ items**. Don’t worry, I have prepared another detailed article for you on this topic.

**Article Link:** [React Native — Virtualization Performance Optimization (FlatList, SectionList, VirtualizedList, ScrollView)](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/List-and-Virtualization/All-ListView-and-Virtualization-Optimization.md)

### [🙏 If you find it helpful, please give a STAR (click here) ️⭐️ ⭐️](https://github.com/anisurrahman072/React-Native-Advanced-Guide)

Thank you for reading this article. I enjoy sharing my **5 years** of experience in **React-native**, **JavaScript**, **React** & **Node.js** with you every day. If you enjoyed reading this article, I would appreciate it if you could follow me on [**Twitter**](https://twitter.com/anis_RNCore) & [**Medium**](https://medium.com/@anisurrahmanbup).

If you find any **ISSUE** in this Guide BOOK, please create a **PR** to help the community 🔥
