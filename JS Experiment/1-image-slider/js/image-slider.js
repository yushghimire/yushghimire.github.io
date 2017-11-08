var mainWrapper = document.getElementById("main-wrapper");
mainWrapper.style.width ="1000px";
mainWrapper.style.height = "1000px";
mainWrapper.style.position = "relative";
mainWrapper.style.backgroundColor="grey";


var buttonLeft = document.createElement("button");
buttonLeft.style.marginRight="10px";
buttonLeft.appendChild(document.createTextNode("left"));

mainWrapper.appendChild(buttonLeft);

var buttonRight = document.createElement("button");
buttonRight.appendChild(document.createTextNode("right"));

mainWrapper.appendChild(buttonRight);


var imageWrapper = document.createElement("div");
imageWrapper.style.width="500px";
imageWrapper.style.height = '500px';
imageWrapper.style.position = 'relative';
imageWrapper.style.overflow = 'hidden';
mainWrapper.appendChild(imageWrapper);


var unOrderedList= document.createElement("ul");

unOrderedList.style.position = "absolute";
unOrderedList.style.top ="0px";
unOrderedList.style.left ="0px";
unOrderedList.style.whiteSpace = "nowrap";
unOrderedList.style.padding = "0px"
unOrderedList.style.overflow = "hidden";
unOrderedList.style.display = "block";

imageWrapper.appendChild(unOrderedList);


for (var i=1;i<5;i++){
	var list =document.createElement("li");
	list.style.listStyle="none";
	// list.style.float="left";
	list.style.listStyle = "100%";	
	list.style.display = "inline";

	list.setAttribute("class", "images");

	var imageList = document.createElement("img");
	imageList.setAttribute("src","images/photo"+i+".jpg");
	imageList.style.width = "auto";
	unOrderedList.appendChild(list);
	list.appendChild(imageList);	
}

var images = document.getElementsByClassName("images");
// var counter=0;
var counterL =0;
var counterR = 0;
var  count=0;
buttonLeft.onclick = function(){
	if(counterL<3){
		counterL++;
	}
	else{
		counterL=0;
	}
	handleTileLeft(counterL);
}

buttonRight.onclick = function(){
	if(counterR<3){
		counterR++;
	}
	else{
		counterR=0;
	}
	handleTileRight(counterR);
}

var handleTileLeft = function(x){

	var index = setInterval(function(){
		if (count>=150){
				count=-50;
		}
		count++;
		console.log("xleft:"+ x);
		unOrderedList.style.left = "-"+count*10+"px";
		console.log(count);
		if((count)%50==0){
			clearInterval(index);
			
		}
	}
	,10)

};

var handleTileRight = function(x){

	var index = setInterval(function(){
		if(count==0){
			count=200;
		}
		
		count--;
		console.log("xRight:"+ x);
		unOrderedList.style.left = "-"+count*10+"px";
		console.log(count);
		if((count)%50==0){
			clearInterval(index);

	}
}
,10)
};


