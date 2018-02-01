import {spaces} from './spaces'
import {tiles} from './tiles'

function Board() {
  const board = document.getElementById('board');

  const boardSpaces = spaces.map((sp,i) => {
    return (
      `<div class='space ${sp.type}'>${sp.type}</div>`
    );
  })

  board.innerHTML = boardSpaces.join(" ");
}

let leftOverTiles = Letters();

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
  let playerTiles = chooseTiles();

  const chosenTiles = playerTiles.map((letter, i) => {
    return (
      `<div class="letter">${letter.name}</div>`
    );
  })

  tileShelf.innerHTML = chosenTiles.join(" ");
}

function getRandomNumber(letters) {
  return Math.floor(Math.random() * (letters - 0) + 0);
}

export {Board, LetterBag, getTileShelf};
