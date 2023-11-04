/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

// General DOM variable
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
                return html += `<li class="letter">${char}</li>`;
            } else {
                return html += `<li class="space">${char}</li>`;
            }
        });

        ul.insertAdjacentHTML('beforeend', html);
    }

    checkLetter() {
        // do something
    }

    showMatchedLetter() {
        // do something
    }

}



// test area
const p1 = new Phrase('test one');
p1.addPhraseToDisplay();

// const char = '0';
// const regex = /[a-z]/.test(char);
// console.log(regex);