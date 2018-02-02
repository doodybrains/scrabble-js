
import {Board, getTileShelf, drawBoard} from './board'
import {tileSpaces} from './tile-spaces'
const getLettersButton = document.getElementById('get-letters');

Board();
drawBoard(tileSpaces);

getLettersButton.addEventListener('click', evt => getTileShelf("one"));
