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
        
        let start = new Building(this, new Rectangle(50, 300, 250, 50), "assets/Background/Yellow.png");
        start.inshelizeBuilding();

        let bridge1 = new Building(this, new Rectangle(0, 400, 50, 20), "assets/Background/Blue.png");
        bridge1.inshelizeBuilding();

        let bridge2 = new Building(this, new Rectangle(100, 450, 50, 20), "assets/Background/Blue.png");
        bridge2.inshelizeBuilding();

        let bridge3 = new Building(this, new Rectangle(200, 450, 50, 20), "assets/Background/Blue.png");
        bridge3.inshelizeBuilding();

        let bridge4 = new Building(this, new Rectangle(300, 400, 50, 20), "assets/Background/Blue.png");
        bridge4.inshelizeBuilding();

        let bridge5 = new Building(this, new Rectangle(450, 480, 50, 20), "assets/Background/Blue.png");
        bridge5.inshelizeBuilding();

        let bridge6 = new Building(this, new Rectangle(500, 380, 50, 20), "assets/Background/Blue.png");
        bridge6.inshelizeBuilding();

        let bridge7 = new Building(this, new Rectangle(450, 280, 50, 20), "assets/Background/Blue.png");
        bridge7.inshelizeBuilding();

        let bridge8 = new Building(this, new Rectangle(600, 480, 50, 20), "assets/Background/Blue.png");
        bridge8.inshelizeBuilding();

        let column1 = new Building(this, new Rectangle(350, 200, 100, 500), "assets/Background/Green.png");
        column1.inshelizeBuilding();

        let column2 = new Building(this, new Rectangle(550, 100, 100, 300), "assets/Background/Green.png");
        column2.inshelizeBuilding();

        let sky = new Building(this, new Rectangle(300, 50, 350, 50), "assets/Background/Gray.png");
        sky.inshelizeBuilding();

        let boydham1 = new Building(this, new Rectangle(50, 150, 200, 50), "assets/Background/Brown.png");
        boydham1.inshelizeBuilding();

        let boydham2 = new Building(this, new Rectangle(0, 100, 100, 50), "assets/Background/Brown.png");
        boydham2.inshelizeBuilding();

        let boydham3 = new Building(this, new Rectangle(900, 40, 100, 190), "assets/Background/Brown.png");
        boydham3.inshelizeBuilding();

        let ending = new Building(this, new Rectangle(700, 300, 250, 50), "assets/Background/Pink.png");
        ending.inshelizeBuilding();

        let bridge9 = new Building(this, new Rectangle(650, 400, 50, 20), "assets/Background/Blue.png");
        bridge9.inshelizeBuilding();

        let bridge10 = new Building(this, new Rectangle(750, 450, 50, 20), "assets/Background/Blue.png");
        bridge10.inshelizeBuilding();

        let bridge11 = new Building(this, new Rectangle(850, 450, 50, 20), "assets/Background/Blue.png");
        bridge11.inshelizeBuilding();

        let bridge12 = new Building(this, new Rectangle(950, 400, 50, 20), "assets/Background/Blue.png");
        bridge12.inshelizeBuilding();

        let staircase1 = new Building(this, new Rectangle(650, 50, 100, 30), "assets/Background/Purple.png");
        staircase1.inshelizeBuilding();

        let staircase2 = new Building(this, new Rectangle(650, 125, 150, 30), "assets/Background/Purple.png");
        staircase2.inshelizeBuilding();

        let staircase3 = new Building(this, new Rectangle(650, 200, 200, 30), "assets/Background/Purple.png");
        staircase3.inshelizeBuilding();

        // let building2 = new Building(this, new Rectangle(400, 200, 100, 500), "assets/Background/Blue.png");
        // building2.inshelizeBuilding();

        // let building22 = new Building(this, new Rectangle(500, 300, 100, 500), "assets/Background/Green.png");
        // building22.inshelizeBuilding();

        // let building3 = new Building(this, new Rectangle(700, 250, 300, 500), "assets/Background/Pink.png");
        // building3.inshelizeBuilding();

        // let building4 = new Building(this, new Rectangle(800, 200, 50, 500), "assets/Background/Purple.png");
        // building4.inshelizeBuildinag();

        this.buildings.push(start);

        this.buildings.push(bridge1);
        this.buildings.push(bridge2);
        this.buildings.push(bridge3);
        this.buildings.push(bridge3);
        this.buildings.push(bridge4);
        
        this.buildings.push(bridge5);
        this.buildings.push(bridge6);
        this.buildings.push(bridge7);
        this.buildings.push(bridge8);

        this.buildings.push(bridge9);
        this.buildings.push(bridge10);
        this.buildings.push(bridge11);
        this.buildings.push(bridge12);

        this.buildings.push(column1);
        this.buildings.push(column2);

        this.buildings.push(sky);

        this.buildings.push(boydham1);
        this.buildings.push(boydham2);
        this.buildings.push(boydham3);


        this.buildings.push(ending);

        this.buildings.push(staircase1);
        this.buildings.push(staircase2);
        this.buildings.push(staircase3);

        //this.fruit1 = new Fruit(this, new Rectangle(100, 200, 32, 32), "apple");
        //this.fruit1.inshelizeFruit();

        this.player = new Player(this, new Rectangle(150, 200, 24, 26), new velocity(0, 0));
        this.player.inshelizePlayer();

    }

    async gameLoop(){
        while (true) {
            await new Promise((resolve) => setTimeout(resolve, 1000 / this.frameRate)); // ~60fps
            //console.log(playerInputStatus);
            //this.fruit1.fruitLoop(this.player.Position);

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
