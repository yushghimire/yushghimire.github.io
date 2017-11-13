var main = document.getElementById('main-wrapper');
var bodies = document.getElementsByTagName('body');
var unOrderedList = document.createElement('ul');

unOrderedList.style.fontSize = '15px';

bodies[0].appendChild(unOrderedList);

main.style.width = '1000px';
main.style.height = '500px';
main.style.position = 'relative';
main.style.backgroundColor = 'yellow';

var getRandomValue = function(upperLimit, lowerLimit) {

  return Math.random() * (upperLimit - lowerLimit);
};

function Ant(antId) {

  this.element = document.getElementById(antId);
  this.velocity = getRandomValue(3, 0);
  this.y = getRandomValue(500, 0);
  this.x = getRandomValue(500, 0);
  this.dx = getRandomValue(1, 0);
  this.dy = getRandomValue(1, 0);

  var that = this;

  this.changePosition = function() {

    return function() {

      // small box coordinates
      boxRightX = that.x + smallBoxWidth;
      boxDownY = that.y + smallBoxWidth;

      // boundary collision
      if (boxRightX >= mainBoxWidth) {

        that.dx = '-1';
      } else if (that.x <= 0) {

        that.dx = '1';
      }
      if (boxDownY >= mainBoxHeight) {

        that.dy = '-1';
      } else if (that.y <= 0) {

        that.dy = '1';
      }

      that.x = that.x + that.velocity * that.dx;
      that.y = that.y + that.velocity * that.dy;
      that.element.style.left = that.x + 'px';
      that.element.style.top = that.y + 'px';
    }
  }
}

for (var y = 0; y < 20; y++) {

  var div = document.createElement('div');

  div.style.width = '50px';
  div.style.height = '50px';
  div.style.backgroundColor = 'black';
  div.style.position = 'absolute';
  div.setAttribute('id', 'movingAnt' + y);

  main.appendChild(div);

  var ant = new Ant('movingAnt' + y);

  div.style.top = ant.y + 'px';
  div.style.left = ant.x + 'px';


  div.onclick = function() {

    this.parentNode.removeChild(this);

    var top = this.style.top;
    var left = this.style.left;
    var list = document.createElement('li');

    list.setAttribute('class', 'positionList');
    list.appendChild(document.createTextNode('left: ' + left + ' top: ' + top));

    unOrderedList.appendChild(list);
  };

  setInterval(ant.changePosition(), 10);
}

var smallBoxWidth = parseInt(div.style.width, 10);
var mainBoxWidth = parseInt(main.style.width, 10);
var mainBoxHeight = parseInt(main.style.height, 10);