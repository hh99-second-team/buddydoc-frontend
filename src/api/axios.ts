import Axios, { type CreateAxiosDefaults } from 'axios';

const API_ROOT = process.env.REACT_APP_API_ROOT;

const axiosConfig: CreateAxiosDefaults = {
  baseURL: API_ROOT,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // CORS 문제 해결
  },
  //   withCredentials: true,
  timeout: 2500,
};

const axios = Axios.create(axiosConfig);

axios.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      request.headers['Authorization'] = `Bearer ${token}`;
    }

    // refreshToken();
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axios };
