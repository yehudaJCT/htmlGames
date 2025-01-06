class Game {
    constructor() {
        this.element = document.getElementById("game-area");
        this.gameWidth = 1000;
        this.gameHeight = 500;
        this.frameRate = 60;

        this.element.style.width = this.gameWidth + "px";
        this.element.style.height = this.gameHeight + "px";

        this.buildings = new Array();
        this.fruits = new Array();
        this.fruitCollection = new Array();
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
        this.platformConstruction(50, 300, 250, 50, "yellow");
        this.platformConstruction(0, 400, 50, 20, "blue");
        this.platformConstruction(100, 450, 50, 20, "blue");
        this.platformConstruction(200, 450, 50, 20, "blue");
        this.platformConstruction(300, 400, 50, 20, "blue");
        this.platformConstruction(450, 480, 50, 20, "blue");
        this.platformConstruction(500, 380, 50, 20, "blue");
        this.platformConstruction(450, 280, 50, 20, "blue");
        this.platformConstruction(600, 480, 50, 20, "blue");
        this.platformConstruction(350, 200, 100, 500, "green");
        this.platformConstruction(550, 100, 100, 300, "green");
        this.platformConstruction(300, 50, 350, 50, "gray");
        this.platformConstruction(50, 150, 200, 50, "brown");
        this.platformConstruction(0, 100, 100, 50, "brown");
        this.platformConstruction(900, 40, 100, 190, "brown");
        this.platformConstruction(700, 300, 250, 50, "pink");
        this.platformConstruction(650, 400, 50, 20, "blue");
        this.platformConstruction(750, 450, 50, 20, "blue");
        this.platformConstruction(850, 450, 50, 20, "blue");
        this.platformConstruction(950, 400, 50, 20, "blue");
        this.platformConstruction(650, 50, 100, 30, "purple");
        this.platformConstruction(650, 125, 150, 30, "purple");
        this.platformConstruction(650, 200, 200, 30, "purple");

        // Fruits
        this.fruitConstruction(17, 370, "apple");
        this.fruitConstruction(170, 370, "apple");

        // Player
        this.player = new Player(this, new Rectangle(150, 200, 24, 26), new velocity(0, 0));
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
        } 
    }
}

let game = new Game();
game.inshelizeGame();
game.gameLoop();
