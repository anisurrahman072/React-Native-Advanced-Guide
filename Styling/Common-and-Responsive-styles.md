# React Native Styling Metrics & Common Styles: The Ultimate Guide

It is extremely important to ensure that your application looks fantastic on different devices to keep your users engaged and satisfied. This guide presents a sophisticated yet simple approach to managing styling metrics in React Native. This approach will guarantee that your application's user interface scales elegantly on various screen sizes and resolutions.

## Before We Dive In 🚀

It is crucial to understand the importance of responsive design in today's diverse device landscape. Our solution simplifies the process, making it incredibly easy once you understand a few key concepts and follow the outlined steps. Without this knowledge, you may find yourself lost in a sea of inconsistent UI elements and racing against time to meet your project deadlines.

However, there is no need to worry! We have distilled everything into an easy-to-follow guide, ensuring that you can efficiently implement these styling metrics, saving you time and frustration.

## Introduction to Styling Metrics

In mobile app development, consistency across various screen sizes is a challenge. Our utility functions aim to standardize width, height, font sizes, and spacing, making your app look and feel the same on every device.

### The Core of Our Styling Metrics

Establishing a solid foundation for our styling metrics is crucial for ensuring our application's UI remains consistent across various devices. Here's how we set it up:

```javascript
import { PixelRatio } from 'react-native';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

// Design layout dimensions (in pixels).
const layoutWidth = 390;
const layoutHeight = 844;

// Calculate scale factors based on the device's dimensions versus the design layout.
const widthScaleFactor = deviceWidth / layoutWidth;
const heightScaleFactor = deviceHeight / layoutHeight;

// PixelRatio.getFontScale() provides the user's font size setting.
// This is crucial for text scaling to respect user preferences for readability.
let maxFont = PixelRatio.getFontScale();

// Define font scales to adjust font sizes dynamically based on the device's font setting.
// This array maps font scale limits to adjustment values, ensuring text remains legible and proportionate.
const fontScales = [
  { limit: 1.28, value: 0 }, // No adjustment for standard scale.
  { limit: 1.6, value: 2 }, // Slightly larger text for moderate scale.
  { limit: 2, value: 4 }, // Larger text for large scale settings.
  { limit: 2.5, value: 5 }, // Further adjustments for even larger scales.
  { limit: 3, value: 7 }, // Substantial increase for very large scales.
  { limit: 3.5, value: 8 }, // Max adjustment before hitting the upper limit.
  { limit: Infinity, value: 8.8 }, // Upper bound adjustment for any scale beyond 3.5.
];

// Determine the appropriate font scale value based on the current device's font setting.
// This ensures our application's text adapts to both the device size and user preferences, enhancing accessibility and readability.
let fontScaleValue = (
  fontScales.find((scale) => maxFont <= scale.limit) || { value: 0 }
).value;
```

## Implementing Styling Metrics

With our foundation set, we'll define functions that help normalize dimensions based on the device's screen size. These are essential for ensuring your application's UI components are properly scaled across various devices.

### Normalizing Width and Height

To ensure elements scale correctly across different screens, we adjust the width and height of UI elements through the following functions:

```javascript
function normalizeWidth(size) {
  const resizedWidth = size * widthScaleFactor;
  return Math.round(PixelRatio.roundToNearestPixel(resizedWidth));
}

function normalizeHeight(size) {
  const resizedHeight = size * heightScaleFactor;
  return Math.round(PixelRatio.roundToNearestPixel(resizedHeight));
}
```

### Font Size Adjustment

Given that users might have different font size settings on their devices, it's essential to adjust font sizes accordingly. This ensures text remains legible and aesthetically pleasing across various devices and user preferences. We achieve this through the `pixelFont` function:

```javascript
const pixelFont = (size) => {
  // Adjust the size based on the font scale value determined by the user's settings
  return pixelHeight(size - fontScaleValue);
};
```

This method ensures that text in your application is not only readable but also maintains its intended design impact, regardless of the device or user preferences for font sizes.

### Additional Normalization Functions

To achieve consistent spacing for margins, padding, and other layout dimensions, we introduce additional functions for vertical and horizontal normalization:

```javascript
const pixelVertical = (size) => {
  // Normalize vertical dimensions for consistent vertical spacing
  return normalizeHeight(size);
};

const pixelHorizontal = (size) => {
  // Normalize horizontal dimensions for consistent horizontal spacing
  return normalizeWidth(size);
};
```

### Unified Normalization Function

To facilitate the application of these normalization techniques across your React Native project, we've consolidated them into a single, versatile function:

```javascript
const normalizeFunctions = {
  width: pixelWidth,
  height: pixelHeight,
  font: pixelFont,
  vertical: pixelVertical,
  horizontal: pixelHorizontal,
};

export const normalize = (func, px) => {
  // Dynamically select and apply the appropriate normalization function
  return normalizeFunctions[func](px);
};
```

## Example Usage

Following the implementation of our normalization functions, let's examine a comprehensive example that utilizes all available normalization methods to ensure consistent styling across different devices. This example will help you understand how to apply these metrics effectively within your React Native project.

```javascript
import { StyleSheet } from 'react-native';
import { normalize } from './yourNormalizeFunctionPath'; // Ensure to import the normalize function correctly

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: normalize('vertical', 50), // Using 'vertical' normalization for bottom margin
  },
  wrapper: {
    borderRadius: 16,
    justifyContent: 'space-between',
    paddingHorizontal: normalize('horizontal', 24), // Using 'horizontal' normalization for horizontal padding
    paddingVertical: normalize('vertical', 13), // Using 'vertical' normalization for vertical padding
    gap: normalize('vertical', 20), // Using 'vertical' normalization for gap between elements
  },
  inputsView: {
    gap: normalize('horizontal', 20), // Using 'horizontal' normalization for gap between input's view
  },
  skip: {
    fontSize: normalize('font', 15), // Using 'font' normalization for font size
    lineHeight: normalize('font', 26), // Using 'font' normalization for line height
  },
});
```

## Summary and Conclusion

Throughout this guide, we've explored the fundamentals of creating responsive design elements in React Native using a set of normalization functions. By understanding and implementing these functions, you can ensure that your application's UI components are scaled properly across different devices, maintaining design integrity and a consistent user experience.

Our journey covered the setup of foundational metrics, the implementation of functions to normalize width, height, and font sizes, and the application of these functions in practical scenarios. With the addition of TypeScript, we further enhanced the reliability and maintainability of our code by leveraging type safety features.

### Key Takeaways

- **No External Libraries Required**: One of the significant advantages of this approach is that you can achieve a responsive design without relying on external libraries. By utilizing the built-in `PixelRatio` API from React Native and a few custom functions, you can create a flexible and adaptive UI that looks great on any device.
- **TypeScript Enhancements**: Incorporating TypeScript adds an extra layer of clarity and type safety to your project, making it easier to manage and less prone to runtime errors.
- **Customizable and Extendable**: The normalization functions we've developed are not only tailored to specific needs (width, height, font size) but also fully customizable and extendable. You can easily adjust these functions or add new ones to meet the unique requirements of your project.

### Final Thoughts

Embracing these normalization techniques allows you to build React Native applications that are inherently responsive, eliminating the need for external responsive design libraries. This not only simplifies your project's dependencies but also gives you complete control over how your application adapts to different screen sizes and resolutions.

As you continue to develop and refine your React Native applications, remember that the key to a great user experience is not just in the features you offer but also in how accessible and aesthetically pleasing your application is across all devices. By applying the principles and techniques outlined in this guide, you're well on your way to creating outstanding, responsive mobile applications that users will love.

Thank you for following along with this guide. Happy coding!

## TypeScript Usage

For those using TypeScript, leveraging types can significantly improve the reliability and maintainability of your normalization functions. Here's how you can apply TypeScript to our existing setup:

```typescript
import { PixelRatio } from 'react-native';

// Define your constants for device and layout dimensions.
import {
  windowHeight as deviceHeight,
  windowWidth as deviceWidth,
} from './consts.styles';

const layoutWidth: number = 390;
const layoutHeight: number = 844;

const widthScaleFactor: number = deviceWidth / layoutWidth;
const heightScaleFactor: number = deviceHeight / layoutHeight;

let maxFont: number = PixelRatio.getFontScale();

interface FontScale {
  limit: number;
  value: number;
}

const fontScales: FontScale[] = [
  { limit: 1.28, value: 0 },
  { limit: 1.6, value: 2 },
  { limit: 2, value: 4 },
  { limit: 2.5, value: 5 },
  { limit: 3, value: 7 },
  { limit: 3.5, value: 8 },
  { limit: Infinity, value: 8.8 },
];

let fontScaleValue: number = (
  fontScales.find((scale) => maxFont <= scale.limit) || { value: 0 }
).value;

// TypeScript improves function signatures with type annotations for parameters and return values.
function normalizeWidth(size: number): number {
  const resizedWidth: number = size * widthScaleFactor;
  return Math.round(PixelRatio.roundToNearestPixel(resizedWidth));
}

function normalizeHeight(size: number): number {
  const resizedHeight: number = size * heightScaleFactor;
  return Math.round(PixelRatio.roundToNearestPixel(resizedHeight));
}

// Specify return types for clearer, type-safe functions.
const pixelWidth = (size: number): number => normalizeWidth(size);
const pixelHeight = (size: number): number => normalizeHeight(size);
const pixelFont = (size: number): number => pixelHeight(size - fontScaleValue);
const pixelVertical = (size: number): number => pixelHeight(size);
const pixelHorizontal = (size: number): number => pixelWidth(size);

// Utilize TypeScript's keyof typeof operator for type-safe function selection.
type NormalizeFunctionKey = keyof typeof normalizeFunctions;

const normalizeFunctions = {
  width: pixelWidth,
  font: pixelFont,
  height: pixelHeight,
  vertical: pixelVertical,
  horizontal: pixelHorizontal,
};

export const normalize = (func: NormalizeFunctionKey, px: number): number =>
  normalizeFunctions[func](px);
```

In React Native projects, maintaining a consistent and reusable styling approach across components is crucial for development efficiency and application maintainability. The `CommonStyles` stylesheet is designed to centralize frequently used styles, enabling easy application and modification across the project.

## Overview

`CommonStyles` includes a set of predefined styles that cater to common layout patterns and alignments. By utilizing these styles, developers can quickly implement common design requirements without repeatedly writing the same style rules.

## Common Styles Implementation

Below is the implementation of `CommonStyles` using React Native's `StyleSheet`. These styles are designed to be reused throughout your application to maintain consistency and reduce redundancy.

```javascript
import { StyleSheet } from 'react-native';

export const CommonStyles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  flexJustifyCenter: {
    flex: 1,
    justifyContent: 'center',
  },
  flexAlignCenter: {
    flex: 1,
    alignItems: 'center',
  },
  flexRow: {
    flex: 1,
    flexDirection: 'row',
  },
  flexAlignRow: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  flexAlignJustifyCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
  justifyCenterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  alignCenterRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alignJustifyCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  alignJustifyCenterRow: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  flexAlignJustifyCenterRow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  alignCenterJustifyBetweenRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  alginSelfCenter: {
    alignSelf: 'center',
  },
  none: {
    display: 'none',
  },
});
```

## Styles Description

Below are the styles defined in `CommonStyles`, along with their intended usage:

### Flex Styles

- **flex**: Applies `flex: 1`, making the component expand to fill its parent.
- **flexJustifyCenter**: Centers children vertically within a flex container.
- **flexAlignCenter**: Centers children horizontally within a flex container.
- **flexRow**: Aligns children in a row using `flexDirection: 'row'`.
- **flexAlignRow**: Aligns children in a row and centers them horizontally.
- **flexAlignJustifyCenter**: Centers children both horizontally and vertically within a flex container.
- **flexAlignJustifyCenterRow**: Similar to `flexAlignJustifyCenter`, but arranges children in a row.

### Row Styles

- **row**: Aligns children in a horizontal row.
- **rowReverse**: Aligns children in a horizontal row in the reverse order.
- **justifyCenterRow**: Centers children horizontally within a row.
- **alignCenterRow**: Centers children vertically within a row.
- **alignJustifyCenter**: Centers children both horizontally and vertically.
- **alignJustifyCenterRow**: Centers children both horizontally and vertically within a row.
- **flexAlignJustifyCenterRow**: Applies `flex: 1` and centers children both horizontally and vertically within a row.
- **alignCenterJustifyBetweenRow**: Aligns children in a row, centers them vertically, and distributes them evenly across the horizontal axis with space between.

### Miscellaneous Styles

- **alginSelfCenter**: Centers the component itself within its parent (not its children).
- **none**: Sets the display property to 'none', effectively hiding the component.

## Usage

To use the `CommonStyles`, import the stylesheet into your component and apply the styles as needed:

```javascript
import React from 'react';
import { View, Text } from 'react-native';
import { CommonStyles } from './pathToCommonStyles';

const MyComponent = () => (
  <View style={CommonStyles.flexAlignJustifyCenter}>
    <Text style={CommonStyles.alginSelfCenter}>Centered Text</Text>
  </View>
);

export default MyComponent;
```

Sometimes, you might want to apply multiple styles to a single component. React Native allows you to use an array of styles for this purpose. Here's how you can combine `CommonStyles` with component-specific styles:

```javascript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CommonStyles } from './pathToCommonStyles';

const MyComponent = () => (
  <View style={[CommonStyles.flexAlignJustifyCenter, styles.customContainer]}>
    <Text style={[CommonStyles.alignSelfCenter, styles.customText]}>
      Centered Text
    </Text>
  </View>
);

const styles = StyleSheet.create({
  customContainer: {
    backgroundColor: '#eee', // Custom container styling
  },
  customText: {
    fontSize: 18, // Custom text styling
    color: 'blue',
  },
});

export default MyComponent;
```

For even more streamlined integration of `CommonStyles` into your component's specific styles, you can utilize the ES6 spread operator (`...`) within your style objects. This allows you to directly merge common styles into your custom style definitions:

```javascript
import { StyleSheet } from 'react-native';
import { CommonStyles } from './pathToCommonStyles';

import React from 'react';
import { View, Text } from 'react-native';

const MyTabItem = () => (
  <View style={styles.tabItem}>
    <Text>Tab Item Content</Text>
  </View>
);

export default MyTabItem;

const styles = StyleSheet.create({
  tabItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    gap: 10,
    ...CommonStyles.alignJustifyCenterRow, // Integrating CommonStyles using the spread operator
  },
});
```

## TypeScript Usage for Enhanced Type Safety

Leveraging TypeScript in your React Native project can significantly enhance the development experience by introducing type safety to your styles. Below is an example of how to define `CommonStyles` using TypeScript, ensuring that each style correctly adheres to the expected `ViewStyle` or `TextStyle` definitions:

```typescript
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { colors } from './colors'; // Assuming a separate module for color definitions

export const CommonStyles = StyleSheet.create({
  flex: {
    flex: 1,
  } as ViewStyle | TextStyle,
  flexJustifyCenter: {
    flex: 1,
    justifyContent: 'center',
  } as ViewStyle,
  flexAlignCenter: {
    flex: 1,
    alignItems: 'center',
  } as ViewStyle,
  flexRow: {
    flex: 1,
    flexDirection: 'row',
  } as ViewStyle,
  flexAlignRow: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  } as ViewStyle,
  flexAlignJustifyCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  row: {
    flexDirection: 'row',
  } as ViewStyle,
  rowReverse: {
    flexDirection: 'row-reverse',
  } as ViewStyle,
  justifyCenterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  } as ViewStyle,
  alignCenterRow: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,
  alignJustifyCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  alignJustifyCenterRow: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  } as ViewStyle,
  flexAlignJustifyCenterRow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  } as ViewStyle,
  alignCenterJustifyBetweenRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  } as ViewStyle,
  alginSelfCenter: {
    alignSelf: 'center',
  } as ViewStyle,
  none: {
    display: 'none',
  } as ViewStyle,
});
```

In this TypeScript-enhanced version, we explicitly define each style property to match either ViewStyle or TextStyle as appropriate. This not only clarifies the intended use of each style but also leverages TypeScript's type checking to prevent common errors, such as assigning incorrect values or using unsupported properties.
This approach combines the flexibility of React Native's styling system with the robustness of TypeScript, ensuring that your application's UI is both beautifully designed and resilient to type-related coding errors.
