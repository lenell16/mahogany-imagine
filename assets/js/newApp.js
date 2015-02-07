function init() {
  var stage = new createjs.Stage("over-canvas");
  var circle = new createjs.Shape();
  circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);


  var dragger = new createjs.Container();
  dragger.x = dragger.y = 100;
  dragger.addChild(circle);
  stage.addChild(dragger);

  dragger.on("pressmove",function(evt) {
    // currentTarget will be the container that the event listener was added to:
    evt.currentTarget.x = evt.stageX;
    evt.currentTarget.y = evt.stageY;
    // make sure to redraw the stage to show the change:
    stage.update();
  });

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
