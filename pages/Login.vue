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
            @keyup="checkEmail">
          </b-input>
        </b-form-group>
        <b-form-group>
          <b-input
            ref="password"
            v-model="password"
            type="password"
            placeholder="Password"
            @keyup="checkPassword">
          </b-input>
        </b-form-group>
        <b-form-group>
          <b-button ref="loginBtn" disabled="true" variant="success" @click="login">Login</b-button>
        </b-form-group>
        <b-form-group>
          <b-link to="/register">Sign-Up</b-link>
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
      email: '',
      password: ''
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

      this.$v.$touch();

      if (!this.$v.$invalid) {
        // enable button.
      }

      const creds = {
        email: this.email,
        password: this.password
      }

      this.$axios({
        method : 'POST',
        data: creds,
        url: 'http://laravel.local/api/auth/login'
      })
      .then((res) => {
        if(res.status === 200) {
          alert('success!');
        }
      })
      .catch((res) => {});
    },
    checkEmail() {
      this.$refs.email.state = !(this.$v.email.$invalid);
      this.$refs.loginBtn.disabled = !(this.$v.$invalid);
    },
    checkPassword() {
      this.$refs.password.state = !(this.$v.password.$invalid);
      this.$refs.loginBtn.disabled = !(this.$v.$invalid);
    }
  }
}
</script>
