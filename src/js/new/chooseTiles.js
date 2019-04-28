import {getRandomNumber} from './getRandomNumber'
import {letterTiles} from './letterTiles'

function chooseTiles() {
  const letterBagEl = document.getElementById("letter-bag");
  const messaging = document.getElementById("messaging");
  const getLettersButton = document.getElementById('get-letters');
  let leftOverLetters = letterTiles
  let playerTiles = [];
  let amount = 7;
  let allTiles = leftOverLetters;

  if (leftOverLetters.length < 7) amount = leftOverLetters.length

  for (var i=0; i < amount; i++) {
    const randomNumber = getRandomNumber(leftOverLetters.length);
    const chosenLetter = leftOverLetters[randomNumber];

    playerTiles.push(chosenLetter);
    leftOverLetters.splice(randomNumber, 1);
  }

  if (leftOverLetters.length < 1) {
    messaging.innerHTML = `<p>game over</p>`;
    getLettersButton.style.display = 'none';
  }

  const letterBag = allTiles.map((letter, i) => {
    return (
      `<div class="letter">${letter.name}</div>`
    );
  })

  letterBagEl.innerHTML = letterBag.join(" ");

  return playerTiles;
}

export {chooseTiles};
