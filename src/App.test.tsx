import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders boot sequence on load", () => {
  render(<App />);
  const bootText = screen.getByText(/AMBER OS/i);
  expect(bootText).toBeInTheDocument();
});
