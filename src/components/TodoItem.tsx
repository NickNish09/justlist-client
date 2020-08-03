import React, { FC, useState } from 'react';
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
  const onChange = (e: any) => {
    const isFinished = e.target.checked;
    updateTodo(todo._id, isFinished).then((response) => {
      console.log(response.data);
      setChecked(isFinished);
    }).catch((err) => {
      console.log(err.response);
    });
  };
  return (
    <div>
      <Checkbox onChange={onChange} checked={checked}>
        <span className={checked ? 'text-striked' : 'text-todo'}>{todo.content}</span>
      </Checkbox>
    </div>
  );
};

export default TodoItem;
