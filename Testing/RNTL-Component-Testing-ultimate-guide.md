# React Native — UI Testing (Ultimate Guide)

### A comprehensive guide to React Native Component Testing by RNTL

![](/images/rntl/image.png)

Over the course of a month, I meticulously crafted this comprehensive guide on testing for **React Native** applications. Each code snippet included in this article was initially **_executed successfully_** on my MacBook, ensuring their reliability.

### it’s endorsed by the [Official Documentation of REACT NATIVE TESTING LIBRARY](https://callstack.github.io/react-native-testing-library/docs/community-resources#recommended-content), so you know it’s reliable and up-to-date.

This article serves as an all-encompassing resource on **TESTING**, covering a wide array of topics such as **component testing**, **mocking**, **provider** tests, **fireEvent**, and **waitFor** asynchronous operations, among others. It is designed to equip you with a thorough understanding of testing a **React Native app**, from getting started and setting up configurations, to troubleshooting potential errors.

Let’s look at the topics that we will learn from this article.

1.  [Types of React Native Testing](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Testing/RNTL-Component-Testing-ultimate-guide.md#types-of-react-native-testing)

2.  [Types of JavaScript Testing](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Testing/RNTL-Component-Testing-ultimate-guide.md#types-of-javascript-testing)

3.  [Tools for React Native Testing](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Testing/RNTL-Component-Testing-ultimate-guide.md#tools-for-react-native-testing)

4.  [Some Testing Libraries (Confusing names)](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Testing/RNTL-Component-Testing-ultimate-guide.md#some-testing-libraries-confusing-names)

5.  [When to apply Component Testing ?](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Testing/RNTL-Component-Testing-ultimate-guide.md#when-to-apply-component-testing-)

6.  [React Native Testing Library (RNTL)](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Testing/RNTL-Component-Testing-ultimate-guide.md#react-native-testing-library-rntl)

7.  [Setup JEST config (for RNTL)](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Testing/RNTL-Component-Testing-ultimate-guide.md#setup-jest-config-for-rntl)

8.  [Common Error in JEST config — ES6/Ts/cjs/mts](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Testing/RNTL-Component-Testing-ultimate-guide.md#common-error-in-jest-config--es6tscjsmts)

9.  [Command to run a test file](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Testing/RNTL-Component-Testing-ultimate-guide.md#command-to-run-test-file)

10. [React Native Testing Library (RNTL) APIs](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Testing/RNTL-Component-Testing-ultimate-guide.md#react-native-testing-library-rntl-apis)

11. [🪵 RNTL API — render()](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Testing/RNTL-Component-Testing-ultimate-guide.md#-rntl-api--render)

12. [🐠 TEST Component with Provider — by render() API](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Testing/RNTL-Component-Testing-ultimate-guide.md#-test-component-with-provider--by-render-api)

13. [🐠 “queries” option — render() API](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Testing/RNTL-Component-Testing-ultimate-guide.md#-queries-option--render-api)

14. [🐠 “update" option — render() API](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Testing/RNTL-Component-Testing-ultimate-guide.md#-update-option--render-api)

15. [🐠 “debug" option — render() API](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Testing/RNTL-Component-Testing-ultimate-guide.md#-debug-option--render-api)

16. [🪵 RNTL API — userEvent()](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Testing/RNTL-Component-Testing-ultimate-guide.md#-rntl-api--userevent)

17. [🐠 Example of FireEvent() API](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Testing/RNTL-Component-Testing-ultimate-guide.md#-example-of-fireevent-api)

18. [🪵 RNTL API — waitFor()](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Testing/RNTL-Component-Testing-ultimate-guide.md#-rntl-api--waitfor)

19. [What is Mocking ?](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Testing/RNTL-Component-Testing-ultimate-guide.md#what-is-mocking-)

20. [🍁 Difference between jest.fn() & jest.mock()](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Testing/RNTL-Component-Testing-ultimate-guide.md#-difference-between-jestfn--jestmock)

21. [🍁 How to Mock a Real Function (by jest.fn()) ?](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Testing/RNTL-Component-Testing-ultimate-guide.md#-how-to-mock-a-real-function-by-jestfn-)

22. [🍁 How to Mock a Native Module (by jest.mock())?](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Testing/RNTL-Component-Testing-ultimate-guide.md#-how-to-mock-a-native-module-by-jestmock)

23. [🍁 Another example of Native Module Mocking ( jest.mock() )](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Testing/RNTL-Component-Testing-ultimate-guide.md#-another-example-of-native-module-mocking--jestmock--)

24. [Some Advanced Share about RNTL](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Testing/RNTL-Component-Testing-ultimate-guide.md#some-advanced-share-about-rntl)

25. [Differentiating between host and composite elements](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Testing/RNTL-Component-Testing-ultimate-guide.md#differentiating-between-host-and-composite-elements)

26. [🚀 Intro to E2E Testing](https://github.com/anisurrahman072/React-Native-Advanced-Guide/blob/master/Testing/RNTL-Component-Testing-ultimate-guide.md#-intro-to-e2e-testing)

# Let’s get started with RN — TESTING 🚀

## Introduction to Testing in React Native

In React Native, testing is important to prevent fragile programming and ensure that your code continues to work in the future. You can use different automated ways to ensure your app works as expected, ranging from static analysis to end-to-end tests. Writing testable code is intertwined with writing clean, modular code.

## Types of React Native Testing

For practical reasons, we can distinguish **React Native testing** into these **two** parts:

1.  **JavaScript Testing —** We mainly use the **Jest** framework to test our JavaScript code. When we work with React Native, we can group our tests into **unit** and **integration** tests. However, these two groups are not very different, so we **do not need to separate them for practical purposes**. We can just remember them so that we can comprehend them clearly. In the next section, we will see how many types of testing **_JavaScript Testing_** includes.

2.  **End-to-End app Testing —** It typically verifies the entire application from start to end to **ensure the user flows work correctly**, this can include testing a user can sign up, login, perform activities, navigate to different pages and log out from an application. These tests give the most confidence because they’re pretty much a **robot** running your app on a device. We perform **E2E tests** using **Detox**, **Appium**, or any other mobile testing framework that we know.

**NOTE:** Because most of your business code lives in JS, it makes sense to focus your efforts there.

Below, we see how the **testing flow (pyramid)** works (Created by CallStack Team). Testing starts with **Static Analysis** & ends with **End-to-End** test.

![**Testing Flow To Maintain **(Starts with **Static Analysis** & ends with **E2E test**)](/images/rntl/image-2.png)

**_NOTE:_** _The main focus of this article is to dive you into the second part of Pyramid (**JavaScript Testing**)._

## Types of JavaScript Testing

We can split **JavaScript Testing** into these parts so that we can understand each step easily.

1.  **Unit testing**: It typically focuses on verifying the functions works correctly, such as providing inputs to a function and checking its output against expected results.

2.  **Component testing**: It focuses on verifying an individual component renders correctly and behaves as expected based on the provided inputs to it.

3.  **Integration testing**: It tests how multiple components interact with each other, generally involves rendering multiple components and requires external dependencies, services or APIs. It is required to **mock** these for tests.

4.  **Snapshot testing**: It captures a snapshot of the rendered output of a component and compares it to previous saved snapshot to detect visual changes. It should be used with in combination with **unit** and **component** testing to ensure comprehensive coverage of an application.

## Tools for React Native Testing

- **Static Analysis:** Flow, eslint

- **JavaScript Test:** Jest, Mocha, ava

- **Component Testing:** React Native Testing Library by CallStack

- **Webdriver Test (End to end test):** Detox, Appium

## Some Testing Libraries (Confusing names)

I’m giving you some testing libraries and their creators or users. You may already be confused by the almost identical names of different libraries in the JS testing world.

- **react-testing-library:** It is used for React web [react-testing-library](https://github.com/testing-library/react-testing-library) _which was created by_ **Kent C. Dodds**.

- **react-test-renderer:** Created by meta & they use it for testing [https://www.npmjs.com/package/react-test-renderer](https://www.npmjs.com/package/react-test-renderer). Also, **_react-native-testing-library (RNTL)_** has **peerDependencies** listing for it.

- **react-native-testing-library(RNTL):** Created by **CallStack** on top of **_react-test-renderer_** & they use it for testing React Native Components [https://github.com/callstack/react-native-testing-library](https://github.com/callstack/react-native-testing-library).

- **jest-native:** It is used with **_JEST_** & **_react-native-testing-library_.** Use it for additional JEST matchers [https://github.com/testing-library/jest-native](https://github.com/testing-library/jest-native).

## When to apply Component Testing ?

React Native **Component Testing** is a way of verifying the behavior and appearance of your React Native components in isolation from their dependencies. It can help you ensure that your components work as expected, follow the best practices, and are easy to maintain.

Some scenarios are below where React Native **Component Testing can play a vital role**.

- When you want to test the **rendering** and **interaction** of your components **without mocking the native modules** or **using a device emulator**.

- When you want to test your components across **different platforms** and **configurations**. For example, you can use Jest’s **platform-specific extensions to run different tests for iOS and Android**, or use its configuration options to set up different environments or presets for your tests.

- When you want to **test your components with different data and props**. For example, you can use **Jest’s data-driven testing feature** to run the same test with different inputs, or **use its mock functions**to simulate the props that your component receives from its parent.

- When you want to **test your components with different users and roles**. For example, you can use Jest’s context feature to provide different values for global variables or constants that affect your component’s behavior, or use its **_spy functions to monitor_** how your component interacts with other modules or functions.

- When you want to **test your components with different themes and styles**. For example, you can use Jest’s **setupFiles** option in **JEST config** to import a global style sheet or a theme provider for your tests, or use its expect.extend feature to create **custom matchers** for testing the appearance of your component.

> Let’s get started with JS (Component) Testing 👇

## React Native Testing Library (RNTL)

The React Native Testing Library (RNTL) is a lightweight solution for testing React Native components created by **CallStack**. It provides light utility functions on top of react-test-renderer, in a way that encourages better testing practices. Its primary guiding principle is:

**NOTE:** The more your tests resemble the way your software is used, the more confidence they can give you.

### Install RNTL

As from React native version 0.38, the project will have a default **Jest** setup with **react-test-renderer** included when you create the react-native project. Just make sure that your **react-test-renderer** version matches exactly your **react** version in **package.json** file.

To install **RNTL**, open a terminal in your project’s folder and run this below command.

```bash
    yarn add - dev @testing-library/react-native
```

In order to use additional React Native-specific **Jest matchers** from @testing-library/jest-native package add it to your project by this below command.

```bash
    yarn add - dev @testing-library/jest-native
```

Then add this additional **Jest matcher** to your jest tests by using setupFilesAfterEnv option in your Jest configuration. Jest configuration is usually located either in package.json under **"jest"** key like below or in a **jest.config.js** file in your project root directory.

```json
{
  "preset": "react-native",
  "setupFilesAfterEnv": ["@testing-library/jest-native/extend-expect"]
}
```

The **package.json** looks like below with additional **Jest matcher** config.

![**package.json** (only last part given here)](/images/rntl/image-1.png)

## Setup JEST config (for RNTL)

We learned how to add **JEST** configuration for **React Native Testing Library (RNTL)** in either the **_package.json_** file or the **_jest.config.js_** file. Now let’s look at all the important options of JEST that we can set optionally along with **_preset_** or **_setupFilesAfterEnv_** in JEST configuration.

### **🧩 “preset”**

jest-expo preset is used for testing React Native projects created using Expo, otherwise it would be react-native. Example like below:

```json
    "preset": "react-native"
```

### **🧩** **“setupFiles”**

This option is used to specify a module that should be executed **_before any tests_** run, such as **_setting up the test data_** or **_mocking_** external **_components_**, **_Native Modules_**, **_dependencies_**, **_services_** or **_APIs_**. Example like below:

```json
    "setupFiles": [
         "./src/mock/api",
         "./src/mock/services",
      ]
```

### **🧩** **“setupFilesAfterEnv”**

This option is used to set up additional testing libraries such as @testing-library/jest-native. Example like below:

```json
    "setupFilesAfterEnv": ["@testing-library/jest-native/extend-expect"]
```

### **🧩** “moduleFileExtensions”

This option is used to specify the file extensions that should be looked for when running tests. For example, if you have test files with the extensions **“.ts”, “.tsx”, “.js”, “.jsx”, “.json”**, and **“.node”**, you can specify them in the “moduleFileExtensions” option like this:

```json
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
    ]
```

This option is useful for React Native projects that use **TypeScript** or other languages that **need to be transpiled before running**. It also helps Jest to recognize different file types and handle them accordingly. For example, Jest will use **_“ts-jest”_** to transform TypeScript **files** and **_“jest-environment-jsdom”_** to provide a browser-like environment for testing.

### **🧩** **“moduleNameMapper”**

The option _“moduleNameMapper”_ is used to tell Jest **how to find the files that you import in your code**. Sometimes, you may use shortcuts or aliases to import files, for example, instead of writing:

```javascript
import { Button } from "../../components/Button";
```

You may write:

```javascript
import { Button } from "components/Button";
```

This makes your code shorter and cleaner, but Jest may not know where to find the file **“components/Button”**. To fix this, you can use the option **“moduleNameMapper”** to map the **shortcut** or **alias** to the **actual file path**. For example, you can write:

```json
    "moduleNameMapper": {
      "^components/ (.*)$": "<rootDir>/src/components/$1"
    }
```

This means that **Jest will replace any import** that **starts with “components/”** with **“<rootDir>/src/components/”**. For example, **_“components/Button”_** will become **_“<rootDir>/src/components/Button”_**. You can use any regular expression to match the shortcut or alias, and use **“$1”**, **“$2”**, etc. to refer to the captured groups. You can also map different shortcuts or aliases to **different file paths** by using more lines.

### **🧩** **“transformIgnorePatterns”**

The option **_“transformIgnorePatterns”_** is used to tell Jest which files it should not change before testing them. Sometimes, Jest needs to change some files, for example, if they use a different language or syntax than JavaScript. **By default, Jest will not change any files in the “node_modules” directory**, because they are usually already written in JavaScript. But sometimes, you may need to change some of them, for example, if they use **TypeScript** or **ES6 syntax**. To do that, you can use a special code to match the files that you want to change, and use a **“!”** sign to exclude the ones that you don’t. For example:

```json
    "transformIgnorePatterns": [
      "/node_modules/ (?! (react-native|react-native-cookies)/)"
    ]
```

This means that **Jest will change** **any file in the “node_modules”** directory that **does not start** with **“react-native”** or **“react-native-cookies”**. You can add more exceptions by using the **“|”** sign. You can also use other codes to match different parts of the file name, such as the file type or the folder name.

### **🧩** “transform”

Jest will **not actually change the original files** in the “node_modules” directory. It will only **change them temporarily in memory** when it runs the tests. This is called **“transformation”** and it is done by using some tools called **“transformers”**. Jest has some built-in transformers that can handle common file types, such as JavaScript, TypeScript, JSON, etc. You can also use **custom transformers** that you install from npm or write yourself. You can specify which transformer to use for each file type by using the option **“transform”** in your **Jest config** file. For example:

```json
    "transform": {
      "\\.[jt]sx?$": "babel-jest",
      "\\.ts$": "ts-jest"
    }
```

This means that **Jest will use “babel-jest”** to transform any file that **ends with “.js”, “.jsx”, “.ts” or “.tsx”**, and **use “ts-jest” to transform any file that ends with “.ts”**. You can use any regular expression to match the file type. You can also use different transformers for different files or directories by using an array of arrays.

### **🧩** "testEnvironment"

This option allows you to specify the test environment that will be used for testing. By default, Jest uses **_jsdom_**, which simulates a browser-like environment. However, for React Native projects, you may want to use **_node_** instead, which is **faster** and **more lightweight**. For example:

```json
    "testEnvironment": "node"
```

This way, **Jest** will run your tests in a **Node.js** environment, which is more suitable for testing React Native components. You can also create your own custom test environment.

### **🧩** "testMatch"

The **_“testMatch”_** option is used to specify **which files should be considered** as **test files by Jest**. It is an array of glob patterns that match the file paths of your test files. For example, if you have a folder called **“tests”** in your project root, and you want to run all the files inside it that end with **“.test.js”** or **“.spec.js”**, you can use this option:

```json
    "testMatch": [
        "<rootDir>/__tests__/*.js",
        "<rootDir>/src/**/*.(test|spec).js"
    ]
```

The `<rootDir>` is a special token that Jest replaces with the path to the project root. The `**` means any subdirectories, and the `*` means any file name. The (test|spec) means either **“test”** or **“spec”**, and the .js means the file extension. You can use other glob patterns to match different file names or extensions, such as .jsx, .ts, or .tsx.

You can also have **multiple patterns in the array**, and Jest will run any file that matches at least one of them. For example, if you have some test files in a folder called **“tests”** and some other test files in your **“src”** folder, you can use this option:

```json
    "testMatch": ["<rootDir>/tests/**/*.(test|spec).js"]
```

This will run all the files in the “tests” folder or its subfolders that end with **“.test.js”** or **“.spec.js”**.

### **🧩** "coverageThreshold"

The _“coverageThreshold”_ option is used to specify the **minimum percentage of code coverage** that your **tests must achieve**. Code coverage is a measure of how much of your code is executed by your tests. It can be calculated for different aspects of your code, such as **statements**, **branches**, **functions**, and **lines**.

The **“coverageThreshold”** option is an object that has a **“global”** property and optionally a **“per-file”** property. The “global” property is another object that has four properties: **“statements”, “branches”, “functions”, and “lines”**. Each of these properties is a number between 0 and 100 that represents the percentage of code coverage required for that aspect. For example, if you want to enforce that your tests cover at least **80%** of your statements, **70%** of your branches, **90%** of your functions, and **85%** of your lines, you can use this option:

```json
    "coverageThreshold": {
          "global": {
            "statements": 80,
            "branches": 70,
            "functions": 90,
            "lines": 85
        }
    }
```

The **_“per-file”_** property is an array of objects that have a **_“path”_** property and a **_“threshold”_** property. The **“path”** property is a glob pattern that matches the file paths of your code files. The **“threshold”** property is an object that has the same four properties as the “global” object. This way, **you can specify different coverage thresholds for different files** or **groups of files**. For example, if you want to enforce that your tests cover at least **95%** of your **_components_** and **_hooks_**, and at least **75%** of everything else, you can use this option:

```json
    "coverageThreshold": {
          "global": {
            "statements": 75,
            "branches": 75,
            "functions": 75,
            "lines": 75
          },
          "per-file": [
            {
              "path": "**/src/components/*.tsx",
              "threshold": {
                "statements": 95,
                "branches": 95,
                "functions": 95,
                "lines": 95
              }
            },
            {
              "path": "**/src/hooks/*.tsx",
              "threshold": {
                "statements": 95,
                "branches": 95,
                "functions": 95,
                "lines": 95
              }
            }
        ]
    }
```

If you use the **_“coverageThreshold”_** option, **Jest** will fail the test run if the actual code coverage is lower than the specified thresholds. This can help you ensure that your tests are comprehensive and reliable.

> Let’s understand each **Code Coverage** terms **“statements”**, **“branches”**, **“functions”**, **“lines”** with examples below.

**🍭 Statements:** A statement is a single instruction or command in your code, such as a variable declaration, an assignment, a function call, a loop, a conditional, etc. For example, in this code snippet:

```javascript
let x = 10; // statement 1
let y = 20; // statement 2
if (x > y) {
  // statement 3
  console.log("x is greater"); // statement 4
} else {
  console.log("y is greater"); // statement 5
}
```

There are five statements in total. The statement coverage is the percentage of statements that are executed by your tests. For example, if your tests only run the “else” branch of the conditional, then the **statement coverage is 60%** (3 out of 5 statements are executed).

**🍭 Branches:** A branch is a possible path of execution in your code, such as an “if” or “else” block, a “case” or “default” block in a switch statement, a ternary operator, etc. For example, in this code snippet:

```javascript
let x = 10;
let y = 20;
if (x > y) {
  // branch 1
  console.log("x is greater");
} else {
  // branch 2
  console.log("y is greater");
}
```

There are **two branches** in total. The branch coverage is the percentage of branches that are executed by your tests. For example, if your tests only run the “else” branch of the conditional, then the branch coverage is 50% (1 out of 2 branches are executed).

**🍭 Functions:** A function is a block of code that performs a specific task and can be invoked by other parts of your code. For example, in this code snippet:

```javascript
function add(a, b) {
  // function 1
  return a + b;
}

function subtract(a, b) {
  // function 2
  return a - b;
}

let x = add(10, 20); // statement 3
let y = subtract(30, 15);
```

There are two functions in total. The function coverage is the percentage of functions that are invoked by your tests. For example, if your tests only call the “add” function, then the **function coverage is 50%** (1 out of 2 functions are invoked).

**🍭 Lines:** A line is a single line of code in your source file. For example, in this code snippet:

```javascript
let x = 10; // line 1
let y = 20; // line 2
if (x > y) {
  // line 3
  console.log("x is greater"); // line 4
} else {
  console.log("y is greater"); // line 5
}
```

There are five lines in total. The line coverage is the percentage of lines that are executed by your tests. For example, if your tests only run the “else” branch of the conditional, then the line **coverage is 80%** (4 out of 5 lines are executed).

### 🧩 "watchPlugins"

The watchPlugins option is a way to customize how Jest runs your tests in watch mode. Watch mode is a feature that lets you run only the tests that are related to the files you have changed in your code. This can save you time and make your testing process more efficient.

To use the watchPlugins option, you need to install a plugin that provides some extra functionality for your tests. For example, you can use **_jest-watch-typeahead_**, which is a plugin that lets you filter your tests by file name or test name. This can help you find and run the tests you want more easily.

To use **_jest-watch-typeahead_**, you need to do the following steps:

- Install jest-watch-typeahead as a dev dependency: **_yarn add --dev jest-watch-typeahead_**

- Add the plugin to your Jest config in package.json like below:

  "watchPlugins": [
  "jest-watch-typeahead/filename",
  "jest-watch-typeahead/testname"
  ]

This will enable you to use the jest-watch-typeahead plugin in your watch mode. When you run **_yarn test --watch_**, you will see two new options in the menu: **p** for filtering by file name and **t** for filtering by test name.

## Common Error in JEST config — ES6/Ts/cjs/mts

You may encounter the error below while running tests on your screens.

![ES6 error with Jest runner](/images/rntl/image-3.png)

The reason for this error is that Jest failed to parse a file because it encountered an unexpected token. This can happen when your code or its dependencies use non-standard JavaScript syntax, or when Jest is not configured to support such syntax, such as ES6 syntax or TypeScript syntax.

**_NOTE:_** To configure it properly and solve this issue, you need to keep in mind that both .babelrc and babel.config.js do the same thing. The file .babelrc was used in older configurations, but the file babel.config.js is being used by modern JS projects. So, use only babel.config.js to configure Babel properly.

### **SOLUTION**

There are two ways to solve this error, but you need to maintain the sequence. If solution A does not work, then go for solution B.

**Solution (A):** By **“transform”** option of Jest config.

I already explained in the previous section why we need to add a config option **“transform”** and what it does. Basically, an error like **“Cannot use import statement outside a module”** is usually caused by a file or its dependencies using **non-standard JavaScript** syntax.

To solve this issue, add a **“transform”** config to your Jest configuration file, either in the package.json or jest.config.js file, like below:

```javascript
    // For jest.config.js
    transform: {
        '^.+\\.jsx?$': 'babel-jest'
        '^.+\\.tsx?$': '<rootDir>/node_modules/ts-jest/preprocessor.js'
    }
```

For React Native versions older than **v0.61**, you will have to use the code below instead of the code above.

```javascript
    transform: {
        '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js'
    }
```

Then add a babel.config.js file to the root of your project directory and add the code below.

```javascript
// babel.config.js
module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
};
```

If the above **“preset”** does not work for you, then add the code below.

```javascript
// babel.config.js
module.exports = {
  presets: ["module:metro-react-native-babel-preset", "@babel/preset-env"],
};
```

**_NOTE:_** When you add the code, you must install the particular library via yarn/npm in your dev dependency using the command below (replace your library with the library name from the above code of configs that you need).

```bash
    yarn add --dev @babel/preset-env
```

**Solution (B):** Use the jest config option **“transformIgnorePatterns”**.

**_Note:_** If the previous solution (A) does not work, then do not remove the Solution (A) codes of configs as they are necessary for the future.

So, why may solution (A) not have worked? This is because those files may not have been transformed into **JavaScript** syntax by the Jest preprocessor for any reason. However, you can **ignore** **the transformation** by the Jest preprocessor, as Jest can still read ES6 modules and TypeScript. Ignoring the transformation of those files will be a good solution.

Suppose you get an “import” error for **“react-native-elements”**. In that case, add the code below to your JEST configuration file.

```javascript
    // jest.config.js
    const config = {
      .....
      transformIgnorePatterns: [
        'node_modules/(?!(jest-)?@react-native|react-native|react-native-elements/*)'
      ],
      .....
    }
```

You can add more libraries like “react-native-elements” to the array by using the **“|”** symbol.

## Command to run test file

Just use this below command to run your test file in terminal.

```bash
    yarn test test_file_name.test.js
```

If you want to run all of your TEST file (File name ended with **_.test.js_**) then run this below command.

```bash
    yarn test
```

**_NOTE:_** Be sure “test” command was added in “scripts” section under package.json file in.

## React Native Testing Library (RNTL) APIs

We will discuss now about all the essential APIs by React Native Testing Library.

## 🪵 RNTL API — render()

The render API is one of the methods that RNTL re-exports from **DOM Testing Library**. It allows you to render a React component into a container and returns an object that has a few properties, such as queries, container, baseElement, debug, re-render, unmount, asFragment, etc.

> **render()** method deeply renders given **React element** and returns helpers **to query the output components structure**.

Let’s see an example of how to use **render()** method. Below is my **_demo.screen.js_** Component on which I will apply test.

![***demo.screen.js*** Component](/images/rntl/image-4.png)

Now let’s see how to use **render()** method in a Test for the above **_demo.screen.js_** Component. (Note: Please match **red 🔴** & **green** 🟢 underlined in above **_demo.screen.js_** Component & bellow test code).

![Test written with **render()** API provided by RNTL](/images/rntl/image-5.png)

When we will run the command: **_yarn test Demo.test.js_** then we will see an output like below.

![Test Passed ✅](/images/rntl/image-6.png)

🤚 Wait, we missed a **STANDARD** procedure while using **render()** API. The standard procedure is like below.

![Standard Procedure for **render()** API](/images/rntl/image-7.png)

So basically, latest **_render_** result is kept in **_screen_** variable that was imported from @testing-library/react-native package.

Using **_screen_** instead of destructuring **_render_** result is recommended approach. The benefit of using **_screen_** is you no longer need to keep the **_render_** call destructure up-to-date as you add/remove the queries you need. You only need to type **_screen_**. and let your editor's (VS Code for me) magic autocomplete take care of the rest.

## 🐠 TEST Component with Provider — by render() API

So, let’s say you want to test a component, but in that component, you used any Provider like **Context Provider**, **Redux** Provider, or any **Theme Provider**. So when you want to test that Component by test runner JEST, then **will that component can get the value of Providers anyhow**? The answer is No as you are not running any app; **you are just running a Component which is a simple JS file**. So then how can you still test that component **without changing any simple line of code written for Providers**?

**The solution is** to create a custom **render()** API with the **“wrapper”** argument and then use that custom render() method instead of importing the **render()** API from **RNTL**.

> **Below an** example **with “wrapper” from “render()” API**

At first, here is my **_“AuthContext”_** provider like below in **_“authContext.js”_** file.

![*File: **“authContext.js”***](/images/rntl/image-8.png)

Then a component **“DemoScreen”** which looks like below in **_“demo.screen.js”_** file. I will apply TEST on this **_“DemoScreen”_** component. You see in this component I accessed value of **_“auth.username”_** from **“AuthContext”** provider.

![File: ***“demo.screen.js”***](/images/rntl/image-9.png)

Now, below is how I implemented **custom _render()_** by using **_“wrapper”_** argument in **_“test-utils.js”_** file. In this code, I wrapped the **TESTING** component **{children}** by **_<AuthContext.Provider>_**.

**_Note:_** The **TESTING** component **{children}** means the component on which I’m going to apply TEST run. For me, it will be **_“DemoScreen”_** Component.

![File: ***“test-utils.js”***](/images/rntl/image-10.png)

Finally below is my TEST code that I wrote to test **_“DemoScreen”_** Component. In the code, you see I imported my custom **_“render”_** method instead of **_“render”_** method from **_“RNTL”._** In the last line of code, I expected a text **_“Anis”_** in **_“DemoScreen”_** component. This text **_“Anis_** came from **_“AuthContext”._**

![Final TEST file](/images/rntl/image-11.png)

Below I’m giving full code-block for **“wrapper”** argument of **render()** API to create a custom **render()** method.

```javascript
// ✅ File - "authContext.js"
// ✅ File - "authContext.js"

import { createContext } from "react";

const AuthContext = createContext(null);

export default AuthContext;
```

```javascript
// ✅ File - "demo.screen.js"
// ✅ File - "demo.screen.js"

import React, { useContext } from "react";
import { Text, ImageBackground } from "react-native";
import AuthContext from "../util/context/authContext";

export default function DemoScreen() {
  const { auth, setAuth } = useContext(AuthContext);

  return (
    <ImageBackground source={require("../assets/homeBackdrop.png")}>
      <Text testID="greeting">GREETING</Text>
      <Text testID="username">{auth.username}</Text>
    </ImageBackground>
  );
}
```

```javascript
// ✅ File - "test-utils.js"
// ✅ File - "test-utils.js"

import React, { useState, useMemo } from "react";
import { render } from "@testing-library/react-native";
import AuthContext from "../context/authContext";

const AllTheProviders = ({ children }) => {
  const [auth, setAuth] = useState({
    loggedIn: true,
    username: "Anis",
  });

  const authValue = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

const customRender = (component, options) =>
  render(component, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react-native";

// override render method
export { customRender as render };
```

```javascript
// ✅ File - "Final TEST file"
// ✅ File - "Final TEST file"

import React from "react";
import { render, screen } from "../src/util/__test__/test-utils";
import DemoScreen from "../src/screens/demo.screen";

describe("DemoScreen", () => {
  it("should render the Demo Screen", () => {
    // Render the Demo Screen
    render(<DemoScreen />);

    // Get the element with the testID "greeting"
    const userName = screen.getByTestId("username");

    // Expect the element to contain the text "Anis"
    expect(userName).toHaveTextContent("Anis");
  });
});
```

## 🐠 “queries" option — render() API

The most important feature of render is providing a set of helpful queries that allow you to find certain elements in the view hierarchy.

Let’s see how many types of Query are there

- getBy... queries

- getAllBy... queries

- queryBy... queries

- queryAllBy... queries

- findBy... queries

- findAllBy... queries

**_NOTE:_** getBy... query methods fail (throws error) when there is no matching element (null) but queryBy... methods don’t throw an error when no element (null) is found. We don’t want to get error from the line of fetching element. We want to get the error from the last line of TEST suit that is “expect”. So use queryBy... method instead of getBy.... Ex: queryBy... means queryByTestId.

Now let’s see the Query Predicates.

- ...ByRole

- ...ByText

- ...ByPlaceholderText

- ...ByDisplayValue

- ...ByTestId

- ...ByLabelText

- ...ByHintText, ...ByA11yHint, ...ByAccessibilityHint

### Query Types

Now, let’s get the explanation of each query types.

**🪸 getBy. . . :** getBy queries return the first matching node for a query, and throw an error if no elements match or if more than one match is found.

**🪸 getAllBy. . . :** getAllBy queries return an array of all matching nodes for a query, and throw an error if no elements match.

**🪸 queryBy. . .**: queryBy queries return the first matching node for a query, and return null if no elements match. This is useful for asserting an element that is not present.

**🪸 queryAllBy. . .**: queryAllBy queries return an array of all matching nodes for a query, and return an empty array ([]) when no elements match.

**🪸 findBy. . .** : findBy queries return a promise which resolves when a matching element is found. The promise is rejected if no elements match or if more than one match is found after a default timeout of 1000 ms.

**🪸 findAllBy. . . :** findAllBy queries return a promise which resolves to an array of matching elements. The promise is rejected if no elements match after a default timeout of 1000 ms.

**_NOTE:_** findBy _and findAllBy_ queries accept optional waitForOptions object argument which can contain timeout, interval and onTimeout properties which have the same meaning as respective options for [waitFor](#d375) function.

### Query Predicates

Now, let’s get the explanation of each query predicates.

**⛰️** **…ByRole:** Supported methods are getByRole, getAllByRole, queryByRole, queryAllByRole, findByRole, findAllByRole

You need to set a role or accessibilityRole prop in your Component element like below.

![Defined “role” in component to catch from TEST suit](/images/rntl/image-12.png)

Now the test suit is like below to access the button by role.

![Access an element “button” by role](/images/rntl/image-13.png)

**_NOTE:_** You need to set **_accessible_** prop to true in **_<View>_** host elements while using *ByRole as *ByRole needs to be considered an accessibility element.

![TEST with getByRole in <View>](/images/rntl/image-14.png)

You can pass many other useful filters to methods like getByRole. Let’s see those filter options below. You can find details of each method by inspecting the method in VSCode.

![Filter options of getByRole Query](/images/rntl/image-15.png)

**⛰️ …ByText:** Supported methods are getByText, getAllByText, queryByText, queryAllByText, findByText, findAllByText

This method will join <Text> siblings to find matches. This will allow for querying for strings that will be visually rendered together, but may be semantically separate React components.

![Sibling Text Component](/images/rntl/image-16.png)

**⛰️ …ByPlaceholderText:** Supported methods are getByPlaceholderText, getAllByPlaceholderText, queryByPlaceholderText, queryAllByPlaceholderText, findByPlaceholderText, findAllByPlaceholderText

Returns a **Query Instance** for a TextInput with a matching placeholder – may be a string or regular expression.

**⛰️ …ByDisplayValue:** Supported methods are getByDisplayValue, getAllByDisplayValue, queryByDisplayValue, queryAllByDisplayValue, findByDisplayValue, findAllByDisplayValue

Returns a **Query Instance** for a TextInput with a matching display value – may be a string or regular expression. In below component I have a **<TextInput>** with initial value “Anis”.

![Component with a <TextInput> that has initial value “Anis”](/images/rntl/image-17.png)

Now apply TEST by getByDisplayValue to catch the <TextInput> by the initial display value “Anis”.

![TEST by initial Display value “Anis”](/images/rntl/image-18.png)

**⛰️ …ByTestId:** Supported methods are getByTestId, getAllByTestId, queryByTestId, queryAllByTestId, findByTestId, findAllByTestId

Returns a **Query Instance** with matching **_testID_** prop like below. testID – may be a string or a regular expression.

```javascript
return (
  <View testID="button">
    <Text>Anis</Text>
  </View>
);
```

And below is how the TEST suit should be written

```javascript
describe("Test using ByRole", () => {
  it("should render the TEST Screen", async () => {
    // Render the Screen
    render(<TestQuery_ByTestId />);

    // Get the BUTTON with the role/accessibilityRole as "button"
    const button = screen.getByTestId("button");

    // Expect the element to contain "Anis"
    expect(button).toHaveTextContent("Anis");
  });
});
```

**_NOTE:_** It is recommended to use this only after the other queries don’t work for your use case. Using **testID** attributes do not resemble how your software is used and **should be avoided if possible**. However, they are particularly useful for end-to-end testing on real devices, e.g. using Detox and it's an encouraged technique to use there.

**⛰️ …ByLabelText:** Supported methods are getByLabelText, getAllByLabelText, queryByLabelText, queryAllByLabelText, findByLabelText, findAllByLabelText

Returns a **Query Instance** with matching label:

- either by matching **_aria-label_**/**_accessibilityLabel_** prop

- or by matching text content of view referenced by **_aria-labelledby_**/**_accessibilityLabelledBy_** prop

Implementation code is as same as ⛰️ …ByDisplayValue.

## 🐠 “update" option — render() API

During testing, you might want to simulate how your component behaves when its **props change dynamically**. For example, if your component receives new data from an API or user interactions trigger prop updates, you can use update() to test these scenarios.

When you call update(), you’re saying, “Hey, let’s change something about this component with some modifications!”

This update() simulates a React update at the root. If the new element has the **same type** and **key** as the previous element, the tree will be updated; otherwise, it will **re-mount** a new tree. This is useful when testing for **_componentDidUpdate_**(runs after a component updates) behavior, by passing updated props to the component.

**Tree Update vs. Re-Mount:** If the **type** or **key** is **different**, RNTL don’t just update the existing tree. Instead, it **creates a whole new tree** (re-mount). Think of it like replacing a plant: sometimes you water the same plant (**update**), and other times you plant a new one (**re-mount**).

Let’s see an example. We have a component like below with a **useEffect** **clean-up** function to TEST the component **Un-Mounting** stuff.

![Component to TEST render() & update() mounting & un-mounting](/images/rntl/image-19.png)

Now, I wrote a TEST suit below to test the above component.

![TEST written by “RNTL” library](/images/rntl/image-20.png)

In the TEST suit, you may see that at first I used **render()**. Then I used **_update()_** two times. In the second **update()** I used a new key as **“totallyNew”**.

Now, when I ran the TEST file by JEST test runner with RNTL in environment, then I see below output in console.

![Output of TEST file](/images/rntl/image-21.png)

In the output we see, the **clean-up** function was called 2 times. The first one was called when I called the **render()** API. The second one called when I called the **update()** API for **second time** with new **key “totallyNew”**. So, in the **first** call of **update() without key,** din’t invoke the **clean-up** function.

So, it has been proved that **update()** with new value but **without changing key** will **not MOUNT** the component again & it will just **only update the existing DOM tree**.

This test ensures that our component responds correctly to dynamic prop changes, and the update() option helps us to achieve that.

## 🐠 “debug" option — render() API

Pretty prints deeply rendered component passed to render. Below is the code of debug.

![Implemented debug()](/images/rntl/image-22.png)

It logged the rendered component pretty deeply like below in the console.

![Logged the **rendered component** in the console (Ignore my output font size as I fit it into a small space.)](/images/rntl/image-23.png)

## 🪵 RNTL API — userEvent()

There are 2 types of API in RNTL to handle all interactions like scrolling, press, etc. These are

1.  fireEvent() API

2.  userEvent() API

**_FireEvent_** is the original event simulation API. It offers ability to invoke any event handler declared on either host or composite elements. If the element does not have onEventName event handler for passed eventName event, or the element is disabled, Fire Event will traverse up the component tree, looking for event handler on both host and composite elements along the way. By default it will not pass any event data, but the user might provide it in the last argument.

In contrast, **UserEvent** provides realistic event simulation for main user interactions like press or type from keyboard. Each of the interactions will trigger a sequence of events corresponding to React Native runtime behavior. These events will be invoked only on host elements, and will automatically receive event data corresponding to each event.

If **UserEvent** supports given interaction you should always prefer it over **_FireEvent_** counterpart, as it will make your tests much more realistic and hence reliable. In other cases, e.g. when event is not supported by User Event, or when invoking event handlers on [composite elements](#909a), you have to use Fire Event as the only available option.

**_fireEvent_** dispatches DOM events, whereas **userEvent** simulates full _interactions_, which may fire multiple events and do additional checks along the way.

### setup() option — userEvent()

To use UserEvent(), at first you need to create an User Event object instance which can be used to trigger events. Before creating instance let’s understand some terms.

**Real Timer:** Real Timer is the default timer used by JavaScript. It is based on the system clock and provides accurate timing information. However, it can cause issues when testing asynchronous code because it can take a long time to complete certain operations. To apply Real Timer just use this below code.

```javascript
// Setup UserEvent (with real timer)
const user = userEvent.setup();
```

**Fake Timer:** Fake Timer is a timer that is not based on the system clock. Instead, it is controlled by the testing framework and can be advanced manually. This allows you to test asynchronous code more easily and quickly.

**Advanced Timer:** An advanced timer is a tool that allows you to _fast-forward time_ by 10 seconds, 5 seconds, 20 seconds, or any other specified duration. Unlike traditional timers, it doesn’t require you to wait for the entire duration before giving you an output. Instead, it provides you with an output within 100 milliseconds that will occur within the specified duration. To achieve this, the **advanced timer takes the help of FakeTimer**, which creates a fake timer inside the testing environment. This allows the advanced timer to perform its operation and give you a result from the future within just 100 milliseconds.

To apply **Fake Timer** with conjunction of **Advance Timer**, just use this below code instead of above code for Real Timers.

```javascript
// Activate FakeTimer
jest.useFakeTimers();

// Now, setup UserEvent (with Advance Timer)
const user = userEvent.setup({
  delay: null,
  advanceTimers: (delay) => {
    jest.advanceTimersByTime(5000);
    // "5000" refers to advance the clock to 5s and show result now.
    // "delay" refers a basic "130" milliseconds to update a STATE.
  },
});
```

**_NOTE:_** If you don’t use **advanceTimers()** with **UserEvent()** like above then you will get an warning like below.

![False positive warning (unnecessary warning) in console](/images/rntl/image-24.png)

Now, let’s see a complete example below. At first I’m giving you an example of component on which I will apply the UserEvent().

![Component to Test](/images/rntl/image-25.png)

Now, let’s see the TEST suit that I created using UserEvent() instance.

![TEST suit to test userEvent() longPress method](/images/rntl/image-26.png)

Let me give you the TEST suit code in editor below.

```javascript
import React from "react";
import { render, screen, userEvent } from "@testing-library/react-native";
import UserEventTest from "../src/screens/testScreens/userEventTest.screen";

describe("Test using UserEvent", () => {
  it("should render the TEST Screen", async () => {
    // Enable fakeTimers
    jest.useFakeTimers();

    // Setup UserEvent
    const user = userEvent.setup({
      delay: null,
      advanceTimers: (delay) => jest.advanceTimersByTime(10000),
    });

    // Render the Screen
    render(<UserEventTest />);

    // Get the BUTTON with the testID "button"
    const button = screen.getByTestId("button");

    // Each time you will call a "UserEvent" method like below,
    // it will trigger this line "jest.advanceTimersByTime(10000)"
    await user.longPress(button);

    // Get the TEXT with the testID "textConditional"
    const textConditional = screen.queryByTestId("textConditional");

    // Expect the element to contain "Text Visible"
    expect(textConditional).toHaveTextContent("Text Visible");
  });
});
```

In the above example, you also got an idea with a real example of how to implement the **UserEvent()** API of RNTL for the longPress event. Like the longPress event, there are other events that UserEvent can support. These are listed below. Use them as like as I gave example above for longPress() method.

- press()

- longPress()

- type()

- clear()

- scrollTo()

## 🐠 Example of FireEvent() API

Let me give you an example of **_fireEvent_** with fakeTimers and advanceTimersByTime(). fireEvent works exactly the same as userEvent in the case of fakeTimers and advanceTimersByTime(). However, fireEvent is a bit different from userEvent(). Below is the test suite that I wrote for the same component as above, with a press() and a setTimeout of 5000 ms in the action of the button press. Here is the test suite with fireEvent.

![TEST suit written for fireEvent()](/images/rntl/image-27.png)

Below is the code in editor for you.

```javascript
import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react-native";
import FireEventTest from "../src/screens/testScreens/fireEventTest.screen";

describe("Test using UserEvent", () => {
  it("should render the TEST Screen", async () => {
    // Enable fakeTimers
    jest.useFakeTimers();

    // Render the Screen
    render(<FireEventTest />);

    // Get the BUTTON with the testID "button"
    const button = screen.getByTestId("button");

    // Fire an event "Press" by mouse
    fireEvent.press(button);

    // Apply a side-effect by act() function
    // We advanced the time 10s by this side-effect function
    act(() => {
      jest.advanceTimersByTime(10000);
    });

    // Get the TEXT with the testID "textConditional"
    const textConditional = screen.queryByTestId("textConditional");

    // Expect the element to contain "Text Visible"
    expect(textConditional).toHaveTextContent("Text Visible");

    jest.useRealTimers();
  });
});
```

If you place **_jest.advanceTimersByTime(10000)_** before **_fireEvent.press(button)_**, you will see an error because screen.queryByTestId and expect(textConditional) depend on a setTimeout state update with a delay of 5 seconds after the button press inside the component below.

![The component on which I applied fireEvent()](/images/rntl/image-28.png)

Like above, you can use fireEvent() for these actions too

- press()

- changeText()

- scroll() -> ScrollView/ FlatList

## 🪵 RNTL API — waitFor()

waitFor is a function provided by React Native Testing Library (RNTL) that waits for a condition to be true before continuing with the test. Here’s how it works:

1.  The waitFor function takes a callback function as an argument.

2.  The callback function should return a truthy value when the condition is met.

3.  If the callback function returns a falsy value, waitFor will wait and try again until the condition is met or the timeout is reached.

**_NOTE:_** Before React Native v0.71, there was no support for the waitFor() API. Before v0.71, waitFor was implemented using FakeTimer and continuous polling until a truthy value was returned.

Let’s implement the previous fireEvent() test suite using the waitFor() API this time.

![WaitFor() API implementation](/images/rntl/image-29.png)

Here, the timeout option specifies the maximum amount of time to wait for the condition to be true before timing out. The default value is 4500ms.

The interval option specifies the amount of time to wait between each check of the condition. The default value is 50ms.

The value **_10,000_** at the end of the above code refers to the maximum time this test will run, and every asynchronous (await) operation must be finished within this time. By default, this time is set to 5000 ms.

Again, the component is as same as before on which I applied the **waitFor()** test API. I’m providing the component again below.

![The component on which I applied WaitFor()](/images/rntl/image-30.png)

Below is the final code of WaitFor() in editor.

```javascript
import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import FireEventTest from "../src/screens/testScreens/fireEventTest.screen";

describe("Test using WaitFor", () => {
  it("should render the TEST Screen", async () => {
    // Render the Screen
    render(<FireEventTest />);

    // Get the BUTTON with the testID "button"
    const button = screen.getByTestId("button");

    // Fire an event "Press" by mouse
    fireEvent.press(button);

    await waitFor(
      () => {
        // Get the TEXT with the testID "textConditional"
        const textConditional = screen.queryByTestId("textConditional");

        // Expect the element to contain "Text Visible"
        expect(textConditional).toHaveTextContent("Text Visible");
      },
      { timeout: 6000, interval: 500 }
    );
  }, 10000);
});
```

**_NOTE:_** If you are using any API (network call) inside **“waitFor”** operation then you may have encounter this below issue of “fetch”.

![FETCH error for Jest](/images/rntl/image-31.png)

**SOLUTION:** You have to install **_“cross-fetch”_** in your react native app by this below command.

```bash
    yarn add --dev cross-fetch
```

Then just import the **“cross-fetch”** at the top of the file from where your TEST suit is fetching the Network Data by a Network Call. For my case it was Apollo GraphQL & I just only imported the “cross-fetch” & it worked.

![Imported “cross-fetch”](/images/rntl/image-32.png)

## What is Mocking ?

Mocking is a technique used to replace real functions or modules with mock implementations during testing. This is useful when you want to isolate your tests from external dependencies or simulate certain scenarios that are difficult to reproduce in real-world conditions.

RNTL provides a set of utility functions that allow you to create mock functions and mock modules. You can use these functions to replace real functions or modules in your codebase and test how your code interacts with them.

### 🍁 Difference between jest.fn() & jest.mock()

**_jest.fn()_** is a function that returns a new, empty mock function. You can use this mock function to **replace a real function** in your codebase and test how it is called and what it returns. For example, you can use jest.fn() to create a mock function that simulates a network request and test how your code handles the response.

**_jest.mock()_** is a function that allows you to **replace a module** with a mock implementation. This is useful when you want to test a module that has dependencies on other modules. You can use jest.mock() to replace the dependencies with mock implementations and test how your module interacts with them.

In summary, jest.fn() is used to create mock functions that replace real functions in your codebase, while jest.mock() is used to replace entire modules with mock implementations.

### 🍁 How to Mock a Real Function (by jest.fn()) ?

**_jest.fn()_** is a function provided by the Jest testing framework that allows you to create mock functions that **replace real functions** in your codebase during testing. Below, I created a test suite where I created a mock function called **_‘mockFunction’_** using jest.fn().

![Created Mock function by jest.fn()](/images/rntl/image-33.png)

Look at the test suite where I created a mock function called **_‘mockFunction’_** using jest.fn() and passed it as a prop to the <TestMock> component. Finally, I checked whether the mock function **_‘mockFunction’_** was called or not in the last line of the test suite “expect(mockFunction).toHaveBeenCalled()”.

Below is the component where I applied the above test suite.

![Component on where I applied MOCK function **“mockFunction"**](/images/rntl/image-34.png)

### 🍁 How to Mock a Native Module (by jest.mock())?

Some React Native components or third-party components rely on native code to be rendered. **Native code** is the code that runs on the device’s operating system, such as Android or iOS. For example, **AsyncStorage** is a native module that allows you to store and retrieve data from the device’s local storage. **PermissionsAndroid** is another native module that helps you request and check permissions for various features on Android devices.

However, when you run your tests with Jest, you don’t have access to the native code or the device’s environment. **Jest** runs your tests in a Node.js environment, which is different from the device’s environment. Therefore, you need to **mock** or fake the native modules that your components depend on.

**“Mocking means creating a simplified or simulated version of something that behaves in a similar way as the original thing**.”

By mocking the native modules, you can avoid errors or unexpected behaviors when testing your components. You can also control how the **native modules** behave and return values in your tests. For example, you can **mock AsyncStorage** to return a specific value when you call AsyncStorage.getItem(key) in your test.

To mock a native module, you can use **_jest.mock(moduleName, factory)_** function. The **_moduleName_** is the name of the native module that you want to mock, such as ‘react-native’ or ‘@react-native-community/async-storage’. The **_factory_** is a function that returns an object with the methods and properties that you want to mock for the native module.

For example, if you want to mock AsyncStorage, you can write something like this in your setup file:

```javascript
jest.mock("@react-native-community/async-storage", () => ({
  getItem: jest.fn(() => Promise.resolve("some value")),
  setItem: jest.fn(() => Promise.resolve()),
}));
```

This will create a mock version of AsyncStorage with two methods: **getItem** and **setItem**. The getItem method will always return a promise that resolves to ‘some value’, and the setItem method will always return a promise that resolves to nothing. You can use these methods in your tests as if they were the real AsyncStorage methods.

Similarly, if you want to **mock PermissionsAndroid**, you can write something like this in your setup file:

```javascript
jest.mock("react-native", () => ({
  ...jest.requireActual("react-native"),
  PermissionsAndroid: {
    request: jest.fn(() => Promise.resolve("granted")),
    check: jest.fn(() => Promise.resolve(true)),
  },
}));
```

This will create a mock version of PermissionsAndroid with two methods: **_request_** and **_check_**. The request method will always return a promise that resolves to ‘granted’, and the check method will always return a promise that resolves to true. You can use these methods in your tests as if they were the real PermissionsAndroid methods.

### **_🍁 Another example of Native Module Mocking ( jest.mock() ) 👇_**

Let’s see another example of mocking a native module. Suppose you ran a test suite and rendered a component called **_MessageTab_**. Inside the MessageTab component, you used the react-native-orientation-locker native module. When you ran the test suite and called the MessageTab component, you got the error below.

![ERROR due to not mocking Native Modules](/images/rntl/image-35.png)

The reason for the error is that you ran only a **single JS file** and not the entire app, and you did not run the app even in a device or simulator. Therefore, all **native modules** are out of scope to access. That’s why JEST can’t access the native orientation of device functions.

Here’s how I used the react-native-orientation-locker native module in my **_MessageTab_** component:

![**MessageTab** Component with **Native Module** in use](/images/rntl/image-36.png)

So, I added mocking for react-native-orientation-locker inside my test suite before running the test, like the code below. This solved the error of invariant violation 🚀.

![TEST suit on which I applied jest.mock() on Native Module](/images/rntl/image-37.png)

## Some Advanced Share about RNTL

React Native Testing Library allows you to write **integration** and **component** tests for your **React Native** app or library. While the JSX code used in tests closely resembles your React Native app, the things are **not quite as simple** as they might appear. Let’s understand some of them in this part.

### React renderers[​](https://callstack.github.io/react-native-testing-library/docs/testing-env#react-renderers)

React allows you to write declarative code using **JSX**, write function or class components, or use hooks like useState. In order to output the results of your components **it needs to work with a renderer**. Every React app uses some type of renderer: **React Native is a renderer for mobile apps**, web apps use **React DOM**, and there are other more specialised renderers that can e.g. **render to console** or **HTML canvas**.

When you run your tests in React Native Testing Library, somewhat contrary to what the name suggest, they are actually not using React Native renderer. This is because this renderer needs to be run on iOS or Android operating system, so it would need to run on device or simulator.

### React Test Renderer[​](https://callstack.github.io/react-native-testing-library/docs/testing-env#react-test-renderer)

Instead, **RNTL** uses **React Test Renderer** which is a specialised renderer that **allows rendering to pure JavaScript objects without access to mobile OS**, and that can run in a Node.js environment using Jest (or any other JavaScript test runner).

Using React Test Renderer has pros and cons.

Benefits:

- Tests can run on most CIs (linux, etc) and do not require a mobile device or emulator

- Faster test execution

- Light runtime environment

Disadvantages:

- Tests do not execute native code

- Tests are not aware of view state that would be managed by native components, e.g. focus, unmanaged text boxes, etc.

- Assertions do not operate on native view hierarchy

- Runtime behaviours are simulated, sometimes imperfectly

### Element tree[​](https://callstack.github.io/react-native-testing-library/docs/testing-env#element-tree)

Invoking **_render()_** function results in creation of an **element tree**. This is done internally by invoking TestRenderer.create() method. The output **tree represents your React Native component tree**, each **node** of that tree is an **“instance”** of some **React component.**

**To be more precise:** Each **node** represents a **React fiber**, and **only class components have instances**, while function components store the hook state using **fiber**.

**Fiber:** A **fiber** is a unit of work that **represents a Component and its STATE**. It is a lightweight thread-like structure that is used to manage the component tree and its updates. The **fiber** is created for each component and is responsible for scheduling the work and prioritizing the updates based on their importance.

### Fabric Renderer

What is the **DOM** view in **React** is now the **HOST** view in **React Native**. So, below are two same:

React **DOM** view — > React Native **HOST** view

Rendering to HOST views is made possible by the **Fabric Renderer**. Fabric lets React talk to each platform and manage its host view instances. The Fabric Renderer exists in JavaScript and targets interfaces made available by C++ code.

### HOST View Tree (and HOST View)[​](https://reactnative.dev/architecture/glossary#host-view-tree-and-host-view)

Tree representation of views in the **HOST** platform (e.g. Android, iOS). On Android, the host **views** are instances of android.view.ViewGroup, android.widget.TextView, etc. which are the building blocks of the host **view tree**. The size and location of each **HOST** view are based on LayoutMetrics calculated with **Yoga**, and the style and content of each **HOST** view are based on information from the **React Shadow Tree**.

### HOST and Composite components

One of the most important aspects of the element tree is that it is composed of both host and composite components:

- **_HOST components:_ HOST components** are components that will have direct counterparts in the native view tree. Typical examples are <View>, <Text> , <TextInput>, and <Image> from React Native. You can think of these as analogue of <div>, <span> etc on the Web. You can also create your own host views as native modules or import them from 3rd party libraries, like **React Navigation** or **React Native Gesture Handler**.

- **_Composite components:_** **Composite components** are React code organisation units that exist only on the JavaScript side of your app. Typical examples are components you create (both function and class components), components imported from React Native (View, Text, etc) or from 3rd party packages.

That might sound a bit confusing at first, since we put React Native’s **_View_** in both categories. There are actually two View components: composite one and host one. The relation between them is as follows:

- composite View is the type imported from react-native package. It’s a JavaScript component, which renders host View as its only child in the element tree.

- host View , which you do not render directly. React Native takes the props you pass to the composite View, does some processing on them and **passes them to host** **_View_**.

The part of the tree looks as follows:

![Composite & HOST view](/images/rntl/image-38.png)

Similar relation exists between other composite and host pairs: e.g. Text , TextInput and Image components:

![Composite & HOST Text](/images/rntl/image-39.png)

Not all React Native components are organised this way, e.g. when you use Pressable (or TouchableOpacity) **there is no HOST _Pressable_**, but composite Pressable is rendering a **_HOST View_** with certain props being set:

![**Composite** Pressable with **HOST** view](/images/rntl/image-40.png)

### Differentiating between host and composite elements

An easy way to differentiate between **host** and **composite** elements is the **_type_** prop of given Component. Let’s have a look at below code.

![Code for checking **Component** type (**Composite** or **HOST**)](/images/rntl/image-41.png)

In above code, the **given Component** is **_<Pressable />_**. Inside function **_isHostElement(),_** I used element **“type”** property to check if the given Component **_<Pressable />_** is a HOST component or a Composite component.

So, if **_typeof element.type_** return a **“string”** then given Component is a “**HOST”** component otherwise given Component is a **“COMPOSITE”** component.

For my case `<Pressable />` is a **“COMPOSITE”** component as it gave the below **“Function type”** instead of type **“string”**.

![**Given Component** type (Found that **Given Component** is a **COMPOSITE component**)](/images/rntl/image-42.png)

### Queries

Most of the Testing Library queries return host components, in order to encourage best practices described above.

At this stage, there are some noteworthy exceptions:

- \*ByText queries returns composite Text element

- \*ByDisplayValue queries returns composite TextInput element

- \*ByPlaceholderText queries returns composite TextInput element

This will change in the near future, as RNTL team make efforts for all queries to return host components. Meanwhile it shouldn’t be a huge issue, as composite Text and TextInput generally pass their props down to **HOST** counterparts.

Additionally, UNSAFE _ByType and UNSAFE_ ByProps queries can return both **HOST** and **Composite** components depending on used predicates. They are marked as unsafe precisely because testing composite components makes your test more fragile.

## 🚀 Intro to E2E Testing

If you have reached this far, then you are already an expert in **Component Testing** (JS testing) of React Native. Now, you need to dive into the top of the TESTING pyramid, which is E2E testing (End-to-End testing).

One of the most popular libraries for E2E testing for React Native apps is **Detox**. Detox is a **gray box** end-to-end testing and **automation framework** for mobile apps built with React Native. It supports both iOS and Android apps. **Detox tests your mobile app while it’s running in a real device/simulator,** interacting with it just like a real user.

**_NOTE:_** I will be publishing an in-depth article on the Detox Testing Library very soon. The article will cover everything you need to know about Detox, including how to get started with it, its features, and how to use it to test your React Native apps.

### [🙏 If you find it helpful, please give a STAR (click here) ️⭐️ ⭐️](https://github.com/anisurrahman072/React-Native-Advanced-Guide)

Thank you for reading this article. I enjoy sharing my **5 years** of experience in **React-native**, **JavaScript**, **React** & **Node.js** with you every day. If you enjoyed reading this article, I would appreciate it if you could follow me on [**Twitter**](https://twitter.com/anis_RNCore) & [**Medium**](https://medium.com/@anisurrahmanbup).

If you find any **ISSUE** in this Guide BOOK, please create a **PR** to help the community 🔥
