const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const winTextMessage=document.querySelector("[data-winning-message-text]");
const winMessageElement=document.getElementById('game-message');
const restartButton=document.getElementById('restartButton');

const win_combination =[
 [0,1,2],
 [3,4,5],
 [6,7,8],
 [0,3,6],
 [1,4,7],
 [2,5,8],
 [0,4,8],
 [2,4,6]
]
let circleTurn;

//At the beginning of the game


startGame();

restartButton.addEventListener('click',startGame)

//--------------------------------------------------------------------------------------


function startGame() {
  circleTurn = false;
  cellElements.forEach((cellItems) => {
    // Let the click happen only once using {once:true}
    cellItems.classList.remove(X_CLASS);
    cellItems.classList.remove(CIRCLE_CLASS);
    cellItems.removeEventListener('click',handleClick);
    cellItems.addEventListener("click", handleClick, { once: true });
  });
  setBoardHover();
  winMessageElement.classList.remove('show');
}

// To handle the click -----------------------------------------------------------------

function handleClick(e) {
  const cell = e.target;              // it return the cell which is clicked
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;

  placeMarker(cell, currentClass);

  if(checkWin(currentClass)){
   endGame(false);
  }
  else if(isdraw()){
    endGame(true);
  }
  else{
    swapMarker();
    setBoardHover();
  }
  
}

// It checks if it a draw or not , if yes the dispaly the "Draw" Message else display the winning message --------------------------------------------------

function endGame(draw){
  if(draw){
    winTextMessage.innerText = "Draw !!!"
  }
  else{
    winTextMessage.innerText =`${circleTurn ? "0's " :"X's "} wins !!!`
  }
  winMessageElement.classList.add('show');

}


// if every cell contains a class , then it's a draw-----------------------

function isdraw(){
  return [...cellElements].every((item)=>{
    return item.classList.contains(X_CLASS) || item.classList.contains(CIRCLE_CLASS);
  })
}

// Placing the marker

function placeMarker(cell, currentClass) {
  cell.classList.add(currentClass);
}

//Swaping the markers turn
function swapMarker() {
  circleTurn = !circleTurn;
}

//setting the next hover marker

function setBoardHover() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}


//Checking for winning combination

function checkWin(currentClass){
 return win_combination.some((combination)=>{
  return combination.every((index)=>{
   return cellElements[index].classList.contains(currentClass)
  })
 })
}