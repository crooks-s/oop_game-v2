/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

// General DOM elements
const ul = document.querySelector('#phrase ul');

// Blueprint for creating phrase objects
class Phrase {
    // @param {string} phrase - actual phrase to be represented
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

    // add letter placeholders to the page by making <li> elements
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
const p1 = new Phrase('Test Crank');
const p2 = new Phrase('Test That');
const p3 = new Phrase('Test YOUUU');
const p4 = new Phrase('Test Soulja');
const p5 = new Phrase('Test Boy');

const phrases = [p1, p2, p3, p4, p5];