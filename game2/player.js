// The Player class is responsible for managing a player's behavior in the game.
class Player {

    // Constructor to initialize the player with the GameInstance, position, and velocity
    constructor(GameInstance, Position, Velocity) {
        this.GameInstance = GameInstance;
        this.Position = Position;
        this.Velocity = Velocity;
        this.isPlayerAlive = true;

        // Animation properties
        this.spriteSheet = "assets/VirtualGuy/Fall.png"; // Set your sprite sheet path here
        this.frameWidth = 32;  // Width of one frame in your sprite sheet
        this.frameHeight = 32; // Height of one frame in your sprite sheet
        this.currentFrame = 0; // Track current frame of animation
        this.animationSpeed = 10; // Number of frames per second
        this.frameCount = 11; // Total number of frames in the sprite sheet
        this.frameTimer = 0; // Frame timer to control the animation speed
        this.ShiftX = -5; // Shift the frame to the right
        this.ShiftY = -4;

        this.move = { moveSped: 5, acceleration: 1 };
        this.jump = { jumpPower: 10, canjump: false };
        this.gravity = { gravityPower: 0.5, affectedByGravity: true };
    }

    // Method to initialize the player on the screen
    initializePlayer() {
        // Generate unique IDs
        this.playerId = `player`;

        this.element = document.createElement("div");
        this.element.id = this.playerId;

        //this.HTMLnextPosition = document.getElementById(nextPositionId); // For debugging purposes
        //this.player = document.getElementById(playerId);

        // Style player
        this.element.style.width = this.Position.width + "px";
        this.element.style.height = this.Position.height + "px";
        this.element.style.left = this.Position.x + "px";
        this.element.style.top = this.Position.y + "px";
        //this.element.style.backgroundColor = "yellow";
        this.element.style.position = "absolute";
        this.element.style.backgroundImage = `url(${this.spriteSheet})`; // Set the sprite sheet

        this.GameInstance.element.appendChild(this.element);
    }

    // The main game loop for the player that handles movement and gravity
    playerLoop(rectangles) {

        if (isEventTriggered) {
            this.handelMovementEvent(); // Handle movement events when triggered
            isEventTriggered = false; // Reset the event trigger flag
        }

        if(this.Velocity.y != 0 || this.Velocity.x != 0){
            this.movePlayer(rectangles); // Move the player based on its current velocity
        }

        // Apply gravity to the player's vertical velocity
        if (this.gravity.affectedByGravity) {
            this.Velocity.y += this.gravity.gravityPower;
        }

        if(!this.isPlayerAlive){
            this.gameOver();
        }

        this.updateAnimation(); // Update the player's animation
        this.refreshPlayerAnimation();
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


    updateAnimation() {
        let animationToPlay = null;
        
        if (this.Velocity.y > 0) {
            // Falling animation
            animationToPlay = "assets/VirtualGuy/Fall.png";
            this.animationSpeed = 1;
            this.frameCount = 1;
        } else if (this.Velocity.y < 0) {
            // Jumping animation
            animationToPlay = "assets/VirtualGuy/Jump.png";
            this.animationSpeed = 1;
            this.frameCount = 1;
        } else if (this.Velocity.x > 0) {
            // Moving right animation
            animationToPlay = "assets/VirtualGuy/Run.png";
            this.animationSpeed = 30;
            this.element.style.transform = "";
            this.frameCount = 12;
        } else if (this.Velocity.x < 0) {
            // Moving left animation (use the same run animation but flipped if needed)
            animationToPlay = "assets/VirtualGuy/Run.png";
            this.element.style.transform = "scaleX(-1)"; // Flip the element horizontally
            this.animationSpeed = 30;
            this.frameCount = 12;
        } else {
            // Idle animation
            animationToPlay = "assets/VirtualGuy/Idle.png";
            this.animationSpeed = 15;
            this.frameCount = 11;
        }
    
        if (this.spriteSheet !== animationToPlay) {
            this.spriteSheet = animationToPlay;
            this.element.style.backgroundImage = `url(${animationToPlay})`;
        }
    }
    

    // Function to move the player and check for collisions with other rectangles
    movePlayer(rectangles) {
        // Calculate the next position based on current velocity and boundaries
        let nextPosition = new Rectangle(
            Math.min(this.GameInstance.gameWidth - this.Position.width, Math.max(0, this.Position.x + this.Velocity.x)),
            //Math.min(this.GameInstance.gameHeight - this.Position.height, Math.max(0, this.Position.y + this.Velocity.y)),
            this.Position.y + this.Velocity.y,
            this.Position.width,
            this.Position.height
        );

        if(nextPosition.y < 0){
            nextPosition.y = 0;
            this.Velocity.y = 0;
        }

        if (nextPosition.y >= this.GameInstance.gameHeight) {
            this.isPlayerAlive = false;
            return;
        }

        this.gravity.affectedByGravity = true; // Allow gravity

        // Check for collisions with other rectangles (e.g., obstacles or boundaries)
        for (let rectangle of rectangles) {
            // Check the type of collision (bottom, left, right, top)
            let type = Rectangle.checkCollisionType(nextPosition, rectangle);

            if(type.bottom){
                this.jump.canjump = true; // Allow the player to jump again
                this.gravity.affectedByGravity = false; // Stop gravity
            }

            // Handle collision with the bottom side
            if (type.bottom && this.Velocity.y > 0) {
                this.Velocity.y = 0;       // Reset vertical velocity
                nextPosition.y = rectangle.y - this.Position.height; // Position the player on top of the rectangle
                continue;
                
            }

            // Handle collision with the top side
            if (type.top && this.Velocity.y < 0) {
                this.Velocity.y = 0; // Stop vertical movement
                nextPosition.y = rectangle.y + rectangle.height; // Position the player just below the rectangle
                continue;
            }

            // Handle collision with the right side
            if (type.right && this.Velocity.x > 0) {
                this.Velocity.x = 0; // Stop horizontal movement
                nextPosition.x = rectangle.x - this.Position.width; // Position the player on the left of the rectangle
                continue;
            }

            // Handle collision with the left side
            if (type.left && this.Velocity.x < 0) {
                this.Velocity.x = 0; // Stop horizontal movement
                nextPosition.x = rectangle.x + rectangle.width; // Position the player on the right of the rectangle
                continue;
            }
        }

        // Update the player's position if no collision occurred
        this.Position = nextPosition;

        // Update the player's position in the DOM
        this.element.style.left = `${this.Position.x}px`;
        this.element.style.top = `${this.Position.y}px`;
    }

    gameOver() {
        this.Position.x = 150;
        this.Position.y = 200;
        this.Velocity.x = 0;
        this.Velocity.y = 0;
        this.isPlayerAlive = true;

        this.jump.canjump = false;
    }

    // Handle movement events based on the key statuses
    handelMovementEvent() {
        // Handle movement for the right arrow key
        switch (inputTracker.right) {
            case KeyStatus.KEYDOWN:
                this.keydown_moveforward(); // Move forward when the key is pressed
                break;
            case KeyStatus.KEYUP:
                this.keyup_moveforward(); // Stop moving forward when the key is released
                break;
            case KeyStatus.NULL:
                break;
        }

        // Handle movement for the left arrow key
        switch (inputTracker.left) {
            case KeyStatus.KEYDOWN:
                this.keydown_movebackward(); // Move backward when the key is pressed
                break;
            case KeyStatus.KEYUP:
                this.keyup_movebackward(); // Stop moving backward when the key is released
                break;
            case KeyStatus.NULL:
                break;
        }

        // Handle jump for the up arrow key
        switch (inputTracker.up) {
            case KeyStatus.KEYDOWN:
                this.keydown_upButton(); // Jump when the key is pressed
                break;
            case KeyStatus.KEYUP:
                this.keyup_upButton(); // Optional: handle key release
                break;
            case KeyStatus.NULL:
                break;
        }

        // Handle crouch or fall for the down arrow key
        switch (inputTracker.down) {
            case KeyStatus.KEYDOWN:
                this.keydown_downButton(); // Fall or crouch when the key is pressed
                break;
            case KeyStatus.KEYUP:
                //this.keyup_downButton(); // Optional: handle key release
                break;
            case KeyStatus.NULL:
                break;
        }

        this.resetMovementState(); // Reset movement events after handling
    }

    resetMovementState() {
        inputTracker.up = KeyStatus.NULL;
        inputTracker.down = KeyStatus.NULL;
        inputTracker.left = KeyStatus.NULL;
        inputTracker.right = KeyStatus.NULL;
    }

    // Handle moving forward (right) when the key is pressed
    keydown_moveforward() {
        this.Velocity.x = this.move.moveSped; // Increase velocity by acceleration
    }

    // Handle moving backward (left) when the key is pressed
    keydown_movebackward() {
        this.Velocity.x = -this.move.moveSped; // Decrease velocity by acceleration
    }

    // Handle falling or crouching when the down arrow key is pressed
    keydown_downButton() {
        this.Velocity.y += this.move.acceleration; // Increase downward velocity
    }

    // Handle jumping when the up arrow key is pressed
    keydown_upButton() {
        if (this.jump.canjump) {
            this.jump.canjump = false; // Prevent multiple jumps
            this.Velocity.y = -this.jump.jumpPower; // Set vertical velocity to jump power
        }
    }

    // Handle stopping forward movement when the right key is released
    keyup_moveforward() {
        this.Velocity.x = 0; // Stop horizontal movement
    }

    // Handle stopping backward movement when the left key is released
    keyup_movebackward() {
        this.Velocity.x = 0; // Stop horizontal movement
    }

    // Optional functions for handling key release for the down and up buttons (not implemented)
    // keyup_downButton() {
    //     this.Velocity.y = this.Velocity.y;
    // }

    keyup_upButton() {
        if (this.Velocity.y < 0)
            this.Velocity.y = 0;
    }
}
