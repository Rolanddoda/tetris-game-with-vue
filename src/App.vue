<template>
  <v-app>
    <tetris/>
    <snack-bar />
  </v-app>
</template>

<script>
import Tetris from '@/components/Tetris/Tetris.vue'
import SnackBar from '@/components/SnackBar/SnackBar.vue'

export default {
  name: 'app',
  components: {
    Tetris,
    SnackBar
  }
}
</script>
