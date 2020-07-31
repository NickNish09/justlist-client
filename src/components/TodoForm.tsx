import React, { FC, useState } from 'react';
import { ITodoItem } from './TodoItem';

interface TodoFormProps {
  todo?: ITodoItem;
}

const TodoForm: FC<TodoFormProps> = ({ todo }: TodoFormProps) => {
  const [content, setContent] = useState<string>(todo ? todo.content : '');
  return <input type="text" placeholder="new todo..." value={content} />;
};

TodoForm.defaultProps = {
  todo: { _id: '', isFinished: false, content: '' },
};

export default TodoForm;
