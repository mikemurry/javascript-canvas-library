

var JCL = JCL || {
    VERSION: '1.1.4'
};

JCL.utilities = {

    // randomInt()
    // Returns an integer between the specified minimum (inclusive) and maximum (exclusive).

    randomInt: function(min, max) {
        if (min !== undefined && max !== undefined) {
            return Math.floor((max - min) * Math.random()) + min;
        } else { throw new Error("utilities.randomInt() Error: Missing min or max argument."); }
    },

    // radians()
    // Converts degrees into radians.

    radians: function(degrees) {
        return (Math.PI / 180) * degrees;
    },

    // degrees()
    // Converts radians into degrees.

    degrees: function(radians) {
        return radians * (180 / Math.PI);
    },

    // bounds()
    // Returns the minimum and maximum value for a given collection.

    bounds: function(collection) {

        var i, j, min, max;

        for (i=0, j=collection.length; i<j; i++) {

            if (!min) { min = collection[i]; }
            if (!max) { max = collection[i]; }

            if (collection[i] > max) { max = collection[i]; }
            if (collection[i] < min) { min = collection[i]; }

        }

        return {
            min: min,
            max: max
        }

    }

};
JCL.renderer = (function() {

    var _list, _len, _enabled;

    // requestAnimationFrame Shim

    window.requestAnimFrame = (function requestAnimFrame() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            }
    })();

    _list = [];
    _len = 0;
    _enabled = false;

    function _loop() {
        if (_len > 0) {
            for (var i = 0; i < _len; i++) { _list[i](); }
            window.requestAnimFrame(_loop);
        }
    }

    function _add(fn) {
        var isFirst = _list.length === 0;
        _len = _list.push(fn);
        if (isFirst) { _loop(); }
        return _len - 1;
    }

    function _remove(index) {
        _list.splice(index, 1);
        _len = _list.length;
        if (_len <= 0) { _enabled = false; }
        return true;
    }

    return {

        // add()
        // Adds a callback to the render loop.

        add: _add,

        // remove()
        // Removes a callback from the render loop.

        remove: _remove,

        // debug()
        // Returns the current render loop.

        debug: function() { return _list; }

    }

}());
JCL.performance = (function() {

    var _isInit, _last, _delta, _fps, _elapsed;

    _isInit = false;
    _last = new Date();
    _delta = 0;
    _elapsed = 0;
    _fps = 0;
    _index = null;

    function _init() {
        if (!_isInit) {
            _index = JCL.renderer.add(_update);
            _isInit = true;
        }
        return this;
    }

    function _uninit() {
        if (_isInit) {
            JCL.renderer.remove(_index);
            _isInit = false;
        }
        return this;
    }

    function _update() {
        var _newDate = new Date();
        _delta = (_newDate - _last) / 1000;
        _elapsed += _delta;
        _last = _newDate;
        _fps = Math.floor(1/_delta);
    }

    return {

        // enable()
        // Begins monitoring metrics.

        enable: function() {
            _init();
            return this;
        },

        // disable()
        // Stops monitoring metrics.

        disable: function() {
            _uninit();
            _delta = null;
            _elapsed = null;
            _last = null;
            _fps = null;
            return this;
        },

        // delta()
        // Returns the number of seconds since the last frame was drawn.

        delta: function() { return _delta; },

        // elasped()
        // Returns the number of seconds since page load.

        elapsed: function() { return _elapsed; },

        // fps()
        // Returns the number of frames rendered per second.

        fps: function() { return _fps; }

    }

}());
/* JCL.Canvas */
/* The canvas class creates a platform for all draw calls. */

JCL.Canvas = function(canvasId, options) {

    options = options || {};

    this.options = options;

    if (typeof canvasId === "object") {
        if (canvasId.length) {
            // Assume jQuery Object
            this.dom = canvasId[0];
        } else {
            // Assume raw DOM element.
            this.dom = canvasId;
        }
    } else {
        // Assume ID string
        this.dom = document.getElementById(canvasId);
    }

    // Check if canvas element.
    if (this.dom && this.dom.getContext) {

        // TODO: Check for CANVAS tag name.

        this.ctx = this.dom.getContext("2d");
        this.enabled = (this.ctx !== undefined);
    }

    if (this.enabled) {

        // Handle Manual Height/Width Options
        if (options.width) { this.dom.width = options.width; }
        if (options.height) { this.dom.height = options.height; }

        // Handle Z-Index Option
        if (options.zindex) {
            this.dom.style.zIndex = options.zindex;
        }

        // Write size properties.
        this.width = this.dom.width;
        this.height = this.dom.height;

        // Ensure width and height attributes are accurate on the DOM.
        this.dom.setAttribute('width', this.width);
        this.dom.setAttribute('height', this.height);

    } else {
        throw new ReferenceError("Could not instantiate JCL.Canvas with specified DOM element.");
    }

    return this;

};

JCL.Canvas.prototype = {

    // Delegates the specific draw method to the object.

    draw: function(obj) {

        // If the object has a render function, render it.
        if (obj.render) {
            obj.render(this);
        }

        // Silently fail if no render function is found.
        return this;

    },

    // Draws a JCL.Rectangle instance on the canvas.

    drawRectangle: function(rect) {

        if (rect instanceof JCL.Rectangle) {

            if (rect.fillStyle) {
                this.ctx.fillStyle = rect.fillStyle;
                this.ctx.fillRect(Math.floor(rect.x) + 0.5, Math.floor(rect.y) + 0.5, rect.width, rect.height);
            }

            if (rect.strokeStyle) {
                this.ctx.strokeStyle = rect.strokeStyle;
                this.ctx.lineWidth = rect.lineWidth || 1;
                this.ctx.strokeRect(Math.floor(rect.x) + 0.5, Math.floor(rect.y) + 0.5, rect.width, rect.height);
            }

        } else {
            throw new TypeError("Cannot draw a rectangle without a JCL.Rectangle instance.");
        }

        return this;

    },

    // drawPath()
    // Draws a path on the canvas.
    // Steps is expected to be an array of {x,y} objects.

    drawPath: function(steps, strokeStyle, lineWidth) {

        var length = steps.length, i;

        this.ctx.strokeStyle = strokeStyle || "#000000";
        this.ctx.lineWidth = lineWidth || 1;
        this.ctx.beginPath();
        this.ctx.moveTo(steps[0].x, steps[0].y);
        for (i = 1; i<length; i++) {
            this.ctx.lineTo(steps[i].x, steps[i].y);
        }
        this.ctx.stroke();

        return this;

    },

    // drawShape()
    // Draws a filled path on the canvas.
    // Steps is expected to be an array of {x,y} objects.

    drawShape: function(steps, fillStyle, strokeStyle, lineWidth) {

        var length = steps.length, i;

        this.ctx.strokeStyle = strokeStyle || "rgba(0,0,0,0)";
        this.ctx.lineWidth = lineWidth || 1;
        this.ctx.fillStyle = fillStyle || "rgba(0,0,0,0)";

        this.ctx.beginPath();
        this.ctx.moveTo(steps[0].x, steps[0].y);
        for (i = 1; i<length; i++) { this.ctx.lineTo(steps[i].x, steps[i].y); }
        this.ctx.closePath();

        this.ctx.stroke();
        this.ctx.fill();

        return this;

    },

    // drawHaystack()
    // Efficiently draws a collection of disconnected lines of the same style.
    // Steps is expected to be an array of [{x,y},{x,y}] arrays.

    drawHaystack: function(steps, strokeStyle, lineWidth) {

        var length = steps.length, i;

        this.ctx.strokeStyle = strokeStyle || "#000000";
        this.ctx.lineWidth = lineWidth || 1;
        this.ctx.beginPath();
        for (i = 0; i<length; i++) {
            this.ctx.moveTo(steps[i][0].x, steps[i][0].y);
            this.ctx.lineTo(steps[i][1].x, steps[i][1].y);
        }
        this.ctx.stroke();

        return this;

    },

    // drawCircle()
    // Draws a JCL.Circle instance on the canvas.

    drawCircle: function(circle){

        this.ctx.beginPath();
        this.ctx.arc(circle.center.x, circle.center.y, circle.radius, 0, Math.PI * 2, false);
        if (circle.fillStyle) {
            this.ctx.fillStyle = circle.fillStyle;
            this.ctx.fill();
        }
        if (circle.strokeStyle) {
            this.ctx.strokeStyle = circle.strokeStyle;
            this.ctx.lineWidth = circle.lineWidth || 1;
            this.ctx.stroke();
        }
        return this;
    },

    // drawCircles()
    // Efficiently draws multiple circles of the same style on the canvas.
    // Will copy the style properties from the first circle in the array.

    drawCircles: function(circles) {

        var i, max, circle, sample;

        if (circles.length > 0) {

            sample = circles[0];

            this.ctx.beginPath();

            max = circles.length;
            for (i=0; i<max; i++) {
                circle = circles[i];
                this.ctx.moveTo(circle.center.x, circle.center.y);
                this.ctx.arc(circle.center.x, circle.center.y, circle.radius, 0, Math.PI * 2, false);
            }
            if (sample.fillStyle) {
                this.ctx.fillStyle = sample.fillStyle;
                this.ctx.fill();
            }
            if (sample.strokeStyle) {
                this.ctx.strokeStyle = sample.strokeStyle;
                this.ctx.lineWidth = sample.lineWidth || 1;
                this.ctx.stroke();
            }

        }

        return this;

    },

    // drawArc()
    // Draws a JCL.Arc instance on the canvas.

    drawArc: function(arc){
        var degrees = JCL.utilities.radians;
        this.ctx.beginPath();
        this.ctx.arc(arc.center.x, arc.center.y, arc.radius, degrees(arc.start - 90), degrees(arc.end - 90), false);
        if (arc.fillStyle) {
            this.ctx.fillStyle = arc.fillStyle;
            this.ctx.fill();
        }
        if (arc.strokeStyle) {
            this.ctx.strokeStyle = arc.strokeStyle;
            this.ctx.lineWidth = arc.lineWidth || 1;
            this.ctx.stroke();
        }
        return this;
    },

    // drawOval()
    // Draws an JCL.Oval instance on the canvas.

    drawOval: function(oval) {

        var kappa, cx, cy;

        kappa = .5522848;
        cx = (oval.width / 2) * kappa;
        cy = (oval.height / 2) * kappa;

        this.ctx.beginPath();
        this.ctx.moveTo(oval.start.x, oval.mid.y);
        this.ctx.bezierCurveTo(oval.start.x, oval.mid.y - cy, oval.mid.x - cx, oval.start.y, oval.mid.x, oval.start.y);
        this.ctx.bezierCurveTo(oval.mid.x + cx, oval.start.y, oval.end.x, oval.mid.y - cy, oval.end.x, oval.mid.y);
        this.ctx.bezierCurveTo(oval.end.x, oval.mid.y + cy, oval.mid.x + cx, oval.end.y, oval.mid.x, oval.end.y);
        this.ctx.bezierCurveTo(oval.mid.x - cx, oval.end.y, oval.start.x, oval.mid.y + cy, oval.start.x, oval.mid.y);
        this.ctx.closePath();

        if (oval.fillStyle) {
            this.ctx.fillStyle = oval.fillStyle;
            this.ctx.fill();
        }
        if (oval.strokeStyle) {
            this.ctx.strokeStyle = oval.strokeStyle;
            this.ctx.lineWidth = oval.lineWidth || 1;
            this.ctx.stroke();
        }

        return this;

    },

    // drawText()
    // Draws text on the canvas.

    drawText: function(str, font, pos, baseline, align, fillStyle) {
        if (fillStyle) { this.ctx.fillStyle = fillStyle; }
        this.ctx.font = "bold 10px sans-serif";
        if (baseline) { this.ctx.textBaseline = baseline; }
        if (align) { this.ctx.textAlign = align; }
        if (font) { this.ctx.font = font; }
        this.ctx.fillStyle = fillStyle || "black";
        this.ctx.fillText(str, pos.x, pos.y);
        return this;
    },

    // drawImage()
    // Draws an image on the canvas.

    drawImage: function(img, x, y, width, height) {
        this.ctx.drawImage(img, x, y, width, height);
        return this;
    },

    // drawImageExt()
    // Draws an image on the canvas with extended options.

    drawImageExt: function(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight){
        this.ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        return this;
    },

    // drawRemoteImage()
    // Draws an image from a remote URL on the canvas.

    drawRemoteImage: function(url, x, y, width, height) {
        var i = new Image(), that = this;
        i.onload = function() {
            that.drawImage(i, x, y, width, height);
        };
        i.src = url;
        return this;
    },

    // clearRect()
    // Clears the canvas in the specified rectangle.

    clearRect: function(x, y, w, h) {
        this.ctx.clearRect(x,y,w,h);
        return this;
    },

    // clear()
    // Clears the entire canvas.

    clear: function() {
        this.ctx.clearRect(0,0,this.dom.width,this.dom.height);
        return this;
    },

    // save()
    // Saves the current canvas transform state.

    save: function() {
        this.ctx.save();
        return this;
    },

    // restore()
    // Restores the saved canvas transform state.

    restore: function() {
        this.ctx.restore();
        return this;
    },

    // translate()
    // Translates the canvas transform.

    translate: function(x, y) {
        this.ctx.translate(x, y);
        return this;
    },

    // rotate()
    // Rotates the canvas transform.

    rotate: function(degs) {
        this.ctx.rotate(degs);
        return this;
    }

};JCL.Point = function (x, y) {

    if (arguments.length === 1) {
        y = x.y || 0;
        x = x.x || 0;
    }

    return this.set(x,y);
};

JCL.Point.prototype = {

    // set()
    // Updates the coordinates of the point.

    set: function(x,y) {
        this.x = x || this.x || 0;
        this.y = y || this.y || 0;
        return this;
    },

    // toJSON()
    // Returns a simple object representing the coordinates.

    toJSON: function() {
        return { x: this.x, y: this.y};
    },

    // distance()
    // Calculates the distance between this and another JCL.Point.

    distance: function(a) {

        // TODO: Check if simple {x,y} argument.

        if (a instanceof JCL.Point) { return Math.sqrt(Math.pow(a.x- this.x, 2) + Math.pow(a.y- this.y,2)); }
        else { throw new TypeError("Cannot calculate distance of a non-point."); }

    },

    // angle()
    // Calculates the angle connecting this and another JCL.Point.

    angle: function(a) {

        // TODO: Check if simple {x,y} argument.

        if (a instanceof JCL.Point) { return Math.atan2(a.y- this.y, a.x - this.x); }
        else { throw new TypeError("Cannot calculate angle of a non-point."); }

    },

    // tangent()
    // Returns a point at the specified angle and distance from the point.

    tangent: function(degrees, distance) {

        var radians = JCL.utilities.radians;

        if (degrees !== null && distance !== null) {
            return new JCL.Point((distance * Math.cos(radians(degrees))) + this.x, (distance * Math.sin(radians(degrees))) + this.y);
        } else {
            throw new Error("Could not calculate tangent. Missing required data. (Angle: " + degrees + ", Distance: " + distance + ")");
        }

    },

    // lerp()
    // Interpolates a third point at the specified ratio between this and another point.

    lerp: function(a,ratio) {
        if (!ratio || ratio < 0) { ratio = 0; }
        else if (ratio > 1) { ratio = 1; }
        if (this && a && ratio !== null) {
            if (a instanceof JCL.Point) {
                return { x: this.x + ((a.x - this.x) * ratio), y: this.y + ((a.y - this.y) * ratio) };
            } else {
                throw new Error("Could not interpolate point. Invalid point.");
            }
        } else {
            throw new Error("Could not interpolate point. Missing required data.");
        }
    },

    // round()
    // Rounds the coordinates of a point to the nearest pixel.

    round: function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    },

    // crisp()
    // Adjusts for sub-pixel blurring by centering the point around a pixel.

    crisp: function() {
        this.round().translate(-.5, -.5);
        return this;
    },

    // translate
    // Moves a point by the specified coordinates, optionally returning a new instance.

    translate: function(x, y, copy) {
        if (copy) { return new JCL.Point(this.x + (x || 0), this.y + (y || 0)); }
        return this.set(this.x + (x || 0), this.y + (y || 0));
    }

};JCL.Rectangle = function(options) {

    options = options || {};

    this.x = options.x || 0;
    this.y = options.y || 0;
    this.width = options.width || 0;
    this.height = options.height || 0;
    this.fillStyle = options.fill || null;
    this.strokeStyle = options.stroke || null;
    this.lineWidth = options.thickness || 0;

    return this;

};

JCL.Rectangle.prototype = {

    // set()
    // Updates the size of the rectangle.

    set: function (x, y, width, height) {
        this.x = x || this.width || 0;
        this.y = y || this.y || 0;
        this.width = width || this.width || 0;
        this.height = height || this.height || 0;
        return this;
    },

    // center()
    // If a point is passed, will center the rectangle on the point.
    // Otherwise, it will return the center of the rectangle.

    center: function(point) {
        if (point) {
            this.set(point.x - (this.width / 2), point.y-(this.height / 2));
            return this;
        } else {
            return new JCL.Point(this.x + (this.width / 2), this.y + (this.height / 2));
        }
    },

    // round()
    // Rounds the coordinates of a rectangle to the nearest pixel.

    round: function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this;
    },

    // render()
    // Draws the rectangle on the JCL.Canvas.

    render: function(canvas){
        if (canvas instanceof JCL.Canvas) { canvas.drawRectangle(this); }
        else { JCL.error("Specified canvas is not an instance of JCL.Canvas."); }
        return this;
    }

};JCL.Circle = function(options) {

    options = options || {};

    if (!options.center) {
        this.center = new JCL.Point(options.x || 0, options.y || 0);
    } else {
        if (options.center instanceof JCL.Point) { this.center = options.center; }
        else { this.center = new JCL.Point(options.center.x || 0, options.center.y || 0); }
    }

    this.radius = options.radius || 0;
    this.fillStyle = options.fill || null;
    this.strokeStyle = options.stroke || null;
    this.lineWidth = options.thickness || 0;

    return this;

};

JCL.Circle.prototype = {

    // render()
    // Renders the circle on a JCL.Canvas instance.

    render: function(canvas) {
        if (canvas instanceof JCL.Canvas) { canvas.drawCircle(this); }
        else { throw new TypeError("JCL.Circle.render() must be passed a JCL.Canvas."); }
        return this;
    }

};JCL.Arc = function(options) {

    options = options || {};

    if (!options.center) {
        this.center = new JCL.Point(options.x || 0, options.y || 0);
    } else {
        if (options.center instanceof JCL.Point) { this.center = options.center; }
        else { this.center = new JCL.Point(options.center.x || 0, options.center.y || 0); }
    }

    this.radius = options.radius || 0;
    this.fillStyle = options.fill || null;
    this.strokeStyle = options.stroke || null;
    this.lineWidth = options.thickness || 0;
    this.start = options.start || 0;
    this.end = options.end || 360;

};

JCL.Arc.prototype = {

    // render()
    // Renders the arc on a JCL.Canvas instance.

    render: function(canvas) {
        if (canvas instanceof JCL.Canvas) { canvas.drawArc(this); }
        else { throw new TypeError('JCL.Arc.render() must be passed a JCL.Canvas.'); }
        return this;
    }

};JCL.Oval = function(options) {

    options = options || {};

    this.x = options.x || 0;
    this.y = options.y || 0;
    this.width = options.width || 0;
    this.height = options.height || 0;
    this.fillStyle = options.fill || null;
    this.strokeStyle = options.stroke || null;
    this.lineWidth = options.thickness || 0;

    this.calculate();

    return this;
};

JCL.Oval.prototype = {

    // calculate()
    // Calculates the points required for generating the bezier curves.

    calculate: function () {
        this.start = new JCL.Point(this.x, this.y);
        this.end = new JCL.Point(this.x + this.width, this.y + this.height);
        this.mid = new JCL.Point((this.x + this.width) / 2, (this.y + this.height) / 2);
        return this;
    },

    // center()
    // Calculates the center of the oval

    center: function(point) {
        if (point) {
            this.x = point.x - (this.width / 2);
            this.y = point.y - (this.height / 2);
            this.calculate();
            return this;
        } else {
            return new JCL.Point(this.x + (this.width / 2), this.y + (this.height / 2));
        }
    },

    // render()
    // Draws the oval on the JCL.Canvas.

    render: function(canvas){
        if (canvas instanceof JCL.Canvas) { canvas.drawOval(this); }
        else { JCL.error("Specified canvas is not an instance of JCL.Canvas."); }
        return this;
    }

};