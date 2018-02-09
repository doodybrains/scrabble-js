(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawBoard = exports.getTileShelf = exports.Board = undefined;

var _spaces = require('./spaces');

var _tiles = require('./tiles');

var _tileSpaces = require('./tile-spaces');

var leftOverTiles = Letters();
var word = [];
var player = "one";

function Board() {
  //first call
  // draws visual for scrabble board
  var playWord = document.getElementById('play-word');
  var board = document.getElementById('board');
  var currentPlayer = document.getElementById('current-player');

  var boardSpaces = _spaces.spaces.map(function (sp, i) {
    return '<div class=\'space ' + sp.type + '\'>' + sp.type + '</div>';
  });

  playWord.style.display = 'none';
  board.innerHTML = boardSpaces.join(" ");
}

function drawBoard(tileSpaces, player) {
  //first call
  // draws transparent board on top of scrabble board
  var tileBoard = document.getElementById('tile-board');
  var boardSpaces = [];

  if (tileSpaces) {
    boardSpaces = tileSpaces.map(function (tp, i) {

      return '<div id=\'' + tp.id + '\' class=\'space tile-space\'>\n        ' + tp.letterEl + '</div>';
    });

    tileBoard.innerHTML = boardSpaces.join(" ");
  }

  switchPlayer(player);
  addClickHandler();
}

function addClickHandler() {
  var tileSpaceElements = document.getElementsByClassName("tile-space");

  var _loop = function _loop() {
    var tile = tileSpaceElements[i];

    tileSpaceElements[i].addEventListener('click', function (evt) {
      return chooseWordPosition(tile, word);
    });
  };

  for (var i = 0; i < tileSpaceElements.length; i++) {
    _loop();
  }
}

function switchPlayer(player) {
  var playerOneShelf = [];
  var playerTwoShelf = [];

  var currentPlayer = document.getElementById('current-player');
  var playButton = document.getElementById('play-word');
  var getLettersButton = document.getElementById('get-letters');
  var wordWrapper = document.getElementById('word');
  var htmlTiles = document.getElementsByClassName("on-shelf");

  var shelfOne = document.getElementById("tile-shelf");
  var shelfTwo = document.getElementById("tile-shelf-two");

  if (shelfTwo.style.display === "flex") {
    htmlTiles = shelfTwo.childNodes;
    for (var i = 0; i < htmlTiles.length; i++) {
      var _tile = htmlTiles[i];
      playerTwoShelf.push(_tile.outerHTML);
    }
  } else {
    for (var i = 0; i < htmlTiles.length; i++) {
      var _tile2 = htmlTiles[i];
      playerOneShelf.push(_tile2.outerHTML);
    }
  }

  word = [];
  wordWrapper.innerHTML = word.join(" ");
  playButton.style.display = 'none';
  getLettersButton.style.display = 'block';

  if (player === "two") {
    shelfOne.style.display = 'none';
    shelfTwo.style.display = 'flex';
    currentPlayer.innerHTML = '<p>player two</p>';
  }

  if (player === "one") {
    shelfOne.style.display = 'flex';
    shelfTwo.style.display = 'none';
    currentPlayer.innerHTML = '<p>player one</p>';
  }
}

function chooseWordPosition(tile, word) {
  var playWord = document.getElementById('play-word');

  if (word) {
    for (var i = 0; i < word.length; i++) {
      tile.innerHTML = word[i];
      addWordToBoard(word[i], tile);
    }
    playWord.style.display = 'block';
  }
}

function addWordToBoard(wordLetter, tile) {
  var playButton = document.getElementById('play-word');
  var tileId = tile.id - 1;
  _tileSpaces.tileSpaces[tileId].letterEl = wordLetter;

  player = "two";
  var shelfOne = document.getElementById("tile-shelf");
  var shelfTwo = document.getElementById("tile-shelf-two");

  if (shelfTwo.style.display === 'flex') {
    player = "one";
  }

  playButton.addEventListener('click', function (evt) {
    return drawBoard(_tileSpaces.tileSpaces, player);
  });
}

function Letters() {
  var allTiles = [];

  _tiles.tiles.map(function (letter, i) {
    var tile = { name: letter.name, points: letter.points };
    for (var l = 0; l < letter.count; l++) {
      allTiles.push(tile);
    }
  });

  return allTiles;
}

function LetterBag() {
  var letterBagEl = document.getElementById("letter-bag");
  var allTiles = leftOverTiles;

  var letterBag = allTiles.map(function (letter, i) {
    return '<div class="letter">' + letter.name + '</div>';
  });

  letterBagEl.innerHTML = letterBag.join(" ");

  return allTiles;
}

function chooseTiles(amt) {
  var leftOverLetters = LetterBag();
  var amount = 7;
  if (amt) {
    amount = amt;
  }

  var playerTiles = [];
  var chosenLetters = [];
  var messaging = document.getElementById("messaging");
  var getLettersButton = document.getElementById('get-letters');

  for (var i = 0; i < amount; i++) {
    var randomNumber = getRandomNumber(leftOverLetters.length);
    var chosenLetter = leftOverLetters[randomNumber];

    playerTiles.push(chosenLetter);
    chosenLetters.push(randomNumber);
  }

  if (leftOverLetters.length < 1) {
    messaging.innerHTML = '<p>game over</p>';
    getLettersButton.style.display = 'none';
  } else {
    resetBag(chosenLetters, leftOverLetters);
  }

  return playerTiles;
}

function resetBag(chosenLetters, leftOverLetters) {
  // updates letter bag
  for (var i = 0; i < chosenLetters.length; i++) {
    leftOverLetters.splice(chosenLetters[i], 1);
  }

  leftOverTiles = leftOverLetters;
}

function getTileShelf(player) {
  // when get letters button is clicked
  var shelfTwo = document.getElementById("tile-shelf-two");
  var tileShelf = document.getElementById("tile-shelf-two");

  if (player === "one") {
    tileShelf = document.getElementById("tile-shelf");
  }
  if (shelfTwo.style.display === 'flex') {
    tileShelf = document.getElementById("tile-shelf-two");
  }

  var getLettersButton = document.getElementById('get-letters');
  var playerTiles = chooseTiles();

  var chosenTiles = playerTiles.map(function (letter, i) {
    return '<div data-id=\'' + letter.name + '\' data-points=\'' + letter.points + '\' class=\'letter on-shelf\'>' + letter.name + '<span class="points">' + letter.points + '</span></div>';
  });

  tileShelf.innerHTML = chosenTiles.join(" ");
  getLettersButton.style.display = 'none';

  var htmlTiles = document.getElementsByClassName("letter");

  var _loop2 = function _loop2() {
    var tile = htmlTiles[i];
    htmlTiles[i].addEventListener('click', function (evt) {
      return addToWord(tile, chosenTiles);
    });
    // every time letter on shelf is clicked
  };

  for (var i = 0; i < htmlTiles.length; i++) {
    _loop2();
  }
}

function addToWord(tile, tilesOnShelf) {
  // every time letter on shelf is clicked
  var tileShelf = document.getElementById("tile-shelf");
  var clickedLetter = tile.getAttribute('data-id');
  var clickedLetterPoints = tile.getAttribute('data-points');
  var wordLetter = '<div>' + clickedLetter + '<span class="points">' + clickedLetterPoints + '</span></div>';

  word.push(wordLetter);

  for (var i = 0; i < tilesOnShelf.length; i++) {
    var _tile3 = tilesOnShelf[i];
    if (_tile3.name === clickedLetter) {
      tilesOnShelf.splice(tilesOnShelf[i], 1);
    }
  }

  tile.style.border = "3px solid #ff00ff";
}

function getRandomNumber(letters) {
  return Math.floor(Math.random() * (letters - 0) + 0);
}

exports.Board = Board;
exports.getTileShelf = getTileShelf;
exports.drawBoard = drawBoard;

},{"./spaces":3,"./tile-spaces":4,"./tiles":5}],2:[function(require,module,exports){
'use strict';

var _board = require('./board');

var _tileSpaces = require('./tile-spaces');

var getLettersButton = document.getElementById('get-letters');

(0, _board.Board)();
(0, _board.drawBoard)(_tileSpaces.tileSpaces);

getLettersButton.addEventListener('click', function (evt) {
  return (0, _board.getTileShelf)("one");
});

},{"./board":1,"./tile-spaces":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var spaces = exports.spaces = [{ id: 1, type: 'tw' }, { id: 2, type: ' ' }, { id: 3, type: ' ' }, { id: 4, type: 'dl' }, { id: 5, type: ' ' }, { id: 6, type: ' ' }, { id: 7, type: ' ' }, { id: 8, type: 'tw' }, { id: 9, type: ' ' }, { id: 10, type: ' ' }, { id: 11, type: ' ' }, { id: 12, type: 'dl' }, { id: 13, type: ' ' }, { id: 14, type: ' ' }, { id: 15, type: 'tw' }, { id: 16, type: ' ' }, { id: 17, type: 'dw' }, { id: 18, type: ' ' }, { id: 19, type: ' ' }, { id: 20, type: ' ' }, { id: 21, type: 'tl' }, { id: 22, type: ' ' }, { id: 23, type: ' ' }, { id: 24, type: ' ' }, { id: 25, type: 'tl' }, { id: 26, type: ' ' }, { id: 27, type: ' ' }, { id: 28, type: ' ' }, { id: 29, type: 'dw' }, { id: 30, type: ' ' }, { id: 31, type: ' ' }, { id: 32, type: ' ' }, { id: 33, type: 'dw' }, { id: 34, type: ' ' }, { id: 35, type: ' ' }, { id: 36, type: ' ' }, { id: 36, type: 'dl' }, { id: 38, type: ' ' }, { id: 39, type: 'dl' }, { id: 40, type: ' ' }, { id: 41, type: ' ' }, { id: 42, type: ' ' }, { id: 43, type: 'dw' }, { id: 44, type: ' ' }, { id: 45, type: ' ' }, { id: 46, type: 'dl' }, { id: 47, type: ' ' }, { id: 48, type: ' ' }, { id: 49, type: 'dw' }, { id: 50, type: ' ' }, { id: 51, type: ' ' }, { id: 52, type: ' ' }, { id: 53, type: 'dl' }, { id: 54, type: ' ' }, { id: 55, type: ' ' }, { id: 56, type: ' ' }, { id: 57, type: 'dw' }, { id: 58, type: ' ' }, { id: 59, type: ' ' }, { id: 60, type: 'dl' }, { id: 61, type: ' ' }, { id: 62, type: ' ' }, { id: 63, type: ' ' }, { id: 64, type: ' ' }, { id: 65, type: 'dw' }, { id: 66, type: ' ' }, { id: 67, type: ' ' }, { id: 68, type: ' ' }, { id: 69, type: ' ' }, { id: 70, type: ' ' }, { id: 71, type: 'dw' }, { id: 72, type: ' ' }, { id: 73, type: ' ' }, { id: 74, type: ' ' }, { id: 75, type: ' ' }, { id: 76, type: ' ' }, { id: 77, type: 'tl' }, { id: 78, type: ' ' }, { id: 79, type: ' ' }, { id: 80, type: ' ' }, { id: 81, type: 'tl' }, { id: 82, type: ' ' }, { id: 83, type: ' ' }, { id: 84, type: ' ' }, { id: 85, type: 'tl' }, { id: 86, type: ' ' }, { id: 87, type: ' ' }, { id: 88, type: ' ' }, { id: 89, type: 'tl' }, { id: 90, type: ' ' }, { id: 91, type: ' ' }, { id: 92, type: ' ' }, { id: 93, type: 'dl' }, { id: 94, type: ' ' }, { id: 95, type: ' ' }, { id: 96, type: ' ' }, { id: 97, type: 'dl' }, { id: 98, type: ' ' }, { id: 99, type: 'dl' }, { id: 100, type: ' ' }, { id: 101, type: ' ' }, { id: 102, type: ' ' }, { id: 103, type: 'dl' }, { id: 104, type: ' ' }, { id: 105, type: ' ' },

//middle
{ id: 106, type: 'tw' }, { id: 107, type: ' ' }, { id: 108, type: ' ' }, { id: 109, type: 'dl' }, { id: 110, type: ' ' }, { id: 111, type: ' ' }, { id: 112, type: ' ' }, { id: 113, type: 'star' }, { id: 114, type: ' ' }, { id: 115, type: ' ' }, { id: 116, type: ' ' }, { id: 117, type: 'dl' }, { id: 118, type: ' ' }, { id: 119, type: ' ' }, { id: 120, type: 'tw' },
//middle


{ id: 121, type: ' ' }, { id: 122, type: ' ' }, { id: 123, type: 'dl' }, { id: 124, type: ' ' }, { id: 125, type: ' ' }, { id: 126, type: ' ' }, { id: 127, type: 'dl' }, { id: 128, type: ' ' }, { id: 129, type: 'dl' }, { id: 130, type: ' ' }, { id: 131, type: ' ' }, { id: 132, type: ' ' }, { id: 133, type: 'dl' }, { id: 134, type: ' ' }, { id: 135, type: ' ' }, { id: 136, type: ' ' }, { id: 137, type: 'tl' }, { id: 138, type: ' ' }, { id: 139, type: ' ' }, { id: 140, type: ' ' }, { id: 141, type: 'tl' }, { id: 142, type: ' ' }, { id: 143, type: ' ' }, { id: 144, type: ' ' }, { id: 145, type: 'tl' }, { id: 146, type: ' ' }, { id: 147, type: ' ' }, { id: 148, type: ' ' }, { id: 149, type: 'tl' }, { id: 150, type: ' ' }, { id: 151, type: ' ' }, { id: 152, type: ' ' }, { id: 153, type: ' ' }, { id: 154, type: ' ' }, { id: 155, type: 'dw' }, { id: 156, type: ' ' }, { id: 157, type: ' ' }, { id: 158, type: ' ' }, { id: 159, type: ' ' }, { id: 160, type: ' ' }, { id: 161, type: 'dw' }, { id: 162, type: ' ' }, { id: 163, type: ' ' }, { id: 164, type: ' ' }, { id: 165, type: ' ' }, { id: 166, type: 'dl' }, { id: 167, type: ' ' }, { id: 168, type: ' ' }, { id: 169, type: 'dw' }, { id: 170, type: ' ' }, { id: 171, type: ' ' }, { id: 172, type: ' ' }, { id: 173, type: 'dl' }, { id: 174, type: ' ' }, { id: 175, type: ' ' }, { id: 176, type: ' ' }, { id: 177, type: 'dw' }, { id: 178, type: ' ' }, { id: 179, type: ' ' }, { id: 180, type: 'dl' }, { id: 181, type: ' ' }, { id: 182, type: ' ' }, { id: 183, type: 'dw' }, { id: 184, type: ' ' }, { id: 185, type: ' ' }, { id: 186, type: ' ' }, { id: 186, type: 'dl' }, { id: 188, type: ' ' }, { id: 189, type: 'dl' }, { id: 190, type: ' ' }, { id: 191, type: ' ' }, { id: 192, type: ' ' }, { id: 193, type: 'dw' }, { id: 194, type: ' ' }, { id: 195, type: ' ' }, { id: 196, type: ' ' }, { id: 197, type: 'dw' }, { id: 198, type: ' ' }, { id: 199, type: ' ' }, { id: 200, type: ' ' }, { id: 201, type: 'tl' }, { id: 202, type: ' ' }, { id: 203, type: ' ' }, { id: 204, type: ' ' }, { id: 205, type: 'tl' }, { id: 206, type: ' ' }, { id: 207, type: ' ' }, { id: 208, type: ' ' }, { id: 209, type: 'dw' }, { id: 210, type: ' ' }, { id: 211, type: 'tw' }, { id: 212, type: ' ' }, { id: 213, type: ' ' }, { id: 214, type: 'dl' }, { id: 215, type: ' ' }, { id: 216, type: ' ' }, { id: 217, type: ' ' }, { id: 218, type: 'tw' }, { id: 219, type: ' ' }, { id: 220, type: ' ' }, { id: 221, type: ' ' }, { id: 222, type: 'dl' }, { id: 223, type: ' ' }, { id: 224, type: ' ' }, { id: 225, type: 'tw' }];

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tileSpaces = exports.tileSpaces = [{ id: 1, letterEl: ' ', points: ' ' }, { id: 2, letterEl: ' ', points: ' ' }, { id: 3, letterEl: ' ', points: ' ' }, { id: 4, letterEl: ' ', points: ' ' }, { id: 5, letterEl: ' ', points: ' ' }, { id: 6, letterEl: ' ', points: ' ' }, { id: 7, letterEl: ' ', points: ' ' }, { id: 8, letterEl: ' ', points: ' ' }, { id: 9, letterEl: ' ', points: ' ' }, { id: 10, letterEl: ' ', points: ' ' }, { id: 11, letterEl: ' ', points: ' ' }, { id: 12, letterEl: ' ', points: ' ' }, { id: 13, letterEl: ' ', points: ' ' }, { id: 14, letterEl: ' ', points: ' ' }, { id: 15, letterEl: ' ', points: ' ' }, { id: 16, letterEl: ' ', points: ' ' }, { id: 17, letterEl: ' ', points: ' ' }, { id: 18, letterEl: ' ', points: ' ' }, { id: 19, letterEl: ' ', points: ' ' }, { id: 20, letterEl: ' ', points: ' ' }, { id: 21, letterEl: ' ', points: ' ' }, { id: 22, letterEl: ' ', points: ' ' }, { id: 23, letterEl: ' ', points: ' ' }, { id: 24, letterEl: ' ', points: ' ' }, { id: 25, letterEl: ' ', points: ' ' }, { id: 26, letterEl: ' ', points: ' ' }, { id: 27, letterEl: ' ', points: ' ' }, { id: 28, letterEl: ' ', points: ' ' }, { id: 29, letterEl: ' ', points: ' ' }, { id: 30, letterEl: ' ', points: ' ' }, { id: 31, letterEl: ' ', points: ' ' }, { id: 32, letterEl: ' ', points: ' ' }, { id: 33, letterEl: ' ', points: ' ' }, { id: 34, letterEl: ' ', points: ' ' }, { id: 35, letterEl: ' ', points: ' ' }, { id: 36, letterEl: ' ', points: ' ' }, { id: 36, letterEl: ' ', points: ' ' }, { id: 38, letterEl: ' ', points: ' ' }, { id: 39, letterEl: ' ', points: ' ' }, { id: 40, letterEl: ' ', points: ' ' }, { id: 41, letterEl: ' ', points: ' ' }, { id: 42, letterEl: ' ', points: ' ' }, { id: 43, letterEl: ' ', points: ' ' }, { id: 44, letterEl: ' ', points: ' ' }, { id: 45, letterEl: ' ', points: ' ' }, { id: 46, letterEl: ' ', points: ' ' }, { id: 47, letterEl: ' ', points: ' ' }, { id: 48, letterEl: ' ', points: ' ' }, { id: 49, letterEl: ' ', points: ' ' }, { id: 50, letterEl: ' ', points: ' ' }, { id: 51, letterEl: ' ', points: ' ' }, { id: 52, letterEl: ' ', points: ' ' }, { id: 53, letterEl: ' ', points: ' ' }, { id: 54, letterEl: ' ', points: ' ' }, { id: 55, letterEl: ' ', points: ' ' }, { id: 56, letterEl: ' ', points: ' ' }, { id: 57, letterEl: ' ', points: ' ' }, { id: 58, letterEl: ' ', points: ' ' }, { id: 59, letterEl: ' ', points: ' ' }, { id: 60, letterEl: ' ', points: ' ' }, { id: 61, letterEl: ' ', points: ' ' }, { id: 62, letterEl: ' ', points: ' ' }, { id: 63, letterEl: ' ', points: ' ' }, { id: 64, letterEl: ' ', points: ' ' }, { id: 65, letterEl: ' ', points: ' ' }, { id: 66, letterEl: ' ', points: ' ' }, { id: 67, letterEl: ' ', points: ' ' }, { id: 68, letterEl: ' ', points: ' ' }, { id: 69, letterEl: ' ', points: ' ' }, { id: 70, letterEl: ' ', points: ' ' }, { id: 71, letterEl: ' ', points: ' ' }, { id: 72, letterEl: ' ', points: ' ' }, { id: 73, letterEl: ' ', points: ' ' }, { id: 74, letterEl: ' ', points: ' ' }, { id: 75, letterEl: ' ', points: ' ' }, { id: 76, letterEl: ' ', points: ' ' }, { id: 77, letterEl: ' ', points: ' ' }, { id: 78, letterEl: ' ', points: ' ' }, { id: 79, letterEl: ' ', points: ' ' }, { id: 80, letterEl: ' ', points: ' ' }, { id: 81, letterEl: ' ', points: ' ' }, { id: 82, letterEl: ' ', points: ' ' }, { id: 83, letterEl: ' ', points: ' ' }, { id: 84, letterEl: ' ', points: ' ' }, { id: 85, letterEl: ' ', points: ' ' }, { id: 86, letterEl: ' ', points: ' ' }, { id: 87, letterEl: ' ', points: ' ' }, { id: 88, letterEl: ' ', points: ' ' }, { id: 89, letterEl: ' ', points: ' ' }, { id: 90, letterEl: ' ', points: ' ' }, { id: 91, letterEl: ' ', points: ' ' }, { id: 92, letterEl: ' ', points: ' ' }, { id: 93, letterEl: ' ', points: ' ' }, { id: 94, letterEl: ' ', points: ' ' }, { id: 95, letterEl: ' ', points: ' ' }, { id: 96, letterEl: ' ', points: ' ' }, { id: 97, letterEl: ' ', points: ' ' }, { id: 98, letterEl: ' ', points: ' ' }, { id: 99, letterEl: ' ', points: ' ' }, { id: 100, letterEl: ' ', points: ' ' }, { id: 101, letterEl: ' ', points: ' ' }, { id: 102, letterEl: ' ', points: ' ' }, { id: 103, letterEl: ' ', points: ' ' }, { id: 104, letterEl: ' ', points: ' ' }, { id: 105, letterEl: ' ', points: ' ' },

//mid e
{ id: 106, letterEl: ' ', points: ' ' }, { id: 107, letterEl: ' ', points: ' ' }, { id: 108, letterEl: ' ', points: ' ' }, { id: 109, letterEl: ' ', points: ' ' }, { id: 110, letterEl: ' ', points: ' ' }, { id: 111, letterEl: ' ', points: ' ' }, { id: 112, letterEl: ' ', points: ' ' }, { id: 113, letterEl: ' ', points: ' ' }, { id: 114, letterEl: ' ', points: ' ' }, { id: 115, letterEl: ' ', points: ' ' }, { id: 116, letterEl: ' ', points: ' ' }, { id: 117, letterEl: ' ', points: ' ' }, { id: 118, letterEl: ' ', points: ' ' }, { id: 119, letterEl: ' ', points: ' ' }, { id: 120, letterEl: ' ', points: ' ' },
//mid e


{ id: 121, letterEl: ' ', points: ' ' }, { id: 122, letterEl: ' ', points: ' ' }, { id: 123, letterEl: ' ', points: ' ' }, { id: 124, letterEl: ' ', points: ' ' }, { id: 125, letterEl: ' ', points: ' ' }, { id: 126, letterEl: ' ', points: ' ' }, { id: 127, letterEl: ' ', points: ' ' }, { id: 128, letterEl: ' ', points: ' ' }, { id: 129, letterEl: ' ', points: ' ' }, { id: 130, letterEl: ' ', points: ' ' }, { id: 131, letterEl: ' ', points: ' ' }, { id: 132, letterEl: ' ', points: ' ' }, { id: 133, letterEl: ' ', points: ' ' }, { id: 134, letterEl: ' ', points: ' ' }, { id: 135, letterEl: ' ', points: ' ' }, { id: 136, letterEl: ' ', points: ' ' }, { id: 137, letterEl: ' ', points: ' ' }, { id: 138, letterEl: ' ', points: ' ' }, { id: 139, letterEl: ' ', points: ' ' }, { id: 140, letterEl: ' ', points: ' ' }, { id: 141, letterEl: ' ', points: ' ' }, { id: 142, letterEl: ' ', points: ' ' }, { id: 143, letterEl: ' ', points: ' ' }, { id: 144, letterEl: ' ', points: ' ' }, { id: 145, letterEl: ' ', points: ' ' }, { id: 146, letterEl: ' ', points: ' ' }, { id: 147, letterEl: ' ', points: ' ' }, { id: 148, letterEl: ' ', points: ' ' }, { id: 149, letterEl: ' ', points: ' ' }, { id: 150, letterEl: ' ', points: ' ' }, { id: 151, letterEl: ' ', points: ' ' }, { id: 152, letterEl: ' ', points: ' ' }, { id: 153, letterEl: ' ', points: ' ' }, { id: 154, letterEl: ' ', points: ' ' }, { id: 155, letterEl: ' ', points: ' ' }, { id: 156, letterEl: ' ', points: ' ' }, { id: 157, letterEl: ' ', points: ' ' }, { id: 158, letterEl: ' ', points: ' ' }, { id: 159, letterEl: ' ', points: ' ' }, { id: 160, letterEl: ' ', points: ' ' }, { id: 161, letterEl: ' ', points: ' ' }, { id: 162, letterEl: ' ', points: ' ' }, { id: 163, letterEl: ' ', points: ' ' }, { id: 164, letterEl: ' ', points: ' ' }, { id: 165, letterEl: ' ', points: ' ' }, { id: 166, letterEl: ' ', points: ' ' }, { id: 167, letterEl: ' ', points: ' ' }, { id: 168, letterEl: ' ', points: ' ' }, { id: 169, letterEl: ' ', points: ' ' }, { id: 170, letterEl: ' ', points: ' ' }, { id: 171, letterEl: ' ', points: ' ' }, { id: 172, letterEl: ' ', points: ' ' }, { id: 173, letterEl: ' ', points: ' ' }, { id: 174, letterEl: ' ', points: ' ' }, { id: 175, letterEl: ' ', points: ' ' }, { id: 176, letterEl: ' ', points: ' ' }, { id: 177, letterEl: ' ', points: ' ' }, { id: 178, letterEl: ' ', points: ' ' }, { id: 179, letterEl: ' ', points: ' ' }, { id: 180, letterEl: ' ', points: ' ' }, { id: 181, letterEl: ' ', points: ' ' }, { id: 182, letterEl: ' ', points: ' ' }, { id: 183, letterEl: ' ', points: ' ' }, { id: 184, letterEl: ' ', points: ' ' }, { id: 185, letterEl: ' ', points: ' ' }, { id: 186, letterEl: ' ', points: ' ' }, { id: 186, letterEl: ' ', points: ' ' }, { id: 188, letterEl: ' ', points: ' ' }, { id: 189, letterEl: ' ', points: ' ' }, { id: 190, letterEl: ' ', points: ' ' }, { id: 191, letterEl: ' ', points: ' ' }, { id: 192, letterEl: ' ', points: ' ' }, { id: 193, letterEl: ' ', points: ' ' }, { id: 194, letterEl: ' ', points: ' ' }, { id: 195, letterEl: ' ', points: ' ' }, { id: 196, letterEl: ' ', points: ' ' }, { id: 197, letterEl: ' ', points: ' ' }, { id: 198, letterEl: ' ', points: ' ' }, { id: 199, letterEl: ' ', points: ' ' }, { id: 200, letterEl: ' ', points: ' ' }, { id: 201, letterEl: ' ', points: ' ' }, { id: 202, letterEl: ' ', points: ' ' }, { id: 203, letterEl: ' ', points: ' ' }, { id: 204, letterEl: ' ', points: ' ' }, { id: 205, letterEl: ' ', points: ' ' }, { id: 206, letterEl: ' ', points: ' ' }, { id: 207, letterEl: ' ', points: ' ' }, { id: 208, letterEl: ' ', points: ' ' }, { id: 209, letterEl: ' ', points: ' ' }, { id: 210, letterEl: ' ', points: ' ' }, { id: 211, letterEl: ' ', points: ' ' }, { id: 212, letterEl: ' ', points: ' ' }, { id: 213, letterEl: ' ', points: ' ' }, { id: 214, letterEl: ' ', points: ' ' }, { id: 215, letterEl: ' ', points: ' ' }, { id: 216, letterEl: ' ', points: ' ' }, { id: 217, letterEl: ' ', points: ' ' }, { id: 218, letterEl: ' ', points: ' ' }, { id: 219, letterEl: ' ', points: ' ' }, { id: 220, letterEl: ' ', points: ' ' }, { id: 221, letterEl: ' ', points: ' ' }, { id: 222, letterEl: ' ', points: ' ' }, { id: 223, letterEl: ' ', points: ' ' }, { id: 224, letterEl: ' ', points: ' ' }, { id: 225, letterEl: ' ', points: ' ' }];

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tiles = exports.tiles = [{ name: " _ ", count: 2, points: 0 }, { name: "A", count: 9, points: 1 }, { name: "B", count: 2, points: 3 }, { name: "C", count: 2, points: 3 }, { name: "D", count: 4, points: 2 }, { name: "E", count: 12, points: 1 }, { name: "F", count: 2, points: 4 }, { name: "G", count: 3, points: 2 }, { name: "H", count: 2, points: 4 }, { name: "I", count: 9, points: 1 }, { name: "J", count: 1, points: 8 }, { name: "K", count: 1, points: 5 }, { name: "L", count: 4, points: 1 }, { name: "M", count: 2, points: 3 }, { name: "N", count: 6, points: 1 }, { name: "O", count: 8, points: 1 }, { name: "P", count: 2, points: 3 }, { name: "Q", count: 1, points: 10 }, { name: "R", count: 6, points: 1 }, { name: "S", count: 4, points: 1 }, { name: "T", count: 6, points: 1 }, { name: "U", count: 4, points: 1 }, { name: "V", count: 2, points: 4 }, { name: "W", count: 2, points: 4 }, { name: "X", count: 1, points: 8 }, { name: "Y", count: 2, points: 4 }, { name: "Z", count: 1, points: 10 }];

},{}]},{},[2]);
