const TOP_LIMIT = 0;
const LOWER_LIMIT = 350;
const KEY_CODES = {
  UP: 38
};

let moveWorld;

class World {
  constructor() {
    this.mainWrapper = document.getElementById('mainWrapper');
    this.background = new Background(this.mainWrapper);
    this.bird = new Bird(this.mainWrapper);
  };

  createWorld() {
    this.mainWrapper.style.height = '500px';
    this.mainWrapper.style.width = '700px';
    this.mainWrapper.style.backgroundColor = 'brown';

    this.background.createBackground();
    this.bird.createBird();

    moveWorld = setInterval(() => {
      this.background.updateBackground();
      let result = this.bird.updateBird();

      if (result === true) {
        this.resetWorld();
      }

      //keypress
      document.onkeydown = (event) => {

        let keyNumber = event.keyCode;
        let birdDirection = 0;

        if (keyNumber === KEY_CODES.UP) {
          //up
          birdDirection = 1;
          this.bird.moveBird(birdDirection);
        }

      }
    }, 60)
  };

  resetWorld() {
    clearInterval(moveWorld);

    let end = document.createElement('h1');
    let restartButton = document.createElement('button');

    end.style.textAlign = 'center';
    restartButton.style.display = 'block';
    restartButton.style.margin = '0px auto';

    end.appendChild(document.createTextNode('Game Over'));
    restartButton.appendChild(document.createTextNode('Restart Game'));
    this.mainWrapper.appendChild(end);
    this.mainWrapper.appendChild(restartButton);
  }
}

class Background {
  constructor(parentElement) {
    this.positionX = 0;
    this.mainElement = parentElement;
  };

  createBackground() {
    this.mainElement.style.width = '100%';
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
    this.y = 0;
    this.mainElement = parentElement;
    this.flappyHolder = document.createElement('div');
    this.flappyImage = document.createElement('img');
  };

  createBird() {
    this.flappyHolder.style.width = '50px';
    this.flappyHolder.style.height = '50px';
    this.flappyHolder.style.position = 'absolute';
    this.flappyHolder.style.left = '40px';
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
      return true;
    } else if (this.y >= LOWER_LIMIT) {
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


}

//initial
let newWorld = new World();
newWorld.createWorld();