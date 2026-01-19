// React
import { useState } from "react";

// Styles
import "./App.css";

// Components
import { todos, TodoList } from "./todos";

function App() {
  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useState(TodoList);

  
  const addTodo(input){
    updatedTodoList = [..., newTodo]
    setTodoList(updatedTodoList)
    return TodoList
  }


  return (
    <>
      <h1>My tasks</h1>
      <label htmlFor="add-todo">Add task</label>
      <input id="add-todo" placeholder="Add new task" value={input} onChange={(e)=> setInput(e.target.value) }/>
      <button type="button" onClick={addTodo}>+</button>
      <TodoList todoList={todos} />
    </>
  );
}

export default App;
