let cells = document.querySelectorAll(".cell");
let player = "X";
let gameOver = false;

const winPatterns = [
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
];

cells.forEach((cell, index) => {
cell.addEventListener("click", () => {

if(cell.textContent !== "" || gameOver) return;

cell.textContent = player;

checkWinner();

player = player === "X" ? "O" : "X";

});
});

function checkWinner(){

winPatterns.forEach(pattern => {

let a = cells[pattern[0]].textContent;
let b = cells[pattern[1]].textContent;
let c = cells[pattern[2]].textContent;

if(a !== "" && a === b && b === c){

alert(a + " Wins!");
gameOver = true;

}

});

}