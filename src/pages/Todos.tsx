import React, { FC, useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import { HotKeys } from 'react-hotkeys';
import { CSVLink } from 'react-csv';
import { DownloadOutlined } from '@ant-design/icons';
import { ITodoItem } from '../components/TodoItem';
import TodosList from '../components/TodosList';
import { findOrCreatePage } from '../services/todos';
import TodoForm from '../components/TodoForm';
import { useTodos } from '../contexts/TodosContext';
import { TODO_CREATE_TYPE, TODO_DELETE_TYPE, TODO_UPDATE_TYPE } from '../config/constants';
import { devSocketUrl, productionSocketUrl } from '../services/api';
import PageUrls, { IPage } from '../components/PageUrls';

const keyMap = {
  SELECT_ALL: ['command+a', 'ctrl+a', 't', 'up'],
};

interface TodosProps {
  path: string;
}

const Todos: FC<TodosProps> = ({ path }: TodosProps) => {
  // const [todos, setTodos] = useState<Array<ITodoItem>>([]);
  const [pages, setPages] = useState<Array<IPage>>([]);
  const [pageId, setPageId] = useState<string>('');
  const {
    checkIfContainsTodo, setTodos, updateTodo, appendTodo, removeTodo, todos,
  } = useTodos();

  const selectAll = () => {
    // logic here
    console.log('all');
  };

  const handlers = {
    SELECT_ALL: selectAll,
  };

  useEffect(() => {
    const socket = socketIOClient(productionSocketUrl);
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
      console.log(todos);
      console.log(checkIfContainsTodo(data.todo._id));
      if (!checkIfContainsTodo(data.todo._id)) { // if doesnt contain the todo
        appendTodo(data.todo);
      }
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
      console.log(response.data.page);
      setPages(response.data.page.pages);
      setTodos(response.data.page.todos);
      setPageId(response.data.page._id);
    });
  }, [path]);

  const formatedTodos = () => (
    todos.map((todo) => ([todo.content]))
  );

  return (
    pageId === '' ? <div>loading...</div>
      : (
        <HotKeys keyMap={keyMap}>
          <div className="container">
            <HotKeys handlers={handlers}>
              <div className="d-flex align-items-center">
                <p className="path-title">{window.location.pathname}</p>
                <CSVLink
                  data={formatedTodos()}
                  filename={`${path}.csv`}
                >
                  <DownloadOutlined className="download-icon" />
                </CSVLink>
              </div>
              <PageUrls pages={pages} />
              <TodosList pageId={pageId} />
              <br />
              <TodoForm pageId={pageId} />
            </HotKeys>
          </div>
        </HotKeys>
      )
  );
};

export default Todos;
