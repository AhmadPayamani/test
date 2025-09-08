// api.js
import axios from 'axios';
import {backendUrl, HomeRoute, UserLoginRoute} from '../../Routes';
import { toast } from 'react-toastify';

const api = axios.create({
    baseURL: backendUrl,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
});
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = token;
        }
        return config;
    },
    error => Promise.reject(error)
);
api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        // If 401 is returned, attempt to refresh the token
        if (error?.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({resolve, reject});
                })
                    .then(token => {
                        originalRequest.headers = Object.assign({}, originalRequest.headers, {
                            Authorization: token
                        });
                        console.log(originalRequest.headers)
                        return api(originalRequest);
                    })
                    .catch(err => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = localStorage.getItem('refresh_token');

            return new Promise((resolve, reject) => {
                axios.post(backendUrl + '/users/token/refresh/', {}, {
                    headers: {
                        'refresh': refreshToken
                    }
                })
                    .then(({data}) => {
                        localStorage.setItem('token', data.result.token)
                        localStorage.setItem('refresh_token', data.result.refresh_token)
                        api.defaults.headers['Authorization'] = data.result.token;
                        originalRequest.headers['Authorization'] = data.result.token;
                        originalRequest.headers = Object.assign({}, originalRequest.headers, {
                            Authorization: data.result.token
                        });
                        processQueue(null, data.result.token);
                        resolve(api(originalRequest));
                    })
                    .catch(err => {
                        processQueue(err, null);
                        reject(err);
                    })
                    .finally(() => {
                        isRefreshing = false;
                    });
            });
        }

        return Promise.reject(error);
    }
);

export const get = async (url, params,customHeaders =  {'Content-Type': 'application/json', 'Accept': 'application/json'}) => {
    try {
        const response = await api.get(url, {params:params,headers: { ...customHeaders }, maxRedirects: 5});
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const post = async (url, data,customHeaders =  {'Content-Type': 'application/json', 'Accept': 'application/json'}) => {
    try {
        const response = await api.post(url, data,{ headers: { ...customHeaders } , maxRedirects: 5});
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const put = async (url, data,customHeaders =  {'Content-Type': 'application/json', 'Accept': 'application/json'}) => {
    try {
        const response = await api.put(url, data,{ headers: { ...customHeaders }, maxRedirects: 5 });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const axiosDelete = async (url, data) => {
    try {
        const response = await api.delete(url, {
            data: data 
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const update = async (url, data) => {
    try {
        const response = await api.put(url, data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

const handleErrorToast = (error) => {
    toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
};

const handleError = (error) => {
    console.log({error})
    if (error.response && error.response.data.status && error?.message) {
        switch (error.response.data.status) {
            case 401:
                if (error?.response?.data?.message === "احراز هویت نشد." && ![UserLoginRoute, HomeRoute].includes(window.location.pathname))
                    handleErrorToast(error?.response?.data?.messages[0]?.detail?.message);
                break;
            case 400:
            case 402:
            case 404:
            case 500:
                handleErrorToast(error?.response?.data?.messages[0]?.detail?.message);
                break;
            case 403:
                handleErrorToast(error?.response?.data?.messages[0]?.detail?.message);
                break;
            case 423:
                handleErrorToast(error?.response?.data?.messages[0]?.detail?.message);
                // window.location.assign(page423);
                break;
            case 429:
                handleErrorToast(error?.response?.data?.messages[0]?.detail?.message);
                break;
            default:
                handleErrorToast('خطای ناشناخته رخ داده است.');
                break;
        }
    } else if (error.request) {
        handleErrorToast('ارتباط با سرور برقرار نیست.');
    }

    console.error('Error details:', error);

    throw error; 
}

// Other request methods (PUT, DELETE, etc.) can be added similarly .

export default api;


// async function fetchCities() {
//     try {
//         let userData = formDataJson;
//         const data = await post(getCities, userData);
//         setCities(data?.result?.cities)
//     } catch (error) {
//         if (error.response && error.response.status === 402) {
//             setErrors(error?.response?.data?.result?.errors);
//         }
//     }
// }/
// fetchCities();