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
        this.activePhrase.addPhraseToDisplay();
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
    handleInteraction(e) {
        const keyboard = document.querySelector('#qwerty');

        const hitKey = e.target;
        if(hitKey.tagName === 'BUTTON'){
            hitKey.disabled = true;

            // remove selected from previous key
            const selectedKeyElement = document.querySelector('.selectedKey');
            if (selectedKeyElement) {
            selectedKeyElement.classList.remove('selectedKey');
            }

            // add selected to new key
            hitKey.classList.add('selectedKey');
            const phraseArr = this.activePhrase.phrase.toLowerCase().split('');
            const matched = phraseArr.filter( char => char === hitKey.textContent );

            // if there was no match
            if(matched.length === 0){
                hitKey.classList.add('wrong');
                // console.log(hitKey.classList);
                // console.log('about to call removeLife()');

                this.removeLife();
            // else there was a match
            } else {
                hitKey.classList.add('chosen');
                // console.log(hitKey.classList);
                this.activePhrase.showMatchedLetter();
                if( this.checkForWin() ){ //checkforwin should return bool
                    this.gameOver();
                }
            }
        }
  
    }

    removeLife() {
        // console.log('removeLife() called');
        const liveHearts = document.querySelectorAll('img[src="images/liveHeart.png"]');
        // console.log(liveHearts.length);
        // console.log(liveHearts[0].getAttribute('src'));
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