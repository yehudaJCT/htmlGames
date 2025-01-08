

class Stert {
    static stertId = 0;

    constructor(GameInstance, Position) {
        this.GameInstance = GameInstance;
        this.Position = Position;
        this.uniqueId = `stert-${Stert.stertId++}`;

        // Animation properties
        this.spriteSheet = "assets/Checkpoints/Start/Moving.png"; // Set your sprite sheet path here
        this.frameWidth = 64;  // Width of one frame in your sprite sheet
        this.frameHeight = 64; // Height of one frame in your sprite sheet
        this.currentFrame = 0; // Track current frame of animation
        this.animationSpeed = 20; // Number of frames per second
        this.frameCount = 17; // Total number of frames in the sprite sheet
        this.frameTimer = 0; // Frame timer to control the animation speed
        this.ShiftX = 0; // Shift the frame to the right
        this.ShiftY = -27;
    }


    initializeStert() {
        // Create the fruit DOM element
        this.element = document.createElement("div");
        this.element.id = this.uniqueId;

        this.element.style.width = `${this.Position.width}px`;
        this.element.style.height = `${this.Position.height}px`;
        this.element.style.left = `${this.Position.x}px`;
        this.element.style.top = `${this.Position.y}px`;
        //this.element.style.backgroundColor = "yellow";
        this.element.style.position = "absolute";
        this.element.style.backgroundImage = `url(${this.spriteSheet})`; // Set the sprite sheet

        // Append to the game area
        this.GameInstance.element.appendChild(this.element);
    }


    StertLoop() {

        this.refreshPlayerAnimation()
    }

    refreshPlayerAnimation() {
        // Update the frame timer
        this.frameTimer++;
        if(this.frameTimer >= this.GameInstance.frameRate / this.animationSpeed){
            this.frameTimer = 0;
            this.currentFrame = (this.currentFrame + 1) % this.frameCount;
        }

        // Update the player's sprite position in the sprite sheet
        this.element.style.backgroundPosition = `-${this.currentFrame * this.frameWidth - this.ShiftX}px ${this.ShiftY}px`;
    }
}
