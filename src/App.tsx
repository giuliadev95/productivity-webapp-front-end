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
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  function addTodo() {
    if (input == "") {
      setError(true);
      return;
    }
    setError(false);
    setTodos((prev) => [...prev, createTodo(input)]);
    setInput("");
  }
  return (
    <>
      <h1>My tasks</h1>
      <label htmlFor="add-task">Add task</label>
      <div className="flex">
        <input
          id="add-task"
          placeholder="Add a new task"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="button" onClick={addTodo}>
          +
        </button>
      </div>
      {error && (
        <span className="text-red-700">You can't add an empty task!</span>
      )}
      <TodoList todoList={todos} />
    </>
  );
}

export default App;
