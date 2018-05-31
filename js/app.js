const gameBoard = document.getElementById('board');
const body = document.querySelector('body');
const div = document.createElement('div');
const input = document.createElement('input');
const label = document.createElement('label');
const button = document.createElement('a');
const player1 = {
    name: '',
    score: 0 
};

const player2 = {
    name: '',
    score: 0 
};


// ********* HELPER FUNCTIONS ***********************
// this function sets as many attributes one needs on an element
function setAttributes(elem) {
    for (var i = 1; i < arguments.length; i+=2) {
        elem.setAttribute(arguments[i], arguments[i+1]);
    }
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
            </div>
        </header>
    `;

    const choiceContainer = document.getElementById('playerChoice');
    const headerStart = document.getElementById('startHead');

    //listening for click on start game button
    startDiv.addEventListener('click', (e) => {
        const element = e.target;
        if (element.id === 'onePlayer') {
            choiceContainer.innerHTML = '';
            choiceContainer.appendChild(input);
            choiceContainer.appendChild(button).setAttribute('class', 'button');
            setAttributes(input,
                'type', 'text', 
                'placeholder', 'Player Name',
                'id', 'playerOneName',
                'class', 'input'
            );
            choiceContainer.classList.remove('flex_div');
            choiceContainer.classList.add('info_div');
        }
    });
}())