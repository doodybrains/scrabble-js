import {addLettersToShelf} from './addLettersToShelf.js'

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

  getLettersBtn.addEventListener('click', function() {
    addLettersToShelf(letterSpaces)
  });
}


export {drawScrabbleBoard};
