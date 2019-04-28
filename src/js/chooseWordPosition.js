import {addWordToBoard} from './addWordToBoard'

function chooseWordPosition(tile, word, tileSpaces, player) {
  const playWord = document.getElementById('play-word');
  let x;
  if (word) {
    
    for (var i = 0; i < word.length; i++) {
      x = tile.innerHTML = word[i];
    }

    addWordToBoard(x, tile, tileSpaces, player);
    playWord.style.display = 'block';
  }
}
export {chooseWordPosition};
