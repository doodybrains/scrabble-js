
import {Board, getTileShelf, tileSpacesBoard} from './board'
const getLettersButton = document.getElementById('get-letters');

Board();
tileSpacesBoard();

getLettersButton.addEventListener('click', evt => getTileShelf());
