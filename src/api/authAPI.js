// src/api/authAPI.js
import { authAPI } from './axiosInstances';

export const authService = {
    login(credentials) {
        return authAPI.post("/", credentials);
    },
};