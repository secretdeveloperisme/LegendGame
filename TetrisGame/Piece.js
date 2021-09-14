class Piece{
  x
  y
  color
  shape
  context
  typeId
  constructor(context) {
    this.context = context;
    this.spawn();
  }
  spawn(){
    this.typeId = this.randomizeTetrominoType(COLORS.length - 1);
    this.shape = SHAPES[this.typeId];
    this.color = COLORS[this.typeId];
    [this.x, this.y] = [0, 0];
  }
  draw(){
    this.context.fillStyle = this.color;
    this.shape.forEach((row, y) => {
      row.forEach((col, x )=> {
        if(col > 0){
          this.context.fillRect(this.x + x, this.y + y,1 , 1);
        }
      })
    })
  }
  move(p){
    this.x = p.x;
    this.y = p.y;
    this.shape = p.shape;
  }
  setStartingPosition(){
    this.x = this.typeId === 4 ? 4 : 3;
  }
  randomizeTetrominoType(noOfTypes){
    return Math.floor(Math.random() * noOfTypes + 1);
  }
}