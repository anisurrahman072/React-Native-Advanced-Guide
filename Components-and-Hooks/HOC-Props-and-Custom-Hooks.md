# React Native — Ultimate Guide on HOC, Render props & Custom Hooks

### Componentization from React Standard — Analysis with code 🔥

![Alt text](/images/hoc.png)

I have shared my **5 years** of experience in **componentization** of **React** and **React Native** in this article. If you read this article carefully and understand each example, you will become an **expert in React + Native Component**, children rendering, and Custom Hooks. You will also learn how **Custom Hooks** can help you write **clean and efficient code**.

**_Take a deep breath and grab a cup of coffee for a long article, so that you won’t feel sleepy 😃._**

## **_Introduction_**

Within our application, we often need to **reuse the same logic** in multiple components. This logic can include applying a certain styling to components, requiring authorization, or adding a global state.

To achieve this, we can use two patterns:

1.  **Higher Order Component (HOC) pattern**

2.  **Render Props pattern**

Both patterns allow us to reuse component logic throughout our application.

Both patterns have their own advantages and disadvantages, and choosing one over the other depends on the specific use case. However, both patterns are powerful tools for creating reusable components in React applications.

## Quick overview of two patterns

For now, let's understand what those two patterns with a very simple code example & later in this article we will see in details of each pattern with complex examples.

### H**igher order component (HOC)**

The **HOC** pattern is a way of reusing component logic by wrapping a component with a higher-order function. This function takes in a component as an argument and returns a new component with additional functionality. The new component can then be used in place of the original component.

So here are some codes for basic understanding HOC.

```javascript
function ParentElement(props) {
  return (
    <View>
      <Text>Hi</Text>
      <View>{props.children}</View>
    </View>
  );
}

function ChildComponentOne() {
  return <Text>Child 1</Text>;
}

function ChildComponentTwo() {
  return <Text>Child 2</Text>;
}

export default function App() {
  return (
    <ParentElement>
      <ChildComponentOne></ChildComponentOne>
      <ChildComponentTwo></ChildComponentTwo>
    </ParentElement>
  );
}
```

In the above code **_ParentElement_** is the HOC component.

### Render Props Pattern

> Pass JSX elements to components through props.

The **Render Props pattern** is another way of reusing component logic. It involves passing a function as a prop to a component. This function returns an element that the component can render. The function can also pass additional data to the element.

So here are some codes for basic understanding.

```javascript
function ParentElement(props) {
  return (
    <View>
      <Text>Hi</Text>
      <View>{props.ChildComponentOne}</View>
      <View>{props.ChildComponentTwo}</View>
    </View>
  );
}

function ChildComponentOne() {
  return <View>Child 1</View>;
}

function ChildComponentTwo() {
  return <View>Child 2</View>;
}

export default function App() {
  return (
    <ParentElement
      ChildComponentOne={ChildComponentOne()}
      ChildComponentTwo={ChildComponentTwo()}
    />
  );
}
```

In the above code props rendering occurred by **_props.ChildComponentOne_** & **_props.ChildComponentTwo._**

### Another way of Props rendering (by children as function)

Besides regular JSX components, we can pass functions as children to React components. This function is available to us through the children prop, which is technically also a render prop.

```javascript
function ParentElement(props) {
  const [stateValue, setStateValue] = useState(“Child”);
  return (
    <View>
      <Text>Parent</Text>
      <View>{props.children(stateValue)}</View>
    </View>
  );
}

function ChildComponentOne(props) {
  return <View>{props.value}</View>;
}

function ChildComponentTwo(props) {
  return <View>{props.value}</View>;
}

export default function App(){
  return (
    <ParentElement>
          {(data) => (
            <>
              <ChildComponentOne value={data}></ChildComponentOne>
              <ChildComponentTwo value={data}></ChildComponentTwo>
            </>
          )}
    </ParentElement>
  )
}
```

In the above code **_props.children(stateValue)_** created props rendering.

### Let’s start with complex & details analysis now 👇

## Higher Order Component

A **Higher Order Component (HOC)** is a component that receives another component. The HOC contains certain logic that we want to apply to the component that we pass as a parameter. After applying that logic, the HOC returns the element with the additional logic.

Say that we always wanted to add a certain styling to multiple components in our application. Instead of creating a style object locally each time, we can simply create a HOC that adds the style objects to the component that we pass to it.

```javascript
function withStyles(Component) {
  return props => {
    const style = {
      padding: '0.2rem',
      margin: '1rem'
    }

    return <Component style={style} {...props} />
  }
}

const MyButton = () = <Button title="Press me!" />
const MyText = () => <Text>Hello World!</Text>

const StyledButton = withStyles(Button)
const StyledText = withStyles(MyText)
```

We just created a **StyledButton** and **StyledText** component, which are the modified versions of the `Button` and `Text` component. They now both contain the style that got added in the withStyles HOC!

Let’s take a look at the same **DogImages** example that was previously used in the Container/Presentational pattern! The application does nothing more than rendering a list of dog images, fetched from an API.

![[hoc-pattern-1 — CodeSandbox](https://codesandbox.io/s/hoc-pattern-1-tzp7i?from-embed)](https://cdn-images-1.medium.com/max/2096/1*DWjvape8JCVuEJE-NP1Flg.png)

Let’s improve the user experience a little bit. When we’re fetching the data, we want to show a "Loading..." screen to the user. Instead of adding data to the **DogImages** component directly, we can use a Higher Order Component that adds this logic for us.

Let’s create a HOC called **withLoader**. A HOC should receive an component, and return that component. In this case, the **withLoader** HOC should receive the element which should display **_Loading…_** until the data is fetched.

Let’s create the bare minimum version of the **withLoader** HOC that we want to use!

```javascript
function withLoader(Element) {
  return (props) => <Element />;
}
```

However, we don’t just want to return the element it received. Instead, we want this element to contain logic that tells us whether the data is still loading or not.

To make the **withLoader** HOC very reusable, we won't hardcode the Dog API url in that component. Instead, we can pass the URL as an argument to the **withLoader** HOC, so this loader can be used on any component that needs a loading indicator while fetching data from a different API endpoint.

```javascript
function withLoader(Element, url) {
  return (props) => {};
}
```

A HOC returns an element, a functional component props => {} in this case, to which we want to add the logic that allows us to display a text with **_Loading…_** as the data is still being fetched. Once the data has been fetched, the component should pass the fetched data as a prop.

```javascript
// 💁‍♂️ 💁‍♂️ 💁‍♂️ DogImages.js

import React from "react";
import withLoader from "./withLoader";

function DogImages(props) {
  return props.data.message.map((dog, index) => (
    <Image source={dog} alt="Dog" key={index} />
  ));
}

export default withLoader(
  DogImages,
  "https://dog.ceo/api/breed/labrador/images/random/6"
);


// 💁‍♂️ 💁‍♂️ 💁‍♂️ withLoader.js

import React, { useEffect, useState } from "react";

export default function withLoader(Element, url) {
  return (props) => {
    const [data, setData] = useState(null);

    useEffect(() => {
      async function getData() {
        const res = await fetch(url);
        const data = await res.json();
        setData(data);
      }

      getData();
    }, []);

    if (!data) {
      return <Text>Loading...</Text>;
    }

    return <Element {...props} data={data} />;
  };
}
```

_You can check the output from here: [hoc-pattern-2 — CodeSandbox](https://codesandbox.io/s/hoc-pattern-2-rslq4?from-embed)_

Perfect! We just created a HOC that can receive any component and URL.

1.  In the **useEffect** hook, the **withLoader** HOC fetches the data from the API endpoint that we pass as the value of url. While the data hasn't returned yet, we return the element containing the Loading... text.

2.  Once the data has been fetched, we set data equal to the data that has been fetched. Since data is no longer null, we can display the element that we passed to the HOC!

So, how can we add this behaviour to our application, so it’ll actually show the **_Loading..._** indicator on the **DogImages** list?

In **DogImages.js**, we no longer want to just export the plain DogImages component. Instead, we want to export the "wrapped" withLoading HOC around the DogImages component.

```javascript
export default withLoading(DogImages);
```

The withLoader HOC also expects the URL to know which endpoint to fetch the data from. In this case, we want to add the Dog API endpoint.

```javascript
export default withLoader(
  DogImages,
  "https://dog.ceo/api/breed/labrador/images/random/6"
);
```

Since the withLoader HOC returned the element with an extra data prop, DogImages in this case, we can access the data prop in the DogImages component.

So, we added a Loading... screen while the data is being fetched in the previous example.

The Higher Order Component pattern allows us to provide the same logic to multiple components, while keeping all the logic in one single place. The withLoader HOC doesn't care about the component or URL it receives as long as it's a valid component and a valid API endpoint, it'll simply pass the data from that API endpoint to the component that we pass.

## Composing (Apply Composing on HOC)

We can also compose multiple Higher Order Components. Let’s say that we also want to add functionality that shows a **Hovering!** text box when the user hovers over the DogImages list.

We need to create a HOC that provides a hovering prop to the element that we pass. Based on that prop, we can conditionally render the text box based on whether the user is hovering over the DogImages list.

```javascript
// 💁‍♂️ 💁‍♂️ 💁‍♂️ DogImages.js
import React from "react";
import withLoader from "./withLoader";
import withHover from "./withHover";

function DogImages(props) {
  return (
    <View {...props}>
      {props.hovering && <View id="hover">Hovering!</View>}
      <View id="list">
        {props.data.message.map((dog, index) => (
          <Image source={dog} alt="Dog" key={index} />
        ))}
      </View>
    </View>
  );
}

export default withHover(
  withLoader(DogImages, "https://dog.ceo/api/breed/labrador/images/random/6")
);

// 💁‍♂️ 💁‍♂️ 💁‍♂️ withHover.js
import React, { useState } from "react";

export default function withHover(Element) {
  return props => {
    const [hovering, setHover] = useState(false);

    return (
      <Element
        {...props}
        hovering={hovering}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      />
    );
  };
}

// 💁‍♂️ 💁‍♂️ 💁‍♂️ withLoader.js
import React, { useEffect, useState } from "react";

export default function withLoader(Element, url) {
  return props => {
    const [data, setData] = useState(null);

    useEffect(() => {
      fetch(url)
        .then(res => res.json())
        .then(data => setData(data));
    }, []);

    if (!data) {
      return <Text>Loading...</Text>;
    }

    return <Element {...props} data={data} />;
  };
}
```

_You can check the output from here: [hoc-pattern-3 — CodeSandbox](https://codesandbox.io/s/hoc-pattern-3-whhh0?from-embed)_

We wrapped the withHover HOC around the withLoader HOC.

The DogImages element now contains all props that we passed from both withHover and withLoader. We can now conditionally render the Hovering! text box, based on whether the value of the hovering prop is true or false.

> A well-known library used for composing HOCs is [recompose](https://github.com/acdlite/recompose). Since HOCs can largely be replaced by React Hooks, the recompose library is no longer maintained, thus won’t be covered in this article.

## Hooks (Replacing HOC)

In some cases, we can replace the **HOC pattern** with **React Hooks**.

Let’s replace the withHover HOC with a useHover hook. Instead of having a higher order component, we export a hook that adds a mouseOver and mouseLeave event listener to the element. We cannot pass the element anymore like we did with the HOC. Instead, we'll return a ref from the hook for that should get the mouseOver and mouseLeave events.

```javascript
// 💁‍♂️ 💁‍♂️ 💁‍♂️ DogImages.js

import React from "react";
import withLoader from "./withLoader";
import useHover from "./useHover";

function DogImages(props) {
  const [hoverRef, hovering] = useHover();

  return (
    <View ref={hoverRef} {...props}>
      {hovering && <View id="hover">Hovering!</View>}
      <View id="list">
        {props.data.message.map((dog, index) => (
          <Image source={dog} alt="Dog" key={index} />
        ))}
      </View>
    </View>
  );
}

export default withLoader(
  DogImages,
  "https://dog.ceo/api/breed/labrador/images/random/6"
);

// 💁‍♂️ 💁‍♂️ 💁‍♂️ useHover.js

import { useState, useRef, useEffect } from "react";

export default function useHover() {
  const [hovering, setHover] = useState(false);
  const ref = useRef(null);

  const handleMouseOver = () => setHover(true);
  const handleMouseOut = () => setHover(false);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener("mouseover", handleMouseOver);
      node.addEventListener("mouseout", handleMouseOut);

      return () => {
        node.removeEventListener("mouseover", handleMouseOver);
        node.removeEventListener("mouseout", handleMouseOut);
      };
    }
  }, [ref.current]);

  return [ref, hovering];
}

// 💁‍♂️ 💁‍♂️ 💁‍♂️ withLoader.js

import React, { useEffect, useState } from "react";

export default function withLoader(Element, url) {
  return props => {
    const [data, setData] = useState(null);

    useEffect(() => {
      fetch(url)
        .then(res => res.json())
        .then(data => setData(data));
    }, []);

    if (!data) {
      return <Text>Loading...</Text>;
    }

    return <Element {...props} data={data} />;
  };
}
```

_You can check the output from here: [hoc-pattern-4 — CodeSandbox](https://codesandbox.io/s/hoc-pattern-4-npo50?from-embed)_

The **useEffect** hook adds an event listener to the component, and sets the value **hovering** to **true** or **false**, depending on whether the user is currently hovering over the element. Both the ref and hovering values need to be returned from the hook: ref to add a ref to the component that should receive the mouseOver and mouseLeave events, and hovering in order to be able to conditionally render the Hovering! text box.

Instead of wrapping the DogImages component with the withHover HOC, we can use the useHover hook right inside the DogImages component.

Instead of wrapping the DogImages component with the withHover component, we can simply use the useHover hook within the component directly.

## HOC or Hooks?

Generally speaking, React Hooks don’t replace the HOC pattern.

**_“In most cases, Hooks will be sufficient and can help reduce nesting in your tree.”_— [React Docs](https://reactjs.org/docs/hooks-faq.html#do-hooks-replace-render-props-and-higher-order-components)**

As the React docs tell us, using Hooks can reduce the depth of the component tree. Using the HOC pattern, it’s easy to end up with a deeply nested component tree.

```javascript
<withAuth>
  <withLayout>
    <withLogging>
      <Component />
    </withLogging>
  </withLayout>
</withAuth>
```

By adding a Hook to the component directly, we no longer have to wrap components.

Using **Higher Order Components** makes it possible to **provide the same logic to many components**, while keeping that logic all in one single place. **Hooks allow** us to **add custom behaviour** from within the component, which could potentially increase the risk of introducing bugs compared to the HOC pattern if multiple components rely on this behaviour.

### **🔥 Best use-cases for a HOC**:

- The same, **un customized** behaviour needs to be used by many components throughout the application.

- The component can work standalone, without the added custom logic.

### **🔥 Best use-cases for Hooks**:

- The behaviour has to be **customized** for each component that uses it.

- The behaviour is not spread throughout the application, only one or a few components use the behaviour.

- The behaviour adds many properties to the component.

## When custom Hooks are better than HOC?

Some libraries that relied on the HOC pattern added Hooks support after the release. A good example of this is [Apollo Client](https://www.apollographql.com/docs/react).

> No experience with Apollo Client is needed to understand this example.

One way to use Apollo Client is through the graphql() higher order component.

```javascript
// 💁‍♂️ 💁‍♂️ 💁‍♂️ InputHOC.js (Apollo by using Higher Order Component)

import React from "react";

import { graphql } from "react-apollo";
import { ADD_MESSAGE } from "./resolvers";

class Input extends React.Component {
  constructor() {
    super();
    this.state = { message: "" };
  }

  handleChange = (e) => {
    this.setState({ message: e.target.value });
  };

  handlePress = () => {
    this.props.mutate({ variables: { message: this.state.message } });
  };

  render() {
    return (
      <View className="input-row">
        <input
          onChange={this.handleChange}
          type="text"
          placeholder="Type something..."
        />
        <Button onPress={this.handlePress} title="Add" />
      </View>
    );
  }
}

export default graphql(ADD_MESSAGE)(Input);

// 💁‍♂️ 💁‍♂️ 💁‍♂️ InputHooks.js (Apollo by using useMutation hook)

import React, { useState } from "react";

import { useMutation } from "@apollo/react-hooks";
import { ADD_MESSAGE } from "./resolvers";

export default function Input() {
  const [message, setMessage] = useState("");
  const [addMessage] = useMutation(ADD_MESSAGE, {
    variables: { message }
  });

  return (
    <View className="input-row">
      <input
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        placeholder="Type something..."
      />
      <Button onPress={addMessage} title="Add" />
    </View>
  );
}
```

_You can check output from here: [apollo-hoc-hooks — CodeSandbox](https://codesandbox.io/s/apollo-hoc-hooks-n3td8?from-embed)_

With the graphql() HOC, we can make data from the client available to components that are wrapped by the higher order component! Although we can still use the graphql() HOC currently, there are some downsides to using it.

When a component needs access to multiple resolvers, we need to compose multiple graphql() higher order components in order to do so. Composing multiple HOCs can make it difficult to understand how the data is passed to your components. The order of the HOCs can matter in some cases, which can easily lead to bugs when refactoring the code.

**After the release of Hooks**, Apollo added Hooks support to the Apollo Client library. **Instead of using the graphql() higher order component, developers can now directly access the data through the hooks that the library provides**.

Let’s look at an example that uses the exact same data as we previously saw in the example with the graphql() higher order component. This time, we'll provide the data to the component by using the useMutation hook that Apollo Client provided for us.

By using the useMutation hook, we reduced the amount of code that was needed in order to provide the data to the component.

Besides a reduction in boilerplate, it’s also much easier to use the data of multiple resolvers in a component. Instead of having to compose multiple higher order components, we can simply write multiple hooks in the component. Knowing how data gets passed to the component is much easier this way, and improves developer experience when refactoring components, or breaking them down into smaller pieces.

## Pros of HOC

Using the **Higher Order Component** pattern allows us to keep logic that we want to **re-use all in one place**. This reduces the risk of accidentally spreading bugs throughout the application by duplicating code over and over, potentially introducing new bugs each time. By keeping the logic all in one place, we can keep our code DRY and easily enforce separation of concerns.

## Cons of HOC

The name of the prop that a HOC can pass to an element, can cause a **naming collision**.

```javascript
function withStyles(Component) {
  return props => {
    const style = {
      padding: '0.2rem',
      margin: '1rem'
    }

    return <Component style={style} {...props} />
  }
}

const MyButton = () = <Button title="Press me!" style={{ color: 'red' }} />
const StyledButton = withStyles(MyButton)
```

In this case, the withStyles HOC adds a prop called style to the element that we pass to it. However, the Button component already had a prop called style, which will be overwritten! Make sure that the HOC can handle accidental name collision, by either renaming the prop or merging the props.

```javascript
function withStyles(Component) {
  return props => {
    const style = {
      padding: '0.2rem',
      margin: '1rem',
      ...props.style
    }

    return <Component style={style} {...props} />
  }
}

const MyButton = () = <Button title="Press me!" style={{ color: 'red' }} />
const StyledButton = withStyles(MyButton)
```

When using multiple composed HOCs that all pass props to the element that’s wrapped within them, it can be difficult to figure out which HOC is responsible for which prop. **This can hinder debugging and scaling an application easily**.

### Now it is time for Render Props Pattern 👇

## Render Props Pattern

In the section of Higher Order Components (above), we saw that being able to **reuse component** logic can be very convenient if multiple components need access to the same data or contain the same logic.

Another way of making components very **reusable**, is by using the **render prop** pattern. A render prop is a **prop on a component**, which value is a function that returns a JSX element. The **component itself does not render** anything besides the render prop. Instead, **the component simply calls the render prop**, instead of implementing its own rendering logic.

Imagine that we have a Title component. In this case, the Title component shouldn't do anything besides rendering the value that we pass. We can use a render prop for this! Let's pass the value that we want the Title component to render to the render prop.

```javascript
<Title render={() => <Text>I am a render prop!</Text>} />
```

Within the Title component, we can render this data by returning the invoked render prop!

```javascript
const Title = (props) => props.render();
```

To the Component element, we have to pass a prop called render, which is a function that returns a React element.

```javascript
// 💁‍♂️ 💁‍♂️ 💁‍♂️ index.js

import React from "react";
import { render } from "react-dom";

const Title = (props) => props.render();

render(
  <View className="App">
    <Title
      render={() => (
        <Text>
          <View role="img" aria-label="emoji">✨</View>
          I am a render prop!
          <View role="img" aria-label="emoji">✨</View>
        </Text>
      )}
    />
  </View>,
  document.getElementById("root")
);
```

Perfect, works smoothly! The **cool thing about render props**, is that **the component that receives the prop is very reusable**. We can use it multiple times, **passing different values** to the render prop each time.

```javascript
// index.js

import React from "react";
import { render } from "react-dom";

const Title = (props) => props.render();

render(
  <View className="App">
    <Title render={() => <Text>✨ First render prop! ✨</Text>} />
    <Title render={() => <Text>🔥 Second render prop! 🔥</Text>} />
    <Title render={() => <Text>🚀 Third render prop! 🚀</Text>} />
  </View>,
  document.getElementById("root")
);
```

Although they’re called **_render_ props**, **a render prop doesn’t have to be called render**.

> **Any prop that renders JSX is considered a render prop!**

Let's rename the render props that were used in the previous example and give them specific names instead!

```javascript
// 💁‍♂️ 💁‍♂️ 💁‍♂️ index.js

import React from "react";
import { render } from "react-dom";

const Title = (props) => (
  <>
    {props.renderFirstComponent()}
    {props.renderSecondComponent()}
    {props.renderThirdComponent()}
  </>
);

render(
  <View className="App">
    <Title
      renderFirstComponent={() => <Text>✨ First render prop! ✨</Text>}
      renderSecondComponent={() => <Text>🔥 Second render prop! 🔥</Text>}
      renderThirdComponent={() => <Text>🚀 Third render prop! 🚀</Text>}
    />
  </View>,
  document.getElementById("root")
);
```

Great! We’ve just seen that we can use **render props in order to make a component reusable**, as we can **pass different data** to the render prop each time. But, why would you want to use this?

A component that takes a render prop usually does a lot more than simply invoking the render prop. Instead, we usually want to pass data from the component that takes the render prop, to the element that we pass as a render prop!

```javascript
function Component(props) {
  const data = { ... }

  return props.render(data)
}
```

The render prop can now receive this value that we passed as its argument.

```javascript
<Component render={data => <ChildComponent data={data} />}
```

### Complex example

Let’s look at an example! We have a simple app, where a user can type a **temperature** in **Celsius**. The app shows the value of this temperature in **Fahrenheit** and **Kelvin**.

```javascript
// App.js

import React, { useState } from "react";

function Input() {
  const [value, setValue] = useState("");

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Temp in °C"
    />
  );
}

export default function App() {
  return (
    <View className="App">
      <Text>☃️ Temperature Converter 🌞</Text>
      <Input />
      <Kelvin />
      <Fahrenheit />
    </View>
  );
}

function Kelvin({ value = 0 }) {
  return <View className="temp">{value + 273.15}K</View>;
}

function Fahrenheit({ value = 0 }) {
  return <View className="temp">{(value * 9) / 5 + 32}°F</View>;
}
```

_You can check the output here: [https://codesandbox.io/s/renderprops-4-wk0uy?from-embed](https://codesandbox.io/s/renderprops-4-wk0uy?from-embed)_

Currently there’s a problem. The **stateful Input component** contains the **value of the user's input**, meaning that the **Fahrenheit** and **Kelvin** component **don't have access to the user's input**!

## Lifting state to Parent Component

One way to make the users input available to both the Fahrenheit and Kelvin component in the above example, **we'd have to lift the state**.

In this case, we have a stateful Input component. However, the sibling components Fahrenheit and Kelvin also need access to this data. Instead of having a stateful Input component, **we can lift the state up to the first common ancestor component that has a connection to Input**, Fahrenheit and Kelvin: the App component in this case!

```javascript
function Input({ value, handleChange }) {
  return;
  <input value={value} onChange={(e) => handleChange(e.target.value)} />;
}

export default function App() {
  const [value, setValue] = useState("");

  return (
    <View className="App">
      <Text>☃️ Temperature Converter 🌞</Text>
      <Input value={value} handleChange={setValue} />
      <Kelvin value={value} />
      <Fahrenheit value={value} />
    </View>
  );
}
```

Although this is a valid solution, it **can be tricky to lift state in larger applications** with components that handle many children. Each state change could cause a re-render of all the children, even the ones that don’t handle the data, **which could negatively affect the performance** of your app.

## Render props comes here to Play

Instead, we can use **render props**! Let’s change the Input component in a way that it can receive render props.

```javascript
function Input(props) {
  const [value, setValue] = useState("");

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Temp in °C"
      />
      {props.render(value)}
    </>
  );
}

export default function App() {
  return (
    <View className="App">
      <Text>☃️ Temperature Converter 🌞</Text>
      <Input
        render={(value) => (
          <>
            <Kelvin value={value} />
            <Fahrenheit value={value} />
          </>
        )}
      />
    </View>
  );
}
```

Perfect, the **Kelvin** and **Fahrenheit** components now have access to the value of the user's input!

```javascript
// 💁‍♂️ 💁‍♂️ 💁‍♂️ App.js

import React, { useState } from "react";

function Input(props) {
  const [value, setValue] = useState("");

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Temp in °C"
      />
      {props.render(value)}
    </>
  );
}

export default function App() {
  return (
    <View className="App">
      <Text>☃️ Temperature Converter 🌞</Text>
      <Input
        render={(value) => (
          <>
            <Kelvin value={value} />
            <Fahrenheit value={value} />
          </>
        )}
      />
    </View>
  );
}

function Kelvin({ value }) {
  return <View className="temp">{parseInt(value || 0) + 273.15}K</View>;
}

function Fahrenheit({ value }) {
  return <View className="temp">{(parseInt(value || 0) * 9) / 5 + 32}°F</View>;
}
```

_You can check output from here: [https://codesandbox.io/s/renderprops-5-couq1?from-embed](https://codesandbox.io/s/renderprops-5-couq1?from-embed)_

## Another way of Render Props Pattern (Children as a function)

**Besides regular JSX components**, we can **pass functions as children** to React components. This function is available to us through the **children** prop, which is technically also a render prop.

Let’s change the **Input** component. Instead of explicitly passing the render prop, we'll just pass a function as a child for the Input component.

```javascript
export default function App() {
  return (
    <View className="App">
      <Text>☃️ Temperature Converter 🌞</Text>
      <Input>
        {(value) => (
          <>
            <Kelvin value={value} />
            <Fahrenheit value={value} />
          </>
        )}
      </Input>
    </View>
  );
}
```

We have access to this function, through the **props.children** prop that's **available on the Input component**. Instead of calling props.render with the value of the user input, we'll call props.children with the value of the user input.

```javascript
function Input(props) {
  const [value, setValue] = useState("");

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Temp in °C"
      />
      {props.children(value)}
    </>
  );
}
```

Great, this way the **Kelvin** and **Fahrenheit** component have access to the value, without having to worry about the name of the renderprop.

```javascript
// 💁‍♂️ 💁‍♂️ 💁‍♂️ App.js

import React, { useState } from "react";

function Input(props) {
  const [value, setValue] = useState(0);

  return (
    <>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Temp in °C"
      />
      {props.children(value)}
    </>
  );
}

export default function App() {
  return (
    <View className="App">
      <Text>☃️ Temperature Converter 🌞</Text>
      <Input>
        {(value) => (
          <>
            <Kelvin value={value} />
            <Fahrenheit value={value} />
          </>
        )}
      </Input>
    </View>
  );
}

function Kelvin({ value }) {
  return <View className="temp">{parseInt(value || 0) + 273.15}K</View>;
}

function Fahrenheit({ value }) {
  return <View className="temp">{(parseInt(value || 0) * 9) / 5 + 32}°F</View>;
}
```

_You can check output from here: [https://codesandbox.io/s/renderprops-6-e23m4?from-embed](https://codesandbox.io/s/renderprops-6-e23m4?from-embed)_

## Custom Hooks replace Render props pattern

In some cases, **we can replace render props with Hooks**. A good example of this is Apollo Client.

> No experience with Apollo Client is needed to understand this example.

One way to use **Apollo Client** is through the **Mutation** and **Query** components. Let's look at the same Input example that was covered in the Higher Order Components section. Instead of using the graphql() higher order component, we'll now use the **Mutation** component that receives a render prop.

```javascript
// 💁‍♂️ 💁‍♂️ 💁‍♂️ InputRenderProp.js

import React from "react";

import { Mutation } from "react-apollo";
import { ADD_MESSAGE } from "./resolvers";

export default class Input extends React.Component {
  constructor() {
    super();
    this.state = { message: "" };
  }

  handleChange = (e) => {
    this.setState({ message: e.target.value });
  };

  render() {
    return (
      <Mutation
        mutation={ADD_MESSAGE}
        variables={{ message: this.state.message }}
        onCompleted={() =>
          console.log(`Added with render prop: ${this.state.message} `)
        }
      >
        {(addMessage) => (
          <View className="input-row">
            <input
              onChange={this.handleChange}
              type="text"
              placeholder="Type something..."
            />
            <Button title="Add" onPress={addMessage} />
          </View>
        )}
      </Mutation>
    );
  }
}
```

_You can check output from here: [https://codesandbox.io/s/renderprops-7-jfdxg?from-embed](https://codesandbox.io/s/renderprops-7-jfdxg?from-embed)_

In order to **pass data down** from the **Mutation** component **to the elements that need the data**, we **pass a function as a child**. The function receives the value of the data through its arguments.

```javascript
<Mutation mutation={...} variables={...}>
  {addMessage => <View className="input-row">...</View>}
</Mutation>
```

Although we can still use the **render prop pattern** and is often preferred compared to the higher order component pattern, it has its downsides.

One of the **downsides** is **deep component nesting**. We can nest multiple **Mutation** or **Query** **components**, if a component needs access to multiple mutations or queries.

```javascript
<Mutation mutation={FIRST_MUTATION}>
  {(firstMutation) => (
    <Mutation mutation={SECOND_MUTATION}>
      {(secondMutation) => (
        <Mutation mutation={THIRD_MUTATION}>
          {(thirdMutation) => (
            <Element
              firstMutation={firstMutation}
              secondMutation={secondMutation}
              thirdMutation={thirdMutation}
            />
          )}
        </Mutation>
      )}
    </Mutation>
  )}
</Mutation>
```

**After the release of Hooks**, Apollo added Hooks support to the Apollo Client library. Instead of using the **Mutation** and **Query** **render props**, developers can now directly access the data through the hooks that the library provides.

Let’s look at an example that uses the exact same data as we previously saw in the example with the Query render prop. This time, we'll provide the data to the component **by using the useQuery hook** that Apollo Client provided for us.

```javascript
// 💁‍♂️ 💁‍♂️ 💁‍♂️ InputHOC.js

import React from "react";

import { graphql } from "react-apollo";
import { ADD_MESSAGE } from "./resolvers";

class Input extends React.Component {
  constructor() {
    super();
    this.state = { message: "" };
  }

  handleChange = (e) => {
    this.setState({ message: e.target.value });
  };

  handlePress = () => {
    this.props.mutate({ variables: { message: this.state.message } });
  };

  render() {
    return (
      <View className="input-row">
        <input
          onChange={this.handleChange}
          type="text"
          placeholder="Type something..."
        />
        <Button title="Add" onPress={this.handlePress} />
      </View>
    );
  }
}

export default graphql(ADD_MESSAGE)(Input);


// 💁‍♂️ 💁‍♂️ 💁‍♂️ InputHooks.js

import React, { useState } from "react";

import { useMutation } from "@apollo/react-hooks";
import { ADD_MESSAGE } from "./resolvers";

export default function Input() {
  const [message, setMessage] = useState("");
  const [addMessage] = useMutation(ADD_MESSAGE, {
    variables: { message }
  });

  return (
    <View className="input-row">
      <input
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        placeholder="Type something..."
      />
      <Button title="Add" onPress={addMessage} />
    </View>
  );
}
```

By using the **useQuery hook**, we reduced the amount of code that was needed in order to provide the data to the component.

## Pros of Render Props Pattern

Sharing logic and data among several components is easy with the **render props pattern**. Components can be made very reusable, by using a render or children prop. Although the Higher Order Component pattern mainly solves the same issues, namely **reusability** and **sharing data**, the **render props pattern solves some of the issues we could encounter by using the HOC pattern**.

The issue of **naming collisions** that we can run into by using the HOC pattern no longer applies by using the render props pattern, since we don’t automatically merge props. **We explicitly pass the props down to the child components**, with the value provided by the parent component.

**Since we explicitly pass props, we solve the HOC’s implicit props issue**. The props that should get passed down to the element, are all visible in the render prop’s arguments list. This way, we know exactly where certain props come from.

**We can separate our app’s logic from rendering components through render props**. The stateful component that receives a render prop can pass the data onto stateless components, which merely render the data.

## Cons of Render props Pattern

**The issues that we tried to solve with render props, have largely been replaced by React Hooks**. As Hooks changed the way we can add **_reusability_** and **_data sharing to components_**, they can replace the render props pattern in many cases.

Since **we can’t add lifecycle methods to a render prop**, we can only use it on **components that don't need to alter the data they receive**.

### [🙏 If you find it helpful, please give a STAR (click here) ️⭐️ ⭐️](https://github.com/anisurrahman072/React-Native-Advanced-Guide)

Thank you for reading this article. I enjoy sharing my **5 years** of experience in **React-native**, **JavaScript**, **React** & **Node.js** with you every day. If you enjoyed reading this article, I would appreciate it if you could follow me on [**Twitter**](https://twitter.com/anis_RNCore) & [**Medium**](https://medium.com/@anisurrahmanbup).

If you find any **ISSUE** in this Guide BOOK, please create a **PR** to help the community 🔥
