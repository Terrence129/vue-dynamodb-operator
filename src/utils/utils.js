// src/utils/utils.js
export const utils = {
    // 判断是否为空
    isEmpty(value) {
        return value == null || value === '';
    },

    // 格式化日期
    formatDate(date) {
        const d = new Date(date);
        return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
    },

    // 返回上一页
    goBack() {
        window.history.back();
    },

    // 统一错误处理
    processError(error) {
        if (error.response) {
            return error.response.data ? error.response.data.message || error.response.data : "Server returned an error.";
        } else if (error.request) {
            return "No response from server. Please check your network.";
        } else {
            return "Request error: " + error.message;
        }
    }
};