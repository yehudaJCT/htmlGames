//========================================================================
//                  Initialization parameters                   
//========================================================================

class Building {
    static buildingid = 0;

    constructor(GameInstance, Position, background) {
        this.GameInstance = GameInstance;
        this.Position = Position;
        this.background = background; // Background image of the building
    }

    inshelizeBuilding() {
        // Generate a unique ID based on the current timestamp
        const uniqueId = `building-${Building.buildingid}`;
        Building.buildingid++;
    
        // Add the building to the DOM with the unique ID
        this.GameInstance.element.innerHTML += `<div id="${uniqueId}"></div>`;
        const building = document.getElementById(uniqueId);

        building.style.width = this.Position.width + "px";
        building.style.height = this.Position.height + "px";
        building.style.left = this.Position.x + "px";
        building.style.top = this.Position.y + "px";
        building.style.backgroundColor = "green";
        building.style.position = "absolute";

        building.innerHTML = `<img src="${this.background}">`;
        const img = building.querySelector("img");

        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "cover";
        


    }
    
    buildingLoop() {
        // // Update other game elements
        // moveBuilding(-1, 0);

        // if (buildingPosition.x < -buildingPosition.width) {
        //     buildingPosition.x = 470;
        // }
    }

    moveBuilding(x, y) {
        this.Position.x = this.Position.x + x;
        this.Position.y = this.Position.y + y;

        building.style.left = `${this.Position.x}px`;
        building.style.top = `${this.Position.y}px`;
    }

    endTask() {
        // Remove the building from the screen
        this.GameInstance.element.innerHTML = "";
    }
}