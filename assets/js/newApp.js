var canvas, stage;
var images;
var img;
var loader;

function init() {
    canvas = document.getElementById("over-canvas");
    stage = new createjs.Stage(canvas);
    images = images||{};

    var manifest = [
        {src:"./assets/img/car.png", id:"ship"}
    ];

    loader = new createjs.LoadQueue();;
    loader.onFileLoad = handleFileLoad;
    loader.onComplete = handleComplete;
    loader.loadManifest(manifest);
}

function handleFileLoad(o) {
     //Alternatively you could store off the results as they get loaded.
     //In this case we only have one image getting loaded
    //if (o.type == "image") { images[o.id] = o.result; }
}

function handleComplete(event) {
  /*getResult returns an object containing the contents of the object that was initially requested using loadFile or loadManifest, including:
      src: The source of the file that was requested.
      type: The type of file that was loaded. If it was not specified, this is auto-detected by PreloadJS using the file extension.
      id: The id of the loaded object. If it was not specified, the ID will be the same as the "src" property.
      data: Any arbitrary data that was specified, otherwise it will be undefined.
  */
    var path = loader.getResult("ship").src;
    img = new createjs.Bitmap(path);
    stage.addChild(img);
    img.x = 100;
    img.y = 100;

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
