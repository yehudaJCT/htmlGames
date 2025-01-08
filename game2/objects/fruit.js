let fruits = {
    "apple": "assets/Fruits/Apple.png",
    "bananas": "assets/Fruits/Bananas.png",
    "cherrie": "assets/Fruits/Cherries.png",
    "kiwi": "assets/Fruits/Kiwi.png",
    "origin": "assets/Fruits/Orange.png",
    "strawberry": "assets/Fruits/Strawberry.png",
    "melon": "assets/Fruits/Melon.png",
    "pineapple": "assets/Fruits/Pineapple.png",

}

class Fruit {
    static fruitId = 0;

    /**
     * Creates a new Fruit instance.
     * @param {Object} GameInstance - The game instance controlling the fruit.
     * @param {Object} Position - The position and dimensions of the fruit.
     * @param {string} type - The type of fruit (e.g., "apple", "cherry").
     */
    constructor(GameInstance, Position, type) {
        this.GameInstance = GameInstance;
        this.Position = Position;
        this.type = type;
        this.uniqueId = `fruit-${Fruit.fruitId++}`;
        this.animation = null;
        this.element = null;
    }

    /**
     * Initializes the fruit element and its animation.
     */
    initializeFruit() {
        // Create the fruit DOM element
        this.element = document.createElement("div");
        this.element.id = this.uniqueId;

        this.element.style.width = `${this.Position.width}px`;
        this.element.style.height = `${this.Position.height}px`;
        this.element.style.left = `${this.Position.x}px`;
        this.element.style.top = `${this.Position.y}px`;
        //this.element.style.backgroundColor = "yellow";
        this.element.style.position = "absolute";

        // Attach animation
        const frameWidth = 32;
        const frameHeight = 32;
        const frameCount = 17;
        const animationSpeed = 20;
        const shiftX = -4;
        const shiftY = -4;

        this.animation = new SpriteAnimation(
            this.element,
            new Animation({
                frameWidth,
                frameHeight,
                frameCount,
                animationSpeed,
                backgroundImage: fruits[this.type],
                shiftX,
                shiftY
            })
        );

        // Start animation
        this.animation.start();

        // Append the fruit to the game area
        this.GameInstance.element.appendChild(this.element);
    }

    /**
     * Handles the fruit's update loop.
     * @param {Object} playerPosition - The position of the player to check for collisions.
     * @returns {Object} The fruit's status (e.g., deleted or not).
     */
    fruitLoop(playerPosition) {
        const fruitStatus = { deleted: false, type: this.type };

        // Check for collision with the player
        if (this.Position.checkCollision(playerPosition)) {
            // Stop the animation and remove the element
            this.animation.stop();
            fruitStatus.deleted = true;

            // Attach animation
            const frameWidth = 32;
            const frameHeight = 32;
            const frameCount = 10;
            const animationSpeed = 15;
            const shiftX = -4;
            const shiftY = -4;

            this.animation = new SpriteAnimation(
                this.element,
                new Animation({
                    frameWidth,
                    frameHeight,
                    frameCount,
                    animationSpeed,
                    backgroundImage: "assets/Fruits/Collected.png",
                    shiftX,
                    shiftY
                })
            );
            this.animation.start();

            setTimeout(() => {
                this.animation.stop();
                
                this.GameInstance.element.removeChild(this.element);
                
            }, 400); // Delay removal to allow the donut animation to finish

        }

        return fruitStatus;
    }
}
