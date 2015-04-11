'use strict';
var assert = require('assert');
var catRomSpline = require('../');

describe('cat-rom-spline node module', function () {
  it('must generate the correct amount of points', function () {
    var p0 = [0, 0];
    var p1 = [5, 5];
    var p2 = [5, 10];
    var p3 = [15, 20];
    var options = {
      samples: 1
    };
    var points = [p0, p1, p2, p3];
    var interpolatedPoints = catRomSpline(points, options);
    assert(interpolatedPoints.length === 2);
  });

  it('must throw an error if not enough points are passed in', function () {
    try {
      catRomSpline([]);
    } catch(e) {
      assert(true);
    }
  });
});
