import axios from 'axios';
import { CONFIG } from '../../config';

const Axios = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production' ? CONFIG.URL.BACKEND_URL : 'http://localhost:7333/api/'
});

Axios.interceptors.request.use(
  (config) => {
    if (config.headers === undefined) {
      config.headers = {};
    }

    config.headers['Authorization'] = `GETIR_TOKEN_TEST`;

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const httpGet = <T>(url: string): Promise<T> => {
  return Axios.get(url);
};

export const httpPost = <T>(url: string, body: any): Promise<T> => {
  return Axios.post(url, body);
};

export const httpDelete = <T>(url: string): Promise<T> => {
  return Axios.delete(url);
};

export const httpPatch = <T>(url: string, body: any): Promise<T> => {
  return Axios.patch(url, body);
};
