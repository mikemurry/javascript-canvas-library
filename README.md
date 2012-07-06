JCL - JavaScript Canvas Library
===============================
http://jcl.mikemurry.com

Overview
--------

The JavaScript Canvas Library is a JavaScript helper library to assist with canvas visualizations. Major components include:

**Classes**
- Canvas Class *(jcl.Canvas)*
- Point Class *(jcl.Point)*
- Rectangle Class *(jcl.Rectangle)*

**Managers**
- Render Manager *(jcl.renderer)*
- Performance Manager *(jcl.performance)*

**Misc**
- Utility Function Library *(jcl.utilities)*

Canvas Class
------------
The Canvas class is an instantiable object that will automatically size a canvas tag, establish the 2d context, and provide a variety of drawing functions. See the full documentation for details.

Point Class
-----------
The Point class stores an x, y, and z coordinate representing a point in 2d or 3d space. There are also functions for important point calculations included. See the full documentation.

Point Class
-----------
The Rectangle class stores an x, y, and z coordinate and associated lengths representing a rectangle in 2d or 3d space. There are also functions for important rectangle calculations included. See the full documentation.

Render Manager
--------------
The render manager will automatically detect if RequestAnimationFrame is supported by the browser or fallback to a recursive setTimeout. You can also register callbacks to be included in the render loop by using the registerRender and deregisterRender functions. See the full documentation for more information.

Performance Manager
-------------------
The performance manager handles timing and calculating deltas. You can retrieve the delta (seconds since the last frame was rendered) and the total elapsed time. See the full documentation for more details.

