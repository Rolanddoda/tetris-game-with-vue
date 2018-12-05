export const tetris_items = [
  {
    type: "T",
    value: [[0, 0, 0, 2, 2, 2, 0, 0, 0], [0, 0, 0, 0, 2, 0, 0, 0, 0]],
    rows_count: 2,
    matrix: [[2, 2, 2], [0, 2, 0]],
    starts: 3, //start shows the position of tetris can be [0,1,2,3,4,5,6]
    expands: 3, //how many rows the tetris expanded
    rotated: false,
    is_rotatable: true
  },

  {
    type: "Z",
    value: [[0, 0, 0, 2, 2, 0, 0, 0, 0], [0, 0, 0, 0, 2, 2, 0, 0, 0]],
    rows_count: 2,
    matrix: [[2, 2, 0], [0, 2, 2]],
    starts: 3,
    expands: 3,
    rotated: false,
    is_rotatable: true
  },

  {
    type: "S",
    value: [[0, 0, 0, 0, 2, 2, 0, 0, 0], [0, 0, 0, 2, 2, 0, 0, 0, 0]],
    rows_count: 2,
    matrix: [[0, 2, 2], [2, 2, 0]],
    starts: 3,
    expands: 3,
    rotated: false,
    is_rotatable: true
  },

  {
    type: "I",
    value: [
      [0, 0, 0, 0, 2, 0, 0, 0, 0],
      [0, 0, 0, 0, 2, 0, 0, 0, 0],
      [0, 0, 0, 0, 2, 0, 0, 0, 0]
    ],
    rows_count: 3,
    matrix: [[0, 2, 0], [0, 2, 0], [0, 2, 0]],
    starts: 4,
    expands: 1,
    rotated: false,
    is_rotatable: true
  },

  {
    //I but horizontal
    type: "IH",
    value: [[0, 0, 0, 2, 2, 2, 0, 0, 0]],
    rows_count: 1,
    matrix: [[0, 0, 0], [2, 2, 2], [0, 0, 0]],
    starts: 3,
    expands: 3,
    rotated: false,
    is_rotatable: true
  },

  {
    type: "O",
    value: [[0, 0, 0, 0, 2, 2, 0, 0, 0], [0, 0, 0, 0, 2, 2, 0, 0, 0]],
    rows_count: 2,
    matrix: [[0, 2, 2], [0, 2, 2]],
    starts: 4,
    expands: 2,
    rotated: false,
    is_rotatable: false
  },

  {
    type: "L",
    value: [
      [0, 0, 0, 2, 0, 0, 0, 0, 0],
      [0, 0, 0, 2, 0, 0, 0, 0, 0],
      [0, 0, 0, 2, 2, 0, 0, 0, 0]
    ],
    rows_count: 3,
    matrix: [[2, 0, 0], [2, 0, 0], [2, 2, 0]],
    starts: 3,
    expands: 2,
    rotated: false,
    is_rotatable: true
  }
];
