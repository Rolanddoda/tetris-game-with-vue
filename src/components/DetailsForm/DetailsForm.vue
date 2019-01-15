<template>
	<v-card>
		<v-card-title>
			<h3>Register in TOP 10</h3>
		</v-card-title>
		<v-card-text>
			<v-form>
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
							/>
						</v-flex>

						<v-flex xs12 md6>
							<v-text-field label="Nickname"
							              placeholder="required"
							              prepend-icon="mdi-account-heart"
							              v-model.trim="form.nickname"
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
  data: () => ({
    valid: false,
    form: {
      first_name: '',
      last_name: '',
      email: '',
      nickname: '',
      score: 200
    }
  })
}
</script>

<style scoped>
</style>
