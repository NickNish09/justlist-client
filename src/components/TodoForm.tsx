import React, { FC, useState } from 'react';
import { ITodoItem } from './TodoItem';
import { createTodo } from '../services/todos';
import { useTodos } from '../contexts/TodosContext';

interface TodoFormProps {
  todo?: ITodoItem;
  pageId: string;
}

const TodoForm: FC<TodoFormProps> = ({ todo, pageId }: TodoFormProps) => {
  const [content, setContent] = useState<string>(todo ? todo.content : '');
  const { appendTodo } = useTodos();

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      console.log(content);
      createTodo(pageId, content).then((response) => {
        setContent('');
        console.log(response.data);
        appendTodo(response.data.todo);
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
