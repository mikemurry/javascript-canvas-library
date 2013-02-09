define(function() {

/**
 * @namespace JCL
 */

var JCL = JCL || {

    VERSION: '0.2',

    /**
     * @description Throws a console log.
     * @param msg {String} The message to write to the console.
     */

    log: function(msg) {
        if (console) { console.log(msg); }
    },

    /**
     * @description Throws a console info.
     * @param msg {String} The message to write to the console.
     */

    info: function(msg) {
        if (console) { console.info(msg); }
    },

    /**
     * @description Throws a console warning.
     * @param msg {String} The message to write to the console.
     */

    warn: function(msg) {
        if (console) { console.warn(msg); }
    },

    /**
     * @description Throws a console error.
     * @param msg {String} The message to write to the console.
     */

    error: function(msg) {
        if (console) { console.error(msg); }
    }



};

/**
 * @description Safely augments the JCL namespace to include the specified path.
 * @param ns {String} A dot separated namespace. Prefixing with "JCL." is optional.
 * @return {Object} Returns the JCL object.
 */

JCL.namespace = function(ns) {

    var parts, parent, i, count;

    parent = JCL;
    parts = ns.split(".");

    // Skip Redundant Top Level
    if (parts[0] === "JCL") {
        parts = parts.slice(1);
    }

    count = parts.length;

    for (i=0; i < count; i++) {

        // Create a property if it doesn't exist.
        if (typeof parent[parts[i]] === "undefined") {
            parent[parts[i]] = {};
        }

        // Set parent to new property.
        parent = parent[parts[i]];

    }

    return parent;

};/**
 * @namespace JCL.utilities
 */

JCL.utilities = {

    /**
     * @description Returns an integer between the specified minimum (inclusive) and maximum (exclusive).
     * @param min {Number} The minimum range for the returned integer (inclusive).
     * @param max {Number} The maximum range for the returned integer (exclusive).
     * @return {Number}
     */

    randomInt: function(min, max) {
        if (min !== undefined && max !== undefined) {
            return Math.floor((max - min) * Math.random()) + min;
        } else { JCL.warn("utilities.randomInt() Error: Missing min or max argument."); }
        return false;
    },

    /**
     * @description Converts degrees into radians.
     * @param degrees {Number}
     * @return {Number}
     */

    radians: function(degrees) {
        return (Math.PI / 180) * degrees;
    },

    /**
     * @description Converts radians into degrees.
     * @param radians {Number}
     * @return {Number}
     */

    degrees: function(radians) {
        return radians * (180 / Math.PI);
    },

    /**
     * @description Converts a string into a DOM fragment.
     * @param id {String} The ID of the resulting DOM fragment.
     * @param htmlStr {String} The HTML string to convert.
     * @return {Object} The resulting DOM fragment.
     */

    createFragment: function(id, htmlStr) {
        var frag = document.createDocumentFragment(), temp = document.createElement("div");
        temp.id = id;
        temp.innerHTML = htmlStr;
        while (temp.firstChild) { frag.appendChild(temp.firstChild); }
        return frag;
    },

    /**
     * @description Returns the minimum and maximum value of a given collection.
     * @param collection {Array} The array to iterate over.
     * @return {Object} The resulting min and max.
     */

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
/**
 * @namespace JCL.renderer
 */

JCL.renderer = (function() {

    var _list, _len;

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

    function _loop() {
        if (_len > 0) {
            for (var i = 0; i < _len; i++) { _list[i](); }
            window.requestAnimFrame(_loop);
        }
    }

    function _add(fn) {
        var len = _list.push(fn);
        _len = len;
        if (_len === 1) { _loop(); }
        return len - 1;
    }

    function _remove(index) {
        _list.splice(index, 1);
        _len = _list.length;
        return true;
    }

    return {

        /**
         * @function
         * @description Adds a callback to the render loop. Returns the index of the added callback.
         * @param fn {Function} The callback to be fired each tick of the render loop.
         * @return {Number}
         */

        add: _add,

        /**
         * @function
         * @description Removes a specific callback from the render loop.
         * @param index {Number} The index of the render callback to remove.
         * @return {Boolean}
         */

        remove: _remove,

        debug: _list
    }

}());
/**
 * @namespace JCL.performance
 */

JCL.performance = (function() {

    var _isInit, _last, _delta, _fps, _elapsed;

    _isInit = false;
    _last = new Date();
    _delta = 0;
    _elapsed = 0;
    _fps = 0;

    function _init() {
        if (!_isInit) {
            JCL.renderer.add(_update);
            _isInit = true;
        }
    }

    function _update() {
        var _newDate = new Date();
        _delta = (_newDate - _last) / 1000;
        _elapsed += _delta;
        _last = _newDate;
        _fps = Math.floor(1/_delta);
    }

    _init();

    return {

        /**
         * @property {Number} delta The number of seconds elapsed since the last rendered frame.
         */

        delta: function() { return _delta; },

        /**
         * @property {Number} elapsed The number of seconds elapsed since page load.
         */

        elapsed: function() { return _elapsed; },

        /**
         * @property {Number} fps The number of frames per second.
         */

        fps: function() { return _fps; }
    }

}());
/**
 * @namespace JCL.Canvas
 */


/**
 * @class
 * @classdesc The canvas class creates a platform for all draw calls.
 *
 * @param {*} canvasId The name of the canvas element's ID or a reference to the element itself.
 * @param {object} [options]
 * @param {number} [options.width] Overrides the element's width.
 * @param {number} [options.height] Overrides the element's height.
 * @param {boolean} [options.fullscreen] Sets the canvas to match the size of the window element.
 * @param {number} [options.zindex] Overrides the z-index of the canvas element.
 *
 * @property {boolean} enabled Represents if the canvas object is valid or not.
 *
 * @return {Object}
 */

JCL.Canvas = function(canvasId, options) {

    var that = this;

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

    if (!this.dom) {
        JCL.error("Invalid Canvas DOM passed into the constructor.");
    } else {
        this.ctx = this.dom.getContext("2d");
        this.enabled = (this.ctx !== undefined);
    }

    if (this.enabled) {

        // Handle Manual Height/Width Options
        if (options.width) { this.dom.width = options.width; }
        if (options.height) { this.dom.height = options.height; }

        // Handle Full Screen Option
        if (options.fullscreen) {
            this.dom.width = window.innerWidth;
            this.dom.height = window.innerHeight;
        }

        // Handle Z-Index Option
        if (options.zindex) {
            this.dom.style.zIndex = options.zindex;
        }

        this.width = this.dom.width;
        this.height = this.dom.height;

        this.dom.onmousemove = function(e) {
            if (that.rollover) { that.rollover(e); }
        };

        this.dom.onmouseout = function(e) {
            if (that.rollout) { that.rollout(e); }
        };

    } else { JCL.warn("Canvas (ID: '" + canvasId + "') cannot be enabled."); }

    return this;

};

JCL.Canvas.prototype = {

    // Private Functions

    /**
     * @description Draws a rectangle on the canvas.
     * @param rect {JCL.Rectangle} An instance of JCL.Rectangle.
     * @return {Object} The resulting canvas object.
     */

    drawRectangle: function(rect) {

        if (rect.constructor === JCL.Rectangle) {

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
            JCL.warn("Cannot draw a rectangle without a JCL.Rectangle instance.");
        }

        return this;

    },

    /**
     * @description Draws a path on the canvas.
     * @param steps {Object[]} An array of points {x,y} to draw sequentially.
     * @param strokeStyle {String} The canvas style used to stroke the path.
     * @param lineWidth {Number} The width of the path.
     * @return {Object} The resulting canvas object.
     */

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

    /**
     * @description Draws a shape on the canvas.
     * @param steps {Object[]} An array of points {x,y} to draw sequentially.
     * @param fillStyle {String} The color to fill the path.
     * @param strokeStyle {String} The canvas style used to stroke the path.
     * @param lineWidth {Number} The width of the path.
     * @return {Object} The resulting canvas object.
     */

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

    /**
     * @description Draws a series of similar lines as a batch. More efficient than drawing them individually.
     * @param steps {Object[]} An array of points {x,y}. Each item in the array should contain an array of start and end points.
     * @param strokeStyle {String} The canvas stroke style.
     * @param lineWidth {Number} The width of the stroke.
     * @return {Object} The resulting canvas object.
     */

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

    /**
     * @description Draws a circle.
     * @param circle {JCL.Circle} An instance of a JCL.Circle.
     * @return {Object} The resulting canvas object.
     */

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

    /**
     * @description Draws an arc.
     * @param arc {JCL.Arc} An instance of a JCL.Arc.
     * @return {Object}
     */


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

    /**
     * @description Draws text.
     * @param str {String} The string of text to display.
     * @param font {String} The CSS font string to style the text.
     * @param pos {Object} A point object representing the location of the text.
     * @param baseline {String} Bottom, middle, top.
     * @param align {String} Left, right, or center.
     * @param fillStyle {String} The fillStyle used to display the text.
     * @return {Object} The resulting canvas object.
     */

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

    drawImage: function(img, x, y, width, height) {
        this.ctx.drawImage(img, x, y, width, height);
        return this;
    },

    drawImageExt: function(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight){
        this.ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        return this;
    },

    drawRemoteImage: function(url, x, y, width, height) {
        var i = new Image(), that = this;
        i.onload = function() {
            that.drawImage(i, x, y, width, height);
        };
        i.src = url;
        return this;
    },

    /**
     * @description Draws the canvas at the specified rectangle.
     * @param x {Number} The x coordinate to start clearing from.
     * @param y {Number} The y coordinate to start clearing from.
     * @param w {Number} The width of the rectangle to clear.
     * @param h {Number} The height of the rectangle to clear.
     * @return {Object} The resulting canvas object.
     */

    clearRect: function(x, y, w, h) {
        this.ctx.clearRect(x,y,w,h);
        return this;
    },

    /**
     * @description Clears the entire canvas.
     * @return {Object} The resulting canvas object.
     */

    clear: function() {
        this.ctx.clearRect(0,0,this.dom.width,this.dom.height);
        return this;
    },

    save: function() {
        this.ctx.save();
        return this;
    },

    restore: function() {
        this.ctx.restore();
        return this;
    },

    translate: function(x, y) {
        this.ctx.translate(x, y);
        return this;
    },

    rotate: function(degs) {
        this.ctx.rotate(degs);
        return this;
    }

};/**
 * @namespace JCL.Point
 */

/**
 * @class The point class represents a point in 2d (x,y) or 3d (x,y,z) space.
 * @param x {Number} The x coordinate.
 * @param y {Number} The y coordinate.
 * @param z {Number} The z coordinate.
 * @return {Object}
 */

JCL.Point = function Point(x, y, z) {
    return this.set(x,y,z);
};

JCL.Point.prototype = {

    constructor: "Point",

    /**
     * @description Calculates the angle between two points.
     * @param x {Number} The x coordinate.
     * @param y {Number} The y coordinate.
     * @param z {Number} The z coordinate.
     * @return {Object} The resulting point object.
     */

    set: function(x,y,z) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        return this;
    },

    /**
     * @description Returns a simplified object representing the point's coordinates.
     * @return {Object}
     */

    get: function() {
        return { x: this.x, y: this.y, z: this.z };
    },

    /**
     * @description Prints the current coordinates as a string.
     * @return {String}
     */

    toString: function() {
        return "Point( x:" + this.x + ", y:" + this.y + ", z:" + this.z + ")";
    },

    /**
     * @description Calculates the distance between two points.
     * @param a {Object} The first point.
     * @return {Number|Undefined} The resulting length.
     */

    distance: function(a) {
        if (a.constructor === "Point") { return Math.sqrt(Math.pow(a.x- this.x, 2) + Math.pow(a.y- this.y,2)); }
        else { JCL.warn("Cannot calculate distance of a non-point."); }
        return undefined;
    },

    /**
     * @description Calculates the angle between two points.
     * @param a {Object} The first point.
     * @return {Number|Undefined} The resulting angle in radians.
     */

    angle: function(a) {
        if (a.constructor === "Point") { return Math.atan2(a.y- this.y, a.x - this.x); }
        else { JCL.warn("Cannot calculate angle of a non-point."); }
        return undefined;
    },

    /**
     * @description Calculates a point {x,y} at the specified angle and distance from the base point.
     * @param angle {Number} The number of degrees to rotate the resulting point around the center (0 is pointing right).
     * @param distance {Number} The number of pixels between the center and the resulting point.
     * @return {Object|Undefined} The resulting point expressed as an object with 'x' and 'y' properties.
     */

    tangent: function(angle, distance) {

        var radians = JCL.utilities.radians;

        if (angle !== null && distance !== null) {
            return new JCL.Point((distance * Math.cos(radians(angle))) + this.x, (distance * Math.sin(radians(angle))) + this.y);
        } else { JCL.warn("Could not calculate tangent. Missing required data. (Angle: " + angle + ", Distance: " + distance + ")"); }
        return undefined;

    },

    /**
     * @description Interpolates between two points {x,y}.
     * @param a {Object} The first point {x,y}.
     * @param ratio {Number} The amount to interpolate between the two points. Between 0 and 1.
     * @return {Object|Undefined} The interpolated point {x,y}.
     */

    lerp: function(a,ratio) {
        if (!ratio || ratio < 0) { ratio = 0; }
        else if (ratio > 1) { ratio = 1; }
        if (this && a && ratio !== null) {
            if (a.constructor === "Point") {
                return { x: this.x + ((a.x - this.x) * ratio), y: this.y + ((a.y - this.y) * ratio) };
            } else { JCL.warn("Could not interpolate point. Invalid point."); }
        } else { JCL.warn("Could not interpolate point. Missing required data."); }
        return undefined;
    },

    translate: function(x, y, z) {
        var current = this.get();
        return this.set(current.x + (x || 0), current.y + (y || 0), current.z + (z || 0));
    }

};
/**
 * @class
 * @classdesc The rectangle class stores position and style properties for drawing rectangles.
 *
 * @param {object} [options]
 * @param {number} [options.x=0] The position of the rectangle's left edge.
 * @param {number} [options.y=0] The position of the rectangle's top edge.
 * @param {number} [options.width=0] The width of the rectangle.
 * @param {number} [options.height=0] The height of the rectangle.
 * @param {string} [options.fill=null] The color to fill the circle.
 * @param {string} [options.stroke=null] The color to stroke the border of the circle.
 * @param {number} [options.thickness=0] The thickness of the circle's border.
 *
 * @property {number} x The position of the rectangle's left edge.
 * @property {number} y The position of the rectangle's top edge.
 * @property {number} width The width of the rectangle.
 * @property {number} height The height of the rectangle.
 * @property {string} fillStyle The color to fill the circle.
 * @property {string} strokeStyle The color to stroke the border of the circle.
 * @property {number} lineWidth The thickness of the circle's border.
 *
 * @return {Object}
 */


JCL.Rectangle = function(options) {
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.width = options.width || 0;
    this.height = options.height || 0;
    this.fillStyle = options.fill || null;
    this.strokeStyle = options.stroke || null;
    this.lineWidth = options.thickness || 0;
    //this.pivot = new JCL.Point(0,0);
};

JCL.Rectangle.prototype = {

    /**
     * @description Returns a simplified object representing the point's coordinates.
     * @return {Object}
     */

    get: function() {
        return { x: this.center.x, y: this.center.y, center: this.center, width: this.width, height: this.height, fillStyle: this.fillStyle, strokeStyle: this.strokeStyle, lineWidth: this.lineWidth };
    },

    /**
     * @description Prints the current coordinates as a string.
     * @return {String}
     */

    toString: function() {
        return "Rectangle( x:" + this.center.x + ", y:" + this.center.y + ", center: " + this.center.toString() + ", width:" + this.width + ", height:" + this.height + ", fillStyle:" + this.fillStyle + ", strokeStyle:" + this.strokeStyle + ", lineWidth:" + this.lineWidth + ")";
    },

    /**
     * @description Calculates the center point of the rectangle, or if a point is passed in, adjusts the rectangle's location to match the provided center point.
     * @return {Object} The resulting point.
     */

    center: function(point) {
        if (point) {
            this.set(point.x - (this.width / 2), point.y-(this.height / 2), point.z-(this.depth / 2), this.width, this.height, this.depth);
            return this;
        } else {
            return new JCL.Point(this.x + (this.width / 2), this.y + (this.height / 2), this.z + (this.depth / 2));
        }
    },

    /**
     * round()
     * Converts properties into integers to prevent expensive sub-pixel rendering.
     * @return {*}
     */

    round: function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this;
    },

    /**
     * render()
     * Draws the rectangle to the screen using the passed canvas.
     * @param {JCL.Canvas} canvas The JCL.Canvas instance to render to.
     * @return {*}
     */

    render: function(canvas){
        if (canvas instanceof JCL.Canvas) { canvas.drawRectangle(this); }
        else { JCL.error("Specified canvas is not an instance of JCL.Canvas."); }
        return this;
    }

};
/**
 * @class
 * @classdesc The circle class stores position and style properties for drawing circles.
 *
 * @param {object} [options]
 * @param {number} [options.x=0] The x coordinate of the circle's center.
 * @param {number} [options.y=0] The y coordinate of the circle's center.
 * @param {JCL.Point} [options.center] The JCL.Point instance indicating the circle's center.
 * @param {number} [options.radius=0] The radius of the circle, in pixels.
 * @param {string} [options.fill=null] The color to fill the circle.
 * @param {string} [options.stroke=null] The color to stroke the border of the circle.
 * @param {number} [options.thickness=0] The thickness of the circle's border.
 *
 * @property {JCL.Point} center The JCL.Point instance indicating the circle's center.
 * @property {number} radius The radius of the circle, in pixels.
 * @property {string} fillStyle The color to fill the circle.
 * @property {string} strokeStyle The color to stroke the border of the circle.
 * @property {number} lineWidth The thickness of the circle's border.
 *
 * @return {Object}
 */

JCL.Circle = function(options) {

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

};

JCL.Circle.prototype = {

    /**
     * @description Draws the circle on the specified canvas.
     * @param {JCL.Canvas} canvas An instance of JCL.Canvas.
     * @return {Object}
     */

    render: function(canvas) {
        if (canvas instanceof JCL.Canvas) { canvas.drawCircle(this); }
        else { JCL.error("Circle.render() context must be a JCL.Canvas."); }
        return this;
    }

};/**
 * @namespace JCL.Arc
 */


/**
 * @class
 * @classdesc The arc class stores position and style properties for drawing arcs.
 *
 * @param {object} [options]
 * @param {number} [options.x=0] The x coordinate of the circle's center.
 * @param {number} [options.y=0] The y coordinate of the circle's center.
 * @param {JCL.Point} [options.center] The JCL.Point instance indicating the circle's center.
 * @param {number} [options.radius=0] The radius of the circle, in pixels.
 * @param {string} [options.fill=null] The color to fill the circle.
 * @param {string} [options.stroke=null] The color to stroke the border of the circle.
 * @param {number} [options.thickness=0] The thickness of the circle's border.
 * @param {number} [options.start=0] The starting angle of the arc in degrees.
 * @param {number} [options.end=360] The ending angle of the arc in degrees.
 *
 * @return {Object}
 */

JCL.Arc = function(options) {

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

    /**
     * @description Draws the circle on the specified canvas.
     * @param {JCL.Canvas} canvas An instance of JCL.Canvas.
     * @return {Object}
     */

    render: function(canvas) {
        if (canvas instanceof JCL.Canvas) { canvas.drawArc(this); }
        else { JCL.error("Circle.render() context must be a JCL.Canvas."); }
        return this;
    }

};/**
 * @namespace JCL.Color
 */

JCL.Color = function(options) {

    if (options.hasOwnProperty('h')) {
        // Assume HSL
        this.h = options.h || 0;
        this.s = options.s || 0;
        this.l = options.l || 0;
        this.toRGB(this.hsl());
    } else if (options.hasOwnProperty('r')) {
        // Assume RGB
        this.r = options.r || 0;
        this.g = options.g || 0;
        this.b = options.b || 0;
        this.toHSL(this.rgb());
    }

    this.a = options.a || 1;

    return this;

};

JCL.Color.prototype = {

    //lerp: function(b, ratio) {
        //return this;
    //},

    toHSL: function(r, g, b) {

        var r1 = r / 255;
        var g1 = r / 255;
        var b1 = b / 255;

        var maxColor = Math.max(r1, g1, b1);
        var minColor = Math.min(r1, g1, b1);

        var L = (maxColor + minColor) / 2;
        var S = 0;
        var H = 0;

        if (maxColor != minColor) {

            // Calculate S
            if (L < 0.5) {
                S = (maxColor - minColor) / (maxColor + minColor);
            } else {
                S = (maxColor - minColor) / (2.0 - maxColor - minColor);
            }

            // Calculate H
            if (r1 === maxColor) {
                H = (g1-b1) / (maxColor - minColor);
            } else if (g1 === maxColor) {
                H = 2.0 + (b1-r1) / (maxColor - minColor);
            } else {
                H = 4.0 + (r1 - g1) / (maxColor - minColor);
            }
        }

        L = L * 100;
        S = S * 100;
        H = H * 60;

        if (H<0) { H += 360; }

        this.h = H;
        this.s = S;
        this.l = L;

        return this.hsl();

    },

    toRGB: function(h,s,l) {

        h = (h % 360) / 360;

        var m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
        var m1= l * 2 - m2;

        this.r = hue(h + 1/3) * 255;
        this.g = hue(h) * 255;
        this.b = hue(h - 1/3) * 255;

        return this.rgb();

        function hue(h) {
            h = h < 0 ? h + 1 : (h > 1 ? h - 1 : h);
            if (h * 6 < 1) { return m1 + (m2 - m1) * h * 6; }
            else if (h * 2 < 1) { return m2; }
            else if (h * 3 < 2) { return m1 + (m2 - m1) * (2/3 - h) * 6; }
            else return m1;
        }

    },

    hsl: function() {
        return { h: this.h, s: this.s, l: this.l, a: this.a };
    },

    rgb: function() {
        return { r: this.r, g: this.g, b: this.b, a: this.a };
    }



}; return JCL; });