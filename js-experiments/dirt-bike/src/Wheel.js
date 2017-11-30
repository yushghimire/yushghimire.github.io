  class Wheel {

    constructor(xPoint, yPoint, radius) {

      this.dx = 0;
      this.dy = 0;
      this.temp = 0;
      this.angle = 0;
      this.x = xPoint;
      this.y = yPoint;
      this.lastCount = 0;
      this.lastAngle = 0;
      this.wheelieTime = 0;
      this.radius = radius;

      this.lastPoint = {
        x: 0,
        y: 0
      };
      this.velocity = {
        x: 0,
        y: 0
      };

      this.topSpeed = 15;
      this.isAlive = true;
      this.wheelieAngle = 0;
      this.angleCounter = 0;
      this.isFlying = false;
      this.isJumping = false;
      this.isFalling = false;

      this.newMoveSound = new Sound('sounds/bike-move.wav');
      this.newSprite = new SpriteSheet('images/bike-sprite.png', 90, 90, 2, true);
    };

    draw(window) {

      let angle = this.angle;

      canvasBike.width = width;
      canvasBike.height = height;

      if (this.isFlying && angle)
        this.temp = this.lastAngle;

      //offset for the bike angle
      if (this.angle > 0)
        angle -= 30 * Math.sin(this.angle * Math.PI / 180);

      else if (this.angle < 0)
        angle -= 15 * Math.sin(this.angle * Math.PI / 180);

      //rotate bike, wheelie and slopes
      ctxBike.save();

      ctxBike.translate(this.x - window.x, this.y);

      if (!this.isFlying || this.wheelieAngle)
        ctxBike.rotate((360 + angle + this.wheelieAngle) * Math.PI / 180);

      else
        ctxBike.rotate((360 + this.temp + this.wheelieAngle) * Math.PI / 180);

      if (this.wheelieAngle)
        this.newSprite.draw(-35, -65);
      //to fix the offset
      else
        this.newSprite.draw(-35, -59);

      ctxBike.translate(-(this.x - window.x), -this.y);

      ctxBike.restore();

    };

    update(window, timer) {

      let checkAngle;
      let timeHolder;
      let backFlipFlag = false;

      //for 360 flips in the ramp, mostly for 2nd rotation
      this.wheelieAngle = this.wheelieAngle % 360;
      checkAngle = this.wheelieAngle;

      if (this.isAlive) {
        //accelerate
        if (keys.isDown(keys.RIGHT) && !this.isFlying) {
          if (this.velocity.x < this.topSpeed) {

            this.velocity.x += 0.7;

            // if (timer % 2 === 0)
              //play sound
              // this.newMoveSound.play();

            if (this.angle && !this.isFalling && !this.isJumping) {
              this.velocity.y -= 2 * Math.tan(Math.abs(this.angle) * Math.PI / 180);
            }
          }
        }

        //brake and back
        if (keys.isDown(keys.LEFT) && !this.isFlying) {
          if (this.velocity.x > -1 && !(this.x < 50)) {

            this.velocity.x--;

            //stop sound
            this.newMoveSound.stop();
          }
        }

        //jump up
        if (keys.isDown(keys.SPACE)) {
          if (!this.isFalling && !this.isJumping && !this.angle) {

            this.isJumping = true;
            this.velocity.y = -0.5 * this.topSpeed; //impluse

          }
        } else {

          if (this.isJumping)
            this.isJumping = false;
        }

        //wheelie up
        if (keys.isDown(keys.UP)) {
          if (this.isFlying) {
            //only when jumping from the ramp
            checkAngle -= 8;

          } else {
            //normal wheelie
            checkAngle -= 3;
          }
        } else {

          //always applied when wheelie with bike
          if (checkAngle > -130 && checkAngle < 0 && !this.isFlying) {
            checkAngle += 4;

            //correction for the 4 
            checkAngle > 0 ? checkAngle = 0 : checkAngle;
          }
        }

        //wheelie down
        if (keys.isDown(keys.DOWN)) {
          if (this.isFlying) {
            //only applied when flying
            checkAngle += 10;
            backFlipFlag = true;

          } else if (checkAngle < 0)
            checkAngle++;
        }
      }

      //for clockwise turn
      if (checkAngle > 0)
        checkAngle -= 360;

      this.wheelieAngle = checkAngle;

      //count the time  in frame for the wheelie
      if (this.wheelieAngle)
        this.wheelieTime++;

      //to check for both types of rotation, anti and clockwise
      if ((checkAngle > 0 || checkAngle < -120) && !this.isFlying && !this.isJumping) {

        this.isAlive = false;
      }

      //only when alive move
      if (this.isAlive) {
        //gravity add, always
        this.velocity.y += GRAVITY;

        this.x += this.velocity.x + GRAVITY * Math.sin(this.angle * Math.PI / 180);
        this.y += this.velocity.y;

        //friction only on the ground
        if (!this.isFlying)
          this.velocity.x *= FRICTION;

        //air friction
        this.velocity.y *= AIR_FRICTION;

        //make the bike look like its moving
        if (this.velocity.x >> 0)
          this.newSprite.update(timer);
      }
    };
  }