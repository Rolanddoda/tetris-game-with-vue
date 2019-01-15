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
						<v-btn large outline dark @click="start_new_game()">Start new game
						</v-btn>

						<v-layout row justify-center>
							<v-dialog v-model="dialog" persistent max-width="800px">

								<v-card>
									<v-card-title>
										<h3>Congrats!! You are in top 10</h3>
										<v-spacer></v-spacer>
										<h3>Your score is 200</h3>
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

													<v-btn flat> Cancel</v-btn>

												</v-stepper-content>

												<v-stepper-step step="2">
													<h3>Add details</h3>
												</v-stepper-step>

												<v-stepper-content step="2">

													<details-form />


													<v-btn color="primary">
														Save
													</v-btn>

													<v-btn flat>Cancel</v-btn>

												</v-stepper-content>

											</v-stepper>
										</div>
									</v-card-text>
								</v-card>

							</v-dialog>
						</v-layout>

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
			<top-users/> <!-- component -->

		</div>

	</div>
</template>

<script src="./Tetris.js">
</script>
<style lang="scss" scoped src="./Tetris.scss">
</style>
