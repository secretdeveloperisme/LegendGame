const gameBoard = document.querySelector("#board");
const btnStart = document.querySelector("#btnStart");
const ctxGameBoard = gameBoard.getContext("2d");
const levelOutput  = document.querySelector("#levelOutput");
const scoreOutput = document.querySelector("#scoreOutput");

const moves = {
  [KEY.LEFT] : snake => ({x: snake.coordinates[0].x - 1, y : snake.coordinates[0].y}),
  [KEY.RIGHT] : snake => ({x: snake.coordinates[0].x + 1, y : snake.coordinates[0].y}),
  [KEY.DOWN] : snake => ({x: snake.coordinates[0].x , y : snake.coordinates[0].y + 1}),
  [KEY.UP] : snake => ({x: snake.coordinates[0].x , y : snake.coordinates[0].y - 1})
}
let runningGame;
let time = {start : 0, elapsed : 0, level : LEVELS[0]};
let board = new Board(ctxGameBoard);;
let accountValues = {
  score : 0,
  level : 0
};
let account = new Proxy(accountValues,{
  set : (target,property,value) =>{
    target[property] = value;
    if(property === "score"){
      scoreOutput.textContent = value;
    }
    else
      if(property === "level"){
        levelOutput.textContent = value;
      }
  }
})
function start(now = 0){
  time.elapsed = now - time.start;
  if(time.elapsed > time.level){
    let head = moves[board.snake.direction](board.snake);
    if(!board.checkValid(head)){
      gameOver();
      return;
    } 
    board.clearBoard();
    if(!board.eatApple(head))
      board.snake.addHead(head);
    else {
      account.score ++;
      if(account.score === 5){
        account.level++;
        time.level = LEVELS[account.level];
        account.score =0;
      }
    }
    board.draw()
    time.start = performance.now();
  }
  runningGame = requestAnimationFrame(start)
}
btnStart.addEventListener("click",(event)=>{
  board.reset();
  runningGame = requestAnimationFrame(start);
})
document.addEventListener("keyup",event=>{
  if(moves[event.key]){
    let head = moves[event.key](board.snake);
    if(!(head.x === board.snake.coordinates[1].x && head.y === board.snake.coordinates[1].y) && event.key != board.snake.direction){
      if(board.checkValid(head)){
        board.snake.direction = event.key;
        board.clearBoard();
        if(!board.eatApple(head))
            board.snake.addHead(head);
        else {
          account.score ++;
          if(account.score === 5){
            account.level++;
            time.level = LEVELS[account.level];
            account.score = 0;
          }
        }
        board.draw();
      }
      else {
        gameOver();
      }
      
    }
  }
})
function gameOver(){
    board.context.fillStyle = "#000";
    board.context.fillRect(8,5, 12,3);
    board.context.font = "2px Comic Sans MS";
    board.context.fillStyle = "red";
    board.context.fillText("GAME OVER", 8 ,7);
  cancelAnimationFrame(runningGame)
}
