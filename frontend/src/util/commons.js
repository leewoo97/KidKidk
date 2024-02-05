import axios from 'axios';
import { httpStatusCode } from './util/status.js';

const { VITE_SERVICE_BASE_URL } = import.meta.env;

// local vue api axios instance
function serverAxios() {
    const instance = axios.create({
        baseURL: VITE_SERVICE_BASE_URL,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            authorization: `Bearer ${test}`,
        },
    });

    return instance;
}

export { serverAxios };
