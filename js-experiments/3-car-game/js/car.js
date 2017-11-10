//global declaration
var CAR_WIDTH=50;
var mainWrapper=document.getElementById('main-wrapper');
var secondWrapper=document.getElementById('second-wrapper');

function World(elementId){

	this.background = new Background(elementId);
	this.background.create();

	this.car = new Car(this.background.frame);
	this.car.create();
}

function Background(parentElement){

	this.mainElement=parentElement;
	this.backgroundY=0;
	this.frame='';

	this.create = function(){

		this.frame=document.createElement('div');

		this.frame.setAttribute('id', 'background-frame');
		this.frame.style.height='730px';
		this.frame.style.width = '500px';
		this.frame.style.background = 'url(images/track.png)';
		this.frame.style.backgroundRepeat = 'repeat-y';
		this.frame.style.position = 'absolute';

		this.mainElement.appendChild(this.frame);
	}

	this.update=function(){

		this.backgroundY +=10;
		this.frame.style.backgroundPositionY=this.backgroundY +'px';  
	}
}

function Car(parentElement){

	this.mainElement=parentElement;
	this.carPosition='';
	this.carHolder='';

	this.create=function(){

		this.carHolder=document.createElement('div');

		this.carHolder.style.height ='100px';
		this.carHolder.style.width='50px';
		this.carHolder.style.position = 'absolute';
		this.carHolder.style.zIndex = '10';
		this.carHolder.style.top = '500px';
		this.carHolder.style.left = this.x+'px';

		this.carHolder.setAttribute('id', 'car-holder');

		this.mainElement.appendChild(this.carHolder);

		var car=document.createElement('img');

		car.setAttribute('src', 'images/car.png');

		car.style.backgroundRepeat = 'no-repeat';
		car.style.height='100%';
		car.style.width = '100%';

		this.carHolder.appendChild(car);

	}

	this.update=function(direction){

		if(this.carPosition<=0){

			this.carPosition++;
			this.carHolder.style.left=this.carPosition+'px';
		}
		else if(this.carPosition + CAR_WIDTH >=361){

			this.carPosition--;
			this.carHolder.style.left=this.carPosition+'px';
		}
		else{

			this.carPosition=this.carPosition+direction*5;
			this.carHolder.style.left=this.carPosition+'px';
		}


	}
}

//initial
var newWorld = new World(mainWrapper);
var nextWorld=new World(secondWrapper);
var backgroundMove=setInterval(function(){

	nextWorld.background.update();
	newWorld.background.update();

}, 100);

//key-press
document.onkeydown=function(event){

	var keyNumber = event.keyCode;

	console.log(event.keyCode);

	switch(keyNumber){

		case 37:
		//left
		var move = -1;

		nextWorld.car.update(move);
		newWorld.car.update(move);
		break;

		case 39:
		//right
		var move =1;

		newWorld.car.update(move);
		nextWorld.car.update(move);
	}
}









