import React, { FC, useState } from 'react';
import { ITodoItem } from './TodoItem';
import { createTodo } from '../services/todos';

interface TodoFormProps {
  todo?: ITodoItem;
  setTodos: any;
  pageId: string;
}

const TodoForm: FC<TodoFormProps> = ({ todo, setTodos, pageId }: TodoFormProps) => {
  const [content, setContent] = useState<string>(todo ? todo.content : '');

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      console.log(content);
      createTodo(pageId, content).then((response) => {
        setContent('');
        console.log(response.data);
        setTodos((prevTodos: Array<ITodoItem>) => [...prevTodos, response.data.todo]);
      }).catch((err) => {
        console.log(err.response);
      });
    }
  };
  return (
    <input
      type="text"
      placeholder="new todo..."
      value={content}
      onChange={(e) => setContent(e.target.value)}
      autoFocus
      onKeyPress={(e) => handleKeyPress(e)}
    />
  );
};

TodoForm.defaultProps = {
  todo: { _id: '', isFinished: false, content: '' },
};

export default TodoForm;
