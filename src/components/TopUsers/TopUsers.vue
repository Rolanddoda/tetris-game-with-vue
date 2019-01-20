<template>
	<v-expansion-panel class="top-users">
		<v-expansion-panel-content>
			<div slot="header">
				<v-progress-linear :indeterminate="true" v-if="loading"></v-progress-linear>
				<span v-else-if="!topUsers.length && !loading">No Top Users Yet</span>
				<span v-else>Top Users</span>
			</div>
			<v-card>
				<v-card-text>
					<div class="user" v-for="(user, index) of topUsers" :key="user.id">
						<span>{{ index + 1 }}</span> <span>{{ user.nickname }}</span> <span>{{ user.score }}</span>
					</div>
				</v-card-text>
			</v-card>
		</v-expansion-panel-content>
	</v-expansion-panel>
</template>

<script>
export default {
  props: {
    topUsers: Array,
	  loading: Boolean
  }
}
</script>

<style lang="scss" scoped>
.user {
  padding: 10px;
  display: flex;
  justify-content: space-between;
}
</style>
