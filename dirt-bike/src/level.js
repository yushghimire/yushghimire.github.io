class Level {

  constructor() {
    this.path = '';
    this.paths = [];
  };

  draw(viewWindow, stage) {

    let y1, y2, temp, angle, counterUp, counterDown;

    let imageLevel = new Image();
    let imageFinish = new Image();

    imageLevel.src = stage.path;
    imageFinish.src = 'images/finish-line.png';

    angle = 25;
    counterUp = 0;
    counterDown = 0;

    //declare array to empty
    this.paths = [];

    for (let i = 0; i < stage.length; i++) {

      let offsetUp, offsetDown;
      let pathIndex = 0;
      let pathOption = 0;

      //checking for the path 

      //check for straight line
      for (let j = 0; j < stage.lines.length; j++) {

        if (i >= stage.lines[j].startPosition && i <= stage.lines[j].endPosition) {

          pathIndex = j;
          pathOption = 1;
          break;
        }
      }

      //check for curves
      if (!pathOption) {
        for (let j = 0; j < stage.curves.length; j++) {

          if (i >= stage.curves[j].startPosition && i <= stage.curves[j].endPosition) {

            pathOption = 2;
            pathIndex = j;

            break;
          }
        }
      }

      //check for slopes
      if (!pathOption) {
        for (let j = 0; j < stage.slopes.length; j++) {

          if (i >= stage.slopes[j].startPosition && i <= stage.slopes[j].endPosition) {

            if (stage.slopes[j].direction < 0)
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
          let check = pathCreator.line(stage.lines[pathIndex].yPoint);
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

          y1 = pathCreator.slope(counterUp, stage.slopes[pathIndex].angle);
          y2 = pathCreator.slope(counterUp + 1, stage.slopes[pathIndex].angle);

          offsetUp = temp - y1;
          y1 = y1 + offsetUp;
          y2 = y2 + offsetUp;

          break;

        case 4:
          //slope downward

          counterDown++;

          offsetDown = pathCreator.slope(counterUp, angle);

          y1 = pathCreator.slope(counterDown, -stage.slopes[pathIndex].angle);
          y2 = pathCreator.slope(counterDown + 1, -stage.slopes[pathIndex].angle);

          y1 = y1 + offsetDown - stage.slopes[pathIndex].offset;
          y2 = y2 + offsetDown - stage.slopes[pathIndex].offset;

          break;

        case 5:
          //for the gaps
          y1 = y2 = 800;
      }

      //make the grasses
      ctx.drawImage(imageLevel, i * stage.width - viewWindow.x, y2, stage.width, stage.imageHeight);

      this.path = new Path(i * stage.width, y1, i * stage.width + stage.width, y2);
      this.paths.push(this.path);
    }

    //in the end
    ctx.drawImage(imageFinish, (stage.length - 15) * stage.width - viewWindow.x, y2 - 80, 150, 80);

    for (let i = 0; i < this.paths.length; i++) {
      this.paths[i].draw(viewWindow);
    }
  };
}