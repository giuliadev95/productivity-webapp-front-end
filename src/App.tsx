import "./App.css";
import { todos, TodoList } from "./todos";
function App() {
  return (
    <>
      <h1>Todo List</h1>
      <TodoList todoList={todos} />
    </>
  );
}

export default App;
