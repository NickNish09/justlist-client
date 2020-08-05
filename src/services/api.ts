import axios from 'axios';

export const devUrl = 'http://localhost:3000/v1/';
export const productionUrl = 'https://justlist-api.tk/v1/';
export const productionSocketUrl = 'https://justlist-api.tk';

export const baseURL = productionUrl;

const api = axios.create({
  baseURL,
});

export default api;
