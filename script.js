const canvas = document.getElementById("pongCanvas");
const context = canvas.getContext("2d");

// Ball
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 4,
    velocityX: 4,
    velocityY: 4,
    color: "WHITE"
};

// User Paddle
const user = {
    x: 0, // left side of the canvas
    y: (canvas.height - 100) / 2, // vertically centered
    width: 10,
    height: 100,
    color: "WHITE",
    score: 0
};

// Computer Paddle
const com = {
    x: canvas.width - 10, // right side of the canvas
    y: (canvas.height - 100) / 2, // vertically centered
    width: 10,
    height: 100,
    color: "WHITE",
    score: 0
};

// Net
const net = {
    x: (canvas.width - 2) / 2,
    y: 0,
    width: 2,
    height: 10,
    color: "WHITE"
};

// Draw the net
function drawNet() {
    for (let i = 0; i <= canvas.height; i += 15) {
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}

// Draw rectangle function
function drawRect(x, y, w, h, color) {
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}

// Draw circle function
function drawCircle(x, y, r, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

// Draw text function
function drawText(text, x, y, color) {
    context.fillStyle = color;
    context.font = "45px Arial";
    context.fillText(text, x, y);
}

// Render the game
function render() {
    // Clear the canvas
    drawRect(0, 0, canvas.width, canvas.height, "#000");

    // Draw the net
    drawNet();

    // Draw the score
    drawText(user.score, canvas.width / 4, canvas.height / 5, "WHITE");
    drawText(com.score, 3 * canvas.width / 4, canvas.height / 5, "WHITE");

    // Draw the paddles
    drawRect(user.x, user.y, user.width, user.height, user.color);
    drawRect(com.x, com.y, com.width, com.height, com.color);

    // Draw the ball
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

// Control the user's paddle
canvas.addEventListener("mousemove", movePaddle);

function movePaddle(evt) {
    let rect = canvas.getBoundingClientRect();
    user.y = evt.clientY - rect.top - user.height / 2;
}

// Collision detection
function collision(b, p) {
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
}

// Reset the ball
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speed = 4;
    ball.velocityX = -ball.velocityX;
}

// Update: position, movement, score, etc.
function update() {
    // Update the ball position
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // Simple AI to control the computer paddle
    com.y += (ball.y - (com.y + com.height / 2)) * 0.1;

    // When the ball collides with the bottom or top wall, we reverse the y velocity
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.velocityY = -ball.velocityY;
    }

    // Check if the ball hit the user or the computer paddle
    let player = (ball.x < canvas.width / 2) ? user : com;

    if (collision(ball, player)) {
        // We check where the ball hit the paddle
        let collidePoint = (ball.y - (player.y + player.height / 2));
        // Normalize the value
        collidePoint = collidePoint / (player.height / 2);
        // Calculate the angle in Radian
        let angleRad = collidePoint * Math.PI / 4;

        // X direction of the ball when it's hit
        let direction = (ball.x < canvas.width / 2) ? 1 : -1;
        // Change the X and Y velocity direction
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);

        // Speed up the ball every time a paddle hits it
        ball.speed += 0.5;
    }

    // Update the score
    if (ball.x - ball.radius < 0) {
        com.score++;
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        user.score++;
        resetBall();
    }
}

// Game loop
function game() {
    update();
    render();
}

// Number of frames per second
const framePerSecond = 50;

// Call the game function 50 times every 1 second
setInterval(game, 1000 / framePerSecond);