const gameBoard = document.getElementById('board');
const body = document.querySelector('body');
const div = document.createElement('div');
const input = document.createElement('input');
const label = document.createElement('label');
const button = document.createElement('a');
const h4 = document.createElement('h4');
const playerBoxes = document.querySelector('ul');
const box = document.getElementsByClassName('box');

const player1 = {
    name: '',
    score: 0, 
    turn: false,
    boxSelections: []
};

const player2 = {
    name: '',
    score: 0,
    turn: true,
    boxSelections: []
};


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

// controlling start screen 
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
    
function playerFirst() {
    if(randomPlayer() === 1) {
        playerBoxes.children[0].classList.add('players-turn', 'active');
        player1.isTurn = true;
        player2.isTurn = false;
    } else {
        playerBoxes.children[1].classList.add('players-turn', 'active');
        player1.isTurn = false;
        player2.isTurn = true;
    }
}

(function(){
    for(let i = 0; i < box.length; i++) {
        box[i].addEventListener('click', (e) => {
            if(player1.turn === true) {
                e.target.classList.add('box-filled-1');
            } 
            if(player2.turn === true) {
                e.target.classList.add('box-filled-2');
            }
        })
    }
}())

