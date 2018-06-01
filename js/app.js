const gameBoard = document.getElementById('board');
const body = document.querySelector('body');
const div = document.createElement('div');
const input = document.createElement('input');
const label = document.createElement('label');
const button = document.createElement('a');
const player1 = {
    name: '',
    score: 0, 
    turn: false
};

const player2 = {
    name: '',
    score: 0,
    turn: true
};


// ********* HELPER FUNCTIONS ***********************
// this function sets as many attributes one needs on an element
function setAttributes(elem) {
    for (var i = 1; i < arguments.length; i+=2) {
        elem.setAttribute(arguments[i], arguments[i+1]);
    }
}

// show/hide element
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
            player2.name = 'computer'
        }
        if (element.id === 'twoPlayer') {
            showHideEl(playerOneButton, 'none');
            showHideEl(playerTwoButton, 'none');
            showHideEl(playerOneInput, 'block');
            showHideEl(playerTwoInput, 'block');
            startButton.removeAttribute('style');
        }
        if (element.id === 'start_button') {
            console.log(playerOneInput.value.length);
            if(playerOneInput.value.length > 0 && player2.name === 'computer') {
                player1.name = playerOneInput.value;
                startDiv.remove();
            }
        }
    });
}())