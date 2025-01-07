class Game {
    constructor() {
        this.element = document.getElementById("game-area");
        this.gameWidth = 1000;
        this.gameHeight = 500;
        this.frameRate = 60;

        // this.frameTimer = 0;
        // this.animationSpeed = 20;
        this.currentFrame = 0;

        this.element.style.width = this.gameWidth + "px";
        this.element.style.height = this.gameHeight + "px";
        this.element.style.backgroundImage = `url("assets/Background/Pink.png")`;
        this.element.style.backgroundRepeat = "repeat"; // Repeat the background image
        this.element.style.backgroundSize = "auto"; // Ensure the image is not stretched

        this.buildings = new Array();
        this.fruits = new Array();
        this.fruitCollection = new Array();
    }

    refreshBackgroundImage() {
        // Update the frame timer
        this.frameTimer++;
        if(this.frameTimer >= this.frameRate / this.animationSpeed){
            this.frameTimer = 0;
            this.currentFrame = (this.currentFrame + 1) % this.frameCount;
        }

        // Update the player's sprite position in the sprite sheet
        this.element.style.backgroundPosition = `-${this.currentFrame * this.frameWidth - this.ShiftX}px ${this.ShiftY}px`;
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

    Score(){
        
    }


    inshelizeGame() {
        // Use platformConstruction for all buildings
        //start
        this.platformConstruction(50, 300, 250, 46, "Green grass");
        //Start Bridge
        this.platformConstruction(0, 400, 46, 14, "Orange surface");
        this.platformConstruction(100, 450, 46, 14, "Orange surface");
        this.platformConstruction(200, 450, 46, 14, "Orange surface");
        this.platformConstruction(301, 400, 46, 14, "Orange surface");
        //Middle bridge
        this.platformConstruction(450, 484, 46, 14, "Orange surface");
        this.platformConstruction(502, 400, 46, 14, "Orange surface");
        this.platformConstruction(450, 300, 46, 14, "Orange surface");
        this.platformConstruction(600, 484, 46, 14, "Orange surface");
        // End Bridge
        this.platformConstruction(650, 400, 46, 14, "Orange surface");
        this.platformConstruction(750, 450, 46, 14, "Orange surface");
        this.platformConstruction(850, 450, 46, 14, "Orange surface");
        this.platformConstruction(950, 400, 46, 14, "Orange surface");
        //columns
        this.platformConstruction(350, 200, 100, 500, "Brick wall");
        this.platformConstruction(550, 80, 100, 334, "Brick wall");
        //up
        this.platformConstruction(300, 50, 350, 46, "Brown grass");
        //Boydham left
        this.platformConstruction(50, 150, 200, 46, "Green grass");
        this.platformConstruction(0, 100, 100, 46, "Green grass");
        //Boydham right
        this.platformConstruction(900, 40, 100, 46, "Pink grass");
        this.platformConstruction(880, 86, 70, 46, "Pink grass");
        //staircase
        this.platformConstruction(652, 50, 100, 30, "Brown grass");
        this.platformConstruction(652, 125, 150, 30, "Brown grass");
        this.platformConstruction(652, 200, 200, 30, "Brown grass");
        // End
        this.platformConstruction(700, 300, 250, 46, "Pink grass");

        // Fruits
        this.fruitConstruction(15, 370, "apple");
        this.fruitConstruction(115, 420, "apple");
        this.fruitConstruction(215, 420, "apple");
        this.fruitConstruction(315, 370, "apple");

        this.fruitConstruction(665, 370, "apple");
        this.fruitConstruction(775, 420, "apple");
        this.fruitConstruction(865, 420, "apple");
        this.fruitConstruction(965, 370, "apple");

        this.fruitConstruction(665, 370, "apple");
        this.fruitConstruction(775, 420, "apple");
        this.fruitConstruction(865, 420, "apple");
        this.fruitConstruction(965, 370, "apple");

        // Player
        this.player = new Player(this, new Rectangle(150, 200, 23, 28), new velocity(0, 0));
        this.player.initializePlayer();
    }

    async gameLoop() {
        while (true) {
            await new Promise((resolve) => setTimeout(resolve, 1000 / this.frameRate)); // ~60fps

            for (let i = this.fruits.length - 1; i >= 0; i--) { 
                const fruit = this.fruits[i];
                const fruitStatus = fruit.fruitLoop(this.player.Position);
                if (fruitStatus.deleted) {
                    this.fruits.splice(i, 1); 
                    this.fruitCollection.push(fruitStatus.type)
                }
            }

            this.player.playerLoop(this.buildings.map(building => building.Position));
            //console.log(this.fruitCollection);

            this.element.style.backgroundPosition = `0px -${this.currentFrame}px`
            this.currentFrame = (this.currentFrame + 0.5)% 64;
        } 
    }
}

let game = new Game();
game.inshelizeGame();
game.gameLoop();
