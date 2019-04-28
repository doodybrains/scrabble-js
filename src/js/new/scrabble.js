// array of board spaces for the board itself
import {boardSpaces} from './boardSpaces'
// draws the actual board in HTML
import {drawScrabbleBoard} from './drawScrabbleBoard'
// array of letter spaces sitting on top of board spaces for holding played letters
import {letterSpaces} from './letterSpaces'

drawScrabbleBoard(boardSpaces, letterSpaces);
