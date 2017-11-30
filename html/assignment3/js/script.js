var PROJECT_ROWS = 4;

var liItems;
var liImages;
var imageWidth;
var transition;
var imageNumber;


var value = 0;
var counter = 0;
var opacity = 0;
var toggle = true;
var canSlide = true;
var projectCounter = 4;
var imageSlideCount = 0;

//search
// var navBarBlock;
// var navBar = document.getElementById('navBar');
// navBarList = navBar.getElementsByTagName('li');

// // for portfolio
// navBarList[3].onmousedown = function() {

//   navBarBlock = navBarList[3].getElementsByTagName('ul');

//   navBarBlock[0].style.display = 'block';  
// }

// navBarList[3].onmouseout = function() {

//   navBarBlock = navBarList[3].getElementsByTagName('ul');

//   navBarBlock[0].style.display = 'none';  
// }

// // for portfolio
// navBarList[7].onmousedown = function() {

//   navBarBlock = navBarList[naBarList.length - 1].getElementsByTagName('ul');

//   navBarBlock[0].style.display = 'block';  
// }

// navBarList[naBarList.length - 1].onmouseout = function() {

//   navBarBlock = navBarList[naBarList.length - 1].getElementsByTagName('ul');

//   navBarBlock[0].style.display = 'none';  
// }

var ul = document.getElementById('bannerSlider');

//selection
var selection = document.getElementById('selection');
var selectionList = selection.getElementsByTagName('li');

//title slider content
var sliderContent = document.getElementById('sliderContent');
var sliderCtnLists = sliderContent.getElementsByTagName('li');

//title slider
var sliderBtnLeft = document.getElementById('sliderBtnLeft');
var sliderBtnRight = document.getElementById('sliderBtnRight');

//main slider
var bannerBtnLeft = document.getElementById('bannerBtnLeft');
var bannerBtnRight = document.getElementById('bannerBtnRight');

var sliderLeft = bannerBtnLeft.getElementsByTagName('a');
var sliderRight = bannerBtnRight.getElementsByTagName('a');

//related project
var projectLeft = document.getElementById('projectBtnLeft');
var projectRight = document.getElementById('projectBtnRight');

var boxSet = document.getElementById('boxSet');

bannerBtnLeft.style.display = 'none';

//images
var imageHolder = [{
  title: 'Donec faucibus ultricies congue',
  url: [
    'images/testa.jpg',
    'images/test1.jpg',
    'images/test2.jpg'
  ]
}, {
  title: 'Animal',
  url: [
    'images/sheep.jpg',
    'images/senti-gorilla.jpg',
    'images/lion.jpg'
  ]
}, {
  title: 'Places',
  url: [
    'images/waterfall.jpg',
    'images/house.jpg',
    'images/path.jpg'
  ]
}];


//title slider
sliderBtnLeft.onclick = function() {


  if (imageSlideCount > 0)
    imageSlideCount--;

  changeTitle(imageSlideCount);

  return false;
};

sliderBtnRight.onclick = function() {


  if (imageSlideCount < imageHolder.length - 1)
    imageSlideCount++;

  changeTitle(imageSlideCount);

  return false;
};

//main slider
sliderLeft[0].onclick = function() {

  if (toggle) {

    var goingLeft = true;

    toggle = false;

    slider(counter, goingLeft);

    if (counter >= 0)
      counter--;

    activeSelection(counter);

    if (counter === 1)
      bannerBtnRight.style.display = 'block';

    else if (counter <= 0)
      bannerBtnLeft.style.display = 'none';
  }
  return false;
};

sliderRight[0].onclick = function() {

  if (toggle) {
    toggle = false;

  if (counter < imageHolder.length - 1)
    counter++;

  var goingLeft = false;
  activeSelection(counter);


  slider(counter, goingLeft);

  if (counter >= 2) {
    bannerBtnRight.style.display = 'none';

  } else if (counter === 1)
    bannerBtnLeft.style.display = 'block';
  }

  return false;
};

projectRight.onclick = function() {

  let temp = []; //temporary anrray
  opacity = 0;


  for (var i = 0; i < PROJECT_ROWS; i++) {

    if (projectCounter) {
     
      boxSet.children[i + projectCounter - 4].style.display = 'none';
    }

    if ((i + projectCounter) >= boxSet.children.length) {
      canSlide = false;
      break;
    } else 
      canSlide = true;

    let value = i + projectCounter;
    temp.push(value);

  }

  loop = setInterval(function() {

    for (i = 0; i < temp.length; i++) {
      let value = temp[i];

      boxSet.children[value].style.opacity = opacity;
      boxSet.children[value].style.display = 'list-item';
    }

    opacity += 0.01;

    if (opacity >= 1) {
      clearInterval(loop);
    }

  }, 20);

  if (canSlide)
    projectCounter += PROJECT_ROWS;


  return false;
};

projectLeft.onclick = function() {

  let temp = []; //tempoorary anrray
  opacity = 0;

  for (var i = 0; i < PROJECT_ROWS; i++) {

    let value = i + projectCounter - 4;
    temp.push(value);


    if (projectCounter && (i + projectCounter) < boxSet.children.length) {
      

      boxSet.children[i + projectCounter].style.display = 'none';
    }

    if (projectCounter <= 0) {
      projectCounter = 4;
      canSlide = false;
      break;
    } else 
      canSlide = true;
  }

  loop = setInterval(function() {

    for (i = 0; i < temp.length; i++) {
      let value = temp[i];

      boxSet.children[value].style.opacity = opacity;
      boxSet.children[value].style.display = 'list-item';

    }

    opacity += 0.01;

    if (opacity >= 1) {
      clearInterval(loop);
    }

  }, 20);

  if (canSlide)
    projectCounter -= PROJECT_ROWS;


  return false;
};

//shows the first 4 projects
function showProject() {
  for (var i = 0; i < 4; i++) {

    boxSet.children[i].style.display = 'list-item';
  }
};

//starting  
function init() {

  liItems = ul.children;
  imageNumber = liItems.length;
  imageWidth = liItems[0].children[0].offsetWidth;

  // set ul’s width as the total width of all images in image slider.
  ul.style.width = parseInt(imageWidth * imageNumber) + 'em';
};

//move the main slide
function slider(counter, goingLeft) {

  liItems = ul.children;
  imageNumber = liItems.length;
  imageWidth = liItems[0].children[0].offsetWidth;


  if (counter <= liItems.length - 1) {
    transition = setInterval(function() {

      if (goingLeft && counter) {
        value -= 10;

      } else if (!goingLeft && counter) {
        value += 10;
      }

      ul.style.left = -value + 'px';

      if (value % imageWidth === 0 && !goingLeft) {
        clearInterval(transition);
        toggle = true;

      } else if (value % imageWidth === 0 && goingLeft) {
        toggle = true;
        clearInterval(transition);

      }
    }, 10);
  }
};

function activeSelection(counter) {

  for (var i = 0; i < selectionList.length; i++) {

    if (selectionList[i].classList.contains('selected'))
      selectionList[i].classList.remove('selected');
  }

  selectionList[counter].classList.add('selected');
};

//move the title above the slide
function changeTitle(imageSlideCount) {

  liImages = ul.getElementsByTagName('img');

  for (var i = 0; i < sliderCtnLists.length; i++) {

    if (sliderCtnLists[i].classList.contains('selected'))
      sliderCtnLists[i].classList.remove('selected');
  }

  sliderCtnLists[imageSlideCount].classList.add('selected');

  var title = document.getElementsByClassName('slider-content');

  for (var i = 0; i < imageHolder[imageSlideCount].url.length; i++) {

    liImages[i].setAttribute('src', imageHolder[imageSlideCount].url[i]);
  }
};

init();
showProject();