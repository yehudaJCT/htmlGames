var player, pc, menu, board, difficulty, CurrentTurn, xTurn, cells, winningMessage, restartButton, winningMessageText, scoreLabel, userData, score, currentUserIndex, maxScore


const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

document.addEventListener("DOMContentLoaded", () => {

    currentUserIndex = localStorage.currentUser;
    user  = localStorage.currentUser;
    userData = JSON.parse(localStorage.getItem(`user#${currentUserIndex}`));
    score = 0
    
    maxScore = JSON.parse(localStorage.getItem('maxScore')); 

    board = document.querySelector('.board')

    menu = document.querySelector('.menu')

    cells = document.querySelectorAll('.cell')

    winningMessage = document.querySelector('.winning-message')

    restartButton = document.querySelector('.restart-button')

    winningMessageText = document.querySelector('.end-game-message')

    scoreLabel = document.querySelector('.score').innerText = `Current score: 0`

    var shape_picking = document.querySelectorAll('.shape-selector')
    
    shape_picking.forEach(element => {
        element.addEventListener('click', startPlay)
    })


});

function startPlay(event){
    menu.classList.add('hidden')
    difficulty = document.getElementById('difficulty').value
    var clickedElement = event.target;
    xTurn = true
    if (clickedElement.classList.contains('x-play-button')){
        player = 'x'
        pc = 'o'
    }else if (clickedElement.classList.contains('o-play-button')){
        player = 'o'
        pc = 'x'
        makePCMove()

    }
    
    cells.forEach(cell => {
        cell.addEventListener('click', cellClicked, {once:true})
    })
    
}

function makePCMove() {
    const bestMove = findBestMove(cells, pc, difficultyToDepth(difficulty));
    if (bestMove !== null) {
        cells[bestMove].classList.add(pc);

        if (checkWin(pc)) {
            endGame(pc);
        } else if (isDraw()) {
            endGame('draw')
        }
        xTurn = !xTurn;
    }
}

function difficultyToDepth(difficulty) {
    switch (difficulty) {
        case 'easy':
            return 1;
        case 'medium':
            return 3;
        case 'hard':
            return Infinity; 
    }
}

function findBestMove(cells, player, depth) {
    let bestScore = player === pc ? -Infinity : Infinity;
    let move = null;

    for (let i = 0; i < cells.length; i++) {
        if (!cells[i].classList.contains('x') && !cells[i].classList.contains('o')) {

            cells[i].classList.add(player);
            const score = minimax(cells, 0, false, depth, -Infinity, Infinity);

            cells[i].classList.remove(player);

            if (player === pc) {
                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            } else {
                if (score < bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
        }
    }
    return move;
}

function minimax(cells, currentDepth, isMaximizing, depth, alpha, beta) {
    if (checkWin(pc)) return 10 - currentDepth;
    if (checkWin(player)) return currentDepth - 10;
    if (isDraw()) return 0;
    if (currentDepth === depth) return 0; 

    if (isMaximizing) {
        let maxEval = -Infinity;
        for (let i = 0; i < cells.length; i++) {
            if (!cells[i].classList.contains('x') && !cells[i].classList.contains('o')) {
                cells[i].classList.add(pc);
                const eval = minimax(cells, currentDepth + 1, false, depth, alpha, beta);
                cells[i].classList.remove(pc);
                maxEval = Math.max(maxEval, eval);
                alpha = Math.max(alpha, eval);
                if (beta <= alpha) break;
            }
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (let i = 0; i < cells.length; i++) {
            if (!cells[i].classList.contains('x') && !cells[i].classList.contains('o')) {
                cells[i].classList.add(player);
                const eval = minimax(cells, currentDepth + 1, true, depth, alpha, beta);
                cells[i].classList.remove(player);
                minEval = Math.min(minEval, eval);
                beta = Math.min(beta, eval);
                if (beta <= alpha) break;
            }
        }
        return minEval;
    }
}

function isDraw() {
    return [...cells].every(cell => cell.classList.contains('x') || cell.classList.contains('o'));
}


function cellClicked(event){
    if (xTurn){
        event.target.classList.add('x')
    } else{
        event.target.classList.add('o')
    }
    console.log(xTurn)

    if (checkWin(xTurn ? 'x' : 'o')){
        endGame(xTurn ? 'x' : 'o')
        return
    } else if (isDraw()){
        endGame('draw')
        return
    }

    xTurn = !xTurn
    makePCMove()
}


function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
      return combination.every(index => {
        return cells[index].classList.contains(currentClass)
      })
    })
}

function endGame(whoWins){
    if (whoWins == 'draw'){
        draw()
    } else {
        win(whoWins)
    }
    winningMessage.classList.add('show')
    restartButton.addEventListener('click', resetGame)
}

function draw(){
    winningMessageText.innerText = "Draw!"
}


function win(whoWins){
    winningMessageText.innerText = `${whoWins.toUpperCase()} Win!`
    if (whoWins == player){
        switch (difficulty) {
            case 'easy':
                score += 1
                break
            case 'medium':
                score += 2
                break
            case 'hard':
                score += 3
                break
        }
        updateScore()
    }

}

function resetGame() {
    cells.forEach(cell => {
        cell.classList.remove('x', 'o');
        cell.removeEventListener('click', cellClicked);
    });
    menu.classList.remove('hidden');
    winningMessage.classList.remove('show')
    }

function updateScore(){
    scoreLabel = document.querySelector('.score').innerText = `Current score: ${score}`
    if (userData.achivment.maxTicTacToe < score){
        userData.achivment.maxTicTacToe = score
        localStorage.setItem(`user#${currentUserIndex}`, JSON.stringify(userData))
        if (maxScore.ticTacToe < score){
            maxScore.ticTacToe = score
            localStorage.setItem('maxScore', JSON.stringify(maxScore))
        }
    }
}