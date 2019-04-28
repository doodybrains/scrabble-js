import {spaces} from './spaces'
import {tiles} from './tiles'
import {tileSpaces} from './tileSpaces'
import {switchPlayer} from './switchPlayer'
import {addClickHandler} from './clickHandler'

let player = "one";

function drawBoard(tileSpaces, player, word) {
  console.log(player);
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

  switchPlayer(player, word);
  addClickHandler(word, player);
}


export {drawBoard};
