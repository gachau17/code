<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Snake Game</title>
    <style>
        body {
            background-color: black;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }

        #game-board {
            width: 300px;
            height: 300px;
            background-color: #222;
            border: 1px solid #333;
            display: grid;
            grid-template-columns: repeat(20, 1fr);
            grid-template-rows: repeat(20, 1fr);
        }

        .snake-node {
            background-color: #0f0;
        }

        .food {
            background-color: red;
        }
    </style>
</head>
<body>
    <div id="game-board"></div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const board = document.getElementById('game-board');
            const gridSize = 20;
            let snake = [{x: 10, y: 10}];
            let food = {x: 15, y: 15};
            let direction = 'right';
            let intervalId;

            function draw() {
                board.innerHTML = '';

                // Draw snake
                snake.forEach(segment => {
                    const snakeNode = document.createElement('div');
                    snakeNode.classList.add('snake-node');
                    snakeNode.style.gridColumn = segment.x + 1;
                    snakeNode.style.gridRow = segment.y + 1;
                    board.appendChild(snakeNode);
                });

                // Draw food
                const foodNode = document.createElement('div');
                foodNode.classList.add('food');
                foodNode.style.gridColumn = food.x + 1;
                foodNode.style.gridRow = food.y + 1;
                board.appendChild(foodNode);
            }

            function move() {
                let head = {...snake[0]};
                switch (direction) {
                    case 'up':
                        head.y--;
                        break;
                    case 'down':
                        head.y++;
                        break;
                    case 'left':
                        head.x--;
                        break;
                    case 'right':
                        head.x++;
                        break;
                }

                // Check if snake eats food
                if (head.x === food.x && head.y === food.y) {
                    food = {
                        x: Math.floor(Math.random() * gridSize),
                        y: Math.floor(Math.random() * gridSize)
                    };
                } else {
                    // Remove tail
                    snake.pop();
                }

                // Check for collision with walls or itself
                if (head.x < 0 || head.y < 0 || head.x >= gridSize || head.y >= gridSize || snake.some(segment => segment.x === head.x && segment.y === head.y)) {
                    clearInterval(intervalId);
                    alert('Game Over!');
                    return;
                }

                // Move snake
                snake.unshift(head);
                draw();
            }

            function startGame() {
                intervalId = setInterval(move, 100);
            }

            document.addEventListener('keydown', event => {
                switch (event.key) {
                    case 'ArrowUp':
                        if (direction !== 'down') direction = 'up';
                        break;
                    case 'ArrowDown':
                        if (direction !== 'up') direction = 'down';
                        break;
                    case 'ArrowLeft':
                        if (direction !== 'right') direction = 'left';
                        break;
                    case 'ArrowRight':
                        if (direction !== 'left') direction = 'right';
                        break;
                }
            });

            draw();
            startGame();
        });
    </script>
</body>
</html>
