import React, { FC, useCallback } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import TodoItem, { ITodoItem } from './TodoItem';
import { useTodos } from '../contexts/TodosContext';
import { updateTodosOrder } from '../services/pages';

interface ITodoItemIndex {
  todo: ITodoItem;
  sortIndex: number;
}

interface ISortEnd{
  oldIndex: number
  newIndex: number
}

interface TodoListProps {
  pageId: string
}

const TodosList: FC<TodoListProps> = ({ pageId }: TodoListProps) => {
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

  const updateTodosOrderRequest = (newTodos: Array<ITodoItem>) => {
    const formatedArray = newTodos.map((todo, index) => ({ position: index, todoId: todo._id }));
    updateTodosOrder(pageId, formatedArray).then((response) => {
      console.log(response.data);
    }).catch((err) => console.log(err));
  };

  const onSortEnd = ({ oldIndex, newIndex }: ISortEnd) => {
    const newTodos = arrayMove(todos, oldIndex, newIndex);
    setTodos(newTodos);
    updateTodosOrderRequest(newTodos);
  };

  return (
    <SortableList onSortEnd={onSortEnd} />
  );
};
export default TodosList;
