import App from "../App";
import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

test("タイトルが表示されること", () => {
  render(<App />);
  const title = screen.getByTestId("title");
  expect(title).toHaveTextContent("学習記録一覧");
});
