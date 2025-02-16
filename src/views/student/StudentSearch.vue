<script setup>

</script>

<template>
  <!-- get -->
  <div class="form-group">
    <label for="studentID">Please enter studentID:</label>
    <input v-model="studentID" id="studentID" placeholder="studentID" />
    <button @click="getStudentInfo">Get Student Info</button>
    <div v-if="getMsg">
      <p><strong>msg:</strong> {{ getMsg }}</p>
    </div>
    <div v-if="studentInfo" class="student-info">
      <p><strong>studentID:</strong> {{ studentInfo.studentID }}</p>
      <p><strong>name:</strong> {{ studentInfo.sName }}</p>
      <p><strong>age:</strong> {{ studentInfo.Age }}</p>
      <p><strong>gender:</strong> {{ studentInfo.Gender }}</p>
      <p><strong>major:</strong> {{ studentInfo.Major }}</p>
    </div>
  </div>
</template>

<script>
import { studentService } from '../../api/studentAPI.js';
import {utils} from "@/utils/utils.js";
export default {
  data(){
    return {
      getMsg: '',
      studentID: '',
      studentInfo: null,
    }
  },

  methods: {
    getStudentInfo() {
      this.studentInfo = null;
      this.getMsg = "Searching..."
      if (!this.studentID) {
        this.getMsg = "You must enter studentID";
        return;
      }

      studentService.getStudentInfo(this.studentID)
          .then(response => {
            console.log(response.data);
            this.getMsg = "";
            this.studentInfo = response.data;
          })
          .catch(error => {
            console.error('Error fetching student info:', error);
            this.getMsg = this.processError(error);
          });
    },
    processError(error) {
      return utils.processError(error);
    }
  }
}


</script>

<style scoped>

</style>