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
            localStorage.setItem('currentUser', this.cred.username);
            // Redirect to the student page after login success
            this.$router.push('/welcome');
          })
          .catch(error => {
            console.error('Login failed:', error);
            this.loginMsg = 'Invalid credentials. Please try again.';
          });
    },

  }
};
</script>