var liItems;
var liImages;
var imageWidth;
var imageNumber;
var transition;

var value = 0;
var counter = 0;
var imageSlideCount = 0;

var ul = document.getElementById('bannerSlider');
var selection = document.getElementById('selection');
var sliderLeft = document.getElementById('sliderLeft');
var selectionList = selection.getElementsByTagName('li');
var sliderRight = document.getElementById('sliderRight');
var sliderContent = document.getElementById('sliderContent');
var sliderBtnLeft = document.getElementById('sliderBtnLeft');
var sliderCtnLists = sliderContent.getElementsByTagName('li');
var sliderBtnRight = document.getElementById('sliderBtnRight');
var bannerBtnRight = document.getElementById('bannerBtnRight');
var bannerBtnLeft = document.getElementById('bannerBtnLeft');

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

  counter = 0;

  if (imageSlideCount > 0)
    imageSlideCount--;

  changeTitle(imageSlideCount);

  return false;
}

sliderBtnRight.onclick = function() {

  counter = 0;

  if (imageSlideCount < imageHolder.length - 1)
    imageSlideCount++;

  changeTitle(imageSlideCount);

  return false;
}

//main slider
sliderLeft.onclick = function() {

  var goingLeft = true;


  slider(counter, goingLeft);

  if (counter >= 0)
    counter--;

  if (counter === 1 )
    bannerBtnRight.style.display = 'block';
  else if (counter <= 0)
     bannerBtnLeft.style.display = 'none';

  return false;
}

sliderRight.onclick = function() {

  if (counter < imageHolder.length - 1)
    counter++;

  var goingLeft = false;

  slider(counter, goingLeft);

  if (counter >= 2){
    bannerBtnRight.style.display = 'none';

  } else if (counter === 1 )
    bannerBtnLeft.style.display = 'block';


  return false;
}

//starting  
function init() {

  liItems = ul.children;
  imageNumber = liItems.length;
  imageWidth = liItems[0].children[0].offsetWidth;

  // set ul’s width as the total width of all images in image slider.
  ul.style.width = parseInt(imageWidth * imageNumber) + 'px';
}

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

      } else if (value % imageWidth === 0 && goingLeft) {

        clearInterval(transition);

      }
    }, 10);
  }

  for (var i = 0; i < selectionList.length; i++) {

    if (selectionList[i].classList.contains('selected'))
      selectionList[i].classList.remove('selected');
  }

  selectionList[counter].classList.add('selected');
}

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
}

init();