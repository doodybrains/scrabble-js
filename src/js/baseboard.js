function baseboard(spaces) {
  //first call
  // draws visual for scrabble board
  const playWord = document.getElementById('play-word');
  const board = document.getElementById('board');
  const currentPlayer = document.getElementById('current-player');

  const boardSpaces = spaces.map((sp,i) => {
    return (
      `<div class='space ${sp.type}'>${sp.type}</div>`
    );
  })

  playWord.style.display = 'none';
  board.innerHTML = boardSpaces.join(" ");
}

export {baseboard};
