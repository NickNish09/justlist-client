import { AxiosResponse } from 'axios';
import api from './api';

export const findOrCreatePage = (pageUrl: string): Promise<AxiosResponse> => (
  api.post('/pages/findOrCreate', { pageUrl })
);

export const createTodo = (page: string, content: string): Promise<AxiosResponse> => (
  api.post('/todos', { page, content })
);
