/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

// General DOM elements


// reponsible for managing game's stage, logic, and interactions
class Game {

    /***
     * @param {} missed: tracks num of missed guesses, inital value 0
     * @param {} phrases: array of five phrase objects to use within game. phrases will contain ONLY letters and spaces
     * @param {} activePhrase: current phrase object in play, initial value NULL. in startGame(), this prop will be set to the phrase obj returned from a call to the getRandomPhrase()
     */

    constructor(missed = 0, phrases, activePhrase = null){
        this.missed = missed;
        this.phrases = phrases;
        this.activePhrase = activePhrase;
    }

    // METHODS ------------

    startGame() {
        // do something
    }

    getRandomPhrase() {
        // do something
    }

    handleInteraction() {
        // do something
    }

    removeLife() {
        // do something
    }

    checkForWin() {
        // do something
    }

    gameOver() {
        // do something
    }
}