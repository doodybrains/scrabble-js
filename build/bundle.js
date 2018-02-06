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
  var playWord = document.getElementById('play-word');
  var board = document.getElementById('board');
  var currentPlayer = document.getElementById('current-player');

  var boardSpaces = _spaces.spaces.map(function (sp, i) {
    return '<div class=\'space ' + sp.type + '\'>' + sp.type + '</div>';
  });

  playWord.style.display = 'none';
  board.innerHTML = boardSpaces.join(" ");
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

function drawBoard(tileSpaces, player) {
  var tileBoard = document.getElementById('tile-board');
  var boardSpaces = [];

  if (tileSpaces) {
    boardSpaces = tileSpaces.map(function (tp, i) {

      return '<div id=\'' + tp.id + '\' class=\'space tile-space\'>' + tp.letterEl + '</div>';
    });

    tileBoard.innerHTML = boardSpaces.join(" ");
  }

  switchPlayer(player);
  addClickHandler();
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

function chooseTiles() {
  var leftOverLetters = LetterBag();
  var amount = 7;
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
  for (var i = 0; i < chosenLetters.length; i++) {
    leftOverLetters.splice(chosenLetters[i], 1);
  }

  leftOverTiles = leftOverLetters;
}

function getTileShelf(player) {
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
    return '<div data-id=\'' + letter.name + '\' class=\'letter on-shelf\'>' + letter.name + '<span class="points">' + letter.points + '</span></div>';
  });

  tileShelf.innerHTML = chosenTiles.join(" ");
  getLettersButton.style.display = 'none';

  var htmlTiles = document.getElementsByClassName("letter");

  var _loop2 = function _loop2() {
    var tile = htmlTiles[i];
    htmlTiles[i].addEventListener('click', function (evt) {
      return addToWord(tile, playerTiles);
    });
  };

  for (var i = 0; i < htmlTiles.length; i++) {
    _loop2();
  }
}

function addToWord(tile, tilesOnShelf) {
  var tileShelf = document.getElementById("tile-shelf");
  var clickedLetter = tile.getAttribute('data-id');
  var wordLetter = '<div>' + clickedLetter + '</div>';

  word.push(wordLetter);

  for (var i = 0; i < tilesOnShelf.length; i++) {
    var _tile3 = tilesOnShelf[i];
    if (_tile3.name === clickedLetter) {
      tilesOnShelf.splice(tilesOnShelf[i], 1);
    }
  }

  tile.style.border = "3px solid #ff00ff";

  return tilesOnShelf;
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
var tileSpaces = exports.tileSpaces = [{ id: 1, letterEl: ' ' }, { id: 2, letterEl: ' ' }, { id: 3, letterEl: ' ' }, { id: 4, letterEl: ' ' }, { id: 5, letterEl: ' ' }, { id: 6, letterEl: ' ' }, { id: 7, letterEl: ' ' }, { id: 8, letterEl: ' ' }, { id: 9, letterEl: ' ' }, { id: 10, letterEl: ' ' }, { id: 11, letterEl: ' ' }, { id: 12, letterEl: ' ' }, { id: 13, letterEl: ' ' }, { id: 14, letterEl: ' ' }, { id: 15, letterEl: ' ' }, { id: 16, letterEl: ' ' }, { id: 17, letterEl: ' ' }, { id: 18, letterEl: ' ' }, { id: 19, letterEl: ' ' }, { id: 20, letterEl: ' ' }, { id: 21, letterEl: ' ' }, { id: 22, letterEl: ' ' }, { id: 23, letterEl: ' ' }, { id: 24, letterEl: ' ' }, { id: 25, letterEl: ' ' }, { id: 26, letterEl: ' ' }, { id: 27, letterEl: ' ' }, { id: 28, letterEl: ' ' }, { id: 29, letterEl: ' ' }, { id: 30, letterEl: ' ' }, { id: 31, letterEl: ' ' }, { id: 32, letterEl: ' ' }, { id: 33, letterEl: ' ' }, { id: 34, letterEl: ' ' }, { id: 35, letterEl: ' ' }, { id: 36, letterEl: ' ' }, { id: 36, letterEl: ' ' }, { id: 38, letterEl: ' ' }, { id: 39, letterEl: ' ' }, { id: 40, letterEl: ' ' }, { id: 41, letterEl: ' ' }, { id: 42, letterEl: ' ' }, { id: 43, letterEl: ' ' }, { id: 44, letterEl: ' ' }, { id: 45, letterEl: ' ' }, { id: 46, letterEl: ' ' }, { id: 47, letterEl: ' ' }, { id: 48, letterEl: ' ' }, { id: 49, letterEl: ' ' }, { id: 50, letterEl: ' ' }, { id: 51, letterEl: ' ' }, { id: 52, letterEl: ' ' }, { id: 53, letterEl: ' ' }, { id: 54, letterEl: ' ' }, { id: 55, letterEl: ' ' }, { id: 56, letterEl: ' ' }, { id: 57, letterEl: ' ' }, { id: 58, letterEl: ' ' }, { id: 59, letterEl: ' ' }, { id: 60, letterEl: ' ' }, { id: 61, letterEl: ' ' }, { id: 62, letterEl: ' ' }, { id: 63, letterEl: ' ' }, { id: 64, letterEl: ' ' }, { id: 65, letterEl: ' ' }, { id: 66, letterEl: ' ' }, { id: 67, letterEl: ' ' }, { id: 68, letterEl: ' ' }, { id: 69, letterEl: ' ' }, { id: 70, letterEl: ' ' }, { id: 71, letterEl: ' ' }, { id: 72, letterEl: ' ' }, { id: 73, letterEl: ' ' }, { id: 74, letterEl: ' ' }, { id: 75, letterEl: ' ' }, { id: 76, letterEl: ' ' }, { id: 77, letterEl: ' ' }, { id: 78, letterEl: ' ' }, { id: 79, letterEl: ' ' }, { id: 80, letterEl: ' ' }, { id: 81, letterEl: ' ' }, { id: 82, letterEl: ' ' }, { id: 83, letterEl: ' ' }, { id: 84, letterEl: ' ' }, { id: 85, letterEl: ' ' }, { id: 86, letterEl: ' ' }, { id: 87, letterEl: ' ' }, { id: 88, letterEl: ' ' }, { id: 89, letterEl: ' ' }, { id: 90, letterEl: ' ' }, { id: 91, letterEl: ' ' }, { id: 92, letterEl: ' ' }, { id: 93, letterEl: ' ' }, { id: 94, letterEl: ' ' }, { id: 95, letterEl: ' ' }, { id: 96, letterEl: ' ' }, { id: 97, letterEl: ' ' }, { id: 98, letterEl: ' ' }, { id: 99, letterEl: ' ' }, { id: 100, letterEl: ' ' }, { id: 101, letterEl: ' ' }, { id: 102, letterEl: ' ' }, { id: 103, letterEl: ' ' }, { id: 104, letterEl: ' ' }, { id: 105, letterEl: ' ' },

//mid e
{ id: 106, letterEl: ' ' }, { id: 107, letterEl: ' ' }, { id: 108, letterEl: ' ' }, { id: 109, letterEl: ' ' }, { id: 110, letterEl: ' ' }, { id: 111, letterEl: ' ' }, { id: 112, letterEl: ' ' }, { id: 113, letterEl: ' ' }, { id: 114, letterEl: ' ' }, { id: 115, letterEl: ' ' }, { id: 116, letterEl: ' ' }, { id: 117, letterEl: ' ' }, { id: 118, letterEl: ' ' }, { id: 119, letterEl: ' ' }, { id: 120, letterEl: ' ' },
//mid e


{ id: 121, letterEl: ' ' }, { id: 122, letterEl: ' ' }, { id: 123, letterEl: ' ' }, { id: 124, letterEl: ' ' }, { id: 125, letterEl: ' ' }, { id: 126, letterEl: ' ' }, { id: 127, letterEl: ' ' }, { id: 128, letterEl: ' ' }, { id: 129, letterEl: ' ' }, { id: 130, letterEl: ' ' }, { id: 131, letterEl: ' ' }, { id: 132, letterEl: ' ' }, { id: 133, letterEl: ' ' }, { id: 134, letterEl: ' ' }, { id: 135, letterEl: ' ' }, { id: 136, letterEl: ' ' }, { id: 137, letterEl: ' ' }, { id: 138, letterEl: ' ' }, { id: 139, letterEl: ' ' }, { id: 140, letterEl: ' ' }, { id: 141, letterEl: ' ' }, { id: 142, letterEl: ' ' }, { id: 143, letterEl: ' ' }, { id: 144, letterEl: ' ' }, { id: 145, letterEl: ' ' }, { id: 146, letterEl: ' ' }, { id: 147, letterEl: ' ' }, { id: 148, letterEl: ' ' }, { id: 149, letterEl: ' ' }, { id: 150, letterEl: ' ' }, { id: 151, letterEl: ' ' }, { id: 152, letterEl: ' ' }, { id: 153, letterEl: ' ' }, { id: 154, letterEl: ' ' }, { id: 155, letterEl: ' ' }, { id: 156, letterEl: ' ' }, { id: 157, letterEl: ' ' }, { id: 158, letterEl: ' ' }, { id: 159, letterEl: ' ' }, { id: 160, letterEl: ' ' }, { id: 161, letterEl: ' ' }, { id: 162, letterEl: ' ' }, { id: 163, letterEl: ' ' }, { id: 164, letterEl: ' ' }, { id: 165, letterEl: ' ' }, { id: 166, letterEl: ' ' }, { id: 167, letterEl: ' ' }, { id: 168, letterEl: ' ' }, { id: 169, letterEl: ' ' }, { id: 170, letterEl: ' ' }, { id: 171, letterEl: ' ' }, { id: 172, letterEl: ' ' }, { id: 173, letterEl: ' ' }, { id: 174, letterEl: ' ' }, { id: 175, letterEl: ' ' }, { id: 176, letterEl: ' ' }, { id: 177, letterEl: ' ' }, { id: 178, letterEl: ' ' }, { id: 179, letterEl: ' ' }, { id: 180, letterEl: ' ' }, { id: 181, letterEl: ' ' }, { id: 182, letterEl: ' ' }, { id: 183, letterEl: ' ' }, { id: 184, letterEl: ' ' }, { id: 185, letterEl: ' ' }, { id: 186, letterEl: ' ' }, { id: 186, letterEl: ' ' }, { id: 188, letterEl: ' ' }, { id: 189, letterEl: ' ' }, { id: 190, letterEl: ' ' }, { id: 191, letterEl: ' ' }, { id: 192, letterEl: ' ' }, { id: 193, letterEl: ' ' }, { id: 194, letterEl: ' ' }, { id: 195, letterEl: ' ' }, { id: 196, letterEl: ' ' }, { id: 197, letterEl: ' ' }, { id: 198, letterEl: ' ' }, { id: 199, letterEl: ' ' }, { id: 200, letterEl: ' ' }, { id: 201, letterEl: ' ' }, { id: 202, letterEl: ' ' }, { id: 203, letterEl: ' ' }, { id: 204, letterEl: ' ' }, { id: 205, letterEl: ' ' }, { id: 206, letterEl: ' ' }, { id: 207, letterEl: ' ' }, { id: 208, letterEl: ' ' }, { id: 209, letterEl: ' ' }, { id: 210, letterEl: ' ' }, { id: 211, letterEl: ' ' }, { id: 212, letterEl: ' ' }, { id: 213, letterEl: ' ' }, { id: 214, letterEl: ' ' }, { id: 215, letterEl: ' ' }, { id: 216, letterEl: ' ' }, { id: 217, letterEl: ' ' }, { id: 218, letterEl: ' ' }, { id: 219, letterEl: ' ' }, { id: 220, letterEl: ' ' }, { id: 221, letterEl: ' ' }, { id: 222, letterEl: ' ' }, { id: 223, letterEl: ' ' }, { id: 224, letterEl: ' ' }, { id: 225, letterEl: ' ' }];

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tiles = exports.tiles = [{ name: " _ ", count: 2, points: 0 }, { name: "A", count: 9, points: 1 }, { name: "B", count: 2, points: 3 }, { name: "C", count: 2, points: 3 }, { name: "D", count: 4, points: 2 }, { name: "E", count: 12, points: 1 }, { name: "F", count: 2, points: 4 }, { name: "G", count: 3, points: 2 }, { name: "H", count: 2, points: 4 }, { name: "I", count: 9, points: 1 }, { name: "J", count: 1, points: 8 }, { name: "K", count: 1, points: 5 }, { name: "L", count: 4, points: 1 }, { name: "M", count: 2, points: 3 }, { name: "N", count: 6, points: 1 }, { name: "O", count: 8, points: 1 }, { name: "P", count: 2, points: 3 }, { name: "Q", count: 1, points: 10 }, { name: "R", count: 6, points: 1 }, { name: "S", count: 4, points: 1 }, { name: "T", count: 6, points: 1 }, { name: "U", count: 4, points: 1 }, { name: "V", count: 2, points: 4 }, { name: "W", count: 2, points: 4 }, { name: "X", count: 1, points: 8 }, { name: "Y", count: 2, points: 4 }, { name: "Z", count: 1, points: 10 }];

},{}]},{},[2]);
