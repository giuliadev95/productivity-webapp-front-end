// React
import { useState, useEffect } from "react";
// axios
import axios from "axios";
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

  // Fetch the string "green" from an endpoint .NET minimal Web API
  const [fetch, setFetch] = useState<string>("");

  useEffect(() => {
    axios
      .get("https://localhost:7234/green")
      .then((res) => {
        const string = res.data;
        console.log(string);
        setFetch(string);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

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
      {/** FETCHED DATA FROM .NET MINIMAL WEB API : "green" */}
      <h2 className="text-blue-600 font-bold mt-5">
        This is the text fetched from the external Minimal Web API:
      </h2>
      <p>{fetch}</p>
    </>
  );
}

export default App;
