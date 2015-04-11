// An implementation of a curves graphing tool, very similar to the photoshop
// curves tool. Control points are added via clicking on the canvas and the
// animation loop will draw the interpolated points.
var catRomSpline = require('../..');

window.canvas = document.createElement("canvas");
document.body.appendChild(canvas);
var width = window.innerWidth;
var height = window.innerHeight;
var scaleX = 1;
var scaleY = 1;
var originalWidth = width;
var originalHeight = height;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');

var p1 = [0, height];
var p2 = [width, 0];

var slope = (p2[0] - p1[0]) / (p2[1] - p1[1]);

var p0 = [p1[0] - 10, p1[1] - (10 * 1/slope)];
var p3 = [p2[0] + 10, p2[1] + (10 * 1/slope)];

var points = [p0, p1, p2, p3];

var newPoint = [];

window.onresize = function(event) {
  width = window.innerWidth;
  height = window.innerHeight;
  scaleX = width / originalWidth;
  scaleY = height / originalHeight;
  canvas.width = width;
  canvas.height = height;
};

canvas.onmousedown = function(event) {
  newPoint = [event.layerX * (1/scaleX), event.layerY * (1/scaleY)];
  points.push(newPoint);
  points.sort(function(a, b) {
    return a[0] - b[0];
  });
};

canvas.onmousemove = function(event) {
  if (newPoint) {
    newPoint[0] = event.layerX * (1/scaleX);
    newPoint[1] = event.layerY * (1/scaleY);
    points.sort(function(a, b) {
      return a[0] - b[0];
    });
  }
};

canvas.onmouseup = function(event) {
  newPoint = false;
};

var frameLoop = function() {
  context.fillStyle = "black";
  context.fillRect(0, 0, width, height);

  context.save();
  context.scale(scaleX, scaleY);
  catRomSpline(points).forEach(function(point, index, array) {
    context.fillStyle = "white";
    context.fillRect(point[0], point[1], 1, 1);
  });

  context.restore();
  requestAnimationFrame(frameLoop);
};

requestAnimationFrame(frameLoop);
