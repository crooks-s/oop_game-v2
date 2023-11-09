/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */


// Blueprint for creating phrase objects and methods
class Phrase {
    // @param {string} phrase - actual phrase to be represented
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

    // add letter placeholders to display by making one li per char
    addPhraseToDisplay() {
        const phraseArr = this.phrase.split('');
        let html = '';

        // create a new <li> for each char in phrase
        phraseArr.forEach( char => {
            const regex = /[a-z]/.test(char);
            if(regex){
                return html += `<li class="hide letter ${char}">${char}</li>`;
            } else {
                return html += `<li class="hide space ${char}">${char}</li>`;
            }
        });

        const ul = document.querySelector('#phrase ul');
        ul.insertAdjacentHTML('beforeend', html);
    }

    // checks if a hidden letter matches player's choice
    checkLetter(letter) {
        const phraseArr = this.phrase.split('');
        let matching = phraseArr.filter( char => char === letter);
        return matching.length > 0;
}

    // show letter(s) that match player selection
    showMatchedLetter() {
        const charKey = document.querySelector('.selectedKey').textContent;
        const isMatch = this.checkLetter(charKey);

        // if match found, show all matched char values
        if(isMatch) {
            document.querySelectorAll(`.${charKey}`).forEach( li => {
                li.classList.remove('hide');
                li.classList.add('show');
            });
        } 
    }

}

// Initialize 5 phrase objects to be used in game
const p1 = new Phrase('There is no place like home');
const p2 = new Phrase('Why so serious');
const p3 = new Phrase('May the force be with you');
const p4 = new Phrase('I am the captain now');
const p5 = new Phrase('Look at little goblin junior');

const phrases = [p1, p2, p3, p4, p5];