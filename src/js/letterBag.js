import {Letters} from './letters'
import {tiles} from './tiles'

function letterBag() {
  const letterBagEl = document.getElementById("letter-bag");
  let leftOverTiles = Letters(tiles);
  let allTiles = leftOverTiles;

  const letterBag = allTiles.map((letter, i) => {
    return (
      `<div class="letter">${letter.name}</div>`
    );
  })

  letterBagEl.innerHTML = letterBag.join(" ");

  return allTiles
}

export {letterBag};
