var mainWrapper =document.getElementById("main-wrapper");
mainWrapper.style.height ="500px";
mainWrapper.style.width ="500px";
mainWrapper.style.position = "relative";
mainWrapper.style.backgroundColor="grey";


var main = document.getElementsByTagName("body");

var unOrderedList= document.createElement("ul");
unOrderedList.style.fontSize ="15px";
main[0].appendChild(unOrderedList);


for(var count=0;count<100;count++){
	var child=document.createElement("div");
	child.style.height="10px";
	child.style.width="10px";
	child.style.backgroundColor="red";
	child.style.position="absolute";
	child.style.top=Math.random()*500+"px";
	child.style.left=Math.random()*500+"px";
	child.setAttribute("class","hello");
	mainWrapper.appendChild(child);

	child.onclick=function(){
		this.parentNode.removeChild(this);
		var top = this.style.top;
		var left = this.style.left;	
		var list = document.createElement("li");
		list.setAttribute("class","buffalo");
		list.appendChild(document.createTextNode("left: "+left+" top: "+top));
		unOrderedList.appendChild(list);
	};
}



