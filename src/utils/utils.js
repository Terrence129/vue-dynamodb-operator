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
    }
};