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

function cellClicked(cell, index) {

    if(cell.textContent !== "" || !gameActive){
        return;
    }

    cell.textContent = currentPlayer;

    checkWinner();

    if(gameActive){
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = "Player " + currentPlayer + "'s Turn";
    }
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

    currentPlayer = "X";
    gameActive = true;

    statusText.textContent = "Player X's Turn";

    cells.forEach(cell => {
        cell.textContent = "";
    });
}