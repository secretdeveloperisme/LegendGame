const ROWS = 20;
const COLS = 10;
const BLOCK_SIZE = 30;
const LINES_PER_LEVEL = 7;
const POINTS = {
  SINGLE : 100,
  DOUBLE : 300,
  TRIPLE : 500,
  TETRIS : 800,
  SOFT_DROP : 1,
  HARD_DROP : 2
}
const KEY = {
  LEFT: "ArrowLeft",
  RIGHT: "ArrowRight",
  DOWN: "ArrowDown",
  UP : "ArrowUp",
  SPACE : " ",
  ESC : "Escape",
  P : "p"
}
const COLORS = [
  'none',
  'cyan',
  'blue',
  'orange',
  'yellow',
  'green',
  'purple',
  'red'
];
const SHAPES = [
  [],
  [[0, 0, 0, 0],[1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
  [[2, 0, 0], [2, 2, 2], [0, 0, 0]],
  [[0, 0, 3], [3, 3, 3], [0, 0, 0]],
  [[4, 4], [4, 4]],
  [[0, 5, 5], [5, 5, 0], [0, 0, 0]],
  [[0, 6, 0], [6, 6, 6], [0, 0, 0]],
  [[7, 7, 0], [0, 7, 7], [0, 0, 0]]
];
const LEVEL = {
  0: 800,
  1: 720,
  2: 630,
  3: 550,
  4: 470,
  5: 380,
  6: 300,
  7: 220,
  8: 130,
  9: 100,
  10: 80,
  11: 80,
  12: 80,
  13: 70,
  14: 70,
  15: 70,
  16: 50,
  17: 50,
  18: 50,
  19: 30,
  20: 30,
}
Object.freeze(POINTS);
Object.freeze(LEVEL);
Object.freeze(KEY);
Object.freeze(COLORS);
Object.freeze(SHAPES);
Object.freeze(LEVEL);