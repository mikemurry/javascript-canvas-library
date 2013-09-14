JavaScript Canvas Library
=========================

JCL is an object-oriented approach to working with HTML5 canvas elements.

Downloads
---------

The library is available as a global name-spaced variable, and a Require.js compatible module.

**Version 1.1.3**
- [Minified](jcl.min.js) ([as AMD module](jcl-amd.min.js)) - 12kb
- [Source](jcl.js) ([as AMD module](jcl-amd.js)) - 28kb

Getting Started
---------------

After downloading and including the JCL script on your page, you can instantiate a canvas object and begin drawing.

```javascript
// Instantiate a new Circle class.
var circle = new JCL.Circle({
   x: 50,
   y: 50,
   radius: 10,
   fill: '#ccc',
   stroke: '#000',
   thickness: 3
});

// Instantiate the Canvas class and draw the circle.
var canvas = new JCL.Canvas('myCanvasId').drawCircle(circle);
```

Classes
-------

- [Arc](#arc)
- [Canvas](#canvas)
- [Circle](#circle)
- [Oval](#oval)
- [Point](#point)
- [Rectangle](#rectangle)

Helpers
-------

- [performance](#performance)
- [renderer](#renderer)
- [utilities](#utilities)

<a name="arc"></a>JCL.Arc
-------------------------

Creates a new JCL.Arc instance. An arc is a circle sliced between two angles.

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

**Arguments**
- **options** (object) - Optional parameters.

**Options**
- **center** (JCL.Point) - A JCL.Point instance indicating the arc's center.
- **x** (number) - The x coordinate of the arc's center.
- **y** (number) - The y coordinate of the arc's center.
- **radius** (number) - The radius of the arc, in pixels.
- **fill** (string) - The color to fill the arc.
- **stroke** (string) - The color to stroke the border of the arc.
- **thickness** (number) - The thickness of the arc's border, in pixels.
- **start** (number) - The starting angle of the arc, in degrees.
- **end** (number) - The ending angle of the arc, in degrees.

**Functions**
- render(canvas)

*[**Source:** lib/jcl.Arc.js](lib/jcl.Arc.js)*


<a name="canvas"></a>JCL.Canvas
-------------------------------

Creates a new JCL.Canvas instance based on a canvas element.

```javascript
var canvas = new JCL.Canvas('myCanvasId');
```

**Arguments**
- **id** (string|element) - The element ID or reference to the canvas element.
- **options** (object) - Optional parameters.

**Options**
- **width** (number) - Set the element's width.
- **height** (number) - Sets the element's height.
- **zindex** (number) - Sets the element's z-index.

**Properties**
- **enabled** (boolean) - If the canvas object is valid and able to draw.
- **width** (number) - The width of the canvas element.
- **height** (number) - The height of the canvas element.

**JCL.Canvas.draw(object)**

Draws the supplied object, relying on the object's render function.

**JCL.Canvas.drawRectangle(JCL.Rectangle)**

Draws a JCL.Rectangle object.

```javascript
var myRectangle = new JCL.Rectangle({ width: 10, height: 10, x: 10, y: 10, fill: 'black' });
canvas.drawRectangle(myRectangle);
```

**JCL.Canvas.drawPath(path, color, thickness)**

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


<a name="rectangle"></a>JCL.Rectangle
-------------------------------------

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


<a name="point"></a>JCL.Point
-----------------------------

Stores a point. Provides functions to translate, calculate tangents, and interpolate between two points.

```javascript
var point = new JCL.Point(0,10);
```

**Arguments**
- **x** (number) - The x coordinate of the point.
- **y** (number) - The y coordinate of the point.

**JCL.Point.set(x,y)**
Updates the coordinates of the point.

```javascript
point.set(5,15);
```

**JCL.Point.toJSON()**
Returns a simple object representing the coordinates.

```javascript
var simple = point.toJSON();
// simple = { x: 5, y: 15 };
```

**JCL.Point.distance(otherPoint)**
Calculates the distance between this and another JCL.Point.

```javascript
var pointA = new JCL.Point(0,10);
var pointB = new JCL.Point(5,15);
var distance = pointA.distance(pointB);
// distance = 7.0710678118654755;
```

**JCL.Point.angle(otherPoint)**
Calculates the angle connecting this and another JCL.Point.

```javascript
var pointA = new JCL.Point(0,10);
var pointB = new JCL.Point(5,15);
var radians = pointA.angle(pointB);
// radians = 0.7853981633974483;
var degrees = JCL.utilities.degrees(radians);
// degrees = 45;
```

**JCL.Point.tangent(degrees, distance)**
Returns a point at the specified angle and distance from the point.

```javascript
var pointA = new JCL.Point(0,0);
var pointB = pointA.tangent(45, 10);
// pointB = { x: 7.0710678118654755, y: 7.071067811865475 }
```

**JCL.Point.lerp(a, ratio)**
Interpolates a third point at the specified ratio between this and another point.

```javascript
var pointA = new JCL.Point(10,50);
var pointB = new JCL.Point(10,100);
var pointC = pointA.lerp(pointB,.5);
// pointC = { x: 10, y: 75 }
```

**JCL.Point.round**()
Rounds the coordinates of a point to the nearest pixel.

```javascript
var point = new JCL.Point(4.6384, 8.2165).round();
// point = { x: 4, y: 8 }
```

**JCL.Point.crisp**()
Adjusts for sub-pixel blurring by centering the point around a pixel.

```javascript
var point = new JCL.Point(4,8).crisp();
// point = { x: 3.5, y: 7.5 }
```

**JCL.Point.translate(x, y)**
Moves a point by the specified coordinates, optionally returning a new instance.

```javascript
var point = new JCL.Point(10, 50);
point.translate(10, -20);
// point = { x: 20, y: 30 }
```


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

