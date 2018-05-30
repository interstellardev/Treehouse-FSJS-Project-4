const gameBoard = document.getElementById('board');
const body = document.querySelector('body');
const div = document.createElement('div');


// controlling start screen 
(function() {
    body.appendChild(div).setAttribute('id', 'start');
    const startDiv = document.getElementById('start');
    startDiv.classList.add('screen', 'screen-start');
    startDiv.innerHTML = `
        <header>
            <h1>Tic Tac Toe</h1>
            <a href="#" class="button">Start game</a>
        </header>
    `;
    const startButton = document.querySelector('.button');
    //listening for click on start game button
    startDiv.addEventListener('click', (e) => {
        const element = e.target;
        if(element.tagName === 'A') {
            startDiv.remove();
        }
    });
}())