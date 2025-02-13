<template>
  <div class="student-list-page">
    <h1 class="page-title">Students List</h1>
    <button @click="goBack()" class="fixed-button">Back</button>
    <div class="student-list">
      <p><strong>msg:</strong>{{msg}}</p>
      <!-- 使用 v-for 渲染学生列表 -->
      <div v-for="student in students" :key="student.studentID" class="student-item">
        <p><strong>studentID:</strong> {{ student.studentID }}</p>
        <p><strong>name:</strong> {{ student.sName }}</p>
        <p><strong>age:</strong> {{ student.Age }}</p>
        <p><strong>gender:</strong> {{ student.Gender }}</p>
        <p><strong>major:</strong> {{ student.Major }}</p>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import {studentService} from "@/api/studentAPI.js";

export default {
  name: 'StudentListPage',
  data() {
    return {
      // 假设 data 是从 API 获取到的学生列表数据
      students: [
        { studentID: "0001", Major: "计算机科学与技术", sName: "陈亚骐", Gender: "男", Age: "21" }
      ],
      msg: "Loading..."
    };
  },
  mounted() {
    // 在组件加载时调用 fetchStudentList 方法
    this.fetchStudentList();
  },
  methods: {
    goBack() {
      window.history.back();
    },

    fetchStudentList() {
      studentService.queryStudentsList()
        .then(response => {
        console.log("Query list successfully: " + response.data);
        this.students = response.data;
          // 按照 studentID 升序排列
        this.students.sort((a, b) => {
          return a.studentID.localeCompare(b.studentID);  // 按字典顺序比较
        });
        this.msg = "Load Successfully.";
      })
      .catch(error => {
        console.error('Error fetching student list:', error);
        this.msg = this.processError(error);
      })
    },

    // 🔥 统一错误处理
    processError(error) {
      if (error.response) {
        return error.response.data ? error.response.data.message || error.response.data : "Server returned an error.";
      } else if (error.request) {
        return "No response from server. Please check your network.";
      } else {
        return "Request error: " + error.message;
      }
    }
  }
};
</script>
