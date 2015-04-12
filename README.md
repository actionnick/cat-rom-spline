> Catmull Rom spline interpolation made easy.


## Install

```sh
$ npm install --save cat-rom-spline
```


## Usage

```js
var catRomSpline = require('cat-rom-spline');

// Points are arrays that in the form of [x, y]
var p0 = [0, 0];
var p1 = [5, 5];
var p2 = [5, 10];
var p3 = [15, 20];

// At least 4 points are needed to interpolate
var points = [p0, p1, p2, p3];

// There are optional configurations that you can make but they aren't required.
// If 'samples' is not passed in the interpolation will sample a sensible amount
// of points based on how far away control points are.
var options = {
  samples: 50,
  knot: 0.5 // Default is 0.5, Ranges from 0 - 1, 1 being stiffer curves.
};

var interpolatedPoints = catRomSpline(points, options);
```


## License

MIT © [Nick Schaubeck](northofbrooklyn.nyc)


[npm-image]: https://badge.fury.io/js/cat-rom-spline.svg
[npm-url]: https://npmjs.org/package/cat-rom-spline
[travis-image]: https://travis-ci.org/nschaubeck/cat-rom-spline.svg?branch=master
[travis-url]: https://travis-ci.org/nschaubeck/cat-rom-spline
[daviddm-image]: https://david-dm.org/nschaubeck/cat-rom-spline.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/nschaubeck/cat-rom-spline
