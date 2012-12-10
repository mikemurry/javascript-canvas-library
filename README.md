JCL - JavaScript Canvas Library
===============================

Overview
--------

The JavaScript Canvas Library is a JavaScript helper library to assist with canvas visualizations. Major components include:

**Classes**
- Canvas Class *(jcl.Canvas)*
- Point Class *(jcl.Point)*
- Rectangle Class *(jcl.Rectangle)*
- Circle Class *(jcl.Circle)*
- Color Class *(jcl.Color)*

**Managers**
- Render Manager *(jcl.renderer)*
- Performance Manager *(jcl.performance)*

**Misc**
- Utility Function Library *(jcl.utilities)*

The library is available as a global name-spaced library, and a Require.js compatible module.

JCL.Canvas
----------

Creates a new JCL.Canvas instance based on a canvas element. See the documentation for options and additional information.

'''javascript
var canvas = new JCL.Canvas('myCanvasId');
'''

JCL.Rectangle
-------------

Stores positioning and style information for a rectangle. The class also contains helper functions for the rectangle, such as specifying a center (pivot) point, and rounding points to the nearest pixel.

'''javascript
var rectangle = new JCL.Rectangle({
   x: 0,
   y: 0,
   width: 100,
   height: 100,
   fill: 'gray',
   stroke: 'black',
   thickness: 2
}).render(canvas);
'''

JCL.Circle
----------

Stores positioning and style information for a circle.

'''javascript
var circle = new JCL.Circle({
   center: { x:10, y:10 },
   fill: 'gray',
   stroke: 'black',
   thickness: 2
}).render(canvas);
'''

JCL.Point
---------

Stores a 2d (or 3d) point. Also provides functions to translate, calculate tangents, and interpolate between two points.

'''javascript
var point = new JCL.Point(0,10);
'''

JCL.render
----------

Allows adding or removing callback functions to the render loop.

'''javascript
JCL.render.add(myRenderFunction);
JCL.render.remove(0);
'''

JCL.utilities
-------------

A library of useful functions.

'''javascript
JCL.utilities.radians(135);
JCL.utilities.randomInt(0,100);
'''