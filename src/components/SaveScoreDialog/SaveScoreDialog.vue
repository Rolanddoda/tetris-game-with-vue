<template>
	<v-layout row justify-center>
		<v-dialog v-model="dialog" persistent max-width="800px">

			<v-card>
				<v-card-title>
					<h3>Congrats!! You are in top 10</h3>
					<v-spacer></v-spacer>
					<h3>Your score is {{ score }}</h3>
				</v-card-title>

				<v-card-text>
					<div class="save-top-user">
						<v-stepper
								v-model="stepper"
								vertical
						>
							<v-stepper-step :complete="stepper > 1" step="1">
								<h3>Do you want to save your score in TOP 10?</h3>
							</v-stepper-step>

							<v-stepper-content step="1">

								<v-btn color="primary" @click="stepper = 2">
									Continue
								</v-btn>

								<v-btn flat @click="close_dialog"> Cancel</v-btn>

							</v-stepper-content>

							<v-stepper-step step="2">
								<h3>Add details</h3>
							</v-stepper-step>

							<v-stepper-content step="2">

								<details-form ref="form" @save-user="save_user" /> <!-- component -->

								<v-btn color="primary" @click="validate_form">
									Save
								</v-btn>

								<v-btn flat @click="close_dialog">Cancel</v-btn>

							</v-stepper-content>

						</v-stepper>
					</div>
				</v-card-text>
			</v-card>

		</v-dialog>
	</v-layout>
</template>

<script>
import DetailsForm from '@/components/DetailsForm/DetailsForm.vue'

export default {
  components: {
    DetailsForm
  },

  props: {
    open: Boolean,
    score: Number
  },

  data: () => ({
    dialog: false,
    stepper: 1
  }),

  watch: {
    open(val) {
      this.dialog = val
    }
  },

  methods: {
    close_dialog() {
      this.$emit('update:open', false)
    },

    validate_form() {
      this.$refs.form.validate()
    },

    save_user(form) {
      form.score = this.score
      this.$emit('save-user', form)
      this.dialog = false
    }
  }
}
</script>
