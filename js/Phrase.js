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

    // check if (.letter textContent) matches player choice (.key textContent)
    // returns bool
    checkLetter() {
        return document.querySelectorAll('.letter').textContent ===
                document.querySelectorAll('.key').textContent
    }

    // show letter(s) that match player selection
    showMatchedLetter() {
        const matched = checkLetter();
        const char = document.querySelectorAll('.key').textContent;
        if(matched) {
            // returns node list, so iterate through it and change class hide/show
            document.querySelectorAll(`.${char}`).forEach( li => {
                li.classList.remove('hide');
                li.classList.add('show');
            });
        }
    }

}



// test area
// const p1 = new Phrase('test one');
// p1.addPhraseToDisplay();

// const char = '0';
// const regex = /[a-z]/.test(char);
// console.log(regex);