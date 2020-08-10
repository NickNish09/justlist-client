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
  updateTodo(todo: ITodoItem): void;
  removeTodo(todoId: string): void;
  checkIfContainsTodo(todoId: string): boolean;
}

export const TodosContext = createContext<ContextProps>(
  {
    todos: [],
    setTodos() {},
    appendTodo() {},
    removeTodo() {},
    updateTodo() {},
    checkIfContainsTodo() { return false; },
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
    updateTodo: (todo: ITodoItem) => setTodos((prevTodos: Array<ITodoItem>) => {
      const index = prevTodos.findIndex(
        (x) => x._id === todo._id,
      );
      if (index === -1) {
        console.log('nao encontrado');
        return prevTodos;
      }
      return [
        ...prevTodos.slice(0, index),
        { ...prevTodos[index], ...todo },
        ...prevTodos.slice(index + 1),
      ];
    }),
    checkIfContainsTodo: (todoId: string) => todos.some((td) => td._id === todoId),
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
