import { expect, test, vi, describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom";

// Components
import { TodoList } from "./todos";
import App from "./App";

// Test the mapping method of todo-items into a todo-list.
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

// Test error handling in UI when todo list is empty
test("Display a message when the todo list is empty", () => {
  render(<TodoList todoList={[]} />);
  -expect(
    screen.getByText("Your list is empty. Please, add at least one task."),
  ).toBeInTheDocument();
});

// Correctly add a new todo item on button click
/*
test("Correctly add a new todo item on button click", ()=>{
  const trackAddTodo = vi.spyOn(exports, "addTodo");
  render(<addButton/>);
  userEvent.click(screen.getByText('+'));
  expect(addTodo).toHaveBeenCalledWith("+_clicked")
  const mockUserInput = "Do the shopping";

})
  */

describe("Behaviour of function addTodo", async () => {
  const user = userEvent.setup();
  render(<App />);
  const input = screen.getByPlaceholderText("Add a new task");
  await user.type(input, "This is a mocked input");

  const button = screen.getByRole(button, { name: "+" });
});
