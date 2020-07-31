import React, { FC, useState } from 'react';

const TodoForm: FC = () => {
  const [content, setContent] = useState<string>('');
  return <input type="text" placeholder="new todo..." value={content} />;
};

export default TodoForm;
