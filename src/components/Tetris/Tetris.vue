<template>
    <div class="wrapper">

        <div class="tetris-wrapper">
            <div class="tetris">
                <div v-for="(row, index) of arena" :key="index" class="tetris-row">
                    <div v-for="(column, index) of row" :key="index"
                         :class="['tetris-column', { active: column }]"
                    >
                    </div>
                </div>
                <transition name="increase-height" mode="out-in">
                    <div class="game-over" v-if="game_over">
                        Game Over
                        <div class="your-score">
                            Your score is {{ total_score }}
                        </div>
                        <v-btn large outline dark @click="start_new_game()">Start new game</v-btn>
                    </div>
                </transition>
            </div>
        </div>

        <div class="game-controls">
            <div class="score">
                TOTAL SCORE: {{total_score}}
            </div>
            <v-btn @click="start_new_game()" v-if="!game_started">START NEW GAME</v-btn>
        </div>

    </div>
</template>

<script src="./Tetris.js">
</script>
<style lang="scss" scoped src="./Tetris.scss">
</style>
