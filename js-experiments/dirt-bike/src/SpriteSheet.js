class SpriteSheet {
  constructor(path, frameHeight, frameWidth, endFrame, bikeFlag) {

    this.framePerRow;
    this.frameSpeed = 0;
    this.currentFrame = 0;
    this.isBike = bikeFlag;
    this.endFrame = endFrame;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;

    this.image = new Image();
    this.image.src = path;

  };

  draw(x, y) {

    this.framePerRow = Math.floor(this.image.width / this.frameWidth);

    let row = Math.floor(this.currentFrame / this.framePerRow);
    let col = Math.floor(this.currentFrame % this.framePerRow);

    //draw Image
    if (this.isBike)
      
      ctxBike.drawImage(this.image, col * this.frameWidth, row * this.frameHeight,
      this.frameWidth, this.frameHeight, x, y, this.frameWidth, this.frameHeight);
    else

      ctx.drawImage(this.image, col * this.frameWidth, row * this.frameHeight,
      this.frameWidth, this.frameHeight, x, y, this.frameWidth, this.frameHeight);
 
  };

  update(counter) {
    this.frameSpeed = 4;

    //update to next frame
    if (this.counter === (this.frameSpeed - 1))
      this.currentFrame = (this.currentFrame + 1) % this.endFrame;

    //update counter 
    this.counter = counter % this.frameSpeed;
  };
}