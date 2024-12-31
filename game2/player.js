//========================================================================
//                  Initialization parameters                   
//========================================================================
const player = document.getElementById("player");

class Player {
    constructor(Position, Velocity) {
        this.Position = Position;
        this.Velocity = Velocity;
    }
}

let keydown = {
    up: 0,
    down: 0,
    left: 0,
    right: 0
}
moveSpeed = 2;

let buttonPressed = null;
let buttonReleased = null;
let playerlogic = null;
//========================================================================
//                      Game functions
//========================================================================

function inshelizePlayer() {
    playerlogic = new Player(new Rectangle(0, 0, 30, 30), new velocity(0, 0));
}

function playerLoop() {
    handelMovementEvent();
    checkCollision();
    movePlayer(0,0);
}

//========================================================================
//                     Helper functions
//========================================================================


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

// Handle keyboard input for smooth movement
document.addEventListener("keydown", (event) => {
    buttonReleased = null;
    buttonPressed = event.key;
    // switch (event.key) {
    //     case "ArrowUp":
    //     case "w":
    //     case ' ':
    //         keydown_upButton();
    //         break;
    //     case "ArrowDown":
    //     case "s":
    //         keydown_downButton();
    //         break;
    //     case "ArrowLeft":
    //     case "a":
    //         keydown_movebackward();
    //         break;
    //     case "ArrowRight":
    //     case "d":
    //         keydown_moveforward();
    //         break;
    // }
});

document.addEventListener("keyup", (event) => {
    buttonPressed = null;
    buttonReleased = event.key;
    // switch (event.key) {
    //     case "ArrowUp":
    //     case "w":
    //     case ' ':
    //         keyup_upButton();
    //         break;
    //     case "ArrowDown":
    //     case "s":
    //         keyup_downButton();
    //         break;
    //     case "ArrowLeft":
    //     case "a":
    //         keyup_movebackward();
    //         break;
    //     case "ArrowRight":
    //     case "d":
    //         keyup_moveforward();
    //         break;
    // }
});

function handelMovementEvent() {
    if (buttonPressed) {
        switch (buttonPressed) {
            case "ArrowUp":
            case "w":
            case ' ':
                keydown_upButton();
                break;
            case "ArrowDown":
            case "s":
                keydown_downButton();
                break;
            case "ArrowLeft":
            case "a":
                keydown_movebackward();
                break;
            case "ArrowRight":
            case "d":
                keydown_moveforward();
                break;
        }
    }

    if (buttonReleased) {
        switch (buttonReleased) {
            case "ArrowUp":
            case "w":
            case ' ':
                keyup_upButton();
                break;
            case "ArrowDown":
            case "s":
                keyup_downButton();
                break;
            case "ArrowLeft":
            case "a":
                keyup_movebackward();
                break;
            case "ArrowRight":
            case "d":
                keyup_moveforward();
                break;
        }
    }
}

function checkCollision() {
    return 0;
}

function jamp(t) {
    playerVelocity.y = -10;
}

function gravity(t, g = 1) {
    const gravity = 9.81 / frameRate; // Gravitational acceleration
    const velocity = g * gravity * t; // Calculate velocity
    return velocity;
}

function keydown_moveforward() {
    t = (keydown.right += 1) / frameRate;
    playerVelocity.x = -max(moveSpeed, moveSpeed * t);
}

function keydown_movebackward() {
    t = (keydown.left += 1) / frameRate;
    playerVelocity.x = -max(moveSpeed, moveSpeed * t);
}

function keydown_downButton() {
    t = (keydown.down += 1) / frameRate;
    playerVelocity.y = max(moveSpeed, moveSpeed * t);
}

function keydown_upButton() {

}

function keyup_moveforward() {
    playerVelocity.x = 0;
}

function keyup_movebackward() {
    playerVelocity.x = 0;
}

function keyup_downButton() {
    playerVelocity.y = 0;
}

function keyup_upButton() {
    playerVelocity.y = 0;
}