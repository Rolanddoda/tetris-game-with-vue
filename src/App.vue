<template>
  <v-app>
    <Tetris/>
  </v-app>
</template>

<script>
import Tetris from '@/components/Tetris/Tetris.vue'
export default {
  name: 'app',
  components: {
    Tetris
  }
}
</script>
