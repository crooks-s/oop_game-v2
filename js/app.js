/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

const startGame = document.querySelector('#btn__reset');
const keyrow = document.querySelector('#qwerty');
let game;

// New Game object created and game starts
startGame.addEventListener('click', () => {
    game = new Game(0, phrases, null);
    game.startGame();
});

// Handles click events on webpage display keyboard
keyrow.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON'){
        game.handleInteraction(e);
    }
})