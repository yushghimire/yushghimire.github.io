//global declaration
var ANT_WIDTH = 30;
var ANT_HEIGHT = 30;
var MAX_BOX_WIDTH = 1000;
var MAX_BOX_HEIGHT = 500;
var main = document.getElementById('main-wrapper');
var bodies = document.getElementsByTagName('body');
var moveAnts;

//random value generator
var getRandomValue = function(upperLimit, lowerLimit) {
  return Math.random() * (upperLimit - lowerLimit);
};

function Background(elementId) {
  this.ant = '';
  this.ants = [];
  this.resetButton = document.createElement('button');
  this.mainElement = elementId;

  var that = this;

  this.create = function() {

    this.mainElement.style.width = '1000px';
    this.mainElement.style.height = '500px';
    this.mainElement.style.position = 'relative';
    this.mainElement.style.backgroundColor = 'yellow';

    var mainBoxWidth = parseInt(this.mainElement.style.width, 10);
    var mainBoxHeight = parseInt(this.mainElement.style.height, 10);

    var heading = document.createElement('h1');
    var startButton = document.createElement('button');

    this.mainElement.appendChild(heading);
    this.mainElement.appendChild(startButton);
    heading.style.color = 'red';
    heading.appendChild(document.createTextNode('Start Game'));
    startButton.appendChild(document.createTextNode('Start'));

    //start on click
    startButton.onclick = function() {
      that.mainElement.removeChild(heading);
      that.mainElement.removeChild(startButton);

      that.resetButton.appendChild(document.createTextNode('Reset Game'));
      bodies[0].appendChild(that.resetButton);

      for (var x = 0; x < 10; x++) {
        that.ant = new Ant(that.mainElement);
        that.ant.create();
        that.ants.push(that.ant);
      }

      moveAnts = setInterval(function() {

        for (var x = 0; x < that.ants.length; x++) {
          (function(antIndex) {
            antIndex.div.onclick = function() {
              var clickedAnt = antIndex;
              clickedAnt.antKill(clickedAnt.div);
              that.ants.splice(that.ants.indexOf(clickedAnt), 1);

              if (that.ants.length <= 0) {
                clearInterval(moveAnts);
                that.resetGame();
              }
            }

            that.resetButton.onclick = function() {
              clearInterval(moveAnts);
              while (that.mainElement.hasChildNodes()) {
                that.mainElement.removeChild(that.mainElement.lastChild);
              }
              newGame.create();
              that.resetButton.removeChild(that.resetButton.lastChild);
              bodies[0].removeChild(bodies[0].lastChild);
            }
          })(that.ants[x]);

          that.ants[x].collisionCheck(that.ants);
          that.ants[x].update();
        }

      }, 10);
    }
  };

  this.resetGame = function() {

    var finishScreen = document.createElement('h1');
    var restartButton = document.createElement('button');

    finishScreen.style.color = 'red';
    finishScreen.style.margin = '0px auto';

    main.appendChild(finishScreen);
    main.appendChild(restartButton);

    finishScreen.appendChild(document.createTextNode('Game Over'));
    restartButton.appendChild(document.createTextNode('Restart'));

    restartButton.onclick = function() {

      that.create();
      finishScreen.parentNode.removeChild(finishScreen);
      restartButton.parentNode.removeChild(restartButton);

    }
  }
}


function Ant(parentElement) {
  this.mainElement = parentElement;
  this.width = ANT_WIDTH;
  this.height = ANT_HEIGHT;
  this.div = '';
  this.x = 0;
  this.y = 0;
  this.dx = 0;
  this.dy = 0;
  this.velocity = 1;

  var that = this;

  this.create = function() {
    this.y = getRandomValue(500, 0);
    this.x = getRandomValue(1000, 0);
    this.dx = getRandomValue(1, 0);
    this.dy = getRandomValue(1, 0);
    this.velocity = getRandomValue(1, 5);
    this.div = document.createElement('div');
    var that = this;

    this.div.style.width = '50px';
    this.div.style.height = '50px';
    this.div.style.position = 'absolute';

    main.appendChild(this.div);

    smallBoxWidth = parseInt(this.div.style.width, 10);

    this.div.style.top = this.y + 'px';
    this.div.style.left = this.x + 'px';

    var antHolder = document.createElement('img');
    antHolder.style.width = '100%';
    antHolder.style.height = '100%';
    antHolder.setAttribute('src', 'images/ant.png');
    this.div.appendChild(antHolder);
  };

  this.update = function() {
    // small box coordinates
    boxRightX = this.x + smallBoxWidth;
    boxDownY = this.y + smallBoxWidth;
    // boundary collision
    if (boxRightX >= MAX_BOX_WIDTH) {

      this.dx = 1;
    } else if (that.x <= 0) {

      this.dx = -1;
    }
    if (boxDownY >= MAX_BOX_HEIGHT) {

      this.dy = 1;
    } else if (that.y <= 0) {

      this.dy = -1;
    }

    this.x = this.x + this.velocity * this.dx;
    this.y = this.y + this.velocity * this.dy;
    this.div.style.left = this.x + 'px';
    this.div.style.top = this.y + 'px';
  };

  this.collisionCheck = function(ants) {

    for (var x = 0; x < ants.length; x++) {

      var avoidSearch = ants.indexOf(this);
      //boxes collision
      if (avoidSearch === x) {
        //don nothing;
      } else {
        if (this.x <= ants[x].x + ants[x].width &&
          this.x + this.width >= ants[x].x &&
          this.y <= ants[x].y + ants[x].height &&
          this.height + this.y >= ants[x].y) {

          if (this.x > ants[x].x) {

            this.dx = -1;
            ants[x].dx = 1;

            if (this.y > ants[x].y) {

              this.dy = -1;
              ants[x].dy = 1;
            } else {

              ants[x].dy = -1;
              this.dy = 1;
            }
          } else {

            ants[x].dx = -1;
            this.dx = 1;

            if (this.y > ants[x].y) {

              this.dy = -1;
              ants[x].dy = 1;
            } else {

              ants[x].dy = -1;
              this.dy = 1;
            }
          }
        }
      }
    }
  };

  this.antKill = function(killId) {
    killId.parentNode.removeChild(killId);
  };
}

//start
var newGame = new Background(main);
newGame.create();