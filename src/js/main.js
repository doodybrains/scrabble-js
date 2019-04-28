
import {drawBoard} from './gameboard'
import {getTileShelf} from './getTileShelf'
import {baseboard} from './baseboard'
import {tileSpaces} from './tileSpaces'
import {spaces} from './spaces'
const getLettersButton = document.getElementById('get-letters');

let word = [];
let player = "one"

baseboard(spaces);

drawBoard(tileSpaces, "one", word);

getLettersButton.addEventListener('click', evt => getTileShelf(player, word));
