import React, { FC, useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import { ITodoItem } from '../components/TodoItem';
import TodosList from '../components/TodosList';
import { findOrCreatePage } from '../services/todos';
import TodoForm from '../components/TodoForm';
import { useTodos } from '../contexts/TodosContext';
import { TODO_CREATE_TYPE, TODO_DELETE_TYPE, TODO_UPDATE_TYPE } from '../config/constants';

interface TodosProps {
  path: string;
}

const Todos: FC<TodosProps> = ({ path }: TodosProps) => {
  // const [todos, setTodos] = useState<Array<ITodoItem>>([]);
  const [pageId, setPageId] = useState<string>('');
  const {
    setTodos, updateTodo, appendTodo, removeTodo,
  } = useTodos();

  useEffect(() => {
    const socket = socketIOClient('http://localhost:3000');
    socket.on('connect', () => {
      console.log('connected');
    });
    socket.on(pageId, (data: any) => {
      setTodos(data.todos);
    });
    socket.on(`${TODO_UPDATE_TYPE}${pageId}`, (data: any) => {
      console.log(data.todo);
      updateTodo(data.todo);
    });
    socket.on(`${TODO_CREATE_TYPE}${pageId}`, (data: any) => {
      console.log(data.todo);
      appendTodo(data.todo);
    });
    socket.on(`${TODO_DELETE_TYPE}${pageId}`, (data: any) => {
      console.log(data.todo);
      removeTodo(data.todo._id);
    });
  }, [pageId]);

  useEffect(() => {
    console.log(path);
    console.log('getting todos...');
    findOrCreatePage(path).then((response) => {
      console.log(response.data.page.todos);
      setTodos(response.data.page.todos);
      setPageId(response.data.page._id);
    });
  }, [path]);

  return (
    pageId === '' ? <div>loading...</div>
      : (
        <div className="container">
          <p className="path-title">{window.location.pathname}</p>
          <TodosList pageId={pageId} />
          <br />
          <TodoForm pageId={pageId} />
        </div>
      )
  );
};

export default Todos;
