<template>
	<v-card>
		<v-card-title>
			<h3>Register in TOP 10</h3>
		</v-card-title>
		<v-card-text>
			<v-form ref="form">
				<v-container>
					<v-layout row wrap>

						<v-flex xs12 md6>
							<v-text-field label="First Name"
							              placeholder="optional"
							              prepend-icon="mdi-account"
							              v-model.trim="form.first_name"
							/>
						</v-flex>

						<v-flex xs12 md6>
							<v-text-field label="Last Name"
							              placeholder="optional"
							              prepend-icon="mdi-account"
							              v-model.trim="form.last_name"
							/>
						</v-flex>

						<v-flex xs12 md6>
							<v-text-field label="Email"
							              placeholder="optional"
							              prepend-icon="mdi-email"
							              v-model.trim="form.email"
							              :rules="[rules.email]"
							/>
						</v-flex>

						<v-flex xs12 md6>
							<v-text-field label="Nickname"
							              placeholder="required"
							              prepend-icon="mdi-account-heart"
							              v-model.trim="form.nickname"
							              :rules="[rules.required, rules.unique]"
							/>
						</v-flex>

					</v-layout>
				</v-container>
			</v-form>
		</v-card-text>
	</v-card>
</template>

<script>
export default {
  props: {
    users: Array
  },

  data: () => ({
    valid: false,
    form: {
      first_name: '',
      last_name: '',
      email: '',
      nickname: ''
    }
  }),

  computed: {
    rules() {
      return {
        required: value => !!value || 'Required.',
        email: value => {
          if (!value) return true
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
        unique: value => {
          if (!value) return true
          if (!this.users.length) return true
          if (this.users.find(user => user.nickname === value))
            return 'Already taken'
          return true
        }
      }
    }
  },

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.$emit('save-user', Object.assign({}, this.form))
      }
    }
  }
}
</script>

<style scoped>
</style>
