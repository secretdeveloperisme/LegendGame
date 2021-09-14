const cards = [
  {
    name : "cheese_burger",
    src : "assets/images/cheeseburger.png"
  },
  {
    name : "cheese_burger",
    src : "assets/images/cheeseburger.png"
  },
  {
    name : "fries",
    src : "assets/images/fries.png"
  },
  {
    name : "fries",
    src : "assets/images/fries.png"
  },
  {
    name : "hotdog",
    src : "assets/images/hotdog.png"
  },
  {
    name : "hotdog",
    src : "assets/images/hotdog.png"
  },
  {
    name : "ice_cream",
    src : "assets/images/ice-cream.png"
  },
  {
    name : "ice_cream",
    src : "assets/images/ice-cream.png"
  },
  {
    name : "milkshake",
    src : "assets/images/milkshake.png"
  },
  {
    name : "milkshake",
    src : "assets/images/milkshake.png"
  },
  {
    name : "pizza",
    src : "assets/images/pizza.png"
  },
  {
    name : "pizza",
    src : "assets/images/pizza.png"
  }
];
const gameBoard = document.querySelector("#gameBoard");
const scoreOutput = document.querySelector("#score");
let choseCards = [];
let score = 0;

document.addEventListener("DOMContentLoaded",()=>{
  function renderBoard(){
    gameBoard.innerHTML = "";
    cards.sort(()=>Math.random() - 0.5);
    cards.forEach((value, index)=>{
      let card = document.createElement("img");
      card.setAttribute("data-id",index);
      card.addEventListener("click",flipCard)
      card.src = "assets/images/blank.png";
      gameBoard.appendChild(card);
    })
  }
  function flipCard(){
    let chooseId = this.getAttribute("data-id");
    this.src = cards[chooseId].src;
    let chooseCard = {
      id : chooseId,
      name : cards[chooseId].name
    }
    choseCards.push(chooseCard);
    if(choseCards.length === 2){
      if(choseCards[0].id === choseCards[1].id){
        choseCards.pop()
      }
      else
        setTimeout(checkMatch, 500);
    }
  }
  function checkMatch(){
    chose0 = choseCards[0];
    chose1 = choseCards[1];
    if(chose0.name === chose1.name){
      document.querySelector(`[data-id="${chose0.id}"]`).src = "assets/images/white.png";
      document.querySelector(`[data-id="${chose1.id}"]`).src = "assets/images/white.png";
      scoreOutput.textContent = ++score;
    }
    else{
      document.querySelector(`[data-id="${chose0.id}"]`).src = "assets/images/blank.png";
      document.querySelector(`[data-id="${chose1.id}"]`).src = "assets/images/blank.png";
    }
    choseCards.splice(0,choseCards.length);
    if(score === cards.length / 2){
      score = 0;
      setTimeout(() => {
        alert("Bạn đã chiến thắng!")
        scoreOutput.textContent = score;
      }, 100);
      renderBoard()
    }
  }
  renderBoard()

})