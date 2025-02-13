// src/api/axiosInterceptor.js
export const attachTokenInterceptor = (axiosInstance) => {
    axiosInstance.interceptors.request.use(config => {
        const token = localStorage.getItem("token"); // 获取 Token
        console.log("拦截器");
        if (token) {
            config.headers["Authorization"] = token; // 添加 Authorization
        }
        return config;
    }, error => {
        return Promise.reject(error);
    });
};