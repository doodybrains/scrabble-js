import {spaces} from './spaces'
import {tiles} from './tiles'
import {tileSpaces} from './tile-spaces'

let leftOverTiles = Letters();
let word = [];
let currentShelf = [];

function Board() {
  const playWord = document.getElementById('play-word');
  const board = document.getElementById('board');
  const currentPlayer = document.getElementById('current-player');

  const boardSpaces = spaces.map((sp,i) => {
    return (
      `<div class='space ${sp.type}'>${sp.type}</div>`
    );
  })

  playWord.style.display = 'none';
  board.innerHTML = boardSpaces.join(" ");
}

function tileSpacesBoard() {
  const tileBoard = document.getElementById('tile-board');

  const boardSpaces = tileSpaces.map((tp, i) => {

    return (
      `<div id='${tp.id}' class='space tile-space'>${tp.letterEl}</div>`
    )
  })

  tileBoard.innerHTML = boardSpaces.join(" ");

  addClickHandler();
}

function addClickHandler() {
  const tileSpaceElements = document.getElementsByClassName("tile-space");

  for (var i = 0; i < tileSpaceElements.length; i++) {
    const tile = tileSpaceElements[i];

    tileSpaceElements[i].addEventListener('click', evt => chooseWordPosition(tile, word));
  }
}

function chooseWordPosition(tile, word) {
  const playWord = document.getElementById('play-word');
  for (var i = 0; i < word.length; i++) {

    tile.innerHTML = word[i];
    addWordToBoard(word[i], tile);
  }

  playWord.style.display = 'block';
}

function addWordToBoard(wordLetter, tile) {
  const playButton = document.getElementById('play-word');
  const tileId = tile.id - 1;
  tileSpaces[tileId].letterEl = wordLetter;


  playButton.addEventListener('click', evt => drawBoard(tileSpaces));
}

function drawBoard(tileSpaces) {
  const tileBoard = document.getElementById('tile-board');
  const boardSpaces = tileSpaces.map((tp, i) => {

    return (
      `<div id='${tp.id}' class='space tile-space'>${tp.letterEl}</div>`
    )
  })

  tileBoard.innerHTML = boardSpaces.join(" ");

  switchPlayer();
  addClickHandler();
}


function switchPlayer() {
  const currentPlayer = document.getElementById('current-player');
  const playButton = document.getElementById('play-word');
  const getLettersButton = document.getElementById('get-letters');
  const wordWrapper = document.getElementById('word');

  word = [];
  wordWrapper.innerHTML = word.join(" ");
  playButton.style.display = 'none';
  getLettersButton.style.display = 'block';
}

function Letters() {
  const allTiles = [];

  tiles.map((letter, i) => {
    let tile = {name: letter.name, points: letter.points};
    for (var l=0; l < letter.count; l++) {
      allTiles.push(tile);
    }
  })

  return allTiles
}

function LetterBag() {
  const letterBagEl = document.getElementById("letter-bag");
  let allTiles = leftOverTiles;

  const letterBag = allTiles.map((letter, i) => {
    return (
      `<div class="letter">${letter.name}</div>`
    );
  })

  letterBagEl.innerHTML = letterBag.join(" ");

  return allTiles
}

function chooseTiles() {
  let leftOverLetters = LetterBag();
  let amount = 7;
  let playerTiles = [];
  let chosenLetters = [];
  const messaging = document.getElementById("messaging");
  const getLettersButton = document.getElementById('get-letters');

  for (var i=0; i < amount; i++) {
    const randomNumber = getRandomNumber(leftOverLetters.length);
    const chosenLetter = leftOverLetters[randomNumber];

    playerTiles.push(chosenLetter);
    chosenLetters.push(randomNumber);
  }
  if (leftOverLetters.length < 1) {
    messaging.innerHTML = `<p>game over</p>`;
    getLettersButton.style.display = 'none';
  } else {
    resetBag(chosenLetters, leftOverLetters);
  }

  return playerTiles;
}

function resetBag(chosenLetters, leftOverLetters) {
  for (var i=0; i < chosenLetters.length; i++) {
    leftOverLetters.splice(chosenLetters[i], 1);
  }

  leftOverTiles = leftOverLetters;
}

function getTileShelf() {
  const tileShelf = document.getElementById("tile-shelf");
  const getLettersButton = document.getElementById('get-letters');
  let playerTiles = chooseTiles();

  const chosenTiles = playerTiles.map((letter, i) => {
    return (
      `<div data-id='${letter.name}' class='letter'>${letter.name}<span class="points">${letter.points}</span></div>`
    );
  })

  tileShelf.innerHTML = chosenTiles.join(" ");
  getLettersButton.style.display = 'none';

  const htmlTiles = document.getElementsByClassName("letter");

  for (var i = 0; i < htmlTiles.length; i++) {
    const tile = htmlTiles[i];
    htmlTiles[i].addEventListener('click', evt => addToWord(tile, playerTiles));
  }
}


function addToWord(tile, tilesOnShelf) {
  const tileShelf = document.getElementById("tile-shelf");
  let clickedLetter = tile.getAttribute('data-id');
  const wordLetter = `<div>${clickedLetter}</div>`;

  tile.style.display = 'none';
  word.push(wordLetter);

  for (var i = 0; i < tilesOnShelf.length; i++) {
    const tile = tilesOnShelf[i];
    if (tile.name === clickedLetter) {
      tilesOnShelf.splice(tilesOnShelf[i], 1);
    }
  }

  const wordWrapper = document.getElementById('word');
  wordWrapper.innerHTML = word.join(" ");

  return tilesOnShelf;
}

function getRandomNumber(letters) {
  return Math.floor(Math.random() * (letters - 0) + 0);
}

export {Board, getTileShelf, tileSpacesBoard};
