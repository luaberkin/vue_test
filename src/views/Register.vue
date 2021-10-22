<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <router-link :to="{name: 'login'}">
              Have an account?
            </router-link>
          </p>
          <mcv-validation-errors v-if="validationErrors" :validation-errors="validationErrors"/>
          <form @submit.prevent="onSubmit()">
            <fieldset class="form-group" :class="{'form-group--error': $v.username.$error}">
              <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Username"
                  v-model="username"
                  :class="{invalid: ($v.username.$dirty && !$v.username.required) || ($v.username.$dirty && !$v.username.minLength)}"
              />
            </fieldset>
            <small v-if="$v.username.$dirty && !$v.username.required">
              Username must not be empty.
            </small>
            <small v-if="$v.username.$dirty && !$v.username.minLength">
              Username must have at least 8 characters.
            </small>
            <fieldset class="form-group" :class="{'form-group--error': $v.email.$error}">
              <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  v-model="email"
                  :class="{invalid: ($v.email.$dirty && !$v.email.email) || ($v.email.$dirty && !$v.email.required)}"
              />
            </fieldset>
            <small
            v-if="$v.email.$dirty && !$v.email.required"
            >
              Email field must not be empty.
            </small>
            <small
            v-if="$v.email.$dirty && !$v.email.email"
            >
              Enter correct Email.
            </small>

            <fieldset class="form-group" :class="{'form-group--error':$v.password.$error}">
              <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  v-model="password"
                  :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
              />
            </fieldset>
            <small v-if="$v.password.$dirty && !$v.password.required">
              Password field must not be empty.
            </small>
            <small v-if="$v.password.$dirty && !$v.password.minLength">
              Password must have at least 8 characters.
            </small>
            <button class="btn btn-lg btn-primary pull-xs-right" :disabled="register">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import McvValidationErrors from "@/components/ValidationErrors";
import {actionTypes, mutationTypes} from "@/store/modules/auth";
import {email, minLength, required} from 'vuelidate/lib/validators'

export default {
  name: 'McvRegister',
  components: {
    McvValidationErrors
  },
  data() {
    return {
      email: '',
      username: '',
      password: ''
    }
  },
  validations: {
    username: {
      required,
      minLength: minLength(8)
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(8)
    }

  },
  computed:{
    register() {
      return this.$store.state.auth.isSubmitting
    },
    validationErrors() {
      return this.$store.state.auth.validationErrors
    }
  },
  mounted() {
    this.$v.username.$touch()
    this.$v.email.$touch()
    this.$v.password.$touch()
    this.$store.commit(mutationTypes.defaultType)
  },
  methods: {
  onSubmit() {
    console.log('submitted form')
    this.$store.dispatch(actionTypes.register, {
      email: this.email,
      username: this.username,
      password: this.password
    })
    .then(
        () => {
          this.$router.push({name: 'globalFeed'})
        }
    )
  },

  }
}
</script>

<style scoped>
 .form-group--error{
   border: 1px solid red;
   border-radius: 5px;
 }
</style>
