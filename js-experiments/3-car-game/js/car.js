var CAR_WIDTH=50;
var mainWrapper=document.getElementById('main-wrapper');
var frame=document.createElement('div');
var imageHolder=document.createElement('div');
var carHolder=document.createElement('div');
var car;

function Car(parentElement){

	this.element=document.getElementById(parentElement);
	this.x=350;

	this.createCar=function(){

		carHolder.style.height ='100px';
		carHolder.style.width='50px';
		carHolder.style.position = 'absolute';
		carHolder.style.zIndex = '10';
		carHolder.style.top = '500px';
		carHolder.style.left = this.x+'px';

		carHolder.setAttribute('id', 'car-holder');

		frame.appendChild(carHolder);

		car=document.createElement('img');

		car.setAttribute('src', 'images/car.png');

		car.style.backgroundRepeat = 'no-repeat';
		car.style.height='100%';
		car.style.width = '100%';

		carHolder.appendChild(car);
	}

	this.changeDirection=function(direction){

		console.log(this.x);

		if(this.x<=230){

			this.x++;
			carHolder.style.left=this.x+'px';
		}
		else if(this.x + CAR_WIDTH >=561){

			this.x--;
			carHolder.style.left=this.x+'px';
		}
		else{

			this.x=this.x+direction*5;
			carHolder.style.left=this.x+'px';
		}

	}
}

function World(elementId){

	this.element=document.getElementById(elementId);
	this.top =0;

	this.changePosition=function(){

		this.top +=10;
		this.element.style.backgroundPositionY=this.top +'px';  

	}

}


var createWorld=function(){

	mainWrapper.style.height = '100%';
	mainWrapper.style.backgroundColor = 'black';

	frame.setAttribute('id', 'background-frame');
	frame.style.overflow='hidden';
	frame.style.height = '650px';
	frame.style.position = 'relative';

	mainWrapper.append(frame);

	imageHolder.style.height='730px';
	imageHolder.style.width = '500px';
	imageHolder.style.backgroundColor = 'red';
	imageHolder.style.left='200px';
	imageHolder.style.background = 'url(images/track.png)';
	imageHolder.style.backgroundRepeat = 'repeat-y';
	imageHolder.style.position = 'absolute';

	imageHolder.setAttribute('id', 'image-holder');

	frame.appendChild(imageHolder);

	var world = new World('image-holder');

// var car = new Car('carGame');

var backgroundMove=setInterval(function(){

	world.changePosition();

}, 100);

var car=new Car('background-frame');

car.createCar();

document.onkeydown=function(event){

	var keyNumber = event.keyCode;

	console.log(event.keyCode);

	switch(keyNumber){

		case 37:
		//left
		var move = -1;

		car.changeDirection(move);

		break;

		case 39:
		//right
		var move =1;

		car.changeDirection(move);

	}
}

};

//start
createWorld();

