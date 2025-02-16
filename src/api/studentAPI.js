import { studentAPI } from './axiosInstances';


export const studentService = {
    getStudentInfo(studentId) {
        return studentAPI.get("/", {
            params: {
                studentID: studentId
            }
        });
    },

    createStudent(studentInfo){
        return studentAPI.post("/", studentInfo);
    },

    updateStudent(studentId, editInfo){
        return studentAPI.put("/", editInfo, {
            params: {
                studentID: studentId,
            }
        });
    },

    deleteStudent(studentId) {
        return studentAPI.delete("/", {
            params: {
                studentID: studentId
            }
        });
    },

    queryStudentsList(){
        return studentAPI.get("/user");
    }
};
