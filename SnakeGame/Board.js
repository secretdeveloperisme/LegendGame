class Board{
  context
  snake
  apple
  constructor(context) {
    this.context = context;
    this.snake = new Snake(context);
    this.apple = new Apple(context);
    this.init()
  }
  init(){
    this.context.canvas.width = COLS * BLOCK_SIZE;
    this.context.canvas.height = ROWS * BLOCK_SIZE;
    this.context.scale(BLOCK_SIZE,BLOCK_SIZE);
  }
  draw(){
    this.snake.draw();
    this.apple.draw();
  }
  clearBoard(){
    this.context.clearRect(0,0,this.context.canvas.width,this.context.canvas.width);
  }
  checkValid(head){
    let isInHorizontalWall = head.x < COLS  && head.x >= 0;
    let isInVerticalWall = head.y < ROWS  && head.y >= 0;
    let isNotEatMyself = this.snake.coordinates.every(coordinate =>{
      return !(coordinate.x == head.x && coordinate.y == head.y);
    }) 
    console.log(isInHorizontalWall,isInVerticalWall);
    return isInHorizontalWall && isInVerticalWall && isNotEatMyself;  
  }
  eatApple(head){
    if(head.x == this.apple.x && head.y ==this.apple.y){
      this.snake.coordinates.unshift(head);
      this.apple.randomPosition();
      this.apple.draw();
      return true;
    }
    return false;      
  }
  reset(){
    this.snake.initSnake();
    this.apple.randomPosition();
  }
}