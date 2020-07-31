import React, { FC, useState } from 'react';

interface ITodoItem {
  content: string;
  isFinished: boolean;
}

const Todos: FC = () => {
  const [todos, setTodos] = useState<Array<ITodoItem>>([]);
  return (
    <div>
      <p className="path-title">{window.location.pathname}</p>
    </div>
  );
};

export default Todos;
