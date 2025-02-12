<!-- src/components/LoginPage.vue -->
<template>
  <div>
    <div style="text-align: center;">
      <h1>Login</h1>
      <div class="form-group">
        <input v-model="username" placeholder="Username" />
        <input v-model="password" type="password" placeholder="Password" />
        <button @click="login">Login</button>
        <div v-if="loginMsg">
          <p><strong>{{ loginMsg }}</strong></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { authAPI } from '../api/authAPI.js';

export default {
  data() {
    return {
      username: '',
      password: '',
      loginMsg: null
    };
  },
  methods: {
    login() {
      this.$router.push('/students');
      // const credentials = { username: this.username, password: this.password };
      // authAPI.login(credentials)
      //     .then(response => {
      //       this.loginMsg = 'Login successful!';
      //       // Redirect to the student page after login success
      //       this.$router.push('/students');
      //     })
      //     .catch(error => {
      //       console.error('Login failed:', error);
      //       this.loginMsg = 'Invalid credentials. Please try again.';
      //     });
    }
  }
};
</script>