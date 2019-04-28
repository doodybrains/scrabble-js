import {chooseTiles} from './chooseTiles.js'

function addLettersToShelf(letterSpaces) {
  // console.log('add letters to shelf');
  let playerTiles = chooseTiles();

  const chosenTiles = playerTiles.map((letter, i) => {
    return (
      `<div id='${letter.name}-${i}' data-id='${letter.name}' data-points='${letter.points}' class='letter on-shelf'>${letter.name}<span class="points">${letter.points}</span></div>`
    );
  })

  let tileShelf = document.getElementById("tile-shelf");
  tileShelf.innerHTML = chosenTiles.join(" ");

  playerTiles.map((letter, i) => {
    const id = `${letter.name}-${i}`
    const el = document.getElementById(id);

    el.addEventListener('click', function() {
      addLetterToBoard(el, letterSpaces)
    });
  })
}

function addLetterToBoard(letter, letterSpaces) {
  // console.log('choose letter for board');
  letter.style.backgroundColor = '#eee';
  const letterId = letter.id;
  const letterName = letter.getAttribute('data-id');
  const letterPoints = letter.getAttribute('data-points');
  const letterElement = `<div id='tile-${letterId}'>${letterName}<span class='points'>${letterPoints}</span></div>`;
  const letterOnBoard = document.getElementById(`tile-${letterId}`);

  if (letter.style.border === '3px solid chartreuse') {
    letter.style.border = '3px solid black';
    letterOnBoard.parentNode.removeChild(letterOnBoard);
  } else {
    letterSpaces.map((space, i) => {
      const id = space.id
      const el = document.getElementById(id);
      console.log('check');
      el.addEventListener('click', function() {
        chooseSpaceForLetter(el, letterElement, letter)
      });
    })
  }
}

function chooseSpaceForLetter(el, letterElement, letterTile) {
  // console.log('add chosen letter to board');

  console.log(el, letterElement, letterTile);
  letterTile.style.border = '3px solid chartreuse';
  el.innerHTML = letterElement;
}

export {addLettersToShelf};
