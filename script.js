const canvas = document.getElementById("pongCanvas");
const context = canvas.getContext("2d");

canvas.width = 720; // 80% de 800px
canvas.height = 360; // 80% de 400px

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 4,
    velocityX: 4,
    velocityY: 4,
    color: "WHITE"
};

const user = {
    x: 0,
    y: (canvas.height - 100) / 2,
    width: 10,
    height: 100,
    color: "WHITE",
    score: 0
};

const com = {
    x: canvas.width - 10,
    y: (canvas.height - 100) / 2,
    width: 10,
    height: 100,
    color: "WHITE",
    score: 0
};

const net = {
    x: (canvas.width - 2) / 2,
    y: 0,
    width: 2,
    height: 10,
    color: "WHITE"
};

function drawNet() {
    for (let i = 0; i <= canvas.height; i += 15) {
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}

function drawRect(x, y, w, h, color) {
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

function drawText(text, x, y, color) {
    context.fillStyle = color;
    context.font = "45px Arial";
    context.fillText(text, x, y);
}

function render() {
    drawRect(0, 0, canvas.width, canvas.height, "#000");
    drawNet();
    drawText(user.score, canvas.width / 4, canvas.height / 5, "WHITE");
    drawText(com.score, 3 * canvas.width / 4, canvas.height / 5, "WHITE");
    drawRect(user.x, user.y, user.width, user.height, user.color);
    drawRect(com.x, com.y, com.width, com.height, com.color);
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

function movePaddle(evt) {
    let rect = canvas.getBoundingClientRect();
    let y = evt.clientY - rect.top - user.height / 2;
    if (y < 0) y = 0;
    if (y + user.height > canvas.height) y = canvas.height - user.height;
    user.y = y;
}

function handleTouchMove(evt) {
    let rect = canvas.getBoundingClientRect();
    let touchY = evt.touches[0].clientY - rect.top - user.height / 2;
    if (touchY < 0) touchY = 0;
    if (touchY + user.height > canvas.height) touchY = canvas.height - user.height;
    user.y = touchY;
}

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

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speed = 4;
    ball.velocityX = -ball.velocityX;
}

function update() {
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    com.y += (ball.y - (com.y + com.height / 2)) * 0.1;

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.velocityY = -ball.velocityY;
    }

    let player = (ball.x < canvas.width / 2) ? user : com;

    if (collision(ball, player)) {
        let collidePoint = (ball.y - (player.y + player.height / 2));
        collidePoint = collidePoint / (player.height / 2);
        let angleRad = collidePoint * Math.PI / 4;

        let direction = (ball.x < canvas.width / 2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);
        ball.speed += 0.5;
    }

    if (ball.x - ball.radius < 0) {
        com.score++;
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        user.score++;
        resetBall();
    }
}

function game() {
    update();
    render();
}

const framePerSecond = 50;
setInterval(game, 1000 / framePerSecond);

canvas.addEventListener("mousemove", movePaddle);
canvas.addEventListener("touchmove", handleTouchMove);
