function addToWord(tile, tilesOnShelf, word, player) {
  // every time letter on shelf is clicked

  const shelfTwo = document.getElementById("tile-shelf-two");
  let tileShelf = document.getElementById("tile-shelf-two");

  if (player === "one") {
    tileShelf = document.getElementById("tile-shelf");
  }
  if (shelfTwo.style.display === 'flex') {
    tileShelf = document.getElementById("tile-shelf-two");
  }

  let clickedLetter = tile.getAttribute('data-id');
  let clickedLetterPoints = tile.getAttribute('data-points');
  const wordLetter = `<div>${clickedLetter}<span class="points">${clickedLetterPoints}</span></div>`;

  word.push(wordLetter);

  for (var i = 0; i < tilesOnShelf.length; i++) {
    const tile = tilesOnShelf[i];
    if (tile.name === clickedLetter) {
      tilesOnShelf.splice(tilesOnShelf[i], 1);
    }
  }

  tile.style.border = "3px solid #ff00ff";
}

export {addToWord};
