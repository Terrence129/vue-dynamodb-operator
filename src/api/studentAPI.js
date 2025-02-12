import axios from 'axios';

// 你的后端接口 URL
const apiBaseUrl = 'https://azu6dpq5he.execute-api.ap-southeast-2.amazonaws.com/dev';

const apiUserUrl = 'https://azu6dpq5he.execute-api.ap-southeast-2.amazonaws.com/dev/user';

export const studentAPI = {
    // GET 请求：获取学生信息
    getStudentInfo(studentID) {
        return axios.get(apiBaseUrl, {
            params: {
                studentID: studentID,
            }
        });
    },

    // POST 请求：创建学生信息
    createStudent(student) {
        return axios.post(apiBaseUrl, student);
    },

    // PUT 请求：更新学生信息
    updateStudent(studentID, student) {
        return axios.put(apiBaseUrl, student, {
            params: {
                studentID: studentID,
            }
        });
    },

    // DELETE 请求：删除学生信息
    deleteStudent(studentID) {
        return axios.delete(apiBaseUrl, {
            params: {
                studentID: studentID,
            }
        });
    },

    // GET: 获取所有学生列表
    queryStudentsList() {
        return axios.get(apiUserUrl, {})
    }
};