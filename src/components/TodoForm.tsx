import React, { FC, useState } from 'react';
import { createTodo } from '../services/todos';
import { useTodos } from '../contexts/TodosContext';

interface TodoFormProps {
  pageId: string;
}

const TodoForm: FC<TodoFormProps> = ({ pageId }: TodoFormProps) => {
  const [content, setContent] = useState<string>('');
  const { appendTodo } = useTodos();

  const handleKeyDown = (e: any) => {
    console.log(e.key);
    if (e.key === 'Enter') {
      console.log(content);
      createTodo(pageId, content).then((response) => {
        setContent('');
        console.log(response.data);
        // appendTodo(response.data.todo);
      }).catch((err) => {
        console.log(err.response);
      });
    } else if (e.key === 'Backspace' || e.key === 'Delete') {
      if (content === '') {
        console.log('blur');
        const todosInputs = document.querySelectorAll('input[type="text"]');
        window.setTimeout(() => {
          (todosInputs[todosInputs.length - 2] as HTMLElement).focus();
        }, 0);
        // document.forms[0].elements[9 - 1].focus();
      }
    }
  };
  return (
    <input
      type="text"
      placeholder="new todo..."
      value={content}
      onKeyDown={(e) => handleKeyDown(e)}
      onChange={(e) => setContent(e.target.value)}
      autoFocus
      className="todo-form-input"
    />
  );
};

export default TodoForm;
