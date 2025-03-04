import axios from 'axios';

// 创建axios实例
const http = axios.create({
    withCredentials: true, //异步请求携带cookie
    timeout: 5000,
    headers: {
        // 请求后端需要的传参类型
        'Content-Type': 'application/json',
        'X-Requested-With': ' XMLHttpRequest'
    }
});

// 添加请求拦截器
http.interceptors.request.use(config => {
    // 在请求发送之前做一些事情，比如添加 token
    // const token = localStorage.getItem('token');
    // if (token) {
    //     config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
}, error => {
    // 处理请求错误
    return Promise.reject(error);
});


// 添加响应拦截器
http.interceptors.response.use(response => {
    // 对响应数据做处理
    return response;
}, error => {
    // 处理响应错误
    if (error.response) {
        // 根据响应状态码进行错误处理
        switch (error.response.status) {
            case 401:
                console.error('Unauthorized access, redirecting to login');
                // 可以在此处跳转到登录页或其他处理逻辑
                break;
            case 404:
                console.error('Resource not found');
                break;
            default:
                console.error('An unexpected error occurred');
        }
    } else {
        console.error('Network error, please try again later');
    }
    return Promise.reject(error);
});

export default http;

