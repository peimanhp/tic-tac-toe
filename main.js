const cells = document.querySelectorAll(".cells");
for (const cell of cells) {
  cell.addEventListener("click", checkSign);
}
let clickCounter = 0;
function checkSign(e) {
  clickCounter++;
  if (clickCounter % 2 === 1) e.target.innerHTML = "X";
  else e.target.innerHTML = "O";
  e.target.removeEventListener("click", checkSign);
}
