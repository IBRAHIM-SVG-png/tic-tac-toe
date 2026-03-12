const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

let currentPlayer = "X";
let gameActive = true;

const winConditions = [
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
cell.addEventListener("click", () => cellClicked(cell, index));
});

function cellClicked(cell, index){

if(cell.textContent !== "" || !gameActive){
return;
}

cell.textContent = "X";

checkWinner();

if(gameActive){
setTimeout(computerMove, 500);
}

}

function computerMove(){

let emptyCells = [];

cells.forEach((cell, index) => {
if(cell.textContent === ""){
emptyCells.push(index);
}
});

// Try to WIN
for(let condition of winConditions){
let [a,b,c] = condition;

let values = [
cells[a].textContent,
cells[b].textContent,
cells[c].textContent
];

if(values.filter(v => v === "O").length === 2 && values.includes("")){
let emptyIndex = condition[values.indexOf("")];
cells[emptyIndex].textContent = "O";
checkWinner();
return;
}
}

// Try to BLOCK player
for(let condition of winConditions){
let [a,b,c] = condition;

let values = [
cells[a].textContent,
cells[b].textContent,
cells[c].textContent
];

if(values.filter(v => v === "X").length === 2 && values.includes("")){
let emptyIndex = condition[values.indexOf("")];
cells[emptyIndex].textContent = "O";
checkWinner();
return;
}
}

// Otherwise random move
let randomIndex = emptyCells[Math.floor(Math.random()*emptyCells.length)];

cells[randomIndex].textContent = "O";

checkWinner();
}

function checkWinner(){

for(let condition of winConditions){

let a = cells[condition[0]].textContent;
let b = cells[condition[1]].textContent;
let c = cells[condition[2]].textContent;

if(a === "" || b === "" || c === ""){
continue;
}

if(a === b && b === c){
statusText.textContent = "Player " + a + " Wins!";

cells[condition[0]].classList.add("win");
cells[condition[1]].classList.add("win");
cells[condition[2]].classList.add("win");
gameActive = false;
return;
}
}

let draw = true;

cells.forEach(cell => {
if(cell.textContent === ""){
draw = false;
}
});

if(draw){
statusText.textContent = "Game Draw!";
gameActive = false;
}

}

function restartGame(){

gameActive = true;

statusText.textContent = "Your Turn";

cells.forEach(cell => {
cell.textContent = "";
});

}