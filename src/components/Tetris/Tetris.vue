<template>
    <div class="tetris">
        <div v-for="(row, index) of arena" :key="index" class="tetris-row">
            <div v-for="(column, index) of row" :key="index" :class="['tetris-column', { active: column }]">
                <div class="tetris-item" v-if="false"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
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
    this.game_interval = setInterval(this.move_tetris_item, 1000);
    document.addEventListener('keydown', (event) => {
        if (event.keyCode === 37) {
            this.move_item_left()
        }else if (event.keyCode === 39) {
            this.move_item_right()
        }
    })
  },

  methods: {

    move_item_left() {
        const row_index = this.new_tetris_position
        let arena = [...this.arena]
        if (this.new_tetris_item.type === 'T') {
            const row1_starts = this.new_tetris_item.row_1_starts
            const row1_ends = this.new_tetris_item.row_1_ends
            const row2_starts = this.new_tetris_item.row_2_starts
            const row2_ends = this.new_tetris_item.row_2_ends

            let arena_current_row = [...arena[row_index]]
            let arena_previous_row = [...arena[row_index-1]]

            if (arena_previous_row && arena_current_row[row2_starts-1] === 0 && arena_previous_row[row1_starts-1] === 0) {
                this.new_tetris_item.value[0][row1_starts -1] = 1
                this.new_tetris_item.value[0][row1_ends] = 0
                this.new_tetris_item.value[1][row2_starts -1] = 1
                this.new_tetris_item.value[1][row2_ends] = 0

                arena_current_row[row2_starts-1] = 1
                arena_current_row[row2_ends] = 0
                arena_previous_row[row1_starts-1] = 1
                arena_previous_row[row1_ends] = 0

                this.new_tetris_item.row_1_starts--
                this.new_tetris_item.row_2_starts--
                this.new_tetris_item.row_1_ends--
                this.new_tetris_item.row_2_ends--


                arena[row_index] = arena_current_row
                arena[row_index-1] = arena_previous_row
                this.arena = arena                
            }

        }

    },

    move_item_right() {
        const row_index = this.new_tetris_position
        let arena = [...this.arena]
        if (this.new_tetris_item.type === 'T') {
            const row1_starts = this.new_tetris_item.row_1_starts
            const row1_ends = this.new_tetris_item.row_1_ends
            const row2_starts = this.new_tetris_item.row_2_starts
            const row2_ends = this.new_tetris_item.row_2_ends

            let arena_current_row = [...arena[row_index]]
            let arena_previous_row = [...arena[row_index-1]]

            if (arena_previous_row && arena_current_row[row2_ends+1] === 0 && arena_previous_row[row1_ends+1] === 0) {
                this.new_tetris_item.value[0][row1_starts] = 0
                this.new_tetris_item.value[0][row1_ends+1] = 1
                this.new_tetris_item.value[1][row2_starts] = 0
                this.new_tetris_item.value[1][row2_ends+1] = 1

                arena_current_row[row2_starts] = 0
                arena_current_row[row2_ends+1] = 1
                arena_previous_row[row1_starts] = 0
                arena_previous_row[row1_ends+1] = 1

                this.new_tetris_item.row_1_starts++
                this.new_tetris_item.row_2_starts++
                this.new_tetris_item.row_1_ends++
                this.new_tetris_item.row_2_ends++


                arena[row_index] = arena_current_row
                arena[row_index-1] = arena_previous_row
                this.arena = arena                
            }

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

    move_T_item(arena, pos) { //arena, position
        const T_first_row = this.new_tetris_item.value[0]
        const T_second_row = this.new_tetris_item.value[1]
        const T_row1_starts = this.new_tetris_item.row_1_starts
        const T_row1_ends = this.new_tetris_item.row_1_ends
        const T_row2_starts = this.new_tetris_item.row_2_starts
        const T_row2_ends = this.new_tetris_item.row_2_ends

        if (pos === 0) {
            let arena_row1 = [...arena[0]]
            let arena_row2 = [...arena[1]]

            arena_row1 = this.merge_arrays(T_second_row, arena_row1)

            if (this.row_collides(arena_row1)) {
                this.add_new_tetris()
                return
            }

            arena[0] = arena_row1
            this.arena = arena
            arena = [...this.arena]

            arena_row1 = [...arena[0]]
            arena_row2 = [...arena[1]]

            for(let index = T_row2_starts; index <= T_row2_ends; index++) {
                arena_row1[index] = 0
            }

            arena_row2 = this.merge_arrays(arena_row2, T_second_row)

            if (this.row_collides(arena_row2)) {
                this.add_new_tetris()
                return
            }

            arena[1] = arena_row2
            arena_row1 = this.merge_arrays(arena_row1, T_first_row)
            arena[0] = arena_row1
            this.new_tetris_position++
            this.arena = arena
        } else {
            let previous_arena_row = [...arena[pos-1]]
            let current_arena_row = [...arena[pos]]
            let next_arena_row = [...arena[pos+1]]

            for(let index = T_row1_starts; index <= T_row1_ends; index++) {
                previous_arena_row[index] = 0
            }

            for (let index = T_row2_starts; index <= T_row2_ends; index++) {
                current_arena_row[index] = 0
            }

            next_arena_row = this.merge_arrays(next_arena_row, T_second_row)

            if (this.row_collides(next_arena_row)) {
                this.add_new_tetris()
                return
            }

            arena[pos+1] = next_arena_row
            arena[pos-1] = previous_arena_row

            current_arena_row = this.merge_arrays(current_arena_row, T_first_row)

            if (this.row_collides(current_arena_row)) {
                this.add_new_tetris()
                return
            }

            arena[pos] = current_arena_row
            this.new_tetris_position++
            this.arena = arena
        }
    },

    row_collides(arr) {
        return arr.some(item => item > 1)
    }

  }
};
</script>

<style lang="scss" scoped>
.tetris {
  width: 600px;
  height: 600px;
  background: purple;
  display: grid;
  grid-template-rows: repeat(9, 1fr);

  .tetris-row {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
  }

  .tetris-column.active {
    background: blue;
    border: 1px solid;
  }
}
</style>


