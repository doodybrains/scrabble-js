import {chooseWordPosition} from './chooseWordPosition'
import {tileSpaces} from './tileSpaces'

function addClickHandler(word, player) {
  const tileSpaceElements = document.getElementsByClassName("tile-space");

  for (var i = 0; i < tileSpaceElements.length; i++) {
    const tile = tileSpaceElements[i];

    tileSpaceElements[i].addEventListener('click', evt => chooseWordPosition(tile, word, tileSpaces, player));
  }
}

export {addClickHandler};
