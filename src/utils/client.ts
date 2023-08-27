import axios from "axios";
import configData from '../config.json';

const client = axios.create({
    baseURL: configData.REACT_APP_BASE_URL
});

const errorHandler = (error: any) => {
    const statusCode = error.response?.status;

    if (statusCode && statusCode !== 401) {
        console.log(error);
    }

    return Promise.reject(error);
}

client.interceptors.response.use(undefined, (error) => {
    return errorHandler(error);
});

export default client;