import api from './api';

export const getTodosByPage = (pageUrl: string) => (
  api.get(`/pages/${pageUrl}`)
);
