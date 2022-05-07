import wordsSl from './wordsSL.mjs';
import wordsEng from './wordsENG.mjs';

// Basic constants
const language = detectLanguageSelected();
const wordOutput = document.getElementById("wordOutput");
const letters = document.querySelectorAll(".letter");
const numberDisplay = document.getElementById("number");
const guessesLeft = document.getElementById("guessesLeft");
const img = document.getElementById("image");
const p = document.getElementsByTagName("p")[0];
const canvas = document.getElementById("canvas");
const numberOfLettersAlphabet = numberOfLettersInAlphabet(language);
const word = words(language);

// Setting the random word and displaying the size of the word for the player
var lettersGuessed = 0;
let outputNoSpace = '';
for (let c of word) {
    outputNoSpace += "_";
}
let outputSpace = addSpacesToOutput(outputNoSpace);
wordOutput.innerHTML = outputSpace;

function game() {
    drawGallow();
    let numberOfGuesses = 6;
    for (let i = 0; i < numberOfLettersAlphabet; i++) {
        let char = letters[i];
        char.addEventListener('click', function () {
            for (let j = 0; j < word.length; j++) {
                // if the user has gussed a letter
                if (word[j] == char.innerHTML) {
                    lettersGuessed++;
                    outputNoSpace = outputNoSpace.split('');
                    outputNoSpace[j] = char.innerHTML;
                    outputNoSpace = outputNoSpace.join('');
                }
            }
            wordOutput.innerHTML = addSpacesToOutput(outputNoSpace);
            numberOfGuesses = checkLettersGuessed(numberOfGuesses, char);
            numberDisplay.innerHTML = numberOfGuesses;
            // disable buttons and add reset button
            if (checkForWin(outputNoSpace) || checkForLose(numberOfGuesses)) {
                for (let i = 0; i < numberOfLettersAlphabet; i++) {
                    letters[i].setAttribute('disabled', '');
                }
                if (checkForWin(outputNoSpace)) {
                    let winnerText = document.createElement('p');
                    // add text depending on language
                    if (language == '#eng') {
                        winnerText.appendChild(document.createTextNode('You win!'));
                    } else if (language == "#sl") {
                        winnerText.appendChild(document.createTextNode('Zmagali ste!'));
                    }
                    winnerText.style.fontWeight = 'bold';
                    winnerText.style.fontSize = '50px';
                    canvas.appendChild(winnerText);
                } else if (checkForLose(numberOfGuesses)) {
                    let loserText = document.createElement('p');
                    // add text depending on language
                    if (language == '#eng') {
                        loserText.appendChild(document.createTextNode('You lost!'));
                    } else if (language == "#sl") {
                        loserText.appendChild(document.createTextNode('Zgubili ste!'));
                    }
                    loserText.style.fontWeight = 'bold';
                    loserText.style.fontSize = '50px';
                    canvas.appendChild(loserText);
                }
                let resetBtn = document.createElement('button');
                resetBtn.classList.add("btn");
                resetBtn.classList.add("btn-dark");
                resetBtn.onclick = function () {
                    window.location.reload();
                };
                resetBtn.style.marginBottom = "8px";
                // add text depending on language
                if (language == '#eng') {
                    resetBtn.innerHTML = "Play again";
                }
                else if (language == "#sl") {
                    resetBtn.innerHTML = "Igraj ponovno";
                }
                wordOutput.innerHTML = addSpacesToOutput(word);
                guessesLeft.replaceChild(resetBtn, p);
            }
            drawHuman(numberOfGuesses);
        });
    }
}

function checkLettersGuessed(numberOfGuesses, char) {
    if (lettersGuessed >= 1) {
        // change the color to green and make it disabled
        lettersGuessed = 0;
        char.classList.remove("btn-dark");
        char.classList.add("btn-success");
        char.setAttribute('disabled', '');
    } else if (lettersGuessed == 0) {
        // change the color to red and make it disabled
        lettersGuessed = 0;
        char.classList.remove("btn-dark");
        char.classList.add("btn-danger");
        char.setAttribute('disabled', '');
        numberOfGuesses--;
    }
    return numberOfGuesses;
}

// helpers
function addSpacesToOutput(outputNoSpace) {
    return outputNoSpace.split('').join(' ');
}

function checkForWin(outputNoSpace) {
    return outputNoSpace == word;
}

function checkForLose(numberOfGuesses) {
    return numberOfGuesses == 0;
}

function drawGallow() {
    img.src = '/img/6.svg';
}

function detectLanguageSelected() {
    if (location.hash == "") {
        return "#sl";
    } else {
        return location.hash;
    }
}

function words(language) {
    if (language == "#sl") {
        return wordsSl[Math.floor(Math.random() * wordsSl.length)];
    } else if (language == "#eng") {
        return wordsEng[Math.floor(Math.random() * wordsEng.length)];
    }
}

function numberOfLettersInAlphabet(language) {
    if (language == "") {
        return 25;
    }
    else if (language == '#sl') {
        return 25;
    } else if (language == '#eng') {
        return 26;
    } else {
        throw new Error('Unknown language');
    }
}

function drawHuman(numberOfGuesses) {
    switch (numberOfGuesses) {
        case 6:
            img.src = '/img/6.svg';
            break;
        case 5:
            img.src = '/img/5.svg';
            break;
        case 4:
            img.src = '/img/4.svg';
            break;
        case 3:
            img.src = '/img/3.svg';
            break;
        case 2:
            img.src = '/img/2.svg';
            break;
        case 1:
            img.src = '/img/1.svg';
            break;
        case 0:
            img.src = '/img/0.svg';
            break;
    }
}

window.addEventListener('load', () => {
    game();
});