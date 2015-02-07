var img, stage;
function init(argument) {
  var canvas = document.getElementById("over-canvas");
  stage = new createjs.Stage("over-canvas");
}

function test(){
  img = new Image();
  img.src = "assets/img/car.png";
  img.onload = handleImageLoad;
}


function handleImageLoad(){
    var tempBitMap = new createjs.Bitmap(img);
    stage.addChild(tempBitMap);
    tempBitMap.x = 100;
    tempBitMap.y = 100;
    stage.update();
}


// Intialize Google Maps
function initialize() {
  var mapOptions = {
    center: { lat: -34.397, lng: 150.644},
    zoom: 8
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  init();
}
google.maps.event.addDomListener(window, 'load', initialize);
