import React, { FC } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import TodoItem, { ITodoItem } from './TodoItem';
import { useTodos } from '../contexts/TodosContext';

interface ITodoItemIndex {
  todo: ITodoItem;
  sortIndex: number;
}

interface ISortEnd{
  oldIndex: number
  newIndex: number
}

const TodosList: FC = () => {
  const { todos, setTodos } = useTodos();
  const SortableItem = SortableElement(
    ({ todo, sortIndex }: ITodoItemIndex) => (
      <TodoItem todo={todo} key={todo._id} index={sortIndex} />
    ),
  );

  const SortableList = SortableContainer(() => (
    <div>
      {todos.map((todo, index) => (
        <SortableItem key={`item-${todo._id}`} index={index} sortIndex={index} todo={todo} />
      ))}
    </div>
  ));

  const onSortEnd = ({ oldIndex, newIndex }: ISortEnd) => {
    setTodos(arrayMove(todos, oldIndex, newIndex));
  };

  return <SortableList onSortEnd={onSortEnd} />;
};
export default TodosList;
