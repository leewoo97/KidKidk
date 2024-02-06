import axios from 'axios';

import { getCookie } from './cookieUtil.js';

const { VITE_SERVICE_BASE_URL } = import.meta.env;

// local vue api axios instance
const access_token = getCookie('access_token');

function serverAxios() {
    const instance = axios.create({
        baseURL: VITE_SERVICE_BASE_URL,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            authorization: `Bearer ${access_token}`,
        },
    });

    return instance;
}

export { serverAxios };
