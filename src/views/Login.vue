<template>
  <div class="login-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            Sign in
          </h1>
          <p class="text-xs-center">
            <router-link :to="{name: 'register'}">
              Need an account?
            </router-link>
          </p>
          <mcv-validation-errors v-if="validationErrors" :validation-errors="validationErrors"/>
          <form @submit.prevent="onSubmit()">
            <fieldset class="form-group" :class="{'form-group--error': $v.email.$error}">
              <input
              class="form-control form-control-lg"
              type="text"
              placeholder="Email"
              v-model.trim="email"
              :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
              >
            </fieldset>
            <small class="helper-text invalid" v-if="$v.email.$dirty && !$v.email.required">
              Email field must not be empty.
            </small>
            <small class="helper-text invalid" v-if="$v.email.$dirty && !$v.email.email">
              Enter correct Email.
            </small>
            <fieldset class="form-group" :class="{'form-group--error': $v.password.$error}">
              <input
                  class="form-control form-control-lg "
                  type="text"
                  placeholder="Password"
                  v-model.trim="$v.password.$model"
                  :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
              >
            </fieldset>

            <small class="helper-text invalid"
            v-if="$v.password.$dirty && !$v.password.required">
              Password field must not be empty.
            </small>
            <small class="helper-text invalid"
            v-if="$v.password.$dirty && !$v.password.minLength">
              Password must have at least 8 characters.
            </small>
            <button class="btn btn-lg btn-primary pull-xs-right" :disabled="isSubmitting" >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import McvValidationErrors from "@/components/ValidationErrors";
import {actionTypes, mutationTypes} from "@/store/modules/auth";
import {email, required, minLength } from 'vuelidate/lib/validators'

export default {
  name: "Login",
  components: {
    McvValidationErrors
  },
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
      minLength: minLength(8)
    }

  },
  computed: {
    ...mapState({
      isSubmitting: state => state.auth.isSubmitting,
      validationErrors: state => state.auth.validationErrors
    })
  },
  mounted (){
    this.$v.email.$touch()
    this.$v.password.$touch()
    this.$store.commit(mutationTypes.defaultType)
  },
  methods: {
    onSubmit() {
      this.$store.dispatch(actionTypes.login, {
        email: this.email,
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
