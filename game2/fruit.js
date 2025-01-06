let fruits = {
    "apple": "assets/Fruits/Apple.png",
    "cherrie": "assets/Fruits/Cherries.png",
    "origin": "assets/Fruits/Orange.png",
    "strawberry": "assets/Fruits/Strawberry.png",
}


class Fruit {
    static fruitid = 0;

    constructor(GameInstance, Position, type) {
        this.GameInstance = GameInstance;
        this.Position = Position;

        this.type = type;
        this.background = fruits[type]; // Background image of the building
        this.frameWidth = 32; // Width of each frame in the sprite sheet
        this.frameHeight = 32; // Height of each frame in the sprite sheet
        this.currentFrame = 0; // Current frame of the sprite sheet
        this.animationSpeed = 20; // Number of frames to wait before updating the sprite
        this.frameCount = 17; // Total number of frames in the sprite sheet
        this.frameTimer = 0; // Frame timer to control the animation speed
        this.frameShift = 8; // Shift the frame to the right
    }

    initializeFruit() {
        // Generate a unique ID based on the current timestamp
        this.uniqueId = `fruit-${Fruit.fruitid}`;
        Fruit.fruitid++;

        // Create a new div for the fruit
        this.fruit = document.createElement("div");
        this.fruit.id = this.uniqueId;
        // Add the building to the DOM with the unique ID
        //this.GameInstance.element.innerHTML += `<div id="${this.uniqueId}"></div>`;
        //this.fruit = document.getElementById(this.uniqueId);

        this.fruit.style.width = this.Position.width + "px";
        this.fruit.style.height = this.Position.height + "px";
        this.fruit.style.left = this.Position.x + "px";
        this.fruit.style.top = this.Position.y + "px";
        //this.fruit.style.backgroundColor = "red";
        this.fruit.style.position = "absolute";
        this.fruit.style.backgroundImage = `url(${this.background})`;
        // this.fruit.style.backgroundRepeat = "no-repeat";
        // this.fruit.style.backgroundSize = "auto"; // Or adjust based on your sprite sheet
        this.fruit.style.backgroundPosition = "-8px -6px"

        // Append the fruit to the game area
        this.GameInstance.element.appendChild(this.fruit);
    }

    fruitLoop(playerPosition) {
        let fruitStatus = {
            deleted: false,
            type: this.type
        }

        if(this.Position.checkCollision(playerPosition)){
            this.GameInstance.element.removeChild(this.fruit);

            fruitStatus.deleted = true;
            return fruitStatus;
        }
 
        this.updateAnimation();
        return fruitStatus;
    }


    updateAnimation() {
        // Update the frame timer
        this.frameTimer++;
        if(this.frameTimer >= this.GameInstance.frameRate / this.animationSpeed){
            this.frameTimer = 0;
            this.currentFrame = (this.currentFrame + 1) % this.frameCount;
        }

        // Update the player's sprite position in the sprite sheet
        this.fruit.style.backgroundPosition = `-${this.currentFrame * this.frameWidth + this.frameShift}px -6px`;
    }
}