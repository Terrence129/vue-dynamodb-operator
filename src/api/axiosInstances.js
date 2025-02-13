// src/api/axiosInstances.js
import axios from 'axios';
import { attachTokenInterceptor } from './axiosInterceptor';

// ✅ 创建 `authAPI` 专用的 Axios 实例
export const authAPI = axios.create({
    baseURL: "https://mlbbxd1191.execute-api.ap-southeast-2.amazonaws.com/dev",
    headers: { "Content-Type": "application/json" }
});

// ✅ 创建 `studentAPI` 专用的 Axios 实例
export const studentAPI = axios.create({
    baseURL: "https://azu6dpq5he.execute-api.ap-southeast-2.amazonaws.com/dev",
    headers: { "Content-Type": "application/json" }
});


// ✅ 给所有 API 添加 `Authorization` 拦截器
// attachTokenInterceptor(authAPI);
attachTokenInterceptor(studentAPI);