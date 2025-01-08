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

let PASS = false;

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


document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-link");
    const infoBox = document.getElementById("info-box");

    const leaderboard = document.getElementById("leaderboard");
    const achievements = document.getElementById("achievements");
    const settings = document.getElementById("settings");

    navLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            // Get the target content from the data attribute
            const targetContent = event.currentTarget.getAttribute("data-target");
            
            // If the "Play" tab is clicked, close the infoBox
            if (targetContent === "play-content") {
                infoBox.style.display = "none"; // Close any open content
                PASS = false;
            } else if (targetContent === "leaderboard-content") {
                // Set the content inside the square and show it
                //infoBox.textContent = `You selected: ${targetContent}`;
                infoBox.style.display = "block"; // Make the infoBox visible

                leaderboard.style.display = "block"; 
                achievements.style.display = "none"; 
                settings.style.display = "none"; 
                PASS = true;
            }
            else if (targetContent === "achievements-content") {
                // Set the content inside the square and show it
                //infoBox.textContent = `You selected: ${targetContent}`;
                infoBox.style.display = "block"; // Make the infoBox visible

                leaderboard.style.display = "none"; 
                achievements.style.display = "block"; 
                settings.style.display = "none";  
                PASS = true;
            }
            else if (targetContent === "settings-content") {
                // Set the content inside the square and show it
                //infoBox.textContent = `You selected: ${targetContent}`;
                infoBox.style.display = "block"; // Make the infoBox visible

                leaderboard.style.display = "none"; 
                achievements.style.display = "none"; 
                settings.style.display = "block"; 
                PASS = true;
            }
        });
    });
});


