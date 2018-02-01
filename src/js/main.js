
import {Board, getTileShelf} from './board'
const getLettersButton = document.getElementById('get-letters');

Board();

getLettersButton.addEventListener('click', evt => getTileShelf());
