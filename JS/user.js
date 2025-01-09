// Define the User class
class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.gameData = {}; // Dynamic list to store game-specific data
        this.createdAt = new Date().toISOString(); // Store creation time as an ISO string
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
            createdAt: this.createdAt, // Include the creation time
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
            user.createdAt = parsedData.createdAt || new Date().toISOString(); // Set creation time
            return user;
        }
        return null; // Return null if the user is not found
    }

    // Get a list of all users stored in localStorage
    static getAllUsers() {
        const users = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            try {
                const data = JSON.parse(localStorage.getItem(key));
                if (data && data.username && data.password) {
                    users.push({
                        username: data.username,
                        createdAt: data.createdAt || "Unknown",
                    });
                }
            } catch (e) {
                // Ignore non-JSON data or invalid entries
            }
        }
        return users;
    }
}

// Example usage:
// Save some users
// const user1 = new User("Alice", "password123");
// const user2 = new User("Bob", "securePass!");
// user1.saveToLocalStorage();
// user2.saveToLocalStorage();

// // Get the list of all users with their creation times
// const allUsers = User.getAllUsers();
// console.log("All users:", allUsers);

// // Retrieve a specific user and view their creation time
// const retrievedUser = User.retrieveFromLocalStorage("Alice");
// console.log("User creation time:", retrievedUser.createdAt);
