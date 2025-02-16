<script setup>

</script>

<template>
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
</template>
<script>
import {studentService} from "@/api/studentAPI.js";
import {utils} from "@/utils/utils.js";

export default {
  data(){
    return {
      newStudent: {
        studentID: '',
        name: '',
        age: '',
        gender: '',
        major: ''
      },
      createMsg: null
    }
  },
  methods: {
    createStudent() {
      this.createMsg = "Creating...";
      studentService.createStudent(this.newStudent)
          .then(response => {
            console.log('Student created:', response.data);
            this.createMsg = "";
            this.createMsg = response.data;
          })
          .catch(error => {
            console.error('Error creating student:', error);
            this.createMsg = this.processError(error);
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