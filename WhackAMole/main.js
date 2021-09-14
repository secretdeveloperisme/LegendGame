const board = document.querySelector("#board");
const squares = document.querySelectorAll(".square");
const scoreOutput = document.querySelector("#score");
const timeLeftOutput = document.querySelector("#timeLeft");
const btnStart = document.querySelector("#btnStart");
let timeLeft = Number.parseInt(timeLeftOutput.textContent);
let score = 0;
let randomMoleId = 0;
let runningGame, countdown;
let time = {start : 0, elapsed : 0, level : 800};
function renderBoard(){
  timeLeftOutput.textContent = "60";
  timeLeft = 60;
  scoreOutput.textContent = "0";
  squares.forEach((value,index)=>{
    value.addEventListener("mouseup",hitTheMole);
  })
  countdown = setInterval(countdownTime, 1000);
  runningGame = requestAnimationFrame(randomPosition);
}
function randomPosition(now = 0){
  time.elapsed = now - time.start;
  if(time.elapsed > time.level){
    squares.forEach((value,index)=>{
      value.classList.remove("mole","broken");
    })
    randomMoleId = Math.floor(Math.random()*9);
    squares[randomMoleId].classList.add("mole");
    time.start = performance.now();
  }
  runningGame = requestAnimationFrame(randomPosition);
}
function hitTheMole(){
  let id = this.getAttribute("data-id");
  document.querySelector("body").style.cursor = 'url("hammer_hit.png"),default';
  setTimeout(() => {
    document.querySelector("body").style.cursor = "url('hammer.png'), default";
  }, 200);
  if(id == randomMoleId){
    score ++;
    scoreOutput.textContent = score;
    this.classList.add("broken")
  }
}
function countdownTime(){
  timeLeft--;
  timeLeftOutput.textContent = timeLeft;
  if(timeLeft === 0){
    cancelAnimationFrame(runningGame)
    clearInterval(countdown);
    alert("Game over, Your score is : "+ score);
  }
}
btnStart.addEventListener("click",()=>{
  renderBoard()
})