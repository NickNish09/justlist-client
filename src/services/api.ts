import axios from 'axios';

const devUrl = 'http://localhost:3000/v1/';
const productionUrl = 'https://rivalry-api.tk/v1/';

export const baseURL = devUrl;

const api = axios.create({
  baseURL,
});

export default api;
