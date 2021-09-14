class Snake{
  coordinates
  context
  direction
  constructor(context){
    this.context = context;
    this.initSnake();
   
  }
  draw(){
    this.context.fillStyle = SNAKE_COLOR;
    this.coordinates.forEach(coordinate =>{
      this.context.fillRect(coordinate.x,coordinate.y,1,1);
    })
  }
  initSnake(){ 
    this.coordinates = [
      {
        x : 10,
        y : 10
      },
      {
        x : 9,
        y : 10
      },
      {
        x : 8,
        y : 10
      },
      {
        x : 7,
        y : 10
      },
      {
        x : 6,
        y : 10
      },
      {
        x : 5,
        y : 10
      }
    ];
    this.direction = KEY.RIGHT;    
  }
  addHead(head){
    this.coordinates.unshift(head);
    this.coordinates.pop();
  }
  clearBoard(){
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }
  getHead(){
    return this.coordinates[0];
  }

}