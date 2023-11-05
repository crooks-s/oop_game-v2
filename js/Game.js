/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

// General DOM elements


// reponsible for managing game's stage, logic, and interactions
class Game {

    /***
     * @param {integer} missed: tracks num of missed guesses, inital value 0
     * @param {array} phrases: array of five phrase objects to use within game. phrases will contain ONLY letters and spaces
     * @param {string} activePhrase: current phrase object in play, initial value NULL. in startGame(), this prop will be set to the phrase obj returned from a call to the getRandomPhrase()
     */

    constructor(missed = 0, phrases, activePhrase = null){
        this.missed = missed;
        this.phrases = phrases;
        this.activePhrase = activePhrase;
    }

    // METHODS ------------

    // called when Start Game button clicked
    startGame() {
        // hide overlay
        document.querySelector('#overlay').style.display = 'none';

        // clear the display for the new phrase (if player resetting a game) to be added
        const ul = document.querySelector('ul');
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }

        // get and display a phrase
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();

        // refresh and enable all keys
        const keys = document.querySelectorAll('#qwerty .key');
        for(let i = 0; i < keys.length; i++) {
            keys[i].className = "key";
            keys[i].disabled = false;
        }

        // restore hearts (reversed removeLife())
        const lostHearts = document.querySelectorAll('img[src="images/lostHeart.png"]');
        const liveHeart = "images/liveHeart.png";
        for(let i=0; i<lostHearts.length; i++){
            if (lostHearts[i].src === "file:///Users/seancrooks/Coding/Portfolio-Projects/Team%20Treehouse/oop_game-v2/images/lostHeart.png"){
                lostHearts[i].src = liveHeart;
            }
        }

    }

    // get a random phrase from phrases array
    getRandomPhrase() {
        const random = Math.floor(Math.random() * 5);
        return phrases[random];
    }

    // Handles most game functionality when 'click' event occurs
    handleInteraction(e) {
        const hitKey = e.target;

        // does something only if a BUTTON is clicked
        if(hitKey.tagName === 'BUTTON'){
            // disable the selected key to prevent re-selection
            hitKey.disabled = true;

            // remove .selectedKey from previous key selected
            const selectedKeyElement = document.querySelector('.selectedKey');
            if (selectedKeyElement) {
            selectedKeyElement.classList.remove('selectedKey');
            }

            // add .selectedKey to new key selected
            hitKey.classList.add('selectedKey');
            const phraseArr = this.activePhrase.phrase.toLowerCase().split('');
            const matched = phraseArr.filter( char => char === hitKey.textContent );

            // if there was no match, .wrong added and heart removed
            if(matched.length === 0){
                hitKey.classList.add('wrong');
                this.removeLife();

            // else there was a match
            } else {
                hitKey.classList.add('chosen');
                this.activePhrase.showMatchedLetter();
                if( this.checkForWin() ){
                    this.gameOver();
                }
            }
        }
  
    }

    // replaces life heart with lost heart, and increments missed property
    // also calls gameOver if missed 5 times
    removeLife() {
        const liveHearts = document.querySelectorAll('img[src="images/liveHeart.png"]');
        const lostHeart = "images/lostHeart.png";

        for(let i=0; i<liveHearts.length; i++){
            if (liveHearts[i].src === "file:///Users/seancrooks/Coding/Portfolio-Projects/Team%20Treehouse/oop_game-v2/images/liveHeart.png"){
                liveHearts[i].src = lostHeart;
                break;
            }
        }

        this.missed += 1;

        if (this.missed === 5) {
            this.gameOver();
        }
    }

    // if no more hidden letters, then player won
    checkForWin() {
        const lis = document.querySelectorAll('#phrase li');
        let won = true;
        
        for(let i = 0; i<lis.length; i++){
            const li = lis[i].classList;
            // if any letter is still hidden, then won is false
            if( li.contains('letter') && li.contains('hide') ){
                won = false;
            }
        }

        return won; 
    }

    // handles if player wins or loses, resets display to default settings
    gameOver() {
        const overlay = document.querySelector('#overlay')
        overlay.style.display = 'block';
        if(this.checkForWin()){
            overlay.querySelector('#game-over-message').textContent = `Youuuu win!`;
            overlay.querySelector('h1').className = 'win';
        } else {
            overlay.querySelector('#game-over-message').textContent = `Maybe next time cowboy...`;
            overlay.querySelector('h1').className = 'lose';
        }
    }

}