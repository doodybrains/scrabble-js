function resetBag(chosenLetters, leftOverLetters) {
  // updates letter bag
  for (var i=0; i < chosenLetters.length; i++) {
    leftOverLetters.splice(chosenLetters[i], 1);
  }

  return leftOverLetters;
}

export {resetBag};
