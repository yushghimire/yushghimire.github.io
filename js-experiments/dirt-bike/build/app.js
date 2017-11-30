/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Game_js__ = __webpack_require__(1);


const FRICTION = 0.9;
const GRAVITY = 0.3;

let width = 800;
let height = 500;

canvas.width = width;
canvas.height = height;

let games = [];

let Keys = {
  _pressed: {},

  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,

  isDown: function(keyCode) {
    return this._pressed[keyCode];
  },

  onKeydown: function(event) {
    this._pressed[event.keyCode] = true;
  },

  onKeyup: function(event) {
    delete this._pressed[event.keyCode];
  }
};

//key events
window.addEventListener('keyup', function(event) { Keys.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Keys.onKeydown(event); }, false);

//start here
let newGame = new __WEBPACK_IMPORTED_MODULE_0__Game_js__["Game"]();

games.push(newGame);

//recursively move the system
let animationFrame = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  null;

if (animationFrame !== null) {
  let recursiveAnim = function() {
    newGame.gameLoop();
    animationFrame(recursiveAnim);
  };
  // start the gameloop
  animationFrame(recursiveAnim);
} else {
  setInterval(newWorld.gameloop, 1000.0 / 60.0);
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Wheel_js__ = __webpack_require__(2);





/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Wheel {
  constructor(xPoint, yPoint, radius) {
    this.x = xPoint;
    this.y = yPoint;
    this.radius = radius;
    this.velocity = {
      x: 0,
      y: 0
    };
    this.topSpeed = 5;
    this.isJumping = false;
  };

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = 'yellow';
    ctx.closePath();

    ctx.stroke();
    ctx.fill();
  };

  update() {
    if (Keys.isDown(Keys.RIGHT)) {
      if (this.velocity.x < this.topSpeed) {
        this.velocity.x++;
      }
    }

    if (Keys.isDown(Keys.LEFT)) {
      if (this.velocity.x > -this.topSpeed) {
        this.velocity.x--;
      }
    }

    if (Keys.isDown(Keys.UP)) {
      if (!this.isJumping) {
        this.isJumping = true;
        this.velocity.y = - 2 * this.topSpeed;
      }
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;

    //friction application
    this.velocity.x *= FRICTION;

    //apply gravity
    this.velocity.y += GRAVITY;

    //make it stop when collision
    if (this.y >= height - this.radius) {
      this.y = height - this.radius;
      this.isJumping = false;
    }
  };
}
/* unused harmony export Wheel */



/***/ })
/******/ ]);