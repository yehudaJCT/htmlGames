let fruits = {
    "apple": "assets/Fruits/Apple.png",
    "cherrie": "assets/Fruits/Cherries.png",
    "origin": "assets/Fruits/Orange.png",
    "strawberry": "assets/Fruits/Strawberry.png",
    "test" : "assets/VirtualGuy/Idle.png"
}


class Fruit {
    static fruitid = 0;

    constructor(GameInstance, Position, fruit) {
        this.GameInstance = GameInstance;
        this.Position = Position;

        this.background = fruits[fruit]; // Background image of the building
        this.frameWidth = 32; // Width of each frame in the sprite sheet
        this.frameHeight = 32; // Height of each frame in the sprite sheet
        this.currentFrame = 0; // Current frame of the sprite sheet
        this.animationSpeed = 20; // Number of frames to wait before updating the sprite
        this.frameCount = 17; // Total number of frames in the sprite sheet
        this.frameTimer = 0; // Frame timer to control the animation speed
        this.frameShift = 0; // Shift the frame to the right
    }

    inshelizeFruit() {
        // Generate a unique ID based on the current timestamp
        const uniqueId = `fruit-${Fruit.fruitid}`;
        Fruit.fruitid++;

        // Add the building to the DOM with the unique ID
        this.GameInstance.element.innerHTML += `<div id="${uniqueId}"></div>`;
        this.fruit = document.getElementById(uniqueId);

        this.fruit.style.width = this.Position.width + "px";
        this.fruit.style.height = this.Position.height + "px";
        this.fruit.style.left = this.Position.x + "px";
        this.fruit.style.top = this.Position.y + "px";
        //this.fruit.style.backgroundColor = "red";
        this.fruit.style.position = "absolute";
        this.fruit.style.backgroundImage = `url(${this.background})`;
        // this.fruit.style.backgroundRepeat = "no-repeat";
        // this.fruit.style.backgroundSize = "auto"; // Or adjust based on your sprite sheet
    }

    fruitLoop(playerPosition) {
        this.updateAnimation();
    }

    updateAnimation() {
        // Update the frame timer
        this.frameTimer++;
        if(this.frameTimer >= this.GameInstance.frameRate / this.animationSpeed){
            this.frameTimer = 0;
            this.currentFrame = (this.currentFrame + 1) % this.frameCount;
        }

        // Update the player's sprite position in the sprite sheet
        this.fruit.style.backgroundPosition = `-${this.currentFrame * this.frameWidth + this.frameShift}px 0px`;

        console.log(this.fruit.style.backgroundPosition);

    }
}