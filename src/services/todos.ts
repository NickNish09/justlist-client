import { AxiosResponse } from 'axios';
import api from './api';

export const findOrCreatePage = (pageUrl: string): Promise<AxiosResponse> => (
  api.post('/pages/findOrCreate', { pageUrl })
);

export const createTodo = (page: string, content: string): Promise<AxiosResponse> => (
  api.post('/todos', { page, content })
);

export const updateTodo = (todoId: string, isFinished?: boolean, content?: string):
  Promise<AxiosResponse> => (
  api.put(`/todos/${todoId}`, { content, isFinished })
);
