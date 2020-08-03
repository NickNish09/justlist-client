import React, { FC, useState } from 'react';
import { Checkbox } from 'antd';

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
    setChecked(e.target.checked);
  };
  return (
    <div>
      <Checkbox onChange={onChange} checked={checked}>{todo.content}</Checkbox>
    </div>
  );
};

export default TodoItem;
