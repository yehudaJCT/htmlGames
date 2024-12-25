// Select elements
const player = document.getElementById("player");
const target = document.getElementById("target");
const scoreDisplay = document.getElementById("score");

// Initialize game variables
let score = 0;
let playerPosition = { x: 0, y: 0 };
let targetPosition = { 
    x: Math.random() * 470, // Random position within the game area (500px - 30px)
    y: Math.random() * 470 
};

// Update target position
function updateTarget() {
    target.style.left = `${targetPosition.x}px`;
    target.style.top = `${targetPosition.y}px`;
}
updateTarget();

// Move player
function movePlayer(x, y) {
    playerPosition.x = Math.min(470, Math.max(0, playerPosition.x + x));
    playerPosition.y = Math.min(470, Math.max(0, playerPosition.y + y));

    player.style.left = `${playerPosition.x}px`;
    player.style.top = `${playerPosition.y}px`;

    checkCollision();
}

// Check collision
function checkCollision() {
    const dx = playerPosition.x - targetPosition.x;
    const dy = playerPosition.y - targetPosition.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 30) {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        
        // Move target to a new random position
        targetPosition.x = Math.random() * 470;
        targetPosition.y = Math.random() * 470;
        updateTarget();
    }
}

// Handle keyboard input
document.addEventListener("keydown", (event) => {
    const step = 10;
    switch (event.key) {
        case "ArrowUp":
            movePlayer(0, -step);
            break;
        case "ArrowDown":
            movePlayer(0, step);
            break;
        case "ArrowLeft":
            movePlayer(-step, 0);
            break;
        case "ArrowRight":
            movePlayer(step, 0);
            break;
    }
});
