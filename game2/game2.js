// Select elements
const player = document.getElementById("player");
const building = document.getElementById("building");
const frameRate = 60; // Frame rate

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
let buildingPosition = new Rectangle(0, 300, 200, 200);
let playerVelocity = { x: 0, y: 0 }; // Player movement velocity

inshelizeBuilding();

// Main game loop
async function gameLoop() {
    while (true) {
        await new Promise((resolve) => setTimeout(resolve, 1000 / frameRate)); // ~60fps

        // Update player movement
        if (playerVelocity.x !== 0 || playerVelocity.y !== 0) {
            movePlayer(playerVelocity.x, playerVelocity.y);
        }

        // Update other game elements
        //moveBuilding(-1, 0);
    }
}

function inshelizeBuilding() {
    building.style.width = buildingPosition.width + "px";
    building.style.height = buildingPosition.height + "px";
    building.style.left = buildingPosition.x + "px";
    building.style.top = buildingPosition.y + "px";
}


// Function to move the player
function movePlayer(x, y) {
    const nextPosition = new Rectangle(
        Math.min(470, Math.max(0, playerPosition.x + x)),
        Math.min(470, Math.max(0, playerPosition.y + y)),
        playerPosition.width,
        playerPosition.height
    );

    console.log(checkCollisionType(nextPosition, buildingPosition));

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

function checkCollisionType(rect1, rect2) {
    let collision = {
        top: false,
        bottom: false,
        left: false,
        right: false,
    };

    // Check if the rectangles overlap
    const isOverlapping =
        rect1.x <= rect2.x + rect2.width &&
        rect1.x + rect1.width >= rect2.x &&
        rect1.y <= rect2.y + rect2.height &&
        rect1.y + rect1.height >= rect2.y;

    if (!isOverlapping) return collision; // No collision

    // Determine the side of the collision
    const rect1Bottom = rect1.y + rect1.height;
    const rect1Top = rect1.y;
    const rect1Right = rect1.x + rect1.width;
    const rect1Left = rect1.x;

    const rect2Bottom = rect2.y + rect2.height;
    const rect2Top = rect2.y;
    const rect2Right = rect2.x + rect2.width;
    const rect2Left = rect2.x;

    // Check collision sides
    if (rect1Bottom >= rect2Top && rect1Top <=rect2Top && rect1Right > rect2Left && rect1Left < rect2Right) {
        collision.bottom = true; 
    }
    if (rect1Top <= rect2Bottom && rect1Bottom >= rect2Bottom && rect1Right > rect2Left && rect1Left < rect2Right) {
        collision.top = true; // 
    }
    if (rect1Right >= rect2Left && rect1Left <= rect2Left && rect1Top < rect2Bottom && rect1Bottom > rect2Top) {
        collision.right = true; // 
    }
    if (rect1Left <= rect2Right && rect1Right >= rect2Right && rect1Top < rect2Bottom && rect1Bottom > rect2Top) {
        collision.left = true; // 
    }

    return collision;
}


// Handle keyboard input for smooth movement
document.addEventListener("keydown", (event) => {
    const speed = 2; // Movement speed

    switch (event.key) {
        case "ArrowUp":
        case "w":
        case ' ':
            playerVelocity.y = -speed;
            break;
        case "ArrowDown":
        case "s":
            playerVelocity.y = speed;
            break;
        case "ArrowLeft":
        case "a":
            playerVelocity.x = -speed;
            break;
        case "ArrowRight":
        case "d":
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

function gravity(t, g = 1) {
    const gravity = 9.81 / frameRate; // Gravitational acceleration
    const velocity = g * gravity * t; // Calculate velocity
    return velocity;
}

// Start the game loop
gameLoop();
