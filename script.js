const board = document.querySelectorAll('.cell');
const playerTurnText = document.getElementById('playerTurn');
const resetBtn = document.getElementById('resetBtn');

let boardState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winningConditions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

function handleCellClick(e) {
    const index = e.target.dataset.index;
    if (boardState[index] !== "" || !gameActive) return;

    boardState[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWinner()) {
        playerTurnText.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (!boardState.includes("")) {
        playerTurnText.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    playerTurnText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
    });
}

function resetGame() {
    boardState = ["", "", "", "", "", "", "", "", ""];
    board.forEach(cell => cell.textContent = "");
    currentPlayer = "X";
    gameActive = true;
    playerTurnText.textContent = `Player ${currentPlayer}'s turn`;
}

board.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
