// var personal={
// 	firstName: "Ayush", lastName: "Ghimire", age:"22", education:"computer engineering", project: "javascript", interest:"football"
// };



// var heading = document.createElement("h1");
// heading.innerHTML = "Personal Details";
// main.appendChild(heading);

// var ul=document.createElement("ul");
// main.appendChild(ul);

// var info = [];

// for(key in personal){
// 	info.push(key);
// }


// for(var x=0; x<info.length;x++){
// 	var list = document.createElement("li");
// 	var temp = info[x];
// 	console.log(temp);
// 	list.appendChild(document.createTextNode(personal.firstName));
// 	ul.appendChild(list);
// }


personal = {
	firstname : 'Ayush',
	lastname : 'Ghimire',
	age : 22,
	gender : 'Male',
	education : 'BE in Computer Engineering',
	projects : [
	{projectname : 'Data Analysis',description : 'analysis of the market'},
	{projectname : 'blog',description : 'teacher student companion system'},
	{projectname : 'tt', description : 'table tennis'},
	],
	interests : [
	'football',
	'reading',
	'travelling'
	]
};

var main = document.getElementById("main-wrapper");
main.style.backgroundColor ="red";
main.style.width = "1000px";
main.style.margin="0 auto";


namediv = document.createElement('div');
namediv.style.textAlign = 'left';
namediv.style.fontSize = '40px';
namediv.innerHTML = personal.firstname + ' ' + personal.lastname;
main.appendChild(namediv);


agediv = document.createElement('div');
agediv.style.textAlign = 'left';
agediv.innerHTML = personal.age;
main.appendChild(agediv);

genderdiv = document.createElement('div');
genderdiv.style.textAlign = 'left';
genderdiv.innerHTML = personal.gender;
main.appendChild(genderdiv);

edudiv = document.createElement('div');
edudiv.style.textAlign = 'left';
edudiv.innerHTML = personal.education;
main.appendChild(edudiv);

projectsdiv = document.createElement('div');
projectsdiv.innerHTML = 'PROJECT';
projectsdiv.style.fontSize = '20px';
main.appendChild(projectsdiv);

projectsul = document.createElement('ul');
projectsdiv.appendChild(projectsul);

for (var i=0; i<personal.projects.length; i++){
	listitem = document.createElement('li');
	listitem.style.marginLeft = '10px';
	listitem.innerHTML = personal.projects[i].projectname + ' : ' + personal.projects[i].description;
	projectsul.appendChild(listitem);
}

interestdiv = document.createElement('div');
interestdiv.style.textAlign = 'left';
interestdiv.innerHTML = 'INTERESTS';
main.appendChild(interestdiv);

interestul = document.createElement('ul');
interestdiv.appendChild(interestul);
for (var i=0; i<personal.interests.length; i++){
	listitem = document.createElement('li');
	listitem.style.marginLeft = '10px';
	listitem.innerHTML = personal.interests[i];
	interestul.appendChild(listitem);
}