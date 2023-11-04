/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

// event listeners, enabling user interaction, instantiate Game class

// add click event listener to "Start Game" butt on which creates a new Game object and starts the game by calling startGame()

const startGame = document.querySelector('#btn__reset');
const keyrow = document.querySelector('#qwerty');
let game;

startGame.addEventListener('click', (e) => {
    console.log('startGame click ' + e.target);
    game = new Game(0, phrases, null);
    game.startGame();
});

keyrow.addEventListener('click', (e) => {
    console.log('keyrow click ' + e.target);

    if(e.target.tagName === 'BUTTON'){
        console.log(e.target);
        game.handleInteraction();
    }
})