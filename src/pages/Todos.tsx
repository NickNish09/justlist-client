import React, { FC, useEffect, useState } from 'react';
import { ITodoItem } from '../components/TodoItem';
import TodosList from '../components/TodosList';
import { findOrCreatePage } from '../services/todos';

interface TodosProps {
  path: string;
}

const Todos: FC<TodosProps> = ({ path }: TodosProps) => {
  const [todos, setTodos] = useState<Array<ITodoItem>>([
    { _id: '1', content: 'buy bread', isFinished: false },
  ]);

  useEffect(() => {
    console.log('getting todos...');
    findOrCreatePage(path).then((response) => {
      console.log(response.data.page.todos);
      setTodos(response.data.page.todos);
    });
  }, [path]);

  return (
    <div>
      <p className="path-title">{window.location.pathname}</p>
      <TodosList todos={todos} />
    </div>
  );
};

export default Todos;
