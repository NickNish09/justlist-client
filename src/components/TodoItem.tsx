import React, { FC, useRef, useState } from 'react';
import { Checkbox } from 'antd';
import { updateTodo } from '../services/todos';

interface TodoProps {
  todo: ITodoItem;
}

export interface ITodoItem {
  _id: string;
  content: string;
  isFinished: boolean;
}

const TodoItem: FC<TodoProps> = ({ todo }: TodoProps) => {
  const [checked, setChecked] = useState<boolean>(todo.isFinished);
  const [content, setContent] = useState<string>(todo.content);
  const doneTypingInterval = 1000;
  const [typingTimer, setTypingTimer] = useState<number>(0);
  const todoInput = useRef<HTMLInputElement>(null);

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
    if (e.key === 'Enter') {
      onStopTyping();
      window.clearTimeout(typingTimer);
      todoInput!.current!.blur();
    } else {
      window.clearTimeout(typingTimer);
      setTypingTimer(window.setTimeout(onStopTyping, doneTypingInterval));
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
          ref={todoInput}
        />
      </Checkbox>
    </div>
  );
};

export default TodoItem;
