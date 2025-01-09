class Game {
    constructor(seed = Math.floor(Math.random() * 1000000)) {
        this.element = document.getElementById("game-area");
        this.navBarElement = document.getElementById("navigation-bar");
        this.fruitListElement = document.getElementById("fruit-list");
        this.scoreElement = document.getElementById("Score");
        this.seedElement = document.getElementById("seed");
        this.gameWidth = 1000;
        this.gameHeight = 500;
        this.frameRate = 60;
        document.body.style.zoom = "120%";

        // this.frameTimer = 0;
        // this.animationSpeed = 20;
        this.time = 0;
        this.score = 0;

        this.navBarElement.style.width = this.gameWidth + "px";
        this.navBarElement.style.backgroundImage = `url("assets/Background/Brown.png")`;
        this.navBarElement.style.backgroundRepeat = "repeat"; // Repeat the background image
        this.navBarElement.style.backgroundSize = "auto"; // Ensure the image is not stretched

        this.element.style.width = this.gameWidth + "px";
        this.element.style.height = this.gameHeight + "px";
        this.element.style.backgroundImage = `url("assets/Background/Pink.png")`;
        this.element.style.backgroundRepeat = "repeat"; // Repeat the background image
        this.element.style.backgroundSize = "auto"; // Ensure the image is not stretched

        this.buildings = new Array();
        this.fruits = new Array();
        this.fruitCollection = new Array();
        this.subFC = new Array();

        this.seed = seed; // Seed for randomization
        
        this.random = this.seededRandom(this.seed);

        this.fruitTypes = {
            "apple": "assets/Fruits/Apple.png",
            "bananas": "assets/Fruits/Bananas.png",
            "cherrie": "assets/Fruits/Cherries.png",
            "kiwi": "assets/Fruits/Kiwi.png",
            "origin": "assets/Fruits/Orange.png",
            "strawberry": "assets/Fruits/Strawberry.png",
            "melon": "assets/Fruits/Melon.png",
            "pineapple": "assets/Fruits/Pineapple.png",
        };
    }

    // Seeded random number generator
    seededRandom(seed) {
        let value = seed;
        return function () {
            value = (value * 9301 + 49297) % 233280;
            return value / 233280.0;
        };
    }

    // Function to randomly generate fruits
    randomizeFruits(positions) {
        positions.forEach(([x, y]) => {
            if (this.random() < 0.8) { // 80% chance to spawn fruit
                const fruitKeys = Object.keys(this.fruitTypes);
                const randomFruit = fruitKeys[Math.floor(this.random() * fruitKeys.length)];
                this.fruitConstruction(x, y, randomFruit);
            }
        });
    }

    platformConstruction(x, y, width, height, background) {
        let backgrounds = {
            "yellow": "assets/Background/Yellow.png",
            "blue": "assets/Background/Blue.png",
            "green": "assets/Background/Green.png",
            "gray": "assets/Background/Gray.png",
            "brown": "assets/Background/Brown.png",
            "pink": "assets/Background/Pink.png",
            "purple": "assets/Background/Purple.png",
            "Green grass": "assets/tarran/greenGrass.png",
            "Brick wall": "assets/tarran/brickWall.png",
            "Pink grass": "assets/tarran/pinkGrass.png",
            "stone": "assets/tarran/stone.png",
            "Brown grass": "assets/tarran/brownGrass.png",
            "Orange surface": "assets/tarran/orangeSurface.png",
        };

        let b = new Building(this, new Rectangle(x, y, width, height), backgrounds[background]);
        b.initializeBuilding();
        this.buildings.push(b);
    }

    fruitConstruction(x, y, type){
        let f = new Fruit(this, new Rectangle(x, y, 16, 16), type);
        f.initializeFruit();
        this.fruits.push(f);
    }

    updateFruitList() {
        // Clear the existing list of fruits
        this.fruitListElement.innerHTML = "";
    
        // Add fruits from this.subFC to the list
        this.subFC.forEach(fruit => {
            const img = document.createElement("div");
            img.style.backgroundImage = `url(${this.fruitTypes[fruit]})`;
            img.style.width = "32px";
            img.style.height = "32px";
            //img.style.margin = "1px";
            //img.style.backgroundSize = "cover"; // Ensure the image covers the div
            //img.style.backgroundPosition = "center"; // Center the image in the div
    
            this.fruitListElement.appendChild(img);
        });
    }

    scoref(newfruit) {

        // If the list is empty, add the new fruit and return 1
        if (this.subFC.length === 0) {
            this.subFC.push(newfruit);
            this.updateFruitList(); // Update navigation bar
            return 1;
        }
    
        const size = this.subFC.length;
    
        // Check if newfruit is equal to all elements in subFC
        const allEqual = this.subFC.every(fruit => fruit === newfruit);
    
        // Check if newfruit is not already in subFC
        const isUnique = !this.subFC.includes(newfruit);
    
        // Check if there are duplicates in subFC (using Set for uniqueness)
        const hasDuplicates = new Set(this.subFC).size !== this.subFC.length;
    
        if (allEqual) {
            // All elements are equal to newfruit
            this.subFC.push(newfruit);
            this.updateFruitList(); // Update navigation bar
            //return 2 * size + 1;
            return (size + 1) * (size + 1);
        }
    
        if (isUnique && !hasDuplicates) {
            // newfruit is unique and no duplicates exist
            this.subFC.push(newfruit);
            this.updateFruitList(); // Update navigation bar
            return new Set(this.subFC).size; // Count unique elements
        }
    
        // If neither condition is met, reset subFC and add newfruit
        this.subFC = [newfruit];
        this.updateFruitList(); // Update navigation bar
        return 1;
    }

    inshelizeGame() {
        this.seedElement.textContent = `Seed: ${this.seed}`
        // Use platformConstruction for all buildings
        //start
        this.platformConstruction(50, 300, 250, 45, "Green grass");
        //Start Bridge
        this.platformConstruction(0, 400, 46, 14, "Orange surface");
        this.platformConstruction(100, 450, 46, 14, "Orange surface");
        this.platformConstruction(200, 450, 46, 14, "Orange surface");
        this.platformConstruction(301, 400, 46, 14, "Orange surface");
        //Middle bridge
        this.platformConstruction(450, 300, 46, 14, "Orange surface");
        this.platformConstruction(502, 400, 46, 14, "Orange surface");
        this.platformConstruction(450, 484, 46, 14, "Orange surface");
        this.platformConstruction(600, 484, 46, 14, "Orange surface");
        // End Bridge
        this.platformConstruction(650, 400, 46, 14, "Orange surface");
        this.platformConstruction(750, 450, 46, 14, "Orange surface");
        this.platformConstruction(850, 450, 46, 14, "Orange surface");
        this.platformConstruction(950, 400, 46, 14, "Orange surface");
        //columns
        this.platformConstruction(350, 200, 100, 500, "Brick wall");
        this.platformConstruction(550, 80, 100, 100, "Brick wall");
        this.platformConstruction(550, 220, 100, 194, "Brick wall");
        //up
        this.platformConstruction(300, 50, 350, 45, "Brown grass");
        //Boydham left
        this.platformConstruction(50, 148, 200, 45, "Green grass");
        this.platformConstruction(0, 100, 100, 45, "Green grass");
        //Boydham right
        this.platformConstruction(900, 40, 100, 45, "Pink grass");
        this.platformConstruction(880, 86, 70, 45, "Pink grass");
        //staircase
        this.platformConstruction(652, 50, 100, 30, "Brown grass");
        this.platformConstruction(652, 125, 150, 30, "Brown grass");
        this.platformConstruction(700, 200, 150, 30, "Brown grass");
        // End
        this.platformConstruction(700, 300, 250, 45, "Pink grass");

        // Define positions for fruits
        const fruitPositions = [
            [80, 270], [260, 270], [15, 370], [115, 420],
            [215, 420], [315, 370], [465, 270], [517, 370],
            [465, 454], [615, 454], [665, 370], [765, 420],
            [865, 420], [965, 370], [370, 170], [420, 170],
            [320, 20], [370, 20], [420, 20], [470, 20],
            [520, 20], [570, 20], [620, 20], [970, 10],
            [920, 10], [970, 100], [15, 70], [65, 70],
            [120, 120], [170, 120], [220, 120], [15, 165],
            [670, 20], [720, 20], [670, 95], [720, 95],
            [770, 95], [720, 170], [770, 170], [820, 170],
            [730, 270], [910, 270]
        ];

        // Randomize fruits
        this.randomizeFruits(fruitPositions);

        this.start = new Stert(this, new Rectangle(150, 263, 60, 37))
        this.start.initializeStert();

        this.end = new End(this, new Rectangle(800, 254, 46, 46))
        this.end.initializeEnd();

        // Player
        this.player = new Player(this, new Rectangle(180, 200, 23, 28), new velocity(0, 0));
        this.player.initializePlayer();
    }

    async gameLoop() {
        while (true) {

            await new Promise((resolve) => setTimeout(resolve, 1000 / this.frameRate)); // ~60fps
            if(PASS){
                continue;
            }

            for (let i = this.fruits.length - 1; i >= 0; i--) { 
                const fruit = this.fruits[i];
                const fruitStatus = fruit.fruitLoop(this.player.Position);
                if (fruitStatus.deleted) {
                    this.fruits.splice(i, 1); 
                    this.fruitCollection.push(fruitStatus.type);
                    this.score += this.scoref(fruitStatus.type);
                }
            }

            this.start.StertLoop();

            let isPlayerAtEnd = this.end.EndLoop(this.player.Position);



            this.player.playerLoop(this.buildings.map(building => building.Position));
            //console.log(this.fruitCollection);

            this.scoreElement.textContent = `Score: ${this.score} Time: ${(this.time / 60).toFixed(2)}`;
            this.element.style.backgroundPosition = `0px -${this.time / 2}px`


            if(isPlayerAtEnd)
            {
                this.endGame()
                break;
            }

            this.time++;
        } 
    }

    endGame() {
        // Create the game-over message container
        const gameOverMessage = document.createElement("div");
        gameOverMessage.id = "game-over-message";
    
        // Set the content
        gameOverMessage.innerHTML = `
            <p>Game Over!</p>
            <p>Final Score: ${this.score}</p>
            <p>Final Time: ${(this.time / 60).toFixed(2)}</p>
            <button id="restart-game">Restart Game</button>
        `;
    
        // Append the message to the game area
        this.element.appendChild(gameOverMessage);
    
        // Stop the game loop
        //window.PASS = true;
    
        // Restart game event listener
        const restartButton = document.getElementById("restart-game");
        restartButton.addEventListener("click", () => {
            gameOverMessage.remove(); // Remove the game-over message
            window.PASS = false; // Reset the game loop flag
            game.resetGame(); // Reset the game state
            game.gameLoop(); // Restart the game
        });
    }
    
    resetGame() {
        // Clear the entire "game-area" element
        this.element.innerHTML = "";
    
        // Reset game state variables
        this.time = 0;
        this.score = 0;
        this.fruits = [];
        this.fruitCollection = [];
        this.subFC = [];

        this.seed = Math.floor(Math.random() * 1000000)
    
        // Reinitialize game elements
        this.updateFruitList();
        this.inshelizeGame();
    }
    
}

let game = new Game();
game.inshelizeGame();
game.gameLoop();


