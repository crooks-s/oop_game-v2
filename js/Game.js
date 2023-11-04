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

    // hide overlay, set active phrase to random phrase, display the phrase
    startGame() {
        document.querySelector('#overlay').style.display = 'none';
        this.activePhrase = this.getRandomPhrase();
        addPhraseToDisplay(this.activePhrase);
    }

    getRandomPhrase() {
        const random = Math.floor(Math.random() * 5);
        return phrases[random];
    }

    // checks if button clicked matches aletter in the phrase
    // directs the game based on if correct or incorrect guess
    // disable the selected letter
    // if phrase DOES NOT include the guessed letter, add .wrong to selected .key button and call removeLife()
    // if phrase DOES include the guessed letter, add .chosen to selected .key button, call showMatchedLetter(), call checkForWin()
        // if player won, call gameOver()
    handleInteraction() {
        const keyboard = document.querySelector('#qwerty');

        keyboard.addEventListener('click', (e) => {
            const hitKey = e.target;
            hitKey.disabled = true;
            const phrase = this.activePhrase.toLowerCase().split('');
            const matched = phrase.filter( char => char === hitKey.textContent );

            // if there was no match
            if(matched.length === 0){
                hitKey.classList.add('wrong');
                this.removeLife();
            // else there was a match
            } else {
                hitKey.classList.add('chosen');
                showMatchedLetter(); // step 2 saying to call this ON the phrase??
                if( this.checkForWin() ){ //checkforwin should return bool
                    this.gameOver();
                }
            }
        });
    }

    removeLife() {
        const liveHearts = document.querySelectorAll('img[src="images/liveHeart.png"]');
        const lostHeart = "images/lostHeart.png";

        for(let i=0; i<liveHearts.length; i++){
            if (liveHearts[i].src === "images/liveHeart.png"){
                liveHearts[i].src = lostHeart;
                break;
            }
        }

        this.missed += 1;

        if (this.missed === 5) {
            this.gameOver();
        }
    }

    checkForWin() {
        return document.querySelectorAll('letter').length +
            document.querySelectorAll('space').length === 
            this.activePhrase.length; //class=show .length
        // document.querySelectorAll('.hide') === 0 --> can't do this because space class will always be hide 
    }

    gameOver() {
        const overlay = document.querySelector('#overlay')
        overlay.style.display = 'block';
        if(this.checkForWin()){
            overlay.querySelector('#game-over-message') = `Youuuu win!`;
            document.querySelector('#start').className = 'win';
        } else {
            overlay.querySelector('#game-over-message') = `Maybe next time cowboy...`;
            document.querySelector('#start').className = 'lose';
        }
    }

}