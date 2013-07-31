JCL - JavaScript Canvas Library
===============================

Downloads
---------

The library is available as a global name-spaced variable, and a Require.js compatible module.

**Version 1.1.3**
- [Minified](jcl.min.js) - 12kb ([AMD Version](jcl-amd.min.js))
- [Development](jcl.js) - 28kb ([AMD Version](jcl-amd.js))

Getting Started
---------------

After including the JCL script on your page, you can instantiate a canvas object and begin drawing.

```javascript

var circle = new JCL.Circle({
   x: 50,
   y: 50,
   radius: 10,
   fill: '#ccc',
   stroke: '#000',
   thickness: 3
});

var canvas = new JCL.Canvas('myCanvasId').drawCircle(circle);

```

Classes
--------

- [Arc Class][arc]: *[JCL.Arc](lib/jcl.Arc.js)*
- [Canvas Class][canvas]: *[JCL.Canvas](lib/jcl.Canvas.js)*
- [Circle Class][circle]: *[JCL.Circle](lib/jcl.Circle.js)*
- [Oval Class][oval]: *[JCL.Circle](lib/jcl.Oval.js)*
- [Point Class][point]: *[JCL.Point](lib/jcl.Point.js)*
- [Rectangle Class][rectangle]: *[JCL.Rectangle](lib/jcl.Rectangle.js)*

[arc]JCL.Arc
-------

Creates a new JCL.Arc instance. See the documentation for options.

```javascript
var arc = new JCL.Arc({
   center: { x: 10, y: 50 },
   radius: 12,
   fill: 'rgba(212,0,0,.75)',
   stroke: 'black',
   thickness: 2,
   start: 0,
   end: 90
}).render(canvas);
```

**Functions**
- render()


[canvas]JCL.Canvas
----------

Creates a new JCL.Canvas instance based on a canvas element. See the documentation for options and additional information.

```javascript
var canvas = new JCL.Canvas('myCanvasId');
```

**Functions:**
- drawRectangle()
- drawPath()
- drawShape()
- drawHaystack()
- drawCircle()
- drawCircles()
- drawArc()
- drawText()
- drawImage()
- drawImageExt()
- drawRemoteImage()
- clearRect()
- clear()
- save()
- restore()
- translate()
- rotate()


[circle]JCL.Circle
-------

Creates a new JCL.Circle instance. See the documentation for options.

```javascript
var arc = new JCL.Circle({
   center: { x: 10, y: 50 },
   radius: 12,
   fill: 'rgba(212,0,0,.75)',
   stroke: 'black',
   thickness: 2
}).render(canvas);
```

**Functions:**
- render()


[rectangle]JCL.Rectangle
-------------

Stores positioning and style information for a rectangle. The class also contains helper functions for the rectangle, such as specifying a center (pivot) point, and rounding points to the nearest pixel.

```javascript
var rectangle = new JCL.Rectangle({
   x: 0,
   y: 0,
   width: 100,
   height: 100,
   fill: 'gray',
   stroke: 'black',
   thickness: 2
}).render(canvas);
```

**Functions:**
- set()
- toJSON()
- toString()
- center()
- round()
- render()


[point]JCL.Point
---------

Stores a 2d (or 3d) point. Also provides functions to translate, calculate tangents, and interpolate between two points.

```javascript
var point = new JCL.Point(0,10);
```

**Functions:**
- set()
- toJSON()
- distance()
- angle()
- tangent()
- lerp()
- translate()


JCL.performance
---------------

Provides performance metrics such as frames per second, elapsed time per frame, and total elapsed time.

```javascript
JCL.performance.enable();
JCL.delta();
```

**Functions:**
- enable()
- disable()
- delta()
- elapsed()
- fps()


JCL.render
----------

Allows adding or removing callback functions to the render loop.

```javascript
JCL.render.add(myRenderFunction);
JCL.render.remove(0);
```

**Functions:**
- add()
- remove()


JCL.utilities
-------------

A library of useful functions.

```javascript
JCL.utilities.randomInt(0,100);
```

**Functions:**
- randomInt()
- radians()
- degrees()
- bounds()


Change Log
----------

**v1.1.3** (July 31, 2013)
- Rolled back original v1.2 changes after deciding they were outside the scope of this project.

**v1.1.2** (April 18, 2013)
- Added: JCL.Point.round() to round the point to the nearest pixel.
- Added: JCL.Point.crisp() to overcome the subpixel blurring on single pixel width lines.

**v1.1.1** (April 8, 2013)
- Added: JCL.Oval class to draw ovals.
- Added: Optional 'copy' argument to JCL.Point.translate() to clone the point instead of changing the current point. (1.1.1)
- Fixed: Bug with JCL.Point not recognizing the proper number of arguments with 5,0 coordinates. (1.1.1)

**v1.0** (April 2, 2013)
- Added: JCL.drawCircles() will draw an array of circles, using the first element as the style template.
- Added: Unit tests.
- Changed: Can pass an object with x,y,z properties into the JCL.Point constructor as the only argument.
- Changed: Errors will now be thrown instead of using console.warn().
- Changed: JCL.performance must now be enabled using JCL.performance.enable().
- Changed: JCL.performance cannot be disabled by calling JCL.performance.disable().
- Changed: Renamed JCL object 'get()' function to 'toJSON()' to match convention.
- Changed: Set() commands will now retain the existing value if not overridden by the function.
- Removed: 'fullscreen' is no longer a JCL.Canvas option.
- Removed: 'createFragment()' is not longer a function in utilities. Didn't fit with the library.
- Removed: JCL.Point/JCL.Rectangle no longer have a toString() function. No known use scenarios.

**v0.1** (December 11, 2012)
- Initial Release

