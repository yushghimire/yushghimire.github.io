//change radian to degree
let radToDeg = function(rad) {
  return rad * (180 / Math.PI);
};

//get random Numbers
let getRandom = function(max, min) {
  return Math.floor(Math.random() * (max - min) + min); 
};

//for the next position of curve function
let getNextPoint = function(frequency, offset, step, width, center) {
  return (Math.sin(frequency * step + offset) * width + center) >> 0;
};

//path Creator
let pathCreator = {
  line: (y) => {
    return y
  },
  slope: (index, angle) => {
    let y = canvas.width / 2 - 30 * (index) * Math.tan(angle * Math.PI / 180);
    return y;
  },
  curve: (index) => {
    let y = getNextPoint(pathSet.frequency, pathSet.frequency * Math.PI / 3, index, pathSet.wavelength, pathSet.offset);
    return y;
  }
};
