import {spaces} from './spaces'
import {tiles} from './tiles'
import {tileSpaces} from './tile-spaces'

let leftOverTiles = Letters();
let word = [];
let player = "one";

function Board() {
  //first call
  // draws visual for scrabble board
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

function drawBoard(tileSpaces, player) {
  //first call
  // draws transparent board on top of scrabble board
  const tileBoard = document.getElementById('tile-board');
  let boardSpaces = [];

  if (tileSpaces) {
    boardSpaces = tileSpaces.map((tp, i) => {

      return (
        `<div id='${tp.id}' class='space tile-space'>
        ${tp.letterEl}</div>`
      )
    })

    tileBoard.innerHTML = boardSpaces.join(" ");
  }

  switchPlayer(player);
  addClickHandler();
}

function addClickHandler() {
  const tileSpaceElements = document.getElementsByClassName("tile-space");

  for (var i = 0; i < tileSpaceElements.length; i++) {
    const tile = tileSpaceElements[i];

    tileSpaceElements[i].addEventListener('click', evt => chooseWordPosition(tile, word));
  }
}


function switchPlayer(player) {
  let playerOneShelf = [];
  let playerTwoShelf = [];

  const currentPlayer = document.getElementById('current-player');
  const playButton = document.getElementById('play-word');
  const getLettersButton = document.getElementById('get-letters');
  const wordWrapper = document.getElementById('word');
  let htmlTiles = document.getElementsByClassName("on-shelf");


  const shelfOne = document.getElementById("tile-shelf");
  const shelfTwo = document.getElementById("tile-shelf-two");

  if (shelfTwo.style.display === "flex") {
    htmlTiles = shelfTwo.childNodes;
    for (var i = 0; i < htmlTiles.length; i++) {
      const tile = htmlTiles[i];
      playerTwoShelf.push(tile.outerHTML);
    }
  } else {
    for (var i = 0; i < htmlTiles.length; i++) {
      const tile = htmlTiles[i];
      playerOneShelf.push(tile.outerHTML);
    }
  }

  word = [];
  wordWrapper.innerHTML = word.join(" ");
  playButton.style.display = 'none';
  getLettersButton.style.display = 'block';

  if (player === "two") {
    shelfOne.style.display = 'none';
    shelfTwo.style.display = 'flex';
    currentPlayer.innerHTML = '<p>player two</p>';
  }

  if (player === "one") {
    shelfOne.style.display = 'flex';
    shelfTwo.style.display = 'none';
    currentPlayer.innerHTML = '<p>player one</p>';
  }
}


function chooseWordPosition(tile, word) {
  const playWord = document.getElementById('play-word');

  if (word) {
    for (var i = 0; i < word.length; i++) {
      tile.innerHTML = word[i];
      addWordToBoard(word[i], tile);
    }
      playWord.style.display = 'block';
  }
}

function addWordToBoard(wordLetter, tile) {
  const playButton = document.getElementById('play-word');
  const tileId = tile.id - 1;
  tileSpaces[tileId].letterEl = wordLetter;

  player = "two";
  const shelfOne = document.getElementById("tile-shelf");
  const shelfTwo = document.getElementById("tile-shelf-two");

  if (shelfTwo.style.display === 'flex') {
    player = "one"
  }

  playButton.addEventListener('click', evt => drawBoard(tileSpaces, player));
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

function chooseTiles(amt) {
  let leftOverLetters = LetterBag();
  let amount = 7;
  if (amt) {
    amount = amt;
  }

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
  // updates letter bag
  for (var i=0; i < chosenLetters.length; i++) {
    leftOverLetters.splice(chosenLetters[i], 1);
  }

  leftOverTiles = leftOverLetters;
}

function getTileShelf(player) {
  // when get letters button is clicked
  const shelfTwo = document.getElementById("tile-shelf-two");
  let tileShelf = document.getElementById("tile-shelf-two");

  if (player === "one") {
    tileShelf = document.getElementById("tile-shelf");
  }
  if (shelfTwo.style.display === 'flex') {
    tileShelf = document.getElementById("tile-shelf-two");
  }

  const getLettersButton = document.getElementById('get-letters');
  let playerTiles = chooseTiles();

  const chosenTiles = playerTiles.map((letter, i) => {
    return (
      `<div data-id='${letter.name}' data-points='${letter.points}' class='letter on-shelf'>${letter.name}<span class="points">${letter.points}</span></div>`
    );
  })

  tileShelf.innerHTML = chosenTiles.join(" ");
  getLettersButton.style.display = 'none';

  const htmlTiles = document.getElementsByClassName("letter");

  for (var i = 0; i < htmlTiles.length; i++) {
    const tile = htmlTiles[i];
    htmlTiles[i].addEventListener('click', evt => addToWord(tile, chosenTiles));
    // every time letter on shelf is clicked
  }
}


function addToWord(tile, tilesOnShelf) {
  // every time letter on shelf is clicked
  const tileShelf = document.getElementById("tile-shelf");
  let clickedLetter = tile.getAttribute('data-id');
  let clickedLetterPoints = tile.getAttribute('data-points');
  const wordLetter = `<div>${clickedLetter}<span class="points">${clickedLetterPoints}</span></div>`;

  word.push(wordLetter);

  for (var i = 0; i < tilesOnShelf.length; i++) {
    const tile = tilesOnShelf[i];
    if (tile.name === clickedLetter) {
      tilesOnShelf.splice(tilesOnShelf[i], 1);
    }
  }

  tile.style.border = "3px solid #ff00ff";
}

function getRandomNumber(letters) {
  return Math.floor(Math.random() * (letters - 0) + 0);
}

export {Board, getTileShelf, drawBoard};
