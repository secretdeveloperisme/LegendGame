class Apple{
  context 
  x
  y
  constructor(context){
    this.context = context;
    this.randomPosition();
  }
  randomPosition(){
    this.x = Math.floor(Math.random() * COLS);
    this.y = Math.floor(Math.random() *  ROWS);
  }
  draw(){
    this.context.fillStyle = APPLE_COLOR;
    this.context.fillRect(this.x,this.y,1,1);
  }
  
}