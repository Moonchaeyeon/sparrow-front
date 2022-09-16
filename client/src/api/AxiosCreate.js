import axios from 'axios';

const apiClient = axios.create({
    headers: {
        "Content-Type": 'application/json'
    },
    baseURL: `${process.env.REACT_APP_TEST_SERVER}/api/v1/`
});

// 요청 interceptor 정의
apiClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('accessToken');
        config.headers.common['Authorization'] = `Bearer ${token}`;
        return config;
    },
    async error => {
        console.log(error);
        return Promise.reject(error);
    }
)

// 응답 interceptor 정의
apiClient.interceptors.response.use(
    config => {
        return config
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
)

const { get, post, put, delete: destroy } = apiClient;
export { get, post, put, destroy };