import { AxiosResponse } from 'axios';
import api from './api';

export const updateTodosOrder = (pageId: string,
  todosOrder: Array<{position: number, todoId: string}>):
  Promise<AxiosResponse> => (
  api.post(`/pages/${pageId}/updateTodosOrders`, { todosOrder })
);
