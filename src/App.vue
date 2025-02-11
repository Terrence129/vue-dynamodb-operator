<style scoped>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

h3 {
  font-size: 1.5rem;
  margin: 1rem 0;
}

/* 使每个 form-group 独占一行 */
.form-group {
  width: 300px;
  margin: 100px auto;
  padding: 20px;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  text-align: center;
  display: block;
}

input,
button {
  width: 100%;
  max-width: 300px;
}

input {
  padding: 8px;
  margin: 5px 0;
  width: 250px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 8px 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #358f6e;
}

.student-info p {
  margin: 5px 0;
  font-size: 1rem;
}
</style>

<template >
  <div id="app" >


    <div style="text-align: center;">

      <div >
        <h1 style="display: block; width: 100%">Student Records Operator</h1>
      </div>
      <!-- get -->
      <div class="form-group" >
        <label for="studentID">Please enter studentID:</label>
        <input v-model="studentID" id="studentID" placeholder="studentID" />
        <button @click="getStudentInfo">Get Student Info</button>
        <div v-if="studentInfo" class="student-info">
          <!-- 当 msg 不为空时，只显示 msg -->
          <div v-if="studentInfo.msg">
            <p><strong>msg:</strong> {{ studentInfo.msg }}</p>
          </div>

          <!-- 当 msg 为空时，显示其他学生信息 -->
          <div v-else>
            <p><strong>studentID:</strong> {{ studentInfo.studentID }}</p>
            <p><strong>name:</strong> {{ studentInfo.sName }}</p>
            <p><strong>age:</strong> {{ studentInfo.Age }}</p>
            <p><strong>gender:</strong> {{ studentInfo.Gender }}</p>
            <p><strong>major:</strong> {{ studentInfo.Major }}</p>
          </div>
        </div>
      </div>

      <!-- post -->
      <div class="form-group">
        <h3>Add Student</h3>
        <input v-model="newStudent.studentID" placeholder="studentID" />
        <input v-model="newStudent.name" placeholder="name" />
        <input v-model="newStudent.age" placeholder="age" type="number" />
        <input v-model="newStudent.gender" placeholder="gender" />
        <input v-model="newStudent.major" placeholder="major" />
        <button @click="createStudent">Add Student</button>
        <div v-if="createMsg">
          <p><strong>msg:</strong> {{ createMsg }}</p>
        </div>
      </div>

      <!-- put -->
      <div class="form-group">
        <h3>Update student info</h3>
        <input v-model="updateID" placeholder="studentID" />
        <input v-model="updatedStudent.name" placeholder="name" />
        <input v-model="updatedStudent.age" placeholder="age" type="number" />
        <input v-model="updatedStudent.gender" placeholder="gender" />
        <input v-model="updatedStudent.major" placeholder="major" />
        <button @click="updateStudent">Update Student Info</button>
        <div v-if="updateMsg">
          <p><strong>msg:</strong> {{ updateMsg }}</p>
        </div>
      </div>

      <!-- delete -->
      <div class="form-group">
        <h3>Delete Student</h3>
        <input v-model="deleteID" placeholder="studentID" />
        <button @click="deleteStudent">Delete Student</button>
        <div v-if="deleteMsg">
          <p><strong>msg:</strong> {{ deleteMsg }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from './api';

export default {
  data() {
    return {
      studentID: '',
      studentInfo: null,
      newStudent: {
        studentID: '',
        name: '',
        age: '',
        gender: '',
        major: ''
      },
      createMsg: null,
      updateID: '',
      updatedStudent: {
        name: '',
        age: '',
        gender: '',
        major: ''
      },
      updateMsg: null,
      deleteID: '',
      deleteMsg: null
    };
  },
  methods: {
    // get
    getStudentInfo() {
      api.getStudentInfo(this.studentID)
          .then(response => {
            console.log(response.data);
            this.studentInfo = JSON.parse(response.data);
          })
          .catch(error => {
            console.error('Error fetching student info:', error);
          });
    },
    // post
    createStudent() {
      api.createStudent(this.newStudent)
          .then(response => {
            console.log('Student created:', response.data);
            this.createMsg = response.data;
          })
          .catch(error => {
            console.error('Error creating student:', error);
            this.createMsg = error.data;
          });
    },
    // put
    updateStudent() {
      api.updateStudent(this.updateID, this.updatedStudent)
          .then(response => {
            console.log('Student updated:', response.data);
            this.updateMsg = response.data;
          })
          .catch(error => {
            console.error('Error updating student:', error);
            this.updateMsg = error.data;
          });
    },
    // delete
    deleteStudent() {
      api.deleteStudent(this.deleteID)
          .then(response => {
            console.log('Student deleted:', response.data);
            this.deleteMsg = response.data;
          })
          .catch(error => {
            console.error('Error deleting student:', error);
            this.deleteMsg = error.data;
          });
    }
  }
};
</script>

