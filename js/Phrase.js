/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

// General DOM elements
const ul = document.querySelector('#phrase ul');

// Blueprint for creating phrase objects
class Phrase {
    // Create a phrase----------------
    // @param {string} phrase: actual phrase to be represented
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

    /*** METHODS --------------
     * Each letter is presented by an empty box -- one <li> per letter
     * Player guesses correct letter: <li> .hide to .show
     * 
     */

    // add letter placeholders to the page
    // render HTML to do this -- see example_phrase_html.txt
    // ul insert beforeend the li of phraseArr[i]. or use forEach
    addPhraseToDisplay() {
        const phraseArr = this.phrase.split('');
        let html = '';
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

    // used to check if a hidden letter matches player's choice
    checkLetter(letter) {
        const phraseArr = this.phrase.split('');
        let matching = phraseArr.filter( char => char === letter);
        return matching.length > 0;
}

    // show letter(s) that match player selection
    showMatchedLetter() {
        const charKey = document.querySelector('.selectedKey').textContent;
        const isMatch = this.checkLetter(charKey);

        if(isMatch) {
            // returns node list, so iterate through it and change class hide/show
            document.querySelectorAll(`.${charKey}`).forEach( li => {
                li.classList.remove('hide');
                li.classList.add('show');
            });
        } 
    }

}



// test area
const p1 = new Phrase('Test Crank');
const p2 = new Phrase('Test That');
const p3 = new Phrase('Test YOUUU');
const p4 = new Phrase('Test Soulja');
const p5 = new Phrase('Test Boy');

const phrases = [p1, p2, p3, p4, p5];