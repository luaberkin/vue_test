<template>
<div class="editor-page">
  <div class="container page">
    <div class="row">
      <div class="col-md-10  offset-md-1 col-xs-12">
        <mcv-validation-errors v-if="validationErrors" :validation-errors="validationErrors"/>
        <form @submit.prevent="onSubmit">
          <fieldset>
            <fieldset class="form-group" :class="{ 'form-group--error': $v.title.$error }">
              <input type="text" class="form-control form-control-lg" placeholder="Article title" v-model="title"
              :class="{invalid: $v.title.$dirty && !$v.title.required}">
            </fieldset>
            <small v-if="$v.title.$dirty && !$v.title.required">
              Title must not be empty.
            </small>
            <fieldset class="form-group" :class="{ 'form-group--error': $v.description.$error }">
              <input type="text" class="form-control form-control-lg" placeholder="Description" v-model="description"
                     :class="{invalid: $v.description.$dirty && !$v.description.required}">
            </fieldset>
            <small
            v-if="$v.description.$dirty && !$v.description.required">
              Description must not be empty.
            </small>
            <fieldset class="form-group">
              <textarea class="form-control form-control-lg" placeholder="What is article about?" v-model="body"
                        >
              </textarea>
            </fieldset>
<!--            <small-->
<!--            :v-if="{invalid: $v.body.$dirty && !$v.body.required}">-->
<!--               Please, answer the question.-->
<!--            </small>-->
            <fieldset class="form-group">
              <input type="text" class="form-control form-control-lg" placeholder="Enter tags" v-model="tagList"
              >
            </fieldset>
            <fieldset class="form-group">
              <button class="btn btn-primary pull-xs-right btn-lg" :disabled="isSubmitting">
                Publish Article
              </button>
            </fieldset>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import McvValidationErrors from "@/components/ValidationErrors";
import {required} from 'vuelidate/lib/validators'

export default {
  name: "ArticleForm",
  components: {McvValidationErrors},
  props: {
    initialValues: {
      type: Object,
      required: true
    },
    validationErrors: {
      type: Object,
      required: false
    },
    isSubmitting: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: this.initialValues.title,
      description: this.initialValues.description,
      body: this.initialValues.body,
      tagList: this.initialValues.tagList.join(' ')
    }},
  validations: {
    title: {
      required
    },
    description: {
      required
    },
    body: {
      required
    },

  },
  mounted() {
    if(!this.$v.invalid) {
      this.$v.title.$touch()
      this.$v.description.$touch()
      this.$v.body.$touch()
    }
  },
  methods: {
    onSubmit() {
      const form = {
        title : this.title,
        description: this.description,
        body: this.body,
        tagList: this.tagList.split(' ')
      }
      this.$emit('articleSubmit',form)
    }
  }
}
</script>

<style scoped>
  .form-group--error {
    border: 1px solid red;
    border-radius: 5px;
  }
</style>
