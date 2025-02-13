<!-- src/components/LoginPage.vue -->
<template>
  <div>
    <div style="text-align: center;">
      <h1>Login</h1>
      <div class="form-group">
        <input v-model="cred.username" placeholder="Username" />
        <input v-model="cred.password" type="password" placeholder="Password" />
        <button @click="login">Login</button>
        <div v-if="loginMsg">
          <p><strong>{{ loginMsg }}</strong></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {authService} from '../api/authAPI.js';

export default {
  data() {
    return {
      cred: {
        username: '',
        password: ''
      },
      loginMsg: null
    };
  },
  methods: {
    login() {
      this.loginMsg = "Logging in...";
      console.log("credentials: ", this.cred);
      authService.login(this.cred)
          .then(response => {
            console.log(response);
            this.loginMsg = 'Login successful!';
            console.log(response.data.token);
            localStorage.setItem('token', response.data.token);
            // Redirect to the student page after login success
            this.$router.push('/students');
          })
          .catch(error => {
            console.error('Login failed:', error);
            this.loginMsg = 'Invalid credentials. Please try again.';
          });
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