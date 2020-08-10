import axios from 'axios';

export const devUrl = 'http://localhost:3000/v1/';
export const devSocketUrl = 'http://localhost:3000';
export const productionUrl = 'https://justlist-api.tk/v1/';
export const productionSocketUrl = 'https://justlist-api.tk';

export const baseURL = devUrl;

const api = axios.create({
  baseURL,
});

export default api;
