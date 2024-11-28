const board = document.getElementById('board');
const statusText = document.getElementById('status');

let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill(null);

const winPatterns = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal
    [2, 4, 6]  // Diagonal
];

// Initialize the board
function initializeBoard() {
    board.innerHTML = '';
    gameState.fill(null);
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    gameActive = true;
}

// Handle cell click
function handleCellClick(e) {
    const cell = e.target;
    const index = cell.dataset.index;

    if (gameState[index] || !gameActive) return;

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        highlightWinningCells();
        gameActive = false;
        return;
    }

    if (gameState.every(cell => cell)) {
        statusText.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

// Check for a win
function checkWin() {
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

// Highlight the winning cells
function highlightWinningCells() {
    winPatterns.forEach(pattern => {
        const [a, b, c] = pattern;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            document.querySelectorAll('.cell').forEach((cell, index) => {
                if (index === a || index === b || index === c) {
                    cell.classList.add('winner');
                }
            });
        }
    });
}

// Reset the game
function resetGame() {
    currentPlayer = 'X';
    initializeBoard();
}

// Initialize the game
initializeBoard();
