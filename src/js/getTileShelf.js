import {chooseTiles} from './chooseTiles'
import {addToWord} from './addToWord'

function getTileShelf(player, word) {
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

    htmlTiles[i].addEventListener('click', evt => addToWord(tile, chosenTiles, word, player));
    // every time letter on shelf is clicked
  }
}

export {getTileShelf};
