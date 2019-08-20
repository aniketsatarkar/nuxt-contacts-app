<template>
  <b-container>
    <b-row>
      <b-col cols="12">
        <b-card>
          <b-card-body class="m-0 p-0">
            <h2 class="text-primary">Sign-Up</h2>
            <hr />
            <b-form-group>
              <b-input
                ref="name"
                v-model="name"
                type="text"
                placeholder="Username"
                aria-required
                @keyup.enter="register">
              </b-input>
              <b-form-feedback ref="nameState">
                {{ JSON.stringify(errors.name) }}
              </b-form-feedback>
            </b-form-group>
            <b-form-group>
              <b-input
                ref="email"
                v-model="email"
                type="email"
                placeholder="Email"
                aria-required
                @keyup.enter="register">
              </b-input>
              <b-form-feedback ref="emailState">
                {{ JSON.stringify(errors.email) }}
              </b-form-feedback>
            </b-form-group>
            <b-form-group>
              <b-input
                ref="password"
                v-model="password"
                type="password"
                placeholder="Password"
                @keyup.enter="register">
              </b-input>
              <b-form-feedback ref="passwordState">
                {{ errors.password }}
              </b-form-feedback>
            </b-form-group>
            <b-form-group>
              <b-input
                ref="password_confirmation"
                v-model="password_confirmation"
                type="password"
                placeholder="Confirm Password"
                @keyup.enter="register">
              </b-input>
              <b-form-feedback ref="password_confirmationState">
                {{ errors.password_confirmation }}
              </b-form-feedback>
            </b-form-group>
            <b-form-group>
              <b-button
                ref="loginBtn"
                variant="success"
                @click="register">
                Sign-Up
              </b-button>
            </b-form-group>
            <b-form-group>
              <b-link to="/login">Already have an account?</b-link>
            </b-form-group>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
  name: 'Register',
  mixins: [validationMixin],
  data() {
    return {
      name: "aniket-s",
      email: "example@email.com",
      password: "anikets123",
      password_confirmation: "anikets123",
      errors: []
    };
  },
  validations: {
    name: {
      required,
      minLength: minLength(2),
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    },
    password_confirmation: {
      required,
      minLength: minLength(6)
    }
  },
  methods : {
    register() {

      this.$v.$touch();
      this.$refs.name.state = !(this.$v.name.$invalid);
      this.$refs.email.state = !(this.$v.email.$invalid);
      this.$refs.password.state = !(this.$v.password.$invalid);
      this.$refs.password_confirmation.state = !(this.$v.password_confirmation.$invalid);

      if(this.$v.$invalid) {
        return false;
      }

      const params = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation,
      };

      this.$axios({
        method: 'POST',
        data: params,
        url: 'http://laravel.local/api/auth/signup'
      })
      .then((res) => {
        if(res.status === 200 && (res.errors === null)) {
          this.$router.push({ path: '/home' });
        }
        else if(res.errors !== null || res.errors !== undefined) {
          const errors = this.errors = res.data.errors;

          if(errors.email !== undefined) {
            this.errors.email = this.errors.email.join();
            this.$refs.email.state = false;
            this.$refs.emailState.state = false;
          }

          if(errors.name !== undefined) {
            this.errors.name = this.errors.name.join();
            this.$refs.nameState.state = false;
            this.$refs.name.state = false;
          }

          if(errors.password !== undefined) {
            this.errors.password = this.errors.password.join();
            this.$refs.passwordState.state = false;
            this.$refs.password.state = false;
          }

          if(errors.password_confirmation !== undefined) {
            this.errors.password_confirmation = this.errors.password_confirmation.join();
            this.$refs.password_confirmationStatus.state = false;
            this.$refs.password_confirmation.state = false;
          }
          this.$forceUpdate();
        }
      })
      .catch((res) => {
        if(res.status !== 200) {
          this.$bvToast.toast(`Something went wrong, please try after some time!`, {
            title: 'Error!',
            autoHideDelay: 3000,
            appendToast: false,
            variant: 'danger'
          })
        }
      });
    }
  },
}
</script>
