// Enum for status
const KeyStatus = Object.freeze({
    KEYDOWN: 'keydown',
    KEYUP: 'keyup',
    NULL: 'null'
});

// Updated inputTracker using the Enum
// Updated inputTracker using the Enum
let inputTracker = { 
    left: KeyStatus.NULL,

    right: KeyStatus.NULL,

    up: KeyStatus.NULL,

    down: KeyStatus.NULL
};

let isEventTriggered = false;

// Handle keyboard input for smooth movement
document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
        case "w":
        case ' ':
            inputTracker.up = KeyStatus.KEYDOWN;
            isEventTriggered = true;
            break;
        case "ArrowDown":
        case "s":
            inputTracker.down = KeyStatus.KEYDOWN;
            isEventTriggered = true;
            break;
        case "ArrowLeft":
        case "a":
            inputTracker.left = KeyStatus.KEYDOWN;
            isEventTriggered = true;
            break;
        case "ArrowRight":
        case "d":
            inputTracker.right = KeyStatus.KEYDOWN;
            isEventTriggered = true;
            break;
    }
});

document.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "ArrowUp":
        case "w":
        case ' ':
            inputTracker.up = KeyStatus.KEYUP;
            isEventTriggered = true;
            break;
        case "ArrowDown":
        case "s":
            inputTracker.down = KeyStatus.KEYUP;
            isEventTriggered = true;
            break;
        case "ArrowLeft":
        case "a":
            inputTracker.left = KeyStatus.KEYUP;
            isEventTriggered = true;
            break;
        case "ArrowRight":
        case "d":
            inputTracker.right = KeyStatus.KEYUP;
            isEventTriggered = true;
            break;
    }
});

