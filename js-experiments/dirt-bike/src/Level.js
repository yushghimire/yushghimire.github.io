class Level {

  constructor(stage) {

    this.path = '';
    this.newCoin = '';

    this.coins = [];
    this.paths = [];


    switch (stage) {

      case 1:
        this.stage = levelFirst;
        break;

      case 2:
        this.stage = levelSecond;
        break;

      case 3:
        this.stage = levelThird;
        break;

      case 4:
        this.stage = levelFourth;

    }

    //draw coin
    this.stage.lines.forEach((line) => {
      let midPoint;

      midPoint = Math.floor(line.startPosition + (line.endPosition - line.startPosition) / 2);

      if (line.yPoint) {
       
        this.newCoin = new Coin(midPoint * levelFirst.width, line.yPoint);
        this.coins.push(this.newCoin);

      }
    })
  };

  draw(viewWindow) {

    let y1, y2, temp, angle, counterUp, counterDown;

    let imageLevel = new Image();
    let imageFinish = new Image();

    imageLevel.src = this.stage.path;
    imageFinish.src = 'images/finish-line.png';

    angle = 25;
    counterUp = 0;
    counterDown = 0;

    //declare array to empty
    this.paths = [];

    for (let i = 0; i < this.stage.length; i++) {

      let offsetUp, offsetDown;
      let pathIndex = 0;
      let pathOption = 0;

      //checking for the path 

      //check for straight line
      for (let j = 0; j < this.stage.lines.length; j++) {

        if (i >= this.stage.lines[j].startPosition && i <= this.stage.lines[j].endPosition) {

          pathIndex = j;
          pathOption = 1;
          break;
        }
      }

      //check for curves
      if (!pathOption) {
        for (let j = 0; j < this.stage.curves.length; j++) {

          if (i >= this.stage.curves[j].startPosition && i <= this.stage.curves[j].endPosition) {

            pathOption = 2;
            pathIndex = j;

            break;
          }
        }
      }

      //check for slopes
      if (!pathOption) {
        for (let j = 0; j < this.stage.slopes.length; j++) {

          if (i >= this.stage.slopes[j].startPosition && i <= this.stage.slopes[j].endPosition) {

            if (this.stage.slopes[j].direction < 0)
              pathOption = 3;
            else
              pathOption = 4;
            pathIndex = j;
            break;
          }
        }
      }

      //for the gaps
      if (!pathOption)
        pathOption = 5;

      switch (pathOption) {

        case 1:
          //lines
          let check = pathCreator.line(this.stage.lines[pathIndex].yPoint);
          //check to continue the same path continues the same path 
          if (check === 0)
            y1 = y2;
          else
            y1 = y2 = check;

          break;

        case 2:
          //curves
          y1 = pathCreator.curve(i);
          y2 = pathCreator.curve(i + 1);

          break;

        case 3:
          //slope upward
          temp = y2;

          counterUp++;

          y1 = pathCreator.slope(counterUp, this.stage.slopes[pathIndex].angle);
          y2 = pathCreator.slope(counterUp + 1, this.stage.slopes[pathIndex].angle);

          offsetUp = temp - y1;
          y1 = y1 + offsetUp;
          y2 = y2 + offsetUp;

          break;

        case 4:
          //slope downward
          counterDown++;

          offsetDown = pathCreator.slope(counterUp, angle);

          y1 = pathCreator.slope(counterDown, -this.stage.slopes[pathIndex].angle);
          y2 = pathCreator.slope(counterDown + 1, -this.stage.slopes[pathIndex].angle);

          y1 = y1 + offsetDown - this.stage.slopes[pathIndex].offset;
          y2 = y2 + offsetDown - this.stage.slopes[pathIndex].offset;

          break;

        case 5:
          //for the gaps
          y1 = y2 = 800;
      }

      //make the grasses
      ctx.drawImage(imageLevel, i * this.stage.width - viewWindow.x, y2, this.stage.width, this.stage.imageHeight);

      this.path = new Path(i * this.stage.width, y1, i * this.stage.width + this.stage.width, y2);
      this.paths.push(this.path);
    }


    //draw the coins
    for (let i = 0; i < this.coins.length; i++) {
      this.coins[i].draw(viewWindow);
    }

    //in the end
    ctx.drawImage(imageFinish, (this.stage.length - 15) * this.stage.width - viewWindow.x, y2 - 80, 150, 80);

    for (let i = 0; i < this.paths.length; i++) {

      this.paths[i].draw(viewWindow);
    }
  };
}