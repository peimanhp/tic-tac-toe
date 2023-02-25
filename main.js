let gameBoard = {};
// const magicSquare = [8, 1, 6, 3, 5, 7, 4, 9, 2];
const result = document.querySelector(".result");
const restartBtn = document.querySelector(".restart");
const scoreBoard = document.querySelector(".score-board");

function Player(name) {
  this.name = name;
  this.signs = [];
  this.wins = [0];
}
const playerX = new Player("X");
const playerO = new Player("O");

const cells = document.querySelectorAll(".cells");
function cellsAddEvents() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", checkSign);
    gameBoard[cells[i].id] = cells[i].innerHTML;
  }
}
cellsAddEvents();
console.log(gameBoard);

let clickCounter = 0;
function checkSign(e) {
  clickCounter++;
  if (clickCounter % 2 === 1) {
    whosTurn(e, playerX.name, playerX.signs, playerX.wins);
    console.log(playerX.signs);
  } else {
    whosTurn(e, playerO.name, playerO.signs, playerO.wins);
    // console.log(playerO.signs);
  }
  e.target.removeEventListener("click", checkSign);
}

function whosTurn(e, playerName, playerSigns, playerWins) {
  e.target.innerHTML = playerName;
  gameBoard[e.target.id] = e.target.innerHTML;
  playerSigns.push(Number(e.target.id));
  winCheck(playerSigns, playerName, playerWins);
}

let gameOver = false;

function winCheck(arr, playerName, playerWins) {
  if (arr.length < 3) return;
  else if (arr.length == 3) {
    const sum = arr.reduce((acc, cur) => acc + cur);
    if (sum == 15) {
      gameOver = true;
      playerWin(playerName, playerWins);
    }
  } else if (arr.length == 4) {
    for (let i = 0; i < arr.length; i++) {
      let sum = 0;
      for (let j = 0; j < arr.length; j++) {
        if (i == j) continue;
        else sum += arr[j];
      }
      console.log(sum);
      if (sum == 15) {
        gameOver = true;
        playerWin(playerName, playerWins);
        break;
      }
    }
  } else if (arr.length == 5) {
    for (let i = 0; i < arr.length - 2; i++) {
      if (gameOver === true) break;
      let sum = 0;
      for (let j = i + 1; j < arr.length - 1; j++) {
        if (gameOver === true) break;
        for (let k = j + 2; k < arr.length; k++) {
          sum = arr[i] + arr[j] + arr[k];
          console.log(sum);
          if (sum == 15) {
            gameOver = true;
            playerWin(playerName, playerWins);
            break;
          } else playerWin();
        }
      }
    }
  }
}

function playerWin(playerName, playerWins) {
  if (gameOver === true) {
    result.innerHTML = `Player ${playerName} Won!`;
    playerWins[0] += 1;
  } else result.innerHTML = `It's Tie`;
  scoreBoard.innerHTML = `X: ${playerX.wins[0]} - O: ${playerO.wins[0]}`;
  scoreBoard.classList.add("show");
  restartBtn.classList.add("show");
  stopPlaying();
}

function stopPlaying() {
  for (const cell of cells) {
    cell.removeEventListener("click", checkSign);
  }
}

restartBtn.addEventListener("click", resetGame);

function resetGame() {
  playerX.signs = [];
  playerO.signs = [];
  result.innerHTML = "";
  restartBtn.classList.remove("show");
  for (const cell of cells) {
    cell.innerHTML = "";
  }
  cellsAddEvents();
  clickCounter = 0;
  gameOver = false;
}
