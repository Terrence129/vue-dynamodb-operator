<!-- src/components/StudentManagePage.vue -->

<template>
  <div>
    <div style="text-align: center; width: 100%">
      <h1 style="width: 100%; display: block">Student Records Operator</h1>
      <button @click="logout" class="fixed-button">Logout</button>
      <div class="form-group">
        <button @click="goToStudentsList">See all students</button>
      </div>
      <!-- get -->
      <div class="form-group">
        <label for="studentID">Please enter studentID:</label>
        <input v-model="studentID" id="studentID" placeholder="studentID" />
        <button @click="getStudentInfo">Get Student Info</button>
        <div v-if="studentInfo" class="student-info">
          <div v-if="studentInfo.msg">
            <p><strong>msg:</strong> {{ studentInfo.msg }}</p>
          </div>
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
import { studentAPI } from '../api/studentAPI.js';

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
    logout() {
      this.$router.push('/');
    },
    goToStudentsList() {
      this.$router.push('/students/list');  // 跳转到学生列表页面
    },
    getStudentInfo() {
      if (!this.studentID) {
        this.studentInfo= {msg: "You must enter studentID"};
      }else {
        studentAPI.getStudentInfo(this.studentID)
          .then(response => {
            console.log(response.data);
            this.studentInfo = JSON.parse(response.data);
          })
          .catch(error => {
            console.error('Error fetching student info:', error);
          });
      }

    },
    createStudent() {
      studentAPI.createStudent(this.newStudent)
          .then(response => {
            console.log('Student created:', response.data);
            this.createMsg = response.data;
          })
          .catch(error => {
            console.error('Error creating student:', error);
            this.createMsg = error.data;
          });
    },
    updateStudent() {
      studentAPI.updateStudent(this.updateID, this.updatedStudent)
          .then(response => {
            console.log('Student updated:', response.data);
            this.updateMsg = response.data;
          })
          .catch(error => {
            console.error('Error updating student:', error);
            this.updateMsg = error.data;
          });
    },
    deleteStudent() {
      studentAPI.deleteStudent(this.deleteID)
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