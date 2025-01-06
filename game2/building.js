class Building {
    static buildingid = 0;

    constructor(GameInstance, Position, background) {
        this.GameInstance = GameInstance;
        this.Position = Position;
        this.background = background; // Background image of the building
    }

    initializeBuilding() {
        // Generate a unique ID based on the current timestamp
        const uniqueId = `building-${Building.buildingid}`;
        Building.buildingid++;
    
        // Add the building to the DOM with the unique ID
        //this.GameInstance.element.innerHTML += `<div id="${uniqueId}"></div>`;
        //const building = document.getElementById(uniqueId);

        this.building = document.createElement("div");
        this.building.id = this.uniqueId;

        this.building.style.width = this.Position.width + "px";
        this.building.style.height = this.Position.height + "px";
        this.building.style.left = this.Position.x + "px";
        this.building.style.top = this.Position.y + "px";
        this.building.style.backgroundColor = "green";
        this.building.style.position = "absolute";
        this.building.style.backgroundImage = `url(${this.background})`;
        this.building.style.backgroundRepeat = "repeat"; // Repeat the background image
        this.building.style.backgroundSize = "auto"; // Ensure the image is not stretched

        // Append the fruit to the game area
        this.GameInstance.element.appendChild(this.building);
    }
    
    buildingLoop() {
    }
}