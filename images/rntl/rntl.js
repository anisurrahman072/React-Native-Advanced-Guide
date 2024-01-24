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
