import axios from 'axios';

export const devUrl = 'http://localhost:3000/v1/';
export const productionUrl = 'http://161.35.125.224:3000/v1/';

export const baseURL = productionUrl;

const api = axios.create({
  baseURL,
});

export default api;
