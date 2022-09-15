import axios from 'axios';

const apiClient = axios.create({
    headers: {
        "Content-Type": 'application/json'
    },
    baseURL: process.env.REACT_APP_TEST_SERVER
});

// 요청 interceptor 정의
apiClient.interceptors.request.use(
    config => {
        // const token = localStorage.getItem('accessToken');
        const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1IiwiaXNzIjoic3BhcnJvdyIsImlhdCI6MTY2MzI0NTU2NCwiZXhwIjoxNjY1ODM3NTY0fQ.xrwLFkncoleZu-V2UJftWp8vT2jD2ryrk99PyAObuvtAClLGU6scSeDTR-IyEYWhIuF0sKSuk1G4-qKUU7e6bg';
        config.headers.common['Authorization'] = `Bearer ${token}`;
        return config;
    },
    error => {
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