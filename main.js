const gameBoard = {};
const magicSquare = [8, 1, 6, 3, 5, 7, 4, 9, 2];
const x = [];
const o = [];
const result = document.querySelector(".result");
function Player(name) {
  this.name = name;
}
const playerX = new Player("x");
const playerO = new Player("o");

const cells = document.querySelectorAll(".cells");
for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", checkSign);
  gameBoard[cells[i].id] = cells[i].innerHTML;
}
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
let gameOver = false;

function winCheck() {
  if (x.length < 3) return;
  else if (x.length == 3) {
    const sum = x.reduce((acc, cur) => acc + cur);
    if (sum == 15) {      
      result.innerHTML = "Player X won!";
      gameOver = true;
      console.log("win");
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
        console.log("win");
        result.innerHTML = "Player X won!";
        gameOver = true;
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
        console.log("win");
        result.innerHTML = "Player X won!";        
        gameOver = true;
        break;
      }
    }
  }
}
