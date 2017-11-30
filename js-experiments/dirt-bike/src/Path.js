class Path {
  constructor(x1, y1, x2, y2) {

    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.strokeWidth = 2;
    
  };

  draw(window) {

    ctx.beginPath();

    ctx.moveTo(this.x1 - window.x, this.y1);
    ctx.lineTo(this.x2 - window.x, this.y2);

    ctx.lineWidth = this.strokeWidth;
    ctx.strokeStyle = 'transparent';

    ctx.closePath();
    ctx.stroke();
    
  };
}