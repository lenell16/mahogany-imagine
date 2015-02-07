var map;
var stage;

function updateImage () {
  $('#map-canvas').hide();
  $('#container').show();
  $('#container').addClass('col-md-9');
  stage = new Kinetic.Stage({
    container: "container",
    width: 960,
    height: 655
  });

  mapFunction();
}


function drawImage(imageObj, hInt, wInt) {

  var layer = new Kinetic.Layer();

  // all vehicles
  var defaultImg = new Kinetic.Image({
    image: imageObj,
    x: 100,
    y: 30,
    width: wInt,
    height: hInt,
    draggable: true
  });



  // add cursor styling
  defaultImg.on('mouseover', function() {
    document.body.style.cursor = 'pointer';
  });
  defaultImg.on('mouseout', function() {
    document.body.style.cursor = 'default';
  });

  hold = defaultImg;

  layer.add(defaultImg);
  stage.add(layer);

  var angularSpeed = 360 / 8;
  var anim = new Kinetic.Animation(function(frame) {
    var angleDiff = frame.timeDiff * angularSpeed / 1000;
    defaultImg.rotate(angleDiff);
  }, layer);

  var check = true;

  defaultImg.on('click', function() {
      if(check == true) {
          anim.start();
          check = false;
      } else {
          anim.stop();
          check = true;
      }
  });

  defaultImg.on('dblclick', function() {
      layer.remove(defaultImg);
  });

};
function drawRoad (imageObj) {
  var layer = new Kinetic.Layer();

  // for signs need to be smaller
  var defaultImg = new Kinetic.Image({
    image: imageObj,
    x: 0,
    y: 0,
    width: 960,
    height: 655,
    draggable: false
  });

  layer.add(defaultImg);
  stage.add(layer);
}
function drawSigns(imageObj) {

  var layer = new Kinetic.Layer();

  // for signs need to be smaller
  var defaultImg = new Kinetic.Image({
    image: imageObj,
    x: 100,
    y: 30,
    width: 40,
    height: 80,
    draggable: true
  });



  // add cursor styling
  defaultImg.on('mouseover', function() {
    document.body.style.cursor = 'pointer';
  });
  defaultImg.on('mouseout', function() {
    document.body.style.cursor = 'default';
  });


  layer.add(defaultImg);
  stage.add(layer);

  var angularSpeed = 360 / 16;
  var anim = new Kinetic.Animation(function(frame) {
    var angleDiff = frame.timeDiff * angularSpeed / 1000;
    defaultImg.rotate(angleDiff);
  }, layer);

  var check = true;

  defaultImg.on('click', function() {
      if(check == true) {
          anim.start();
          check = false;
      } else {
          anim.stop();
          check = true;
      }
  });

  defaultImg.on('dblclick', function() {
      layer.remove(defaultImg);
  });

};

function carFunction() {
  var carObj = new Image();
carObj.onload = function() {
  drawImage(carObj,12,24);
};
carObj.src = "car.png";
};
function impactFunction() {
  var impactObj = new Image();
impactObj.onload = function() {
  drawImage(impactObj,40,40);
};
impactObj.src = "impact.png";
};

function motorFunction() {
  var motorObj = new Image();
motorObj.onload = function() {
  drawImage(motorObj,20,30);
};
motorObj.src = "motor.png";
};
function busFunction() {
  var busObj = new Image();
  busObj.onload = function() {
      drawImage(busObj,60,80);
  };
  busObj.src = "bus.png";
};

function truckFunction() {
  var truckObj = new Image();
  truckObj.onload = function() {
      drawImage(truckObj,60,80);
  };
  truckObj.src = "truck.png";
};

function tTrailerFunction() {
  var trailerObj = new Image();
  trailerObj.onload = function() {
      drawImage(trailerObj,60,80);
  };
  trailerObj.src = "trailer.png";
};

function vanFunction() {
  var vanObj = new Image();
  vanObj.onload = function() {
      drawImage(vanObj,60,80);
  };
  vanObj.src = "van.png";
};

function stopFunction() {
  var stopObj = new Image();
  stopObj.onload = function() {
      drawSigns(stopObj);
  };
  stopObj.src = "stop.png";
};

function makeLabel () {
   var labelText = $('#labeltextbox').val();
  var layer = new Kinetic.Layer({
    draggable: true
  });
  var simpleText = new Kinetic.Text({
  x: stage.width() / 2 + 1,
  y: 15,
  text: labelText,
  fontSize: 16,
  fontFamily: 'Calibri',
  fill: 'black'
});
  var box = new Kinetic.Rect({
  x: stage.width() / 2 - 1.5,
  y: 11.5,
  width: simpleText.width()+6,
  height: simpleText.height()+8,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 2
});
  layer.add(box);
  layer.add(simpleText);
  stage.add(layer);

  box.on('dblclick', function() {
      layer.remove(simpleText);
      layer.remove(box);

  });

  sampleText.on('dblclick', function() {
      layer.remove(simpleText);
      layer.remove(box);

  });
}


function initialize() {
  var mapOptions = {
    center: new google.maps.LatLng(40.4419, -86.9125),
    zoom: 17,
    maxZoom: 19,
    mapTypeId: google.maps.MapTypeId.HYBRID,
    tilt: 0
  };

  map = new google.maps.Map(document.getElementById("map-canvas"),
      mapOptions);
  var acOptions = {
  };
  var autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'),acOptions);
  autocomplete.bindTo('bounds',map);

  google.maps.event.addListener(autocomplete, 'place_changed', function() {

    var place = autocomplete.getPlace();

    map.setCenter(place.geometry.location);
    $('#container').hide();
    $('#map-canvas').show();

  });

}
function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?sensor=false&libraries=places&' +
      'callback=initialize';
  document.body.appendChild(script);
}

window.onload = loadScript;
google.maps.event.addDomListener(window, 'load', initialize);
function test () {
  // body...
  stage.toDataURL({
    callback: function(dataUrl) {
      /*
       * here you can do anything you like with the data url.
       * In this tutorial we'll just open the url with the browser
       * so that you can see the result as an image
       */
      window.open(dataUrl);
    }
  });
}
