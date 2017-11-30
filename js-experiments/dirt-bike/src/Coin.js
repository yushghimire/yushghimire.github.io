class Coin {

  constructor(x, y) {
    
    this.x = x;
    this.y = y
    
    this.coinSprite = new SpriteSheet('images/coin-sprite-animation.png', 30, 30, 10);
    this.coinSound = new Sound('sounds/coin.mp3');
  };

  draw(viewWindow) {

    //coin sprite
    this.coinSprite.draw(this.x - viewWindow.x, this.y - 120);

  };

  update(timer) {

    this.coinSprite.update(timer);
  };


}