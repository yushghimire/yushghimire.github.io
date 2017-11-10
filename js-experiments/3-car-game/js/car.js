var CAR_WIDTH=100;
var mainWrapper=document.getElementById('main-wrapper');
var frame=document.createElement('div');
var imageHolder=document.createElement('div');
var car;

function Car(carId){

	this.element=document.getElementById(carId);
	this.x=600;

	this.createCar=function(){

		car=document.createElement('div');

		car.style.background = 'url(images/car.png)';
		car.style.backgroundRepeat = 'no-repeat';
		car.style.height='300px';
		car.style.width = CAR_WIDTH+'px';
		car.style.position = 'absolute';
		car.style.zIndex = '10';
		car.style.top='500px';	
		car.style.left=this.x+'px';

		this.element.appendChild(car);
	}

	this.changeDirection=function(direction){

		if(this.x<=200){

			this.x++;
			car.style.left=this.x+'px';
		}
		else if(this.x + CAR_WIDTH >=930){

			this.x--;
			car.style.left=this.x+'px';
		}
		else{

			this.x=this.x+direction*5;
			car.style.left=this.x+'px';
		}

	}
}

function World(elementId){

	this.element=document.getElementById(elementId);
	this.top =-18000;

	this.changePosition=function(){

		this.top +=10;
		this.element.style.top =this.top +'px';  

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

	imageHolder.style.height='19000px';
	imageHolder.style.width = '730px';
	imageHolder.style.backgroundColor = 'red';
	imageHolder.style.left='200px';
	imageHolder.style.background = 'url(images/road.jpg)';
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

createWorld();

