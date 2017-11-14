const TOP_LIMIT = 0;
const LOWER_LIMIT = 350;
const WORLD_HEIGHT = 350;
const FLAPPY_PASS_HEIGHT = 200;
const KEY_CODES = {
  UP: 38
};

let moveWorld;

//random function 
let getRandom = function(upper, lower) {
  return Math.floor(Math.random() * (upper)) + lower;
}

class World {
  constructor() {
    this.mainWrapper = document.getElementById('mainWrapper');

    this.counter = 0;
    this.obstacle = '';
    this.obstacles = [];
    this.bird = new Bird(this.mainWrapper);
    this.background = new Background(this.mainWrapper);
  };

  createWorld() {
    this.mainWrapper.style.height = '500px';
    this.mainWrapper.style.width = '700px';
    this.mainWrapper.style.position = 'relative';
    this.mainWrapper.style.backgroundColor = 'brown';

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

        if (keyNumber === KEY_CODES.UP) {
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

      for (var x = 0; x < this.obstacles.length; x++) {
        this.obstacles[x].updateObstacle();
        if (this.obstacles[x].x <= 0) {
          this.obstacles[x].removeObstacle();
          this.obstacles.splice(this.obstacles[0], 1);
        }
      }

      if (this.obstacles.length !== 0) {
        this.collision();
      }
    }, 60)
  };

  resetWorld() {
    clearInterval(moveWorld);

    let endHeading = document.createElement('h1');
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


    endHeading.appendChild(document.createTextNode('Game Over'));
    restartButton.appendChild(document.createTextNode('Restart Game'));
    this.mainWrapper.appendChild(endHeading);
    this.mainWrapper.appendChild(restartButton);

    restartButton.onclick = (event) => {
      while (this.mainWrapper.hasChildNodes()) {
        this.mainWrapper.removeChild(this.mainWrapper.lastChild);
      }
      this.bird.alive = 1; //constructor not called when we delete the world objects
      this.createWorld();
    }
  }

  collision() {
    for (var x = 0; x < this.obstacles.length; x++) {
      if (this.bird.x <= this.obstacles[x].x + this.obstacles[x].width &&
        this.bird.x + this.bird.width >= this.obstacles[x].x &&
        this.bird.y <= this.obstacles[x].y + this.obstacles[x].heightTop &&
        this.bird.height + this.bird.y >= this.obstacles[x].y) {
        clearInterval(moveWorld);
        this.resetWorld();
      }
    }
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
    this.alive = 1;
    this.width = 50;
    this.height = 50;
    this.mainElement = parentElement;
    this.flappyHolder = document.createElement('div');
    this.flappyImage = document.createElement('img');
  };

  createBird() {
    this.flappyHolder.style.width = '50px';
    this.flappyHolder.style.height = '50px';
    this.flappyHolder.style.position = 'absolute';
    this.flappyHolder.style.left = this.x + 'px';
    this.flappyHolder.style.top = '20px';
    this.flappyImage.style.width = '100%';
    this.flappyImage.style.height = '100%';
    this.flappyImage.setAttribute('src', 'images/flappyBird.png');

    this.mainElement.appendChild(this.flappyHolder);
    this.flappyHolder.appendChild(this.flappyImage);

  };

  updateBird() {
    this.y = this.y + 5;
    this.flappyHolder.style.top = this.y + 'px';

    if (this.y <= TOP_LIMIT) {
      this.y = 20;
      this.alive = 0;
      return true;
    } else if (this.y >= LOWER_LIMIT) {
      this.y = 20;
      this.alive = 0;
      return true;
    } else {
      return false;
    }
  };

  moveBird(direction) {
    this.y = this.y + (-1) * direction * 50;
    this.flappyHolder.style.top = this.y + 'px';
  };
}

class Obstacle {
  constructor(parentElement) {
    this.x = 1200;
    this.y = 0;
    this.width = 100;
    this.heightTop = 0;
    this.mainElement = parentElement;
    this.pipeTop = document.createElement('div');
    this.pipeBottom = document.createElement('div');
  }

  createObstacle() {
    let heightTop = getRandom(100, 20);
    let heightBottom = WORLD_HEIGHT - heightTop - FLAPPY_PASS_HEIGHT;
    this.heightTop = heightTop;

    this.pipeBottom.style.width = this.width + 'px';
    this.pipeBottom.style.bottom = '85px';
    this.pipeBottom.style.left = this.x + 'px';
    this.pipeBottom.style.position = 'absolute';
    this.pipeBottom.style.height = heightBottom + 'px';
    this.pipeBottom.style.backgroundRepeat = 'repeat-y';
    this.pipeBottom.style.backgroundPosition = 'center';
    this.pipeBottom.style.backgroundImage = 'url(images/pipe.png)';

    this.pipeTop.style.top = '0px';
    this.pipeTop.style.width = this.width + 'px';
    this.pipeTop.style.position = 'absolute';
    this.pipeTop.style.left = this.x + 'px';
    this.pipeTop.style.height = heightTop + 'px';
    this.pipeTop.style.border = '1px solid';
    this.pipeTop.style.backgroundRepeat = 'repeat-y';
    this.pipeTop.style.backgroundPosition = 'center';
    this.pipeTop.style.backgroundImage = 'url(images/pipe.png)';


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
let newWorld = new World();
newWorld.createWorld();