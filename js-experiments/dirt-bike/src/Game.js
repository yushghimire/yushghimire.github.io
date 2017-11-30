class Game {

  constructor() {

    this.level = 0;
    this.point = 0;
    this.tempPoint = 0;
    this.gameTimer = 0;


    this.wheels = [];
    this.levels = [];

    this.newWheel = '';
    this.gameOver = '';
    this.newLevel = '';
    this.newWindow = '';
    this.startMenu = '';
    this.isStarted = false;

    this.newTime = new TimeCounter();

  };

  init() {

    let levelLists = document.getElementsByTagName('li');
    let buttonHolder = document.getElementById('buttonHolder');
    let backButtons = levelSelector.getElementsByTagName('span');

    this.startMenu = document.getElementById('startMenu');

    this.newWindow = new Window(startPosition.x, startPosition.y);
    this.newWheel = new Wheel(startPosition.x, startPosition.y, 25);

    this.wheels.push(this.newWheel);
    this.levels.push(this.newLevel);

    //starting play
    buttonHolder.onclick = () => {
      this.startMenu.style.display = 'none';
      levelSelector.style.display = 'table';
    }

    //back button in level selector
    backButtons[0].onclick = () => {
      this.startMenu.style.display = 'block';
      levelSelector.style.display = 'none'
    }

    //select different levels
    for (let i = 0; i < levelLists.length; i++) {
      levelLists[i].onclick = () => {

        levelSelector.style.display = 'none';
        gameHolder.style.display = 'block';
        this.level = i + 1;

        this.newLevel = new Level(this.level);
        this.isStarted = true;

        let audio = document.createElement('audio');
        audio.setAttribute('src', 'sounds/bike-pause.wav');
        audio.loop = true;
        
        document.body.appendChild(audio);
      }
    }

    //recursively move the system
    animationFrame = window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      null;

    let start = Date.now();

    let recursiveAnim = (timestamp) => {

      let progress = timestamp - start;
      this.gameLoop();

      if (progress < 2000)
        animationFrame = window.requestAnimationFrame(recursiveAnim);
    };

    animationFrame = window.requestAnimationFrame(recursiveAnim);
  };

  gameLoop() {

    if (this.newWheel.isAlive) {
      this.gameTimer++;

      if (this.gameTimer === 3600)
        this.gameTimer = 0;
    }

    //game update
    this.update();

    //draw path
    this.draw();
  };

  draw() {

    switch (this.level) {

      case 1:
        //level1
        this.newLevel.draw(this.newWindow);
        canvas.style.backgroundImage = 'url(images/jungle.jpg)';
        break;

      case 2:
        //level2
        this.newLevel.draw(this.newWindow);
        canvas.style.backgroundImage = 'url(images/snowImage.jpg)';
        break;

      case 3:
        //level3 
        this.newLevel.draw(this.newWindow);
        canvas.style.backgroundImage = 'url(images/fire.jpg)';
        break;

      case 4:
        //level4 
        this.newLevel.draw(this.newWindow);
        canvas.style.backgroundImage = 'url(images/desert.jpg)';
    }

    //draw player
    this.newWheel.draw(this.newWindow);


    //for the timer
    if (this.newWheel.isAlive && this.level) {

      this.newTime.setTime();
    }
  };

  update() {

    let adjx, adjy, playerPosition;
    let gameOverLists = document.getElementById('gameOver').getElementsByTagName('li');

    this.gameOver = document.getElementById('gameOver');

    ctx.save();
    ctxBike.save();

    // Use the identity matrix while clearing the canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctxBike.setTransform(1, 0, 0, 1, 0, 0);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctxBike.clearRect(0, 0, canvas.width, canvas.height);

    // Restore the transform
    ctx.restore();
    ctxBike.restore();

    if (this.isStarted) {
      //change the view with the movement of the bike
      this.newWindow.update(this.newWheel);
      this.newWheel.update(this.newWindow, this.gameTimer);

      //point of contact of the circle with the line, rcos@ and rsin@
      adjx = this.newWheel.x + (this.newWheel.radius * Math.cos((this.newWheel.angle + 90) * Math.PI / 180));
      adjy = this.newWheel.y + (this.newWheel.radius * Math.sin((this.newWheel.angle + 90) * Math.PI / 180));

      //finding the point of contact in the arrays of lines with the player
      playerPosition = parseInt(adjx / levelFirst.width);

      for (let i = 0; i < this.newLevel.paths.length; i++) {

        if (i === playerPosition && levelFirst.length > 0) {
          //10 is the offset
          this.collide(i, this.newWheel, adjx + Math.abs(Math.sin(this.newWheel.angle * Math.PI / 180)), adjy + 10 * Math.abs(Math.sin(this.newWheel.angle * Math.PI / 180)));
        }
      }

      //collision with the coins
      this.coinCollide();

      //draw the coins
      for (let i = 0; i < this.newLevel.coins.length; i++) {
        this.newLevel.coins[i].update(this.gameTimer);
      }

      //stop player when you reach end
      if (this.newWheel.x >= (levelFirst.width * (levelFirst.length - 5))) {

        let starIndex;
        let starHolder = document.getElementById('starHolder');
        let stars = starHolder.getElementsByTagName('li');

        // store the value of time of death
        if (this.newWheel.isAlive) {

          this.tempPoint = this.gameTimer - this.newWheel.wheelieTime;
        }

        this.newWheel.isAlive = false;

        this.point = this.tempPoint;

        switch (true) {

          case (this.point < THREE_STAR && this.newLevel.coins.length <= 0):
            starIndex = 3;
            break;

          case (this.point < TWO_STAR && this.newLevel.coins.length <= 2):
            starIndex = 2;
            break;

          case (this.point < ONE_STAR && this.newLevel.coins.length <= 3):
            starIndex = 1;
        }

        for (let i = 0; i < starIndex; i++) {

          stars[i].style.backgroundImage = 'url(images/star.png)';
        }

      }

      //falls off the platform or esc key for the menu
      if (!this.newWheel.isAlive || keys.isDown(keys.ESC)) {

        this.gameOver.style.display = 'block';

        for (let i = 0; i < gameOverLists.length; i++) {

          gameOverLists[i].onclick = () => {

            this.reset(i);
          };
        }
      }
    }
  };

  reset(choice) {

    //resset the game
    let tempLevel;
    let starHolder = document.getElementById('starHolder');
    let stars = starHolder.getElementsByTagName('li');

    for (let i = 0; i < 3; i++) {
      stars[i].style.backgroundImage = 'url(images/empty-star.png)';
    }

    this.point = 0;
    this.gameTimer = 0;
    this.newWheel.wheelieTime = 0;

    this.wheels.splice(this.wheels.indexOf(this.newWheel), 1);
    this.levels.splice(this.levels.indexOf(this.newLevel), 1);

    this.newTime.resetTime();

    this.newLevel.coins.forEach(() => {
      this.newLevel.coins.pop()
    })

    //draw coins in reset
    switch (this.level) {

      case 1:
        tempLevel = levelFirst;
        break;

      case 2:
        tempLevel = levelSecond;
        break;

      case 3:
        tempLevel = levelThird;
        break;

      case 4:
        tempLevel = levelFourth;

    }

    tempLevel.lines.forEach((line) => {
      let midPoint;

      midPoint = Math.floor(line.startPosition + (line.endPosition - line.startPosition) / 2);

      if (line.yPoint) {
        this.newLevel.newCoin = new Coin(midPoint * levelFirst.width, line.yPoint);
        this.newLevel.coins.push(this.newLevel.newCoin);
      }
    })

    switch (choice) {

      case 0:
        this.gameOver.style.display = 'none';

        this.newTime.resetTime();

        window.cancelAnimationFrame(animationFrame);
        //start again
        this.init();
        break;

      case 1:
        gameHolder.style.display = 'none';
        this.gameOver.style.display = 'none';
        levelSelector.style.display = 'table';

        this.level = 0;

        window.cancelAnimationFrame(animationFrame);

        this.init();
        break;

      case 2:
        gameHolder.style.display = 'none';
        this.gameOver.style.display = 'none';
        this.startMenu.style.display = 'block';

        this.level = 0;

        window.cancelAnimationFrame(animationFrame);

        this.init();
    }
  };

  //point of collision of bike with the platform, used for movement
  collide(index, newWheel, adjx, adjy) {

    let run = this.newLevel.paths[index].x2 - this.newLevel.paths[index].x1;
    let rise = this.newLevel.paths[index].y2 - this.newLevel.paths[index].y1;

    //slope of the tangent
    let slope = rise / run;
    let intersect = (this.newLevel.paths[index].y1) - (this.newLevel.paths[index].x1 * slope);
    let col = (slope * adjx) + intersect;

    let angle = radToDeg(Math.tan(rise / run));

    newWheel.angle = angle;

    // Collide with track
    if (newWheel.lastPoint.y < col && adjy > col) {

      newWheel.y = col + (newWheel.y - adjy);
      newWheel.isFlying = false;
      newWheel.isFalling = false;

    } else if (newWheel.angle - newWheel.lastAngle > 20) {

      setTimeout(() => {
        newWheel.isFlying = true;
      }, 10);

    } else {
      if (!newWheel.isJumping) {

        newWheel.isFalling = true;

      }
    }

    //last know point of x and y
    newWheel.lastPoint.x = newWheel.x;
    newWheel.lastPoint.y = newWheel.y;

    //last know angle
    newWheel.lastAngle = newWheel.angle;

    //boundary restrict
    if (newWheel.y >= height - newWheel.radius) {

      newWheel.y = height - newWheel.radius

      newWheel.angle = 0;
      newWheel.isAlive = false;
      newWheel.acceleration = 0;
      newWheel.isFalling = true;
      newWheel.isJumping = false;
    }
  };


  coinCollide() {

    if (this.newLevel.coins.length && this.newWheel.isAlive) {

      for (let i = 0; i < this.newLevel.coins.length; i++) {

        if (this.newWheel.x + this.newWheel.radius >= this.newLevel.coins[i].x &&
          this.newWheel.x - this.newWheel.radius <= this.newLevel.coins[i].x + 30 &&
          this.newWheel.y - this.newWheel.radius - 20 <= this.newLevel.coins[i].y - 120 + 30 &&
          this.newWheel.y + this.newWheel.radius + 20 >= this.newLevel.coins[i].y - 120) {

          this.newLevel.coins[i].coinSound.play();

          this.newLevel.coins.splice(this.newLevel.coins.indexOf(this.newLevel.coins[i]), 1);

        }
      }
    }
  };
}