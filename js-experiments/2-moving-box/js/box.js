//move the box with keys
var main = document.getElementById('main-wrapper');

main.style.width = '1000px';
main.style.height = '500px';
main.style.position = 'relative';
main.style.backgroundColor = 'yellow';

var div = document.createElement('div');

div.style.width = '10px';
div.style.height = '10px';
div.style.backgroundColor = 'red';
div.style.position = 'absolute';
div.style.top = '250px';
div.style.left = '250px';

main.appendChild(div);


function Box() {

  this.element = div;
  this.directionX = '';
  this.directionY = '';
  this.velocity = '',
    this.y = '';
  this.x = '';

  this.initialize = function(info) {

    this.directionX = info.directionX;
    this.directionY = info.directionY;
    this.velocity = info.velocity;
    this.y = info.y;
    this.x = info.x;
  };

  this.updateValue = function(updateData) {

    this.directionX = updateData.directionX;
    this.directionY = updateData.directionY;
    this.velocity = updateData.velocity;
    this.y = updateData.y;
    this.x = updateData.x;
  };

  this.changePosition = function() {

    boxRightX = this.x + 10;
    boxDownY = this.y + 10;

    if (boxRightX >= 1000) {

      this.directionX = '-1';
    } else if (this.x <= 0) {

      this.directionX = '1';
    }
    if (boxDownY >= 500) {

      this.directionY = '-1';
    } else if (this.y <= 0) {

      this.directionY = '1';
    }

    this.x = this.x + this.velocity * this.directionX;
    this.y = this.y + this.velocity * this.directionY;
    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';
  }
}
//moving left = -1, moving right =1
var box = new Box();

box.initialize({

  directionX: 1,
  directionY: 0,
  velocity: 1,
  y: 0,
  x: 0,
});

document.onkeydown = function(event) {

  var keyNumber = event.keyCode;

  console.log(event.keyCode);

  switch (keyNumber) {

    case 37:

      box.updateValue({
        directionX: -1,
        directionY: 0,
        velocity: 1,
        y: box.y,
        x: box.x
      });
      // changeDirection();
      break;

    case 38:

      box.updateValue({
        directionX: 0,
        directionY: -1,
        velocity: 1,
        y: box.y,
        x: box.x
      });
      // changeDirection();
      break;

    case 39:

      box.updateValue({
        directionX: 1,
        directionY: 0,
        velocity: 1,
        y: box.y,
        x: box.x
      });
      // changeDirection();
      break;

    case 40:

      box.updateValue({
        directionX: 0,
        directionY: 1,
        velocity: 1,
        y: box.y,
        x: box.x
      })
      // changeDirection();
  }
};

// var changeDirection = function(){
setInterval(function() {
  box.changePosition();
}, 1);
// }

// changeDirection();