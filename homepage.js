document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login-button');
    const signupButton = document.getElementById('signup-button');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const backToHomeLogin = document.getElementById('back-to-home-login');
    const backToHomeSignup = document.getElementById('back-to-home-signup');

    loginButton.addEventListener('click', () => {
        loginForm.classList.remove('hidden');
        document.getElementById('homepage').classList.add('hidden');
    });

    signupButton.addEventListener('click', () => {
        signupForm.classList.remove('hidden');
        document.getElementById('homepage').classList.add('hidden');
    });

    backToHomeLogin.addEventListener('click', () => {
        loginForm.classList.add('hidden');
        document.getElementById('homepage').classList.remove('hidden');
    });

    backToHomeSignup.addEventListener('click', () => {
        signupForm.classList.add('hidden');
        document.getElementById('homepage').classList.remove('hidden');
    });

    document.getElementById('login-submit').addEventListener('click', () => {
        alert('Login Successful! Redirecting to game...');
        window.location.href = 'game.html';
    });

    document.getElementById('signup-submit').addEventListener('click', () => {
        alert('Signup Successful! Redirecting to game...');
        window.location.href = 'game.html';
    });
});
