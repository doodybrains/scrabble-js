import {add} from './add'

function addWordToBoard(wordLetter, tile, tileSpaces, player) {
  const playButton = document.getElementById('play-word');
  const tileId = tile.id - 1;
  tileSpaces[tileId].letterEl = wordLetter;

  player = "two";

  const shelfOne = document.getElementById("tile-shelf");
  const shelfTwo = document.getElementById("tile-shelf-two");

  if (shelfTwo.style.display === 'flex') {
    player = "one"
  }

  let word = [];

  console.log(wordLetter);

  add(tileSpaces, player, word)
  // playButton.addEventListener('click', evt => drawBoard(tileSpaces, player, word));
}

export {addWordToBoard};
