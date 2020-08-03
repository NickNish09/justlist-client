import React, { FC, useEffect, useState } from 'react';
import { ITodoItem } from '../components/TodoItem';
import TodosList from '../components/TodosList';
import { findOrCreatePage } from '../services/todos';
import TodoForm from '../components/TodoForm';
import { useTodos } from '../contexts/TodosContext';

interface TodosProps {
  path: string;
}

const Todos: FC<TodosProps> = ({ path }: TodosProps) => {
  // const [todos, setTodos] = useState<Array<ITodoItem>>([]);
  const [pageId, setPageId] = useState<string>('');
  const { todos, setTodos } = useTodos();

  useEffect(() => {
    console.log(path);
    console.log('getting todos...');
    findOrCreatePage(path).then((response) => {
      console.log(response.data.page.todos);
      setTodos(response.data.page.todos);
      setPageId(response.data.page._id);
    });
  }, [path]);

  return (
    <div className="container">
      <p className="path-title">{window.location.pathname}</p>
      <TodosList todos={todos} />
      <TodoForm pageId={pageId} />
    </div>
  );
};

export default Todos;
