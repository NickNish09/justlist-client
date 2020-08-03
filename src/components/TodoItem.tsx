import React, { FC, useRef, useState } from 'react';
import { Checkbox } from 'antd';
import { deleteTodo, updateTodo } from '../services/todos';
import { useTodos } from '../contexts/TodosContext';

interface TodoProps {
  todo: ITodoItem;
  index: number;
}

export interface ITodoItem {
  _id: string;
  content: string;
  isFinished: boolean;
}

const TodoItem: FC<TodoProps> = ({ todo, index }: TodoProps) => {
  const [checked, setChecked] = useState<boolean>(todo.isFinished);
  const [content, setContent] = useState<string>(todo.content);
  const doneTypingInterval = 1000;
  const [typingTimer, setTypingTimer] = useState<number>(0);
  const todoInput = useRef<HTMLInputElement>(null);
  const { removeTodo } = useTodos();

  const onCheck = (e: any) => {
    const isFinished = e.target.checked;
    setChecked(isFinished);
    updateTodo(todo._id, isFinished).then((response) => {
      console.log(response.data);
    }).catch((err) => {
      console.log(err.response);
      setChecked(!isFinished);
    });
  };

  const onChangeText = (e: any) => {
    setContent(e.target.value);
  };

  const onStopTyping = () => {
    updateTodo(todo._id, checked, content).then((response) => {
      console.log(response);
    }).catch((err) => {
      console.log(err.response);
    });
  };

  const onKeyUp = (e: any) => {
    console.log(e.key);
    if (e.key === 'Enter') {
      onStopTyping();
      window.clearTimeout(typingTimer);
      todoInput!.current!.blur();
      const todosInputs = document.querySelectorAll('input[type="text"]');
      window.setTimeout(() => {
        (todosInputs[index + 1] as HTMLElement).focus(); // focus previous input
      }, 0);
    } else {
      window.clearTimeout(typingTimer);
      setTypingTimer(window.setTimeout(onStopTyping, doneTypingInterval));
    }
  };

  const onKeyDown = (e: any) => {
    if ((e.key === 'Backspace' || e.key === 'Delete') && content === '') {
      // delete todo
      deleteTodo(todo._id).then((response) => {
        removeTodo(todo._id);
        console.log(response.data);
      }).catch((err) => console.log(err.response));

      const todosInputs = document.querySelectorAll('input[type="text"]');
      window.setTimeout(() => {
        (todosInputs[index - 1] as HTMLElement).focus(); // focus previous input
      }, 0);
    }
  };

  return (
    <div>
      <Checkbox onChange={onCheck} checked={checked}>
        <input
          className={checked ? 'text-striked' : 'text-todo'}
          type="text"
          value={content}
          onChange={onChangeText}
          onKeyUp={onKeyUp}
          onKeyDown={onKeyDown}
          ref={todoInput}
        />
      </Checkbox>
    </div>
  );
};

export default TodoItem;
