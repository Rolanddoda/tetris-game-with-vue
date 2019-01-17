<template>
	<v-snackbar
			v-model="snackbar"
			:timeout="3000"
	>
		{{ text }}
		<v-btn
				color="white"
				flat
				@click="snackbar = false"
		>
			Close
		</v-btn>
	</v-snackbar>
</template>

<script>
import { event } from '@/plugins/event'

export default {
  data: () => ({
    snackbar: false,
    text: 'Default Text'
  }),

  created() {
    event.$on('snackbar', text => {
      this.text = text
      this.snackbar = true
    })
  }
}
</script>
