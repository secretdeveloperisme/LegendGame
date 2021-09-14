class Board {
  context;
  contextNext;
  grid;
  piece;
  next;
  requestId;
  time;
  constructor(context,contextNext){
    this.context = context;
    this.contextNext = contextNext;
    this.init();
  }
  init(){
    //context 
    this.context.canvas.width = COLS * BLOCK_SIZE;
    this.context.canvas.height = ROWS * BLOCK_SIZE;
    this.context.scale(BLOCK_SIZE,BLOCK_SIZE);
    //context Next
    this.contextNext.canvas.width = 4 * BLOCK_SIZE;
    this.contextNext.canvas.height = 4 * BLOCK_SIZE;
    this.contextNext.scale(BLOCK_SIZE, BLOCK_SIZE);
  }
  reset() {
    this.grid = this.getEmptyBoard();
    this.piece = new Piece(this.context);
    this.piece.setStartingPosition();
    this.getNewPiece();
  }
  getNewPiece(){
    this.next = new Piece(this.contextNext);
    this.contextNext.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    this.next.draw();
  }
  draw(){
    this.piece.draw();
    this.drawBoard();
  }
  drawBoard(){
    this.grid.forEach((row,y)=>{
      row.forEach((col, x)=>{
        if(col > 0){
          this.context.fillStyle = COLORS[col];
          this.context.fillRect(x,y,1,1);
        }
      })
    })
  }
  getEmptyBoard(){
    return Array.from(
      {length : ROWS}, ()=>Array(COLS).fill(0)
    );
  }
  valid(p){
    return p.shape.every((row, yIndex)=>{
      return row.every((col, xIndex)=>{
        let x = p.x + xIndex;
        let y = p.y + yIndex;
        return (col == 0 || (this.isInsideWall(x) && this.isAboveFloor(y) && this.isNotOccupied(x,y)))
      })
    })
  }
  isInsideWall(x){
    return (x >= 0 && x < COLS);
  }
  isAboveFloor(y){
    return y < ROWS;
  }
  isNotOccupied(x, y){
    return this.grid[y] && this.grid[y][x] === 0;
  } 
  freeze() {
    this.piece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.grid[y + this.piece.y][x + this.piece.x] = value;  
        }
      });
    });
  }
  rotate(piece){
    // use rotate matrix, linear algebra
    // clone piece 
    let p = JSON.parse(JSON.stringify(piece));
    // transpose matrix 
    for(let i = 0 ; i < p.shape.length ; i ++){
      for(let j = 0; j < i ; j ++){
        [p.shape[i][j],p.shape[j][i]] = [p.shape[j][i], p.shape[i][j]];
      }
    }
    // reverse row
    p.shape.forEach(row => row.reverse());
    return p;
  }
  drop(){
    let p = moves[KEY.DOWN](this.piece);
    if(this.valid(p)){
      this.piece.move(p);
      return true;
    }
    else{
      this.freeze();
      this.clearLines();
      if(this.piece.y === 0){
        return false;
      }
      this.piece = this.next;
      this.piece.context = this.context;
      this.piece.setStartingPosition();
      this.getNewPiece();
    }
    return true;
  }
  clearLines(){
    let lines = 0;
    this.grid.forEach((row,yIndex)=>{
      if(row.every(col => col > 0)){
        lines ++;
        this.grid.splice(yIndex,1);
        this.grid.unshift(Array(COLS).fill(0));
      }
    })
    if(lines > 0){
      account.score += this.getLineClearPoints(lines);
      account.lines += lines;
      if(account.lines >= LINES_PER_LEVEL){
        account.level ++;
        account.lines -= LINES_PER_LEVEL;
        this.time = LEVEL[account.level];
      }
    }
  }
  getLineClearPoints(lines){
    const lineClearPoints = 
      lines === 1 ? POINTS.SINGLE:
      lines === 2 ? POINTS.DOUBLE:
      lines === 3 ? POINTS.TRIPLE:
      lines === 4 ? POINTS.TETRIS:
      0;
    return (account.level + 1) * lineClearPoints;
  }
}