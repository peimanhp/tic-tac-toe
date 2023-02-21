let gameBoard = {};
const magicSquare = [8, 1, 6, 3, 5, 7, 4, 9, 2];
let x = [];
let o = [];
const result = document.querySelector(".result");
const restartBtn = document.querySelector(".restart");
function Player(name) {
  this.name = name;
}
const playerX = new Player("x");
const playerO = new Player("o");

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
    e.target.innerHTML = "X";
    gameBoard[e.target.id] = e.target.innerHTML;
    x.push(Number(e.target.id));
    winCheck();
    console.log(x);
  } else {
    e.target.innerHTML = "O";
    gameBoard[e.target.id] = e.target.innerHTML;
    o.push(Number(e.target.id));
    console.log(o);
  }
  e.target.removeEventListener("click", checkSign);
}

function winCheck() {
  if (x.length < 3) return;
  else if (x.length == 3) {
    const sum = x.reduce((acc, cur) => acc + cur);
    if (sum == 15) {
      playerWin();
    }
  } else if (x.length == 4) {
    for (let i = 0; i < x.length; i++) {
      let sum = 0;
      for (let j = 0; j < x.length; j++) {
        if (i == j) continue;
        else {
          sum += x[j];
        }
      }
      console.log(sum);
      if (sum == 15) {
        playerWin();
        break;
      }
    }
  } else if (x.length == 5) {
    for (let i = 0; i < x.length; i++) {
      let sum = 0;
      for (let j = 0; j < x.length; j++) {
        if (i == j || j == i + 1) continue;
        else {
          sum += x[j];
        }
      }
      console.log(sum);
      if (sum == 15) {
        playerWin();
        break;
      }
    }
  }
}

function playerWin() {
  console.log("win");
  result.innerHTML = "Player X won!";
  restartBtn.classList.add('show');
  stopPlaying();
}

function stopPlaying() {
  for (const cell of cells) {
    cell.removeEventListener("click", checkSign);
  }
}

restartBtn.addEventListener('click', resetGame);

function resetGame() {
  gameBoard = [];
  x = [];
  o = [];
  result.innerHTML = '';  
  restartBtn.classList.remove('show');
  for (const cell of cells) {
    cell.innerHTML = '';
  }
  cellsAddEvents();
  clickCounter = 0;
}
