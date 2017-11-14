const TOP_LIMIT = 0;
const LOWER_LIMIT = 350;
const WORLD_HEIGHT = 350;
const GRAVITY = 9.81;
const FLAPPY_PASS_HEIGHT = 100;
const WINDOW_WIDTH = window.innerWidth;
const KEY_CODES = {
  SPACE: 32
};
let countScore = 0;
let moveWorld;
let gameArray = [];

//random function 
let getRandom = ((upper, lower) => Math.floor(Math.random() * (upper)) + lower)

class World {
  constructor() {
    this.mainWrapper = document.getElementById('mainWrapper');
    this.score = 0;
    this.counter = 0;
    this.obstacle = '';
    this.obstacles = [];
    this.bird = new Bird(this.mainWrapper);
    this.background = new Background(this.mainWrapper);
  };

  createWorld() {
    this.mainWrapper.style.height = '500px';
    this.mainWrapper.style.width = '100%';
    this.mainWrapper.style.position = 'relative';
    this.mainWrapper.style.backgroundColor = 'brown';

    let startHeading = document.createElement('h1');
    let startButton = document.createElement('button');

    this.mainWrapper.appendChild(startHeading);
    this.mainWrapper.appendChild(startButton);

    startHeading.appendChild(document.createTextNode('Start Game'));
    startButton.appendChild(document.createTextNode('Start'));

    startButton.onclick = (event) => {
      this.mainWrapper.removeChild(startHeading);
      this.mainWrapper.removeChild(startButton);

      this.background.createBackground();
      this.bird.createBird();

      moveWorld = setInterval(() => {
        let result;

        this.background.updateBackground();
        result = this.bird.updateBird();

        if (result === true) {
          this.resetWorld();
        }

        //keypress
        document.onkeydown = (event) => {
          let birdDirection = 0;
          let keyNumber = event.keyCode;

          if (keyNumber === KEY_CODES.SPACE) {
            //up
            if (this.bird.alive === 1) {
              birdDirection = 1;
              this.bird.moveBird(birdDirection);
            }
          }
        }

        this.counter++;
        if (this.counter % 50 === 0) {
          this.obstacle = new Obstacle(this.mainWrapper);
          this.obstacles.push(this.obstacle);
          this.obstacle.createObstacle();
        }

        for (let x = 0; x < this.obstacles.length; x++) {
          this.obstacles[x].updateObstacle();
        }

        if (this.obstacles.length !== 0) {
          if (this.obstacles[0].x + this.obstacles[0].width <= 0) {
            this.obstacles[0].removeObstacle();
            this.obstacles.splice(this.obstacles[0], 1);
          }
          this.collision();
        }
      }, 40)
    }
  };

  resetWorld() {
    clearInterval(moveWorld);

    let endHeading = document.createElement('h1');
    let scoreHeading = document.createElement('h2');
    let restartButton = document.createElement('button');

    endHeading.style.lineHeight = '0';
    endHeading.style.textAlign = 'center';
    endHeading.style.position = "absolute";
    endHeading.style.zIndex = '10';
    endHeading.style.left = '500px';

    restartButton.style.display = 'block';
    restartButton.style.position = "absolute";
    restartButton.style.zIndex = '10';
    restartButton.style.margin = '0px auto';
    restartButton.style.left = '530px';
    restartButton.style.top = '50px';

    scoreHeading.style.position = "absolute";

    endHeading.appendChild(document.createTextNode('Game Over'));
    scoreHeading.appendChild(document.createTextNode('Score: ' + this.score));
    restartButton.appendChild(document.createTextNode('Restart Game'));

    this.mainWrapper.appendChild(endHeading);
    this.mainWrapper.appendChild(scoreHeading);
    this.mainWrapper.appendChild(restartButton);

    restartButton.onclick = (event) => {
      while (this.mainWrapper.hasChildNodes()) {
        this.mainWrapper.removeChild(this.mainWrapper.lastChild);
      }
      this.bird.alive = 1;
      gameArray.pop(this);
      start();
    }
  };

  collision() {
    this.obstacles.forEach((obstacle) => {

      if (this.bird.x <= obstacle.x + obstacle.width &&
        this.bird.x + this.bird.width >= obstacle.x) {
        countScore++;
        //everytime bird passes obstacle, the condition accepted 26 times
        if (countScore % 26 === 0) {
          this.score++;
        }
        if (this.bird.y <= obstacle.y + obstacle.heightTop ||
          this.bird.y + this.bird.height - 30 >= WORLD_HEIGHT - (obstacle.y + obstacle.heightBottom)) {
          clearInterval(moveWorld);
          this.resetWorld();
          this.bird.alive = 0;
        }
      }

    })
  };
}

class Background {
  constructor(parentElement) {
    this.positionX = 0;
    this.mainElement = parentElement;
  };

  createBackground() {
    this.mainElement.style.width = '100%';
    this.mainElement.style.height = '470px';
    this.mainElement.style.backgroundImage = 'url(images/flappy-back.png)';
    this.mainElement.style.backgroundRepeat = 'repeat-x';
  };

  updateBackground() {
    this.positionX = this.positionX - 10;
    this.mainElement.style.backgroundPositionX = this.positionX + 'px';
  };
}

class Bird {
  constructor(parentElement) {
    this.x = 300;
    this.y = 20;
    this.fVelocity = 0;
    this.iVelocity = 0;
    this.alive = 1;
    this.width = 50;
    this.height = 50;
    this.time = 0;
    this.dx = 0;
    this.mainElement = parentElement;
    this.flappyHolder = document.createElement('div');
    this.flappyImage = document.createElement('img');
  };

  createBird() {
    this.flappyHolder.style.width = '50px';
    this.flappyHolder.style.height = '50px';
    this.flappyHolder.style.position = 'absolute';
    this.flappyHolder.style.left = this.x + 'px';
    this.flappyHolder.style.top = this.y + 'px';
    this.flappyImage.style.width = '100%';
    this.flappyImage.style.height = '100%';
    this.flappyImage.setAttribute('src', 'images/flappyBird.png');

    this.mainElement.appendChild(this.flappyHolder);
    this.flappyHolder.appendChild(this.flappyImage);

  };

  //fall of the bird
  gravity() {
    let tempTime = this.time;
    this.iVelocity = this.fVelocity;
    this.fVelocity = this.iVelocity - GRAVITY * this.time;
    this.time = this.time + (40 / 1000);
    this.dx = this.fVelocity * (this.time - tempTime) - GRAVITY * (this.time + tempTime);
  };

  //automatic downward movement of bird
  updateBird() {
    this.y = this.y - this.dx;
    this.gravity();
    this.flappyHolder.style.top = this.y + 'px';

    if (this.y <= TOP_LIMIT) {
      //this.y = 20;
      this.alive = 0;
      return true;
    } else if (this.y >= LOWER_LIMIT) {
      //this.y = 20;
      this.alive = 0;
      return true;
    } else {
      return false;
    }
  };

  //movement from the keyboard
  moveBird(direction) {
    this.fVelocity = 0;
    this.time = 0;
    this.y = this.y + (-1) * direction * 50;
    this.flappyHolder.style.top = this.y + 'px';
  };
}

class Obstacle {
  constructor(parentElement) {
    this.x = WINDOW_WIDTH;
    this.y = 0;
    this.width = 80;
    this.mainElement = parentElement;

    let heightTop = getRandom(250, 20);
    let heightBottom = WORLD_HEIGHT - heightTop - FLAPPY_PASS_HEIGHT;

    this.heightTop = heightTop;
    this.heightBottom = heightBottom;

    this.pipeTop = document.createElement('div');
    this.pipeBottom = document.createElement('div');
  }

  createObstacle() {
    this.pipeTop.style.top = '0px';
    this.pipeTop.style.width = this.width + 'px';
    this.pipeTop.style.position = 'absolute';
    this.pipeTop.style.left = this.x + 'px';
    this.pipeTop.style.height = this.heightTop + 'px';
    this.pipeTop.style.backgroundRepeat = 'repeat-y';
    this.pipeTop.style.backgroundPosition = 'center';
    this.pipeTop.style.backgroundImage = 'url(images/pipe.png)';

    let pipeBottomImage = document.createElement('img');

    this.pipeBottom.style.width = this.width + 'px';
    this.pipeBottom.style.bottom = '85px';
    this.pipeBottom.style.left = this.x + 'px';
    this.pipeBottom.style.position = 'absolute';
    this.pipeBottom.style.height = this.heightBottom + 'px';
    this.pipeBottom.style.backgroundRepeat = 'repeat-y';
    this.pipeBottom.style.backgroundPosition = 'center';
    this.pipeBottom.style.backgroundImage = 'url(images/pipe.png)';

    this.mainElement.appendChild(this.pipeTop);
    this.mainElement.appendChild(this.pipeBottom);
  }

  updateObstacle() {
    this.x -= 5;
    this.pipeBottom.style.left = this.x + 'px';
    this.pipeTop.style.left = this.x + 'px';
  }

  removeObstacle() {
    this.mainElement.removeChild(this.pipeTop);
    this.mainElement.removeChild(this.pipeBottom);
  }
}

//initial
let start = () => {

  let newWorld = new World();
  newWorld.createWorld();
  gameArray.push(newWorld);

}

start();