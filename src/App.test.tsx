import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Components
import { TodoList } from "./todos";

// Test the mapping method of todo-items into a todo-list
test("The todo list maps the todo items correctly", () => {
  const mockTodos = [
    {
      id: "0",
      name: "Todo mock 0",
    },
    { id: "1", name: "Todo mock 1" },
  ];

  render(<TodoList todoList={mockTodos} />);

  expect(screen.getByText("Todo mock 0")).toBeInTheDocument();
  expect(screen.getByText("Todo mock 1")).toBeInTheDocument();
});
