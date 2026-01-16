import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import Test from "./Test";

describe("Test", () => {
  it("renders the Test component", () => {
    render(<Test />);
    screen.debug();
  });
});
