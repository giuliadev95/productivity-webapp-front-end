type Todo = {
  id: string;
  name: string;
};
type TodoList = Todo[];

interface TodoListProps {
  todoList: TodoList;
}

export const todos: TodoList = [
  {
    id: "0",
    name: "Fare la spesa",
  },
  {
    id: "1",
    name: "Annaffiare le piante",
  },
];

export const TodoList = (
  { todoList }: TodoListProps, // properties are: TodoList corresponsing to the array of 'todos' objects - I'll have to import them aside TodoList in the App.tsx
) => (
  <ul>
    {todoList.map((todo) => {
      return <li key={todo.id}>{todo.name}</li>;
    })}
  </ul>
);
