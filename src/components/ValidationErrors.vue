<template>
  <ul class="error-messages">
    <li v-for="errorMessage in errorMessages" :key="errorMessage">
      {{errorMessage}}
    </li>
  </ul>
</template>

<script>
export default {
  name: "McvValidationErrors",
  computed: {
  errorMessages() {
   return Object.keys(this.validationErrors).map(
       name => {
        console.log('errors: ', this.validationErrors)
        const messages = this.validationErrors[name].join(', ')
        return `${name} ${messages}`
       }
   )
  }
  },
  props : {
    validationErrors: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
