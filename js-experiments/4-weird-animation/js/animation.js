var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var phase = 0;
var speed = 0.03;
var maxCircleRadius = 5;
var frameCount = 0;
var numRows = 10;
var numCols = 10;
var numStrands = 2;
var y;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var x = 0
  var colOffset = 0;
  frameCount++;
  phase = frameCount * speed;

  for (var count = 0; count < numStrands; count++) {
    if (count === 0) {
      var strandPhase = phase;
    } else {
      var strandPhase = phase + count * Math.PI;
    }
    x = 0;
    for (var col = 0; col < numCols; col++) {
      x = x + 30;
      colOffset = (col * 2 * Math.PI) / 10;

      for (var row = 0; row < numRows; row += 1) {
        var y = canvas.height / 2 + row * 10 + Math.sin(strandPhase + colOffset) * 50;
        //sizeOffset changes the radius of the circle
        var sizeOffset = (Math.cos(strandPhase - (row * 0.1) + colOffset) + 1) * 0.5;
        var circleRadius = sizeOffset * maxCircleRadius;

        ctx.beginPath();
        ctx.arc(x, y, circleRadius, 0, Math.PI * 2, false);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

setInterval(draw, 20);