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

const player1 = {
    name: '',
    score: 0, 
    isTurn: false,
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


const waysToWin = {
    0 : [0,1,2],
    1 : [3,4,5],
    2 : [6,7,8],
    3 : [0,3,6],
    4 : [1,4,7],
    5 : [2,5,8],
    6 : [0,4,8],
    7 : [2,4,6]
}

// ********* HELPER FUNCTIONS ***********************
// this function sets as many attributes one needs on an element
function setAttributes(elem) {
    for (var i = 1; i < arguments.length; i+=2) {
        elem.setAttribute(arguments[i], arguments[i+1]);
    }
}

// show/hide elements
function showHideEl(el, displayType) {
    el.style.display = displayType;
}

// controlling start screen and end screen
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
    startDiv.addEventListener('click', (e) => {
        const element = e.target;
        if (element.id === 'onePlayer') {
            showHideEl(playerOneButton, 'none');
            showHideEl(playerTwoButton, 'none');
            showHideEl(playerOneInput, 'block');
            startButton.removeAttribute('style');
            player2.name = 'Computer'
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
            if(playerOneInput.value.length > 0 && player2.name === 'Computer') {
                player1.name = playerOneInput.value;
                startDiv.remove();
            }
            if(playerOneInput.value.length > 0 && playerTwoInput.value.length > 0){
                player1.name = playerOneInput.value;
                player2.name = playerTwoInput.value;
                startDiv.remove();

            }
            playerBoxes.children[0].innerHTML += player1.name;
            playerBoxes.children[1].innerHTML += player2.name;
            playerFirst();
        }
    });
}())

// function for picking a random number between 1 and 2. Using this for who goes first.
function randomPlayer() {
    const whosTurn = Math.floor((Math.random() * 2) + 1 );
    return whosTurn;
}

// this function assigns the random number, picking who the first player will be
function playerFirst() {
    if(randomPlayer() === 1) {
        playerBoxes.children[0].classList.add('players-turn', 'active');
        player1.isTurn = true;
        player2.isTurn = false;
    } else {
        playerBoxes.children[1].classList.add('players-turn', 'active');
        player1.isTurn = false;
        player2.isTurn = true;
        if(player2.isComputer){
            computer();
        }
    }
}

// this function finds whose turn it is and lets player pick a box if it has not been picked
(function(){
    let turns = 0;
    for(let i = 0; i < box.length; i++) { 
        box[i].addEventListener('click', (e) => {
            const isChosen = e.target.hasAttribute('data-chosen');
            if(player1.isTurn === true && !isChosen) {
                e.target.classList.add('box-filled-1');
                e.target.setAttribute('data-chosen', 'true')
                playerBoxes.children[1].classList.add('players-turn', 'active');
                playerBoxes.children[0].classList.remove('players-turn', 'active');
                player1.isTurn = false;
                player2.isTurn = true;
                player1.playerChoices.push(i);
                turns += 1;
                if(compareArray(player1.playerChoices, waysToWin)) {
                    won(player1.name);
                }
                if(player2.isComputer && turns < 9 && !isChosen) {
                    computer();
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
                if(compareArray(player2.playerChoices, waysToWin)) {
                    won(player2.name);
                }    
            }
            
        });
        box[i].addEventListener('mouseover', (e) => {
            const isChosen = e.target.hasAttribute('data-chosen');
            if(player1.isTurn === true && !isChosen ) {
                e.target.classList.add('box-filled-1');
            } else if(player2.isTurn === true && !isChosen ) {
                e.target.classList.add('box-filled-2');
            }
        });
        box[i].addEventListener('mouseout', (e) => {
            const isChosen = e.target.hasAttribute('data-chosen');
            if(player1.isTurn === true && !isChosen ) {
                e.target.classList.remove('box-filled-1');
            } else if(player2.isTurn === true && !isChosen ) {
                e.target.classList.remove('box-filled-2');
            }
        });
    }
}())


//checking to see if player has won by comparing choices to possible win senarios
function compareArray(array1, obj) {
    const playersPicks = array1.sort().toString();
    for (const possible in obj) {
        ways = obj[possible].sort().toString();
        if (ways === playersPicks) {
            return true;
        } 
    }
}

//displays who won the game
function won(playerWon) {
    body.appendChild(div).setAttribute('id', 'finish');
    const finishDiv = document.getElementById('finish');
    finishDiv.classList.add('screen', 'screen-win');
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

// This dictates the computer play
function computer() {
    const compChoice = Math.floor(Math.random() * 10) -1;
    
    for (let i=0; i < box.length; i++){
        const isChosen = box[i].hasAttribute('data-chosen');
        if (i === compChoice && !isChosen ) {
            box[i].setAttribute('data-chosen', 'true')
            box[i].classList.add('box-filled-2');
        } 
    }
    playerBoxes.children[0].classList.add('players-turn', 'active');
    playerBoxes.children[1].classList.remove('players-turn', 'active');
    player1.isTurn = true;
    player2.isTurn = false;
    player2.playerChoices.push(compChoice);
    if(compareArray(player2.playerChoices, waysToWin)) {
        won(player2.name);
    }
    console.log(compChoice);
}