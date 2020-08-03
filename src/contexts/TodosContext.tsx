import React, { createContext, useState, useContext } from 'react';
import { ITodoItem } from '../components/TodoItem';

interface ContextProps {
  todos: Array<ITodoItem>;
  setTodos(data: Array<ITodoItem>): void;
  appendTodo(todo: ITodoItem): void;
}

export const TodosContext = createContext<ContextProps>(
  { todos: [], setTodos() {}, appendTodo() {} },
);

const TodosProvider = ({ children }: any) => {
  const [todos, setTodos] = useState<Array<ITodoItem>>([]);

  const todosObject = {
    todos,
    setTodos: (data: Array<ITodoItem>) => setTodos(data),
    appendTodo: (todo: ITodoItem) => setTodos((prevTodos: Array<ITodoItem>) => (
      [...prevTodos, todo])),
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
