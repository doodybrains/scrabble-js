(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTileShelf = exports.Board = undefined;

var _spaces = require('./spaces');

var _tiles = require('./tiles');

var leftOverTiles = Letters();
var playerOne = true;
var word = [];
var currentShelf = [];

function Board() {
  var board = document.getElementById('board');

  var boardSpaces = _spaces.spaces.map(function (sp, i) {
    return '<div class=\'space ' + sp.type + '\'>' + sp.type + '</div>';
  });

  board.innerHTML = boardSpaces.join(" ");
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

function getTileShelf() {
  var tileShelf = document.getElementById("tile-shelf");
  var getLettersButton = document.getElementById('get-letters');
  var playerTiles = chooseTiles();

  var chosenTiles = playerTiles.map(function (letter, i) {
    return '<div data-id=\'' + letter.name + '\' class=\'letter\'>' + letter.name + '<span class="points">' + letter.points + '</span></div>';
  });

  tileShelf.innerHTML = chosenTiles.join(" ");
  getLettersButton.style.display = 'none';

  var htmlTiles = document.getElementsByClassName("letter");

  var _loop = function _loop() {
    var tile = htmlTiles[i];
    htmlTiles[i].addEventListener('click', function (evt) {
      return addToWord(tile, playerTiles);
    });
  };

  for (var i = 0; i < htmlTiles.length; i++) {
    _loop();
  }
}

function addToWord(tile, tilesOnShelf) {
  var tileShelf = document.getElementById("tile-shelf");
  var clickedLetter = tile.getAttribute('data-id');
  var wordLetter = '<div>' + clickedLetter + '</div>';

  tile.style.display = 'none';
  word.push(wordLetter);

  for (var i = 0; i < tilesOnShelf.length; i++) {
    var _tile = tilesOnShelf[i];
    if (_tile.name === clickedLetter) {
      tilesOnShelf.splice(tilesOnShelf[i], 1);
    }
  }

  var wordWrapper = document.getElementById('word');
  wordWrapper.innerHTML = word.join(" ");

  console.log(word);
  return tilesOnShelf;
}

function getRandomNumber(letters) {
  return Math.floor(Math.random() * (letters - 0) + 0);
}

exports.Board = Board;
exports.getTileShelf = getTileShelf;

},{"./spaces":3,"./tiles":4}],2:[function(require,module,exports){
'use strict';

var _board = require('./board');

var getLettersButton = document.getElementById('get-letters');

(0, _board.Board)();

getLettersButton.addEventListener('click', function (evt) {
  return (0, _board.getTileShelf)();
});

},{"./board":1}],3:[function(require,module,exports){
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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tiles = exports.tiles = [{ name: "__", count: 2, points: 0 }, { name: "A", count: 9, points: 1 }, { name: "B", count: 2, points: 3 }, { name: "C", count: 2, points: 3 }, { name: "D", count: 4, points: 2 }, { name: "E", count: 12, points: 1 }, { name: "F", count: 2, points: 4 }, { name: "G", count: 3, points: 2 }, { name: "H", count: 2, points: 4 }, { name: "I", count: 9, points: 1 }, { name: "J", count: 1, points: 8 }, { name: "K", count: 1, points: 5 }, { name: "L", count: 4, points: 1 }, { name: "M", count: 2, points: 3 }, { name: "N", count: 6, points: 1 }, { name: "O", count: 8, points: 1 }, { name: "P", count: 2, points: 3 }, { name: "Q", count: 1, points: 10 }, { name: "R", count: 6, points: 1 }, { name: "S", count: 4, points: 1 }, { name: "T", count: 6, points: 1 }, { name: "U", count: 4, points: 1 }, { name: "V", count: 2, points: 4 }, { name: "W", count: 2, points: 4 }, { name: "X", count: 1, points: 8 }, { name: "Y", count: 2, points: 4 }, { name: "Z", count: 1, points: 10 }];

},{}]},{},[2]);
