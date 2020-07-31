import { AxiosResponse } from 'axios';
import api from './api';

export const findOrCreatePage = (pageUrl: string): Promise<AxiosResponse> => (
  api.get(`/pages${pageUrl}`)
);
