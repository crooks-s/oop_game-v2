/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

let currentPhrase;

// Reponsible for managing game's stage, logic, and interactions
class Game {

    /**
     * @property {integer}      this.missed          - tracks players' incorrect number of guesses
     * @property {array}        this.phrases         - list of phrases the game may use
     * @property {string}       this.activePhrase    - the phrase that will be used in-game
     * @property {object}       this.pressedKeys     - keeps track of keys clicked or pressed       
     */
    constructor(){
        this.missed = 0;
        this.phrases = phrases;
        this.activePhrase = null;
        this.pressedKeys = {};
    }

    // Called when 'Start Game' button clicked
    startGame() {
        // Hide overlay
        document.querySelector('#overlay').style.display = 'none';

        // Prevents duplicated phrases from showing by emptying <ul>
        const ul = document.querySelector('ul');
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }

        // Populate and display an active phrase
        // Do...while loop ensures same quote is not displayed again
        do {
            this.activePhrase = this.getRandomPhrase();
        } while (this.activePhrase.phrase === currentPhrase);
        this.activePhrase.addPhraseToDisplay();
        currentPhrase = this.activePhrase.phrase;

        // Refresh and enable all keys
        const keys = document.querySelectorAll('#qwerty .key');
        for(const key of keys) {
            key.className = "key";
            key.disabled = false;
        };

        // Restore hearts (reversed removeLife)
        const lostHearts = document.querySelectorAll('img[src="images/lostHeart.png"]');
        const liveHeart = "images/liveHeart.png";
        for (const heart of lostHearts){
                heart.src = liveHeart;
        };

        // Reset ingame message to default
        document.querySelector('#container').style.backgroundColor = 'lightblue';
        document.querySelector('#ingame-message').textContent = 'Guess the phrase! Good luck!';

    }

    // Get a random phrase from phrases array
    getRandomPhrase() {
        const random = Math.floor(Math.random() * this.phrases.length);
        return this.phrases[random];
    }

    // Handles most game functionality when an event occurs
    handleInteraction(e) {
        let hitKey;

        // Handles when players clicks a key on displayed keyboard
        if(e.type === 'click') {
            hitKey = e.target;
            game.pressedKeys[hitKey.textContent] = true;

        // Handles when players presses a key on physical keyboard
        } else if (e.type === 'keyup') {
            game.pressedKeys[e.key] = true;
            const keys = document.querySelectorAll('.key');
            for(const key of keys) {
                if (key.textContent === e.key) {
                    hitKey = key;
                }
            }
            
        }
  
        // Disable selected/clicked key to prevent re-selection
        hitKey.disabled = true;

        // Remove .selectedKey from previous key clicked
        const selectedKeyElement = document.querySelector('.selectedKey');
        if (selectedKeyElement) {
        selectedKeyElement.classList.remove('selectedKey');
        }

        // Add .selectedKey to new key clicked
        hitKey.classList.add('selectedKey');
        const phraseArr = this.activePhrase.phrase.toLowerCase().split('');
        const matched = phraseArr.filter( char => char === hitKey.textContent );

        // If there was no match, .wrong added and heart removed...
        if(matched.length === 0) {
            hitKey.classList.add('wrong');
            this.removeLife()

        // else there was a match, show letter, and check if won
        } else {
            hitKey.classList.add('chosen');
            this.activePhrase.showMatchedLetter();

            // Add message to give player when guessed correct
            document.querySelector('#container').style.backgroundColor = '#78CF82';
            document.querySelector('#ingame-message').textContent = 'You got it right!';

            if( this.checkForWin() ){
                this.gameOver();
            }
        }
  
    }

    // Replaces life heart with lost heart, and increments missed property
    // Calls gameOver if missed 5 times
    removeLife() {

        const liveHearts = document.querySelectorAll('img[src="images/liveHeart.png"]');
        const lostHeart = "images/lostHeart.png";
        for(const heart of liveHearts){
                heart.src = lostHeart;
                break;
        }

        // Display message when heart lost
        document.querySelector('#container').style.backgroundColor = '#f5785f';
        document.querySelector('#ingame-message').textContent = 'Sorry, try again...';

        this.missed += 1;
        if (this.missed === 5) {
            this.gameOver();
        }
    }

    // If no more hidden letters, then player won
    checkForWin() {
        const lis = document.querySelectorAll('#phrase li');
        let won = true;
        
        for(let i = 0; i<lis.length; i++){
            const li = lis[i].classList;
            if( li.contains('letter') && li.contains('hide') ){
                won = false;
            }
        }

        return won; 
    }

    // Handles display when player wins or loses, resets display to default settings
    gameOver() {
        const overlay = document.querySelector('#overlay')
        overlay.style.display = 'block';

        if(this.checkForWin()){
            overlay.querySelector('#game-over-message').textContent = `Got 'em! See you, space cowboy...`;
            overlay.querySelector('h1').className = 'win';
        } else {
            overlay.querySelector('#game-over-message').textContent = `Maybe next time, space cowboy...`;
            overlay.querySelector('h1').className = 'lose';
        }
    }

}