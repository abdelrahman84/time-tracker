import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL as string,
});

const errorHandler = (error: any) => {
  const statusCode = error.response?.status;

  if (statusCode && statusCode !== 401) {
    console.log(error);
  }

  return Promise.reject(error);
};

client.interceptors.response.use(undefined, (error) => {
  return errorHandler(error);
});

export default client;
