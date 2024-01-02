# React Native — Anti pattern while calling Component (ERROR, Solution & analysis)

### Use React way instead of Functional way of calling a Component.

![Anti pattern — Component call](https://cdn-images-1.medium.com/max/5760/1*GkNTI-i2UuOPL918t_eENw.png)

Basically, there are two ways of **calling a Component** inside your JSX code. They are:

1.  **Functional way** &

2.  **React way**.

Suppose you have a component named as **_“SoccerCard”_**. You can reuse this **_“SoccerCard”_** component in different screens in your React Native App.

Let’s see the **_“SoccerCard”_** component looks like below:

![***“SoccerCard”*** component](https://cdn-images-1.medium.com/max/2356/1*oOqFxVX8OI6zNm7RR1TvuQ.png)

Now, there is a screen **_Home.js_** from where you will access that **_“SoccerCard”_** component.

### Functional Way

Now we will use **functional way** of calling a React Component **SoccerCard**from **_Home.js_** screen.

![Home.js screen JSX code](https://cdn-images-1.medium.com/max/2140/1*UjooZcJLG4JPBK8c1p2xuw.png)

### React way

Now we will use **React way** of calling a React Component **_“SoccerCard”_** from **_Home.js_** screen.

![***Home.js screen JSX code***](https://cdn-images-1.medium.com/max/2444/1*60dWF0K_E0ZB1-SGXHmuVQ.png)

## Functional or React way?

So now it is very important to know, which one should we use? Each one has its own pros and cons.

Let me explain the difference between the two ways **Functional** & **React way**.

### Functional Way

The first way is to call the **_“SoccerCard”_** component as a **function** and pass the data as an argument.

This way is **simple** and **straightforward**, but it has some **drawbacks**:

- It does not follow the **JSX syntax**, which is the recommended way to use React components. JSX allows you to write HTML-like code in JavaScript and makes it **easier to read** and **understand**.

- It does not take advantage of **React props** system, which is a way to **pass data from a parent component to a child component**. Props are like attributes that you can use to customize your components and make them reusable.

- It does **not allow you to use React hooks** inside **_“SoccerCard”_** component, which are a way to add state and lifecycle methods to functional components. Hooks let you use more of React’s features without classes.

### React Way

The second way is to use the **_“SoccerCard”_** component as a **JSX element** and pass the data as a prop.

This way is **more consistent** with the **React best practices** and has some benefits:

- It follows the **JSX syntax**, which makes your code look **cleaner** and **more expressive**.

- It **uses props** to pass data from a parent component to a child component. Props are a powerful way to communicate between components and make them more **flexible** and **modular**.

- It allows you to use **React hooks** inside the **_“SoccerCard”_** component, which gives you access to **state** and **lifecycle methods**. Hooks let you add more functionality and logic to your components.

> ❝ Now you can decide which one you should use. ❞

Still confused? Let’s understand why you must have to use **React Way** instead of **Functional way**.

## Functional way creates silent ERROR! 🙇‍♂️

Let’s once again see the code of **functional way** of calling a component **_“SoccerCard”_** from your **_“Home.js”_** screen.

![***Functional way of calling a Component***](https://cdn-images-1.medium.com/max/2140/1*UjooZcJLG4JPBK8c1p2xuw.png)

When you will run your App & load screen **_“Home.js”_** using the above functional way of calling component **_“SoccerCard”,_** you will see a silent **ERROR** like below in your **metro**:

![Unnecessary hook created by Functional Way](https://cdn-images-1.medium.com/max/3264/1*xnq5qXzijZ2JJtjCJoRKcQ.png)

## Analysis the ERROR

So, why the ERROR occurred?

Answer: ERROR occurred as **functional way** of calling a component **always creates a custom hook**. Which means React understand that you created a custom hook **_“SoccerCard”_** & now you are calling that hook.

Ok, I got it that React understood that I created **Custom hook _“SoccerCard”_** & then called the Custom hook! But why that error like **“React has detected a change in the order of Hooks called by Home”** printed in metro!

This is because I called the custom Hook **_“SoccerCard”_** from JSX code & it violates the **rule of Hooks** of React.

## Breaking Rules of Hooks

Functions whose names start with **use** are called [Hooks](https://react.dev/reference/react) in React.

**Don’t call Hooks inside loops, conditions, or nested functions.** Instead, always use Hooks at the **_top level_** of your React function, before any early returns. You can only call Hooks while React is rendering a function component:

- ✅ Call them at the top level in the body of a [function component](https://react.dev/learn/your-first-component).

- ✅ Call them at the top level in the body of a [custom Hook](https://react.dev/learn/reusing-logic-with-custom-hooks).

![Rules of React Hooks](https://cdn-images-1.medium.com/max/2452/1*WJsMZpJMNMnyAnHP3tiF7Q.png)

It’s **not** supported to call Hooks (functions starting with use) in any other cases, for example:

- 🔴 Do not call Hooks inside conditions or loops.

- 🔴 Do not call Hooks after a conditional return statement.

- 🔴 Do not call Hooks in event handlers.

- 🔴 Do not call Hooks in class components.

- 🔴 Do not call Hooks inside functions passed to useMemo, useReducer, or useEffect.

## Solution

The solution is just always following the **best practices** given by React & React Native team. For this one use **React way** instead of **Functional way**:

![**React way** of calling a component](https://cdn-images-1.medium.com/max/2444/1*60dWF0K_E0ZB1-SGXHmuVQ.png)

## What Next? 💁‍♂️

As you understood that when you are writing your **React** or **React Native** code, you must be aware of **React best practices** about Component. So, you must have to gain knowledge about these:

- [Higher order Component (HOC)](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Components-and-Hooks/HOC-Props-and-Custom-Hooks.md)

- [Render Props pattern](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Components-and-Hooks/HOC-Props-and-Custom-Hooks.md)

- [Custom hooks (Replaced HOC & Render Props pattern)](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Components-and-Hooks/HOC-Props-and-Custom-Hooks.md)

- [Composition of HOC](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Components-and-Hooks/HOC-Props-and-Custom-Hooks.md)

**You will find in details analysis with case study example in this article about all the above:** [React — Higher Order Component, Render props & Custom Hooks (Details analysis)](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Components-and-Hooks/HOC-Props-and-Custom-Hooks.md)

### [🙏 If you find it helpful, please give a STAR (click here) ️⭐️ ⭐️](https://github.com/anisurrahman072/React-Native-Advanced-Guide)

Thank you for reading this article. I enjoy sharing my **5 years** of experience in **React-native**, **JavaScript**, **React** & **Node.js** with you every day. If you enjoyed reading this article, I would appreciate it if you could follow me on [**Twitter**](https://twitter.com/anis_RNCore) & [**Medium**](https://medium.com/@anisurrahmanbup).

If you find any **ISSUE** in this Guide BOOK, please create a **PR** to help the community 🔥
