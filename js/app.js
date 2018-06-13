const gameBoard = document.getElementById('board');
const body = document.querySelector('body');
const div = document.createElement('div');
const input = document.createElement('input');
const label = document.createElement('label');
const button = document.createElement('a');
const h4 = document.createElement('h4');
const playerBoxes = document.querySelector('ul');
const box = document.getElementsByClassName('box');
const boxParent = document.querySelector('.boxes');


let turns = 0;

const player1 = {
    name: '',
    score: 0, 
    isTurn: true,
    playerChoices: [],
    isComputer: false
};

const player2 = {
    name: '',
    score: 0,
    isTurn: false,
    playerChoices: [],
    isComputer: false
};


const waysToWin = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

// ********* HELPER FUNCTIONS ***********************

// show/hide elements
function showHideEl(element, displayType) {
    element.style.display = displayType;
}


// ********* START SCREEN ***********************
// this function creates star screen
(function() {
    body.appendChild(div).setAttribute('id', 'start');
    const startDiv = document.getElementById('start');
    startDiv.classList.add('screen', 'screen-start');
    startDiv.innerHTML = `
        <header id="startHead">
            <h1>Tic Tac Toe</h1>
            <div class= "flex_div" id= "playerChoice">
                <a href="#" class="button" id="onePlayer">1 Player</a>
                <a href="#" class="button" id="twoPlayer">2 Players</a>
                <input type='text' id='playerOneName' class="input" placeholder='Player One Name'>
                <input type='text' id='playerTwoName' class="input" placeholder='Player Two Name'>
                <a href="#" class="button" id="start_button">Start Game</a>
            </div>
        </header>
    `;
    eventStart(startDiv);
}());
   
    
    
    
//listening for events on start button
function eventStart(div) {
    const choiceContainer = document.getElementById('playerChoice');
    const headerStart = document.getElementById('startHead');
    const startButton = document.getElementById('start_button');
    const playerOneButton = document.getElementById('onePlayer');
    const playerTwoButton = document.getElementById('twoPlayer');
    const playerOneInput = document.getElementById('playerOneName');
    const playerTwoInput = document.getElementById('playerTwoName');
    //initially hiding the start button until needed
    showHideEl(startButton, 'none');
    showHideEl(playerOneInput, 'none');
    showHideEl(playerTwoInput, 'none');
    //listening for click on start game button
    div.addEventListener('click', (e) => {
        const element = e.target;
        if (element.id === 'onePlayer') {
            console.log(element.id);        
            showHideEl(playerOneButton, 'none');
            showHideEl(playerTwoButton, 'none');
            showHideEl(playerOneInput, 'block');
            startButton.removeAttribute('style');
            player2.name = 'Computer';
            player2.isComputer = true;
        }
        if (element.id === 'twoPlayer') {
            showHideEl(playerOneButton, 'none');
            showHideEl(playerTwoButton, 'none');
            showHideEl(playerOneInput, 'block');
            showHideEl(playerTwoInput, 'block');
            startButton.removeAttribute('style');
        }
        if (element.id === 'start_button') {
            player1.name = playerOneInput.value;
            player2.name = playerTwoInput.value;
            div.remove();
            playerBoxes.children[0].innerHTML += player1.name;
            playerBoxes.children[1].innerHTML += player2.name;
            playerBoxes.children[0].classList.add('players-turn', 'active');
        }
    });
}
    

// this function finds whose turn it is and lets player pick a box if it has not been picked
(function(){
    for(let i = 0; i < box.length; i++) { 
        box[i].addEventListener('click', (e) => {
            const isChosen = e.target.hasAttribute('data-chosen');
            if(player1.isTurn === true && !isChosen) {
                e.target.classList.add('box-filled-1');
                e.target.setAttribute('data-chosen', 'true');
                playerBoxes.children[1].classList.add('players-turn', 'active');
                playerBoxes.children[0].classList.remove('players-turn', 'active');
                player1.isTurn = false;
                player2.isTurn = true;
                player1.playerChoices.push(i);
                turns += 1;
                if(checkForWin(player1.playerChoices, waysToWin)) {
                    won(player1.name);
                }
                if(turns === 9 && !checkForWin(player1.playerChoices, waysToWin)) {
                    draw();
                }
                if(player2.isComputer) {
                    computer();
                    turns += 1;
                }
            } else if(player2.isTurn === true && !isChosen && !player2.isComputer) {
                e.target.classList.add('box-filled-2');
                e.target.setAttribute('data-chosen', 'true')
                playerBoxes.children[0].classList.add('players-turn', 'active');
                playerBoxes.children[1].classList.remove('players-turn', 'active');
                player1.isTurn = true;
                player2.isTurn = false;
                player2.playerChoices.push(i);
                turns += 1;
                if(checkForWin(player2.playerChoices, waysToWin)) {
                    won(player2.name);
                }
                if(turns === 9 && !checkForWin(player2.playerChoices, waysToWin)) {
                    draw();
                }    
            }
            
        });
        box[i].addEventListener('mouseover', (e) => {
            const isChosen = e.target.hasAttribute('data-chosen');
            if(player1.isTurn === true && !isChosen ) {
                e.target.style.backgroundImage = 'url("../img/o.svg")';
            } else if(player2.isTurn === true && !isChosen ) {
                e.target.style.backgroundImage = 'url("../img/x.svg")';
            }
        });
        box[i].addEventListener('mouseout', (e) => {
            const isChosen = e.target.hasAttribute('data-chosen');
            if(player1.isTurn === true && !isChosen ) {
                e.target.style.backgroundImage = '';
            } else if(player2.isTurn === true && !isChosen ) {
                e.target.style.backgroundImage = '';
            }
        });
    }
}())


// simple function that compares arrays for like values regardless of order
function compareArray(array1, array2) {
    let compared = [];
    array1.forEach(item1 => {
        array2.forEach(item2 => {
            if(item1 === item2) {
                compared.push(item2);
            }
        })
    })
    return compared.length;
}

//checking to see if player has won by comparing choices to possible win senarios
function checkForWin(playerChoicesNow, possibleWins) {
    for(let i = 0; i < possibleWins.length; i++) {
        if(compareArray(possibleWins[i], playerChoicesNow) >= 3) {
            return true;
            break;
        }
    }
}


//displays who won the game
function won(playerWon) {
    body.appendChild(div).setAttribute('id', 'finish');
    const finishDiv = document.getElementById('finish');
    finishDiv.classList.add('screen', 'screen-win');
    if(playerWon === player1.name) {
        finishDiv.style.backgroundColor = '#FFA000';
    } else {
        finishDiv.style.backgroundColor = '#3688C3';
    }
    finishDiv.innerHTML = `
        <header>
            <h1>Tic Tac Toe</h1>
            <p class="message">${playerWon} wins!!</p>
            <a href="#" class="button" id="reset">New game</a>
        </header>
    `;
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', (e) => {
        location.reload();
    })
};

//shows draw screen if nobody wins
function draw() {
    body.appendChild(div).setAttribute('id', 'finish');
    const finishDiv = document.getElementById('finish');
    finishDiv.classList.add('screen', 'screen-win');
    finishDiv.innerHTML = `
        <header>
            <h1>Tic Tac Toe</h1>
            <p class="message">It's a draw. Boo!</p>
            <a href="#" class="button" id="reset">New game</a>
        </header>
    `;
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', (e) => {
        location.reload();
    })
}

//function that returns a random number
function random() {
    const randomNum = Math.floor(Math.random() * 10) -1;
    return randomNum;
}


// This dictates the computer play
function computer() {
    let compChoice = random();
    let checkGood = false;
    for (let i=0; i < box.length; i++){
        const isChosen = box[i].hasAttribute('data-chosen');
        if (i === compChoice && !isChosen ) {
            box[i].setAttribute('data-chosen', 'true');
            box[i].classList.add('box-filled-2');
            checkGood = true;
            break;
        } 
    }
    
    if (checkGood) {
        playerBoxes.children[0].classList.add('players-turn', 'active');
        playerBoxes.children[1].classList.remove('players-turn', 'active');
        player1.isTurn = true;
        player2.isTurn = false;
        player2.playerChoices.push(compChoice);
        if(checkForWin(player2.playerChoices, waysToWin)) {
            won(player2.name);
        }
        if(turns === 9 && !checkForWin(player2.playerChoices, waysToWin)) {
            draw();
        }    
    } else {
        computer();
    }
}