import React, { FC } from 'react';
import TodoItem, { ITodoItem } from './TodoItem';

interface TodosListProps {
  todos: Array<ITodoItem>;
}

const TodosList: FC<TodosListProps> = ({ todos }: TodosListProps) => (
  <div>
    {todos.map((todo, index) => (
      <TodoItem todo={todo} key={todo._id} index={index} />
    ))}
  </div>
);

export default TodosList;
