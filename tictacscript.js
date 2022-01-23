const whose_turn = document.getElementById("turn-show");
const restart = document.getElementById("restart");
const round_tracker=document.getElementById("rounds");

const x_class = "x";
const circle_class = "circle";

const cell_items = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board-cells");

//getting the elements of footer score card

const x_score = document.getElementById("x-counter");
const tie_score = document.getElementById("tie-counter");
const o_score = document.getElementById("o-counter");

// getting the elements of the message box

const messageBox = document.getElementById("message-text");
const user_result_game_message = document.querySelector("[lost-won-message]");
const who_took_the_game = document.querySelector("[takes-the-round]");
const quitBtn = document.getElementById("quit");

const turn_array = [x_class, circle_class];
let turn = turn_array[Math.floor(Math.random() * 2)];
let circleTurn;
let x_point = 0;
let o_point = 0;
let tie_point = 0;
let currentRound=0;
let totalRounds = 10;
let totalScoreTracker = 0;
const winning_combination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

startGame();

restart.addEventListener("click", startGame);
quitBtn.addEventListener("click", () => {
  messageBox.classList.remove("show");
  resetPoint();
  startGame();
});

function resetPoint() {
  x_score.textContent = "";
  o_score.textContent = "";
  tie_score.textContent = "";
  x_point = 0;
  o_point = 0;
  tie_point = 0;
  totalScoreTracker = 0;
  round_tracker.textContent=`Round Tracker`
}

function startGame() {
  if (turn === x_class) {
    circleTurn = false;
    whose_turn.innerText = "X's TURN";
  } else {
    circleTurn = true;
    whose_turn.innerText = "O's TURN";
  }

  cell_items.forEach((cellItems) => {
    cellItems.classList.remove(x_class);
    cellItems.classList.remove(circle_class);
    cellItems.removeEventListener("click", handleClick);
    cellItems.addEventListener("click", handleClick, { once: true });
  });
  // messageBox.classList.remove('show');
  hoverBoard();
  restart.classList.remove("restartNewGame");

}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? circle_class : x_class;
  placeMarker(cell, currentClass);

  if (checkWin(currentClass)) {
    checkWhoWon(currentClass);
    startGame();
    round_tracker.textContent=`${currentRound+=1} Round completed`
  } else if (isdraw()) {
    endGame(true);
    checkMessage();
    round_tracker.textContent=`${currentRound+=1} Round completed`
    restart.classList.add("restartNewGame");
  } else {
    swapMarker();
    hoverBoard();
  }
}

function endGame(draw) {
  if (draw) {
    tie_point = tie_point + 1;
    totalScoreTracker = totalScoreTracker + 1;
    tie_score.textContent = tie_point;
  }
}

function checkWhoWon(currentClass) {
  if (currentClass === x_class) {
    x_point = x_point + 1;
    totalScoreTracker = totalScoreTracker + 1;
    x_score.textContent = x_point;
  } else {
    o_point = o_point + 1;
    totalScoreTracker = totalScoreTracker + 1;
    o_score.textContent = o_point;
  }
  // console.log(totalScoreTracker)
  checkMessage();
}

function isdraw() {
  return [...cell_items].every((items) => {
    return (
      items.classList.contains(x_class) ||
      items.classList.contains(circle_class)
    );
    
  });
 
}

function placeMarker(cell, currentClass) {
  cell.classList.add(currentClass);
}
function swapMarker() {
  circleTurn = !circleTurn;
  if (circleTurn == true) {
    whose_turn.innerText = "O's TURN";
  } else {
    whose_turn.innerText = "X's TURN";
  }
}

function hoverBoard() {
  board.classList.remove(x_class);
  board.classList.remove(circle_class);
  if (circleTurn) {
    board.classList.add(circle_class);
  } else {
    board.classList.add(x_class);
  }
}

function checkWin(currentClass) {
  return winning_combination.some((combination) => {
    return combination.every((index) => {
      return cell_items[index].classList.contains(currentClass);
    });
  });
}

function checkMessage() {
  if (totalScoreTracker === totalRounds) {
    if (tie_point === totalRounds || x_point === o_point) {
      user_result_game_message.textContent = `Match is drawn between X and O with points X : ${x_point} and O : ${o_point}`;
      messageBox.classList.add("show");
    } else if (x_point > o_point || o_point === 0) {
      user_result_game_message.textContent = `Congratulations !!! X won the match`;
      who_took_the_game.textContent = `X took away the match with ${x_point} points`;
      messageBox.classList.add("show");
    } else {
      user_result_game_message.textContent = `Congratulations !!! O won the match`;
      who_took_the_game.textContent = `O took away the match with ${o_point} points`;
      messageBox.classList.add("show");
    }
  }
}
