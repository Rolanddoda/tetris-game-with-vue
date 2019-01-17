<template>
	<div class="wrapper">

		<div class="tetris-wrapper">
			<div class="tetris">
				<div v-for="(row, index) of arena" :key="index" class="tetris-row">
					<div v-for="(column, index) of row"
					     :key="index"
					     :class="['tetris-column', { active: column }]"
					></div>
				</div>
				<transition name="increase-height" mode="out-in">
					<div class="game-over" v-if="game_over">
						Game Over

						<div class="your-score">
							Your score is {{ total_score }}
						</div>

						<div class="score-actions">
							<v-btn large outline dark @click="start_new_game()">
								Start new game
							</v-btn>

							<template v-if="can_save_score">
							or
							<v-btn large outline dark @click="save_score_dialog = true">
								Register in top 10
							</v-btn>
							</template>
						</div>

						<save-score-dialog ref="dialog"
						                   :open.sync="save_score_dialog"
						                   :score="total_score"
						                   @save-user="save_user"
						/>
					</div>
				</transition>
			</div>
		</div>

		<div class="game-controls">
			<div class="score">
				TOTAL SCORE: {{total_score}}
			</div>
			<v-btn block large @click="start_new_game()" v-if="!game_started">START
				NEW GAME
			</v-btn>
			<top-users :top-users="top_users"/> <!-- component -->

		</div>

	</div>
</template>

<script src="./Tetris.js">
</script>
<style lang="scss" scoped src="./Tetris.scss">
</style>
