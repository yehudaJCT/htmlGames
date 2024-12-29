// Select elements
const player = document.getElementById("player");
const building = document.getElementById("building");

// Rectangle class for handling positions and dimensions
class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

// Game variables
let playerPosition = new Rectangle(0, 0, 30, 30);
let buildingPosition = new Rectangle(250, 300, 200, 500);
let playerVelocity = { x: 0, y: 0 }; // Player movement velocity

// Main game loop
async function gameLoop() {
    while (true) {
        await new Promise((resolve) => setTimeout(resolve, 16)); // ~60fps

        // Update player movement
        if (playerVelocity.x !== 0 || playerVelocity.y !== 0) {
            movePlayer(playerVelocity.x, playerVelocity.y);
        }

        // Update other game elements
        moveBuilding(-1, 0);
    }
}

// Function to move the player
function movePlayer(x, y) {
    const nextPosition = new Rectangle(
        Math.min(470, Math.max(0, playerPosition.x + x)),
        Math.min(470, Math.max(0, playerPosition.y + y)),
        playerPosition.width,
        playerPosition.height
    );

    // Check for collisions with the building
    if (checkCollision(nextPosition, buildingPosition)) {
        return;
    }

    // Update position
    playerPosition = nextPosition;

    // Update player element style
    player.style.left = `${playerPosition.x}px`;
    player.style.top = `${playerPosition.y}px`;
}

// Function to move the building
function moveBuilding(x, y) {
    buildingPosition.x = Math.min(470, Math.max(0, buildingPosition.x + x));
    buildingPosition.y = Math.min(470, Math.max(0, buildingPosition.y + y));

    building.style.left = `${buildingPosition.x}px`;
    building.style.top = `${buildingPosition.y}px`;
}

// Collision detection function
function checkCollision(rect1, rect2) {
    return !(
        rect1.x + rect1.width <= rect2.x || // rect1 is to the left of rect2
        rect1.x >= rect2.x + rect2.width || // rect1 is to the right of rect2
        rect1.y + rect1.height <= rect2.y || // rect1 is above rect2
        rect1.y >= rect2.y + rect2.height // rect1 is below rect2
    );
}

// Handle keyboard input for smooth movement
document.addEventListener("keydown", (event) => {
    const speed = 2; // Movement speed

    switch (event.key) {
        case "ArrowUp":
            playerVelocity.y = -speed;
            break;
        case "ArrowDown":
            playerVelocity.y = speed;
            break;
        case "ArrowLeft":
            playerVelocity.x = -speed;
            break;
        case "ArrowRight":
            playerVelocity.x = speed;
            break;
    }
});

document.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "ArrowUp":
        case "ArrowDown":
            playerVelocity.y = 0;
            break;
        case "ArrowLeft":
        case "ArrowRight":
            playerVelocity.x = 0;
            break;
    }
});

// Start the game loop
gameLoop();
