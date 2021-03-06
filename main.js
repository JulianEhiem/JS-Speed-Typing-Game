window.addEventListener("load", init);

//Globals

//Available levels

const levels = {
  easy: 5,
  medium: 3,
  hard: 2,
};

//To change level
const currentLevel = levels.easy;

let time = currentLevel;
let score = 0;
let isPlaying;

//DOM Elements
const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");
const seconds = document.querySelector("#seconds");
const changeLevel = document.querySelector("#changeLevel");
const levelDiv = document.querySelector("#levelDiv");
const easyLevelRadio = document.querySelector("#easyLevelRadio");
const mediumLevelRadio = document.querySelector("#mediumLevelRadio");
const hardLevelRadio = document.querySelector("#hardLevelRadio");

const words = [
  "this",
  "function",
  "if",
  "var",
  "return",
  "the",
  "i",
  "a",
  "to",
  "value",
  "else",
  "for",
  "true",
  "length",
  "data",
  "false",
  "name",
  "null",
  "options",
  "is",
  "type",
  "of",
  "param",
  "in",
  "new",
  "element",
  "s",
  "e",
  "event",
  "and",
  "object",
  "prototype",
  "x",
  "jQuery",
  "that",
  "t",
  "key",
  "id",
  "The",
  "string",
  "self",
  "elem",
  "node",
  "let",
  "const",
  "var",
  "document",
  "query",
  "console",
  "console.log",
  "querySelector",
  "querySelectorAll",
  "array",
  "length",
];

//Initailize Game

function init() {
  //show number of seconds in UI
  seconds.innerHTML = currentLevel;
  //Load word from array
  showWord(words);
  //Start matching on word Input
  wordInput.addEventListener("input", startMatch);
  //Call countdown every second
  setInterval(countdown, 1000);
  //Check game status
  setInterval(checkStatus, 50);
}

//Start match

function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    wordInput.value = "";
    score++;
  }
  if (score >= 0) {
    scoreDisplay.innerHTML = score;
  } else {
    scoreDisplay.innerHTML = 0;
  }
}

//Match Currentword to wordInput

function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = "Correct!!!";

    return true;
  } else {
    message.innerHTML = "";
    return false;
  }
}

// Filtering Words list to reflect difficulty chosen

const shortWordTest = (minLength) => (x) => x.length <= minLength;
const mediumWordTest = (minLength) => (x) => 5 < x.length <= minLength;
const longWordTest = (minLength) => (x) => x.length > minLength;

const isShort = shortWordTest(5);
const isMedium = mediumWordTest(10);
const isLong = longWordTest(10);

const shortWords = words.filter(isShort);
const mediumWords = words.filter(isMedium);
const longWords = words.filter(isLong);

//Pick & show random word from designated list

function showWord() {
  if ((easyLevelRadio.selected = true)) {
    //generate random array index
    const randIndex = Math.floor(Math.random() * shortWords.length);
    //output random word
    currentWord.innerHTML = shortWords[randIndex];
  } else if ((mediumLevelRadio.selected = true)) {
    const randIndex = Math.floor(Math.random() * mediumWords.length);
    currentWord.innerHTML = mediumWords[randIndex];
  } else if ((hardLevelRadio.selected = true)) {
    const randIndex = Math.floor(Math.random() * longWords.length);
    currentWord.innerHTML = longWords[randIndex];
  }
}

//Countdown timer
function countdown() {
  // Make sure time in not run out

  if (time > 0) {
    //Decrease time
    time--;
  } else if (time === 0) {
    // Game is over
    isPlaying = false;
  }

  //Showtime
  timeDisplay.innerHTML = time;
}

//Check game status
function checkStatus() {
  if (!isPlaying && time === 0) {
    message.innerHTML = "Game Over!!!";
    score = -1;
  }
}

// Change game Level

changeLevel.addEventListener("click", levelChange);

function levelChange() {
  if (levelDiv.style.display === "none") {
    levelDiv.style.display = "block";
  } else {
    levelDiv.style.display = "none";
  }
}

let easyLevel = () => {};
let hardLevel = () => {};
let mediumLevel = () => {};
