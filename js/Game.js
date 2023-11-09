/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

let currentPhrase;

// reponsible for managing game's stage, logic, and interactions
class Game {
    constructor(){
        this.missed = 0;
        this.phrases = phrases;
        this.activePhrase = null;
    }

    // called when Start Game button clicked
    startGame() {
        // hide overlay
        document.querySelector('#overlay').style.display = 'none';

        // prevents duplicated phrases from showing by emptying <ul>
        const ul = document.querySelector('ul');
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }

        // populate and display an active phrase
        // do...while ensure previous quote is not displayed again
        do {
            this.activePhrase = this.getRandomPhrase();
        } while (this.activePhrase.phrase === currentPhrase);
        
        this.activePhrase.addPhraseToDisplay();
        currentPhrase = this.activePhrase.phrase;

        // refresh and enable all keys
        const keys = document.querySelectorAll('#qwerty .key');
        for(let i = 0; i < keys.length; i++) {
            keys[i].className = "key";
            keys[i].disabled = false;
        }

        // restore hearts (reversed removeLife)
        const lostHearts = document.querySelectorAll('img[src="images/lostHeart.png"]');
        const liveHeart = "images/liveHeart.png";
        for(let i=0; i<lostHearts.length; i++){
            if (lostHearts[i].src === "file:///Users/seancrooks/Coding/Portfolio-Projects/Team-Treehouse/oop_game-v2/images/lostHeart.png"){
                lostHearts[i].src = liveHeart;
            }
        }

    }

    // get a random phrase from phrases array
    getRandomPhrase() {
        const random = Math.floor(Math.random() * this.phrases.length);
        return this.phrases[random];
    }

    // Handles most game functionality when 'click' event occurs
    handleInteraction(e) {
        const hitKey = e.target;

        // does something only if a BUTTON is clicked
        if(hitKey.tagName === 'BUTTON'){
            // disable selected/clicked key to prevent re-selection
            hitKey.disabled = true;

            // remove .selectedKey from previous key clicked
            const selectedKeyElement = document.querySelector('.selectedKey');
            if (selectedKeyElement) {
            selectedKeyElement.classList.remove('selectedKey');
            }

            // add .selectedKey to new key clicked
            hitKey.classList.add('selectedKey');
            const phraseArr = this.activePhrase.phrase.toLowerCase().split('');
            const matched = phraseArr.filter( char => char === hitKey.textContent );

            // if there was no match, .wrong added and heart removed
            if(matched.length === 0){
                hitKey.classList.add('wrong');
                this.removeLife();

            // else there was a match, show letter, and check if won
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
    // calls gameOver if missed 5 times
    removeLife() {
        const liveHearts = document.querySelectorAll('img[src="images/liveHeart.png"]');
        const lostHeart = "images/lostHeart.png";

        for(let i=0; i<liveHearts.length; i++){
            if (liveHearts[i].src === "file:///Users/seancrooks/Coding/Portfolio-Projects/Team-Treehouse/oop_game-v2/images/liveHeart.png"){
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

    // handles display when player wins or loses, resets display to default settings
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