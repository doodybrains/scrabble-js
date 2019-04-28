import {chooseTiles} from './chooseTiles.js'

function drawScrabbleBoard(boardSpaces, letterSpaces) {
  const board = document.getElementById('board');
  const letterBoard = document.getElementById('tile-board');
  const getLettersBtn = document.getElementById('get-letters');

  const allSpaces = boardSpaces.map((sp,i) => {
    return (
      `<div class='space ${sp.type}'>${sp.type}</div>`
    );
  })

  board.innerHTML = allSpaces.join(" ");

  let allLetterSpaces = letterSpaces.map((tp, i) => {
    return (
      `<div id='${tp.id}' class='space tile-space'>
      ${tp.letterEl}</div>`
    )
  })

  letterBoard.innerHTML = allLetterSpaces.join(" ");


  getLettersBtn.addEventListener('click', displayLetterShelf);
}

function displayLetterShelf() {
  let playerTiles = chooseTiles();

  const chosenTiles = playerTiles.map((letter, i) => {
    return (
      `<div data-id='${letter.name}' data-points='${letter.points}' class='letter on-shelf'>${letter.name}<span class="points">${letter.points}</span></div>`
    );
  })

  let tileShelf = document.getElementById("tile-shelf");
  tileShelf.innerHTML = chosenTiles.join(" ");
}

export {drawScrabbleBoard};
