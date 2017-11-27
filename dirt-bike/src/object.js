//key pressed
let keys = {

  _pressed: {},

  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  SPACE: 32,

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
  x: canvas.width / 8,
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

//fourthlevel
let levelFourth = {
  width: 20,
  length: 300,
  path: 'images/mud.png',
  imageHeight: 50 ,

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