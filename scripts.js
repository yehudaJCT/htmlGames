document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form");
    const loginForm = document.getElementById("login-form");

    // Register new user
    registerForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const username = document.getElementById("register-username").value;
        const password = document.getElementById("register-password").value;

        // Save user to local storage
        if (localStorage.getItem(username)) {
            alert("Username already exists. Please choose a different one.");
        } else {
            localStorage.setItem(username, password);
            alert("Registration successful! You can now log in.");
            registerForm.reset();
        }
    });

    // Login existing user
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const username = document.getElementById("login-username").value;
        const password = document.getElementById("login-password").value;

        const storedPassword = localStorage.getItem(username);
        if (storedPassword && storedPassword === password) {
            alert(`Welcome back, ${username}!`);
            loginForm.reset();
        } else {
            alert("Invalid username or password. Please try again.");
        }
    });
});
