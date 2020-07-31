import React, { FC } from 'react';

interface TodoProps {
  todo: ITodoItem;
}

export interface ITodoItem {
  _id: string;
  content: string;
  isFinished: boolean;
}

const TodoItem: FC<TodoProps> = ({ todo }: TodoProps) => (
  <div>{todo.content}</div>
);

export default TodoItem;
