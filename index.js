var vec2 = require("gl-matrix").vec2;

var distance = function(p0, p1) {
  return Math.sqrt(Math.pow((p1[0] - p0[0]), 2) + Math.pow((p1[1] - p0[1]), 2));
};

var interpolatePoint = function(p0, p1, p2, p3, t0, t1, t2, t3, t) {
  var a1, a2, a3, b1, b2, c;
  a1 = [];
  a2 = [];
  a3 = [];
  b1 = [];
  b2 = [];
  c = [];

  vec2.add(a1, vec2.scale([], p0, (t1 - t)/(t1 - t0)), vec2.scale([], p1, (t - t0)/(t1 - t0)));
  vec2.add(a2, vec2.scale([], p1, (t2 - t)/(t2 - t1)), vec2.scale([], p2, (t - t1)/(t2 - t1)));
  vec2.add(a3, vec2.scale([], p2, (t3 - t)/(t3 - t2)), vec2.scale([], p3, (t - t2)/(t3 - t2)));

  vec2.add(b1, vec2.scale([], a1, (t2 - t)/(t2 - t0)), vec2.scale([], a2, (t - t0)/(t2 - t0)));
  vec2.add(b2, vec2.scale([], a2, (t3 - t)/(t3 - t1)), vec2.scale([], a3, (t - t1)/(t3 - t1)));

  vec2.add(c, vec2.scale([], b1, (t2 - t)/(t2 - t1)), vec2.scale([], b2, (t - t1)/(t2 - t1)));

  return c;
};

var catmullRomSplineSegment = function(p0, p1, p2, p3, samples, knot) {
  var t, t0, t1, t2, t3, segmentDist;
  var points = [];
  segmentDist = distance(p1, p2);

  t0 = 0;
  t1 = Math.pow(distance(p0, p1), knot);
  t2 = Math.pow(segmentDist, knot) + t1;
  t3 = Math.pow(distance(p2, p3), knot) + t2;

  if (!samples) {
    samples = segmentDist * 1.5;
  }

  var sampleStep = (t2 - t1) / samples;
  t = t1;
  while (t < t2) {
    t += sampleStep;
    points.push(interpolatePoint(p0, p1, p2, p3, t0, t1, t2, t3, t));
  }

  return points;
};

var catmullRomSpline = function(controlPoints, options) {
  if (controlPoints.length < 4) {
    throw "Must have at least 4 control points to generate catmull rom spline";
  }
  var points = [];
  var p0, p1, p2, p3, offset;

  options = options || {};
  var knot = options.knot || 0.5;
  var samples = options.samples;

  controlPoints.forEach(function(point, i) {
    offset = 1;
    p0 = point;

    do {
      p1 = controlPoints[i + offset];
      offset++;
    } while (p0 && p1 && p0[0] === p1[0] && p0[1] === p1[1]);

    do {
      p2 = controlPoints[i + offset];
      offset++;
    } while (p1 && p2 && p1[0] === p2[0] && p1[1] === p2[1]);

    do {
      p3 = controlPoints[i + offset];
      offset++;
    } while (p2 && p3 && p2[0] === p3[0] && p2[1] === p3[1]);

    if (!(p1 && p2 && p3)) {
      return;
    }

    points.push(p1);
    points = points.concat(catmullRomSplineSegment(p0, p1, p2, p3, samples, knot));
  });

  return points;
};

module.exports = catmullRomSpline;