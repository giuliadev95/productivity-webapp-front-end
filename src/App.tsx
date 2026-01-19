// React
import { useState } from "react";
// Styles
import "./App.css";
// Components
import { TodoList } from "./todos";
// Helpers
import { createTodo, type Todo } from "./todos";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  function addTodo() {
    setTodos((prev) => [...prev, createTodo("mock todo")]);
  }
  return (
    <>
      <h1>My tasks</h1>

      <button type="button" onClick={addTodo}>
        +
      </button>

      <TodoList todoList={todos} />
    </>
  );
}

export default App;
