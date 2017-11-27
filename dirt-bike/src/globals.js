let width = 800;
let height = 450;
let animationFrame;

let canvas = document.getElementById('worldCanvas');
let canvasBike = document.getElementById('bikeCanvas');
//holds the canvas element
let gameHolder = document.getElementById('gameHolder');
//holds the levels selector
let levelSelector = document.getElementById('levelSelector');

let ctx = canvas.getContext('2d');
let ctxBike = canvasBike.getContext('2d');

let imageObj = new Image();

canvas.width = width;
canvas.height = height;

//key events
window.addEventListener('keyup', function(event) { keys.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { keys.onKeydown(event); }, false);