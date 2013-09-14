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

**JCL.Arc.render**(canvas)

Draws the arc on the JCL.Canvas.

```javascript
var canvas = new JCL.Canvas('myCanvasId');
var arc = new JCL.Arc({
   center: new JCL.Point(5,10),
   radius: 3,
   fill: 'red',
   start: 0,
   end: 45
}).render(canvas);
```

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

**JCL.Canvas.draw**(object)

Draws the specified object on the canvas.

```javascript
var circle = new JCL.Circle({
    center: new JCL.Point(50,50),
    radius: 5,
    fill: 'red'
});
var canvas = new JCL.Canvas('myCanvasId').draw(circle);
```

**JCL.Canvas.drawPath**(path, stroke, thickness)

Draws a line connecting the points in the given path array.

```javascript
var path = [
    new JCL.Point(0,0),
    new JCL.Point(5,10),
    new JCL.Point(15,5),
    new JCL.Point(20,10),
    new JCL.Point(25,0)
];
canvas.drawPath(path, '#000', 3);
```

**JCL.Canvas.drawShape**(steps, fill, stroke, thickness)

Draws a line connecting the points in the given path array, and fills it.

```javascript
var path = [
    new JCL.Point(0,0),
    new JCL.Point(5,10),
    new JCL.Point(15,5),
    new JCL.Point(20,10),
    new JCL.Point(25,0)
];
canvas.drawShape(path, 'cyan', '#000', 3);

**JCL.Canvas.drawHaystack**(lines, stroke, thickness)

Efficiently draws a collection of disconnected lines of the same style.

```javascript
var path = [
    [new JCL.Point(0,0), new JCL.Point(20,20)],
    [new JCL.Point(10,0), new JCL.Point(10,20)],
    [new JCL.Point(20,0), new JCL.Point(0,20)]
];
canvas.drawHaystack(path, '#000', 2);
```

**JCL.Canvas.drawCircles**(circles)

Efficiently draws a collection of circles in the same style.

```javascript
var circles = [
    new JCL.Circle(/* options */),
    new JCL.Circle(/* options */),
    new JCL.Circle(/* options */)
];
canvas.drawCircles(circles);
```

**JCL.Canvas.drawText**(string, font, position, baseline, align, fill)

Draws text on the canvas.

```javascript
canvas.drawText('My String', 'sans-serif', new JCL.Point(5,10), 'middle', 'left', '#000');
```

**JCL.Canvas.drawImage**(img, x, y, width, height)

Draws an image on the canvas.

```javascript
var myImg = document.getElementById('myImgElement');
canvas.drawImage(myImg, 10, 10, 300, 200);
```

**JCL.Canvas.drawRemoteImage**(url, x, y, width, height)

Loads a remote image and draws it on the canvas.

```javascript
canvas.drawRemoteImage('http://example.com/image.jpg', 10, 10, 300, 200);
```

**JCL.Canvas.clearRect**(x, y, width, height)

Clears part of the canvas.

```javascript
canvas.clearRect(10, 10, 300, 200);
```

**JCL.Canvas.clear**()

Clears the entire canvas.

```javascript
canvas.clear();
```

*[**Source:** lib/jcl.Canvas.js](lib/jcl.Canvas.js)*


<a name="circle"></a>JCL.Circle
-------

Creates a new JCL.Circle instance.

```javascript
var circle = new JCL.Circle({
   center: { x: 10, y: 50 },
   radius: 12,
   fill: 'rgba(212,0,0,.75)',
   stroke: 'black',
   thickness: 2
}).render(canvas);
```

**Arguments**
- **x** (number) - The x coordinate of the center corner of the circle, in pixels.
- **y** (number) - The y coordinate of the center of the circle, in pixels.
- **center** (JCL.Point) - The JCL.Point representing the center of the circle.
- **radius** (number) - The radius of the circle, in pixels.
- **fill** (string) - The color to fill the circle.
- **stroke** (string) - The color to stroke the border of the circle.
- **thickness** (number) - The width of the border on the circle.

**JCL.Circle.render**(canvas)

Draws the circle on the JCL.Canvas.

```javascript
var canvas = new JCL.Canvas('myCanvasId');
var circle = new JCL.Circle({
   center: new JCL.Point(5,10),
   radius: 3,
   fill: 'red'
}).render(canvas);
```

*[**Source:** lib/jcl.Circle.js](lib/jcl.Circle.js)*


<a name="oval"></a>JCL.Oval
-------

Creates a new JCL.Oval instance. It is defined as a rectangle and uses bezier curves to draw.

```javascript
var oval = new JCL.Oval({
   x: 10,
   y: 50,
   width: 400,
   height: 200,
   fill: 'rgba(212,0,0,.75)',
   stroke: 'black',
   thickness: 2
}).render(canvas);
```

**Arguments**
- **x** (number) - The x coordinate of the center corner of the oval, in pixels.
- **y** (number) - The y coordinate of the center of the oval, in pixels.
- **width** (number) - The width of the oval.
- **height** (number) - The height of the oval.
- **fill** (string) - The color to fill the oval.
- **stroke** (string) - The color to stroke the border of the oval.
- **thickness** (number) - The width of the border on the oval.

**JCL.Oval.render**(canvas)

Draws the oval on the JCL.Canvas.

```javascript
var canvas = new JCL.Canvas('myCanvasId');
var oval = new JCL.Oval({
   x: 5,
   y: 10,
   width: 300,
   height: 200
   fill: 'red'
}).render(canvas);
```

*[**Source:** lib/jcl.Oval.js](lib/jcl.Oval.js)*


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

**Arguments**
- **x** (number) - The x coordinate of the top-left corner of the rectangle, in pixels.
- **y** (number) - The y coordinate of the top-left corner of the rectangle, in pixels.
- **width** (number) - The width of the rectangle, in pixels.
- **height** (number) - The height of the rectangle, in pixels.
- **fill** (string) - The color to fill the rectangle.
- **stroke** (string) - The color to stroke the border of the rectangle.
- **thickness** (number) - The width of the border on the rectangle.

**JCL.Rectangle.set**(x, y, width, height)

Updates the size of the rectangle.

```javascript
var rectangle = new JCL.Rectangle({
   x: 0,
   y: 0,
   width: 100,
   height: 100
}).translate(5, 15, 300, 200);
// rectangle = { x: 5, y: 15, width: 300, height: 200 }
```

**JCL.Point.center**()

Returns the center of the rectangle.

```javascript
var center = new JCL.Rectangle({
   x: 0,
   y: 0,
   width: 100,
   height: 100
}).center();
// center = { x:50 , y: 50 }
```

**JCL.Point.center**(point)

Centers the rectangle on the point.

```javascript
var rectangle = new JCL.Rectangle({
   x: 0,
   y: 0,
   width: 100,
   height: 100
}).center(new JCL.Point(100,100));
// rectangle = { x:50 , y: 50, width: 100, height: 100 }
```

**JCL.Point.round**()

Rounds the coordinates of a rectangle to the nearest pixel.

```javascript
var rectangle = new JCL.Rectangle({
   x: 3.65823,
   y: 9.471623,
   width: 12.9176,
   height: 58.82621
}).round();
// rectangle = { x:4, y:9, width:13, height:59 }
```

**JCL.Point.render**(canvas)

Draws the rectangle on the JCL.Canvas.

```javascript
var canvas = new JCL.Canvas('myCanvasId');
var rectangle = new JCL.Rectangle({
   x: 10,
   y: 10,
   width: 20,
   height: 60,
   fill: '#ffcc00'
}).render(canvas);
```

*[**Source:** lib/jcl.Rectangle.js](lib/jcl.Rectangle.js)*


<a name="point"></a>JCL.Point
-----------------------------

Stores a point. Provides functions to translate, calculate tangents, and interpolate between two points.

```javascript
var point = new JCL.Point(0,10);
```

**Arguments**
- **x** (number) - The x coordinate of the point.
- **y** (number) - The y coordinate of the point.

**JCL.Point.set**(x,y)

Updates the coordinates of the point.

```javascript
point.set(5,15);
```

**JCL.Point.toJSON**()

Returns a simple object representing the coordinates.

```javascript
var simple = point.toJSON();
// simple = { x: 5, y: 15 };
```

**JCL.Point.distance**(otherPoint)

Calculates the distance between this and another JCL.Point.

```javascript
var pointA = new JCL.Point(0,10);
var pointB = new JCL.Point(5,15);
var distance = pointA.distance(pointB);
// distance = 7.0710678118654755;
```

**JCL.Point.angle**(otherPoint)

Calculates the angle connecting this and another JCL.Point.

```javascript
var pointA = new JCL.Point(0,10);
var pointB = new JCL.Point(5,15);
var radians = pointA.angle(pointB);
// radians = 0.7853981633974483;
var degrees = JCL.utilities.degrees(radians);
// degrees = 45;
```

**JCL.Point.tangent**(degrees, distance)

Returns a point at the specified angle and distance from the point.

```javascript
var pointA = new JCL.Point(0,0);
var pointB = pointA.tangent(45,10);
// pointB = { x: 7.0710678118654755, y: 7.071067811865475 }
```

**JCL.Point.lerp**(a, ratio)

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

**JCL.Point.translate**(x,y)

Moves a point by the specified coordinates, optionally returning a new instance.

```javascript
var point = new JCL.Point(10,50).translate(10,-20);
// point = { x: 20, y: 30 }
```

*[**Source:** lib/jcl.Point.js](lib/jcl.Point.js)*


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

