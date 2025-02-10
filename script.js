const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const boxSize = 20;
const canvasSize = 400;
canvas.width = canvas.height = canvasSize;

let snake, direction, food, score;
resetGame(); // Gọi hàm để khởi động game lần đầu

// Xử lý điều khiển rắn
document.addEventListener("keydown", (event) => {
    const key = event.key;
    if (key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    else if (key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    else if (key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    else if (key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

// Hàm reset game khi thua
function resetGame() {
    snake = [{ x: 200, y: 200 }];
    direction = "RIGHT";
    food = spawnFood();
    score = 0;
}

// Hàm tạo thức ăn ngẫu nhiên
function spawnFood() {
    return {
        x: Math.floor(Math.random() * (canvasSize / boxSize)) * boxSize,
        y: Math.floor(Math.random() * (canvasSize / boxSize)) * boxSize
    };
}

// Vẽ game
function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    // Vẽ rắn
    ctx.fillStyle = "lime";
    snake.forEach((segment) => {
        ctx.fillRect(segment.x, segment.y, boxSize, boxSize);
        ctx.strokeStyle = "darkgreen";
        ctx.strokeRect(segment.x, segment.y, boxSize, boxSize);
    });

    // Vẽ thức ăn
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, boxSize, boxSize);

    // Hiển thị điểm số
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 10, 20);
}

// Cập nhật game
function update() {
    const head = { ...snake[0] };

    // Di chuyển đầu rắn theo hướng
    if (direction === "UP") head.y -= boxSize;
    else if (direction === "DOWN") head.y += boxSize;
    else if (direction === "LEFT") head.x -= boxSize;
    else if (direction === "RIGHT") head.x += boxSize;

    // Kiểm tra va chạm với tường hoặc chính nó
    if (
        head.x < 0 || head.x >= canvasSize ||
        head.y < 0 || head.y >= canvasSize ||
        snake.some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        alert(`Game Over! Your score: ${score}`);
        resetGame(); // Reset game thay vì reload trang
        return;
    }

    // Kiểm tra nếu rắn ăn thức ăn
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = spawnFood();
    } else {
        snake.pop(); // Nếu không ăn, cắt đuôi
    }

    snake.unshift(head); // Thêm đầu mới
}

// Vòng lặp game
function gameLoop() {
    update();
    draw();
}

setInterval(gameLoop, 100);
