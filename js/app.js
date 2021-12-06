let wordArray = [
    "chat", "plante", "course", "deodorant", "piste", "ski", "neige", "trier", "prendre", "volet", "boxe", "musique",
    "cheval", "dauphins", "magasin", "dominant", "ordinateur", "horloge", "bouteille", "trousse", "gobelet", "casque",
    "stylo", "clavier", "souris", "piste", "luge", "tableau", "rideau", "tabouret", "personne", "gourde"
];
let wrongPlayedLetterArray = [];
let goodPlayedLetterArray = [];
const wordLetter = document.getElementById("word");
const board =  document.getElementsByClassName("letterPlay");
const endGame = document.getElementById("endGame");
const playedLetter =  document.getElementById("playedLetter");
const numberChance = document.getElementById("numberChance");
const replay = document.getElementById("replay");
let currentWord;
let goodLetter = 0;
let wrongLetter = 1;

//word random
function random (array) {
    currentWord = array[Math.floor(Math.random() * array.length)];
    return currentWord;
}

//create div for each letter and create id position letter
function drawWord (word) {
    for (let letterIndex in word) {
        const div = document.createElement("div");
        div.classList = "letter";
        div.id = letterIndex;
        wordLetter.appendChild(div);
    }
}
drawWord(random(wordArray));

//create eventListener for letterBoard
for (let playerLetter of board) {
    playerLetter.addEventListener("click" ,function () {
        checkWin(playerLetter);
        checkLoose(playerLetter);
        playedLetter.innerHTML = "Lettre déjà jouées : " + wrongPlayedLetterArray.join(" ") + " " + goodPlayedLetterArray.join(" ");
    })
}

function checkWin (letter) {
    if (!goodPlayedLetterArray.includes(letter.innerHTML) && !wrongPlayedLetterArray.includes(letter.innerHTML)) {
        for (let letterIndex in currentWord) {//loop on eachLetter of the currentWord
            if (letter.innerHTML === currentWord[letterIndex].toUpperCase()) {//is the letter in the word
                const letter = document.getElementById(letterIndex.toString());
                letter.innerHTML = currentWord[letterIndex].toUpperCase();
                goodLetter++;
                if (!goodPlayedLetterArray.includes(letter.innerHTML)) {
                    goodPlayedLetterArray.push(letter.innerHTML);
                }
                if (goodLetter === currentWord.length) {
                    endGame.innerHTML = "Vous avez gagné ! ";
                    replay.style.display = "inline";
                }
            }
        }
    }
}
function checkLoose(letter) {
    if (!goodPlayedLetterArray.includes(letter.innerHTML) && !wrongPlayedLetterArray.includes(letter.innerHTML)) {
        wrongPlayedLetterArray.push(letter.innerHTML);
        wrongLetter++;
        numberChance.src = "/img/" + wrongLetter.toString() + ".jpg" ;
    }
    if (wrongLetter === 8) {
        endGame.innerHTML = "Vous avez perdu ! Le mot était " + currentWord;
        replay.style.display = "inline";
    }
}

replay.addEventListener("click", function () {
    wordLetter.innerHTML = "";
    goodLetter = 0;
    wrongLetter = 1;
    endGame.innerHTML ="";
    wrongPlayedLetterArray = [];
    goodPlayedLetterArray = [];
    numberChance.src = "/img/" + wrongLetter.toString() + ".jpg";
    playedLetter.innerHTML ="";
    replay.style.display = "none";
    drawWord(random(wordArray));
})