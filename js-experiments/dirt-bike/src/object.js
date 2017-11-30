//key pressed
let keys = {

  _pressed: {},

  ESC: 27,
  SPACE: 32,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  

  isDown: function(keyCode) {
    return this._pressed[keyCode];
  },

  onKeydown: function(event) {
    this._pressed[event.keyCode] = true;
  },

  onKeyup: function(event) {
    delete this._pressed[event.keyCode];
  }

};

//start Position in canvas
let startPosition = {
  x: 50,
  y: canvas.height / 2
};


//total path
let pathSet = {
  frequency: 0.2,
  wavelength: 32,
  offset: 380,
  numLines: 5
};

//firstlevel
let levelFirst = {
  width: 20,
  length: 300,
  path: 'images/grass.png',
  imageHeight: 50,

  lines: [{
      startPosition: 0,
      endPosition: 10,
      yPoint: canvas.width / 2
    },
    {
      startPosition: 47,
      endPosition: 55,
      yPoint: 0
    },
    {
      startPosition: 65,
      endPosition: 89,
      yPoint: canvas.width / 2
    },
    {
      startPosition: 120,
      endPosition: 150,
      yPoint: canvas.width / 2
    },
    {
      startPosition: 201,
      endPosition: 239,
      yPoint: canvas.width / 2
    },
    {
      startPosition: 250,
      endPosition: 300,
      yPoint: 0
    }
  ],

  curves: [{
    startPosition: 11,
    endPosition: 46
  }],

  slopes: [{
      startPosition: 90,
      endPosition: 99,
      direction: -1,
      offset: 0,
      angle: 25
    },
    {
      startPosition: 151,
      endPosition: 170,
      direction: -1,
      offset: 0,
      angle: 20
    },
    {
      startPosition: 187,
      endPosition: 200,
      direction: 1,
      offset: 155,
      angle: 20
    },
    {
      startPosition: 240,
      endPosition: 250,
      direction: -1,
      offset: 0,
      angle: 25
    }
  ]
};

//secondlevel
let levelSecond = {
  width: 20,
  length: 300,
  path: 'images/ice.png',
  imageHeight: 110,

  lines: [{
      startPosition: 0,
      endPosition: 10,
      yPoint: canvas.width / 2
    },
    {
      startPosition: 50,
      endPosition: 89,
      yPoint: canvas.height / 2
    },
    {
      startPosition: 105,
      endPosition: 119,
      yPoint: canvas.height - 100
    },
    {
      startPosition: 130,
      endPosition: 149,
      yPoint: 0
    },
    {
      startPosition: 250,
      endPosition: 300,
      yPoint: 0
    }
  ],

  curves: [{
    startPosition: 163,
    endPosition: 249
  }],

  slopes: [{
      startPosition: 11,
      endPosition: 29,
      direction: -1,
      offset: 0,
      angle: 25
    },
    {
      startPosition: 90,
      endPosition: 94,
      direction: -1,
      offset: 0,
      angle: 25
    },
    {
      startPosition: 120,
      endPosition: 129,
      direction: -1,
      offset: 0,
      angle: 20
    },
    {
      startPosition: 150,
      endPosition: 162,
      direction: 1,
      offset: 110,
      angle: 25
    }
  ]
};

//thiridlevel
let levelThird = {
  width: 20,
  length: 300,
  path: 'images/fire.png',
  imageHeight: 30,

  lines: [{
      startPosition: 0,
      endPosition: 10,
      yPoint: canvas.width / 2
    },
    {
      startPosition: 15,
      endPosition: 24,
      yPoint: canvas.width / 2
    },
    {
      startPosition: 25,
      endPosition: 30,
      yPoint: canvas.width / 2
    },
    {
      startPosition: 59,
      endPosition: 65,
      yPoint: canvas.width / 2
    },
    {
      startPosition: 105,
      endPosition: 119,
      yPoint: canvas.height - 100
    },
    {
      startPosition: 130,
      endPosition: 149,
      yPoint: 0
    },
    {
      startPosition: 170,
      endPosition: 200,
      yPoint: canvas.width / 2
    }, {
      startPosition: 236,
      endPosition: 250,
      yPoint: 0
    }, {
      startPosition: 260,
      endPosition: 270,
      yPoint: canvas.width / 2
    },  {
      startPosition: 280,
      endPosition: 300,
      yPoint: 0
    }
  ],

  curves: [{
    startPosition: 66,
    endPosition: 90
  },{
    startPosition: 200,
    endPosition: 235
  }
  ],

  slopes: [
  {
      startPosition: 31,
      endPosition: 38,
      direction: -1,
      offset: 0,
      angle: 25
    },
    {
      startPosition: 91,
      endPosition: 96,
      direction: -1,
      offset: 0,
      angle: 25
    },
    {
      startPosition: 120,
      endPosition: 129,
      direction: -1,
      offset: 0,
      angle: 20
    },
    {
      startPosition: 150,
      endPosition: 157,
      direction: -1,
      offset: 0,
      angle: 25
    }, {
      startPosition: 271,
      endPosition: 279,
      direction: -1,
      offset: 0,
      angle: 25
    }
  ]
};

//fourthlevel
let levelFourth = {
  width: 20,
  length: 300,
  path: 'images/mud.png',
  imageHeight: 50 ,

  lines: [{
      startPosition: 0,
      endPosition: 10,
      yPoint: canvas.height / 2
    },
    {
      startPosition: 20,
      endPosition: 25,
      yPoint: canvas.width / 2
    },
    {
      startPosition: 30,
      endPosition: 35,
      yPoint: canvas.height - 100
    },
    {
      startPosition: 42,
      endPosition: 50,
      yPoint: canvas.height - 150
    },{
      startPosition: 75,
      endPosition: 85,
      yPoint: canvas.height - 150
    },{
      startPosition: 131,
      endPosition: 140,
      yPoint: 0
    }, {
      startPosition: 163,
      endPosition: 180,
      yPoint: canvas.height / 2
    },
    {
      startPosition: 200,
      endPosition: 230,
      yPoint: canvas.width / 2   
    },  {
      startPosition: 291,
      endPosition: 300,
      yPoint: 0   
    }
  ],

  curves: [{
    startPosition: 95,
    endPosition: 130
  },
  {
    startPosition: 249,
    endPosition: 290
  }],

  slopes: [
  {
      startPosition: 51,
      endPosition: 59,
      direction: -1,
      offset: 150,
      angle: 25
    },
    {
      startPosition: 141,
      endPosition: 153,
      direction: -1,
      offset: 0,
      angle: 25
    },
    {
      startPosition: 231,
      endPosition: 240,
      direction: -1,
      offset: 0,
      angle: 20
    }
  ]
};