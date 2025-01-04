//========================================================================
//                  Initialization parameters                   
//========================================================================

class Game{
    constructor(){
        this.buildings = new Array();

        this.element = document.getElementById("game-area");
        this.gameWidth = 1000;
        this.gameHeight = 500;
        this.frameRate = 60;

        this.element.style.width = this.gameWidth + "px";
        this.element.style.height = this.gameHeight + "px";
    }

    inshelizeGame(){
        
        let building1 = new Building(this, new Rectangle(0, 300, 300, 500), "assets/Background/Yellow.png");
        building1.inshelizeBuilding();

        let building2 = new Building(this, new Rectangle(400, 200, 100, 500), "assets/Background/Blue.png");
        building2.inshelizeBuilding();

        let building22 = new Building(this, new Rectangle(500, 300, 100, 500), "assets/Background/Green.png");
        building22.inshelizeBuilding();

        let building3 = new Building(this, new Rectangle(700, 250, 300, 500), "assets/Background/Pink.png");
        building3.inshelizeBuilding();

        let building4 = new Building(this, new Rectangle(800, 200, 50, 500), "assets/Background/Purple.png");
        building4.inshelizeBuilding();

        this.buildings.push(building1);
        this.buildings.push(building2);
        this.buildings.push(building22);
        this.buildings.push(building3);
        this.buildings.push(building4);

        this.fruit1 = new Fruit(this, new Rectangle(100, 200, 32, 32), "apple");
        this.fruit1.inshelizeFruit();

        this.player = new Player(this, new Rectangle(200, 0, 24, 32), new velocity(0, 0));
        this.player.inshelizePlayer();

    }

    async gameLoop(){
        while (true) {
            await new Promise((resolve) => setTimeout(resolve, 1000 / this.frameRate)); // ~60fps
            //console.log(playerInputStatus);
            this.fruit1.fruitLoop(this.player.Position);

            this.player.playerLoop(this.buildings.map(building => building.Position));

            // for(let building of this.buildings){
            //     building.buildingLoop();
            // }


            
        }
    }
}

let game = new Game();
game.inshelizeGame();
game.gameLoop();
