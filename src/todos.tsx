type Todo = {
  id: string;
  name: string;
};

type CompleteTodo = Required<Todo>;
type TodoList = CompleteTodo[];

interface TodoListProps {
  todoList: TodoList;
}

export const todos: TodoList = [];

export const TodoList = (
  { todoList }: TodoListProps, // properties are: TodoList corresponsing to the array of 'todos' objects - I'll have to import them aside TodoList in the App.tsx
) => {
  if (todoList.length === 0) {
    return <p>Your list is empty. Please, add at least one task.</p>;
  }
  return (
    <ul>
      {todoList.map((todo) => {
        return <li key={todo.id}>{todo.name}</li>;
      })}
    </ul>
  );
};
