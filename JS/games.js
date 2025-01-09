document.addEventListener('DOMContentLoaded', () => {
    console.log(document.cookie);
     //Get the name of the current user
     var currentUs = JSON.parse(localStorage.getItem(`user#${localStorage.currentUser}`));
     var currentUserName = currentUs.userName;
     document.getElementById("message").innerHTML = "Hello " + currentUserName + "!";
 
     //Check if this is first visit or a repeat visit
     var currentDate = currentUs.achivment.date;
     if (currentDate == 0) {
         document.getElementById("date").innerHTML = "You are visiting this page for the first time.";
     }
     else {
         document.getElementById("date").innerHTML = "Your last visited this page on: " + currentDate;
     }
 
     //Display the last date of user on the site
     var date = new Date();
     var fullDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
     currentUs.achivment.date = fullDate;
     localStorage.setItem(`user#${localStorage.currentUser}`, JSON.stringify(currentUs));


    const currentUserIndex = localStorage.currentUser;
    const userData = JSON.parse(localStorage.getItem(`user#${currentUserIndex}`));
    const maxScores = JSON.parse(localStorage.getItem('maxScore')); 
    console.log(document.getElementById('maxTicTacToe').textContent)

    document.getElementById('userCatchTheTarget').textContent = userData.achivment.maxCatchTheTarget || '0'; 
    document.getElementById('userTicTacToe').textContent = userData.achivment.maxTicTacToe || '0'; 

    document.getElementById('maxCatchTheTarget').textContent = maxScores.catchTheTarget || '0';
    document.getElementById('maxTicTacToe').textContent = maxScores.ticTacToe || '0';
    console.log(maxScores.ticTacToe)
})
function eraseCookie(name) {
    document.cookie = "name" + "=" + name + ";" + "expires=Thu, 01 Jan 1970 00:00:00 GMT;" + ";path=/";
}

