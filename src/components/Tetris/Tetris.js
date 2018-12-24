import { tetris_items } from './tetris_items'
import _cloneDeep from 'lodash/cloneDeep'

export default {
  name: 'Tetris',

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
    new_tetris_item: null,
    new_tetris_position: 0, //defines the cursor
    game_interval: null,
    tetris_before_rotation: null,
    score_for_row: 10,
    total_score: 0,
    game_over: ''
  }),

  created() {
    this.add_new_tetris()
    this.keyboard_controls()
  },

  mounted() {
    this.start_new_game(true)
  },

  methods: {
    start_new_game(init = false) {
      if (!init) {
        Object.assign(this.$data, this.$options.data.apply(this))
        this.add_new_tetris()
      }
      this.game_interval = setInterval(this.game_flow, 1000)
    },

    game_flow() {
      if (this.should_stop_tetris_flow()) return
      let arena = [...this.arena]
      let pos = this.new_tetris_position //pos = position
      let rows_count = this.new_tetris_item.rows_count - 1

      arena = this.clear_arena(arena)

      for (
        let ar_row = pos, t_row = rows_count;
        ar_row >= 0 && t_row >= 0;
        ar_row--, t_row--
      ) {
        //ar_row = arena row,
        arena[ar_row] = this.merge_rows(
          arena[ar_row],
          this.new_tetris_item.value[t_row]
        )
      }

      if (!this.arena_collides(arena)) {
        this.new_tetris_item.rotated = false
        this.tetris_before_rotation = null
        this.arena = arena
        this.new_tetris_position++
      } else {
        if (this.arena.every(row => row.includes(1)) && pos < 2) {
          this.game_over = 'GAME OVER'
          clearInterval(this.game_interval)
        } else if (this.new_tetris_item.rotated) {
          this.new_tetris_item = { ...this.tetris_before_rotation }
          this.game_flow()
        } else {
          this.remove_active_tetris()
          this.check_for_score([...this.arena])
          this.add_new_tetris()
        }
      }
    },

    keyboard_controls() {
      document.addEventListener('keydown', event => {
        if (this.game_over) return
        if (event.code === 'ArrowLeft') {
          this.change_tetris_position(-1)
        } else if (event.code === 'ArrowRight') {
          this.change_tetris_position(1)
        } else if (event.code === 'ArrowUp') {
          const new_matrix = this.rotate_matrix([
            ...this.new_tetris_item.matrix
          ])
          this.tetris_rotated(new_matrix)
        } else if (event.code === 'ArrowDown') {
          this.game_flow()
        }
      })
    },

    arena_collides(arena) {
      let collides = false
      for (let index = 0; index < arena.length; index++) {
        if (this.row_collides(arena[index])) {
          collides = true
          break
        }
      }
      return collides
    },

    should_stop_tetris_flow() {
      if (this.new_tetris_position > 8) {
        this.check_for_score([...this.arena])
        this.remove_active_tetris()
        this.add_new_tetris()
        return true
      }
    },

    clear_arena(arena) {
      //clear arena from active tetris row (active tetris has number 2)
      return arena.map(row => {
        return row.map(col => {
          return col === 2 ? 0 : col
        })
      })
    },

    remove_active_tetris() {
      //tetris reached the end so make the rows containing number 2 to become 1
      this.arena = this.arena.map(row => {
        return row.map(col => (col === 2 ? 1 : col))
      })
    },

    merge_rows(arr1, arr2) {
      return arr1.map((item, index) => {
        return (item += arr2[index])
      })
    },

    add_new_tetris() {
      const random_tetris = Math.floor(Math.random() * 6)
      this.new_tetris_item = { ...tetris_items[random_tetris] }
      this.new_tetris_position = 0
    },

    row_collides(arr) {
      return arr.some(item => item > 2)
    },

    rotate_matrix(original_matrix) {
      //rotate the matrix 90 deg
      if (!this.new_tetris_item.is_rotatable) return original_matrix
      let matrix = original_matrix.reverse()
      let new_matrix = []
      const rows = matrix.length

      matrix[0].forEach((arr, col_index) => {
        let matrix_row = []
        for (let index = 0; index < rows; index++) {
          matrix_row.push(matrix[index][col_index])
        }
        new_matrix.push(matrix_row)
      })
      return new_matrix
    },

    clear_matrix(matrix) {
      //remove first and/or last row if is full of 0
      matrix = this.clear_horizontally([...matrix])
      matrix = this.clear_vertically([...matrix])
      return matrix
    },

    clear_vertically(matrix) {
      if (matrix.every(row => !row[0])) {
        matrix = matrix.map(row => row.slice(1))
      }
      if (matrix.every(row => !row[matrix[0].length - 1])) {
        matrix = matrix.map(row => row.slice(0, -1))
      }
      return matrix
    },

    clear_horizontally(matrix) {
      if (matrix[0].every(item => !item)) matrix.splice(0, 1)
      if (matrix[matrix.length - 1].every(item => !item))
        matrix.splice(matrix.length - 1, 1)
      return matrix
    },

    tetris_rotated(matrix) {
      if (!this.new_tetris_item.is_rotatable) return
      if (this.tetris_before_rotation) {
        this.tetris_before_rotation = null
        return
      }
      let starts = this.new_tetris_item.starts
      let c_matrix = [...matrix] // c_matrix => copy matrix
      const expands = c_matrix[0].length
      let rotated_tetris = []
      if (starts + expands > 9) {
        starts -= starts + expands - 9
      }

      c_matrix = this.clear_matrix([...c_matrix])

      for (let row = 0; row < c_matrix.length; row++) {
        let new_row = []
        for (let index = 0; index <= 6; index++) {
          if (index === starts) {
            new_row.push(...c_matrix[row])
            if (c_matrix[row].length < 3) {
              const times = 3 - c_matrix[row].length
              for (let index = 0; index < times; index++) {
                new_row.push(0)
              }
            }
          } else {
            new_row.push(0)
          }
        }
        rotated_tetris.push(new_row)
      }
      this.tetris_before_rotation = { ...this.new_tetris_item }
      this.new_tetris_item.matrix = matrix
      this.new_tetris_item.rotated = true
      this.new_tetris_item.starts = starts
      this.new_tetris_item.expands = c_matrix[0].length
      this.new_tetris_item.value = rotated_tetris
      this.new_tetris_item.rows_count = rotated_tetris.length
      this.new_tetris_position--
      this.game_flow()
    },

    change_tetris_position(pos) {
      //pos => position can be -1 or 1
      let new_pos = this.new_tetris_item.starts + pos // new_pos => new position
      let tetris = [...this.new_tetris_item.value]

      if (!this.can_move_tetris(pos)) return //tetris can't go more left or right

      let new_tetris = tetris.map(row => {
        if (pos < 0) {
          let new_row = row.slice(1)
          new_row.push(0)
          return new_row
        } else {
          let new_row = row.slice(0, -1)
          new_row.unshift(0)
          return new_row
        }
      })

      this.new_tetris_item.starts = new_pos
      this.new_tetris_item.value = new_tetris
      this.new_tetris_position--
      this.game_flow()
    },

    get_arena_rows(cursor, t_rows) {
      let a_rows = []
      for (let i = cursor, j = t_rows.length - 1; j >= 0 && i >= 0; i--, j--) {
        a_rows.push([...this.arena[i]])
      }
      return a_rows.reverse()
    },

    tetris_reached_bounds(rows, dir) {
      // :Boolean
      if (dir > 0) {
        return rows.some(row => row[rows[0].length - 1] !== 0)
      }
      return rows.some(row => row[0] !== 0)
    },

    check_bounds_and_position(dir) {
      if (this.tetris_reached_bounds(this.new_tetris_item.value, dir))
        return false //tetris cannot be moved outside of bounds
      return this.new_tetris_position !== 0
    },

    can_move_tetris(dir) {
      //dir => direction can be 1 (right) or -1 (left)
      if (!this.check_bounds_and_position(dir)) return false
      const cursor = this.new_tetris_position - 1
      const t_rows = _cloneDeep(this.new_tetris_item.value) //tetris rows
      const a_rows = this.get_arena_rows(cursor, t_rows) //arena rows

      if (dir > 0) {
        //tetris moved right
        return a_rows.every((row, index) => {
          const ends =
            t_rows[index].length -
            1 -
            t_rows[index]
              .slice()
              .reverse()
              .findIndex(row => row !== 0)
          return row[ends + 1] === 0
        })
      }
      return a_rows.every((row, index) => {
        const starts = t_rows[index].findIndex(row => row !== 0)
        return row[starts - 1] === 0
      }) //tetris moved left
    },

    check_for_score(arena) {
      let indexes_to_clear = []
      let c_arena = [...arena].reverse()

      c_arena.forEach((row, index) => {
        if (row.every(item => item >= 1)) {
          indexes_to_clear.push(index)
          this.total_score += this.score_for_row * (index + 1)
        }
      })

      for (let index = indexes_to_clear.length - 1; index >= 0; index--) {
        c_arena.splice(indexes_to_clear[index], 1)
      }
      indexes_to_clear.forEach(() => c_arena.push([0, 0, 0, 0, 0, 0, 0, 0, 0]))
      this.arena = c_arena.reverse()
    }
  }
}
