class Game {

  constructor() {

    this.level = 0;
    this.wheels = [];
    this.levels = [];
    this.point = 0;
    this.gameTimer = 0;
    this.gameOverChoice = 0;

    this.newLevel = new Level();
    this.bikeImage = new Image();

    this.newWindow = new Window(startPosition.x, startPosition.y);
    this.newWheel = new Wheel(startPosition.x, startPosition.y, 25);
  };

  init() {

    let levelLists = document.getElementsByTagName('li');
    let startMenu = document.getElementById('startMenu');
    let buttonHolder = document.getElementById('buttonHolder');

    this.wheels.push(this.newWheel);
    this.levels.push(this.newLevel);
    
    buttonHolder.onclick = () => {
      startMenu.style.display = 'none';
      levelSelector.style.display = 'block';
    }

    for (let i = 0; i < levelLists.length; i++) {
      levelLists[i].onclick = () => {
        levelSelector.style.display = 'none';
        gameHolder.style.display = 'block';
        this.level = i + 1;
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

    this.gameTimer++;

    if (this.gameTimer === 3600)
      this.gameTimer = 0;

    //game update
    this.update();

    //draw path
    this.draw();
  };

  draw() {

    switch (this.level) {
      case 1:
        //level1
        this.newLevel.draw(this.newWindow, levelFirst);
        canvas.style.backgroundImage = 'url(images/jungle.jpg)';
        break;

      case 2:
        //level2
        this.newLevel.draw(this.newWindow, levelSecond);
        canvas.style.backgroundImage = 'url(images/snowImage.jpg)';
        break;

      case 3:
        //level3 
        this.newLevel.draw(this.newWindow, levelThird);
        canvas.style.backgroundImage = 'url(images/fire.jpg)';
        break;

      case 4:
        //level4 
        this.newLevel.draw(this.newWindow, levelFourth);
        canvas.style.backgroundImage = 'url(images/desert.jpg)';
    }

    //draw player
    this.newWheel.draw(this.newWindow);

    if (this.newWheel.x >= (levelFirst.width * (levelFirst.length - 15))) {

      this.newWheel.isAlive = false;
    }
  };

  update() {

    let adjx, adjy, playerPosition;
    let gameOver = document.getElementById('gameOver');
    let gameOverLists = document.getElementById('gameOver').getElementsByTagName('li');

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

    //falls off the platform
    if (!this.newWheel.isAlive) {
      gameOver.style.display = 'block';
       window.cancelAnimationFrame(animationFrame);

      for (let i = 0; i < gameOverLists.length; i++) {

        gameOverLists[i].onclick = () => {
          switch (i) {
            case 0:
              console.log('restart');
              break;
            case 1:
              
              break;
            case 2:
              console.log('exit');
              break;
          }
        }
      }
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

    //last know velocity
    // newWheel.lastVelocity.x = newWheel.velocity.x;
    // newWheel.lastVelocity.y = newWheel.velocity.y;

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
}