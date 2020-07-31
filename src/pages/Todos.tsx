import React, { FC, useState } from 'react';
import { ITodoItem } from '../components/TodoItem';
import TodosList from '../components/TodosList';

const Todos: FC = () => {
  const [todos, setTodos] = useState<Array<ITodoItem>>([
    { _id: '1', content: 'buy bread', isFinished: false },
  ]);
  return (
    <div>
      <p className="path-title">{window.location.pathname}</p>
      <TodosList todos={todos} />
    </div>
  );
};

export default Todos;
