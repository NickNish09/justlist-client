import React, { createContext, useState, useContext } from 'react';

interface ITodoItem {
  _id: string;
  content: string;
  isFinished: boolean;
}

interface ContextProps {
  todos: Array<ITodoItem>;
  setTodos(data: Array<ITodoItem>): void;
  appendTodo(todo: ITodoItem): void;
  removeTodo(todoId: string): void;
}

export const TodosContext = createContext<ContextProps>(
  {
    todos: [], setTodos() {}, appendTodo() {}, removeTodo() {},
  },
);

const TodosProvider = ({ children }: any) => {
  const [todos, setTodos] = useState<Array<ITodoItem>>([]);

  const todosObject = {
    todos,
    setTodos: (data: Array<ITodoItem>) => setTodos(data),
    appendTodo: (todo: ITodoItem) => setTodos((prevTodos: Array<ITodoItem>) => (
      [...prevTodos, todo])),
    removeTodo: (todoId: string) => setTodos(
      (prevTodos: Array<ITodoItem>) => (prevTodos.filter((todo: ITodoItem) => todo._id !== todoId)),
    ),
  };

  return (
    <TodosContext.Provider value={todosObject}>
      {children}
    </TodosContext.Provider>
  );
};

export default TodosProvider;

export const useTodos = () => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error('useTodos must be used within TodosProvider');
  }

  return context;
};
