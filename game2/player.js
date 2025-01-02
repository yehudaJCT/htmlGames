// The Player class is responsible for managing a player's behavior in the game.
class Player {
    static t = 0;

    // Constructor to initialize the player with the GameInstance, position, and velocity
    constructor(GameInstance, Position, Velocity) {
        this.GameInstance = GameInstance; // The game instance this player belongs to
        this.Position = Position;         // The current position of the player
        this.Velocity = Velocity;         // The current velocity of the player

        this.move = {
            moveSped: 6,                  
            acceleration: 1,             // The acceleration of the player's movement           
        }

        this.jump = {                     // Jumping behavior
            jumpPower: 12,                // The power of the player's jump
            canjump: false,               // Flag to check if the player can jump
        }

        this.gravity = {
            gravityPower: 0.5,
            affectedByGravity: true              // The power of gravity
        }              

        this.isPlayerAlive = true;        // Flag to check if the player is alive
    }

    // Method to initialize the player on the screen
    inshelizePlayer() {
        // Generate unique IDs
        const playerId = `player`;
        const nextPositionId = `nextPosition`; // For debugging purposes

        // Add nextPosition and player elements to the DOM
        this.GameInstance.element.innerHTML += `<div id="${nextPositionId}"></div>`; // For debugging purposes
        this.GameInstance.element.innerHTML += `<div id="${playerId}"></div>`;

        this.HTMLnextPosition = document.getElementById(nextPositionId); // For debugging purposes
        this.player = document.getElementById(playerId);

        // Style nextPosition For debugging purposes
        this.HTMLnextPosition.textContent = "(0,0)";
        this.HTMLnextPosition.style.width = this.Position.width + "px";
        this.HTMLnextPosition.style.height = this.Position.height + "px";
        this.HTMLnextPosition.style.left = this.Position.x + "px";
        this.HTMLnextPosition.style.top = this.Position.y + "px";
        this.HTMLnextPosition.style.backgroundColor = "yellow";
        this.HTMLnextPosition.style.position = "absolute";
        this.HTMLnextPosition.style.opacity = 0.5;
        this.HTMLnextPosition.style.zIndex = 2; // Ensure it's below the player
        this.HTMLnextPosition.style.pointerEvents = "none"; // Avoid blocking interactions

        // Style player
        this.player.style.width = this.Position.width + "px";
        this.player.style.height = this.Position.height + "px";
        this.player.style.left = this.Position.x + "px";
        this.player.style.top = this.Position.y + "px";
        this.player.style.backgroundColor = "red";
        this.player.style.position = "absolute";
        this.player.style.zIndex = 1; // Ensure it's above nextPosition
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
    }

    // Function to move the player and check for collisions with other rectangles
    movePlayer(rectangles) {
        // Calculate the next position based on current velocity and boundaries
        let nextPosition = new Rectangle(
            Math.min(this.GameInstance.gameWidth - this.Position.width, Math.max(0, this.Position.x + this.Velocity.x)),
            //Math.min(this.GameInstance.gameHeight - this.Position.height, Math.max(0, this.Position.y + this.Velocity.y)),
            Math.max(0, this.Position.y + this.Velocity.y),
            this.Position.width,
            this.Position.height
        );

        // For debugging purposes
        this.HTMLnextPosition.textContent = `(${this.Velocity.x},${this.Velocity.y})`;
        this.HTMLnextPosition.style.left = `${nextPosition.x}px`;
        this.HTMLnextPosition.style.top = `${nextPosition.y}px`;

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
        this.player.style.left = `${this.Position.x}px`;
        this.player.style.top = `${this.Position.y}px`;
    }

    gameOver() {
        this.Position.x = 100;
        this.Position.y = 0;
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
