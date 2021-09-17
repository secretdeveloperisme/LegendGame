const COLS = 30;
const ROWS = 30;
const SNAKE_COLOR = "blue";
const APPLE_COLOR = "red";
const BLOCK_SIZE = 15;
const KEY = {
  UP : "ArrowUp",
  RIGHT : "ArrowRight",
  DOWN : "ArrowDown",
  LEFT : "ArrowLeft"
}
const LEVELS = {
  0 : 600,
  1 : 500,
  2 : 400,
  3 : 300,
  4 : 200,
  5 : 100,
  6 : 50,
  7 : 0
}
Object.freeze(LEVELS);
Object.freeze(KEY);