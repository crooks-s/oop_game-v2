/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

const startGame = document.querySelector('#btn__reset');
const keyrow = document.querySelector('#qwerty');
let game;

// New Game object created and game starts
startGame.addEventListener('click', () => {
    game = new Game();
    game.startGame();
});

// Handles click events on webpage's display-keyboard
keyrow.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON') {
        game.handleInteraction(e);
    }
});

// Allow player to use physical keyboard in game
// Sets pressedKeys back to empty object per game
document.addEventListener('keyup', (e) => {
    const regex = /^[a-z]$/.test(e.key);
    if (regex && !game.pressedKeys[e.key]) {
        game.handleInteraction(e);
    } else {
        e.preventDefault();
        document.querySelector('#container').style.backgroundColor = '#f5785f';
        document.querySelector('#ingame-message').textContent = 'Please choose a valid letter';
    }
});