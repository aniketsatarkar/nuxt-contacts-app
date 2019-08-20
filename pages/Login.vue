<template>
  <b-container>
    <b-card>
      <b-card-body class="m-0 p-0">
        <h2 class="text-primary">Login</h2>
        <hr />
        <b-form-group>
          <b-input
            ref="email"
            v-model="email"
            type="email"
            placeholder="Email"
            aria-required
            @keyup.enter="login"
            @keyup="checkEmail">
          </b-input>
        </b-form-group>
        <b-form-group>
          <b-input
            ref="password"
            v-model="password"
            type="password"
            placeholder="Password"
            @keyup.enter="login"
            @keyup="checkPassword">
          </b-input>
        </b-form-group>
        <b-form-group>
          <b-button
            ref="loginBtn"
            :disabled="!isFormValid"
            variant="success"
            @click="login">
            Login
          </b-button>
        </b-form-group>
        <b-form-group>
          <b-link to="/register">Don't have an account?</b-link>
        </b-form-group>
      </b-card-body>
    </b-card>
  </b-container>
</template>

<script>

import { validationMixin } from 'vuelidate'
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
  name: 'Login',
  mixins: [validationMixin],
  data() {
    return {
      email: 'anikets@gmail.com',
      password: 'anikets123',
      isFormValid: false
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  computed: {},
  methods: {
    login() {

      const creds = {
        email: this.email,
        password: this.password
      };

      this.$axios({
        method : 'POST',
        data: creds,
        url: 'http://laravel.local/api/auth/login'
      })
      .then((res) => {
        if(res.status === 200) {
          this.$store.state.isLoggedIn = true;
          this.$store.state.token = res.data.access_token;
          this.$router.push({ path: '/home' });
        }
      })
      .catch((res) => {});
    },
    checkEmail() {
      this.$refs.email.state = !(this.$v.email.$invalid);
      this.isFormValid = !(this.$v.$invalid);
    },
    checkPassword() {
      this.$refs.password.state = !(this.$v.password.$invalid);
      this.isFormValid = !(this.$v.$invalid);
    }
  }
}
</script>
