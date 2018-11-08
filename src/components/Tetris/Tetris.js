import { tetris_actions } from './tetris_actions'

export default {
	name: 'Tetris',
	mixins: [tetris_actions],

	data: () => ({
		arena: [
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0]
		],
		new_tetris_item: {
			type: "T",
			value: [[0, 0, 0, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0]],
			row_1_starts: 3,
			row_1_ends: 5,
			row_2_starts: 4,
			row_2_ends: 4,
		},
		new_tetris_position: 0,
		game_interval: null
	}),

	watch: {
		arena(new_val) {
			//   console.table(new_val)
		}
	},

	mounted() {
		// this.game_interval = setInterval(this.move_tetris_item, 1000);
		document.addEventListener('keydown', (event) => {
			if (event.code === 'ArrowLeft') {
				this.change_tetris_position('left')
			}else if (event.code === 'ArrowRight') {
				this.change_tetris_position('right')
			}
		})
	},

	methods: {

		change_tetris_position(direction) {
			const row_index = this.new_tetris_position
			let arena = [...this.arena]
			if (this.new_tetris_item.type === 'T') {
				const method = 'change_T_position_' + direction
				this[method](arena, row_index)
			}
		},

		move_tetris_item() {
			if (this.arena.every(row => row.includes(1))) {
				alert("GAME OVER");
				return;
			}

			let arena = [...this.arena];
			let i = this.new_tetris_position;

			if (this.new_tetris_position === 8) {
				this.add_new_tetris();
				return;
			}

			if ((this.new_tetris_item.type === "T")) {
				this.move_T_item(arena, i)
			}
		},

		merge_arrays(arr1, arr2) {
			return arr1.map((item, index) => {
				return (item += arr2[index]);
			});
		},

		add_new_tetris() {
			this.new_tetris_position = 0;
			this.new_tetris_item = {
				type: "T",
				value: [[0, 0, 0, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0]],
				row_1_starts: 3,
				row_1_ends: 5,
				row_2_starts: 4,
				row_2_ends: 4,
			}
		},

		row_collides(arr) {
			return arr.some(item => item > 1)
		}

	}
};