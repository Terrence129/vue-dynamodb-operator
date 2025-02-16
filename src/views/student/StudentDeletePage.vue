<script setup>

</script>

<template>
  <!-- delete -->
  <div class="form-group">
    <h3>Delete Student</h3>
    <input v-model="deleteID" placeholder="studentID" />
    <button @click="deleteStudent">Delete Student</button>
    <div v-if="deleteMsg">
      <p><strong>msg:</strong> {{ deleteMsg }}</p>
    </div>
  </div>
</template>
<script>
import {studentService} from "@/api/studentAPI.js";
import {utils} from "@/utils/utils.js";

export default {
  data(){
    return {
      deleteID: '',
      deleteMsg: null
    }
  },
  methods: {
    deleteStudent() {
      this.deleteMsg = "Deleting...";
      studentService.deleteStudent(this.deleteID)
          .then(response => {
            console.log('Student deleted:', response.data);
            this.deleteMsg = response.data;
          })
          .catch(error => {
            console.error('Error deleting student:', error);
            this.deleteMsg = this.processError(error);
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