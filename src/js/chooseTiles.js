import {letterBag} from './letterBag'
import {getRandomNumber} from './getRandomNumber'
import {resetBag} from './resetBag'

function chooseTiles(amt) {
  let leftOverLetters = letterBag();
  let amount = 7;
  if (amt) {
    amount = amt;
  }

  let playerTiles = [];
  let chosenLetters = [];
  const messaging = document.getElementById("messaging");
  const getLettersButton = document.getElementById('get-letters');

  for (var i=0; i < amount; i++) {
    const randomNumber = getRandomNumber(leftOverLetters.length);
    const chosenLetter = leftOverLetters[randomNumber];

    playerTiles.push(chosenLetter);
    chosenLetters.push(randomNumber);
  }

  if (leftOverLetters.length < 1) {
    messaging.innerHTML = `<p>game over</p>`;
    getLettersButton.style.display = 'none';
  } else {
    resetBag(chosenLetters, leftOverLetters);
  }

  return playerTiles;
}

export {chooseTiles};
