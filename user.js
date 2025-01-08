// Define the User class
class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.gameData = {}; // Dynamic list to store game-specific data
    }

    // Method to add or update game data
    addGameData(gameName, data) {
        this.gameData[gameName] = data;
    }

    // Method to retrieve game data
    getGameData(gameName) {
        return this.gameData[gameName] || "No data for this game.";
    }

    // Save the user to localStorage
    saveToLocalStorage() {
        const userData = {
            username: this.username,
            password: this.password,
            gameData: this.gameData,
        };
        localStorage.setItem(this.username, JSON.stringify(userData));
    }

    // Retrieve a user from localStorage
    static retrieveFromLocalStorage(username) {
        const userData = localStorage.getItem(username);
        if (userData) {
            const parsedData = JSON.parse(userData);
            const user = new User(parsedData.username, parsedData.password);
            user.gameData = parsedData.gameData || {};
            return user;
        }
        return null; // Return null if the user is not found
    }
}
