class Window {
  constructor(x, y) {

    this.x = x;
    this.y = y;
  
  };

  update(wheel) {  

    this.x = wheel.x - (canvas.width / 5) >> 0;
    
  };
}