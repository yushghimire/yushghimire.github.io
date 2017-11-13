var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var phase = 0;
var maxCircleRadius = 20;
var count = 0;
var numRows = 5;
var numCols = 10;
var y;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  count++;
  phase = count * 0.02;
  var x = canvas.width/10;
 
  var sizeOffset = (Math.sin(phase) + 1) * 0.5;
  var circleRadius = sizeOffset * maxCircleRadius;


  for (var cols = 0; cols < numCols; cols++) {
    x += 40;
    y = (canvas.width/5) + cols * 10;
    for (var rows = 0; rows < numRows; rows++) {  
      y = y + Math.sin(phase) * 50 + 2 * rows;
      ctx.beginPath();
      ctx.arc(x, y, circleRadius, 0, Math.PI * 2, false);
      ctx.fillStyle = 'red';
      ctx.fill();
      ctx.closePath();
    }
  }
}

setInterval(draw, 20);