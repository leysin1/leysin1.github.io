// board ( Canvas )
let blockSize = 25;
let rows = 20;
let cols = 20;
let canvas;
let ctx;

// HTML element für punktestand
let scoreElement;
let score = 0;

// Snake head
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

// Geschwindigkeit der schlange
let velocityX = 0;
let velocityY = 0;

// snake array
let snakes = [];

// Food
let foodX;
let foodY;

// Game speed
var difficulty = 150;

// Variable für gameover bedingung
let gameOver = false;

window.onload = function () {
    // Getting the gameboard on window load
    canvas = document.getElementById('canvas');
    canvas.height = rows * blockSize;
    canvas.width = cols * blockSize;
    ctx = canvas.getContext('2d');

    scoreElement = document.getElementById('score');

    // main logic
    placeFood();
    document.addEventListener("keyup", changeDirection);

    // UPDATE
    setInterval(update, difficulty);
}

function incrementScore() {
    score++;
    scoreElement.textContent = score;
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function update() {
    if (gameOver) {
        return;
    }
    // Background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Food
    ctx.fillStyle = 'red';
    ctx.fillRect(foodX, foodY, blockSize -2, blockSize -2);

    // Wenn die schlange das essen frisst:
    if (snakeX == foodX && snakeY == foodY) {
        snakes.push([foodX, foodY]);
        incrementScore();
        placeFood();
    }
    //snake shifting
    for (let i = snakes.length - 1; i > 0; i--) {
        snakes[i] = snakes[i - 1];
    }

    if (snakes.length) {
        snakes[0] = [snakeX, snakeY];
    }

    // Snake
    ctx.fillStyle = 'lime';
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    ctx.fillRect(snakeX, snakeY, blockSize - 1, blockSize - 1);
    
    for (let i = 0; i < snakes.length; i++) {
        ctx.fillRect(snakes[i][0], snakes[i][1], blockSize - 1, blockSize - 1);
    }

    // Game over conditions
    if (snakeX < 0 || snakeX > (cols - 1) * blockSize || snakeY < 0 || snakeY > (rows - 1) * blockSize) {
        gameOver = true;
        alert("Game Over");

    }
    for (let i = 0; i < snakes.length; i++) {
        if (snakeX == snakes[i][0] && snakeY == snakes[i][1]) {
            gameOver = true;
            alert("Game Over");
        }
    }

}
// Bewegungssteuerung
function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }

}