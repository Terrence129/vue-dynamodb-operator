<script setup>

</script>

<template>
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
</template>
<script>
import {studentService} from "@/api/studentAPI.js";
import {utils} from "@/utils/utils.js";

export default {
  data() {
    return {
      updateID: '',
      updatedStudent: {
        name: '',
        age: '',
        gender: '',
        major: ''
      },
      updateMsg: null
    }
  },
  methods: {
    updateStudent() {
      this.updateMsg = "Updating...";
      studentService.updateStudent(this.updateID, this.updatedStudent)
          .then(response => {
            console.log('Student updated:', response.data);
            this.updateMsg = response.data;
          })
          .catch(error => {
            console.error('Error updating student:', error);
            this.updateMsg = this.processError(error);
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