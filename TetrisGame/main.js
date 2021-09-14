  const moves = {
    [KEY.LEFT] : piece => ({...piece, x : piece.x - 1}),
    [KEY.RIGHT] : piece =>({...piece, x : piece.x + 1}),
    [KEY.DOWN] : piece => ({...piece, y : piece.y + 1}),
    [KEY.UP] : piece => board.rotate(piece),
    [KEY.SPACE]: piece => ({ ...piece, y: piece.y + 1 }),
  }
  const gameBoard = document.querySelector("#gameBoard");
  const btnPlay = document.querySelector("#btnPlay");
  const ctxGameBoard = gameBoard.getContext("2d");
  const next = document.querySelector("#next");
  const ctxNext = next.getContext("2d");
  const scoreOutput = document.querySelector("#scoreOutput");
  const linesOutput = document.querySelector("#lineOutput");
  const levelOutput = document.querySelector("#levelOutput");
  let board = new Board(ctxGameBoard,ctxNext);
  let requestID, time;
  // declare account Value ;
  let accountValues = {
    score : 0,
    level : 0,
    lines : 0,
  }
  // update Output Value
  function updateOutput(property,value){
    if(property === "score"){
      scoreOutput.textContent = value;
    }
    else
      if(property === "level"){
        levelOutput.textContent = value;
      }
      else 
        if(property === "lines"){
          linesOutput.textContent = value;
        }
  }
  // use proxy for account value, when a property of account value update , update output value 
  let account = new Proxy(accountValues,{
    set : (target,property,value)=>{
      target[property] = value;
      updateOutput(property, value);
      return true;
    }
  })   
  // add events 
  function initEvents(){
    btnPlay.addEventListener("click",()=>{
      resetGame();
      time.start = performance.now();
      if(requestID){
        cancelAnimationFrame(animate);
      }
      animate();
    })
    document.addEventListener("keydown", (event)=>{
      if(event.key === KEY.P){
        pause();
      }
      if(event.key === KEY.ESC){
        gameOver();
      }
      if(moves[event.key]){
        event.preventDefault();
        let p = moves[event.key](board.piece);
        if(event.key === KEY.SPACE){
          while(board.valid(p)){
            account.score += POINTS.HARD_DROP;
            board.piece.move(p);
            p = moves[KEY.DOWN](board.piece);
          }
        }
        else 
          if(board.valid(p)){
            board.piece.move(p);
            if(event.key === KEY.DOWN){
              account.score += POINTS.SOFT_DROP;
            }
          }
  
      }
    })
  }
  // reset game 
  function resetGame(){
    account.score = 0;
    account.level = 0;
    account.lines = 0;
    board.reset();
    time = {start : 0, elapsed : 0, level : LEVEL[0]};
  }
  // animation 
  function animate(now = 0){
    // console.log(now,time.start);
    time.elapsed = now - time.start;
    if(time.elapsed > time.level){
      time.start = now;
      if(!board.drop()){
        gameOver();
        return;
      } 
    }
    ctxGameBoard.clearRect(0,0,ctxGameBoard.canvas.width,ctxGameBoard.canvas.height);
    board.draw();
    requestID = requestAnimationFrame(animate);
  } 
  function gameOver(){
    cancelAnimationFrame(requestID);
    board.context.fillStyle = "#000";
    board.context.fillRect(1,3,8,1.2);
    board.context.font = "1px Comic Sans MS";
    board.context.fillStyle = "red";
    board.context.fillText("GAME OVER", 2 ,4);
  }
  function pause(){
    if(!requestID){
      animate()
      return;
    }
    cancelAnimationFrame(requestID);
    requestID = null;
    board.context.fillStyle = "#000";
    board.context.fillRect(1,3,8,1.2);
    board.context.font = "1px Comic Sans MS";
    board.context.fillStyle = "yellow";
    board.context.fillText("PAUSED",3,4);
  }
  initEvents();