JCL - JavaScript Canvas Library
===============================

Overview
--------

The JavaScript Canvas Library is a JavaScript helper library and an object-oriented approach to canvas visualizations. The library includes:

**Classes**
- Arc Class *(jcl.Arc)*
- Canvas Class *(jcl.Canvas)*
- Circle Class *(jcl.Circle)*
- Point Class *(jcl.Point)*
- Rectangle Class *(jcl.Rectangle)*

**Managers**
- Render Manager *(jcl.renderer)*
- Performance Manager *(jcl.performance)*

**Misc**
- Utility Function Library *(jcl.utilities)*

The library is available as a global name-spaced library, and a Require.js compatible module.

Downloads
---------

**v1.0.0 (Stable Release)**
- [Standard (Development- Unminified 29kb)](http://jcl.mikemurry.com/downloads/jcl-1.0.0.js)
- [Standard (Production- Minified 9kb)](http://jcl.mikemurry.com/downloads/jcl-1.0.0.js)
- [AMD Module (Unminified 29kb)](http://jcl.mikemurry.com/downloads/jcl-1.0.0.js)
- [AMD Module (Production- Minified 9kb)](http://jcl.mikemurry.com/downloads/jcl-1.0.0.js)

**v2.0.0a (Unstable Release)**
- [Standard (Development- Unminified 29kb)](http://jcl.mikemurry.com/downloads/jcl-1.0.0.js)
- [AMD Module (Development- Unminified 29kb)](http://jcl.mikemurry.com/downloads/jcl-1.0.0.js)

JCL.Arc
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


JCL.Canvas
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


JCL.Circle
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


JCL.Rectangle
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


JCL.Point
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

**v2.0.0** (Coming Soon)
- Added: JCL.SVG class to manage SVG documents.
- Added: JCL.SVG functions to create rectangle and circle SVG elements.

**v1.2.0** (TBD: ~July 7, 2013)
- Added: Modified JCL.Point class to calculate vectors.
- Added: JCL.Point.add()
- Added: JCL.Point.subtract()
- Added: JCL.Point.scale()
- Added: JCL.Point.normalize()
- Added: JCL.Particle class to simulate physical particles.
- Added: JCL.Particle.update()
- Changed: JCL.Point.distance() to include Z axis.


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


Roadmap
-------

**Upcoming**
- Replicate Canvas Library to SVG.

**To Be Determined**
- Color object JCL.Color to easily convert and manipulate hex, string, rgb, and hsl.

