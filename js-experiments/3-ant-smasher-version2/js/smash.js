//declaration
var main=document.getElementById("main-wrapper");
var ANT_WIDTH = 50;
var ANT_HEIGHT = 50;
var bodies = document.getElementsByTagName("body");
var unOrderedList= document.createElement("ul");
var ants = [];
var smallBoxWidth =0;
var moveAnts;

//create list
unOrderedList.style.fontSize ="15px";

bodies[0].appendChild(unOrderedList);

main.style.width = '1000px';
main.style.height ='500px';
main.style.position = 'relative';
main.style.backgroundColor ="yellow";

var mainBoxWidth = parseInt(main.style.width,10);
var mainBoxHeight = parseInt(main.style.height,10);

//random value generator
var getRandomValue =function(upperLimit,lowerLimit){

	return Math.random()*(upperLimit-lowerLimit);
};

function Ant(antId){
	this.width = ANT_WIDTH;
	this.height = ANT_HEIGHT;
	this.element=document.getElementById(antId);
	this.velocity=getRandomValue(3,0);
	this.y= getRandomValue(500,0);
	this.x=getRandomValue(1000,0);
	this.dx=getRandomValue(1,0);
	this.dy=getRandomValue(1,0);	

	var that = this;

	this.collisionCheck =function(x){

		if(this.x <= ants[x].x + ants[x].width &&
			this.x + this.width >= ants[x].x &&
			this.y <=ants[x].y + ants[x].height &&
			this.height + this.y >= ants[x].y){

			if(this.x>ants[x].x){

				this.dx=1;
				ants[x].dx=-1;

				if(this.y>ants[x].y){

					this.dy=1;
					ants[x].dy=-1;
				}else{

					ants[x].dy=1;
					this.dy=-1;
				}
			}else{

				ants[x].dx=1;
				this.dx=-1;

				if(this.y>ants[x].y){

					this.dy=1;
					ants[x].dy=-1;
				}else{

					ants[x].dy=1;
					this.dy=-1;
				}
			}
		}
	}

	this.changePosition =function(ants){

		// small box coordinates
		boxRightX=that.x+smallBoxWidth;
		boxDownY=that.y+smallBoxWidth;

		var avoidSearch = ants.indexOf(this);
		// console.log('avodid'+avoidSearch);

			//boxes collision
			for(var y in ants){
				for (var x in ants){

					if(avoidSearch==x){
					//don nothing;
				}
				else{

					this.collisionCheck(x);
				}		
				
			}
		}

		// boundary collision
		if(boxRightX>=mainBoxWidth){

			this.dx= -1;
		}
		else if(that.x<=0){

			this.dx=1;
		}
		if(boxDownY>=mainBoxHeight){

			this.dy= -1;
		}
		else if(that.y<=0){

			this.dy='1';
		}

		this.x=this.x+this.velocity*this.dx;
		this.y=this.y+this.velocity*this.dy;
		this.element.style.left=this.x+"px";
		this.element.style.top=this.y+"px";

	}

	this.antKill=function(){

		this.element.parentNode.removeChild(this.element);

		var top = this.element.style.top;
		var left = this.element.style.left;	
		var list = document.createElement("li");

		list.setAttribute("class","positionList");
		list.appendChild(document.createTextNode("left: "+left+" top: "+top));


		unOrderedList.appendChild(list);
	}

	this.resetGame=function(){

		var finishScreen = document.createElement('h1');
		var restartButton =document.createElement('button');

		finishScreen.style.color='red';
		finishScreen.style.margin = '0px auto';

		main.appendChild(finishScreen);
		main.appendChild(restartButton);

		finishScreen.appendChild(document.createTextNode("Game Over"));
		restartButton.appendChild(document.createTextNode("Restart"));

		restartButton.onclick=function(){
			
			createWorld();
			finishScreen.parentNode.removeChild(finishScreen);
			restartButton.parentNode.removeChild(restartButton);

		}
	}

}

var createWorld=function(){

	for(var y=0; y<10;y++){	

		var div=document.createElement("div");

		div.style.width ='50px';
		div.style.height ='50px';
		div.style.backgroundColor ='black';
		div.style.position = 'absolute';
		div.setAttribute("id", "movingAnt"+y);

		main.appendChild(div);

		smallBoxWidth = parseInt(div.style.width,10);

		var ant = new Ant("movingAnt"+y);	

		ants.push(ant);

	//console.log(ants.length);

	div.style.top=ant.y+'px';
	div.style.left=ant.x+'px';

	div.onclick =function(_ant){

		return function(){
			var clickedAnt = _ant;
			
			ants.splice(ants.indexOf(clickedAnt), 1);

			if(ants.length<=0){

				clearInterval(moveAnts);	
				ant.resetGame();
			}
			clickedAnt.antKill();
		}			
	}(ant);

}

moveAnts=setInterval(function(){

	for(var x=0;x<ants.length;x++){

		ants[x].changePosition(ants);
	}

},10);
};

createWorld();






